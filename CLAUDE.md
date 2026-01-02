# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**xAI Pocket Trainer** is a Progressive Web App (PWA) designed for interview preparation. It's a single-user mobile-first application that helps practice pitch delivery, memorize key concepts via flashcards, handle tough objections, and eliminate language habits using speech recognition.

**Key Constraints:**
- Offline-first architecture (must work without internet after initial load)
- Zero backend/server-side code (100% client-side)
- Single-file architecture for simplicity (no build tools)
- Private deployment (not indexed by search engines)

---

## Architecture

### File Structure

```
interview_xai_web_app/
├── index.html          # Main app (~2,600 lines): Structure + Styles + Logic
├── js/
│   └── data.js         # Data module (~735 lines): All content (flashcards, prompts, scripts)
├── sw.js               # Service Worker (~91 lines): Offline caching
├── manifest.json       # PWA manifest
├── vercel.json         # Deployment config (adds X-Robots-Tag headers)
├── icons/              # PWA icons (192x192, 512x512)
└── docs/               # Documentation (PRD, Technical Docs, Implementation Log)
```

### Single-File Architecture Philosophy

The app uses a **monolithic single-file approach** where `index.html` contains:
- HTML structure (7 views: dashboard, flashcards, pitch timer, objections, vício police, random pill, pre-flight checklist)
- Embedded CSS in `<style>` tags (CSS custom properties design system)
- Embedded JavaScript in `<script>` tags (state management, navigation, business logic)

**Why:** Zero build step, instant deployment, easy debugging, no bundler complexity.

`js/data.js` was extracted from `index.html` to separate data from logic, but still loads via `<script>` tag (not ES modules).

### Data Flow

```
js/data.js (exports via window.appData)
    ↓
index.html <script> (reads window.appData)
    ↓
User interactions update app state
    ↓
localStorage (persist flashcard progress, checklist state)
```

### External Dependencies

**Gemini Live API Integration** (Vício Police feature only):
- Real-time speech-to-text transcription
- WebSocket connection: `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`
- Uses MediaRecorder API to capture audio chunks
- Sends audio as base64-encoded WebM/Opus to Gemini
- Receives transcript in real-time via WebSocket messages

**No other external dependencies** - pure vanilla JavaScript.

---

## Development Workflow

### Local Development

**Open directly in browser:**
```bash
# Windows
start index.html

# macOS/Linux
open index.html
```

**Note:** PWA features (Service Worker, installation) require HTTPS. On localhost, use `http://localhost` or deploy to Vercel for full testing.

### Testing Changes

After editing `index.html` or `js/data.js`:
1. Refresh browser (Ctrl+R or Cmd+R)
2. If Service Worker cached old version, hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. Or clear Service Worker cache in DevTools → Application → Service Workers → Unregister

### Service Worker Version Management

**Critical:** When deploying changes, increment `CACHE_NAME` in `sw.js`:
```javascript
const CACHE_NAME = 'xai-trainer-vX'; // Increment X to force cache refresh
```

Current version: `v7` (V4.1 Gemini 2.5 Flash Update - 02/01/2026)

**Version History:**
- v7: Updated to Gemini 2.5 Flash (stable model) - 02/01/2026
- v6: V4.0 Fluency Trainer Edition with Rehearsal Mode - 02/01/2026
- v5: V3.0 Conversation Edition with Response Coach - 02/01/2026

This ensures users get the latest version immediately instead of seeing stale cached content.

---

## Key Features & Implementation

### 1. Hash-Based Routing

Navigation uses URL hash fragments (`#dashboard`, `#flashcards`, etc.):

```javascript
function showView(viewName) {
  // Hide all views
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  // Show target view
  document.getElementById(viewName).classList.add('active');
  // Update URL hash
  window.location.hash = viewName;
}
```

### 2. State Management

Global `state` object holds all runtime data:

```javascript
const state = {
  flashcards: [],               // Current filtered flashcards
  currentCardIndex: 0,
  reviewCards: new Set(),       // Card IDs marked "Need Review"
  knownCards: new Set(),        // Card IDs marked "Know Well"
  currentCategory: 'all',

  // Pitch timer state
  pitchTimer: null,
  pitchTimeElapsed: 0,
  pitchDuration: 45,

  // Objection quiz state
  objectionIndex: 0,
  objectionScore: 0,

  // Vício Police state
  vicioWebSocket: null,
  vicioAudioStream: null,
  vicioMediaRecorder: null,
  vicioTranscript: '',
  vicioWordCounts: { forbidden: {}, desired: {} },

  // Pre-flight checklist
  checklistProgress: []
};
```

### 3. localStorage Persistence

```javascript
// Keys used:
'xai-trainer-review-cards'    // Set of card IDs to review
'xai-trainer-known-cards'     // Set of card IDs user knows
'xai-trainer-last-category'   // Last selected flashcard category
'xai-trainer-checklist'       // Pre-flight checklist progress (16 booleans)
```

Load on init, save on each change.

### 4. Gemini API Integration

#### V4.1 Update: Gemini 2.5 Flash (Stable)

The app now uses **`gemini-2.5-flash`** (stable) for all AI features:

- **Vício Police:** Real-time transcription via WebSocket (`models/gemini-2.5-flash`)
- **Rehearsal Mode:** Audio transcription + analysis via REST API
- **Stability:** Production-ready stable model (not experimental)
- **Performance:** 1M token context window, better than 2.0 Flash

**Setup WebSocket (Vício Police):**
```javascript
const ws = new WebSocket(
  `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${GEMINI_API_KEY}`
);

// Initial setup message
ws.send(JSON.stringify({ setup: { model: 'models/gemini-2.5-flash' } }));
```

**REST API (Rehearsal Mode):**
```javascript
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          { inlineData: { mimeType: 'audio/webm', data: base64Audio } },
          { text: 'Transcribe this audio to text.' }
        ]
      }]
    })
  }
);
```

**Audio capture:**
```javascript
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'audio/webm;codecs=opus',
      audioBitsPerSecond: 16000
    });

    mediaRecorder.ondataavailable = (event) => {
      // Convert blob to base64 and send via WebSocket
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Audio = reader.result.split(',')[1];
        ws.send(JSON.stringify({
          realtimeInput: {
            mediaChunks: [{ mimeType: 'audio/webm;codecs=opus', data: base64Audio }]
          }
        }));
      };
      reader.readAsDataURL(event.data);
    };

    mediaRecorder.start(100); // 100ms chunks
  });
```

**Word detection:**
```javascript
function detectWords(transcript) {
  const lowerText = transcript.toLowerCase();

  // Check forbidden words
  vicioPoliceWords.forbidden.forEach(word => {
    if (lowerText.includes(word)) {
      state.vicioWordCounts.forbidden[word] = (state.vicioWordCounts.forbidden[word] || 0) + 1;
      triggerVibration([200, 100, 200]); // Mobile haptic feedback
      showVisualAlert('forbidden');
    }
  });

  // Check desired words
  vicioPoliceWords.desired.forEach(word => {
    if (lowerText.includes(word)) {
      state.vicioWordCounts.desired[word] = (state.vicioWordCounts.desired[word] || 0) + 1;
      showVisualAlert('desired');
    }
  });

  // V3.0: Check if equity bridge is needed
  checkEquityBridge(state.vicioTranscript);
}

// V3.0 - Response Coach: Equity Bridge Check
function checkEquityBridge(fullTranscript) {
  const lowerTranscript = fullTranscript.toLowerCase();

  // Check if user mentioned credit terms without bridging to equity
  const hasCreditTerm = keywordPriority.alert.some(term =>
    lowerTranscript.includes(term.toLowerCase())
  );

  const hasBridge = keywordPriority.blue.some(term =>
    lowerTranscript.includes(term.toLowerCase())
  ) || keywordPriority.gold.some(term =>
    lowerTranscript.includes(term.toLowerCase())
  );

  // Show bridge alert if credit mentioned without bridge
  if (hasCreditTerm && !hasBridge) {
    showBridgeAlert(); // Displays "🌉 BRIDGE TO EQUITY NOW!"
  }
}
```

---

## Data Structure (js/data.js)

### Flashcards
```javascript
const flashcardsData = [
  {
    id: 1,
    category: 'tecnico',
    front: 'What are the 7 ratios in the ABC Rating Model?',
    back: '1. Current Ratio, 2. Debt/EBITDA, 3. EBITDA/Interest, ...',
    isKillerStory: true  // Marked for "Killer Stories" filter
  },
  // ... 57 total cards
];
```

### Pitch Prompts
```javascript
const pitchPrompts = [
  {
    id: 1,
    question: 'Tell me about yourself (45 seconds)',
    script: 'I'm João Leal, 45, Partner at Joule Capital in Brazil...',
    checklist: [
      'Mentioned Joule (5 years, Partner)',
      'Mentioned ABC (15 years)',
      // ...
    ]
  },
  // ... 11 total prompts
];
```

### Objections
```javascript
const objections = [
  {
    id: 1,
    question: 'Why should we hire you instead of someone with a CFA?',
    options: [
      { text: 'I haven't taken the CFA...', type: 'wrong' },
      { text: 'The CFA tests if you can pass an exam...', type: 'correct' },
      { text: 'I can get a CFA if needed...', type: 'partial' }
    ],
    explanation: 'Reframe the question...',
    idealScript: 'The CFA tests if you can pass an exam...'
  },
  // ... 13 total objections
];
```

---

## Common Tasks

### Adding New Flashcards

1. Edit `js/data.js`
2. Add to `flashcardsData` array:
```javascript
{
  id: 58, // Increment from last ID
  category: 'tecnico', // or 'historias', 'pessoas', 'frases', 'tips'
  front: 'Your question/term',
  back: 'Your answer/explanation',
  isKillerStory: false // true only for critical stories (Joule, ABC, EM)
}
```
3. Update card count in comments if desired
4. Test in browser

### Adding New Pitch Prompts

Edit `pitchPrompts` in `js/data.js`:
```javascript
{
  id: 12, // Increment
  question: 'Your prompt/question',
  script: 'Your ideal response script',
  checklist: [
    'Point 1 to verify',
    'Point 2 to verify',
    // ...
  ]
}
```

### Adding New Objections

Edit `objections` in `js/data.js`:
```javascript
{
  id: 14,
  question: 'The objection text',
  options: [
    { text: 'Option A', type: 'wrong' },
    { text: 'Option B', type: 'correct' },
    { text: 'Option C', type: 'partial' }
  ],
  explanation: 'Why the correct answer works',
  idealScript: 'Full scripted response'
}
```

### Modifying Monitored Words (Vício Police)

Edit `vicioPoliceWords` in `js/data.js`:
```javascript
const vicioPoliceWords = {
  forbidden: ['man', 'you know', 'basically', ...], // Words to avoid
  desired: ['joule', 'abc', 'fundamental analysis', ...] // Keywords to use
};
```

### Changing Interview Date/Time

Edit `index.html`, find countdown timer logic:
```javascript
const interviewDate = new Date('2026-01-05T17:00:00-03:00'); // BRT timezone
```

---

## Git & GitHub

### Repository

**Remote:** `git@github.com-jrleal10:jrleal10/xai-pocket-trainer.git`

**Important:** This repo uses a specific SSH key configuration. The host alias `github.com-jrleal10` ensures the correct identity is used.

### SSH Configuration

The SSH config (`~/.ssh/config` or `C:\Users\joaor\.ssh\config`) must have:

```
# Conta jrleal10 → usa a chave correta!
Host github.com-jrleal10
    HostName github.com
    User git
    IdentityFile C:\Users\joaor\.ssh\id_ed25519
    IdentitiesOnly yes
```

### Git Commands

**Clone (first time):**
```bash
git clone git@github.com-jrleal10:jrleal10/xai-pocket-trainer.git
```

**Check remote (existing repo):**
```bash
git remote -v
# Should show: git@github.com-jrleal10:jrleal10/xai-pocket-trainer.git
```

**Fix remote if needed:**
```bash
git remote set-url origin git@github.com-jrleal10:jrleal10/xai-pocket-trainer.git
```

**Standard commit flow:**
```bash
git add .
git commit -m "feat: description of changes"
git push origin main
```

### Commit Message Convention

Use conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `style:` - Formatting, CSS changes

Example: `feat: add equity prompts and Response Coach`

---

## Deployment

### Vercel (Current Production)

**Production URL:** https://interviewxaiwebapp.vercel.app/

**Deploy command:**
```bash
vercel --prod
```

**Auto-deploy:** Push to `main` branch triggers auto-deployment via Vercel GitHub integration.

**Privacy Headers:** `vercel.json` adds `X-Robots-Tag: noindex, nofollow` to all routes.

### Manual Deployment (Any Static Host)

1. Upload entire folder to static host (Netlify, GitHub Pages, etc.)
2. Ensure `vercel.json` or equivalent adds robots meta headers
3. HTTPS required for PWA features (Service Worker, getUserMedia API)

---

## Privacy & Security

The app is configured to NOT appear in search engines:

**3 Layers of Protection:**
1. `robots.txt` blocks all crawlers
2. Meta tags in `index.html`: `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">`
3. HTTP headers via `vercel.json`: `X-Robots-Tag: noindex, nofollow`

**Data Privacy:**
- All data stored in browser localStorage (never sent to server)
- No analytics, tracking, or third-party cookies
- Gemini API only used for Vício Police feature (speech transcription)

---

## Browser Compatibility

**Tested & Supported:**
- Chrome/Edge (Desktop + Mobile) ✅
- Safari (Desktop + Mobile) ✅
- Firefox (Desktop + Mobile) ✅

**API Requirements:**
- Service Worker API (for offline support)
- localStorage API (for persistence)
- MediaRecorder API + getUserMedia (for Vício Police)
- WebSocket API (for Gemini Live integration)
- Vibration API (mobile haptic feedback - gracefully degrades on desktop)

---

## Troubleshooting

### Service Worker Not Updating

**Problem:** Changes not appearing after refresh.

**Solution:**
1. Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
2. DevTools → Application → Service Workers → Unregister
3. Increment `CACHE_NAME` in `sw.js` and redeploy

### localStorage Not Persisting

**Problem:** Flashcard progress resets on reload.

**Cause:** Private/Incognito mode blocks localStorage.

**Solution:** Use normal browser window.

### Gemini API Not Connecting (Vício Police)

**Problem:** WebSocket fails to connect.

**Checklist:**
- HTTPS required (localhost or production URL)
- Valid API key in code
- Microphone permission granted
- Network connection active

### PWA Not Installing on Mobile

**Problem:** "Add to Home Screen" option missing.

**Cause:** PWA requires HTTPS (localhost HTTP won't work on mobile).

**Solution:** Test on production Vercel URL, not local IP.

---

## Code Style & Conventions

### JavaScript Patterns

**Event Listeners:**
```javascript
document.getElementById('myButton').addEventListener('click', () => {
  // Handler logic
});
```

**State Updates:**
Always update global `state` object, then call render functions:
```javascript
state.currentCardIndex++;
renderFlashcard();
```

**localStorage:**
```javascript
// Save
localStorage.setItem('key', JSON.stringify(data));

// Load
const data = JSON.parse(localStorage.getItem('key') || 'null');
```

### CSS Custom Properties

Use CSS variables defined in `:root` for consistency:
```css
:root {
  --bg-primary: #0a0a0a;
  --accent-primary: #10a37f;
  --text-primary: #ffffff;
  /* ... */
}

.my-class {
  background: var(--bg-primary);
  color: var(--accent-primary);
}
```

### Naming Conventions

- **Functions:** camelCase (`showView`, `renderFlashcard`)
- **Constants:** UPPER_SNAKE_CASE (`CACHE_NAME`, `GEMINI_API_KEY`)
- **State properties:** camelCase (`currentCardIndex`, `pitchTimer`)
- **DOM IDs:** kebab-case (`flashcard-front`, `pitch-timer-display`)

---

## Important Notes

### Smart Quotes Issue

**Problem:** Content copied from Google Docs may contain curly quotes (`"` `'`) instead of straight quotes (`"` `'`).

**Impact:** JavaScript parsing errors if curly quotes appear in code.

**Solution:** Always use straight quotes in `js/data.js`. Use find-replace to fix:
- Find: `"` `"` → Replace: `"`
- Find: `'` `'` → Replace: `'`

### Mobile Vibration

Vibration API only works on mobile browsers (Android Chrome, iOS Safari). Gracefully fails on desktop (no error).

```javascript
if ('vibrate' in navigator) {
  navigator.vibrate([200, 100, 200]); // Pattern: vibrate, pause, vibrate
}
```

### Timer Accuracy

JavaScript timers (`setInterval`) are not perfectly accurate (±10-50ms drift). For pitch timer, this is acceptable for UX purposes. Do not rely on timers for critical timing.

---

## Performance Considerations

- **Initial Load:** ~125 KB total (index.html + data.js + manifest + icons)
- **Service Worker Cache:** Entire app cached on first visit (~500 KB including icons)
- **Offline Load:** <100ms (served from cache)
- **Animation Performance:** CSS animations used for smooth 60fps (avoid JavaScript animations)

---

## Current Development: V3.0 "Conversation Edition"

**Spec Document:** `docs/melhorias_conversacao.md`

This section documents the V3.0 features currently being implemented.

### New Data Structures

#### Expanded Pitch Prompts
```javascript
// New prompt structure with category and isKiller flag
{
  id: 'equity-experience',
  prompt: 'Tell me about your equity experience',
  idealScript: `For the last 5 years at Joule...`,
  checklist: ['5 anos Joule', 'GARP', 'investment committee', 'DCF', 'earnings quality'],
  category: 'equity',  // NEW: 'equity', 'bridge', 'technical', 'differentiation', 'closing'
  isKiller: true       // NEW: Priority prompts for "Killer Stories" filter
}
```

#### Expanded Objections
```javascript
// New objection structure with options array
{
  id: 'credit-focused',
  objection: 'Your background seems more credit-focused. How does that fit?',
  idealScript: `Fair observation. But I've been doing equity at Joule...`,
  options: [
    { text: 'Defender crédito extensivamente', correct: false },
    { text: 'Bridge via Modigliani-Miller + Joule', correct: true },
    { text: 'Minimizar experiência de crédito', correct: false }
  ]
}
```

#### Keyword Priority System (Response Coach)
```javascript
// Color-coded keyword detection for Vício Police expansion
const keywordPriority = {
  gold: ['joule', 'investment committee', 'garp', 'roic', 'earnings quality', 'dcf'],
  blue: ['modigliani-miller', 'capital-structure agnostic', 'left side'],
  green: ['abc', 'validation', 'central bank', 'emerging markets', '15%'],
  alert: ['raroc', 'basel', 'pd', 'lgd', 'credit risk', 'default']
};
```

#### Panic Words (Enhanced Panic Bridge)
```javascript
const panicWords = [
  { word: 'JOULE', context: 'Fale dos 5 anos de equity' },
  { word: 'BRIDGE', context: 'Use Modigliani-Miller' },
  { word: 'VALIDATE', context: 'Conte a história do ABC' },
  { word: 'JEFFREY', context: 'Conecte via Emerging Markets' },
  { word: 'ROIC', context: 'Métrica central na Joule' },
  { word: 'CONTRIBUTE', context: 'Pronto para começar imediatamente' }
];
```

### New Features to Implement

#### 1. Response Coach (Vício Police Expansion)

**Purpose:** Real-time content feedback during speech, not just word detection.

**Implementation:**
```javascript
function checkEquityBridge(transcript) {
  const creditTerms = keywordPriority.alert;
  const bridgeTerms = ['modigliani', 'equity', 'joule', 'roic', 'assets'];
  
  const hasCreditTerm = creditTerms.some(term => 
    transcript.toLowerCase().includes(term)
  );
  const hasBridge = bridgeTerms.some(term => 
    transcript.toLowerCase().includes(term)
  );
  
  if (hasCreditTerm && !hasBridge) {
    return {
      alert: true,
      message: '🌉 BRIDGE TO EQUITY NOW!',
      suggestion: 'Mencione Modigliani-Miller ou Joule'
    };
  }
  return { alert: false };
}
```

**UI Changes:**
- Add color-coded keyword highlighting to transcript display
- Add alert overlay for "BRIDGE TO EQUITY" warning
- Add live checklist showing covered/missing points

#### 2. Enhanced Panic Button

**Purpose:** Display single word in full-screen to help recover from mental blanks.

**Implementation:**
```javascript
function showPanicWord() {
  const random = panicWords[Math.floor(Math.random() * panicWords.length)];
  // Display: word in 72px font, centered, fade out after 3s
  const overlay = document.getElementById('panic-word-overlay');
  overlay.querySelector('.panic-word').textContent = random.word;
  overlay.querySelector('.panic-context').textContent = random.context;
  overlay.classList.add('active');
  setTimeout(() => overlay.classList.remove('active'), 3000);
}
```

#### 3. Mock Interview Simulator (Future Phase)

**Purpose:** Full 15-minute interview simulation with AI-powered Jeffrey persona.

**State Machine:**
```javascript
const InterviewPhase = {
  IDLE: 'idle',
  JEFFREY_SPEAKING: 'jeffrey_speaking',
  USER_RESPONDING: 'user_responding',
  EVALUATING: 'evaluating',
  SHOWING_FEEDBACK: 'showing_feedback',
  COMPLETE: 'complete'
};

// Interview sequence (order of prompts)
const interviewSequence = [
  'tell-me-about-yourself',
  'equity-experience',
  'credit-equity-bridge',
  'ev-ebitda-vs-pe',
  'emerging-markets',
  'why-xai',
  'questions-for-jeffrey',
  'closing-statement'
];
```

**Gemini API Expansion:**
```javascript
// Add system instruction for Jeffrey persona
ws.send(JSON.stringify({
  setup: {
    model: 'models/gemini-2.0-flash-exp',
    generationConfig: {
      responseModalities: ['TEXT'],
      systemInstruction: `You are Jeffrey Weichsel, Human Data Manager at xAI.
        You're interviewing João for an AI Finance Tutor position.
        - Be professional but friendly
        - Ask follow-up questions when answers are vague
        - Challenge weak points (credit vs equity, no CFA)
        - Interview is 15 minutes - be efficient`
    }
  }
}));
```

### Implementation Checklist (V3.0)

**Phase 1: Content (Priority P0)**
- [ ] Add 6 new equity prompts to `pitchPrompts` in `js/data.js`
- [ ] Add 5 new objections to `objections` in `js/data.js`
- [ ] Add Joule Retailer story flashcard (isKiller: true)
- [ ] Add Jeffrey profile flashcard (category: 'pessoas')

**Phase 2: Response Coach (Priority P0)**
- [ ] Implement `keywordPriority` object in `js/data.js`
- [ ] Add `checkEquityBridge()` function to `index.html`
- [ ] Create color-coded UI for keyword categories
- [ ] Add "🌉 BRIDGE TO EQUITY NOW!" alert overlay

**Phase 3: Panic Button (Priority P1)**
- [ ] Add `panicWords` array to `js/data.js`
- [ ] Create full-screen panic word overlay HTML
- [ ] Implement `showPanicWord()` function
- [ ] Add fade animation CSS (3 second duration)

**Phase 4: Mock Interview (Priority P2 - if time permits)**
- [ ] Create new view `#mock-interview` in `index.html`
- [ ] Implement interview state machine
- [ ] Add TTS for Jeffrey questions (Web Speech Synthesis API)
- [ ] Add 15-minute countdown timer
- [ ] Implement prompt sequence logic

### New CSS Classes Needed

```css
/* Keyword priority colors */
.keyword-gold { color: #FFD700; font-weight: bold; }
.keyword-blue { color: #4A90D9; }
.keyword-green { color: #10a37f; }
.keyword-alert { color: #ff4444; background: rgba(255,0,0,0.2); }

/* Bridge alert overlay */
.bridge-alert {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  padding: 12px 24px;
  border-radius: 8px;
  animation: pulse 0.5s ease-in-out;
  z-index: 1000;
}

/* Panic word overlay */
.panic-word-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.panic-word-overlay.active {
  opacity: 1;
  pointer-events: auto;
}

.panic-word {
  font-size: 72px;
  font-weight: bold;
  color: var(--accent-primary);
  text-transform: uppercase;
}

.panic-context {
  font-size: 18px;
  color: var(--text-secondary);
  margin-top: 16px;
}
```

### Testing V3.0 Features

**Response Coach Testing:**
1. Start Vício Police
2. Say "RAROC" without mentioning "Modigliani" or "Joule"
3. Verify "BRIDGE TO EQUITY" alert appears
4. Say "Modigliani-Miller" and verify alert clears

**Panic Button Testing:**
1. Navigate to any practice mode
2. Click panic button
3. Verify full-screen word appears
4. Verify fade-out after 3 seconds

**New Content Testing:**
1. Navigate to Flashcards → Filter by category "equity"
2. Verify new equity prompts appear
3. Navigate to Objection Handling
4. Verify new objections appear with correct options

---

## Future Enhancement Ideas

If extending this app:
- Export flashcard progress as JSON
- Import custom flashcard decks
- Push notifications for study reminders (requires backend)
- Spaced repetition algorithm (instead of simple review/known flags)
- Voice response recording + playback for pitch practice
- Fluency analytics (WPM, pause detection, filler word counting)
- Full Mock Interview with Gemini evaluation and scoring

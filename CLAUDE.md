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

Current version: `v12` (V7.0 Coach Alex Edition - 03/01/2026)

**Version History:**
- v12: V7.0 Coach Alex Edition - Immersive coaching experience with contextual framing - 03/01/2026
- v11: V6.0 Gemini TTS Integration - Natural AI voice for Audio Coach - 02/01/2026
- v10: V5.0 Audio Coach Edition - Listen-Only Training Mode - 02/01/2026
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

## V6.0: Gemini TTS Integration (Audio Coach)

### Overview

V6.0 migrates Audio Coach from Web Speech API (browser native TTS) to **Gemini 2.5 Flash TTS API** for natural, professional voice quality.

**Key Improvements:**
- **Natural voice**: AI-generated speech vs robotic browser TTS
- **American English guaranteed**: Via prompt engineering
- **17 voice options**: Professional male, friendly male, smooth female/neutral
- **Question/Answer format**: Clear structure ("Question: [Q]. Suggested Answer: [A]")
- **Intelligent caching**: 2nd playback instant (no API call)
- **Auto-preload**: Next item loaded in background
- **Robust fallback**: Web Speech API if Gemini fails
- **English UI**: All Audio Coach text translated to English

### Architecture

**Flow:**
```
User clicks Play
→ generateSpeechWithGemini(text)
→ Gemini TTS API (POST request)
→ Base64 PCM audio (24kHz, mono, 16-bit)
→ createWavFile() (add WAV header)
→ playAudioFromBase64() (create Audio element)
→ audio.play()
→ preloadNextItem() (background)
```

**Cache Strategy:**
```javascript
// Cache key includes voice + speed for uniqueness
const cacheKey = `${itemId}-${voiceName}-${speechRate}`;

if (audioCoachAudioCache.has(cacheKey)) {
  // Instant playback from cache
  base64Audio = audioCoachAudioCache.get(cacheKey);
} else {
  // Generate + cache
  base64Audio = await generateSpeechWithGemini(text);
  audioCoachAudioCache.set(cacheKey, base64Audio);
}
```

### Gemini TTS API Implementation

**Model:** `gemini-2.5-flash-preview-tts`

**Request Format:**
```javascript
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${GEMINI_API_KEY}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: fullText }]
      }],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: state.audioCoachVoiceName // e.g., 'Charon'
            }
          }
        }
      }
    })
  }
);
```

**Response:**
```javascript
{
  candidates: [{
    content: {
      parts: [{
        inlineData: {
          mimeType: 'audio/pcm',
          data: 'base64EncodedAudioData...'
        }
      }]
    }
  }]
}
```

### Prompt Engineering for Voice Control

Gemini TTS uses **Director's Notes** to control voice characteristics:

```javascript
const directorNotes = `# AUDIO PROFILE: Professional Interview Coach
A mature, authoritative male voice with an American accent. Clear, confident delivery suitable for business interview preparation.

## DIRECTOR'S NOTES
Style: Professional, confident, and authoritative. The tone should be supportive yet firm, like an experienced executive coach.
Accent: American English (General American accent).
Gender: Male voice with a mature, professional tone.
`;

// Speed control via pacing instruction
const speedInstructions = {
  0.75: 'Pacing: Speak slowly and clearly, emphasizing each word for maximum clarity.\n',
  1.0: 'Pacing: Speak at a natural, conversational pace.\n',
  1.25: 'Pacing: Speak at a slightly faster, energetic pace.\n',
  1.5: 'Pacing: Speak quickly and efficiently.\n'
};

// Combine: director notes + pacing + content
const fullText = directorNotes + speedInstruction + '\n## TRANSCRIPT\n' + text;
```

**Why this works:**
- Gemini TTS is an LLM that understands **how to speak**, not just what to say
- Director's notes guide style, accent, gender, and tone
- Works regardless of selected voice name
- More control than traditional TTS parameters

### Audio Format: Base64 → WAV Conversion

**Gemini TTS Output:**
- **Format**: PCM (s16le)
- **Sample Rate**: 24000 Hz
- **Channels**: Mono (1)
- **Bit Depth**: 16-bit
- **Encoding**: Base64 string

**Conversion to WAV:**
```javascript
function createWavFile(audioData) {
  const sampleRate = 24000;
  const numChannels = 1;
  const bitsPerSample = 16;

  // Create 44-byte WAV header
  const wavHeader = new ArrayBuffer(44);
  const view = new DataView(wavHeader);

  // RIFF chunk descriptor
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + audioData.length, true);
  writeString(view, 8, 'WAVE');

  // fmt sub-chunk (PCM format)
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size
  view.setUint16(20, 1, true); // AudioFormat (PCM)
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * bitsPerSample / 8, true);
  view.setUint16(32, numChannels * bitsPerSample / 8, true);
  view.setUint16(34, bitsPerSample, true);

  // data sub-chunk
  writeString(view, 36, 'data');
  view.setUint32(40, audioData.length, true);

  // Combine header + audio
  return new Uint8Array([...new Uint8Array(wavHeader), ...audioData]);
}
```

### Voice Options (17 Total)

**Professional (Male/Neutral):**
- Charon (Informative) - Clear, educational tone
- Fenrir (Authoritative) - Confident, commanding
- Orus (Firm) - Direct, professional
- Iapetus (Clear) - Crisp enunciation
- Algenib (Gravelly) - Deep, mature
- Gacrux (Mature) - Experienced tone
- Sadaltager (Knowledgeable) - Expert delivery

**Friendly (Male/Neutral):**
- Puck (Upbeat) - Energetic, positive
- Achird (Friendly) - Warm, approachable
- Zubenelgenubi (Casual) - Relaxed, conversational

**Smooth (Female/Neutral):**
- Kore (Firm) - Professional female
- Zephyr (Bright) - Light, clear
- Algieba (Smooth) - Gentle, flowing
- Despina (Smooth) - Soft delivery
- Schedar (Even) - Balanced tone
- Sulafat (Warm) - Comforting voice

**Recommendation:** Charon or Fenrir for interview coaching.

### Fallback Strategy

If Gemini TTS fails (network error, API quota, invalid key), the app automatically falls back to Web Speech API:

```javascript
async function playCurrentItem() {
  const textToSpeak = `Question: ${item.title}\n\nSuggested Answer: ${item.script}`;

  if (state.audioCoachUseGemini) {
    try {
      await playWithGeminiTTS(item, textToSpeak);
    } catch (error) {
      console.warn('Gemini TTS failed, falling back to Web Speech API:', error);
      playWithWebSpeechAPI(item, textToSpeak);
    }
  } else {
    playWithWebSpeechAPI(item, textToSpeak);
  }
}
```

**User can toggle Gemini TTS on/off:**
- Checkbox: "🎙️ Gemini TTS (Natural AI voice)"
- Default: ON (uses Gemini)
- When unchecked: Uses Web Speech API (offline-capable)

### UI Improvements (V6.0)

**English Translation:**
- "Selecione uma categoria" → "Select a category"
- "Nenhum item na playlist" → "No items in playlist"
- "Loop (Repetir playlist infinitamente)" → "Loop (Repeat playlist infinitely)"
- "Pausar entre scripts" → "Auto-pause between scripts"
- "Velocidade" → "Speed"

**New Controls:**
- ⏹️ **Stop button**: Completely stops playback (not just pause)
- **Loading indicator**: "🎙️ Generating natural speech..." during API call
- **Voice selector dropdown**: Choose from 17 voices
- **Gemini TTS toggle**: Enable/disable AI voice

**Question/Answer Format:**
```
Before (V5.0): "Now playing: Tell me about yourself. I'm João Leal, 45..."
After (V6.0):  "Question: Tell me about yourself. Suggested Answer: I'm João Leal, 45..."
```

### Performance Optimizations

1. **Cache in Memory** (Map)
   - Stores base64 audio after first generation
   - Key format: `${itemId}-${voiceName}-${speechRate}`
   - Cleared when voice or speed changes

2. **Preload Next Item**
   - Triggers after current item starts playing
   - Runs in background (doesn't block UI)
   - Only preloads if not already cached

3. **Lazy Generation**
   - Audio generated only when needed
   - Not pre-generated for entire playlist
   - Reduces API calls and cost

### Cost Considerations

**Gemini 2.5 Flash TTS Pricing:**
- **Free tier**: 15 RPM (requests per minute)
- **Paid tier**: ~$0.075 per 1M characters

**Typical Usage:**
- Average script: 500 characters
- 20-item playlist: 10,000 characters total
- **Cost per session**: < $0.001 (essentially free)

**Cache effectiveness:**
- 1st playback: API call required
- 2nd+ playback: Instant (from cache)
- Preload reduces perceived latency to near-zero

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

## V7.0: Coach Alex Edition - Immersive Coaching Experience

**Release Date:** 03/01/2026
**Spec Document:** `docs/melhorias_audio_coach.md`

### Overview

V7.0 transforms Audio Coach from a simple TTS reader into an **immersive coaching experience** with Coach Alex persona, contextual framing, and logical playlist ordering.

### Key Improvements

1. **Coach Alex Persona** - Complete Audio Profile with:
   - Seasoned executive interview coach (15 years experience)
   - The Scene: Private coaching session the night before interview
   - Three delivery modes: Guiding, Question, Modeling
   - Natural emphasis on key phrases

2. **Contextual Framing** - Each script includes:
   - Moment-specific introduction
   - Question presentation (as Jeffrey would ask)
   - Transition phrase before ideal response
   - Key phrases reminder at the end

3. **Title Standardization** - All titles converted to English:
   - "Cumprimento Inicial" → "Opening Greeting"
   - "Tell Me About Yourself - Versão Completa" → "Tell me about yourself"
   - Eliminates PT/EN mixing for consistent voice output

4. **Logical Playlist Ordering** - Category "All" now follows interview flow:
   - opening → about-me → stories → bridges → quick → closing → objections
   - No more random shuffling
   - Internalizes conversation flow, not just individual responses

### Implementation Details

**New Functions** (`index.html`):
- `convertTitleToEnglish()` (lines ~3644-3681): Maps 20+ PT/mixed titles to English
- `buildCoachingText()` (lines ~3683-3767): Builds contextual coaching text with 9 moment-specific intros
- Updated `buildAudioPlaylist()` (lines ~3771-3871): Sorts by logical moment order
- Updated `playCurrentItem()` (line ~3973): Uses buildCoachingText instead of raw script

**Audio Profile Changes** (`index.html` lines ~3459-3482):
- Simplified from 50+ lines to ~20 lines (better Gemini TTS compatibility)
- Removed gender specification (lets voiceName parameter control)
- Focuses on delivery modes and pacing instead of persona details

**Cache Versioning** (lines ~3773, ~3992):
- Cache key now: `v7.0-${item.id}-${voice}-${rate}`
- Automatically invalidates V6.0 cache

**Service Worker**: Bumped to v12

### User Experience Impact

**Before (V6.0):**
```
"Question: Tell Me About Yourself - Versão Completa

Suggested Answer: I'm a finance professional..."
```

**After (V7.0):**
```
"Now, the most important question of the interview. Jeffrey will ask you
to introduce yourself. This is your chance to frame the entire conversation
around your equity experience.

Jeffrey will ask: 'Tell me about yourself.'

Here's exactly how you should respond. Notice how we lead with Joule:

I'm a finance professional with 20 years of experience. For the last 5 years,
I've been a partner at Joule Asset Management...

Remember the key phrases: five years, partner at Joule, investment committee."
```

### Bug Fixes (03/01/2026)

Fixed duplicate fetch URLs that were preventing Gemini TTS from working:
- `generateSpeechWithGemini()`: Removed duplicate gemini-2.0-flash-exp URL
- Rehearsal analysis: Removed duplicate fetch line
- Vício Police setup: Removed duplicate model specification

Corrected `momentOrder` array to match actual data.js values:
- Changed from theoretical values (core-pitch, equity, technical, differentiation)
- To actual values used in data (opening, about-me, stories, bridges, quick, closing, objections)

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

## V5.0: Audio Coach Mode (Listen-Only Training)

**Release Date:** 02/01/2026
**Purpose:** Enable passive practice through audio-only playback of scripts and ideal responses.

### Overview

Audio Coach is a **listen-only training mode** that reads scripts and ideal responses aloud using the browser's native Text-to-Speech API. Unlike Rehearsal Mode (active practice), Audio Coach enables **passive learning** during activities where the user cannot look at the screen or speak (driving, cooking, walking, etc.).

### Key Features

1. **10 Content Categories**
   - All (Shuffle Complete) - Random mix of all scripts
   - Killer Stories - Essential scripts only
   - Opening - Greetings and small talk
   - About Me - Personal introduction
   - Stories - Joule, ABC, EM narratives
   - Equity - Equity experience focus
   - Technical - DCF, ratios, technical concepts
   - Differentiation - Why hire you
   - Closing - Questions and closing statement
   - Objections - Difficult objections handling

2. **Playback Controls**
   - Play/Pause - Start or pause playback
   - Skip Previous/Next - Navigate between scripts
   - Jump to Index - Click playlist item to jump directly

3. **Settings**
   - Loop - Repeat playlist infinitely (default: ON)
   - Auto-pause - 3-second pause between scripts (default: ON)
   - Speech Rate - 0.75x, 1.0x, 1.25x, 1.5x (default: 1.0x)

4. **Media Session API Integration**
   - Lock screen controls on mobile devices
   - Play/Pause/Skip directly from lock screen
   - Works with Bluetooth headphones
   - Displays "Now Playing" metadata

5. **Offline-First**
   - Uses Web Speech API (browser native)
   - No external API calls
   - 100% functional offline after initial load

### Implementation

#### State Management

```javascript
// Audio Coach state in global state object
const state = {
  audioCoachPlaylist: [],           // Current playlist
  audioCoachCurrentIndex: 0,        // Current item index
  audioCoachIsPlaying: false,       // Playback active
  audioCoachIsPaused: false,        // Paused state
  audioCoachLoopEnabled: true,      // Loop playlist
  audioCoachSpeechRate: 1.0,        // Playback speed
  audioCoachSynthesis: window.speechSynthesis,
  audioCoachUtterance: null,        // Current SpeechSynthesisUtterance
  audioCoachCategory: 'all'         // Selected category
};
```

#### Core Functions

**buildAudioPlaylist()** - Builds playlist based on selected category
```javascript
function buildAudioPlaylist() {
  const category = document.getElementById('audio-category')?.value || state.audioCoachCategory;
  state.audioCoachPlaylist = [];
  state.audioCoachCurrentIndex = 0;

  if (category === 'all') {
    state.audioCoachPlaylist = [...rehearsalScripts];
    // Shuffle
    for (let i = state.audioCoachPlaylist.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [state.audioCoachPlaylist[i], state.audioCoachPlaylist[j]] =
        [state.audioCoachPlaylist[j], state.audioCoachPlaylist[i]];
    }
  } else if (category === 'killer') {
    state.audioCoachPlaylist = rehearsalScripts.filter(s => s.isKiller);
  } else {
    state.audioCoachPlaylist = rehearsalScripts.filter(s => s.moment === category);
  }

  // Add objections if applicable
  if (category === 'objections' || category === 'all') {
    objections.forEach(obj => {
      state.audioCoachPlaylist.push({
        id: `objection-${obj.id}`,
        title: `Objection: ${obj.objection}`,
        script: `Question: ${obj.objection}\n\nBest Response: ${obj.idealScript}`,
        duration: '60s',
        moment: 'objections',
        momentLabel: '💣 Objections',
        isKiller: false
      });
    });
  }

  updatePlaylistUI();
  updateAudioCoachUI();
}
```

**playCurrentItem()** - Plays current script using TTS
```javascript
function playCurrentItem() {
  const item = state.audioCoachPlaylist[state.audioCoachCurrentIndex];
  if (!item) return;

  // Stop any existing speech
  state.audioCoachSynthesis.cancel();

  // Update state
  state.audioCoachIsPlaying = true;
  state.audioCoachIsPaused = false;
  updateAudioCoachUI();

  // Build text to speak
  const textToSpeak = `Now playing: ${item.title}. ${item.script}`;

  // Create utterance
  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.rate = state.audioCoachSpeechRate;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // Try to select English voice
  const voices = state.audioCoachSynthesis.getVoices();
  const enVoice = voices.find(v => v.lang.startsWith('en-'));
  if (enVoice) utterance.voice = enVoice;

  // When finished, play next or loop
  utterance.onend = () => {
    state.audioCoachIsPlaying = false;
    const autoPause = document.getElementById('auto-pause-toggle')?.checked;
    if (autoPause) {
      setTimeout(() => playNextOrLoop(), 3000); // 3s pause
    } else {
      playNextOrLoop();
    }
  };

  // Store utterance and speak
  state.audioCoachUtterance = utterance;
  state.audioCoachSynthesis.speak(utterance);

  // Update Media Session API
  if ('mediaSession' in navigator && item) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: item.title,
      artist: 'xAI Pocket Trainer',
      album: item.momentLabel || 'Audio Coach',
      artwork: [
        { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' }
      ]
    });
  }
}
```

**Media Session API Setup** - Lock screen controls
```javascript
if ('mediaSession' in navigator) {
  navigator.mediaSession.setActionHandler('play', () => {
    if (state.currentView === 'audio-coach') togglePlayPause();
  });

  navigator.mediaSession.setActionHandler('pause', () => {
    if (state.currentView === 'audio-coach') pauseAudioCoach();
  });

  navigator.mediaSession.setActionHandler('previoustrack', () => {
    if (state.currentView === 'audio-coach') skipPrevious();
  });

  navigator.mediaSession.setActionHandler('nexttrack', () => {
    if (state.currentView === 'audio-coach') skipNext();
  });
}
```

### UI Components

**HTML Structure:**
- Category selector dropdown
- "Now Playing" card with current script title and category
- Progress bar (visual + text: X/Y)
- Playback controls (⏮️ ▶️/⏸️ ⏭️)
- Settings panel (loop, auto-pause, speed)
- Interactive playlist (scrollable, clickable)

**CSS:**
- Mobile-first design
- Large touch-friendly buttons (70px/90px)
- Responsive layout (adapts to small screens)
- Smooth animations and transitions
- Visual feedback on active playlist item

### Use Cases

1. **Driving** - Listen while commuting or driving to interview
2. **Cooking** - Hands-free practice during meal prep
3. **Walking/Exercise** - Internalize scripts during physical activity
4. **Before Sleep** - Relaxed final review
5. **Multitasking** - Practice while doing household chores

### Complementary Workflow

**Recommended Practice Flow:**
1. **Audio Coach** (passive) - Listen to scripts while doing other activities
2. **Rehearsal Mode** (active) - Record yourself speaking the scripts
3. **Audio Coach** (review) - Listen to ideal versions again to compare

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

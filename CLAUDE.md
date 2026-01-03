# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

---

## Project Overview

**xAI Pocket Trainer** - Progressive Web App for interview preparation. Mobile-first, offline-capable, single-user application for pitch practice, flashcards, objection handling, and speech coaching.

**Key Constraints:**
- Offline-first (works without internet after initial load)
- Client-side + Vercel Edge Functions for API security (V7.1)
- Single-file architecture (no build tools)
- Private deployment (not indexed)

---

## Architecture

### File Structure

```
interview_xai_web_app/
├── index.html          # Main app (~4,100 lines): Structure + Styles + Logic
├── js/data.js          # Content (~1,102 lines): flashcards, prompts, scripts
├── api/                # Vercel Edge Functions (V7.1)
│   ├── gemini-tts.js   # TTS proxy
│   ├── gemini-rest.js  # REST proxy (transcription + analysis)
│   └── gemini-ws.js    # WebSocket proxy (real-time STT)
├── sw.js               # Service Worker (offline caching)
├── manifest.json       # PWA manifest
├── vercel.json         # Deployment config + privacy headers
├── icons/              # PWA icons
└── docs/               # Documentation
```

### Single-File Philosophy

`index.html` contains HTML + CSS + JavaScript (zero build step, instant deployment). `js/data.js` separated for data/logic clarity but loads via `<script>` tag (not ES modules).

### Data Flow

```
js/data.js (window.appData) → index.html → User interactions → localStorage
```

### External Dependencies

**Gemini API** (via Vercel Edge Functions V7.1):
- API key in Vercel env vars (`GEMINI_API_KEY`)
- 3 edge functions proxy requests (key never exposed to client)
- Models: `gemini-2.5-flash-preview-tts` (TTS), `gemini-2.5-flash` (STT/analysis)

**No other dependencies** - pure vanilla JavaScript.

---

## Development Workflow

### Local Development

```bash
# Windows
start index.html

# macOS/Linux
open index.html
```

**Note:** PWA features require HTTPS (localhost or Vercel deployment).

### Testing Changes

1. Edit `index.html` or `js/data.js`
2. Refresh browser (Ctrl+R / Cmd+R)
3. If cached, hard refresh (Ctrl+Shift+R) or DevTools → Service Workers → Unregister

### Service Worker Versioning

**CRITICAL:** Increment `CACHE_NAME` in `sw.js` when deploying:
```javascript
const CACHE_NAME = 'xai-trainer-vX'; // Increment X
```

**Current version:** `v13` (V7.1 - 03/01/2026)

**Version History:**
- v13: V7.1 Secure API Key via Edge Functions (03/01/2026)
- v12: V7.0 Coach Alex immersive coaching (03/01/2026)
- v11: V6.0 Gemini TTS integration (02/01/2026)
- v10: V5.0 Audio Coach listen-only mode (02/01/2026)
- v7: Gemini 2.5 Flash stable (02/01/2026)
- v6: V4.0 Rehearsal Mode (02/01/2026)

---

## Key Features

### 1. Hash-Based Routing
URL fragments control views: `#dashboard`, `#flashcards`, etc.

### 2. State Management
Global `state` object stores runtime data (flashcards, timers, audio streams, etc.)

### 3. localStorage Persistence
Keys: `xai-trainer-review-cards`, `xai-trainer-known-cards`, `xai-trainer-last-category`, `xai-trainer-checklist`

### 4. Gemini API Integration (V7.1)

**Edge Functions** protect API key:
```javascript
// TTS Proxy (api/gemini-tts.js)
fetch('/api/gemini-tts', {
  method: 'POST',
  body: JSON.stringify({ contents: [{ parts: [{ text }] }] })
});

// REST Proxy (api/gemini-rest.js)
fetch('/api/gemini-rest', {
  method: 'POST',
  body: JSON.stringify({ contents: [{ parts: [{ inlineData: { data: base64Audio } }] }] })
});

// WebSocket Proxy (api/gemini-ws.js)
const { wsUrl } = await fetch('/api/gemini-ws').then(r => r.json());
const ws = new WebSocket(wsUrl);
```

**Audio Capture** (Vício Police):
- MediaRecorder → base64 chunks → WebSocket to Gemini
- Real-time transcription + word detection
- Haptic feedback on mobile

---

## Feature Highlights

### V7.0: Coach Alex Edition (03/01/2026)

**Immersive coaching** with contextual framing:
- Coach Alex persona (seasoned executive coach)
- Moment-specific introductions
- Logical playlist ordering (follows interview flow)
- All titles standardized to English
- Cache invalidation: `v7.0-${itemId}-${voice}-${rate}`

**Example Output:**
```
"Now, the most important question. Jeffrey will ask: 'Tell me about yourself.'

Here's exactly how to respond. Notice we lead with Joule:

I'm a finance professional with 20 years of experience...

Remember the key phrases: five years, partner at Joule, investment committee."
```

### V6.0: Gemini TTS (02/01/2026)

**Natural AI voice** vs robotic browser TTS:
- 17 voice options (Charon/Fenrir recommended)
- Director's Notes prompt engineering for voice control
- Intelligent caching (instant 2nd playback)
- Auto-preload next item
- Fallback to Web Speech API

**Audio Format:** PCM (24kHz, mono, 16-bit) → WAV conversion

### V5.0: Audio Coach (02/01/2026)

**Passive learning** for hands-free practice:
- 10 categories (All, Killer Stories, Opening, Stories, Equity, etc.)
- Media Session API (lock screen controls)
- Loop + auto-pause + speed control
- Offline-capable

---

## Data Structures (js/data.js)

### Flashcards
```javascript
{ id, category, front, back, isKillerStory }
// Categories: tecnico, historias, pessoas, frases, tips
```

### Pitch Prompts
```javascript
{ id, question, script, checklist }
```

### Objections
```javascript
{ id, question, options: [{ text, type }], explanation, idealScript }
```

### Vício Police Words
```javascript
{ forbidden: [...], desired: [...] }
```

---

## Common Tasks

### Adding Content

**Flashcards** - Edit `js/data.js` → `flashcardsData` array
**Prompts** - Edit `pitchPrompts` array
**Objections** - Edit `objections` array
**Monitored Words** - Edit `vicioPoliceWords`
**Interview Date** - Edit `index.html` → `interviewDate` variable

### Changing Data

Always edit `js/data.js` or `index.html`, refresh browser, test thoroughly.

---

## Git & GitHub

### Repository

**Remote:** `git@github.com-jrleal10:jrleal10/xai-pocket-trainer.git`

### SSH Configuration

**CRITICAL:** `~/.ssh/config` must have:
```
Host github.com-jrleal10
    HostName github.com
    User git
    IdentityFile C:\Users\joaor\.ssh\id_ed25519
    IdentitiesOnly yes
```

### Git Workflow

```bash
# Check remote
git remote -v

# Fix if needed
git remote set-url origin git@github.com-jrleal10:jrleal10/xai-pocket-trainer.git

# Standard flow
git add .
git commit -m "feat: description"
git push origin main
```

**Commit Convention:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `refactor:` Code refactoring
- `style:` CSS/formatting

---

## Deployment

### Vercel (Production)

**URL:** https://interviewxaiwebapp.vercel.app/

```bash
vercel --prod
```

**Auto-deploy:** Push to `main` triggers deployment.
**Privacy:** `vercel.json` adds `X-Robots-Tag: noindex, nofollow`

### Manual Deployment

Upload to any static host with HTTPS (required for PWA).

---

## Post-Implementation Workflow

**CRITICAL:** After completing ANY implementation:

1. **Test Thoroughly**
   - Request user to test all changes
   - Verify offline functionality (Service Worker)
   - Check mobile responsiveness
   - Test edge cases

2. **If User Approves, Update Documentation:**
   - `README.md` - Update version, features list, changelog
   - `CLAUDE.md` - Update current version, architecture changes, new features
   - `docs/IMPLEMENTATION_LOG.md` - Add entry with date, version, changes, issues
   - `docs/TECHNICAL_DOCUMENTATION.md` - Update if architecture/API changes

3. **Update Version Tracking:**
   - Increment `CACHE_NAME` in `sw.js` (e.g., v13 → v14)
   - Update "Current version" in CLAUDE.md
   - Add version to history with date

4. **Commit & Push:**
   ```bash
   git add .
   git commit -m "feat: [descriptive message] - VX.X"
   git push origin main
   ```

   **SSH Config:** Uses `github.com-jrleal10` host alias (see Git & GitHub section)

5. **Deployment:**
   - Vercel auto-deploys from `main` branch
   - Verify production URL after 1-2 minutes

**Template Commit Message:**
```
feat: [Feature Name] - V[X.X]

- [Change 1]
- [Change 2]
- [Change 3]

Testing: [What was tested]
```

---

## Privacy & Security

**3 Layers:**
1. `robots.txt` blocks crawlers
2. Meta tags: `<meta name="robots" content="noindex, nofollow">`
3. HTTP headers: `X-Robots-Tag: noindex, nofollow`

**Data Privacy:**
- localStorage only (no server storage)
- No analytics or tracking
- Gemini API for TTS/STT only

---

## Browser Compatibility

**Supported:** Chrome, Edge, Safari, Firefox (desktop + mobile)

**Required APIs:** Service Worker, localStorage, MediaRecorder, getUserMedia, WebSocket, Vibration (mobile)

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Service Worker not updating | Hard refresh (Ctrl+Shift+R), unregister SW, increment CACHE_NAME |
| localStorage not persisting | Use normal window (not incognito) |
| Gemini API fails | Check HTTPS, API key in Vercel env vars, mic permission, network |
| PWA not installing | Requires HTTPS (test on Vercel URL, not local IP) |

---

## Code Conventions

**JavaScript:**
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- State: `camelCase`
- DOM IDs: `kebab-case`

**CSS:**
Use CSS variables from `:root` (e.g., `var(--bg-primary)`)

**Important Notes:**
- Avoid curly quotes from Google Docs (use straight quotes in code)
- Vibration API mobile-only (gracefully fails on desktop)
- JavaScript timers not perfectly accurate (acceptable for UX)

---

## Performance

- Initial load: ~125 KB
- Cached: ~500 KB (with icons)
- Offline load: <100ms
- Animations: CSS-based (60fps)

---

## Future Enhancements

If extending:
- Export/import flashcard progress
- Push notifications (requires backend)
- Spaced repetition algorithm
- Voice recording + playback
- Fluency analytics (WPM, filler word detection)
- Full Mock Interview with AI evaluation

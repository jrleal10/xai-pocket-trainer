// ============================================
// SECTION 1: CONSTANTS & DATA
// ============================================

const INTERVIEW_DATE = new Date('2025-12-29T17:00:00-03:00');

// Gemini Live API Configuration
const GEMINI_API_KEY = 'AIzaSyC0qCmiyVqyJQ3dqrgp6loA4hcq7a7bjZM';
const GEMINI_WS_URL = 'wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent';

// Data constants are now loaded from js/data.js
// Available via window.appData or directly (window.flashcardsData, window.pitchPrompts, etc.)
const {
  keyPhrases,
  flashcardsData,
  pitchPrompts,
  objections,
  vicioPoliceWords,
  randomPillData,
  preFlightChecklist,
  miniStories
} = window.appData || {};

// Fallback in case data.js fails to load (should never happen)
if (!flashcardsData) {
  console.error('CRITICAL: js/data.js failed to load!');
  alert('Erro ao carregar dados do app. Verifique se js/data.js existe.');
}

// ============================================
// SECTION 2: STATE MANAGEMENT
// ============================================

const state = {
  currentView: 'dashboard',
  currentCardIndex: 0,
  currentPhraseIndex: 0,
  filteredCards: [...flashcardsData],
  reviewNeeded: [],
  knownCards: [],
  isCardFlipped: false,
  // Timer state
  selectedTime: 60,
  currentPromptIndex: 0,
  timerRunning: false,
  timerStartTime: null,
  timerInterval: null,
  // Objections state
  currentObjectionIndex: 0,
  objectionsAnswered: 0,
  objectionsCorrect: 0,
  objectionTimer: null,
  objectionTimeRemaining: 5,
  // Random Pill state
  currentQuiz: null,
  // Vício Police state
  vicioWebSocket: null,
  vicioMediaRecorder: null,
  vicioAudioStream: null,
  vicioTranscript: '',
  vicioStats: { forbidden: {}, desired: {} },
  vicioIsListening: false,
  vicioCurrentPrompt: null
};

// ============================================
// SECTION 3: NAVIGATION
// ============================================

function navigateTo(viewId) {
  // Hide all views
  document.querySelectorAll('.view').forEach(view => {
    view.classList.remove('active');
  });

  // Show target view
  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.add('active');
    state.currentView = viewId;
    window.location.hash = viewId;

    // Initialize view-specific logic
    if (viewId === 'flashcards') {
      initFlashcards();
    } else if (viewId === 'pitch') {
      initPitchTimer();
    } else if (viewId === 'objections') {
      initObjections();
    } else if (viewId === 'random-pill') {
      initRandomPill();
    } else if (viewId === 'preflight') {
      initPreFlight();
    } else if (viewId === 'vicio-police') {
      initVicioPolice();
    }
  }
}

// Handle browser back/forward
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.slice(1) || 'dashboard';
  if (hash !== state.currentView) {
    navigateTo(hash);
  }
});

// ============================================
// SECTION 4: COUNTDOWN TIMER
// ============================================

function updateCountdown() {
  const now = new Date();
  const diff = INTERVIEW_DATE - now;

  const countdownEl = document.getElementById('countdown-display');

  if (diff <= 0) {
    countdownEl.textContent = 'ENTREVISTA AGORA! 🎯';
    countdownEl.classList.add('today');
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  // Check if today
  const isToday = days === 0;

  if (isToday) {
    countdownEl.textContent = `HOJE! Faltam ${hours}h ${minutes}min`;
    countdownEl.classList.add('today');
  } else {
    countdownEl.textContent = `${days} dias, ${hours} horas, ${minutes} minutos`;
    countdownEl.classList.remove('today');
  }
}

// Update countdown every minute
setInterval(updateCountdown, 60000);

// ============================================
// SECTION 5: PHRASE ROTATION
// ============================================

function displayPhrase() {
  const phraseEl = document.getElementById('phrase-text');
  phraseEl.textContent = keyPhrases[state.currentPhraseIndex];
}

function nextPhrase() {
  state.currentPhraseIndex = (state.currentPhraseIndex + 1) % keyPhrases.length;
  displayPhrase();
}

// Auto-rotate phrases every 30 seconds
let phraseInterval = setInterval(nextPhrase, 30000);

// Reset interval when user manually clicks
document.getElementById('phrase-moment')?.addEventListener('click', () => {
  clearInterval(phraseInterval);
  phraseInterval = setInterval(nextPhrase, 30000);
});

// ============================================
// SECTION 6: FLASHCARDS LOGIC
// ============================================

function initFlashcards() {
  loadState();
  applyFilter();
  displayCurrentCard();
}

function displayCurrentCard() {
  if (state.filteredCards.length === 0) {
    document.getElementById('card-front').textContent = 'Nenhum card nesta categoria';
    document.getElementById('card-back').textContent = 'Selecione outra categoria';
    return;
  }

  const card = state.filteredCards[state.currentCardIndex];
  const categoryLabels = {
    'tecnico': 'Técnico',
    'historias': 'Histórias',
    'pessoas': 'Pessoas',
    'frases': 'Frases-Chave',
    'dos-donts': "Do's & Don'ts"
  };

  // Update progress
  document.getElementById('card-progress').textContent =
    `Card ${state.currentCardIndex + 1} de ${state.filteredCards.length}`;

  // Update category badges
  const categoryLabel = categoryLabels[card.category] || card.category;
  document.getElementById('card-category').textContent = categoryLabel;
  document.getElementById('card-category-back').textContent = categoryLabel;

  // Update content
  document.getElementById('card-front').textContent = card.front;
  document.getElementById('card-back').textContent = card.back;

  // Reset flip state
  state.isCardFlipped = false;
  document.getElementById('flashcard').classList.remove('flipped');
}

function flipCard() {
  state.isCardFlipped = !state.isCardFlipped;
  const flashcard = document.getElementById('flashcard');
  if (state.isCardFlipped) {
    flashcard.classList.add('flipped');
  } else {
    flashcard.classList.remove('flipped');
  }
}

function nextCard() {
  state.currentCardIndex = (state.currentCardIndex + 1) % state.filteredCards.length;
  displayCurrentCard();
}

function markForReview() {
  const card = state.filteredCards[state.currentCardIndex];
  if (!state.reviewNeeded.includes(card.id)) {
    state.reviewNeeded.push(card.id);
  }
  saveState();
  nextCard();
}

function markAsKnown() {
  const card = state.filteredCards[state.currentCardIndex];
  if (!state.knownCards.includes(card.id)) {
    state.knownCards.push(card.id);
  }
  // Remove from review needed if it was there
  state.reviewNeeded = state.reviewNeeded.filter(id => id !== card.id);
  saveState();
  nextCard();
}

function filterByCategory() {
  const filter = document.getElementById('category-filter').value;

  if (filter === 'all') {
    state.filteredCards = [...flashcardsData];
  } else {
    state.filteredCards = flashcardsData.filter(card => card.category === filter);
  }

  // Prioritize review-needed cards
  const reviewCards = state.filteredCards.filter(card => state.reviewNeeded.includes(card.id));
  const otherCards = state.filteredCards.filter(card => !state.reviewNeeded.includes(card.id));
  state.filteredCards = [...reviewCards, ...reviewCards, ...otherCards]; // Show review cards 2x

  state.currentCardIndex = 0;
  displayCurrentCard();
  saveState();
}

function applyFilter() {
  const savedFilter = localStorage.getItem('xai-category-filter');
  if (savedFilter) {
    document.getElementById('category-filter').value = savedFilter;
    filterByCategory();
  } else {
    filterByCategory();
  }
}

function shuffleCards() {
  // Fisher-Yates shuffle
  for (let i = state.filteredCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [state.filteredCards[i], state.filteredCards[j]] = [state.filteredCards[j], state.filteredCards[i]];
  }
  state.currentCardIndex = 0;
  displayCurrentCard();
}

// Touch events for swipe gestures
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('flashcard')?.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('flashcard')?.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchEndX - touchStartX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff < 0) {
      // Swipe left - mark for review
      markForReview();
    } else {
      // Swipe right - mark as known
      markAsKnown();
    }
  }
}

// ============================================
// SECTION 6.5: 45-SECOND PITCH TIMER LOGIC
// ============================================

function initPitchTimer() {
  // Reset to setup screen
  document.getElementById('pitch-setup').style.display = 'block';
  document.getElementById('pitch-running').style.display = 'none';
  document.getElementById('pitch-review').style.display = 'none';

  // Update prompt display
  updatePromptDisplay();

  // Setup time selector buttons
  document.querySelectorAll('.time-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      state.selectedTime = parseInt(this.getAttribute('data-seconds'));
    });
  });

  // Setup START button
  document.getElementById('start-timer-btn').addEventListener('click', startTimer);

  // Setup review buttons
  document.getElementById('try-again-btn').addEventListener('click', () => {
    initPitchTimer();
  });

  document.getElementById('next-prompt-btn').addEventListener('click', () => {
    state.currentPromptIndex = (state.currentPromptIndex + 1) % pitchPrompts.length;
    initPitchTimer();
  });
}

function updatePromptDisplay() {
  const prompt = pitchPrompts[state.currentPromptIndex];
  document.getElementById('current-prompt-title').textContent =
    `Prompt ${state.currentPromptIndex + 1} de ${pitchPrompts.length}`;
  document.getElementById('prompt-text').textContent = prompt.prompt;
  document.getElementById('running-prompt').textContent = prompt.prompt;
}

function startTimer() {
  // Hide setup, show running screen
  document.getElementById('pitch-setup').style.display = 'none';
  document.getElementById('pitch-running').style.display = 'block';

  // Initialize timer
  state.timerRunning = true;
  state.timerStartTime = performance.now();
  const duration = state.selectedTime * 1000; // Convert to milliseconds

  // Initialize display
  document.getElementById('timer-display').textContent = state.selectedTime;
  document.getElementById('timer-progress').style.width = '0%';
  document.getElementById('wrap-up-message').style.display = 'none';

  // Reset timer classes
  const timerDisplay = document.getElementById('timer-display');
  const progressBar = document.getElementById('timer-progress');
  timerDisplay.className = 'timer-display-large';
  progressBar.className = 'progress-bar';

  let hasVibratedYellow = false;
  let hasVibratedRed = false;

  // Update timer using requestAnimationFrame for accuracy
  function updateTimer() {
    if (!state.timerRunning) return;

    const elapsed = performance.now() - state.timerStartTime;
    const remaining = Math.max(0, duration - elapsed);
    const remainingSeconds = Math.ceil(remaining / 1000);
    const progressPercent = (elapsed / duration) * 100;

    // Update display
    document.getElementById('timer-display').textContent = remainingSeconds;
    document.getElementById('timer-progress').style.width = `${Math.min(100, progressPercent)}%`;

    // Color phases based on progress
    if (progressPercent < 60) {
      // Green phase (0-60%)
      timerDisplay.classList.remove('timer-phase-yellow', 'timer-phase-red');
      timerDisplay.classList.add('timer-phase-green');
      progressBar.classList.remove('progress-yellow', 'progress-red');
      progressBar.classList.add('progress-green');
    } else if (progressPercent < 85) {
      // Yellow phase (60-85%)
      timerDisplay.classList.remove('timer-phase-green', 'timer-phase-red');
      timerDisplay.classList.add('timer-phase-yellow');
      progressBar.classList.remove('progress-green', 'progress-red');
      progressBar.classList.add('progress-yellow');

      // Vibrate once when entering yellow
      if (!hasVibratedYellow && navigator.vibrate) {
        navigator.vibrate(200);
        hasVibratedYellow = true;
      }
    } else {
      // Red phase (85-100%)
      timerDisplay.classList.remove('timer-phase-green', 'timer-phase-yellow');
      timerDisplay.classList.add('timer-phase-red');
      progressBar.classList.remove('progress-green', 'progress-yellow');
      progressBar.classList.add('progress-red');
      document.getElementById('wrap-up-message').style.display = 'block';

      // Vibrate pattern when entering red
      if (!hasVibratedRed && navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 100]);
        hasVibratedRed = true;
      }
    }

    // Check if timer is done
    if (remaining <= 0) {
      state.timerRunning = false;
      showReview();
    } else {
      requestAnimationFrame(updateTimer);
    }
  }

  // Start the timer loop
  requestAnimationFrame(updateTimer);
}

function stopTimer() {
  state.timerRunning = false;
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
}

function showReview() {
  // Hide running screen, show review screen
  document.getElementById('pitch-running').style.display = 'none';
  document.getElementById('pitch-review').style.display = 'block';

  // Get current prompt
  const prompt = pitchPrompts[state.currentPromptIndex];

  // Populate checklist
  const checklistContainer = document.getElementById('review-checklist');
  checklistContainer.innerHTML = '';
  prompt.checklist.forEach(item => {
    const checkItem = document.createElement('div');
    checkItem.className = 'checklist-item';
    checkItem.innerHTML = `<span class="checkbox">☐</span> ${item}`;
    checklistContainer.appendChild(checkItem);
  });

  // Populate ideal script
  document.getElementById('ideal-script-content').textContent = prompt.idealScript;
}

// ============================================
// SECTION 6.6: OBJECTION HANDLING LOGIC
// ============================================

function initObjections() {
  // Reset state
  state.currentObjectionIndex = 0;
  state.objectionsAnswered = 0;
  state.objectionsCorrect = 0;

  // Show question screen
  document.getElementById('objection-question').style.display = 'block';
  document.getElementById('objection-feedback').style.display = 'none';
  document.getElementById('objection-complete').style.display = 'none';

  // Setup restart button
  const restartBtn = document.getElementById('restart-objections-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', initObjections);
  }

  // Show first question
  showObjectionQuestion();
}

function showObjectionQuestion() {
  const objection = objections[state.currentObjectionIndex];

  // Update display
  document.getElementById('objection-number').textContent =
    `Objeção ${state.currentObjectionIndex + 1} de ${objections.length}`;
  document.getElementById('objection-text').textContent = objection.objection;
  document.getElementById('objection-score').textContent =
    `Score: ${state.objectionsCorrect}/${state.objectionsAnswered}`;

  // Clear and populate options
  const optionsContainer = document.getElementById('objection-options');
  optionsContainer.innerHTML = '';

  objection.options.forEach((option, index) => {
    const optionBtn = document.createElement('button');
    optionBtn.className = 'btn btn-secondary';
    optionBtn.style.textAlign = 'left';
    optionBtn.style.padding = '1rem';
    optionBtn.textContent = String.fromCharCode(65 + index) + '. ' + option.text;
    optionBtn.addEventListener('click', () => selectAnswer(index));
    optionsContainer.appendChild(optionBtn);
  });

  // Start 5-second countdown
  startObjectionTimer();
}

function startObjectionTimer() {
  state.objectionTimeRemaining = 5;
  document.getElementById('objection-timer').textContent = state.objectionTimeRemaining;

  // Clear existing timer
  if (state.objectionTimer) {
    clearInterval(state.objectionTimer);
  }

  // Countdown
  state.objectionTimer = setInterval(() => {
    state.objectionTimeRemaining--;
    document.getElementById('objection-timer').textContent = state.objectionTimeRemaining;

    if (state.objectionTimeRemaining <= 0) {
      clearInterval(state.objectionTimer);
      // Auto-select first option (wrong answer) on timeout
      selectAnswer(-1); // -1 indicates timeout
    }
  }, 1000);
}

function selectAnswer(selectedIndex) {
  // Stop timer
  if (state.objectionTimer) {
    clearInterval(state.objectionTimer);
    state.objectionTimer = null;
  }

  // Disable all option buttons
  document.querySelectorAll('#objection-options button').forEach(btn => {
    btn.disabled = true;
  });

  // Show feedback
  showObjectionFeedback(selectedIndex);
}

function showObjectionFeedback(selectedIndex) {
  const objection = objections[state.currentObjectionIndex];
  state.objectionsAnswered++;

  // Hide question, show feedback
  document.getElementById('objection-question').style.display = 'none';
  document.getElementById('objection-feedback').style.display = 'block';

  // Determine result
  let result, resultColor, score;

  if (selectedIndex === -1) {
    // Timeout
    result = '⏱️ Tempo Esgotado!';
    resultColor = 'var(--color-error)';
    score = 0;
  } else {
    score = objection.options[selectedIndex].score;

    if (selectedIndex === objection.correctIndex) {
      result = '✅ Correto!';
      resultColor = 'var(--accent-primary)';
      state.objectionsCorrect++;
    } else if (score === 1) {
      result = '⚠️ Parcial';
      resultColor = 'var(--color-warning)';
    } else {
      result = '❌ Errado';
      resultColor = 'var(--color-error)';
    }
  }

  // Display result
  const resultDiv = document.getElementById('feedback-result');
  resultDiv.textContent = result;
  resultDiv.style.color = resultColor;

  // Display explanation
  document.getElementById('feedback-explanation').textContent = objection.explanation;

  // Display ideal script
  document.getElementById('feedback-ideal-script').textContent = objection.idealScript;

  // Update score
  document.getElementById('feedback-score').textContent =
    `Score: ${state.objectionsCorrect}/${state.objectionsAnswered}`;

  // Setup next button
  const nextBtn = document.getElementById('next-objection-btn');
  nextBtn.onclick = nextObjection;
}

function nextObjection() {
  state.currentObjectionIndex++;

  if (state.currentObjectionIndex >= objections.length) {
    // Session complete
    showObjectionComplete();
  } else {
    // Show next question
    document.getElementById('objection-feedback').style.display = 'none';
    document.getElementById('objection-question').style.display = 'block';
    showObjectionQuestion();
  }
}

function showObjectionComplete() {
  // Hide feedback, show complete screen
  document.getElementById('objection-feedback').style.display = 'none';
  document.getElementById('objection-complete').style.display = 'block';

  // Display final score
  document.getElementById('final-score-display').textContent =
    `${state.objectionsCorrect}/${objections.length}`;
}

// ============================================
// SECTION 7: LOCALSTORAGE PERSISTENCE
// ============================================

function saveState() {
  try {
    localStorage.setItem('xai-review-needed', JSON.stringify(state.reviewNeeded));
    localStorage.setItem('xai-known-cards', JSON.stringify(state.knownCards));
    localStorage.setItem('xai-category-filter', document.getElementById('category-filter')?.value || 'all');
  } catch (e) {
    console.warn('Could not save state to localStorage:', e);
  }
}

function loadState() {
  try {
    const reviewNeeded = localStorage.getItem('xai-review-needed');
    const knownCards = localStorage.getItem('xai-known-cards');

    if (reviewNeeded) {
      state.reviewNeeded = JSON.parse(reviewNeeded);
    }
    if (knownCards) {
      state.knownCards = JSON.parse(knownCards);
    }
  } catch (e) {
    console.warn('Could not load state from localStorage:', e);
  }
}

// ============================================
// SECTION 7: RANDOM PILL FUNCTIONS
// ============================================

function initRandomPill() {
  generateRandomPill();
}

function generateRandomPill() {
  const types = ['frase', 'tip', 'quiz', 'ratio'];
  const type = types[Math.floor(Math.random() * types.length)];

  let content, header;

  switch(type) {
    case 'frase':
      const frase = randomPillData.frases[Math.floor(Math.random() * randomPillData.frases.length)];
      header = '💬 Frase-Chave';
      content = `<p class="pill-text">"${frase}"</p>`;
      break;

    case 'tip':
      const tip = randomPillData.tips[Math.floor(Math.random() * randomPillData.tips.length)];
      header = '💡 Dica';
      content = `<p class="pill-text">${tip}</p>`;
      break;

    case 'quiz':
      const quiz = randomPillData.quickQuiz[Math.floor(Math.random() * randomPillData.quickQuiz.length)];
      state.currentQuiz = quiz;
      header = '❓ Quiz';
      content = `
            <p class="pill-text">${quiz.q}</p>
            <div class="pill-quiz-buttons">
              <button class="btn" onclick="answerQuiz(true)">Verdadeiro</button>
              <button class="btn" onclick="answerQuiz(false)">Falso</button>
            </div>
            <div id="quiz-result" class="quiz-result"></div>
          `;
      break;

    case 'ratio':
      const ratioCards = flashcardsData.filter(c => c.category === 'tecnico');
      if (ratioCards.length === 0) {
        // Fallback if no technical cards found - try again
        generateRandomPill();
        return;
      }
      const ratio = ratioCards[Math.floor(Math.random() * ratioCards.length)];
      header = '📊 Ratio do Dia';
      content = `
            <h3>${ratio.front}</h3>
            <p class="pill-text">${ratio.back}</p>
          `;
      break;
  }

  document.getElementById('pill-type').textContent = header;
  document.getElementById('pill-content').innerHTML = content;
}

function answerQuiz(answer) {
  const correct = state.currentQuiz.a === answer;
  const resultDiv = document.getElementById('quiz-result');

  if (correct) {
    resultDiv.innerHTML = '<p class="quiz-correct">✅ Correto!</p>';
    resultDiv.className = 'quiz-result correct';
  } else {
    resultDiv.innerHTML = '<p class="quiz-wrong">❌ Errado!</p>';
    resultDiv.className = 'quiz-result wrong';
  }
}

// ============================================
// SECTION 8: PRE-FLIGHT CHECKLIST FUNCTIONS
// ============================================

function initPreFlight() {
  // Load saved state
  const saved = JSON.parse(localStorage.getItem('preflight-checks') || '{}');

  // Render checklists
  Object.keys(preFlightChecklist).forEach(section => {
    const container = document.getElementById(`checklist-${section}`);
    container.innerHTML = '';

    preFlightChecklist[section].forEach((item, index) => {
      const checked = saved[section] && saved[section][index] || false;

      const div = document.createElement('div');
      div.className = 'checkbox-item';
      div.innerHTML = `
            <input type="checkbox"
                   id="${section}-${index}"
                   ${checked ? 'checked' : ''}
                   onchange="togglePreflightItem('${section}', ${index})">
            <label for="${section}-${index}">${item}</label>
          `;
      container.appendChild(div);
    });
  });

  // Populate mini stories
  document.getElementById('joule-text').textContent = miniStories.joule;
  document.getElementById('abc-text').textContent = miniStories.abc;
  document.getElementById('em-text').textContent = miniStories.em;
  document.getElementById('closing-text').textContent = miniStories.closing;

  updatePreflightProgress();
}

function togglePreflightItem(section, index) {
  const saved = JSON.parse(localStorage.getItem('preflight-checks') || '{}');

  if (!saved[section]) saved[section] = {};

  const checkbox = document.getElementById(`${section}-${index}`);
  saved[section][index] = checkbox.checked;

  localStorage.setItem('preflight-checks', JSON.stringify(saved));
  updatePreflightProgress();
}

function updatePreflightProgress() {
  const saved = JSON.parse(localStorage.getItem('preflight-checks') || '{}');
  let total = 0;
  let completed = 0;

  Object.keys(preFlightChecklist).forEach(section => {
    total += preFlightChecklist[section].length;
    if (saved[section]) {
      completed += Object.values(saved[section]).filter(Boolean).length;
    }
  });

  const percent = Math.round((completed / total) * 100);

  document.getElementById('preflight-progress').style.width = `${percent}%`;
  document.getElementById('preflight-count').textContent = completed;
}

function toggleMiniCard(story) {
  const content = document.getElementById(`${story}-content`);
  const icon = document.getElementById(`${story}-icon`);

  content.classList.toggle('hidden');
  icon.textContent = content.classList.contains('hidden') ? '▼' : '▲';
}

function resetPreflight() {
  if (!confirm('Tem certeza que quer resetar o checklist? Isso apagará todo o progresso.')) return;

  localStorage.removeItem('preflight-checks');
  initPreFlight();
}

// ============================================
// SECTION 9: SERVICE WORKER REGISTRATION
// ============================================

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered:', registration);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

// ==========================================
// SECTION 10: VÍCIO POLICE (Gemini Live API)
// ==========================================

function initVicioPolice() {
  // Reset state
  state.vicioTranscript = '';
  state.vicioStats = { forbidden: {}, desired: {} };
  state.vicioIsListening = false;

  // Show start screen
  document.getElementById('vicio-start').classList.remove('hidden');
  document.getElementById('vicio-practice').classList.add('hidden');
  document.getElementById('vicio-results').classList.add('hidden');
}

async function startVicioPolice() {
  try {
    // Reset stats
    state.vicioStats = { forbidden: {}, desired: {} };
    state.vicioTranscript = '';

    // Pick random prompt from pitchPrompts
    const randomPrompt = pitchPrompts[Math.floor(Math.random() * pitchPrompts.length)];
    state.vicioCurrentPrompt = randomPrompt;

    // Show practice view
    document.getElementById('vicio-start').classList.add('hidden');
    document.getElementById('vicio-results').classList.add('hidden');
    document.getElementById('vicio-practice').classList.remove('hidden');

    document.getElementById('vicio-prompt').textContent = randomPrompt.prompt;
    document.getElementById('vicio-transcript').textContent = '';
    document.getElementById('vicio-alerts').innerHTML = '';
    document.getElementById('vicio-status').textContent = '🎤 Conectando ao Gemini...';

    // 1. Request microphone permission
    state.vicioAudioStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        sampleRate: 16000,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    });

    document.getElementById('vicio-status').textContent = '🎤 Conectado! Ouvindo...';

    // 2. Connect to Gemini Live API via WebSocket
    const wsUrl = `${GEMINI_WS_URL}?key=${GEMINI_API_KEY}`;
    state.vicioWebSocket = new WebSocket(wsUrl);

    state.vicioWebSocket.onopen = () => {
      console.log('Gemini WebSocket connected');

      // Send initial setup message
      state.vicioWebSocket.send(JSON.stringify({
        setup: {
          model: 'models/gemini-2.0-flash-exp',
          generationConfig: {
            responseModalities: ['TEXT']
          }
        }
      }));

      // Start audio capture
      startAudioCapture();
    };

    state.vicioWebSocket.onmessage = handleGeminiResponse;

    state.vicioWebSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      showVicioError('Erro na conexão com Gemini. Verifique sua internet.');
    };

    state.vicioWebSocket.onclose = () => {
      console.log('Gemini WebSocket closed');
    };

    state.vicioIsListening = true;

  } catch (error) {
    console.error('Failed to start Vício Police:', error);
    showVicioError('Erro ao acessar microfone. Verifique as permissões no navegador.');
  }
}

function startAudioCapture() {
  // Setup MediaRecorder to capture audio chunks
  state.vicioMediaRecorder = new MediaRecorder(state.vicioAudioStream, {
    mimeType: 'audio/webm;codecs=opus',
    audioBitsPerSecond: 16000
  });

  state.vicioMediaRecorder.ondataavailable = async (event) => {
    if (event.data.size > 0 && state.vicioWebSocket && state.vicioWebSocket.readyState === WebSocket.OPEN) {
      // Convert audio blob to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Audio = reader.result.split(',')[1];

        // Send audio chunk to Gemini
        state.vicioWebSocket.send(JSON.stringify({
          realtimeInput: {
            mediaChunks: [{
              mimeType: 'audio/webm;codecs=opus',
              data: base64Audio
            }]
          }
        }));
      };
      reader.readAsDataURL(event.data);
    }
  };

  // Capture audio in 100ms chunks for near-real-time
  state.vicioMediaRecorder.start(100);
}

function handleGeminiResponse(event) {
  const response = JSON.parse(event.data);

  // Extract transcript from serverContent
  if (response.serverContent?.modelTurn?.parts) {
    for (const part of response.serverContent.modelTurn.parts) {
      if (part.text) {
        const newText = part.text;
        state.vicioTranscript += ' ' + newText;

        // Update transcript display
        updateTranscriptDisplay(state.vicioTranscript);

        // Detect forbidden/desired words in new text
        detectWords(newText);
      }
    }
  }
}

function updateTranscriptDisplay(transcript) {
  const transcriptBox = document.getElementById('vicio-transcript');
  transcriptBox.textContent = transcript.trim();

  // Auto-scroll to bottom
  transcriptBox.scrollTop = transcriptBox.scrollHeight;
}

function detectWords(text) {
  const lowerText = text.toLowerCase();

  // Check forbidden words
  vicioPoliceWords.forbidden.forEach(word => {
    if (lowerText.includes(word.toLowerCase())) {
      showAlert('forbidden', word);
      state.vicioStats.forbidden[word] = (state.vicioStats.forbidden[word] || 0) + 1;

      // Vibrate on forbidden word
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
    }
  });

  // Check desired words
  vicioPoliceWords.desired.forEach(word => {
    if (lowerText.includes(word.toLowerCase())) {
      showAlert('desired', word);
      state.vicioStats.desired[word] = (state.vicioStats.desired[word] || 0) + 1;
    }
  });
}

function showAlert(type, word) {
  const alertsDiv = document.getElementById('vicio-alerts');

  const alert = document.createElement('div');
  alert.className = `alert-banner alert-${type}`;

  if (type === 'forbidden') {
    alert.innerHTML = `⚠️ DETECTED: "<strong>${word}</strong>"`;
  } else {
    alert.innerHTML = `✅ GREAT: "<strong>${word}</strong>"`;
  }

  alertsDiv.appendChild(alert);

  // Remove alert after 3 seconds
  setTimeout(() => {
    alert.style.opacity = '0';
    setTimeout(() => alert.remove(), 300);
  }, 3000);

  // Keep only last 3 alerts visible
  const alerts = alertsDiv.querySelectorAll('.alert-banner');
  if (alerts.length > 3) {
    alerts[0].remove();
  }
}

function showVicioError(message) {
  const statusDiv = document.getElementById('vicio-status');

  statusDiv.textContent = '❌ ' + message;
  statusDiv.style.color = 'var(--color-error)';
}

function stopVicioPolice() {
  // Stop audio capture
  if (state.vicioMediaRecorder && state.vicioMediaRecorder.state !== 'inactive') {
    state.vicioMediaRecorder.stop();
  }

  // Stop audio stream
  if (state.vicioAudioStream) {
    state.vicioAudioStream.getTracks().forEach(track => track.stop());
  }

  // Close WebSocket
  if (state.vicioWebSocket) {
    state.vicioWebSocket.close();
  }

  state.vicioIsListening = false;

  // Show results
  showVicioSummary();
}

function showVicioSummary() {
  // Hide practice view
  document.getElementById('vicio-practice').classList.add('hidden');

  // Show results view
  document.getElementById('vicio-results').classList.remove('hidden');

  // Populate forbidden words
  const forbiddenList = document.getElementById('forbidden-list');
  const forbiddenCount = document.getElementById('forbidden-count');

  forbiddenList.innerHTML = '';
  const forbiddenWords = Object.keys(state.vicioStats.forbidden);
  forbiddenCount.textContent = forbiddenWords.length;

  if (forbiddenWords.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Nenhuma palavra proibida detectada! 🎉';
    li.style.color = 'var(--color-success)';
    forbiddenList.appendChild(li);
  } else {
    forbiddenWords.forEach(word => {
      const li = document.createElement('li');
      li.textContent = `"${word}" (${state.vicioStats.forbidden[word]}x)`;
      forbiddenList.appendChild(li);
    });
  }

  // Populate desired words
  const desiredList = document.getElementById('desired-list');
  const desiredCount = document.getElementById('desired-count');

  desiredList.innerHTML = '';
  const desiredWords = Object.keys(state.vicioStats.desired);
  desiredCount.textContent = desiredWords.length;

  if (desiredWords.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Tente usar mais palavras-chave';
    li.style.color = 'var(--text-muted)';
    desiredList.appendChild(li);
  } else {
    desiredWords.forEach(word => {
      const li = document.createElement('li');
      li.textContent = `"${word}" (${state.vicioStats.desired[word]}x)`;
      desiredList.appendChild(li);
    });
  }
}

// ============================================
// SECTION 9: INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Load initial state
  loadState();

  // Navigate to hash or dashboard
  const hash = window.location.hash.slice(1) || 'dashboard';
  navigateTo(hash);

  // Start countdown
  updateCountdown();

  // Display first phrase
  displayPhrase();

  console.log('xAI Pocket Trainer initialized!');
  console.log(`${flashcardsData.length} flashcards loaded`);
  console.log(`Interview: ${INTERVIEW_DATE.toLocaleString('pt-BR')}`);
});

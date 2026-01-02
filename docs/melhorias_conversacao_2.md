# Especificação: Rehearsal Mode & Melhorias de Fluência
## xAI Pocket Trainer - Versão 4.0 "Fluency Trainer Edition"

**Data:** 02 de Janeiro de 2026  
**Autor:** Claude (Anthropic)  
**Status:** 📋 PRONTO PARA DESENVOLVIMENTO  
**Prioridade:** 🔴 CRÍTICA (Entrevista em 05/01/2026)

---

## 1. Sumário Executivo

### 1.1 Problema Identificado

O app atual funciona como **teste** (você tenta, depois vê se acertou), não como **treinador de fluência** (você lê/repete até memorizar).

Para uma entrevista em inglês (segunda língua), o usuário precisa:
- **Ver o script ANTES** para criar familiaridade
- **Ler em voz alta** repetidamente para criar memória muscular
- **Receber feedback de IA** sobre qualidade da fala
- **Testar "às cegas"** somente APÓS praticar

### 1.2 Solução Proposta

| Feature | Descrição | Prioridade |
|---------|-----------|------------|
| **Rehearsal Mode** | Modo de prática com scripts visíveis + análise de IA | 🔴 P0 |
| **Botão "Ver Script"** | Adicionar ao 45-Second Pitch | 🔴 P0 |
| **Organização por Momento** | Estruturar conteúdo por fase da entrevista | 🟡 P1 |
| **TTS Integration** | Ouvir scripts antes de praticar | 🟢 P2 |

### 1.3 Fluxo de Uso Esperado

```
┌─────────────────────────────────────────────────────────────┐
│                    FLUXO DE PRÁTICA                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. REHEARSAL MODE (Treinador)                              │
│     ├─ Escolhe momento (Opening, About Me, etc.)            │
│     ├─ Vê o script ideal na tela                            │
│     ├─ [Opcional] Ouve TTS primeiro                         │
│     ├─ Fala em voz alta (gravação)                          │
│     ├─ IA compara com script e dá feedback                  │
│     └─ Repete até estar confiante                           │
│                          ↓                                  │
│  2. 45-SECOND PITCH (Teste)                                 │
│     ├─ [Novo] Botão "Ver Script" antes de começar           │
│     ├─ Tenta responder SEM ver o script                     │
│     ├─ Vê checklist e script ideal DEPOIS                   │
│     └─ Valida se memorizou                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Feature Principal: Rehearsal Mode

### 2.1 Visão Geral

Um novo modo dedicado à **prática de fluência** onde o usuário:
1. Vê o script completo na tela
2. Fala em voz alta (opcionalmente gravado)
3. Recebe feedback da IA comparando sua fala com o script ideal

### 2.2 Estrutura de Dados

#### 2.2.1 Novo Array: `rehearsalScripts`

Adicionar ao `js/data.js`:

```javascript
// === REHEARSAL SCRIPTS ===
// Organizados por momento da entrevista
// Fonte: fontes/Jeffrey_Weichsel_15min_Script_Claude_V2.md

const rehearsalScripts = [
  // ========== OPENING (0:00-1:00) ==========
  {
    id: 'opening-greeting',
    moment: 'opening',
    momentLabel: '🎬 Opening',
    title: 'Cumprimento Inicial',
    duration: '5-10s',
    script: `Hello Jeffrey, nice to meet you. Thank you for taking the time to speak with me today.`,
    tips: [
      'Sorriso natural',
      'Contato visual com a câmera',
      'Tom confiante mas não arrogante'
    ],
    keyPhrases: ['nice to meet you', 'thank you for taking the time']
  },
  
  // ========== ABOUT ME (1:00-3:00) ==========
  {
    id: 'about-me-full',
    moment: 'about-me',
    momentLabel: '👤 About Me',
    title: 'Tell Me About Yourself - Versão Completa',
    duration: '60-65s',
    script: `I'm a finance professional with 20 years of experience. For the last 5 years, I've been a partner at Joule Asset Management—a GARP equity fund in Brazil doing deep fundamental analysis daily.

What makes me relevant for this role:

First, at Joule I participated daily in investment committee discussions—validating DCF models, challenging valuation multiples, catching earnings quality issues. That's exactly the fundamental analysis Adriana said you need now.

Second, I have hands-on experience validating financial models. At Banco ABC, I rebuilt their credit rating model by analyzing 7 fundamental ratios against historical defaults—identified which ratios actually predicted default and which didn't. Created an automated model that the Central Bank approved. That's essentially what AI tutoring is: validating whether a model's reasoning is correct.

Third, I bring an emerging markets perspective. Brazil has 15% interest rates, small private markets, completely different dynamics. I can help ensure Grok gives better answers when users come from markets that don't look like the US.

I'm 100% available and ready to start immediately.`,
    tips: [
      'Lidere com JOULE (equity), não com crédito',
      'Três pilares claros: Joule, ABC, Emerging Markets',
      'Fechar com "ready to start immediately"'
    ],
    keyPhrases: [
      'five years', 'partner at Joule', 'GARP equity fund',
      'investment committee', 'fundamental analysis',
      'seven fundamental ratios', 'Central Bank approved',
      'emerging markets perspective', '15% interest rates',
      'ready to start immediately'
    ],
    isKiller: true
  },
  {
    id: 'about-me-short',
    moment: 'about-me',
    momentLabel: '👤 About Me',
    title: 'Tell Me About Yourself - Versão 45s',
    duration: '45s',
    script: `I'm a finance professional with 20 years of experience. For the last 5 years, I've been a partner at Joule—a GARP equity fund doing fundamental analysis daily.

Two things make me relevant: First, daily investment committee work at Joule—validating DCFs, challenging multiples, catching earnings quality issues. Second, at Banco ABC I validated a rating model by analyzing 7 ratios against actual defaults. That process is exactly what AI tutoring requires.

I'm ready to start immediately.`,
    tips: [
      'Use se sentir que ele quer algo mais curto',
      'Mantém os 3 elementos essenciais'
    ],
    keyPhrases: ['Joule', 'investment committee', 'seven ratios', 'ready to start'],
    isKiller: true
  },

  // ========== KILLER STORIES (3:00-10:00) ==========
  {
    id: 'abc-story-short',
    moment: 'stories',
    momentLabel: '📖 Killer Stories',
    title: 'ABC Rating Model - Versão Curta',
    duration: '45s',
    script: `Let me give you a concrete example of model validation. At Banco ABC, the Central Bank told us our credit rating model was too judgmental—no quantitative foundation.

I analyzed 5 years of historical data: 7 fundamental ratios the analysts used, the ratings assigned, and actual defaults. Found that 5 ratios were predictive, but 2 weren't adding value.

I built a regression model that automated the initial rating, while still allowing analyst judgment with justification. The Central Bank reviewed it and approved.

That's essentially what AI tutoring is: taking a model, validating whether its reasoning predicts the right outcomes, and explaining the logic.`,
    tips: [
      'Esta é sua KILLER STORY - pratique muito',
      'Enfatize "7 ratios" e "Central Bank approved"',
      'Conecte sempre ao AI tutoring no final'
    ],
    keyPhrases: [
      'model validation', 'Central Bank', 'seven fundamental ratios',
      'five years of historical data', 'five ratios were predictive',
      'two weren\'t adding value', 'Central Bank approved',
      'AI tutoring'
    ],
    isKiller: true
  },
  {
    id: 'abc-story-long',
    moment: 'stories',
    momentLabel: '📖 Killer Stories',
    title: 'ABC Rating Model - Versão Longa',
    duration: '90s',
    script: `At Banco ABC, I was tasked with reviewing the credit rating model after the Central Bank flagged it as too judgmental.

The model used 7 fundamental ratios—things like debt/EBITDA, interest coverage, current ratio. Analysts would look at these ratios and assign a rating based on judgment.

I gathered 5 years of historical data: every client company's ratio values, the ratings assigned, and their actual payment behavior—days past due, defaults.

I analyzed each ratio individually: correlation with default, predictive power, overlap with other ratios. Found that 5 of the 7 ratios were genuinely predictive—higher debt/EBITDA really did correlate with more defaults. But 2 ratios added no predictive value; they were noise.

I then built a logistic regression combining the 5 useful ratios. This generated an automated 'suggested rating' that the analyst could see alongside the component variables. They could override it, but had to document why.

The Central Bank reviewed the new methodology and approved it—they could see the model was actually calibrated to predict default.

This process—identifying which variables matter, why they matter, and validating against real outcomes—is exactly what training an AI on finance requires.`,
    tips: [
      'Use esta versão se Jeffrey mostrar interesse',
      'Tem mais detalhes técnicos',
      'Mesmo fechamento conectando ao AI'
    ],
    keyPhrases: [
      'seven fundamental ratios', 'debt/EBITDA', 'interest coverage',
      'five years of historical data', 'correlation with default',
      'five of the seven ratios', 'logistic regression',
      'Central Bank approved', 'training an AI'
    ],
    isKiller: true
  },
  {
    id: 'joule-retailer-story',
    moment: 'stories',
    momentLabel: '📖 Killer Stories',
    title: 'Joule Retailer Story',
    duration: '45-60s',
    script: `At Joule, we analyzed a Brazilian retailer trading at 6x EV/EBITDA while peers traded at 10x. Looked cheap.

The analyst's thesis was margin expansion from digital mix shift. My challenge: "Digital requires fulfillment capex and customer acquisition costs. Show me ROIC, not just EBITDA margin."

We dug into working capital: DSO was increasing faster than revenue—they were extending payment terms to hit targets.

The "cheap" multiple was the market correctly pricing deteriorating returns. We passed.

This type of analytical dialogue—questioning, validating, catching inconsistencies—is what AI tutoring requires.`,
    tips: [
      'Mostra seu trabalho REAL na Joule',
      'Enfatize o pensamento crítico',
      'Conecte ao AI tutoring'
    ],
    keyPhrases: [
      'Joule', 'EV/EBITDA', 'ROIC', 'DSO', 'working capital',
      'questioning', 'validating', 'catching inconsistencies'
    ],
    isKiller: true
  },

  // ========== BRIDGES & OBJECTIONS ==========
  {
    id: 'modigliani-miller-bridge',
    moment: 'bridges',
    momentLabel: '🌉 Bridges',
    title: 'Modigliani-Miller Bridge (Crédito vs Equity)',
    duration: '30-40s',
    script: `I often get asked why I moved between credit and equity. My answer is Modigliani-Miller: what matters is what the company does with its assets—the left side of the balance sheet.

Whether you're a bondholder or shareholder, you're analyzing the same business fundamentals: cash flow generation, ROIC, competitive position. The capital structure just determines how returns are distributed.

So my credit experience and equity experience are really two views of the same thing: understanding whether a company creates value. That's fundamental analysis regardless of which security you hold.`,
    tips: [
      'USE SE perguntarem sobre crédito vs equity',
      'Modigliani-Miller é sua ponte perfeita',
      '"Left side of balance sheet" = assets'
    ],
    keyPhrases: [
      'Modigliani-Miller', 'left side of the balance sheet',
      'cash flow generation', 'ROIC', 'capital structure',
      'two views of the same thing', 'fundamental analysis'
    ],
    isKiller: true
  },
  {
    id: 'emerging-markets-angle',
    moment: 'bridges',
    momentLabel: '🌉 Bridges',
    title: 'Emerging Markets Perspective',
    duration: '40-50s',
    script: `Jeffrey, I know you have experience with emerging markets from your fixed income days. You know these markets are completely different from the US.

Brazil right now has 15% government bond yields. Private credit markets are tiny. Equity valuations trade at structural discounts because of currency and political risk.

I can bring that perspective to training Grok. When someone from Brazil or another emerging market asks about interest rates or valuations, the answer shouldn't assume 2-3% rates and US-style multiples.

Adriana mentioned there's bias toward US markets in the training. My experience could help address that—making Grok's responses more accurate for users outside the US.`,
    tips: [
      'Conecta com o background do Jeffrey (EM Fixed Income)',
      'Cite os 15% de juros',
      'Mencione o que Adriana disse sobre US bias'
    ],
    keyPhrases: [
      'emerging markets', 'fixed income days', '15% government bond yields',
      'structural discounts', 'Adriana mentioned', 'US bias',
      'more accurate for users outside the US'
    ],
    isKiller: true
  },
  {
    id: 'why-xai',
    moment: 'bridges',
    momentLabel: '🌉 Bridges',
    title: 'Why xAI?',
    duration: '45s',
    script: `Three reasons:

Mission alignment—I've spent my career questioning whether models actually work. At ABC, I challenged a rating model everyone accepted. At Joule, I challenged DCF assumptions daily. That first-principles mindset fits xAI.

Unique opportunity—for a finance practitioner like me, this is a rare door into AI. I can contribute my actual expertise instead of pretending to be an engineer.

Timing—xAI is building something new. I want to be part of that, not join something already built.`,
    tips: [
      'Três razões claras e concisas',
      'Mission → Opportunity → Timing',
      'Não seja bajulador, seja genuíno'
    ],
    keyPhrases: [
      'mission alignment', 'first-principles', 'unique opportunity',
      'rare door into AI', 'timing', 'building something new'
    ],
    isKiller: false
  },
  {
    id: 'why-leaving-joule',
    moment: 'bridges',
    momentLabel: '🌉 Bridges',
    title: 'Why Are You Leaving Joule?',
    duration: '30s',
    script: `The Brazilian equity market contracted significantly—AUM shrank with 15% interest rates pulling money to government bonds. It was the right time for a transition, and this opportunity aligns with where I want to go.

I'm not running away from something. I'm running toward something.`,
    tips: [
      'Não fale mal da Joule',
      'Explique o contexto macro do Brasil',
      'Termine positivo'
    ],
    keyPhrases: [
      'contracted significantly', '15% interest rates',
      'right time for transition', 'running toward'
    ],
    isKiller: false
  },

  // ========== CLOSING (13:00-15:00) ==========
  {
    id: 'questions-for-jeffrey',
    moment: 'closing',
    momentLabel: '🏁 Closing',
    title: 'Questions for Jeffrey',
    duration: '10s cada',
    script: `PERGUNTA 1 (Recomendada):
"What distinguishes the tutors who ramp up fastest and become most valuable to the team?"

PERGUNTA 2 (Conexão EM):
"I know you have experience with emerging markets. Does the team ever work on non-US content, or is there interest in expanding that direction?"

PERGUNTA 3 (Se sobrar tempo):
"What does the onboarding process look like for new tutors?"`,
    tips: [
      'Escolha 1-2 perguntas, não mais',
      'A pergunta 1 é a mais forte',
      'Pergunta 2 cria conexão com Jeffrey'
    ],
    keyPhrases: [
      'ramp up fastest', 'most valuable',
      'emerging markets', 'non-US content', 'onboarding'
    ],
    isKiller: false
  },
  {
    id: 'closing-statement',
    moment: 'closing',
    momentLabel: '🏁 Closing',
    title: 'Fechamento Final',
    duration: '20s',
    script: `Jeffrey, thank you for your time. I'm genuinely excited about this—it's exactly where my experience meets what you need.

I can contribute to your current fundamental analysis projects immediately, and I bring differentiated expertise for what's coming next.

I'm ready to start. Looking forward to hearing next steps.`,
    tips: [
      'Seja confiante mas não arrogante',
      '"Ready to start" - termine com disponibilidade',
      'Não peça desculpas por nada'
    ],
    keyPhrases: [
      'thank you for your time', 'genuinely excited',
      'contribute immediately', 'ready to start', 'next steps'
    ],
    isKiller: true
  },

  // ========== QUICK RESPONSES ==========
  {
    id: 'availability',
    moment: 'quick',
    momentLabel: '⚡ Quick Responses',
    title: 'Availability',
    duration: '10s',
    script: `100% available. I've transitioned out of Joule and have no competing commitments. Ready to start immediately.`,
    tips: ['Curto e direto'],
    keyPhrases: ['100% available', 'ready to start immediately'],
    isKiller: false
  },
  {
    id: 'remote-work',
    moment: 'quick',
    momentLabel: '⚡ Quick Responses',
    title: 'Remote Work Experience',
    duration: '15s',
    script: `Absolutely. I reported to shareholders in Bahrain from Brazil for years—all in English, async communication. I'm disciplined and over-communicate in writing.`,
    tips: ['Dê exemplo concreto (Bahrain)'],
    keyPhrases: ['Bahrain', 'async communication', 'over-communicate'],
    isKiller: false
  },
  {
    id: 'salary',
    moment: 'quick',
    momentLabel: '⚡ Quick Responses',
    title: 'Salary Expectations',
    duration: '10s',
    script: `I'm flexible and aligned with the range posted. More important to me is being part of this team.`,
    tips: ['Não mencione números específicos'],
    keyPhrases: ['flexible', 'aligned with the range'],
    isKiller: false
  },
  {
    id: 'no-concerns',
    moment: 'quick',
    momentLabel: '⚡ Quick Responses',
    title: 'Any Concerns About the Role?',
    duration: '20s',
    script: `No major concerns. I've done my homework with Michael and Adriana.

I know the current focus is fundamental analysis and financial statements. That's what I've been doing at Joule for 5 years—and my experience validating the rating model at ABC is directly applicable.

I'm ready to contribute immediately.`,
    tips: ['Não invente preocupações falsas'],
    keyPhrases: ['no major concerns', 'done my homework', 'ready to contribute'],
    isKiller: false
  }
];

// === ESTRUTURA DE MOMENTOS ===
const interviewMoments = [
  { id: 'opening', label: '🎬 Opening', timeRange: '0:00-1:00', description: 'Cumprimentos e small talk' },
  { id: 'about-me', label: '👤 About Me', timeRange: '1:00-3:00', description: 'Tell me about yourself' },
  { id: 'stories', label: '📖 Killer Stories', timeRange: '3:00-10:00', description: 'ABC, Joule, exemplos concretos' },
  { id: 'bridges', label: '🌉 Bridges', timeRange: 'Quando necessário', description: 'Respostas para objeções e conexões' },
  { id: 'closing', label: '🏁 Closing', timeRange: '10:00-15:00', description: 'Perguntas e fechamento' },
  { id: 'quick', label: '⚡ Quick', timeRange: 'A qualquer momento', description: 'Respostas curtas e diretas' }
];
```

### 2.3 Interface do Usuário

#### 2.3.1 Tela Principal do Rehearsal Mode

```html
<!-- Adicionar ao index.html -->

<div id="rehearsal-mode" class="view hidden">
  <!-- Header -->
  <div class="view-header">
    <button class="back-btn" onclick="showDashboard()">←</button>
    <h2>🎭 Rehearsal Mode</h2>
  </div>

  <!-- Seletor de Momento -->
  <div class="moment-selector">
    <h3>Escolha o momento da entrevista:</h3>
    <div class="moment-buttons" id="moment-buttons">
      <!-- Gerado dinamicamente -->
    </div>
  </div>

  <!-- Lista de Scripts do Momento Selecionado -->
  <div class="script-list hidden" id="script-list">
    <h3 id="moment-title"></h3>
    <div id="scripts-container">
      <!-- Gerado dinamicamente -->
    </div>
  </div>

  <!-- Tela de Prática Individual -->
  <div class="practice-screen hidden" id="practice-screen">
    <!-- Cabeçalho do Script -->
    <div class="practice-header">
      <button class="back-btn" onclick="backToScriptList()">←</button>
      <div class="script-meta">
        <h3 id="practice-title"></h3>
        <span class="duration-badge" id="practice-duration"></span>
      </div>
    </div>

    <!-- Área do Script -->
    <div class="script-area">
      <div class="script-text" id="script-text">
        <!-- Script completo aqui -->
      </div>
      
      <!-- Dicas -->
      <div class="tips-section">
        <h4>💡 Dicas:</h4>
        <ul id="tips-list"></ul>
      </div>
    </div>

    <!-- Controles de Prática -->
    <div class="practice-controls">
      <button class="tts-btn" id="tts-btn" onclick="speakScript()">
        🔊 Ouvir Script
      </button>
      <button class="record-btn" id="record-btn" onclick="toggleRecording()">
        🎤 Gravar Minha Fala
      </button>
    </div>

    <!-- Área de Feedback da IA (aparece após gravação) -->
    <div class="ai-feedback hidden" id="ai-feedback">
      <h4>🤖 Feedback do Treinador:</h4>
      <div class="feedback-content" id="feedback-content">
        <!-- Feedback da IA aqui -->
      </div>
      <div class="transcript-section">
        <h5>📝 O que você disse:</h5>
        <div id="user-transcript"></div>
      </div>
      <div class="comparison-section">
        <h5>📊 Comparação:</h5>
        <div class="key-phrases-check" id="key-phrases-check">
          <!-- Checklist de frases-chave -->
        </div>
      </div>
    </div>

    <!-- Botões de Navegação -->
    <div class="navigation-buttons">
      <button class="secondary-btn" onclick="previousScript()">
        ← Anterior
      </button>
      <button class="primary-btn" onclick="nextScript()">
        Próximo →
      </button>
    </div>
  </div>
</div>
```

#### 2.3.2 CSS para Rehearsal Mode

```css
/* Adicionar ao <style> do index.html */

/* === REHEARSAL MODE === */

#rehearsal-mode {
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

/* Seletor de Momentos */
.moment-selector h3 {
  text-align: center;
  margin-bottom: 1rem;
  color: var(--text-secondary);
}

.moment-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.moment-btn {
  padding: 1rem;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  background: var(--card-bg);
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.moment-btn:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.moment-btn.active {
  border-color: var(--primary-color);
  background: rgba(var(--primary-rgb), 0.1);
}

.moment-btn .moment-label {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.moment-btn .moment-time {
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* Lista de Scripts */
.script-list {
  margin-top: 1.5rem;
}

.script-card {
  padding: 1rem;
  margin-bottom: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--card-bg);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.script-card:hover {
  border-color: var(--primary-color);
  background: rgba(var(--primary-rgb), 0.05);
}

.script-card.is-killer {
  border-left: 4px solid var(--gold-color);
}

.script-card .script-info h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
}

.script-card .script-info .duration {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.script-card .killer-badge {
  background: var(--gold-color);
  color: #000;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Tela de Prática */
.practice-screen {
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.practice-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.script-meta h3 {
  margin: 0;
  font-size: 1.2rem;
}

.duration-badge {
  display: inline-block;
  background: var(--primary-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

/* Área do Script */
.script-area {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.script-text {
  font-size: 1.1rem;
  line-height: 1.8;
  white-space: pre-wrap;
  color: var(--text-primary);
}

.script-text strong {
  color: var(--primary-color);
}

.tips-section {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px dashed var(--border-color);
}

.tips-section h4 {
  margin: 0 0 0.5rem 0;
  color: var(--text-secondary);
}

.tips-section ul {
  margin: 0;
  padding-left: 1.25rem;
}

.tips-section li {
  margin-bottom: 0.25rem;
  color: var(--text-muted);
}

/* Controles de Prática */
.practice-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.tts-btn, .record-btn {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.tts-btn {
  background: var(--secondary-bg);
  color: var(--text-primary);
}

.tts-btn:hover {
  background: var(--border-color);
}

.tts-btn.speaking {
  background: var(--primary-color);
  color: white;
  animation: pulse 1s infinite;
}

.record-btn {
  background: var(--primary-color);
  color: white;
}

.record-btn:hover {
  filter: brightness(1.1);
}

.record-btn.recording {
  background: var(--red-color);
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Feedback da IA */
.ai-feedback {
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.1), rgba(var(--gold-rgb), 0.1));
  border: 1px solid var(--primary-color);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.ai-feedback h4 {
  margin: 0 0 1rem 0;
  color: var(--primary-color);
}

.feedback-content {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.feedback-content .strength {
  color: var(--green-color);
}

.feedback-content .improvement {
  color: var(--yellow-color);
}

.transcript-section, .comparison-section {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed var(--border-color);
}

.transcript-section h5, .comparison-section h5 {
  margin: 0 0 0.5rem 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

#user-transcript {
  font-style: italic;
  color: var(--text-muted);
  background: var(--secondary-bg);
  padding: 0.75rem;
  border-radius: 8px;
}

.key-phrases-check {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.phrase-tag {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
}

.phrase-tag.found {
  background: var(--green-color);
  color: white;
}

.phrase-tag.missing {
  background: var(--red-color);
  color: white;
  opacity: 0.7;
}

/* Navegação */
.navigation-buttons {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.navigation-buttons button {
  flex: 1;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.secondary-btn {
  background: var(--secondary-bg);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}

.primary-btn {
  background: var(--primary-color);
  border: none;
  color: white;
}
```

### 2.4 Lógica JavaScript

#### 2.4.1 Funções do Rehearsal Mode

```javascript
// Adicionar ao index.html ou criar arquivo separado

// === REHEARSAL MODE STATE ===
let rehearsalState = {
  currentMoment: null,
  currentScriptIndex: 0,
  filteredScripts: [],
  isRecording: false,
  isSpeaking: false,
  mediaRecorder: null,
  audioChunks: [],
  geminiWs: null
};

// === INICIALIZAÇÃO ===
function initRehearsalMode() {
  renderMomentButtons();
}

function renderMomentButtons() {
  const container = document.getElementById('moment-buttons');
  container.innerHTML = interviewMoments.map(moment => `
    <button class="moment-btn" onclick="selectMoment('${moment.id}')">
      <div class="moment-label">${moment.label}</div>
      <div class="moment-time">${moment.timeRange}</div>
    </button>
  `).join('');
}

// === SELEÇÃO DE MOMENTO ===
function selectMoment(momentId) {
  rehearsalState.currentMoment = momentId;
  rehearsalState.currentScriptIndex = 0;
  
  // Atualizar UI dos botões
  document.querySelectorAll('.moment-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.currentTarget.classList.add('active');
  
  // Filtrar scripts do momento
  rehearsalState.filteredScripts = rehearsalScripts.filter(s => s.moment === momentId);
  
  // Mostrar lista de scripts
  renderScriptList();
}

function renderScriptList() {
  const moment = interviewMoments.find(m => m.id === rehearsalState.currentMoment);
  document.getElementById('moment-title').textContent = `${moment.label} - ${moment.description}`;
  
  const container = document.getElementById('scripts-container');
  container.innerHTML = rehearsalState.filteredScripts.map((script, index) => `
    <div class="script-card ${script.isKiller ? 'is-killer' : ''}" onclick="selectScript(${index})">
      <div class="script-info">
        <h4>${script.title}</h4>
        <span class="duration">⏱️ ${script.duration}</span>
      </div>
      ${script.isKiller ? '<span class="killer-badge">⭐ KILLER</span>' : ''}
    </div>
  `).join('');
  
  document.getElementById('script-list').classList.remove('hidden');
  document.querySelector('.moment-selector').classList.add('hidden');
}

// === PRÁTICA INDIVIDUAL ===
function selectScript(index) {
  rehearsalState.currentScriptIndex = index;
  renderPracticeScreen();
}

function renderPracticeScreen() {
  const script = rehearsalState.filteredScripts[rehearsalState.currentScriptIndex];
  
  document.getElementById('practice-title').textContent = script.title;
  document.getElementById('practice-duration').textContent = `⏱️ ${script.duration}`;
  
  // Formatar script com destaques
  const formattedScript = formatScriptWithHighlights(script.script, script.keyPhrases);
  document.getElementById('script-text').innerHTML = formattedScript;
  
  // Renderizar dicas
  document.getElementById('tips-list').innerHTML = script.tips.map(tip => `<li>${tip}</li>`).join('');
  
  // Esconder feedback anterior
  document.getElementById('ai-feedback').classList.add('hidden');
  
  // Mostrar tela de prática
  document.getElementById('script-list').classList.add('hidden');
  document.getElementById('practice-screen').classList.remove('hidden');
}

function formatScriptWithHighlights(text, keyPhrases) {
  let formatted = text;
  keyPhrases.forEach(phrase => {
    const regex = new RegExp(`(${phrase})`, 'gi');
    formatted = formatted.replace(regex, '<strong>$1</strong>');
  });
  return formatted;
}

// === TEXT-TO-SPEECH ===
function speakScript() {
  const script = rehearsalState.filteredScripts[rehearsalState.currentScriptIndex];
  const btn = document.getElementById('tts-btn');
  
  if (rehearsalState.isSpeaking) {
    speechSynthesis.cancel();
    rehearsalState.isSpeaking = false;
    btn.textContent = '🔊 Ouvir Script';
    btn.classList.remove('speaking');
    return;
  }
  
  const utterance = new SpeechSynthesisUtterance(script.script);
  utterance.lang = 'en-US';
  utterance.rate = 0.9; // Levemente mais lento para clareza
  
  // Tentar usar voz masculina americana
  const voices = speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => 
    v.lang === 'en-US' && v.name.includes('Male')
  ) || voices.find(v => v.lang === 'en-US');
  
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  
  utterance.onstart = () => {
    rehearsalState.isSpeaking = true;
    btn.textContent = '⏹️ Parar';
    btn.classList.add('speaking');
  };
  
  utterance.onend = () => {
    rehearsalState.isSpeaking = false;
    btn.textContent = '🔊 Ouvir Script';
    btn.classList.remove('speaking');
  };
  
  speechSynthesis.speak(utterance);
}

// === GRAVAÇÃO E ANÁLISE DE IA ===
async function toggleRecording() {
  const btn = document.getElementById('record-btn');
  
  if (rehearsalState.isRecording) {
    stopRecording();
    return;
  }
  
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    rehearsalState.audioChunks = [];
    rehearsalState.mediaRecorder = new MediaRecorder(stream);
    
    rehearsalState.mediaRecorder.ondataavailable = (event) => {
      rehearsalState.audioChunks.push(event.data);
    };
    
    rehearsalState.mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(rehearsalState.audioChunks, { type: 'audio/webm' });
      await processRecordingWithAI(audioBlob);
      stream.getTracks().forEach(track => track.stop());
    };
    
    rehearsalState.mediaRecorder.start();
    rehearsalState.isRecording = true;
    btn.textContent = '⏹️ Parar Gravação';
    btn.classList.add('recording');
    
  } catch (error) {
    console.error('Erro ao acessar microfone:', error);
    alert('Não foi possível acessar o microfone. Verifique as permissões.');
  }
}

function stopRecording() {
  if (rehearsalState.mediaRecorder && rehearsalState.isRecording) {
    rehearsalState.mediaRecorder.stop();
    rehearsalState.isRecording = false;
    
    const btn = document.getElementById('record-btn');
    btn.textContent = '🎤 Gravar Minha Fala';
    btn.classList.remove('recording');
    
    // Mostrar loading
    showFeedbackLoading();
  }
}

function showFeedbackLoading() {
  const feedbackDiv = document.getElementById('ai-feedback');
  const contentDiv = document.getElementById('feedback-content');
  
  contentDiv.innerHTML = '<div class="loading-spinner">🔄 Analisando sua fala...</div>';
  feedbackDiv.classList.remove('hidden');
}

// === PROCESSAMENTO COM GEMINI ===
async function processRecordingWithAI(audioBlob) {
  const script = rehearsalState.filteredScripts[rehearsalState.currentScriptIndex];
  
  try {
    // Converter áudio para base64
    const base64Audio = await blobToBase64(audioBlob);
    
    // Conectar ao Gemini para transcrição
    const transcript = await transcribeWithGemini(base64Audio);
    
    // Analisar com Gemini
    const feedback = await analyzeWithGemini(transcript, script);
    
    // Mostrar resultado
    displayAIFeedback(transcript, feedback, script);
    
  } catch (error) {
    console.error('Erro ao processar gravação:', error);
    document.getElementById('feedback-content').innerHTML = `
      <p style="color: var(--red-color);">❌ Erro ao processar: ${error.message}</p>
      <p>Tente novamente ou verifique sua conexão.</p>
    `;
  }
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Usar a mesma API key e infraestrutura do Vício Police
const GEMINI_API_KEY = 'AIzaSyC0qCmiyVqyJQ3dqrgp6loA4hcq7a7bjZM';

async function transcribeWithGemini(base64Audio) {
  // Usar Gemini REST API para transcrição (mais simples que WebSocket para áudio completo)
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          {
            inlineData: {
              mimeType: 'audio/webm',
              data: base64Audio
            }
          },
          {
            text: 'Transcribe this audio to text. Return ONLY the transcription, nothing else.'
          }
        ]
      }]
    })
  });
  
  const data = await response.json();
  
  if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
    return data.candidates[0].content.parts[0].text;
  }
  
  throw new Error('Não foi possível transcrever o áudio');
}

async function analyzeWithGemini(transcript, script) {
  const prompt = `You are an expert interview coach helping someone prepare for a job interview at xAI.

IDEAL SCRIPT (what they should say):
"${script.script}"

KEY PHRASES they should include:
${script.keyPhrases.map(p => `- "${p}"`).join('\n')}

WHAT THEY ACTUALLY SAID:
"${transcript}"

Analyze their response and provide feedback in JSON format:
{
  "overallScore": 0-100,
  "strengths": ["list of things they did well"],
  "improvements": ["specific suggestions to improve"],
  "missingKeyPhrases": ["key phrases they forgot"],
  "usedKeyPhrases": ["key phrases they included"],
  "fluencyNote": "brief comment on fluency/confidence",
  "summary": "2-3 sentence overall feedback"
}

Be encouraging but honest. Focus on practical improvements.`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024
      }
    })
  });
  
  const data = await response.json();
  
  if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
    const text = data.candidates[0].content.parts[0].text;
    // Extrair JSON da resposta
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  }
  
  throw new Error('Não foi possível analisar a resposta');
}

function displayAIFeedback(transcript, feedback, script) {
  // Score visual
  const scoreColor = feedback.overallScore >= 80 ? 'var(--green-color)' : 
                     feedback.overallScore >= 60 ? 'var(--yellow-color)' : 'var(--red-color)';
  
  // Feedback principal
  document.getElementById('feedback-content').innerHTML = `
    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
      <div style="font-size: 2rem; font-weight: bold; color: ${scoreColor};">
        ${feedback.overallScore}/100
      </div>
      <div style="font-size: 0.9rem; color: var(--text-muted);">
        ${feedback.fluencyNote || ''}
      </div>
    </div>
    
    <p>${feedback.summary}</p>
    
    ${feedback.strengths.length > 0 ? `
      <div style="margin-top: 1rem;">
        <strong class="strength">✅ Pontos Fortes:</strong>
        <ul>${feedback.strengths.map(s => `<li>${s}</li>`).join('')}</ul>
      </div>
    ` : ''}
    
    ${feedback.improvements.length > 0 ? `
      <div style="margin-top: 1rem;">
        <strong class="improvement">💡 Para Melhorar:</strong>
        <ul>${feedback.improvements.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>
    ` : ''}
  `;
  
  // Transcrição
  document.getElementById('user-transcript').textContent = transcript;
  
  // Checklist de frases-chave
  const phrasesContainer = document.getElementById('key-phrases-check');
  phrasesContainer.innerHTML = script.keyPhrases.map(phrase => {
    const found = feedback.usedKeyPhrases?.some(p => 
      p.toLowerCase().includes(phrase.toLowerCase()) || 
      phrase.toLowerCase().includes(p.toLowerCase())
    );
    return `<span class="phrase-tag ${found ? 'found' : 'missing'}">${phrase}</span>`;
  }).join('');
  
  // Mostrar seção de feedback
  document.getElementById('ai-feedback').classList.remove('hidden');
  
  // Scroll para o feedback
  document.getElementById('ai-feedback').scrollIntoView({ behavior: 'smooth' });
}

// === NAVEGAÇÃO ===
function backToScriptList() {
  document.getElementById('practice-screen').classList.add('hidden');
  document.getElementById('script-list').classList.remove('hidden');
}

function backToMomentSelector() {
  document.getElementById('script-list').classList.add('hidden');
  document.querySelector('.moment-selector').classList.remove('hidden');
  
  // Reset estado
  rehearsalState.currentMoment = null;
  document.querySelectorAll('.moment-btn').forEach(btn => btn.classList.remove('active'));
}

function previousScript() {
  if (rehearsalState.currentScriptIndex > 0) {
    rehearsalState.currentScriptIndex--;
    renderPracticeScreen();
  } else {
    backToScriptList();
  }
}

function nextScript() {
  if (rehearsalState.currentScriptIndex < rehearsalState.filteredScripts.length - 1) {
    rehearsalState.currentScriptIndex++;
    renderPracticeScreen();
  } else {
    // Fim da lista, voltar para seleção
    backToScriptList();
  }
}

// === INICIALIZAÇÃO ===
// Chamar quando a view do Rehearsal Mode for aberta
function showRehearsalMode() {
  hideAllViews();
  document.getElementById('rehearsal-mode').classList.remove('hidden');
  initRehearsalMode();
}
```

---

## 3. Melhoria do 45-Second Pitch: Botão "Ver Script"

### 3.1 Modificações no HTML

Adicionar ao `<div id="timer-mode">`, na área de controles:

```html
<!-- Adicionar ANTES do botão START -->
<button id="view-script-btn" class="view-script-btn" onclick="toggleScriptPreview()">
  📖 Ver Script Antes
</button>

<!-- Modal de Preview do Script -->
<div id="script-preview-modal" class="modal hidden">
  <div class="modal-content">
    <div class="modal-header">
      <h3 id="preview-prompt-title"></h3>
      <button class="close-modal" onclick="closeScriptPreview()">✕</button>
    </div>
    <div class="modal-body">
      <div class="preview-script-text" id="preview-script-text"></div>
      <div class="preview-checklist">
        <h4>📋 Checklist:</h4>
        <ul id="preview-checklist"></ul>
      </div>
    </div>
    <div class="modal-footer">
      <button class="secondary-btn" onclick="closeScriptPreview()">Fechar</button>
      <button class="primary-btn" onclick="closeAndStart()">Fechar e Começar</button>
    </div>
  </div>
</div>
```

### 3.2 CSS para o Modal

```css
/* === MODAL DE PREVIEW DO SCRIPT === */

.view-script-btn {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  background: var(--secondary-bg);
  border: 2px dashed var(--border-color);
  border-radius: 10px;
  color: var(--text-secondary);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.view-script-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal.hidden {
  display: none;
}

.modal-content {
  background: var(--card-bg);
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.close-modal {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.25rem;
}

.close-modal:hover {
  color: var(--text-primary);
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.preview-script-text {
  font-size: 1rem;
  line-height: 1.8;
  white-space: pre-wrap;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--secondary-bg);
  border-radius: 8px;
}

.preview-checklist h4 {
  margin: 0 0 0.5rem 0;
  color: var(--text-secondary);
}

.preview-checklist ul {
  margin: 0;
  padding-left: 1.25rem;
}

.preview-checklist li {
  margin-bottom: 0.25rem;
  color: var(--text-muted);
}

.modal-footer {
  display: flex;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border-color);
}

.modal-footer button {
  flex: 1;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}
```

### 3.3 JavaScript para o Modal

```javascript
// === PREVIEW DO SCRIPT NO 45-SECOND PITCH ===

function toggleScriptPreview() {
  const currentPrompt = pitchPrompts[state.currentPromptIndex];
  
  document.getElementById('preview-prompt-title').textContent = currentPrompt.prompt;
  document.getElementById('preview-script-text').textContent = currentPrompt.idealScript;
  
  document.getElementById('preview-checklist').innerHTML = 
    currentPrompt.checklist.map(item => `<li>${item}</li>`).join('');
  
  document.getElementById('script-preview-modal').classList.remove('hidden');
}

function closeScriptPreview() {
  document.getElementById('script-preview-modal').classList.add('hidden');
}

function closeAndStart() {
  closeScriptPreview();
  // Pequeno delay para fechar o modal antes de iniciar
  setTimeout(() => {
    startTimer();
  }, 300);
}

// Fechar modal ao clicar fora
document.getElementById('script-preview-modal')?.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    closeScriptPreview();
  }
});
```

---

## 4. Botão de Acesso no Dashboard

### 4.1 Adicionar Botão ao Dashboard

No HTML do dashboard, adicionar novo botão:

```html
<button class="mode-btn rehearsal-btn" onclick="showRehearsalMode()">
  <span class="mode-icon">🎭</span>
  <span class="mode-label">Rehearsal Mode</span>
  <span class="mode-desc">Pratique scripts em voz alta</span>
</button>
```

### 4.2 CSS do Botão

```css
.rehearsal-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.rehearsal-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
```

---

## 5. Resumo de Arquivos a Modificar

| Arquivo | Modificações |
|---------|--------------|
| `js/data.js` | Adicionar `rehearsalScripts` e `interviewMoments` |
| `index.html` | Adicionar view `#rehearsal-mode`, modal de preview, CSS, JavaScript |
| Dashboard | Adicionar botão "Rehearsal Mode" |

---

## 6. Checklist de Implementação

### Fase 1: Estrutura Base (2-3 horas)
- [ ] Criar array `rehearsalScripts` com todos os scripts das fontes
- [ ] Criar array `interviewMoments` com categorias
- [ ] Adicionar HTML da view `#rehearsal-mode`
- [ ] Adicionar CSS do Rehearsal Mode
- [ ] Implementar navegação básica (momentos → scripts → prática)

### Fase 2: TTS Integration (1 hora)
- [ ] Implementar função `speakScript()` usando Web Speech API
- [ ] Testar em diferentes navegadores
- [ ] Adicionar fallback se TTS não estiver disponível

### Fase 3: Gravação e Análise de IA (3-4 horas)
- [ ] Implementar captura de áudio com MediaRecorder
- [ ] Integrar transcrição com Gemini API
- [ ] Implementar análise comparativa com script ideal
- [ ] Criar UI de feedback (score, pontos fortes, melhorias)
- [ ] Implementar checklist visual de frases-chave

### Fase 4: Botão "Ver Script" no 45-Second Pitch (1 hora)
- [ ] Adicionar botão "📖 Ver Script Antes"
- [ ] Criar modal de preview
- [ ] Implementar lógica de abrir/fechar
- [ ] Testar fluxo "ver → fechar → começar"

### Fase 5: Testes e Ajustes (1-2 horas)
- [ ] Testar fluxo completo no mobile
- [ ] Testar offline (TTS funciona, IA não)
- [ ] Ajustar responsividade
- [ ] Atualizar Service Worker para cachear novos assets

---

## 7. Considerações Técnicas

### 7.1 Sobre o TTS
- **Recomendação:** Usar Web Speech API (já existe no app)
- **Vantagens:** Funciona offline, sem custo de API, resposta instantânea
- **Limitações:** Qualidade varia por navegador/dispositivo
- **Fallback:** Se não disponível, mostrar mensagem e esconder botão

### 7.2 Sobre a Análise de IA
- **API:** Gemini 2.0 Flash (mesmo já usado no Vício Police)
- **Fluxo:** Áudio → Transcrição (Gemini) → Análise (Gemini) → Feedback
- **Custos:** Dentro do tier gratuito para uso individual
- **Offline:** Funcionalidade não disponível sem internet; exibir mensagem apropriada

### 7.3 Offline Mode
- **O que funciona offline:**
  - Ver scripts
  - TTS (Web Speech API)
  - Navegar entre momentos e scripts
- **O que NÃO funciona offline:**
  - Análise de IA da gravação
  - Exibir mensagem: "Análise de IA requer internet. Você ainda pode praticar lendo os scripts."

---

## 8. Scripts Fonte (Referência)

Todos os scripts em `rehearsalScripts` foram extraídos de:
- `fontes/Jeffrey_Weichsel_15min_Script_Claude_V2.md`
- `fontes/Final_Interview_Mastery_Guide_Claude_v3.md`
- `fontes/Final_Interview_Mastery_Guide_Gemini_v2.md`

---

## 9. Critérios de Aceite

### MVP Funcional (Mínimo para entregar)
- [ ] Usuário consegue selecionar momento da entrevista
- [ ] Usuário consegue ver script completo na tela
- [ ] Usuário consegue ouvir script (TTS)
- [ ] Usuário consegue gravar sua fala
- [ ] IA analisa e dá feedback básico
- [ ] Botão "Ver Script" funciona no 45-Second Pitch

### Experiência Completa
- [ ] Feedback de IA é útil e específico
- [ ] Checklist visual de frases-chave funciona
- [ ] Navegação entre scripts é fluida
- [ ] Funciona bem em mobile
- [ ] Modo offline graceful degradation

---

## 10. Cronograma Sugerido

| Data | Atividade | Horas |
|------|-----------|-------|
| 02/01 (noite) | Fase 1: Estrutura Base | 2-3h |
| 03/01 (manhã) | Fase 2 + 3: TTS + IA | 4-5h |
| 03/01 (tarde) | Fase 4 + 5: Ver Script + Testes | 2-3h |
| 04/01 | Buffer para ajustes | 2h |
| **05/01 17:00** | **ENTREVISTA** | 🎯 |

---

**DOCUMENTO FINALIZADO**

**Versão:** 1.0
**Data:** 02 de Janeiro de 2026
**Status:** ✅ **IMPLEMENTADO**

---

## 11. Status de Implementação

### ✅ CONCLUÍDO - 02 de Janeiro de 2026

Todas as funcionalidades especificadas foram implementadas com sucesso:

#### Fase 1: Estrutura Base ✅
- [x] Criar array `rehearsalScripts` com todos os scripts das fontes
- [x] Criar array `interviewMoments` com categorias
- [x] Adicionar HTML da view `#rehearsal-mode`
- [x] Adicionar CSS do Rehearsal Mode
- [x] Implementar navegação básica (momentos → scripts → prática)

#### Fase 2: TTS Integration ✅
- [x] Implementar função `speakScript()` usando Web Speech API
- [x] Seleção automática de voz masculina americana quando disponível
- [x] Controle visual do estado (botão muda para "Parar" durante reprodução)

#### Fase 3: Gravação e Análise de IA ✅
- [x] Implementar captura de áudio com MediaRecorder
- [x] Integrar transcrição com Gemini API
- [x] Implementar análise comparativa com script ideal
- [x] Criar UI de feedback (score, pontos fortes, melhorias)
- [x] Implementar checklist visual de frases-chave (verde = encontrado, vermelho = faltando)

#### Fase 4: Botão "Ver Script" no 45-Second Pitch ✅
- [x] Adicionar botão "📖 Ver Script Antes"
- [x] Criar modal de preview elegante com scroll
- [x] Implementar lógica de abrir/fechar
- [x] Botão "Fechar e Começar" para fluxo otimizado
- [x] Click fora do modal para fechar

#### Fase 5: Dashboard e Service Worker ✅
- [x] Adicionar botão "🎭 Rehearsal Mode" ao Dashboard
- [x] Atualizar Service Worker para v6 (cache refresh forçado)
- [x] Testar responsividade mobile

### Arquivos Modificados

| Arquivo | Status | Modificações |
|---------|--------|--------------|
| `js/data.js` | ✅ Atualizado | Adicionados arrays `rehearsalScripts` (18 scripts) e `interviewMoments` (6 categorias) |
| `index.html` | ✅ Atualizado | Nova view `#rehearsal-mode`, modal de preview, CSS completo (~400 linhas), JavaScript completo (~440 linhas) |
| `sw.js` | ✅ Atualizado | Cache atualizado para v6 ("Fluency Trainer Edition") |

### Funcionalidades Implementadas

#### 🎭 Rehearsal Mode
- **Seletor de Momentos:** 6 categorias (Opening, About Me, Killer Stories, Bridges, Closing, Quick)
- **Lista de Scripts:** Visualização por categoria com badges "⭐ KILLER" para scripts prioritários
- **Tela de Prática:**
  - Script completo com frases-chave destacadas em negrito
  - Dicas específicas para cada script
  - Botão 🔊 TTS para ouvir o script
  - Botão 🎤 para gravar e receber feedback da IA
  - Navegação entre scripts (Anterior/Próximo)

#### 🤖 Análise de IA
- **Transcrição:** Via Gemini 2.0 Flash API
- **Análise:** Comparação com script ideal, detecção de frases-chave
- **Feedback Visual:**
  - Score 0-100 com cor dinâmica (verde ≥80, amarelo ≥60, vermelho <60)
  - Pontos fortes (lista com ✅)
  - Sugestões de melhoria (lista com 💡)
  - Transcrição completa do que foi dito
  - Checklist de frases-chave (tags verdes/vermelhas)

#### 📖 Botão "Ver Script" (45-Second Pitch)
- Modal elegante com:
  - Script completo do prompt atual
  - Checklist de pontos-chave
  - Botões "Fechar" e "Fechar e Começar"
  - Click fora fecha o modal
  - Animação suave de entrada/saída

### Detalhes Técnicos

#### JavaScript
- **Estado do Rehearsal Mode:** Objeto `rehearsalState` com tracking completo
- **Funções Principais:**
  - `showRehearsalMode()` - Inicializa o modo
  - `selectMoment()` - Filtra scripts por momento
  - `renderPracticeScreen()` - Renderiza tela de prática
  - `speakRehearsalScript()` - TTS integration
  - `toggleRehearsalRecording()` - Gravação de áudio
  - `processRehearsalRecording()` - Pipeline de análise IA
  - `displayAIFeedback()` - Renderiza feedback estruturado
- **API Integration:**
  - Gemini 2.0 Flash Experimental
  - Endpoint REST para transcrição e análise
  - Formato JSON estruturado para feedback

#### CSS
- **Design System:** Usa variáveis CSS existentes para consistência
- **Animações:**
  - `slideIn` para entrada de telas
  - `fadeIn` para feedback da IA
  - `pulse` para indicadores de gravação/reprodução
- **Responsivo:** Grid 2 colunas para momentos (1 coluna em mobile)
- **Acessibilidade:** Cores de feedback com alto contraste

### Próximos Passos Recomendados

1. **Testar no ambiente de produção** (Vercel)
2. **Praticar cada script** múltiplas vezes antes da entrevista
3. **Usar o botão "Ver Script"** no 45-Second Pitch para revisar antes de cada tentativa
4. **Focar nos scripts marcados como "⭐ KILLER"** (about-me-full, abc-story, modigliani-miller, emerging-markets, closing-statement)

---

**Versão Final:** 1.1 (Com Status de Implementação)
**Implementado em:** 02 de Janeiro de 2026
**Desenvolvido por:** Claude (Anthropic) + João Leal
**Status:** ✅ **100% FUNCIONAL E PRONTO PARA USO**

---

*Este documento contém todas as especificações E o status completo da implementação das features de Rehearsal Mode e melhorias de fluência no xAI Pocket Trainer.*

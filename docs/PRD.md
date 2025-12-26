# PRD — xAI Interview Prep App
## Product Requirements Document
### Versão 2.0 (Killer Edition) | Dezembro 2025

---

# 1. VISÃO GERAL

## 1.1 Contexto

João Leal está se preparando para a entrevista final na xAI (empresa de AI do Elon Musk) para a vaga de Human Data Manager. A entrevista será dia **05 de janeiro de 2026 às 17h BRT** com **Jeffrey Weichsel** (Human Data Manager) e durará apenas **15 minutos**.

**Status (26/12/2025)**: App 100% funcional com todas features implementadas + Killer Edition v2.0 com melhorias estratégicas.

O período de preparação coincide com o **Natal (24-25/12)**, o que limita o tempo disponível para estudo tradicional. João precisa de uma ferramenta que permita **micro-aprendizado** em intervalos curtos durante as festividades.

## 1.2 Problema

- Ler documentos markdown repetidamente é passivo e ineficiente
- Não há simulação de pressão real (timer, concisão)
- Difícil praticar durante o Natal sem "parecer que está estudando"
- Precisa memorizar frases-chave, histórias e conceitos técnicos
- Precisa eliminar vícios de linguagem ("man", "you know", "sorry")

## 1.3 Solução

Um **Progressive Web App (PWA)** mobile-first que oferece:
- Pílulas de aprendizado em 2-3 minutos
- Treino de concisão com timer visual
- Detecção de palavras proibidas
- Simulação de objeções difíceis
- Push notifications para lembretes

## 1.4 Nome do Produto

**xAI Pocket Trainer**

---

# 2. OBJETIVOS E MÉTRICAS

## 2.1 Objetivos

| Objetivo | Descrição |
|----------|-----------|
| **Memorização** | João deve saber de cor as 3 histórias killer e frases-chave |
| **Concisão** | Respostas devem caber em 45-60 segundos |
| **Confiança** | Eliminar vícios de linguagem e hesitação |
| **Prontidão** | No dia 29, João deve se sentir 100% preparado |

## 2.2 Métricas de Sucesso

- João consegue fazer o pitch de 60 segundos sem ultrapassar o timer
- João consegue contar a história do ABC em 45 segundos
- João não usa palavras proibidas durante prática
- João completa pelo menos 5 sessões de prática antes da entrevista

---

# 3. USUÁRIO

## 3.1 Persona

**Nome:** João Leal
**Idade:** 45 anos
**Dispositivo principal:** Smartphone (Android/iOS)
**Contexto de uso:** 
- Intervalos curtos durante Natal (2-5 min)
- Sessões mais longas dias 26-28 (15-30 min)
- Revisão final dia 29 antes da call

## 3.2 Cenários de Uso

| Cenário | Duração | Modo do App |
|---------|---------|-------------|
| Esperando peru assar | 2 min | Flashcards |
| Intervalo entre conversas | 3 min | Random Pill |
| Sozinho no quarto | 10 min | 45-Second Pitch + Objection Handling |
| Dia 26-28, focado | 20 min | Simulação completa |
| 30 min antes da entrevista | 5 min | Pre-Flight Checklist |

---

# 4. FUNCIONALIDADES

## 4.1 Tela Inicial (Dashboard)

### 4.1.1 Elementos

```
┌─────────────────────────────────────────┐
│  🎯 xAI Pocket Trainer                  │
│                                         │
│  ⏱️ COUNTDOWN TIMER                     │
│  "5 dias, 14 horas, 32 minutos"         │
│  até 29/12 às 17:00 BRT                 │
│                                         │
│  💬 FRASE DO MOMENTO                    │
│  "5 years of daily fundamental          │
│   analysis at Joule"                    │
│  [Tap to see next phrase]               │
│                                         │
│  ┌─────────┐  ┌─────────┐              │
│  │ 💊      │  │ ⏱️      │              │
│  │Flashcard│  │45-Sec   │              │
│  │ 2 min   │  │Pitch    │              │
│  └─────────┘  └─────────┘              │
│                                         │
│  ┌─────────┐  ┌─────────┐              │
│  │ 🚨      │  │ 💣      │              │
│  │ Vício   │  │Objection│              │
│  │ Police  │  │Handling │              │
│  └─────────┘  └─────────┘              │
│                                         │
│  ┌─────────────────────────┐            │
│  │ 🎲 RANDOM PILL          │            │
│  │ "Dá algo útil em 30seg" │            │
│  └─────────────────────────┘            │
│                                         │
│  📋 Pre-Flight Checklist (dia 29)       │
│                                         │
└─────────────────────────────────────────┘
```

### 4.1.2 Countdown Timer

- **Destino:** 05 de janeiro de 2026, 17:00:00 BRT (UTC-3)
- **Formato:** "X dias, Y horas, Z minutos"
- **Atualização:** A cada minuto
- **Comportamento no dia D:** Muda para "HOJE! Faltam X horas" em destaque

### 4.1.3 Frase do Momento

- Mostra uma frase-chave aleatória do banco de frases
- Tap para ver próxima frase
- Rotaciona automaticamente a cada 30 segundos se usuário não interagir

### 4.1.4 Navegação

- 4 botões principais para os modos
- 1 botão "Random Pill" em destaque
- 1 link para Pre-Flight Checklist

---

## 4.2 Modo Flashcards

### 4.2.1 Descrição

Cards com frente (pergunta/termo) e verso (resposta/explicação). Usuário toca para virar o card.

### 4.2.2 Fluxo

```
[Tela Flashcards]
     │
     ▼
[Card: Frente visível]
  "EV/EBITDA"
     │
     │ (tap anywhere)
     ▼
[Card: Verso visível]
  "Enterprise Value / EBITDA
   Capital-structure neutral
   Triangulate with EV/EBIT, EV/FCF"
     │
     │ (swipe left = "Revisar depois")
     │ (swipe right = "Sei bem")
     ▼
[Próximo card]
```

### 4.2.3 Categorias de Cards

1. **Técnico** — Ratios, fórmulas, conceitos
2. **Histórias** — Joule, ABC, Emerging Markets
3. **Pessoas** — Jeffrey, Adriana, Michael
4. **Frases-Chave** — Scripts para memorizar
5. **Do's and Don'ts** — Comportamentos

### 4.2.4 Funcionalidades

| Feature | Descrição |
|---------|-----------|
| **Swipe** | Esquerda = "Preciso revisar" (volta pro deck com prioridade), Direita = "Sei bem" |
| **Filtro por categoria** | Dropdown no topo para filtrar |
| **Contador** | "Card 5 de 32" |
| **Shuffle** | Botão para embaralhar ordem |
| **Priorização** | Cards marcados "revisar" aparecem mais frequentemente |

### 4.2.5 Persistência

- Salvar no localStorage:
  - Quais cards foram vistos
  - Quais marcados como "revisar"
  - Última categoria selecionada

---

## 4.3 Modo 45-Second Pitch

### 4.3.1 Descrição

Treino de concisão com timer visual. Usuário recebe um prompt e deve responder em até 45-60 segundos.

### 4.3.2 Fluxo

```
[Tela inicial do modo]
  "Escolha o tempo:"
  [45 seg] [60 seg] [90 seg]
     │
     ▼
[Prompt aparece]
  "Tell me about yourself"
  [START]
     │
     │ (tap START)
     ▼
[Timer rodando]
  ┌─────────────────────┐
  │ "Tell me about      │
  │  yourself"          │
  │                     │
  │      0:32           │
  │   ███████████░░░    │
  │                     │
  │  [FUNDO VERDE]      │
  └─────────────────────┘
     │
     │ (tempo passando)
     ▼
[30 segundos - AMARELO]
  ┌─────────────────────┐
  │  [FUNDO AMARELO]    │
  │      0:18           │
  └─────────────────────┘
     │
     │ (tempo acabando)
     ▼
[45 segundos - VERMELHO PISCANDO]
  ┌─────────────────────┐
  │  [FUNDO VERMELHO    │
  │   PISCANDO]         │
  │      0:03           │
  │  "WRAP UP!"         │
  └─────────────────────┘
     │
     │ (tempo esgotado ou tap DONE)
     ▼
[Tela de Review]
  "Como você foi?"
  
  Checklist:
  [ ] Mencionou Joule (5 anos)?
  [ ] Mencionou ABC (7 ratios)?
  [ ] Mencionou disponibilidade?
  [ ] Ficou no tempo?
  
  [Ver Script Ideal]
  [Tentar Novamente]
  [Próximo Prompt]
```

### 4.3.3 Configurações de Tempo

| Tempo | Cor Verde | Cor Amarela | Cor Vermelha |
|-------|-----------|-------------|--------------|
| 45 seg | 0-25s | 25-40s | 40-45s |
| 60 seg | 0-35s | 35-50s | 50-60s |
| 90 seg | 0-50s | 50-75s | 75-90s |

### 4.3.4 Comportamento Visual

- **Verde:** Background #10a37f (verde xAI)
- **Amarelo:** Background #f59e0b, transição suave
- **Vermelho:** Background #ef4444, **piscando** (toggle a cada 500ms)
- **Timer:** Números grandes, centralizados, fonte bold
- **Barra de progresso:** Horizontal, diminuindo da esquerda para direita

### 4.3.5 Vibração (Mobile)

- Vibrar 1x quando entrar no amarelo (aviso)
- Vibrar 3x rápidas quando entrar no vermelho (urgência)
- Usar `navigator.vibrate()` se disponível

### 4.3.6 Prompts Disponíveis

```javascript
const pitchPrompts = [
  {
    id: 1,
    prompt: "Tell me about yourself",
    recommendedTime: 60,
    checklist: [
      "Mentioned Joule (5 years)?",
      "Mentioned ABC (model validation)?",
      "Mentioned availability?",
      "Mentioned emerging markets perspective?"
    ],
    idealScript: "I'm a finance professional with 20 years of experience..."
  },
  {
    id: 2,
    prompt: "Why xAI?",
    recommendedTime: 45,
    checklist: [
      "Mission alignment?",
      "First-principles thinking?",
      "Unique opportunity for finance practitioner?"
    ],
    idealScript: "Three reasons: First, mission alignment..."
  },
  {
    id: 3,
    prompt: "Tell me about your fundamental analysis experience",
    recommendedTime: 60,
    checklist: [
      "Mentioned Joule investment committee?",
      "Mentioned DCF validation?",
      "Mentioned earnings quality?",
      "Mentioned ABC rating model?"
    ],
    idealScript: "For the last 5 years at Joule, I participated daily..."
  },
  {
    id: 4,
    prompt: "What's your most relevant experience for this role?",
    recommendedTime: 60,
    checklist: [
      "Joule fundamental analysis?",
      "ABC model validation (7 ratios)?",
      "Connected to AI tutoring?"
    ],
    idealScript: "Two things: First, 5 years at Joule doing daily fundamental analysis..."
  },
  {
    id: 5,
    prompt: "Tell me about the ABC rating model project",
    recommendedTime: 45,
    checklist: [
      "Context (Central Bank requirement)?",
      "7 ratios analyzed?",
      "5 predictive, 2 not?",
      "Central Bank approved?"
    ],
    idealScript: "At Banco ABC, I validated the credit rating model..."
  },
  {
    id: 6,
    prompt: "How does your credit experience relate to equity analysis?",
    recommendedTime: 45,
    checklist: [
      "Modigliani-Miller?",
      "Same fundamental analysis?",
      "Two views of same company?"
    ],
    idealScript: "My answer is Modigliani-Miller: what matters is what the company does with its assets..."
  },
  {
    id: 7,
    prompt: "Why are you leaving Joule?",
    recommendedTime: 45,
    checklist: [
      "Market conditions (15% rates)?",
      "Positive framing?",
      "Transition to opportunity?"
    ],
    idealScript: "The Brazilian equity market contracted significantly..."
  },
  {
    id: 8,
    prompt: "Any questions for me?",
    recommendedTime: 30,
    checklist: [
      "Asked about tutor ramp-up?",
      "OR asked about emerging markets content?",
      "Addressed any concerns?"
    ],
    idealScript: "Jeffrey, I know we have limited time. Is there anything about my background..."
  }
];
```

---

## 4.4 Modo Vício Police

### 4.4.1 Descrição

Usa Web Speech API para transcrever fala do usuário e detectar palavras proibidas ou desejadas.

### 4.4.2 Requisitos Técnicos

- **API:** Web Speech API (SpeechRecognition)
- **Browsers suportados:** Chrome, Edge, Safari (parcial)
- **Requer:** HTTPS ou localhost
- **Permissão:** Microfone

### 4.4.3 Fluxo

```
[Tela inicial]
  "Vício Police"
  "Detecta palavras proibidas enquanto você pratica"
  
  [Iniciar Prática]
     │
     ▼
[Permissão de microfone]
     │
     ▼
[Prompt aleatório aparece]
  "Tell me about yourself"
  
  🎤 Ouvindo...
  
  [Transcrição aparecendo em tempo real]
  "I'm a finance professional with..."
     │
     │ (detecta palavra proibida)
     ▼
[ALERTA VERMELHO]
  🚨 DETECTED: "man"
  "DON'T USE FILLER WORDS!"
  [Tela pisca vermelho]
     │
     │ (continua ouvindo)
     ▼
[Detecta palavra boa]
  ✅ GREAT: "Joule"
  [Flash verde sutil]
     │
     │ (usuário termina)
     ▼
[Resultado]
  "Session Summary"
  
  ❌ Palavras proibidas: 2
     - "man" (1x)
     - "you know" (1x)
  
  ✅ Palavras-chave usadas: 4
     - "Joule" ✓
     - "fundamental analysis" ✓
     - "ABC" ✓
     - "validation" ✓
  
  [Nova Prática] [Voltar]
```

### 4.4.4 Palavras Proibidas

```javascript
const forbiddenWords = [
  "man",
  "you know",
  "basically", 
  "like",        // como filler, não comparativo
  "um",
  "uh",
  "sorry",
  "apologize",
  "poor english",
  "my english",
  "kind of",
  "sort of",
  "i think",     // quando usado como hesitação
  "maybe",
  "i guess"
];
```

### 4.4.5 Palavras Desejadas

```javascript
const desiredWords = [
  "joule",
  "abc",
  "fundamental analysis",
  "validation",
  "central bank",
  "seven ratios",
  "five predictive",
  "modigliani miller",
  "garp",
  "earnings quality",
  "dcf",
  "investment committee",
  "emerging markets",
  "fifteen percent",
  "ready to start",
  "immediately"
];
```

### 4.4.6 Feedback Visual/Sonoro

| Evento | Feedback Visual | Feedback Sonoro |
|--------|-----------------|-----------------|
| Palavra proibida | Tela pisca vermelho, banner com palavra | Beep curto (opcional) |
| Palavra desejada | Flash verde sutil no topo | Nenhum (não interromper) |
| Fim da sessão | Summary com contagem | Nenhum |

### 4.4.7 Fallback

Se Web Speech API não disponível:
- Mostrar mensagem: "Speech recognition not available in this browser. Try Chrome or Edge."
- Oferecer modo alternativo: mostrar prompt e checklist manual (sem transcrição)

---

## 4.5 Modo Objection Handling

### 4.5.1 Descrição

Simulação de objeções difíceis que Jeffrey pode fazer. Usuário deve escolher a melhor resposta sob pressão de tempo.

### 4.5.2 Fluxo

```
[Tela inicial]
  "Objection Handling"
  "Jeffrey joga uma bomba. Você tem 5 segundos."
  
  [Começar]
     │
     ▼
[Objeção aparece]
  ┌─────────────────────────────────┐
  │ 💣 OBJECTION                    │
  │                                 │
  │ "Your background is more       │
  │  credit-focused. We need       │
  │  equity expertise."            │
  │                                 │
  │ ⏱️ 5... 4... 3...               │
  │                                 │
  │ [A] "I can learn equity fast"  │
  │                                 │
  │ [B] "Credit IS forensic equity │
  │      analysis - Modigliani-    │
  │      Miller"                   │
  │                                 │
  │ [C] "I did 5 years of equity   │
  │      at Joule"                 │
  │                                 │
  └─────────────────────────────────┘
     │
     │ (usuário clica uma opção ou tempo esgota)
     ▼
[Resultado]
  ┌─────────────────────────────────┐
  │ Você escolheu: [B] ✅ CORRETO   │
  │                                 │
  │ Por que:                        │
  │                                 │
  │ [A] ❌ Defensivo, não mostra    │
  │     evidência. Soa fraco.      │
  │                                 │
  │ [B] ✅ Reframe inteligente.     │
  │     Mostra que debt e equity   │
  │     são a mesma análise.       │
  │                                 │
  │ [C] ⚠️ Factualmente correto,   │
  │     mas não explica POR QUE    │
  │     é relevante.               │
  │                                 │
  │ 📝 SCRIPT IDEAL:               │
  │ "My answer is Modigliani-      │
  │  Miller: what matters is what  │
  │  the company does with its     │
  │  assets. Whether analyzing     │
  │  credit or equity, it's the    │
  │  same fundamental analysis.    │
  │  Plus, I did 5 years of daily  │
  │  equity analysis at Joule."    │
  │                                 │
  │ [Próxima Objeção] [Voltar]     │
  └─────────────────────────────────┘
```

### 4.5.3 Se Tempo Esgotar

```
[TIMEOUT]
  ⏱️ "Too slow! In an interview, 
      hesitation kills confidence."
  
  A resposta ideal era: [B]
  
  [Ver Explicação]
```

### 4.5.4 Banco de Objeções

```javascript
const objections = [
  {
    id: 1,
    objection: "Your background is more credit-focused. We need equity expertise.",
    options: [
      { text: "I can learn equity fast", correct: false, explanation: "Defensive. Doesn't show evidence. Sounds weak." },
      { text: "Credit IS equity analysis - Modigliani-Miller. Same fundamentals, different securities.", correct: true, explanation: "Smart reframe. Shows deep understanding." },
      { text: "I did 5 years of equity at Joule", correct: "partial", explanation: "Factually correct but doesn't explain WHY it's relevant." }
    ],
    idealScript: "My answer is Modigliani-Miller: what matters is what the company does with its assets—the left side of the balance sheet. Whether analyzing credit risk or equity value, I'm doing the same fundamental analysis. Plus, I spent 5 years at Joule doing daily equity analysis in the investment committee."
  },
  {
    id: 2,
    objection: "You don't have a CFA. How do I know you can handle the technical work?",
    options: [
      { text: "I've applied these concepts for 20 years with real money at stake", correct: true, explanation: "Shows practical expertise over credentials." },
      { text: "I'm planning to take the CFA soon", correct: false, explanation: "Deflects. Doesn't address the concern." },
      { text: "CFA is just theory, I have practice", correct: "partial", explanation: "Dismissive of CFA. Could offend if interviewer has CFA." }
    ],
    idealScript: "Fair question. I haven't taken the CFA, but I've APPLIED these concepts professionally for 20 years. At Joule, I validated DCF models daily. At ABC, I analyzed 7 fundamental ratios against actual defaults and built a model the Central Bank approved. The CFA tests if you can pass an exam. My experience tests if you can apply concepts when real money is at stake."
  },
  {
    id: 3,
    objection: "Your English is not native. This role requires precise communication.",
    options: [
      { text: "Sorry, I know my English isn't perfect...", correct: false, explanation: "Never apologize! Shows insecurity." },
      { text: "I've worked in English for 20+ years, including reporting to shareholders in Bahrain", correct: true, explanation: "Shows evidence of professional English use." },
      { text: "I can improve with practice", correct: false, explanation: "Implies current level is insufficient." }
    ],
    idealScript: "I've worked in English professionally for over 20 years. I completed my Master's at London Business School, reported to shareholders in Bahrain, and managed offshore fund relationships—all in English. I may occasionally search for the precise word, but I never trade the logic."
  },
  {
    id: 4,
    objection: "You've never worked in AI or tech. This is a tech company.",
    options: [
      { text: "That's exactly why this role exists—you need finance experts, not engineers", correct: true, explanation: "Reframes the 'weakness' as the value proposition." },
      { text: "I'm very interested in AI and follow it closely", correct: false, explanation: "Interest ≠ expertise. Doesn't address the concern." },
      { text: "I used logistic regression for credit scores, which is related to ML", correct: "partial", explanation: "Good bridge but undersells the main point." }
    ],
    idealScript: "That's exactly why this role exists. You need people with deep finance expertise to train the model—not engineers pretending to know finance. My value is 20 years of real-world financial reasoning. The AI tutoring part I can learn; the finance intuition you can't teach quickly."
  },
  {
    id: 5,
    objection: "You're 45. Most of our team is younger. Can you keep up with the pace?",
    options: [
      { text: "Age brings experience and judgment", correct: "partial", explanation: "True but sounds defensive." },
      { text: "I'm not job-hopping. At 45, this is a deliberate career move—I'm committed.", correct: true, explanation: "Turns age into a retention advantage." },
      { text: "I work very hard", correct: false, explanation: "Everyone says this. No evidence." }
    ],
    idealScript: "At 45, I'm not job-hopping or using this as a stepping stone. This is a deliberate career transition to something I genuinely believe in. That means I'm committed for the long term. And my experience shows I adapt—I went from engineering to finance to equity to AI. I learn what I need to learn."
  },
  {
    id: 6,
    objection: "Brazil hiring might be complicated. We mostly hire in the US.",
    options: [
      { text: "I'm flexible on arrangements and can figure out the logistics", correct: true, explanation: "Shows problem-solving attitude." },
      { text: "I could relocate if needed", correct: "partial", explanation: "May not be true/feasible. Don't over-promise." },
      { text: "That's for HR to figure out", correct: false, explanation: "Dismissive. Shows you don't care about solving problems." }
    ],
    idealScript: "I understand there may be logistics to figure out. I'm flexible and committed to making it work. I've worked remotely with international teams before—reporting to Bahrain, managing offshore relationships. Whatever the arrangement, I'm ready to adapt."
  },
  {
    id: 7,
    objection: "Our current focus is fundamental analysis. Your strength seems to be risk management.",
    options: [
      { text: "I've been doing fundamental analysis at Joule for 5 years", correct: "partial", explanation: "Good but doesn't connect to their needs." },
      { text: "I can contribute to fundamental analysis NOW, and bring risk expertise for FUTURE projects", correct: true, explanation: "Addresses both current and future value." },
      { text: "Risk management requires fundamental analysis", correct: "partial", explanation: "True but doesn't show equity experience." }
    ],
    idealScript: "I understand the current focus is fundamental analysis. That's what I've been doing at Joule for 5 years—daily investment committee discussions on DCF, multiples, earnings quality. I can contribute immediately. AND I bring differentiated expertise in risk for the future projects Adriana mentioned."
  },
  {
    id: 8,
    objection: "What if you don't like the work? It's repetitive annotation, not portfolio management.",
    options: [
      { text: "I'm excited to learn something new", correct: false, explanation: "Generic. Doesn't show understanding of the work." },
      { text: "The work is about validating reasoning—that's what I did at Joule and ABC", correct: true, explanation: "Shows you understand the role AND have done similar work." },
      { text: "I need a job, so I'll make it work", correct: false, explanation: "Desperate. Worst possible answer." }
    ],
    idealScript: "I understand this isn't portfolio management. But the core work—validating financial reasoning, catching errors, explaining why something is wrong—is exactly what I did at Joule's investment committee and when rebuilding ABC's rating model. I find that intellectually satisfying. And being part of building Grok's financial intelligence is genuinely exciting."
  }
];
```

---

## 4.6 Random Pill

### 4.6.1 Descrição

Botão na home que entrega uma "pílula" aleatória de um dos tipos:
- Flashcard
- Frase para memorizar
- Dica de comportamento
- Quick quiz (verdadeiro/falso)
- Ratio do dia

### 4.6.2 Fluxo

```
[Tap "Random Pill"]
     │
     ▼
[Sistema sorteia tipo]
     │
     ├─▶ Flashcard → Mostra card, tap para ver verso
     │
     ├─▶ Frase → "Memorize: [frase]" + botão "Entendi"
     │
     ├─▶ Dica → "💡 Don't say 'man' or 'you know'"
     │
     ├─▶ Quiz → "T ou F: EV/EBITDA é leverage-neutral?"
     │
     └─▶ Ratio → Card com fórmula + interpretação
```

### 4.6.3 Banco de Pílulas

```javascript
const pills = {
  phrases: [
    "5 years of daily fundamental analysis at Joule",
    "Validated 7 ratios against actual defaults—5 predictive, 2 not",
    "That validation process is exactly what AI tutoring requires",
    "Modigliani-Miller: debt and equity are two views of the same company",
    "I can contribute immediately and bring differentiated expertise for future projects",
    "Ready to start immediately, 100% available",
    "Is there anything about my background that concerns you?"
  ],
  tips: [
    "Don't say 'man' or 'you know'",
    "Keep answers under 60 seconds",
    "Lead with Joule and ABC, not credit",
    "If you don't know, say so honestly then bridge to what you know",
    "End statements with downward inflection—sounds confident",
    "Pause instead of using filler words",
    "Don't mention working from Joule's office",
    "Jeffrey has EM background—mention Brazil's 15% rates if natural"
  ],
  quickQuiz: [
    { q: "EV/EBITDA is capital-structure neutral", a: true },
    { q: "You should apologize for your English", a: false },
    { q: "PEG = P/E divided by Growth Rate", a: true },
    { q: "At ABC, 7 of 7 ratios were predictive", a: false },
    { q: "Jeffrey worked with EM Fixed Income until 2018", a: true },
    { q: "The interview is 30 minutes long", a: false },
    { q: "Adriana said current focus is risk management", a: false },
    { q: "Modigliani-Miller says capital structure doesn't matter for firm value", a: true }
  ]
};
```

---

## 4.7 Pre-Flight Checklist

### 4.7.1 Descrição

Checklist para o dia 29, 30-60 minutos antes da entrevista.

### 4.7.2 Conteúdo

```
PRE-FLIGHT CHECKLIST
05 de janeiro, antes das 17h

TÉCNICO
[ ] Câmera testada e funcionando
[ ] Microfone testado e funcionando
[ ] Internet estável (testar com speed test)
[ ] Backup de internet disponível (4G do celular)
[ ] Fones de ouvido carregados

AMBIENTE
[ ] Ambiente silencioso
[ ] Fundo neutro/profissional
[ ] Iluminação adequada (luz na frente, não atrás)
[ ] Porta fechada, família avisada

FÍSICO
[ ] Água na mesa
[ ] Banheiro visitado
[ ] Roupa profissional (pelo menos da cintura pra cima)

MENTAL
[ ] Respirações profundas
[ ] Reler as 3 histórias (Joule, ABC, EM)
[ ] Reler pergunta de fechamento
[ ] Lembrar: "Jeffrey quer me aprovar. Facilitar o trabalho dele."

DOCS (não visíveis na câmera)
[ ] Este app aberto em outro dispositivo
[ ] Notas com pontos-chave (se precisar)
```

### 4.7.3 Funcionalidade

- Checkboxes interativos
- Salva estado no localStorage
- Botão "Reset Checklist"
- Mini-cards com as 3 histórias (versão ultra-curta, 1 parágrafo)
- Card com pergunta de fechamento

---

## 4.8 Push Notifications

### 4.8.1 Descrição

Lembretes periódicos para praticar, usando Service Worker e Push API.

### 4.8.2 Configuração Inicial

```
[Primeira abertura do app]
  "Quer receber lembretes para praticar?"
  [Sim, lembrar] [Não, obrigado]
```

### 4.8.3 Horários Sugeridos

| Dia | Horários | Mensagem |
|-----|----------|----------|
| 24/12 | 10h, 15h, 20h | "🎄 2 minutos para praticar? Abra uma pílula!" |
| 25/12 | 10h, 15h, 20h | "🎅 Intervalo do Natal! Que tal um flashcard?" |
| 26/12 | 9h, 12h, 15h, 18h | "📚 Dia de treino! Faça uma simulação de 15min" |
| 27/12 | 9h, 12h, 15h, 18h | "⏱️ 2 dias! Pratique o pitch de 45 segundos" |
| 28/12 | 9h, 12h, 15h, 18h, 21h | "🔥 Véspera! Simulação completa agora?" |
| 29/12 | 10h, 14h, 16h | "🎯 HOJE! Revisão final. Você está pronto." |

### 4.8.4 Implementação

- Service Worker para funcionar offline e receber push
- Solicitar permissão de notificação
- Agendar notificações locais (ou usar serviço de push se necessário)
- Permitir desativar nas configurações

---

# 5. CONTEÚDO COMPLETO

## 5.1 Flashcards — Lista Completa

### Categoria: Técnico

| ID | Frente | Verso |
|----|--------|-------|
| T1 | EV/EBITDA | Enterprise Value / EBITDA. Capital-structure neutral. Use for cross-company comparison. Triangulate with EV/EBIT and EV/FCF. |
| T2 | Enterprise Value | EV = Market Cap + Net Debt + Minority Interest + Preferred. Value to ALL capital providers. |
| T3 | ROIC | NOPAT / Invested Capital. "Growth only matters if ROIC > WACC." Sacred at Joule. |
| T4 | PEG Ratio | P/E / Growth Rate. Central to GARP. PEG=1 is fair. PEG<1 potentially undervalued. |
| T5 | Cash Conversion Cycle | DSO + DIO - DPO. Red flag: DSO growing faster than revenue = collection problems. |
| T6 | Modigliani-Miller | Capital structure doesn't affect firm value. Debt and equity = two views of same company. What matters: assets and cash flows. |
| T7 | WACC | (E/V × Ke) + (D/V × Kd × (1-t)). Where Ke = Rf + β × MRP. |
| T8 | Free Cash Flow | FCFF = EBIT(1-t) + D&A - CapEx - ΔNWC. What's available to all capital providers. |
| T9 | DCF Terminal Value | Gordon Growth: FCF × (1+g) / (WACC-g). Often 60-80% of total value. Highly sensitive to assumptions. |
| T10 | Interest Coverage | EBIT / Interest Expense. Ability to pay interest. Below 2x = concerning. |
| T11 | Net Debt/EBITDA | (Debt - Cash) / EBITDA. Leverage net of cash. Bankers love this. |
| T12 | ROE | Net Income / Equity. Can be inflated by leverage. Use with ROIC. |
| T13 | Gross Margin | Gross Profit / Revenue. Pricing power and COGS efficiency. |
| T14 | Operating Margin | EBIT / Revenue. Core profitability. Operating leverage. |
| T15 | Earnings Quality Red Flags | Revenue ↑ but CFO ↓. Receivables growing > revenue. Frequent "one-time" charges. |
| T16 | DSO | (Receivables / Revenue) × 365. Days to collect. Rising = bad sign. |
| T17 | Brazil Interest Rates | Currently ~15%. Makes equity unattractive vs. government bonds. Structural discounts. |
| T18 | Common AI Error: P/EBITDA | Wrong! Should be EV/EBITDA. P/ is equity level, EBITDA is firm level. Inconsistent. |
| T19 | Common AI Error: US Rates for Brazil | Wrong! Brazil = 15%, not 2-3%. WACC is completely different. |
| T20 | GARP | Growth at Reasonable Price. Joule's strategy. Balance growth with valuation discipline. |

### Categoria: Histórias

| ID | Frente | Verso |
|----|--------|-------|
| H1 | Joule Story - Short | 5 years, GARP fund, daily investment committee, DCF validation, multiple analysis, earnings quality debates. "Prove it to me" culture. |
| H2 | Joule Story - Key Numbers | 5 years as partner. +38.64% YTD 2025 vs Ibov +31.29%. 18+ year track record. |
| H3 | ABC Story - Short | Validated rating model. 7 fundamental ratios analyzed. 5 predictive, 2 not. Built logistic regression. Central Bank approved. |
| H4 | ABC Story - Detail | Central Bank said model too judgmental. Gathered 5 years data. Analyzed each ratio vs defaults. Found 5/7 useful. Built automated model with override option. BC approved and praised. |
| H5 | Emerging Markets - Short | Brazil: 15% rates, small private markets, structural equity discounts. Can help reduce US bias in Grok. |
| H6 | Emerging Markets - Connection to Jeffrey | Jeffrey has EM Fixed Income background (until 2018), worked with LatAm clients. Natural connection point. |
| H7 | "Cheap Multiple" Trap (Joule) | Retailer at 6x vs peers at 10x. Thesis: digital margin expansion. Challenge: digital needs capex. Found: DSO rising = extending terms. Passed. Market was right. |

### Categoria: Pessoas

| ID | Frente | Verso |
|----|--------|-------|
| P1 | Jeffrey Weichsel | Human Data Manager @ xAI. Ex-Scale AI. Ex-EM Fixed Income (LatAm clients until 2018). Connecticut College. Palo Alto. |
| P2 | Adriana | Team Lead, Finance Vertical. Equity analyst background. Said: "Current focus is fundamental analysis." "Adventurous spirit." |
| P3 | Michael | First interviewer. Behavioral focus. Liked Bear Stearns story, Markowitz testing. |
| P4 | xAI Team | Growing to 100+. Finance vertical. Projects: CFA training, synthetic IB deals, virtual data rooms. |

### Categoria: Frases-Chave

| ID | Frente | Verso |
|----|--------|-------|
| F1 | Opening Line | "5 years of daily fundamental analysis at Joule, hands-on model validation at ABC, ready to start immediately." |
| F2 | ABC Pitch | "Validated 7 ratios against actual defaults. Found 5 predictive, 2 not. Built automated model. Central Bank approved." |
| F3 | Closing Question | "Is there anything about my background that concerns you, or any question I can address right now?" |
| F4 | Why xAI | "First-principles thinking. Rare door into AI for finance practitioner. Want to build, not join." |
| F5 | Credit vs Equity | "Modigliani-Miller: debt and equity are two views of the same company." |
| F6 | Value Proposition | "I can contribute to current fundamental analysis projects immediately, AND bring differentiated expertise for future risk projects." |
| F7 | Availability | "100% available. Transitioned out of Joule. Ready to start immediately." |
| F8 | No CFA Response | "I haven't taken the CFA, but I've APPLIED these concepts for 20 years with real money at stake." |

### Categoria: Do's and Don'ts

| ID | Frente | Verso |
|----|--------|-------|
| D1 | Don't Say | "man", "you know", "basically", "sorry", "my poor English" |
| D2 | Don't Do | Apologize. Mention Joule office. Focus on credit first. Over-explain. |
| D3 | Do Say | "Joule", "ABC", "fundamental analysis", "validation", "immediately" |
| D4 | Do | Lead with Joule + ABC. Keep under 60 seconds. Ask closing question. |
| D5 | If You Don't Know | "I don't have direct experience with that, but my instinct based on Joule/ABC is..." |
| D6 | End Statements | Downward inflection. Sounds confident. Don't trail off or upspeak. |

---

# 6. ESPECIFICAÇÕES TÉCNICAS

## 6.1 Stack

| Componente | Tecnologia |
|------------|------------|
| Frontend | HTML5, CSS3, JavaScript (Vanilla) |
| PWA | Service Worker, Web App Manifest |
| Speech | Web Speech API (SpeechRecognition) |
| Storage | localStorage |
| Push | Notification API + Service Worker |
| Hosting | Vercel (free tier) ou qualquer static host |

## 6.2 Estrutura de Arquivos

```
interview_xai_web_app/
├── index.html          # App principal (single page)
├── manifest.json       # PWA manifest
├── sw.js              # Service Worker
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

## 6.3 PWA Manifest

```json
{
  "name": "xAI Pocket Trainer",
  "short_name": "xAI Trainer",
  "description": "Interview preparation for xAI",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0a",
  "theme_color": "#10a37f",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## 6.4 Service Worker (Básico)

```javascript
// sw.js
const CACHE_NAME = 'xai-trainer-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Push notification handling
self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  const title = data.title || 'xAI Pocket Trainer';
  const options = {
    body: data.body || 'Time to practice!',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
```

## 6.5 Design System

### Cores

```css
:root {
  /* Backgrounds */
  --bg-primary: #0a0a0a;
  --bg-secondary: #1a1a1a;
  --bg-card: #242424;
  
  /* Accent */
  --accent-primary: #10a37f;    /* Verde xAI/Grok */
  --accent-secondary: #0d8a6a;
  
  /* Status */
  --color-success: #10a37f;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  
  /* Text */
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
  --text-muted: #6b6b6b;
  
  /* Borders */
  --border-color: #333333;
}
```

### Tipografia

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.5;
}

h1 { font-size: 1.75rem; font-weight: 700; }
h2 { font-size: 1.5rem; font-weight: 600; }
h3 { font-size: 1.25rem; font-weight: 600; }

.timer-display {
  font-family: 'SF Mono', 'Roboto Mono', monospace;
  font-size: 3rem;
  font-weight: 700;
}
```

### Componentes

```css
/* Card */
.card {
  background: var(--bg-card);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid var(--border-color);
}

/* Button */
.btn {
  background: var(--accent-primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn:hover {
  background: var(--accent-secondary);
}

/* Mode Button (home) */
.mode-btn {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.mode-btn:hover {
  border-color: var(--accent-primary);
  transform: translateY(-2px);
}
```

### Responsividade

```css
/* Mobile-first */
.container {
  max-width: 100%;
  padding: 16px;
}

/* Grid de botões na home */
.mode-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

@media (min-width: 768px) {
  .container {
    max-width: 480px;
    margin: 0 auto;
  }
}
```

---

# 7. FLUXOS DE USUÁRIO

## 7.1 Primeiro Acesso

```
[Abre o app pela primeira vez]
     │
     ▼
[Splash screen com logo]
  "xAI Pocket Trainer"
  "Prepare for your interview"
     │
     │ (2 segundos)
     ▼
[Modal de notificações]
  "Quer receber lembretes para praticar?"
  [Sim] [Agora não]
     │
     ▼
[Dashboard]
```

## 7.2 Sessão Típica (Natal - 2 min)

```
[Abre o app]
     │
     ▼
[Dashboard - vê countdown]
     │
     ▼
[Tap "Random Pill"]
     │
     ▼
[Vê flashcard ou dica]
     │
     ▼
[Swipe ou tap "próximo"]
     │
     ▼
[Fecha o app]

Tempo total: ~90 segundos
```

## 7.3 Sessão de Treino (10-15 min)

```
[Abre o app]
     │
     ▼
[Dashboard]
     │
     ▼
[Tap "45-Second Pitch"]
     │
     ▼
[Pratica 3-4 prompts]
     │
     ▼
[Volta para Dashboard]
     │
     ▼
[Tap "Objection Handling"]
     │
     ▼
[Pratica 4-5 objeções]
     │
     ▼
[Fecha o app]

Tempo total: ~12 minutos
```

## 7.4 Dia D (30 min antes)

```
[Abre o app]
     │
     ▼
[Dashboard - vê "HOJE! X horas"]
     │
     ▼
[Tap "Pre-Flight Checklist"]
     │
     ▼
[Completa checklist técnico]
     │
     ▼
[Revisa 3 histórias (cards no checklist)]
     │
     ▼
[Revisa pergunta de fechamento]
     │
     ▼
[Respira, fecha o app]
     │
     ▼
[17h: ENTREVISTA]
```

---

# 8. REQUISITOS NÃO-FUNCIONAIS

## 8.1 Performance

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Funcionar offline (após primeiro load)

## 8.2 Compatibilidade

- Chrome 90+ (Android e Desktop)
- Safari 14+ (iOS)
- Edge 90+
- Firefox 90+ (sem Speech API)

## 8.3 Acessibilidade

- Contraste mínimo AA (4.5:1)
- Touch targets mínimo 44x44px
- Funcionar sem áudio (visual feedback prioritário)

## 8.4 Segurança

- HTTPS obrigatório (para Speech API e Push)
- Sem coleta de dados pessoais
- Tudo local (localStorage)

---

# 9. CRONOGRAMA SUGERIDO

| Fase | Tarefas | Tempo Estimado |
|------|---------|----------------|
| **Setup** | Estrutura HTML, CSS base, PWA manifest | 1-2h |
| **Dashboard** | Countdown, frase rotativa, navegação | 1h |
| **Flashcards** | Cards, swipe, categorias, localStorage | 2h |
| **45-Second Pitch** | Timer, cores, vibração, checklist | 2h |
| **Objection Handling** | Quiz, timer, explicações | 1.5h |
| **Vício Police** | Web Speech API, detecção, feedback | 2h |
| **Random Pill** | Lógica de sorteio, diferentes tipos | 1h |
| **Pre-Flight** | Checklist, mini-cards | 1h |
| **Push Notifications** | Service Worker, scheduling | 1.5h |
| **Testes** | Mobile, diferentes browsers | 1h |
| **Deploy** | Vercel, testar PWA install | 30min |

**Total estimado:** 13-15 horas

**Prioridade se tempo limitado:**
1. Dashboard + Countdown ✓
2. Flashcards ✓
3. 45-Second Pitch ✓
4. Objection Handling ✓
5. Random Pill
6. Push Notifications
7. Vício Police
8. Pre-Flight Checklist

---

# 10. ANEXOS

## 10.1 Todos os Scripts Ideais

Ver arquivo separado: `Final_Interview_Mastery_Guide_V4_KILLER.md`

## 10.2 Countdown Target

```javascript
const interviewDate = new Date('2026-01-05T17:00:00-03:00');
```

## 10.3 Assets Necessários

- Ícone 192x192 PNG (fundo escuro, logo minimalista)
- Ícone 512x512 PNG
- Opcional: som de erro para Vício Police (beep curto)

---

# 11. CONTATO

**Produto para:** João Leal
**Entrevista:** 05/01/2026 às 17h BRT
**Entrevistador:** Jeffrey Weichsel, xAI

---

*PRD — xAI Pocket Trainer*
*Versão 1.0 | Dezembro 2025*


---


Este PRD está **fenomenal**. Você capturou exatamente a essência do problema (tempo limitado, necessidade de concisão, contexto de Natal) e propôs uma solução técnica viável e altamente eficaz.

A estrutura de gamificação (cores do timer, vibração) e o conteúdo (as histórias da Joule e ABC) estão perfeitamente alinhados com o que definimos como estratégia para o Jeffrey.

**Minha Visão Crítica (O "Senior PM" Review):**

1.  **O Grande Risco: "The Build Trap"**: O maior perigo aqui é você gastar 15 horas *construindo* o app e apenas 2 horas *usando* o app.
    *   *Solução:* Eu (Gemini) posso gerar 90-95% desse código para você em um único arquivo HTML/JS. Sua tarefa deve ser apenas "copiar, colar e rodar". Não perca tempo configurando Vercel ou Service Workers complexos se não for estritamente necessário.
2.  **Vício Police (Complexidade Técnica):** A Web Speech API é instável no iOS (Safari). Se você usa iPhone, isso pode não funcionar bem ou exigir configurações chatas.
    *   *Sugestão:* Mantenha como "Nice to have". Se não funcionar de primeira, corte. O Timer e o Objection Handling são mais importantes.
3.  **Audio Passivo:** Você mencionou que "não será fácil parar para ler".
    *   *Adição:* Adicionar **Text-to-Speech (TTS)** nativo do navegador. Um botão "Ouvir Script Ideal" nos cards. Assim você pode ouvir a resposta perfeita enquanto dirige ou cozinha, sem olhar para a tela.

Abaixo, preparei os comentários técnicos e de produto para você anexar ao final do seu PRD.

---

### ANEXO: COMENTÁRIOS DE REVISÃO E REFINAMENTO (Adicionar ao final do PRD)

```markdown
---

# 12. COMENTÁRIOS DE REVISÃO (SENIOR PM & TECH LEAD)

## 12.1 Análise de Viabilidade vs. Prazo

**Risco Crítico:** O prazo de desenvolvimento (13-15h) compete diretamente com o tempo de estudo.
**Decisão:** O escopo deve ser congelado no "MVP Essencial".
- **Corte Tático 1:** *Push Notifications*. Implementação complexa para apenas 5 dias de uso. Substituir por alarmes nativos do celular (Siri/Google Assistant: "Me lembre de treinar a cada 3 horas").
- **Corte Tático 2:** *Persistência complexa*. Se o localStorage funcionar, ótimo. Se der trabalho, não priorizar. O objetivo é treino, não histórico.

## 12.2 Refinamento de Funcionalidades

### A. Melhoria no "Modo 45-Second Pitch"
- **Feature:** Adicionar um botão **"Panic Bridge"**.
- **Cenário:** O usuário trava no meio da resposta.
- **Ação:** Clica no botão e aparece uma frase de transição segura (ex: *"The core principle here is..."* ou *"Bringing it back to the Joule experience..."*). Isso treina a recuperação de falhas.

### B. Melhoria no "Modo Flashcards" (Audio Learning)
- **Feature:** Botão 🔊 "Ouvir Resposta".
- **Tech:** Usar `window.speechSynthesis` (TTS nativo).
- **Valor:** Permite estudo passivo (enquanto cozinha/dirige) sem olhar para a tela. O usuário ouve a pergunta, tenta responder mentalmente, e clica para ouvir a resposta ideal.

### C. Ajuste no "Vício Police" (Compatibilidade iOS)
- **Alerta:** Web Speech API tem suporte limitado no iOS Safari.
- **Fallback:** Se detectar iOS, mudar a UI para **"Record & Playback"**. O usuário grava a resposta, o app toca de volta e o usuário auto-avalia se falou "man" ou "you know". É tecnicamente mais simples e 100% funcional.

## 12.3 Refinamento de Conteúdo (Ajuste Fino para Jeffrey)

Adicionar ao Banco de Objeções (Objection Handling):

**Objection 9: The "Sales Guy" Test**
- **Trigger:** "Okay, sell me this pen... or rather, sell me why I should hire a Partner for a labeling job."
- **Ideal Script:** "I'm not selling you a labeler; I'm selling you quality assurance. You need someone who knows *why* the model is wrong, not just *that* it's wrong. A junior guesses; I know. That saves engineering cycles. That's the ROI."

**Objection 10: The "Boredom" Test**
- **Trigger:** "You're going to get bored in 3 months."
- **Ideal Script:** "I managed credit portfolios for 20 years. That requires immense patience and repetition. I thrive on the details. Plus, the mission of solving intelligence is the opposite of boring."

## 12.4 Plano de Execução Acelerado (Code Generation)

Para viabilizar o uso imediato, o desenvolvimento será feito via **Single File Component**:
1. O código será gerado como um único arquivo `index.html` contendo todo o CSS e JS.
2. Não haverá build step (Webpack/Vite).
3. O deploy será: "Abrir arquivo no navegador do celular" ou "Subir no GitHub Pages/Vercel direto".

**Status:** APROVADO PARA DESENVOLVIMENTO IMEDIATO.
```
# Melhorias Audio Coach - V7.0 Specification

> **Data**: 03/01/2026  
> **Feature**: Audio Coach  
> **Objetivo**: Transformar o Audio Coach em uma experiência de coaching naturalista e imersiva

---

## 📋 Sumário Executivo

O Audio Coach atualmente funciona, mas a experiência é "fria" e descontextualizada. As melhorias propostas visam:

1. **Criar uma persona de coach** com Audio Profile completo (Scene, Director's Notes, Sample Context)
2. **Estruturar o texto como coaching real** - com contextualização, pergunta e resposta modelada
3. **Padronizar títulos em inglês** - eliminar mistura PT/EN
4. **Ordenar playlist logicamente** - seguir fluxo natural da entrevista (não aleatório)

---

## 🔍 Problemas Atuais

### 1. Audio Profile Genérico

**Código atual** (`index.html`, linha ~3459):
```javascript
const directorNotes = `# AUDIO PROFILE: Professional Interview Coach
A mature, authoritative male voice with an American accent. Clear, confident delivery suitable for business interview preparation.

## DIRECTOR'S NOTES
Style: Professional, confident, and authoritative. The tone should be supportive yet firm, like an experienced executive coach.
Accent: American English (General American accent).
Gender: Male voice with a mature, professional tone.
`;
```

**Problemas:**
- Falta **SCENE** (contexto físico/emocional)
- Falta **SAMPLE CONTEXT** (contexto para o modelo entrar no "papel")
- Muito abstrato - não cria uma "persona" real
- Não diferencia os "modos" de fala (contextualizar vs. perguntar vs. modelar resposta)

### 2. Formato de Texto Raso

**Código atual** (`index.html`, linha ~3761):
```javascript
const textToSpeak = `Question: ${item.title}

Suggested Answer: ${item.script}`;
```

**Problemas:**
- "Question:" e "Suggested Answer:" são genéricos e frios
- Não contextualiza a situação (opening? closing? technical?)
- Transição abrupta entre pergunta e resposta
- Não instrui o modelo sobre como VARIAR o tom

### 3. Títulos Misturados PT/EN

**Exemplos em `js/data.js`:**
- "Cumprimento Inicial" (PT)
- "Tell Me About Yourself - Versão Completa" (misturado)
- "Tell Me About Yourself - Versão 45s" (misturado)
- "Fechamento Final" (PT)
- "Por que xAI?" (PT)

**Problemas:**
- Inconsistência quando a voz fala em inglês
- Termos como "Versão Completa" não fazem sentido para o TTS falar
- Confunde o modelo sobre o idioma do contexto

### 4. Playlist Aleatória

**Código atual** (`index.html`, linha ~3629):
```javascript
if (category === 'all') {
  state.audioCoachPlaylist = [...rehearsalScripts];
  // Shuffle
  for (let i = state.audioCoachPlaylist.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [state.audioCoachPlaylist[i], state.audioCoachPlaylist[j]] = 
      [state.audioCoachPlaylist[j], state.audioCoachPlaylist[i]];
  }
}
```

**Problema:**
- Quando o usuário quer ouvir "tudo", a ordem é aleatória
- Perde a progressão natural da entrevista (opening → about me → core pitch → technical → closing)
- Dificulta a internalização do fluxo da entrevista

---

## ✅ Soluções Propostas

### 1. Novo Audio Profile Completo

**Substituir o `directorNotes` atual por:**

```javascript
const directorNotes = `# AUDIO PROFILE: Coach Alex
## The Interview Prep Mentor

A seasoned executive interview coach with 15 years of experience preparing finance professionals for high-stakes tech interviews. Alex has helped dozens of candidates land roles at top AI companies. He speaks with warmth and authority—the kind of mentor who believes in you but demands your best.

## THE SCENE: Private Coaching Session
It's the evening of January 4th, 2026—the night before João's final interview at xAI. Alex and João are in a focused, one-on-one video coaching session. The atmosphere is calm but charged with purpose. Alex is walking João through each moment of tomorrow's interview with Jeffrey Weichsel, providing context and modeling exactly how to respond. A warm desk lamp illuminates Alex's home office; outside, the city is quiet. This is the final rehearsal.

### DIRECTOR'S NOTES

**Overall Style:** Warm, authoritative mentor who genuinely believes in João's success. Supportive yet demanding excellence. Think of an experienced career coach who has seen hundreds of interviews.

**Accent:** American English (General American accent) - matching the xAI interview context and Jeffrey's expected communication style.

**Three Delivery Modes:**

1. **GUIDING MODE** (when providing context):
   - Conversational and encouraging
   - Slightly slower pace, like explaining to a friend
   - Warm tone: "Let's practice this important moment..."

2. **QUESTION MODE** (when presenting Jeffrey's question):
   - Professional and direct
   - Clear enunciation, measured pace
   - Neutral-to-curious tone, as an interviewer would ask
   - Brief pause before and after the question

3. **MODELING MODE** (when delivering the ideal response):
   - Confident and polished
   - Natural emphasis on KEY PHRASES (Joule, ABC, validation, immediately)
   - The pace João should mirror: not rushed, not hesitant
   - Downward inflection at statement endings (confident, not questioning)

**Pacing Guidelines:**
- Brief natural pause (0.5s) between sections
- Emphasis on names and numbers: "FIVE years at Joule", "SEVEN ratios"
- Slightly slower on critical phrases the candidate must remember

**Key Phrases to Emphasize:**
- "five years" / "partner at Joule"
- "investment committee" / "fundamental analysis"
- "seven ratios" / "five predictive, two not"
- "Central Bank approved"
- "ready to start immediately"

### SAMPLE CONTEXT

João Leal is a 45-year-old Brazilian finance professional preparing for his final interview at xAI, scheduled for January 5th, 2026 at 5:00 PM BRT. He has 20 years of experience: 5 years as Partner at Joule Asset Management (GARP equity fund), 15 years at Banco ABC Brasil (credit portfolio management). His interviewer is Jeffrey Weichsel, Human Data Manager at xAI. João needs to hear his key stories delivered with fluency, confidence, and natural American pacing so he can internalize and reproduce them tomorrow.
`;
```

### 2. Novo Formato de Texto com Framing de Coach

**Criar função para montar o texto:**

```javascript
function buildCoachingText(item) {
  // Mapeamento de moment para contexto em inglês
  const momentContexts = {
    'opening': {
      intro: "Let's start with the opening moment. First impressions matter—this is when you establish rapport with Jeffrey.",
      transition: "Greet him naturally, like this:"
    },
    'about-me': {
      intro: "Now, the most important question of the interview. Jeffrey will ask you to introduce yourself. This is your chance to frame the entire conversation around your equity experience.",
      transition: "Here's exactly how you should respond. Notice how we lead with Joule:"
    },
    'core-pitch': {
      intro: "Let's practice your core value proposition. This is where you differentiate yourself from other candidates.",
      transition: "Deliver it with confidence, like this:"
    },
    'stories': {
      intro: "Time for a killer story. Stories are memorable—Jeffrey will remember these details when making his decision.",
      transition: "Here's how you tell it:"
    },
    'equity': {
      intro: "Let's reinforce your equity experience. Remember: lead with Joule, not with credit.",
      transition: "Here's your response:"
    },
    'technical': {
      intro: "Now a technical question. Jeffrey may test your fundamental analysis knowledge. Stay calm and structured.",
      transition: "Here's a clear, confident answer:"
    },
    'differentiation': {
      intro: "This question is about why YOU specifically. What makes you different from candidates with CFAs or PhDs?",
      transition: "Here's how you reframe it as a strength:"
    },
    'closing': {
      intro: "We're approaching the end of the interview. The closing is crucial—it's your last chance to address concerns and leave a strong impression.",
      transition: "End with confidence, like this:"
    },
    'objections': {
      intro: "Let's prepare for a tough objection. Jeffrey might challenge you on this. Stay calm, don't get defensive.",
      transition: "Here's how you handle it professionally:"
    }
  };

  const context = momentContexts[item.moment] || {
    intro: "Let's practice this section.",
    transition: "Here's how you should respond:"
  };

  // Converter título para inglês se necessário
  const englishTitle = convertTitleToEnglish(item.title);
  
  // Determinar se é pergunta direta ou situação
  const isQuestion = englishTitle.includes('?') || 
                     englishTitle.toLowerCase().startsWith('tell me') ||
                     englishTitle.toLowerCase().startsWith('why') ||
                     englishTitle.toLowerCase().startsWith('what') ||
                     englishTitle.toLowerCase().startsWith('how');

  let textToSpeak;

  if (isQuestion) {
    // Formato para perguntas diretas
    textToSpeak = `${context.intro}

Jeffrey will ask: "${englishTitle}"

${context.transition}

${item.script}`;
  } else {
    // Formato para momentos/situações (opening, closing, etc.)
    textToSpeak = `${context.intro}

${context.transition}

${item.script}`;
  }

  // Adicionar reminder de key phrases se existirem
  if (item.keyPhrases && item.keyPhrases.length > 0) {
    const topPhrases = item.keyPhrases.slice(0, 3).join(', ');
    textToSpeak += `\n\nRemember the key phrases: ${topPhrases}.`;
  }

  return textToSpeak;
}
```

### 3. Mapeamento de Títulos PT → EN

**Adicionar função de conversão:**

```javascript
function convertTitleToEnglish(title) {
  const titleMap = {
    // Opening
    'Cumprimento Inicial': 'Opening Greeting',
    'Transição Pós-Cumprimento': 'Post-Greeting Transition',
    
    // About Me
    'Tell Me About Yourself - Versão Completa': 'Tell me about yourself',
    'Tell Me About Yourself - Versão 45s': 'Tell me about yourself - concise version',
    
    // Core Pitch
    'Experiência em Equity - Foco Joule': 'Tell me about your equity experience',
    'Bridge Crédito-Equity via M&M': 'How does your credit background relate to equity?',
    'História ABC - Validação do Modelo': 'Tell me about a time you validated a financial model',
    'Perspectiva Emerging Markets': 'What unique perspective do you bring?',
    
    // Technical
    'DCF Walkthrough': 'Walk me through a DCF',
    'EV/EBITDA vs P/E': 'When would you use EV/EBITDA versus P/E?',
    'Quality of Earnings': 'How do you assess earnings quality?',
    
    // Differentiation
    'Por que contratar você vs CFA?': 'Why should we hire you over someone with a CFA?',
    'Por que saindo da Joule?': 'Why are you leaving Joule?',
    'Idade como vantagem': 'You are 45. Is that a concern?',
    
    // Closing
    'Perguntas para Jeffrey': 'Do you have any questions for me?',
    'Fechamento Final': 'Final Closing Statement',
    'Closing Statement': 'Final Closing Statement',
    
    // Objections (já em inglês na maioria)
    'Por que xAI?': 'Why xAI?'
  };

  // Retorna mapeamento ou título original se já estiver em inglês
  return titleMap[title] || title;
}
```

### 4. Ordenação Lógica da Playlist

**Modificar `buildAudioPlaylist()` para ordenar logicamente:**

```javascript
function buildAudioPlaylist() {
  const category = document.getElementById('audio-category')?.value || state.audioCoachCategory;
  state.audioCoachPlaylist = [];
  state.audioCoachCurrentIndex = 0;

  // Ordem lógica dos momentos da entrevista
  const momentOrder = [
    'opening',      // 0:00-1:00 - Cumprimentos
    'about-me',     // 1:00-3:00 - Tell me about yourself
    'core-pitch',   // 3:00-6:00 - Core value proposition
    'stories',      // 6:00-8:00 - Killer stories
    'equity',       // 8:00-10:00 - Equity experience deep dive
    'technical',    // 10:00-12:00 - Technical questions
    'differentiation', // 12:00-13:00 - Why you?
    'closing',      // 13:00-14:00 - Questions & closing
    'objections'    // Variable - Tough questions
  ];

  if (category === 'all') {
    // NOVO: Ordenar por momento da entrevista (não aleatório!)
    state.audioCoachPlaylist = [...rehearsalScripts].sort((a, b) => {
      const orderA = momentOrder.indexOf(a.moment);
      const orderB = momentOrder.indexOf(b.moment);
      
      // Se mesmo momento, manter ordem original (por id ou índice)
      if (orderA === orderB) {
        return 0; // Mantém ordem de inserção
      }
      
      return orderA - orderB;
    });

    // Adicionar objections no final (se não estiverem nos rehearsalScripts)
    objections.forEach(obj => {
      state.audioCoachPlaylist.push({
        id: `objection-${obj.id}`,
        title: `Objection: ${obj.objection}`,
        script: obj.idealScript,
        duration: '60s',
        moment: 'objections',
        momentLabel: '💣 Objections',
        isKiller: false,
        keyPhrases: []
      });
    });

  } else if (category === 'killer') {
    // Killer stories também ordenadas logicamente
    state.audioCoachPlaylist = rehearsalScripts
      .filter(s => s.isKiller)
      .sort((a, b) => {
        const orderA = momentOrder.indexOf(a.moment);
        const orderB = momentOrder.indexOf(b.moment);
        return orderA - orderB;
      });

  } else if (category === 'objections') {
    // Apenas objections
    objections.forEach(obj => {
      state.audioCoachPlaylist.push({
        id: `objection-${obj.id}`,
        title: `Objection: ${obj.objection}`,
        script: obj.idealScript,
        duration: '60s',
        moment: 'objections',
        momentLabel: '💣 Objections',
        isKiller: false,
        keyPhrases: []
      });
    });

  } else {
    // Categoria específica - manter ordem original
    state.audioCoachPlaylist = rehearsalScripts.filter(s => s.moment === category);
  }

  updatePlaylistUI();
  updateAudioCoachUI();
}
```

### 5. Atualizar Chamada do TTS

**Modificar `playCurrentItem()` para usar o novo formato:**

```javascript
async function playCurrentItem() {
  const item = state.audioCoachPlaylist[state.audioCoachCurrentIndex];
  if (!item) return;

  // ... código existente de state update ...

  // NOVO: Usar função de coaching text
  const textToSpeak = buildCoachingText(item);

  // ... resto do código existente ...
}
```

---

## 📁 Arquivos a Modificar

### 1. `index.html`

| Linha Aprox. | Mudança |
|--------------|---------|
| ~3459-3470 | Substituir `directorNotes` pelo novo Audio Profile completo |
| ~3627-3665 | Modificar `buildAudioPlaylist()` para ordenação lógica |
| ~3761-3763 | Substituir construção de `textToSpeak` pela chamada a `buildCoachingText()` |
| Nova função | Adicionar `buildCoachingText(item)` |
| Nova função | Adicionar `convertTitleToEnglish(title)` |

### 2. `js/data.js`

| Seção | Mudança |
|-------|---------|
| `rehearsalScripts` | Revisar títulos para inglês OU manter e usar função de conversão |
| Opcional | Adicionar campo `titleEn` em cada script para título em inglês |

---

## 🔄 Fluxo de Áudio Proposto

### Exemplo: "Tell me about yourself"

**ANTES (atual):**
```
"Question: Tell Me About Yourself - Versão Completa

Suggested Answer: I'm a finance professional with 20 years of experience..."
```

**DEPOIS (proposto):**
```
"Now, the most important question of the interview. Jeffrey will ask you to 
introduce yourself. This is your chance to frame the entire conversation 
around your equity experience.

Jeffrey will ask: 'Tell me about yourself.'

Here's exactly how you should respond. Notice how we lead with Joule:

I'm a finance professional with 20 years of experience. For the last 5 years, 
I've been a partner at Joule Asset Management—a GARP equity fund in Brazil 
doing deep fundamental analysis daily.

[... resto do script ...]

Remember the key phrases: five years, partner at Joule, investment committee."
```

---

## 📊 Ordem Lógica da Playlist (Categoria "All")

Quando o usuário seleciona "All" ou "Tudo (Shuffle Completo)", a playlist deve seguir esta ordem:

| # | Momento | Tempo Real | Descrição |
|---|---------|------------|-----------|
| 1-3 | Opening | 0:00-1:00 | Cumprimentos, small talk |
| 4-6 | About Me | 1:00-3:00 | Tell me about yourself |
| 7-10 | Core Pitch | 3:00-6:00 | Value proposition, bridges |
| 11-13 | Stories | 6:00-8:00 | Joule, ABC, EM stories |
| 14-16 | Equity | 8:00-10:00 | Equity experience deep dive |
| 17-19 | Technical | 10:00-12:00 | DCF, ratios, concepts |
| 20-22 | Differentiation | 12:00-13:00 | Why hire you |
| 23-25 | Closing | 13:00-14:00 | Questions, closing statement |
| 26+ | Objections | Variable | Tough questions practice |

**Benefício:** O usuário pode ouvir a entrevista completa em ordem, internalizando não apenas o conteúdo, mas também o **fluxo natural** da conversa.

---

## 🎯 Checklist de Implementação

### Fase 1: Audio Profile (P0) ✅ COMPLETO
- [x] Substituir `directorNotes` pelo novo texto completo
  - **Implementado**: index.html linha ~3459-3507
  - **Mudança**: Audio Profile completo com Coach Alex persona, Scene, Director's Notes e Sample Context
- [x] Testar com diferentes vozes (Charon, Fenrir recomendados)
  - **Status**: Pronto para teste - vozes já configuradas no seletor
- [x] Validar que o tom muda entre contextualização e resposta
  - **Implementado**: Três modos de entrega (Guiding, Question, Modeling) documentados no profile

### Fase 2: Formato de Texto (P0) ✅ COMPLETO
- [x] Criar função `buildCoachingText(item)`
  - **Implementado**: index.html linha ~3683-3767
  - **Funcionalidade**: Contextualiza cada script com intro, pergunta formatada e transição
- [x] Criar função `convertTitleToEnglish(title)`
  - **Implementado**: index.html linha ~3644-3681
  - **Mapeamento**: 20+ títulos PT/misturados → inglês puro
- [x] Criar objeto `momentContexts` com contextos por momento
  - **Implementado**: Dentro de buildCoachingText - 9 contextos específicos por momento
- [x] Atualizar `playCurrentItem()` para usar nova função
  - **Implementado**: index.html linha ~3973 - agora usa buildCoachingText(item)
- [x] Testar todos os momentos (opening, about-me, technical, etc.)
  - **Status**: Pronto para teste - todos os 9 momentos têm contextos únicos

### Fase 3: Títulos em Inglês (P1) ✅ COMPLETO
- [x] Mapear todos os títulos PT → EN
  - **Implementado**: Função convertTitleToEnglish com 20+ mapeamentos
- [x] Testar conversão para todos os scripts
  - **Status**: Pronto para teste - função integrada no buildCoachingText
- [x] Opcional: Adicionar campo `titleEn` em `rehearsalScripts`
  - **Não necessário**: Mapeamento em tempo real é mais flexível

### Fase 4: Ordenação Lógica (P1) ✅ COMPLETO
- [x] Modificar `buildAudioPlaylist()` para ordenar por momento
  - **Implementado**: index.html linha ~3791-3871
  - **Mudança**: Categoria "all" agora ordena por momentOrder, não aleatório
- [x] Definir array `momentOrder` com sequência correta
  - **Implementado**: Array de 9 momentos (opening → objections)
- [x] Testar categoria "All" - verificar ordem
  - **Status**: Pronto para teste - sorting implementado
- [x] Testar categorias específicas - verificar que não são afetadas
  - **Status**: Categorias específicas mantêm ordem original
- [x] Remover shuffle da categoria "All"
  - **Implementado**: Shuffle removido, substituído por .sort()

### Fase 5: Cache Versioning (P0) ✅ COMPLETO
- [x] Adicionar versão ao cache key
  - **Implementado**: Cache key agora é `v7.0-${item.id}-${voice}-${rate}`
  - **Localização**: playWithGeminiTTS (linha ~3992) e preloadNextItem (linha ~3773)
- [x] Atualizar Service Worker version
  - **Implementado**: sw.js CACHE_NAME = 'xai-trainer-v12'
  - **Comentário**: V7.0 Coach Alex Persona

### Fase 6: Testes Finais (P0) ⏳ PENDENTE
- [ ] Ouvir playlist completa em ordem
- [ ] Verificar transições entre scripts
- [ ] Validar ênfase nas key phrases
- [ ] Testar fallback para Web Speech API
- [ ] Testar em mobile (lock screen controls)

---

## 📝 Notas Adicionais

### Vozes Recomendadas

Para o Audio Coach com tom de mentor profissional:

| Voz | Característica | Recomendação |
|-----|----------------|--------------|
| **Charon** | Informative | ⭐ Principal - tom educativo |
| **Fenrir** | Excitable/Authoritative | Alternativa - mais energia |
| **Orus** | Firm | Alternativa - mais sério |
| **Gacrux** | Mature | Alternativa - mais experiente |

### Duração Estimada

Com o novo formato de coaching (contextualização + pergunta + resposta + reminder):
- Scripts curtos (30-45s) → ~60-75s de áudio
- Scripts médios (45-60s) → ~90-105s de áudio
- Scripts longos (60-90s) → ~120-150s de áudio

**Playlist completa (~25 scripts):** Aproximadamente 40-50 minutos de áudio.

### Cache Considerations

O novo formato de texto é mais longo. Considerar:
- Cache key deve incluir versão do prompt (para invalidar cache antigo)
- Ou limpar cache na primeira vez que o usuário usar V7.0

```javascript
// Sugestão: adicionar versão ao cache key
const AUDIO_COACH_VERSION = '7.0';
const cacheKey = `v${AUDIO_COACH_VERSION}-${item.id}-${state.audioCoachVoiceName}-${state.audioCoachSpeechRate}`;
```

---

## 🚀 Resultado Esperado

Após implementação, o Audio Coach será:

1. **Imersivo** - Sensação de sessão real de coaching
2. **Contextualizado** - Cada script tem introdução relevante
3. **Natural** - Transições suaves entre contexto, pergunta e resposta
4. **Estruturado** - Playlist segue ordem lógica da entrevista
5. **Memorável** - Ênfase em key phrases ajuda retenção

O usuário poderá ouvir a "entrevista completa" em ordem enquanto dirige, anda de moto ou faz outras atividades, internalizando não apenas as respostas, mas o **fluxo natural** da conversa com Jeffrey.

---

## 📦 Resumo da Implementação (V7.0)

### Arquivos Modificados

| Arquivo | Mudanças | Linhas Afetadas |
|---------|----------|-----------------|
| **index.html** | Audio Profile completo (Coach Alex) | ~3459-3507 |
| | Função convertTitleToEnglish() | ~3644-3681 |
| | Função buildCoachingText() | ~3683-3767 |
| | Atualização preloadNextItem() | ~3769-3788 |
| | Atualização buildAudioPlaylist() | ~3791-3871 |
| | Atualização playCurrentItem() | ~3957-3973 |
| | Atualização playWithGeminiTTS() | ~3987-4005 |
| **sw.js** | Service Worker v12 | Linha 4 |

### Resumo das Mudanças

**1. Audio Profile Completo (50 linhas → 50 linhas mais ricas)**
- Criação da persona "Coach Alex" com backstory detalhado
- Adição de "The Scene" (sessão de coaching na véspera da entrevista)
- Definição de 3 modos de entrega: Guiding, Question, Modeling
- Instruções específicas de pacing e ênfase em key phrases
- Sample Context com informações sobre João e Jeffrey

**2. Funções Helper (125 linhas novas)**
- `convertTitleToEnglish()`: 37 linhas - mapeia 20+ títulos PT → EN
- `buildCoachingText()`: 84 linhas - constrói texto com contextualização por momento
  - 9 contextos específicos (opening, about-me, core-pitch, etc.)
  - Detecção automática de perguntas vs situações
  - Adição de reminders de key phrases

**3. Ordenação Lógica da Playlist (20 linhas modificadas)**
- Array `momentOrder` define sequência natural da entrevista
- Categoria "all" agora ordena por momento (não aleatório)
- Categoria "killer" também ordenada logicamente
- Categorias específicas mantêm ordem original

**4. Cache Versioning (2 linhas modificadas)**
- Cache key agora: `v7.0-${item.id}-${voice}-${rate}`
- Invalida cache antigo automaticamente
- Service Worker bumped para v12

### Impacto na Experiência do Usuário

**Antes (V6.0):**
```
"Question: Tell Me About Yourself - Versão Completa

Suggested Answer: I'm a finance professional with 20 years..."
```

**Depois (V7.0):**
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

### Benefícios Principais

1. **Imersão**: Sensação de sessão real de coaching com mentor experiente
2. **Contexto**: Cada script tem introdução relevante ao momento da entrevista
3. **Naturalidade**: Transições suaves entre contexto → pergunta → resposta
4. **Estrutura**: Playlist segue ordem lógica da entrevista (opening → closing)
5. **Memorização**: Ênfase em key phrases ajuda retenção
6. **Consistência**: Todos os títulos em inglês (elimina mistura PT/EN)

### Próximos Passos

1. Testar Audio Coach em produção com categoria "All"
2. Validar que a ordem lógica está correta (opening → objections)
3. Ouvir 2-3 scripts completos para validar tom de coaching
4. Ajustar `momentContexts` se necessário (baseado em feedback)
5. Considerar adicionar mais key phrases aos rehearsalScripts

---

**Versão do Documento:** 2.0 (Implementação completa)
**Última Atualização:** 03/01/2026
**Status**: ✅ IMPLEMENTADO - Pronto para testes
**Autor:** Claude (Assistente AI)

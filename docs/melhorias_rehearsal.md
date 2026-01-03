# Melhorias Rehearsal Mode - Análise de Áudio Completa

**Data:** 03/01/2026  
**Versão proposta:** V8.0  
**Objetivo:** Habilitar feedback de pronúncia, velocidade e confiança vocal

---

## Problema Atual

O Rehearsal Mode atualmente funciona em **2 etapas separadas**:

1. **Transcrição**: Envia áudio → recebe texto transcrito
2. **Análise**: Envia texto transcrito → compara com script ideal

```javascript
// Fluxo atual (linhas ~4870-4875 em index.html)
const transcript = await transcribeWithGemini(base64Audio);  // Etapa 1
const feedback = await analyzeWithGemini(transcript, script); // Etapa 2 - SÓ TEXTO!
```

### Limitação
Na etapa 2, o modelo recebe apenas **texto vs texto**, perdendo toda informação de áudio:

| Aspecto | Pode avaliar? |
|---------|---------------|
| Conteúdo (o que disse) | ✅ Sim |
| Pronúncia | ❌ Não |
| Velocidade da fala | ❌ Não |
| Confiança/hesitação | ❌ Não |
| Filler words ("um", "uh") | ⚠️ Parcial (só se transcritos) |
| Pausas e ritmo | ❌ Não |

---

## Solução Proposta

Enviar o **áudio diretamente** na chamada de análise, não apenas a transcrição.

O Gemini 2.5 Flash suporta análise multimodal de áudio conforme documentação oficial:
> "Gemini can 'understand' non-speech components, such as birdsong or sirens."
> "Gemini represents each second of audio as 32 tokens"

### Novo fluxo:

```javascript
const transcript = await transcribeWithGemini(base64Audio);           // Etapa 1 (mantém)
const feedback = await analyzeWithGemini(base64Audio, transcript, script); // Etapa 2 - COM ÁUDIO!
```

---

## Mudanças Necessárias

### 1. Função `analyzeWithGemini` - Nova Assinatura

**Arquivo:** `index.html`  
**Linha aproximada:** ~4929

**DE:**
```javascript
async function analyzeWithGemini(transcript, script) {
```

**PARA:**
```javascript
async function analyzeWithGemini(base64Audio, transcript, script) {
```

---

### 2. Request Body - Incluir Áudio

**Arquivo:** `index.html`  
**Linha aproximada:** ~4956-4965

**DE:**
```javascript
const response = await fetch(GEMINI_REST_PROXY, {
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
```

**PARA:**
```javascript
const response = await fetch(GEMINI_REST_PROXY, {
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
        { text: prompt }
      ]
    }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1500
    }
  })
});
```

**Nota:** `maxOutputTokens` aumentado para 1500 devido ao JSON de resposta mais detalhado.

---

### 3. Prompt Expandido com Análise de Áudio

**Arquivo:** `index.html`  
**Linha aproximada:** ~4931-4954

**DE:**
```javascript
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
```

**PARA:**
```javascript
const prompt = `You are an expert interview coach. The speaker is a 45-year-old Brazilian finance professional interviewing for a position at xAI. Listen carefully to the audio recording.

IDEAL SCRIPT (what they should say):
"${script.script}"

KEY PHRASES they must include:
${script.keyPhrases.map(p => `- "${p}"`).join('\n')}

TRANSCRIPTION (for reference only):
"${transcript}"

ANALYZE THE AUDIO for these aspects:

1. **CONTENT**: Did they cover the key points? Which key phrases are missing?

2. **PRONUNCIATION**: 
   - Any words that were unclear or mispronounced?
   - Consider Brazilian-English accent patterns (th sounds, word-final consonants, vowel sounds)
   - Note specific words that need practice

3. **PACE/SPEED**: 
   - Too fast (rushing, nervous)?
   - Too slow (hesitant, unsure)?
   - Good interview pace?

4. **CONFIDENCE**: 
   - Does the voice sound confident and assertive?
   - Any signs of nervousness (shaky voice, trailing off)?
   - Strong or weak ending?

5. **FILLER WORDS**: Count any "um", "uh", "like", "you know", "basically", "right?"

6. **PAUSES**: Natural thinking pauses vs awkward silences?

Return your analysis as JSON:
{
  "overallScore": 0-100,
  "contentScore": 0-100,
  "deliveryScore": 0-100,
  "strengths": ["what they did well - be specific"],
  "improvements": ["actionable suggestions - be specific"],
  "missingKeyPhrases": ["phrases they should have included"],
  "usedKeyPhrases": ["phrases they successfully included"],
  "pronunciationNotes": "specific words to practice with phonetic tips if needed",
  "paceAssessment": "fast|slow|good",
  "paceNote": "specific feedback on speaking speed",
  "confidenceAssessment": "high|medium|low", 
  "confidenceNote": "specific feedback on vocal confidence",
  "fillerWordCount": 0,
  "fillerWordsUsed": ["list of filler words detected"],
  "summary": "2-3 sentence encouraging but honest overall feedback"
}

Be encouraging but direct. This is final interview prep - honest feedback helps more than false praise.`;
```

---

### 4. Chamada da Função - Passar Áudio

**Arquivo:** `index.html`  
**Linha aproximada:** ~4874

**DE:**
```javascript
// Analyze with Gemini
const feedback = await analyzeWithGemini(transcript, script);
```

**PARA:**
```javascript
// Analyze with Gemini (includes audio for pronunciation/pace/confidence analysis)
const feedback = await analyzeWithGemini(base64Audio, transcript, script);
```

---

### 5. Display do Feedback - Novos Campos

**Arquivo:** `index.html`  
**Linha aproximada:** ~4988-5040 (função `displayAIFeedback`)

Expandir o HTML para mostrar os novos campos de análise:

**ADICIONAR após o bloco de "improvements":**

```javascript
${feedback.pronunciationNotes ? `
  <div style="margin-top: 1rem;">
    <strong style="color: #f59e0b;">🗣️ Pronúncia:</strong>
    <p style="margin-top: 0.5rem;">${feedback.pronunciationNotes}</p>
  </div>
` : ''}

${feedback.paceNote ? `
  <div style="margin-top: 1rem;">
    <strong style="color: #3b82f6;">⏱️ Velocidade (${feedback.paceAssessment || 'N/A'}):</strong>
    <p style="margin-top: 0.5rem;">${feedback.paceNote}</p>
  </div>
` : ''}

${feedback.confidenceNote ? `
  <div style="margin-top: 1rem;">
    <strong style="color: #8b5cf6;">💪 Confiança (${feedback.confidenceAssessment || 'N/A'}):</strong>
    <p style="margin-top: 0.5rem;">${feedback.confidenceNote}</p>
  </div>
` : ''}

${feedback.fillerWordCount > 0 ? `
  <div style="margin-top: 1rem;">
    <strong style="color: #ef4444;">🚫 Filler Words: ${feedback.fillerWordCount}x</strong>
    <p style="margin-top: 0.5rem; color: var(--text-secondary);">
      Detectados: ${feedback.fillerWordsUsed?.join(', ') || 'N/A'}
    </p>
  </div>
` : ''}
```

**MODIFICAR o header de score** para mostrar os dois scores:

```javascript
<div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;">
  <div style="text-align: center;">
    <div style="font-size: 2rem; font-weight: bold; color: ${scoreColor};">
      ${feedback.overallScore}/100
    </div>
    <div style="font-size: 0.75rem; color: var(--text-muted);">GERAL</div>
  </div>
  ${feedback.contentScore ? `
    <div style="text-align: center;">
      <div style="font-size: 1.5rem; font-weight: bold; color: var(--text-secondary);">
        ${feedback.contentScore}/100
      </div>
      <div style="font-size: 0.75rem; color: var(--text-muted);">CONTEÚDO</div>
    </div>
  ` : ''}
  ${feedback.deliveryScore ? `
    <div style="text-align: center;">
      <div style="font-size: 1.5rem; font-weight: bold; color: var(--text-secondary);">
        ${feedback.deliveryScore}/100
      </div>
      <div style="font-size: 0.75rem; color: var(--text-muted);">DELIVERY</div>
    </div>
  ` : ''}
</div>
```

---

## Resumo das Mudanças

| # | Arquivo | Linha | Mudança |
|---|---------|-------|---------|
| 1 | index.html | ~4929 | Assinatura: adicionar `base64Audio` como 1º parâmetro |
| 2 | index.html | ~4956-4965 | Request body: adicionar `inlineData` com áudio |
| 3 | index.html | ~4931-4954 | Prompt: expandir com instruções de análise de áudio |
| 4 | index.html | ~4874 | Chamada: passar `base64Audio` para `analyzeWithGemini` |
| 5 | index.html | ~4988-5040 | Display: adicionar novos campos de feedback |

---

## Resultado Esperado

### Antes (V7.1):
```
Score: 75/100
✅ Pontos Fortes: Mentioned Joule, good structure
📝 Para Melhorar: Include more technical details
```

### Depois (V8.0):
```
Score: 75/100 | Conteúdo: 85/100 | Delivery: 65/100

✅ Pontos Fortes: Mentioned Joule, good structure
📝 Para Melhorar: Include more technical details

🗣️ Pronúncia: Practice "thoroughly" (say "THUR-oh-lee"), "analysis" stress on 2nd syllable

⏱️ Velocidade (fast): You're rushing through the Joule section. Slow down when mentioning "5 years as Partner" - this is your strongest point.

💪 Confiança (medium): Strong start but voice trails off at the end. Finish with conviction.

🚫 Filler Words: 3x
Detectados: um, you know, basically
```

---

## Considerações Técnicas

### Tamanho do Request
- Áudio de 60s ≈ 1920 tokens (32 tokens/segundo)
- Limite inline: 20MB total
- Para gravações típicas de 30-90s, não há problema

### Latência
- Adiciona ~1-2s ao tempo de processamento
- Compensado pelo valor do feedback adicional

### Fallback
Manter compatibilidade: se `deliveryScore` não vier na resposta, não quebrar a UI.

---

## Cache / Service Worker

Após implementar, incrementar versão do cache:

**Arquivo:** `sw.js`

```javascript
const CACHE_NAME = 'xai-trainer-v14'; // V8.0 - Audio Analysis in Rehearsal Mode
```

---

## Checklist de Implementação

- [x] Alterar assinatura de `analyzeWithGemini` - **CONCLUÍDO (03/01/2026)**
- [x] Adicionar `inlineData` no request body - **CONCLUÍDO (03/01/2026)**
- [x] Expandir prompt com instruções de análise de áudio - **CONCLUÍDO (03/01/2026)**
- [x] Passar `base64Audio` na chamada - **CONCLUÍDO (03/01/2026)**
- [x] Expandir `displayAIFeedback` com novos campos - **CONCLUÍDO (03/01/2026)**
- [x] Incrementar `CACHE_NAME` no Service Worker - **CONCLUÍDO (v14 - 03/01/2026)**
- [ ] Testar com gravação real - **PENDENTE (aguardando teste do usuário)**
- [ ] Deploy no Vercel - **PENDENTE (após aprovação dos testes)**

---

## Status da Implementação

### ✅ Implementações Concluídas (03/01/2026)

**Versão:** V8.0 - Audio Analysis in Rehearsal Mode

**Alterações realizadas:**

1. **index.html (linha ~4931):**
   - Assinatura alterada: `async function analyzeWithGemini(base64Audio, transcript, script)`
   - Adicionado parâmetro `base64Audio` como primeiro argumento

2. **index.html (linha ~4987-5007):**
   - Request body atualizado para incluir áudio via `inlineData`
   - MIME type: `audio/webm`
   - `maxOutputTokens` aumentado de 1024 para 1500

3. **index.html (linha ~4932-4985):**
   - Prompt expandido com análise de 6 aspectos:
     - CONTENT (conteúdo vs script ideal)
     - PRONUNCIATION (pronúncia com atenção a sotaque brasileiro)
     - PACE/SPEED (velocidade da fala)
     - CONFIDENCE (confiança vocal)
     - FILLER WORDS (contagem de vícios de linguagem)
     - PAUSES (pausas naturais vs desconfortáveis)
   - JSON de resposta expandido com novos campos

4. **index.html (linha ~4875):**
   - Chamada atualizada: `await analyzeWithGemini(base64Audio, transcript, script)`
   - Comentário explicativo adicionado

5. **index.html (linha ~5035-5106):**
   - Display de feedback expandido com:
     - 3 scores (geral, conteúdo, delivery) em vez de 1
     - Seção de Pronúncia com dicas específicas
     - Seção de Velocidade com assessment (fast/slow/good)
     - Seção de Confiança com assessment (high/medium/low)
     - Seção de Filler Words com contagem e lista de palavras detectadas
   - Layout flex-wrap para responsividade mobile

6. **sw.js (linha 4):**
   - `CACHE_NAME` incrementado: `'xai-trainer-v14'`
   - Comentário: "V8.0: Audio Analysis in Rehearsal Mode - Full audio feedback (pronunciation, pace, confidence)"

---

## Testes Necessários

Antes do deploy, verificar:

1. **Gravação funciona:**
   - Botão de gravação captura áudio corretamente
   - Timer funciona durante gravação
   - Áudio é convertido para base64

2. **Análise com áudio:**
   - Request não falha por payload grande (verificar limite de 20MB)
   - Gemini API retorna JSON com novos campos
   - Tempo de resposta aceitável (~10-15s para gravações de 30-60s)

3. **Display de feedback:**
   - 3 scores exibidos corretamente
   - Novos campos aparecem quando presentes
   - Layout responsivo no mobile
   - Cores e emojis renderizam corretamente

4. **Fallback e compatibilidade:**
   - Se API não retornar novos campos, UI não quebra
   - Campos opcionais (`pronunciationNotes`, etc.) não causam erros se ausentes

---

## Próximos Passos

1. **Teste local:** Usuário deve testar gravação + análise
2. **Ajustes (se necessário):** Correções baseadas no feedback de teste
3. **Commit & Push:** Após aprovação
4. **Deploy Vercel:** Push para `main` dispara auto-deploy
5. **Atualizar documentação:** README.md, CLAUDE.md, IMPLEMENTATION_LOG.md

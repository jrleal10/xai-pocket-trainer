# xAI Pocket Trainer

> Progressive Web App para preparação da entrevista na xAI
> **Data da Entrevista**: 05 de janeiro de 2026 às 17:00 BRT
> **Entrevistador**: Jeffrey Weichsel (Human Data Manager)

## 🚀 Acesso Rápido

**URL de Produção**: https://interviewxaiwebapp.vercel.app/

👉 **Clique no link acima** para acessar o app agora mesmo!

💡 **Dica**: Salve este link nos favoritos do seu celular para acesso rápido

---

## 🎯 O que é este app?

O **xAI Pocket Trainer** é seu **treinador de fluência pessoal** para a entrevista final na xAI.

### 🎭 De "Testing Tool" para "Fluency Trainer"

Este app não é apenas para **testar** se você sabe as respostas. É para **treinar fluência**: você lê, repete, memoriza e internaliza até falar com naturalidade. O foco é **read → repeat → memorize → speak naturally**.

**O que o app oferece:**

- ✅ **Audio Coach** - Ouça scripts e respostas ideais enquanto dirige, cozinha ou descansa (V5.0 - NOVO!)
- ✅ **Rehearsal Mode** - Leia scripts ideais, grave sua voz, receba feedback AI em tempo real (V4.0)
- ✅ **Memorizar** conceitos-chave, histórias e frases usando flashcards interativos
- ✅ **Treinar concisão** com timer visual de 45 segundos (3 tempos: 45s/60s/90s)
- ✅ **Praticar objeções** difíceis com quiz de 18 objeções + feedback instantâneo
- ✅ **Micro-learning** com Random Pill (frases, tips, quiz, ratios aleatórios)
- ✅ **Checklist final** para o dia da entrevista (Pre-Flight Checklist)
- ✅ **Eliminar vícios** de linguagem com Vício Police + Response Coach

---

## 📱 Como Usar

### 1. Abrir o App

**Opção A: Acessar via navegador** (Desktop ou Mobile)
- **URL**: https://interviewxaiwebapp.vercel.app/
- Abra em Chrome, Edge ou Safari
- Funciona em qualquer dispositivo

**Opção B: Instalar como PWA** (Recomendado - Mobile)
1. Acesse a URL acima no Chrome/Edge do celular
2. Toque no menu (3 pontos verticais)
3. Selecione **"Adicionar à tela inicial"** ou **"Instalar app"**
4. O app aparecerá como ícone no seu celular
5. Funciona **offline** após instalação!

**Opção C: Desenvolvimento local** (apenas para desenvolvedores)
- Abra `C:\Projetos\interview_xai_web_app\index.html` diretamente no navegador
- Ou clone o repositório: https://github.com/jrleal10/xai-pocket-trainer

---

## 🧭 Navegação

### Dashboard (Tela Inicial)

- **Countdown Timer**: Mostra quanto tempo falta até a entrevista
  - Atualiza a cada minuto
  - No dia 29, muda para "HOJE! Faltam X horas"

- **Frase do Momento**: Uma frase-chave aleatória
  - Toque para ver a próxima frase
  - Rotaciona automaticamente a cada 30 segundos

- **Botões de Modo**: Acesso rápido a todas as features

---

## 🎭 Modo Rehearsal (V4.0 Fluency Trainer Edition)

**O modo mais importante do app!** Aqui você não tenta adivinhar a resposta - você **lê, repete e memoriza** scripts ideais com feedback AI em tempo real.

### Filosofia: Read → Repeat → Memorize → Speak Naturally

Diferente de outras ferramentas que testam se você sabe a resposta, o Rehearsal Mode é um **treinador de fluência**:

1. **Leia** o script ideal (escrito por você, revisado e aprovado)
2. **Ouça** o script com Text-to-Speech para internalizar ritmo e pronúncia
3. **Grave** sua própria versão falando naturalmente
4. **Receba feedback** instantâneo de AI (Gemini 2.5 Flash) comparando com o script ideal
5. **Repita** até falar com fluência, confiança e naturalidade

### Como Usar

1. Toque em "Rehearsal Mode" no dashboard
2. Escolha um **momento da entrevista** (6 categorias):
   - **🎬 Opening** (0:00-1:00): Cumprimentos e small talk inicial
   - **🎯 Core Pitch** (1:00-5:00): About me, equity experience, bridge credit↔equity
   - **💪 Differentiation** (5:00-10:00): Por que contratar você? Strengths únicas
   - **🎓 Technical Deep Dive** (10:00-12:00): DCF, ratios, EV/EBITDA vs P/E
   - **🤝 Closing** (12:00-14:00): Questions for Jeffrey, closing statement
   - **💣 Objection Handling** (variável): Respostas para objeções difíceis

3. Escolha um **script** dentro do momento selecionado
   - Scripts marcados com ⭐ são **Killer Stories** (prioridade máxima)
   - Cada script mostra duração esperada (45s, 60s, 90s)

4. **Leia** o script completo na tela

5. **Ouça** o script (opcional):
   - Toque em "🔊 Ouvir Script"
   - Text-to-Speech lê o script em voz alta
   - Use para internalizar pronúncia e ritmo

6. **Grave** sua versão:
   - Toque em "🎤 Gravar" (conceda permissão de microfone)
   - Fale o script naturalmente (não precisa decorar palavra por palavra!)
   - Toque em "⏹️ Parar" quando terminar

7. **Receba feedback AI**:
   - **Transcrição**: O que você realmente falou (Gemini Live transcrição)
   - **Score de Similaridade**: Quão próximo você chegou do script ideal (0-100%)
   - **Key Phrases Cobertos**: Quais frases-chave você incluiu ✅ e quais faltaram ❌
   - **Análise de Conteúdo**: Feedback estruturado sobre o que funcionou e o que melhorar
   - **Sugestões**: Dicas específicas para próxima tentativa

8. **Ouça sua gravação**:
   - Toque em "▶️ Ouvir Minha Gravação" para revisar sua performance
   - Toque em "💾 Baixar Áudio" para salvar o arquivo (.webm) no dispositivo
   - Arquivos salvos com nome: `rehearsal_[script-id]_[timestamp].webm`

9. **Repita** até atingir fluência natural

### 18 Scripts Disponíveis

**🎬 Opening (3 scripts)**
- Small Talk Opener (30-45s) ⭐
- Post-Small-Talk Bridge (15-20s)
- "Tell Me About Yourself" - Full (60-65s) ⭐

**🎯 Core Pitch (6 scripts)**
- Equity Experience - Joule Focus (45-50s) ⭐
- Credit-to-Equity Bridge via M&M (40-45s) ⭐
- ABC Rating Model - Full Story (60-70s) ⭐
- Emerging Markets Perspective (50-55s) ⭐
- Fundamental Analysis Philosophy (35-40s)
- Why xAI - AI Tutor Vision (50-55s) ⭐

**💪 Differentiation (3 scripts)**
- Why Hire Me Over CFA (45-50s)
- Partner Leaving Joule Explanation (40-45s)
- Age + Experience as Strength (35-40s)

**🎓 Technical Deep Dive (3 scripts)**
- DCF Walkthrough (60-70s)
- EV/EBITDA vs P/E Explanation (50-55s)
- Quality of Earnings Example (45-50s)

**🤝 Closing (2 scripts)**
- Questions for Jeffrey (30-40s)
- Closing Statement - Ready to Start (20-25s)

**💣 Objection Handling (1 script)**
- Safety Check - Compliance Concerns (40-45s)

### Tips de Uso

- **Priorize Killer Stories** (marcados com ⭐): Joule, ABC, EM, Credit Bridge
- **Grave múltiplas vezes**: Compare suas tentativas e ouça a evolução
- **Baixe gravações importantes**: Revise antes da entrevista real
- **Foque em naturalidade**: Não precisa repetir palavra por palavra - internalize a mensagem
- **Use feedback AI**: Preste atenção nas key phrases faltantes
- **Pratique transições**: Scripts de "bridge" conectam momentos da entrevista
- **Meta**: Falar cada Killer Story com fluência SEM olhar o script

### Requisitos Técnicos

✅ **Conexão internet** (Gemini 2.5 Flash API para transcription + analysis)
✅ **Permissão de microfone** (gravar sua voz)
✅ **HTTPS** (funciona em produção Vercel)
✅ **Navegadores compatíveis**: Chrome, Edge, Safari, Firefox

---

## 🎧 Modo Audio Coach (V6.0 - Gemini TTS Edition)

**Pratique passivamente com voz de IA natural e profissional!** O Audio Coach lê scripts e respostas ideais em voz alta usando Gemini TTS API, oferecendo qualidade de áudio muito superior ao TTS nativo do navegador.

### Filosofia: Listen → Internalize → Speak

Diferente do Rehearsal Mode (ativo), o Audio Coach é para **prática passiva**:

1. **Selecione categoria** de conteúdo (Killer Stories, Opening, Technical, etc.)
2. **Pressione Play** e ouça scripts sendo lidos em voz alta
3. **Internalize** pronúncia, ritmo e estrutura das respostas
4. **Repita mentalmente** enquanto escuta
5. **Pratique em qualquer situação** - sem precisar olhar tela ou falar

### Como Usar

1. Toque em "🎧 Audio Coach" no dashboard
2. **Escolha categoria** no dropdown:
   - 🎲 **Tudo (Shuffle Completo)** - Mix aleatório de todos os scripts
   - ⭐ **Killer Stories** - Apenas scripts marcados como essenciais
   - 🎬 **Opening** - Abertura e cumprimentos
   - 👤 **About Me** - Apresentação pessoal
   - 📖 **Killer Stories** - Joule, ABC, EM
   - 💼 **Equity Experience** - Experiência em equity
   - 🎓 **Technical Deep Dive** - DCF, ratios, conceitos técnicos
   - 💪 **Differentiation** - Por que contratar você
   - 🤝 **Closing** - Fechamento e perguntas
   - 💣 **Objections** - Respostas para objeções difíceis

3. **Controles de Playback**:
   - ▶️ **Play** - Inicia reprodução
   - ⏸️ **Pause** - Pausa temporária
   - ⏹️ **Stop** - Para completamente e volta ao início (V6.0 NOVO!)
   - ⏮️ **Anterior** - Volta para script anterior
   - ⏭️ **Próximo** - Pula para próximo script

4. **Configurações** (V6.0 - Interface em inglês):
   - 🎙️ **Gemini TTS** - Voz natural de IA (padrão: ON) vs Web Speech API
   - 🎤 **Voice Selector** - 17 vozes em 3 categorias:
     - **🎙️ Professional (Male/Neutral)**: Charon, Fenrir, Orus, Iapetus, Algenib, Gacrux, Sadaltager
     - **✨ Friendly (Male/Neutral)**: Puck, Achird, Zubenelgenubi
     - **🎵 Smooth (Female/Neutral)**: Kore, Zephyr, Algieba, Despina, Schedar, Sulafat
   - 🔁 **Loop** - Repeat playlist infinitely (padrão: ON)
   - ⏸️ **Auto-pause** - 3 seconds to think between scripts (padrão: ON)
   - 🎚️ **Speed** - 0.75x, 1.0x, 1.25x, 1.5x (padrão: 1.0x)

5. **Playlist interativa**:
   - Visualize todos os scripts da categoria
   - Clique em qualquer item para pular diretamente
   - Items marcados com ⭐ são Killer Stories

### Recursos Avançados (V6.0)

✅ **Gemini TTS Integration** - Voz profissional de IA!
- **Qualidade superior**: Voz natural, expressiva, sem robotização
- **American English nativo**: Sotaque americano garantido
- **Controle via prompt**: "Professional male voice, American accent"
- **17 vozes disponíveis**: Escolha entre tons profissionais, amigáveis ou suaves
- **Cache inteligente**: 2ª reprodução instantânea (sem API call)
- **Preload automático**: Próximo script pré-carregado em background
- **Fallback robusto**: Se Gemini falhar → usa Web Speech API automaticamente

✅ **Audio Format Clarity** (V6.0)
- **Question/Answer structure**: "Question: [pergunta]. Suggested Answer: [resposta]"
- **Clear separation**: Você ouve claramente quando é pergunta vs resposta
- **Professional delivery**: Tom de coach experiente, não robô

✅ **Media Session API** - Controles na tela bloqueada do celular!
- Bloqueie a tela e continue usando os controles nativos
- Play/Pause/Stop/Skip direto da lock screen
- Funciona com fone de ouvido Bluetooth
- Mostra "Gemini TTS" ou "Browser TTS" no player

✅ **Hybrid Mode** - Online + Offline!
- **Gemini TTS**: Requer internet (voz superior)
- **Web Speech API**: Offline fallback (voz básica)
- **Toggle manual**: Desabilite Gemini TTS para usar offline
- **Detecção automática**: Se API falhar, usa fallback sem crash

✅ **Progress tracking**
- Barra de progresso visual (X/Y scripts)
- Item atual destacado na playlist
- Indicador "Now Playing" com título e categoria
- Loading indicator durante geração de áudio (Gemini TTS)

### Quando Usar

- **No carro** - Ouça enquanto dirige para a entrevista
- **Cozinhando** - Pratique sem usar as mãos
- **Caminhando** - Internalize scripts durante exercício
- **Antes de dormir** - Revisão final relaxada
- **Multitasking** - Pratique enquanto faz outras atividades

### Dicas de Uso

- Comece com **Killer Stories** para priorizar conteúdo essencial
- Use **velocidade 1.25x** para revisão rápida
- Deixe **pausa de 3s** ligada para ter tempo de pensar
- **Loop infinito** é perfeito para prática intensiva
- Combine com Rehearsal Mode: primeiro ouça (Audio Coach), depois grave (Rehearsal)

### Diferença: Audio Coach vs Rehearsal Mode

| Feature | Audio Coach 🎧 (V6.0) | Rehearsal Mode 🎭 |
|---------|---------------|------------------|
| **Tipo** | Prática passiva | Prática ativa |
| **Interação** | Apenas ouvir | Ler, gravar, receber feedback |
| **Uso ideal** | Multitasking (dirigir, cozinhar) | Foco total (estudar) |
| **Feedback** | Nenhum | AI analysis (Gemini) |
| **Internet** | ✅ Requer (Gemini TTS) / ❌ Offline (fallback) | ✅ Requer (para feedback AI) |
| **Lock screen** | ✅ Funciona | ❌ Não aplicável |
| **TTS/Voice** | Gemini 2.5 Flash TTS (natural) + Web Speech API (fallback) | Web Speech API (nativo) |
| **Qualidade de voz** | ⭐⭐⭐⭐⭐ Natural, profissional | ⭐⭐⭐ Robótica, básica |
| **American accent** | ✅ Garantido (via prompt) | ⚠️ Depende do SO |

### Requisitos Técnicos (V6.0)

✅ **Navegador moderno** com Web Speech API (Chrome, Edge, Safari, Firefox)
✅ **Conexão internet** (para Gemini TTS) OU offline mode (fallback Web Speech API)
✅ **PWA-ready** - Instale no celular para melhor experiência
✅ **Media Session API** - Lock screen controls (Chrome/Edge mobile)
✅ **Gemini API Key** - Configurada em `index.html` (GEMINI_API_KEY)

---

## 💊 Modo Flashcards

### Como Usar

1. Toque em "Flashcards" no dashboard
2. Veja a **frente** do card (pergunta/termo)
3. Toque no card para **virar** e ver a resposta
4. Escolha:
   - **← Preciso Revisar**: Cards marcados aparecem com mais frequência
   - **Sei Bem →**: Marca como dominado

### Categorias

- **Técnico** (20 cards): Ratios, fórmulas, conceitos de finanças
- **Histórias** (7 cards): Joule, ABC, Emerging Markets
- **Pessoas** (4 cards): Jeffrey, Adriana, Michael, Team xAI
- **Frases-Chave** (8 cards): Scripts essenciais para memorizar
- **Do's & Don'ts** (6 cards): O que falar e não falar

### Dicas

- Use **Shuffle** para embaralhar e testar memória
- Filtre por **categoria** para focar em tópicos específicos
- Cards marcados como "Revisar" aparecem **2x mais**
- Funciona **offline** - perfeito para o Natal!

### Gestos de Swipe (Mobile)

- **Deslize ← esquerda**: Preciso revisar
- **Deslize → direita**: Sei bem

---

## ⏱️ Modo 45-Second Pitch

Pratica respostas com timer visual e feedback tátil:

### Como Usar

1. Toque em "45-Second Pitch" no dashboard
2. Escolha o tempo: **45s**, **60s** ou **90s**
3. Leia o prompt exibido
4. Toque em **START** e comece a falar
5. Observe as transições de cor:
   - 🟢 **Verde** (0-60%): Zona segura, você tem tempo
   - 🟡 **Amarelo** (60-85%): Atenção, comece a concluir (vibra 1x)
   - 🔴 **Vermelho** (85-100%): WRAP UP! Finalize agora (vibra 3x)
6. Quando o timer acabar, veja a tela de review com:
   - ✅ **Checklist**: Você cobriu todos os pontos?
   - 📝 **Script Ideal**: Compare com a resposta perfeita
7. Escolha: **Tentar Novamente** ou **Próximo Prompt**

### 8 Prompts Disponíveis

1. Tell me about yourself
2. Why xAI?
3. Tell me about your fundamental analysis experience
4. What's your most relevant experience?
5. Tell me about the ABC rating model project
6. Credit vs equity analysis
7. Why are you leaving Joule?
8. Any questions for me?

### Dicas

- Use 45s para forçar concisão máxima
- Use 60s para prática equilibrada (recomendado)
- Use 90s quando precisar de mais detalhes
- A vibração funciona apenas em mobile (Android/iOS)

---

## 💣 Modo Objection Handling

Simula objeções difíceis que você pode enfrentar na entrevista:

### Como Usar

1. Toque em "Objections" no dashboard
2. Leia a objeção exibida
3. Você tem **5 segundos** para escolher uma resposta (A, B ou C)
4. O countdown aparece no canto superior direito
5. Toque na opção que você escolheria
6. Veja o feedback instantâneo:
   - ✅ **Correto** (verde): Resposta ideal!
   - ⚠️ **Parcial** (amarelo): Resposta OK, mas pode melhorar
   - ❌ **Errado** (vermelho): Evite esta abordagem
   - ⏱️ **Tempo Esgotado**: Pratique responder mais rápido
7. Leia a **explicação** (por que a resposta correta funciona)
8. Leia o **script ideal** completo
9. Toque em **Próxima Objeção** para continuar
10. Ao final das 10 objeções, veja seu score: X/10 corretas

### 10 Objeções Disponíveis

1. "Why should we hire you instead of someone with a CFA?"
2. "You're 45. Won't you get bored doing data labeling?"
3. "Why are you really leaving Joule? There must be a problem."
4. "We have people with PhDs. You'll be the least educated person on the team."
5. "Your English isn't perfect. That might be a problem for writing training data."
6. "This role is in Palo Alto. You're in Brazil. How will that work?"
7. "You've been at Joule for 5 years. Before that, 15 years at ABC. You don't job-hop. Why start now?"
8. "We need someone who can start immediately. Can you really do that?"
9. "Sell me on why I should hire a Partner from a Brazilian fund to do AI work." (Sales Guy Test)
10. "This role involves a lot of repetitive work. You'll get bored in 3 months." (Boredom Test)

### Dicas

- Primeira tentativa: responda por instinto (teste sua intuição)
- Segunda tentativa: memorize os scripts ideais
- Meta: 8/10 ou mais corretas
- Se errar, leia a explicação COM ATENÇÃO (explica o "porquê")

---

## 🎲 Modo Random Pill

Micro-learning em 30-60 segundos - perfeito para momentos roubados durante o Natal!

### Como Usar

1. Toque em "RANDOM PILL" no dashboard
2. O app sorteia automaticamente um conteúdo aleatório de 4 tipos:
   - 💬 **Frase-Chave**: Uma das 7 frases essenciais para memorizar
   - 💡 **Dica**: Tips comportamentais (não dizer "man", concisão, etc.)
   - ❓ **Quiz**: Perguntas verdadeiro/falso sobre conceitos técnicos
   - 📊 **Ratio do Dia**: Um ratio técnico aleatório dos flashcards
3. Para quizzes: responda Verdadeiro ou Falso e veja feedback instantâneo
4. Toque em "🔄 Nova Pill" para gerar outro conteúdo aleatório

### Quando Usar

- Durante o Natal (24-25/12): Intervalos de 1 minuto entre atividades familiares
- Filas, esperas, pausas curtas
- Antes de dormir: revisar 3-4 pills rapidamente
- Manhã do dia 29: refresh rápido da memória

### Dicas

- Cada pill leva 30-60 segundos
- Ideal para manter conceitos frescos na memória
- Funciona offline
- Shuffle automático garante variedade

---

## 📋 Modo Pre-Flight Checklist

Checklist completo para 30-60 minutos antes da entrevista (dia 29).

### Como Usar

1. Toque em "Pre-Flight Checklist" no dashboard
2. Complete os 16 itens do checklist em 4 categorias:
   - 🔧 **TÉCNICO** (5 items): Câmera, microfone, internet, backup, fones
   - 🏠 **AMBIENTE** (4 items): Silêncio, fundo, iluminação, porta fechada
   - 💪 **FÍSICO** (3 items): Água, banheiro, roupa profissional
   - 🧠 **MENTAL** (4 items): Respiração, reler histórias, mindset
3. Marque cada checkbox conforme completa
4. Veja a barra de progresso atualizar (X de 16 completos)
5. Expanda as **mini-cards de revisão rápida**:
   - Joule Story (resumo em 1 frase)
   - ABC Story (resumo em 1 frase)
   - EM Perspective (resumo em 1 frase)
   - Closing Question (pergunta de fechamento)

### Persistência

- O progresso é salvo automaticamente no localStorage
- Você pode sair e voltar - os checkboxes ficam marcados
- Use "🔄 Reset Checklist" para começar do zero

### Quando Usar

- **Dia 29, 30-60 min antes das 17h**
- Complete TUDO antes de abrir o Zoom/Meet
- Garante que você não esqueceu nada crítico

---

## 🚨 Modo Vício Police

Detecta palavras proibidas em tempo real usando **Gemini Live API** para transcrição precisa.

### Como Usar

1. Toque em "Vício Police" no dashboard
2. Toque em "🎤 Iniciar Prática"
3. **Conceda permissão de microfone** quando solicitado
4. Aguarde status mudar para "🎤 Conectado! Ouvindo..."
5. O app sorteia um **prompt aleatório** dos 8 prompts de pitch
6. **Comece a falar** sua resposta em inglês
7. Observe a **transcrição** aparecer em tempo real na caixa de texto
8. Veja **alertas visuais** quando palavras são detectadas:
   - ⚠️ **Vermelho**: Palavra proibida detectada + vibração mobile
   - ✅ **Verde**: Palavra-chave desejada detectada
9. Toque em "⏹️ Parar" quando terminar
10. Veja o **Summary** com estatísticas:
    - ❌ Palavras Proibidas: lista completa com contagem
    - ✅ Palavras-Chave Usadas: lista completa com contagem

### Palavras Monitoradas

**15 Palavras Proibidas** (evitar):
- "man", "you know", "basically", "like", "um", "uh"
- "sorry", "apologize", "poor english", "my english"
- "kind of", "sort of", "i think", "maybe", "i guess"

**16 Palavras-Chave Desejadas** (usar mais):
- "joule", "abc", "fundamental analysis", "validation"
- "central bank", "seven ratios", "five predictive"
- "modigliani miller", "garp", "earnings quality"
- "dcf", "investment committee", "emerging markets"
- "fifteen percent", "ready to start", "immediately"

### Dicas

- Use em **local silencioso** para melhor precisão de transcrição
- Fale **claramente e pausadamente**
- A transcrição aparece com delay de ~1-2 segundos (normal)
- Pratique **eliminar** palavras proibidas completamente
- Pratique **incluir** mais palavras-chave desejadas
- Meta: 0 palavras proibidas, 5+ palavras-chave por resposta

### Requisitos Técnicos

✅ **Conexão internet estável** (Gemini Live API requer internet)
✅ **Permissão de microfone** (conceder quando solicitado)
✅ **HTTPS** (funciona em produção, não em localhost sem SSL)
✅ **Navegadores compatíveis**: Chrome, Edge, Safari, Firefox (desktop + mobile)

---

## 💾 Persistência de Dados

O app salva automaticamente:
- ✅ Cards marcados como "Revisar"
- ✅ Cards marcados como "Sei Bem"
- ✅ Última categoria selecionada
- ✅ Progresso do Pre-Flight Checklist (checkboxes marcados)

**Tudo fica no seu dispositivo** (localStorage). Nada vai para a nuvem.

---

## 🔒 Privacidade & Segurança

### O site é privado?

✅ **SIM!** O app está configurado para **NÃO aparecer** em:
- Google Search
- Bing Search
- Qualquer motor de busca
- Wayback Machine (Internet Archive)
- Cache do Google
- Previews em redes sociais

### Como isso funciona?

Implementamos **3 camadas de proteção**:
1. **robots.txt**: Instrui todos os crawlers a não indexar o site
2. **Meta tags HTML**: `noindex, nofollow, noarchive, nosnippet`
3. **HTTP Headers**: `X-Robots-Tag` bloqueando indexação

### Posso compartilhar o link?

✅ **SIM!** Você pode compartilhar a URL diretamente com:
- Recrutadores (se pedirem exemplos do seu trabalho)
- Amigos/mentores para feedback
- Qualquer pessoa de confiança

A URL funciona normalmente quando acessada diretamente. Apenas crawlers são bloqueados.

### Os dados são seguros?

✅ **SIM!**
- Todos os dados ficam no **localStorage do seu browser**
- Nada é enviado para servidores externos
- Sem analytics, sem tracking, sem cookies de terceiros
- Funciona 100% offline após primeira visita

---

## 🔧 Troubleshooting

### O app não abre

- Certifique-se que está usando Chrome, Edge ou Safari
- Verifique se o arquivo `index.html` está na pasta correta
- Após deploy, verifique se a URL está correta

### PWA não instala

- PWA requer **HTTPS** (funciona após deploy)
- No localhost, só funciona em `https://` ou `http://localhost`
- Solução: aguardar deploy para Vercel/GitHub Pages

### Flashcards não salvam progresso

- Verifique se o navegador permite localStorage
- Modo anônimo/privado pode bloquear localStorage
- Limpar cache do navegador apaga o progresso

### Countdown mostra hora errada

- Countdown é em **BRT (UTC-3)**
- Data da entrevista: **05/01/2026 17:00 BRT**
- Verifique se o relógio do seu dispositivo está correto

### App não funciona offline

- Certifique-se que abriu o app **pelo menos uma vez** online
- O Service Worker precisa cachear os arquivos primeiro
- Após primeira visita, deve funcionar offline

---

## 📞 Suporte

Se encontrar bugs ou tiver dúvidas:
1. Verifique este README primeiro
2. Veja o arquivo `docs/IMPLEMENTATION_LOG.md` para detalhes técnicos
3. Reporte issues ou peça ajuda

---

## 🗓️ Cronograma de Features

| Data | Feature | Status |
|------|---------|--------|
| **23/12** | Dashboard + Flashcards | ✅ **DISPONÍVEL** |
| **23/12** | Timer 45-seg + Objections | ✅ **DISPONÍVEL** |
| **23/12** | Random Pill + Pre-Flight | ✅ **DISPONÍVEL** |
| **23/12** | Vício Police (Speech Recognition) | ✅ **DISPONÍVEL** |
| **02/01** | V3.0 Response Coach + Panic Button | ✅ **DISPONÍVEL** |
| **02/01** | V4.0 Rehearsal Mode (Fluency Trainer) | ✅ **DISPONÍVEL** |
| **02/01** | V4.1 Gemini 2.5 Flash API | ✅ **DISPONÍVEL** |
| **02/01** | V4.2 Audio Save & Playback | ✅ **DISPONÍVEL** |
| **05/01** | **ENTREVISTA!** | 🎯 |

---

## 🎓 Dicas de Uso

### Agora até Dia 4 (Preparação Intensiva com Rehearsal Mode)

**PRIORIDADE MÁXIMA: Rehearsal Mode** 🎭
- **Sessões de 30-45 min, 2-3x por dia**
- **Foco nos 8 Killer Stories** (marcados com ⭐):
  1. Tell Me About Yourself - Full (60-65s)
  2. Equity Experience - Joule Focus (45-50s)
  3. Credit-to-Equity Bridge via M&M (40-45s)
  4. ABC Rating Model - Full Story (60-70s)
  5. Emerging Markets Perspective (50-55s)
  6. Why xAI - AI Tutor Vision (50-55s)
  7. Small Talk Opener (30-45s)
  8. Questions for Jeffrey (30-40s)
- **Workflow**: Ler → Ouvir TTS → Gravar → Analisar feedback AI → Repetir
- **Meta diária**: Gravar 3-4 Killer Stories até atingir 80%+ de similaridade
- **Salvar gravações**: Baixe versões finais para revisar antes da entrevista

**Complementar com outros modos:**
- **Random Pill**: 5-10 pills por dia entre sessões de Rehearsal
- **Flashcards**: 10-15 min/dia para reforçar conceitos técnicos
- **Vício Police**: 1 sessão/dia para eliminar "man" e "you know"

### Dia 5 (Dia D - Manhã)

- **08:00-09:00**: Rehearsal Mode - última revisão dos 3 Killer Stories principais (About Me, Equity Experience, ABC)
- **09:00-10:00**: Ouvir gravações salvas para relembrar versões fluentes
- **10:00-16:00**: Random Pill ocasional + descanso mental
- **16:00-16:30**: Pre-Flight Checklist completo (16 items)
- **16:30-16:45**: Respiração, mindset, revisar 1-2 frases-chave favoritas
- **16:50**: Entrar na call 10 min antes
- **17:00**: SHOWTIME! Confiar no treino, falar naturalmente

---

## 📊 Conteúdo

### V4.0 Fluency Trainer Edition
- **18 rehearsal scripts** organizados por momentos de entrevista (V4.0)
  - 8 scripts marcados como Killer Stories ⭐
  - 6 categorias de momentos (Opening, Core Pitch, Differentiation, Technical, Closing, Objections)
- **59 flashcards** cobrindo todos os tópicos (+2 novos V3.0: Joule Retailer Full Story, Jeffrey Complete Profile)
- **17 prompts** de prática de pitch (+6 novos V3.0 focados em equity experience)
- **18 objeções** difíceis com scripts ideais (+5 novas V3.0: Credit Focus, US GAAP, AI/ML, Brazil Market, Partner Role)
- **16 frases-chave** rotativas no dashboard
- **11 frases** essenciais (Random Pill)
- **13 tips** comportamentais (Random Pill)
- **16 quiz questions** verdadeiro/falso (Random Pill)
- **20 ratios técnicos** (Random Pill)
- **16 items** de checklist (Pre-Flight)
- **4 mini-cards** de revisão rápida (Pre-Flight)

---

## 🚀 Tecnologia

- **PWA** (Progressive Web App) - Instalável e offline
- **Arquitetura simplificada** - 2 arquivos principais (index.html + js/data.js)
  - `index.html` (~4.000 linhas): Estrutura + Lógica + UI + V3.0 Response Coach + V4.0 Rehearsal Mode + V5.0 Audio Coach + V6.0 Gemini TTS
  - `js/data.js` (~1.102 linhas): Dados puros + Rehearsal Scripts + Interview Moments + Keywords
- **Gemini 2.5 Flash API** - Transcrição de áudio + análise de conteúdo (V4.1)
- **Gemini 2.5 Flash TTS API** - Text-to-Speech natural com controle via prompts (V6.0)
- **MediaRecorder API** - Gravação de áudio com save/playback (V4.2)
- **Web Speech API** - Text-to-Speech fallback para Audio Coach (V6.0)
- **Media Session API** - Lock screen controls para Audio Coach (V5.0)
- **Zero dependências externas** - Vanilla JS, sem frameworks ou bundlers
- **Mobile-first** - Otimizado para celular
- **Service Worker v11** - Cache otimizado para V6.0 Gemini TTS Integration

### Estrutura de Arquivos

```
C:\Projetos\interview_xai_web_app\
├── index.html          # App principal (~3.560 linhas)
├── js/
│   └── data.js         # Módulo de dados (~1.102 linhas)
├── sw.js               # Service Worker (v10)
├── manifest.json       # PWA manifest
├── icons/              # Ícones PWA
├── docs/               # Documentação técnica
│   ├── melhorias_conversacao_2.md  # V4.0 Spec
│   ├── melhorias_conversacao.md    # V3.0 Spec
│   └── IMPLEMENTATION_LOG.md       # Change log
└── README.md           # Este arquivo
```

### Últimas Atualizações (V6.0 Gemini TTS Integration - 02/01/2026)

**V6.0: Gemini TTS Integration - Natural AI Voice for Audio Coach** ✅
- **Migração completa**: De Web Speech API (robótico) para Gemini 2.5 Flash TTS (natural)
- **Voz masculina profissional**: Controle via prompt engineering ("Professional male voice, American accent")
- **17 vozes disponíveis**: 3 categorias (Professional Male, Friendly Male, Smooth Female/Neutral)
- **Formato Question/Answer**: Clareza na estrutura do áudio ("Question: [pergunta]. Suggested Answer: [resposta]")
- **Interface em inglês**: Todos os textos do Audio Coach traduzidos para inglês
- **Cache inteligente**: Armazena áudio gerado em memória para reprodução instantânea
- **Preload automático**: Próximo item pré-carregado em background para transições suaves
- **Fallback robusto**: Se Gemini TTS falhar, usa Web Speech API automaticamente
- **Botão Stop**: Para completamente a reprodução e volta ao início
- **Loading indicator**: "🎙️ Generating natural speech..." durante geração
- **WAV conversion**: Converte base64 PCM (24kHz, mono, 16-bit) para WAV playback
- **Director's notes**: Prompt engineering detalhado para controle de voz, sotaque e tom
- **Service Worker v11**: Cache version bump para forçar atualização

**V5.0: Audio Coach Mode - Listen-Only Training** ✅
- **Nova feature principal**: Modo de prática passiva com Text-to-Speech
- **10 categorias de conteúdo**: Tudo, Killer Stories, Opening, About Me, Stories, Equity, Technical, Differentiation, Closing, Objections
- **Controles completos**: Play/Pause/Skip + Loop infinito + Pausa automática (3s) + Velocidade ajustável (0.75x-1.5x)
- **Media Session API**: Controles na tela bloqueada do celular (lock screen controls)
- **Playlist interativa**: Visualize e pule para qualquer script
- **Offline-first**: 100% funcional sem internet (Web Speech API nativo)
- **Mobile-optimized**: Botões grandes, responsivo, funciona com fone Bluetooth
- **Use case**: Dirigir, cozinhar, caminhar - pratique em multitasking
- **Complementar ao Rehearsal**: Primeiro ouça (Audio Coach), depois grave (Rehearsal)

**V4.2: Audio Recording Save & Playback** ✅
- **Salvar gravações**: Botões "▶️ Ouvir Minha Gravação" e "💾 Baixar Áudio" após gravar
- **Playback instantâneo**: Revise sua performance imediatamente
- **Download em .webm**: Salve arquivos com timestamp para comparar evolução
- **State management**: `lastRecordingBlob` e `lastRecordingUrl` em `rehearsalState`

**V4.1: Gemini 2.5 Flash API Update** ✅
- **Modelo atualizado**: De `gemini-2.0-flash-exp` (experimental) para `gemini-2.5-flash` (stable)
- **Melhor performance**: 1M token limit vs 131K, produção-ready
- **3 chamadas atualizadas**: WebSocket setup + 2 REST API calls (transcription + analysis)
- **Documentação completa**: `docs/Gemini_Documentation.md`

**V4.0: Rehearsal Mode (Fluency Trainer Core)** ✅

**MUDANÇA DE PARADIGMA: De Testing Tool para Fluency Trainer**
- **Workflow anterior**: Tentar responder → Ver se acertou (reactive testing)
- **Workflow novo**: Ler script ideal → Ouvir → Gravar → Receber feedback AI → Repetir (proactive training)
- **Foco em fluência**: Internalizar scripts até falar naturalmente, sem decorar palavra por palavra

**18 REHEARSAL SCRIPTS ORGANIZADOS POR MOMENTOS** ✅
- **6 categorias de momentos**: Opening, Core Pitch, Differentiation, Technical, Closing, Objections
- **8 Killer Stories marcadas** com ⭐ (prioridade máxima)
- **Ranges de duração**: 15s-70s (scripts alinhados com timing real de entrevista)
- **Scripts extraídos de fontes reais**: Baseados em pitches reais + objections handling + technical deep dives

**GEMINI 2.5 FLASH AI FEEDBACK** ✅
- **Transcrição em tempo real**: O que você realmente falou
- **Score de similaridade**: Comparação automática com script ideal (0-100%)
- **Key phrases tracking**: Quais frases-chave você cobriu ✅ e quais faltaram ❌
- **Análise estruturada**: Feedback em JSON (strengths, improvements, missing_points, suggestions)
- **Prompt engineering**: System instruction otimizada para feedback construtivo

**TEXT-TO-SPEECH + AUDIO RECORDING** ✅
- **TTS nativo do browser**: Ouça scripts para internalizar pronúncia e ritmo
- **MediaRecorder API**: Grave sua voz com qualidade webm/opus
- **Playback instantâneo**: Botão "▶️ Ouvir Minha Gravação" após gravar
- **Download de áudio**: Salve gravações com timestamp para comparar evolução

**INFRAESTRUTURA COMPLETA** ✅
- `rehearsalScripts` array (367 linhas) em `js/data.js`
- `interviewMoments` array (6 categorias) em `js/data.js`
- `rehearsalState` object para state management
- Functions: `selectMoment()`, `selectScript()`, `toggleRehearsalRecording()`, `processRehearsalRecording()`, `analyzeWithGemini()`, `displayAIFeedback()`, `playLastRecording()`, `downloadLastRecording()`
- CSS: 400+ linhas de styling para UI completa
- HTML: 3 telas (moment selector, script list, practice screen)

---

### Histórico de Versões

**V6.0 Gemini TTS Integration** (02/01/2026) - Natural AI Voice for Audio Coach
- **Gemini 2.5 Flash TTS API**: Voz natural e profissional em American English
- 17 vozes organizadas em 3 categorias (Professional Male, Friendly Male, Smooth Female)
- Prompt engineering para controle de voz ("Professional male coach")
- Question/Answer audio format para clareza
- Cache + preload para performance
- Fallback automático para Web Speech API
- Interface 100% em inglês

**V5.0 Audio Coach Edition** (02/01/2026) - Listen-Only Training Mode
- **Audio Coach Mode**: Prática passiva com Text-to-Speech nativo
- 10 categorias de conteúdo + playlist interativa
- Media Session API para lock screen controls
- Offline-first (Web Speech API)
- Perfeito para multitasking (dirigir, cozinhar, caminhar)

**V4.2** (02/01/2026) - Audio Recording Save & Playback
- Download de gravações com timestamp
- Playback instantâneo após gravar
- Comparação de evolução entre tentativas

**V4.1** (02/01/2026) - Gemini 2.5 Flash API Update
- Modelo estável (production-ready)
- 1M token limit para análises mais profundas
- 3 API calls atualizadas (WebSocket + REST)

**V4.0 Fluency Trainer Edition** (02/01/2026) - Rehearsal Mode
- **Mudança de paradigma**: De testing tool para fluency trainer
- 18 rehearsal scripts organizados por momentos de entrevista
- Gemini AI feedback em tempo real (transcrição + análise + score)
- Text-to-Speech + audio recording + playback

**V3.0 Conversation Edition** (02/01/2026) - Response Coach + Enhanced Panic Button
- Foco em equity experience e bridge credit↔equity
- Real-time content feedback durante speech practice
- Emergency panic word display

**V2.0 Killer Edition** (26/12/2025)

**NOVAS FEATURES DE UX** 🚀
- **🏆 Filtro "Killer Stories"**: Modo de foco nos 3 pilares da aprovação (Joule, ABC, EM). Acesse no filtro de Flashcards.
- **🆘 Panic Bridge**: Botão de emergência no timer de 45s. Mostra frases de transição seguras se você travar.
- **🔊 Text-to-Speech**: Estudo passivo! Ouça os flashcards enquanto cozinha ou dirige.

**EXPANSÃO DE CONTEÚDO** ✅
- +12 novos flashcards (45 → 57): Jeffrey, RLHF, Quality of Earnings, AI Errors
- +3 novas objeções (10 → 13): Credit Focus, US GAAP, AI/ML Experience
- +3 novos pitch prompts (8 → 11): EV/EBITDA, Diagnose Grok Error, Financial Puzzle
- Random Pill expandido: +4 frases, +5 tips, +8 quiz questions

**ALINHAMENTO ESTRATÉGICO** 🎯
- ABC Rating Model como Killer Story (7 ratios, 5 predictive, 2 not)
- Modigliani-Miller bridge para objeção Credit vs Equity
- Jeffrey Weichsel connection points (EM Fixed Income background)
- Safety Check script para compliance concerns
- Todas melhorias baseadas em análise profunda das fontes

**ARQUITETURA** 🛠️
- Dados extraídos para módulo separado (`js/data.js`)
- index.html: ~2.600 linhas (estrutura + lógica + UI)
- js/data.js: ~650 linhas (dados puros)
- Service Worker v3 (cache otimizado)

**STATUS**: ✅ Aprovado para produção (avaliação independente 5/5)

---

**Boa sorte na entrevista! 🎯**


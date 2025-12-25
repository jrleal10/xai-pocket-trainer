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

O **xAI Pocket Trainer** é seu treinador pessoal de bolso para a entrevista final na xAI. Ele te ajuda a:

- ✅ **Memorizar** conceitos-chave, histórias e frases usando flashcards interativos
- ✅ **Treinar concisão** com timer visual de 45 segundos (3 tempos: 45s/60s/90s)
- ✅ **Praticar objeções** difíceis com quiz de 10 objeções + feedback instantâneo
- ✅ **Micro-learning** com Random Pill (frases, tips, quiz, ratios aleatórios)
- ✅ **Checklist final** para o dia da entrevista (Pre-Flight Checklist)
- 🔜 **Eliminar vícios** de linguagem como "man" e "you know" (Vício Police - em breve)

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
| **05/01** | **ENTREVISTA!** | 🎯 |

---

## 🎓 Dicas de Uso

### Dias 24-25 (Natal)
- Use **Random Pill** em intervalos de 1 minuto (perfeito para Natal!)
- Use **Flashcards** em intervalos de 2-3 minutos
- Use **Timer 45-seg**: Pratique respostas concisas de 60s
- Use **Objection Handling**: Teste suas respostas instintivas
- Foco: memorizar histórias Joule e ABC

### Dias 26-28 (Preparação Focada)
- **Random Pill**: 5-10 pills por dia entre atividades
- **Timer 45-seg**: 3-4 sessões por dia (force 45s para máxima concisão)
- **Objection Handling**: Pratique todas as 10 objeções até atingir 8/10 ou mais
- **Vício Police** (quando disponível): Eliminar "man" e "you know"

### Dia 29 (Dia D)
- **Manhã**: Random Pill para refresh rápido
- **30-60 min antes**: Pre-Flight Checklist completo (16 items)
- **15 min antes**: Revisar frases-chave favoritas
- **Durante**: Respirar, confiar no treino

---

## 📊 Conteúdo

- **57 flashcards** cobrindo todos os tópicos (+12 novos cards sobre Jeffrey, RLHF, Quality of Earnings, AI Errors)
- **11 prompts** de prática de pitch (+3 novos: EV/EBITDA, Diagnose Grok Error, Financial Puzzle)
- **13 objeções** difíceis com scripts ideais (+3 novas: Credit Focus, US GAAP, AI/ML Experience)
- **16 frases-chave** rotativas no dashboard
- **11 frases** essenciais (Random Pill) (+4 novas incluindo Safety Check e RLHF)
- **13 tips** comportamentais (Random Pill) (+5 novos sobre Jeffrey, Adriana, Safety Check)
- **16 quiz questions** verdadeiro/falso (Random Pill) (+8 novos sobre Jeffrey, ABC, Modigliani-Miller)
- **20 ratios técnicos** (Random Pill)
- **16 items** de checklist (Pre-Flight)
- **4 mini-cards** de revisão rápida (Pre-Flight)

---

## 🚀 Tecnologia

- **PWA** (Progressive Web App) - Instalável e offline
- **Arquitetura simplificada** - 2 arquivos principais (index.html + js/data.js)
  - `index.html` (2.570 linhas): Estrutura + Lógica + UI
  - `js/data.js` (570 linhas): Dados puros (flashcards, scripts, prompts)
- **Zero dependências** - Vanilla JS, sem frameworks
- **Mobile-first** - Otimizado para celular
- **Service Worker v2** - Cache otimizado para offline-first

### Estrutura de Arquivos

```
C:\Projetos\interview_xai_web_app\
├── index.html          # App principal (2.570 linhas)
├── js/
│   └── data.js         # Módulo de dados (570 linhas)
├── sw.js               # Service Worker (v2)
├── manifest.json       # PWA manifest
├── icons/              # Ícones PWA
├── docs/               # Documentação técnica
└── README.md           # Este arquivo
```

### Últimas Atualizações (FASE Melhorias - 25/12/2025)

**Expansão de Conteúdo** ✅
- +12 novos flashcards (45 → 57): Jeffrey, RLHF, Quality of Earnings, AI Errors
- +3 novas objeções (10 → 13): Credit Focus, US GAAP, AI/ML Experience
- +3 novos pitch prompts (8 → 11): EV/EBITDA, Diagnose Grok Error, Financial Puzzle
- Random Pill expandido: +4 frases, +5 tips, +8 quiz questions
- Service Worker atualizado para v3
- Todas melhorias baseadas nas fontes enriquecidas

**FASE 4.1 - Refatoração: Extração de Dados** ✅
- Dados extraídos para módulo separado (`js/data.js`)
- index.html reduzido em 16% (~3.063 → 2.570 linhas)
- Melhor organização: lógica separada de dados
- Zero impacto em funcionalidade (100% compatível)

**Benefícios:**
- ✅ Conteúdo mais rico e completo para preparação
- ✅ Código mais legível e manutenível
- ✅ Edição de conteúdo facilitada (abrir data.js direto)
- ✅ Mantém simplicidade e deploy instantâneo

---

**Boa sorte na entrevista! 🎯**


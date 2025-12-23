  Plan saved to: ~\.claude\plans\stateful-waddling-sky.md · /plan to edit
     Plano de Implementação: xAI Pocket Trainer PWA

     Resumo Executivo

     Objetivo: Criar Progressive Web App para preparação da entrevista do João na xAI (29/12/2025 às 17h BRT).

     Restrição Crítica: João precisa USAR o app, não construí-lo. Com apenas 6 dias até a entrevista, a estratégia é
      entrega incremental em fases para que ele comece a praticar HOJE.

     Dispositivo: Android Chrome (compatibilidade total - todas as features funcionarão)

     Estratégia: Implementação em 3 fases
     - FASE 1 (HOJE - 23/12): MVP usável em 4-6h → João pratica esta noite
     - FASE 2 (24/12): Features completas de prática → João usa durante Natal
     - FASE 3 (25-26/12): Polimento + features avançadas → App completo

     ---
     Estrutura do Projeto

     Estado Atual

     interview_xai_web_app/
     ├── docs/
     │   └── PRD_xAI_Pocket_Trainer.md (46KB - spec completa)
     └── fontes/
         ├── Anotacoes_Pessoais.md
         ├── Final_Interview_Mastery_Guide_Claude_v3.md
         ├── Jeffrey_Weichsel_15min_Script_Claude_V2.md
         └── Sobre_o_Entrevistador.txt

     Estado Final (após implementação)

     interview_xai_web_app/
     ├── index.html              # App principal (single-file PWA)
     ├── manifest.json           # PWA manifest
     ├── sw.js                   # Service Worker (offline)
     ├── icons/
     │   ├── icon-192.png       # Ícone PWA pequeno
     │   └── icon-512.png       # Ícone PWA grande
     ├── docs/
     │   ├── PRD_xAI_Pocket_Trainer.md
     │   └── Relatorio_Implementacao.md  # Novo: relatório técnico
     ├── fontes/                 # Mantém materiais existentes
     └── README.md               # Guia rápido para João

     Arquivos a criar: 7
     - index.html (app completo)
     - manifest.json (config PWA)
     - sw.js (Service Worker)
     - icons/icon-192.png e icons/icon-512.png
     - README.md (instruções usuário)
     - docs/Relatorio_Implementacao.md (doc técnica)

     ---
     FASE 1: MVP para HOJE (23/12) - 4-6 horas

     Objetivo

     João consegue começar a memorizar HOJE à noite usando flashcards no celular.

     Entregas

     1.1 Setup & Infraestrutura (1h)

     - index.html esqueleto com:
       - HTML5 boilerplate mobile-first
       - CSS embedded (design system do PRD Seção 6.5)
       - JavaScript embedded (estrutura modular)
       - Viewport meta tags
       - Link para manifest.json
     - manifest.json:
     {
       "name": "xAI Pocket Trainer",
       "short_name": "xAI Trainer",
       "start_url": "/",
       "display": "standalone",
       "background_color": "#0a0a0a",
       "theme_color": "#10a37f",
       "icons": [...]
     }
     - sw.js básico:
       - Cache de assets estáticos
       - Estratégia cache-first
       - Funcionalidade offline
     - Icons (2 arquivos PNG):
       - 192x192 e 512x512
       - Fundo escuro (#0a0a0a)
       - Texto "xAI" ou "PT" em verde (#10a37f)
     - README.md:
       - Como acessar o app
       - Como instalar como PWA
       - Como usar cada modo
       - Troubleshooting básico

     1.2 Dashboard + Countdown (1h)

     - UI do Dashboard:
       - Header com branding xAI
       - Countdown timer para 29/12/2025 17:00 BRT (UTC-3)
       - "Frase do Momento" rotativa
       - Grid de navegação (4 botões de modo)
       - Botão "Random Pill" em destaque
       - Link Pre-Flight Checklist
     - Countdown Logic:
     const INTERVIEW_DATE = new Date('2025-12-29T17:00:00-03:00');
     // Atualizar a cada minuto
     // Formato: "X dias, Y horas, Z minutos"
     // Dia 29: "HOJE! Faltam X horas" (destaque visual)
     - Frase do Momento:
       - Array com 15-20 frases-chave do PRD
       - Tap para próxima frase
       - Auto-rotação a cada 30s se sem interação
       - Fonte: PRD Seção 5.1 (Categoria Frases-Chave)
     - Sistema de Navegação:
       - Hash-based routing (#home, #flashcards, #pitch, etc.)
       - Show/hide sections baseado em hash
       - Botão voltar funcional

     1.3 Modo Flashcards (2-3h)

     - Engine de Flashcards:
       - Estrutura de dados: {id, category, front, back, reviewCount, lastReview}
       - Display atual (frente/verso - tap para virar)
       - Swipe left = "Preciso revisar"
       - Swipe right = "Sei bem"
       - Botões fallback (caso swipe não funcione)
       - Contador de progresso: "Card 5 de 45"
     - Categorias (5 categorias, 45 cards total):
       a. Técnico (20 cards): Ratios, fórmulas, conceitos
       b. Histórias (7 cards): Joule, ABC, Emerging Markets
       c. Pessoas (4 cards): Jeffrey, Adriana, Michael, Team
       d. Frases-Chave (8 cards): Scripts para memorizar
       e. Do's and Don'ts (6 cards): Comportamentos
     - Funcionalidades:
       - Filtro por categoria (dropdown)
       - Shuffle (embaralhar)
       - Reset progress (com confirmação)
       - Priorização: cards "revisar" aparecem 2x mais
     - Persistência (localStorage):
       - Salvar histórico de swipes
       - Salvar cards marcados "revisar"
       - Salvar última categoria selecionada
       - Restaurar estado ao reabrir app
     - Conteúdo:
       - TODOS os 45 cards do PRD Seção 5.1
       - Garantir que histórias Joule/ABC estão completas
       - Frases-chave incluem closing question

     1.4 Deploy FASE 1 (30min)

     - Deploy para Vercel (recomendado):
     npm install -g vercel
     cd C:\Projetos\interview_xai_web_app
     vercel --prod
     - Testar URL em mobile (Android Chrome)
     - Confirmar PWA install funciona
     - Confirmar offline mode funciona
     - Enviar URL para João

     Entregáveis FASE 1

     ✅ App acessível via URL (HTTPS)
     ✅ Instalável como PWA
     ✅ Dashboard com countdown funcionando
     ✅ 45 flashcards navegáveis por categoria
     ✅ Funciona offline
     ✅ João pode começar a memorizar HOJE

     Critério de Sucesso FASE 1

     - João acessa app no Android Chrome
     - João instala no home screen
     - João consegue revisar flashcards durante jantar/Natal
     - Estado persiste entre sessões

     ---
     FASE 2: Practice Suite Completa (24/12) - 4-5 horas

     Objetivo

     João tem ferramentas completas para praticar respostas e objeções durante o Natal.

     Entregas

     2.1 Modo 45-Second Pitch (2h)

     - Configuração de Tempo:
       - Seletor: 45s, 60s ou 90s
       - Display do prompt escolhido
       - Botão START grande e centralizado
     - Timer Execution:
       - Display grande (3rem, monospace)
       - Barra de progresso horizontal
       - Transições de cor:
           - Verde (#10a37f): primeiros 50-60%
         - Amarelo (#f59e0b): próximos 30%
         - Vermelho (#ef4444): últimos 10% - PULSANDO
       - Texto "WRAP UP!" na fase vermelha
     - Vibração Mobile:
       - 1 vibração ao entrar no amarelo
       - 3 vibrações rápidas ao entrar no vermelho
       - navigator.vibrate([200]) e navigator.vibrate([100,50,100,50,100])
     - Review Pós-Timer:
       - Checklist específico do prompt
       - Botão "Ver Script Ideal"
       - Botão "Tentar Novamente"
       - Botão "Próximo Prompt"
     - Banco de Prompts (8 prompts):
       - "Tell me about yourself"
       - "Why xAI?"
       - "Tell me about your fundamental analysis experience"
       - "What's your most relevant experience?"
       - "Tell me about the ABC rating model project"
       - "Credit vs equity analysis"
       - "Why are you leaving Joule?"
       - "Any questions for me?"
       - Fonte: PRD Seção 4.3.6 (com checklists e scripts ideais)

     2.2 Modo Objection Handling (1.5h)

     - Quiz Engine:
       - Display objeção (texto grande)
       - 3 opções múltipla escolha (A, B, C)
       - Countdown 5 segundos (canto superior)
       - Tap opção OU timeout
     - Scoring & Feedback:
       - Correto: ✅ flash verde + explicação
       - Parcial: ⚠️ flash amarelo + explicação
       - Errado: ❌ flash vermelho + explicação
       - Display "Script Ideal" abaixo
     - Banco de Objeções (10 objeções):
       - 8 do PRD Seção 4.5.4
       - 2 adicionais do PRD Seção 12.3:
           - "Sales Guy Test" (sell me why I should hire a Partner)
         - "Boredom Test" (you'll get bored in 3 months)
     - Session Management:
       - Score: X/10 correto
       - Botão "Próxima Objeção"
       - Botão "Voltar ao Dashboard"

     2.3 Testing & Bug Fixes (1h)

     - Testar timer accuracy (não deve atrasar)
     - Testar vibração funciona no Android
     - Testar navegação entre modos
     - Testar localStorage persiste tudo
     - Corrigir bugs encontrados

     2.4 Deploy FASE 2 (30min)

     - Deploy atualização para Vercel
     - Testar produção no mobile
     - Confirmar todas features funcionam
     - Notificar João que versão completa está pronta

     Entregáveis FASE 2

     ✅ Timer de 45 segundos com feedback visual/tátil
     ✅ 8 prompts de prática com scripts ideais
     ✅ 10 objeções com quiz interativo
     ✅ João pode praticar durante Natal (24-25/12)

     Critério de Sucesso FASE 2

     - João completa pelo menos 3 sessões de pitch timer
     - João pratica todas as 10 objeções
     - João sente pressão do timer (isso é bom!)
     - João memoriza scripts ideais

     ---
     FASE 3: Features Avançadas (25-26/12) - 3-4 horas

     Objetivo

     Completar app com features de suporte e polimento final.

     Entregas

     3.1 Modo Random Pill (1h)

     - Generator:
       - Botão "🎲 RANDOM PILL" no dashboard
       - Sorteia tipo: flashcard, frase, tip, quiz, ratio
       - Display modal fullscreen
     - Tipos de Pill:
       - Flashcard: Card aleatório do deck
       - Frase: Frase-chave para memorizar + botão "Entendi"
       - Tip: Dica comportamental
       - Quick Quiz: Verdadeiro/Falso
       - Ratio: Fórmula + interpretação
     - Conteúdo:
       - Frases: 7 do PRD Seção 4.6.3
       - Tips: 8 do PRD Seção 4.6.3
       - Quiz: 8 perguntas T/F do PRD
       - Ratios: reutilizar flashcards técnicos

     3.2 Modo Vício Police (2h)

     NOTA: João quer este feature e tem Android Chrome = compatibilidade total

     - Setup Speech Recognition:
       - Web Speech API (SpeechRecognition)
       - Request permissão microfone
       - Display transcrição em tempo real
     - Detecção de Palavras:
       - Proibidas: "man", "you know", "basically", "like", "um", "uh", "sorry", "apologize", "poor english", "kind
     of", "sort of", "i think", "maybe", "i guess"
       - Desejadas: "joule", "abc", "fundamental analysis", "validation", "central bank", "modigliani miller",
     "garp", etc.
     - Feedback:
       - Palavra proibida: ⚠️ flash vermelho + banner "DETECTED: [palavra]"
       - Palavra desejada: ✅ flash verde sutil
       - Fim sessão: Summary com contagens
     - Fallback:
       - Se API não disponível: mensagem "Use Chrome/Edge"
       - Oferecer modo manual (checklist)

     3.3 Pre-Flight Checklist (1h)

     - Checklist UI:
       - 4 seções: Técnico, Ambiente, Físico, Mental
       - Checkboxes interativos
       - Salvar estado em localStorage
       - Botão "Reset Checklist"
     - Conteúdo (do PRD Seção 4.7.2):
       - Técnico: câmera, mic, internet, backup, fones
       - Ambiente: silêncio, fundo, luz, porta
       - Físico: água, banheiro, roupa
       - Mental: respiração, reler histórias, mindset
     - Mini-Cards Embedded:
       - Joule story (ultra-curta)
       - ABC story (ultra-curta)
       - EM perspective (ultra-curta)
       - Closing question
     - Countdown Integration:
       - Se dia 29 E faltam <2h para 17:00 → banner "CHECKLIST TIME!"

     3.4 Polimento Final (30min)

     - Ajustes de UX/UI
     - Verificar responsividade mobile
     - Testar todos os fluxos end-to-end
     - Corrigir pequenos bugs

     3.5 Deploy FASE 3 (30min)

     - Deploy final para produção
     - Teste completo no Android
     - Confirmar PWA atualiza corretamente
     - App está COMPLETO

     Entregáveis FASE 3

     ✅ Random Pill para micro-learning
     ✅ Vício Police com speech recognition
     ✅ Pre-Flight Checklist para dia 29
     ✅ App totalmente funcional e polido

     Critério de Sucesso FASE 3

     - João usa Random Pill em momentos roubados
     - João pratica com Vício Police e elimina "man"/"you know"
     - João completa Pre-Flight Checklist dia 29 manhã
     - João se sente 100% preparado

     ---
     Decisões Técnicas Chave

     Arquitetura: Single-File Component

     Decisão: Todo CSS e JS embedded em index.html

     Razão:
     - Zero build step → deploy instantâneo
     - Apenas 3 arquivos para cachear (index.html, manifest, sw.js)
     - Funciona offline imediatamente
     - João pode abrir file:// se deploy falhar

     Trade-off: Arquivo grande (~100KB) mas aceitável para 4G/5G

     Stack: Vanilla JavaScript (sem frameworks)

     Decisão: Sem React/Vue/Angular

     Razão:
     - Performance: sem overhead de framework
     - Simplicidade: ~1000 linhas vs ~5000 com framework
     - Sem build step
     - Qualquer dev pode ler/manter

     Trade-off: Mais boilerplate manual (aceitável para escopo pequeno)

     Storage: localStorage (sem backend)

     Decisão: Persistir tudo em localStorage

     Razão:
     - Zero custo servidor
     - Privacidade: dados não saem do device
     - Offline-first por design
     - API simples

     Trade-off: Sem sync cross-device (João usa 1 device)

     Routing: Hash-based (#home, #flashcards)

     Decisão: window.location.hash para navegação

     Razão:
     - Funciona em qualquer host estático
     - Sem config servidor
     - Botão voltar funciona automaticamente
     - Sem dependências

     Trade-off: URLs "feias" com # (irrelevante para João)

     Design System (do PRD Seção 6.5)

     :root {
       --bg-primary: #0a0a0a;
       --bg-secondary: #1a1a1a;
       --bg-card: #242424;
       --accent-primary: #10a37f;  /* xAI green */
       --accent-secondary: #0d8a6a;
       --color-warning: #f59e0b;
       --color-error: #ef4444;
       --text-primary: #ffffff;
       --text-secondary: #a0a0a0;
       --border-color: #333333;
     }

     ---
     Timeline & Milestones

     Cronograma Realista

     | Data         | Fase   | Horas | Entregas                                | Status João              |
     |--------------|--------|-------|-----------------------------------------|--------------------------|
     | 23/12 (HOJE) | FASE 1 | 4-6h  | MVP: Dashboard + Flashcards             | 🟢 Começa a usar HOJE    |
     | 24/12        | FASE 2 | 4-5h  | Timer + Objections                      | 🟢 Pratica durante Natal |
     | 25/12        | -      | 0h    | NATAL                                   | 🎄 João usa app          |
     | 26/12        | FASE 3 | 3-4h  | Random Pill + Vício Police + Pre-Flight | 🟢 App completo          |
     | 27-28/12     | -      | 0h    | Uso intensivo                           | 💪 Prática focada        |
     | 29/12        | -      | 0h    | ENTREVISTA 17h BRT                      | 🎯 GAME DAY              |

     Total dev time: ~12-15 horas distribuídas em 3 dias
     João tem 5+ dias para usar o app intensivamente

     ---
     Conteúdo: Mapeamento de Fontes

     Do PRD (fonte primária - tudo vai para o app)

     - Seção 4.3.6: 8 pitch prompts com checklists e scripts ideais
     - Seção 4.5.4: 8 objeções + 2 da Seção 12.3 = 10 total
     - Seção 5.1: 45 flashcards (5 categorias)
     - Seção 4.6.3: 7 frases, 8 tips, 8 quiz questions
     - Seção 4.7.2: Pre-flight checklist completo

     De fontes/Anotacoes_Pessoais.md

     - Detalhes de Modigliani-Miller (adicionar ao flashcard)
     - Variações da closing question (adicionar ao Pre-Flight)
     - "Safety Check" note (adicionar como Tip)

     De fontes/Sobre_o_Entrevistador.txt

     - Jeffrey's background já coberto no PRD
     - EM Fixed Income → enfatizar conexão Brasil/EM

     Checklist de Validação de Conteúdo

     Antes de cada deploy, confirmar:
     - Todos 8 prompts incluídos com scripts
     - Todas 10 objeções incluídas
     - Todos 45 flashcards organizados
     - Countdown = 29/12/2025 17:00 BRT (UTC-3)
     - Closing question presente
     - Histórias Joule/ABC completas

     ---
     Riscos & Mitigação

     Alto Risco

     R1: Service Worker não cacheia corretamente
     - Impacto: App não funciona offline
     - Probabilidade: Média
     - Mitigação:
       - Testar offline mode em FASE 1
       - Estratégia cache-first simples
       - Fallback: João mantém tab aberta

     R2: Timer impreciso por throttling do browser
     - Impacto: Timer de 45s na verdade leva 50s
     - Probabilidade: Média
     - Mitigação:
       - Usar performance.now() para timing preciso
       - Não confiar só em setInterval
       - Documentar: "Manter app em foreground"

     R3: localStorage quota excedida
     - Impacto: Estado não persiste
     - Probabilidade: Baixa (~50KB max)
     - Mitigação:
       - Comprimir estado antes de salvar
       - Não salvar strings enormes
       - Alert se quota excedida

     Médio Risco

     R4: Speech API não funciona (Vício Police)
     - Impacto: Feature não utilizável
     - Probabilidade: Baixa (Android Chrome tem suporte)
     - Mitigação:
       - Testar em FASE 3 antes de deploy
       - Fallback: modo manual com checklist
       - Não é feature crítica

     R5: Swipe gestures não funcionam bem
     - Impacto: UX degradado em flashcards
     - Probabilidade: Baixa (touch events bem suportados)
     - Mitigação:
       - Sempre mostrar botões fallback
       - Testar thresholds (50px mínimo)
       - Usar touchstart/touchmove/touchend

     ---
     Deployment

     Opção Recomendada: Vercel

     Setup (5 minutos):
     npm install -g vercel
     cd C:\Projetos\interview_xai_web_app
     vercel --prod

     Vantagens:
     - HTTPS automático (requerido para PWA)
     - CDN global
     - Free tier suficiente
     - Deploy em segundos

     URL: https://interview-xai-web-app.vercel.app (ou similar)

     Fallback: GitHub Pages

     - Criar repo GitHub
     - Push código
     - Enable Pages em settings
     - HTTPS automático

     Testing Local

     npm install -g live-server
     live-server --host=0.0.0.0 --port=8080
     - Acessar em mobile: http://[IP-PC]:8080
     - Limitação: sem HTTPS = PWA install não funciona

     ---
     Critérios de Sucesso

     Técnico

     - App carrega em <3s em 4G
     - Funciona offline após primeiro load
     - Instala como PWA no Android
     - Zero crashes reportados por João
     - Timer preciso (±1 segundo)
     - localStorage persiste entre sessões

     Funcional

     - João completa 5+ sessões de flashcards
     - João pratica pitch timer 3+ vezes
     - João revisa objeções 2+ vezes
     - João abre Pre-Flight dia 29

     Outcome (Entrevista)

     - João recita Joule story em <45s
     - João recita ABC story em <45s
     - João responde "Why xAI?" sem hesitar
     - João não usa "man"/"you know"/"sorry"
     - João faz closing question
     - João se sente 100% preparado

     ---
     Documentação

     README.md (para João)

     Conteúdo:
     - O que é o app
     - Como acessar (URL)
     - Como instalar como PWA (screenshots)
     - Como usar cada modo
     - Troubleshooting
     - Contato para bugs

     Tom: Supportivo, conciso, confiante

     docs/Relatorio_Implementacao.md (técnico)

     Conteúdo:
     - Decisões de implementação
     - Desvios do PRD (se houver)
     - Fases completadas
     - Issues conhecidos
     - Compatibilidade browsers
     - Fontes de conteúdo
     - Resultados de testes
     - URL de deployment

     Tom: Técnico, completo, honesto

     Atualizar após cada fase com:
     - ✅ O que foi implementado
     - ⚙️ Como foi implementado
     - 🐛 Bugs encontrados/resolvidos
     - 📝 Próximos passos

     ---
     Arquivos Críticos para Implementação

     Top 5 Arquivos Mais Importantes

     1. C:\Projetos\interview_xai_web_app\index.html
       - App completo (HTML + CSS + JS embedded)
       - ~100KB estimado
       - Contém: Dashboard, Flashcards, Timer, Objections, Random Pill, Vício Police, Pre-Flight
       - Integra: countdown, localStorage, routing, todas as features
     2. C:\Projetos\interview_xai_web_app\sw.js
       - Service Worker para offline
       - Cacheia index.html + manifest + icons
       - Estratégia cache-first
       - Crítico para João praticar sem internet
     3. C:\Projetos\interview_xai_web_app\manifest.json
       - Config PWA
       - Nome, cores, ícones, display mode
       - Habilita "Add to Home Screen"
       - Faz app parecer nativo
     4. C:\Projetos\interview_xai_web_app\docs\Relatorio_Implementacao.md
       - Documentação técnica completa
       - Decisões, desvios, issues, testes
       - Atualizado após cada fase
       - Transparência e rastreabilidade
     5. C:\Projetos\interview_xai_web_app\README.md
       - Guia para João usar o app
       - Como instalar, como usar, troubleshooting
       - Crítico para uso sem suporte dev

     ---
     PROTOCOLO DE DOCUMENTAÇÃO CONTÍNUA

     ⚠️ CRÍTICO: Documentar CADA Etapa Concluída

     REGRA: Após CADA sub-etapa implementada, ANTES de continuar, SEMPRE:

     1. Atualizar docs/Relatorio_Implementacao.md com:
     ## [FASE X.Y] [Nome da Etapa] - [Data] [Hora]

     ### ✅ Implementado
     - Item específico 1 (arquivo: caminho/arquivo.ext)
     - Item específico 2 (arquivo: caminho/arquivo.ext)
     - ...

     ### ⚙️ Como Foi Feito
     - Decisão técnica 1 e razão
     - Abordagem usada para problema X
     - Mudanças em relação ao plano original (se houver)

     ### 🐛 Problemas Encontrados & Resoluções
     - Problema 1: [descrição] → Solução: [como resolveu]
     - Problema 2: [descrição] → Solução: [como resolveu]

     ### 🧪 Testes Realizados
     - [ ] Teste 1: resultado
     - [ ] Teste 2: resultado

     ### 📝 Estado Atual do Projeto
     - Arquivos criados até agora: [lista]
     - Features funcionais: [lista]
     - Features pendentes: [lista]
     - Próximo passo: [descrição clara]

     ### 🔗 Para Outro Dev Continuar Daqui
     - Abrir arquivo: [qual]
     - Procurar por: [marcador ou seção]
     - Implementar: [próximo item específico]
     - Consultar: [seção deste plano]
     2. Commit (se Git iniciado) ou salvar checkpoint
     3. Verificar: Outro dev conseguiria continuar lendo só o Relatório?

     Estrutura do Relatório de Implementação

     O arquivo docs/Relatorio_Implementacao.md terá esta estrutura:

     # Relatório de Implementação: xAI Pocket Trainer

     > Este documento registra TUDO que foi implementado, como, e onde parou.
     > Se você é um desenvolvedor continuando este projeto, leia de baixo para cima
     > (última entrada = estado atual).

     ---

     ## Índice de Fases

     - [FASE 1: MVP para 23/12](#fase-1) ← Começar aqui
       - [1.1 Setup & Infraestrutura](#fase-11)
       - [1.2 Dashboard + Countdown](#fase-12)
       - [1.3 Flashcards](#fase-13)
       - [1.4 Deploy FASE 1](#fase-14)
     - [FASE 2: Practice Suite 24/12](#fase-2)
       - [2.1 Timer 45-seg](#fase-21)
       - [2.2 Objection Handling](#fase-22)
       - [2.3 Testing](#fase-23)
       - [2.4 Deploy FASE 2](#fase-24)
     - [FASE 3: Features Avançadas 25-26/12](#fase-3)
       - [3.1 Random Pill](#fase-31)
       - [3.2 Vício Police](#fase-32)
       - [3.3 Pre-Flight](#fase-33)
       - [3.4 Deploy FASE 3](#fase-34)

     ---

     ## Como Usar Este Documento

     **Se você está continuando a implementação:**
     1. Vá para a última seção preenchida
     2. Leia "Estado Atual do Projeto"
     3. Leia "Para Outro Dev Continuar Daqui"
     4. Abra o arquivo indicado
     5. Continue de onde parou
     6. **DOCUMENTE** o que você fez antes de parar

     **Se você está debugando:**
     1. Identifique qual feature tem o bug
     2. Encontre a seção correspondente neste doc
     3. Leia "Como Foi Feito" para entender a implementação
     4. Leia "Problemas Encontrados" para ver se já foi reportado
     5. Corrija e documente a solução

     ---

     ## Metadados do Projeto

     - **Data Início**: [data ao começar FASE 1]
     - **Desenvolvedor Inicial**: [nome]
     - **Deadline**: 29/12/2025 17:00 BRT (entrevista do João)
     - **Dispositivo Alvo**: Android Chrome
     - **URL Produção**: [preencher após primeiro deploy]
     - **Plano Completo**: `C:\Users\joaor\.claude\plans\stateful-waddling-sky.md`

     ---

     ## Log de Implementação

     <!-- Adicionar entradas abaixo, mais recente no topo -->

     ### [FASE X.Y] [Nome] - [Data] [Hora]
     [Template acima - copiar e preencher após cada etapa]

     ---

     Exemplo de Entrada Completa

     ### [FASE 1.1] Setup & Infraestrutura - 23/12/2025 14:30

     #### ✅ Implementado
     - manifest.json criado (C:\Projetos\interview_xai_web_app\manifest.json)
     - sw.js criado (C:\Projetos\interview_xai_web_app\sw.js)
     - index.html esqueleto criado (C:\Projetos\interview_xai_web_app\index.html)
     - Pasta icons/ criada (C:\Projetos\interview_xai_web_app\icons\)
     - Icons gerados: icon-192.png e icon-512.png
     - README.md iniciado (C:\Projetos\interview_xai_web_app\README.md)

     #### ⚙️ Como Foi Feito
     - **manifest.json**: Usei configuração do plano seção "FASE 1.1", theme color #10a37f
     - **sw.js**: Implementei cache-first strategy, cache name "xai-trainer-v1"
     - **Icons**: Gerados com canvas HTML5, fundo #0a0a0a, texto "xAI" em #10a37f
     - **index.html**: Estrutura básica com:
       - CSS variables para design system (cores do PRD)
       - Seções HTML para cada modo (hidden por padrão)
       - Script section com placeholders para cada módulo
       - Service Worker registration

     #### 🐛 Problemas Encontrados & Resoluções
     - Problema 1: Canvas para gerar icons não funcionou em Node.js
       → Solução: Usei biblioteca `canvas` do npm temporariamente
     - Problema 2: Service Worker não registrava por causa de path relativo
       → Solução: Mudei para path absoluto '/sw.js'

     #### 🧪 Testes Realizados
     - [x] manifest.json validado em https://manifest-validator.appspot.com/
     - [x] sw.js sem erros de sintaxe
     - [x] index.html abre no browser (ainda vazio)
     - [x] Icons aparecem corretamente (192x192 e 512x512)
     - [ ] PWA install (aguardando deploy)
     - [ ] Offline mode (aguardando deploy)

     #### 📝 Estado Atual do Projeto
     - **Arquivos criados até agora**:
       - index.html (esqueleto, ~200 linhas)
       - manifest.json (completo)
       - sw.js (completo)
       - icons/icon-192.png
       - icons/icon-512.png
       - README.md (em progresso)
       - docs/Relatorio_Implementacao.md (este arquivo)

     - **Features funcionais**: Nenhuma ainda (só infraestrutura)

     - **Features pendentes**:
       - FASE 1.2: Dashboard + Countdown
       - FASE 1.3: Flashcards
       - FASE 1.4: Deploy
       - Todas FASE 2 e 3
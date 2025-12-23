# xAI Pocket Trainer

> Progressive Web App para preparação da entrevista na xAI
> **Data da Entrevista**: 29 de dezembro de 2025 às 17:00 BRT
> **Entrevistador**: Jeffrey Weichsel (Human Data Manager)

---

## 🎯 O que é este app?

O **xAI Pocket Trainer** é seu treinador pessoal de bolso para a entrevista final na xAI. Ele te ajuda a:

- ✅ **Memorizar** conceitos-chave, histórias e frases usando flashcards interativos
- ⏱️ **Treinar concisão** com timer visual de 45 segundos (em breve)
- 💣 **Praticar objeções** difíceis do Jeffrey (em breve)
- 🚨 **Eliminar vícios** de linguagem como "man" e "you know" (em breve)
- 📋 **Checklist final** para o dia da entrevista (em breve)

---

## 📱 Como Usar

### 1. Abrir o App

**Opção A: No navegador (temporário)**
- Abra `C:\Projetos\interview_xai_web_app\index.html` no Chrome ou Edge
- Ou, após deploy, acesse a URL fornecida

**Opção B: Instalar como PWA (recomendado)**
1. Abra o app no Chrome/Edge do celular
2. Toque no menu (3 pontos)
3. Selecione "Adicionar à tela inicial"
4. O app aparecerá como ícone no seu celular
5. Funciona **offline** após instalação!

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

## ⏱️ Modo 45-Second Pitch (Em breve - FASE 2)

Pratica respostas com timer visual:
- Verde → Amarelo → Vermelho piscando
- Vibração no celular para avisos
- 8 prompts de entrevista
- Checklist pós-resposta

---

## 💣 Modo Objection Handling (Em breve - FASE 2)

Simula objeções difíceis do Jeffrey:
- 10 objeções com múltipla escolha
- 5 segundos para responder
- Feedback instantâneo
- Scripts ideais para cada objeção

---

## 🚨 Modo Vício Police (Em breve - FASE 3)

Detecta palavras proibidas em tempo real:
- Usa microfone para transcrever fala
- Alerta quando você diz "man", "you know", "sorry"
- Conta quantas vezes usou palavras desejadas
- Summary ao final da prática

**Requer**: Chrome/Edge (funciona 100% no Android)

---

## 📋 Pre-Flight Checklist (Em breve - FASE 3)

Checklist para 30 minutos antes da entrevista:
- Técnico: câmera, mic, internet, backup
- Ambiente: silêncio, fundo, iluminação
- Físico: água, banheiro, roupa
- Mental: respiração, reler histórias, mindset

---

## 💾 Persistência de Dados

O app salva automaticamente:
- ✅ Cards marcados como "Revisar"
- ✅ Cards marcados como "Sei Bem"
- ✅ Última categoria selecionada

**Tudo fica no seu dispositivo** (localStorage). Nada vai para a nuvem.

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
- Data da entrevista: **29/12/2025 17:00 BRT**
- Verifique se o relógio do seu dispositivo está correto

### App não funciona offline

- Certifique-se que abriu o app **pelo menos uma vez** online
- O Service Worker precisa cachear os arquivos primeiro
- Após primeira visita, deve funcionar offline

---

## 📞 Suporte

Se encontrar bugs ou tiver dúvidas:
1. Verifique este README primeiro
2. Veja o arquivo `docs/Relatorio_Implementacao.md` para detalhes técnicos
3. Reporte issues ou peça ajuda

---

## 🗓️ Cronograma de Features

| Data | Feature | Status |
|------|---------|--------|
| **23/12** | Dashboard + Flashcards | ✅ **DISPONÍVEL** |
| **24/12** | Timer 45-seg + Objections | 🔜 Em breve |
| **26/12** | Random Pill + Vício Police + Pre-Flight | 🔜 Em breve |
| **29/12** | **ENTREVISTA!** | 🎯 |

---

## 🎓 Dicas de Uso

### Dias 24-25 (Natal)
- Use **Flashcards** em intervalos de 2-3 minutos
- **Random Pill** (quando disponível) entre conversas familiares
- Foco: memorizar histórias Joule e ABC

### Dias 26-28 (Preparação Focada)
- **Timer 45-seg** (quando disponível): 3-4 sessões por dia
- **Objection Handling**: Praticar todas as 10 objeções
- **Vício Police**: Eliminar "man" e "you know"

### Dia 29 (Dia D)
- **Manhã**: Pre-Flight Checklist completo
- **30 min antes**: Revisar frases-chave favoritas
- **Durante**: Respirar, confiar no treino

---

## 📊 Conteúdo

- **45 flashcards** cobrindo todos os tópicos
- **8 prompts** de prática de pitch
- **10 objeções** difíceis com scripts ideais
- **15+ frases-chave** rotativas no dashboard

---

## 🚀 Tecnologia

- **PWA** (Progressive Web App) - Instalável e offline
- **Single-file** - Todo código em 1 arquivo HTML
- **Zero dependências** - Vanilla JS, sem frameworks
- **Mobile-first** - Otimizado para celular

---

**Boa sorte na entrevista! 🎯**

*Gerado com [Claude Code](https://claude.com/claude-code)*

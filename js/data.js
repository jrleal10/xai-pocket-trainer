// ============================================
// xAI Pocket Trainer - Data Module
// ============================================
// ATENÇÃO: Cuidado com sintaxe JavaScript (vírgulas, aspas, colchetes)
// Este arquivo contém todos os dados do app (flashcards, scripts, prompts, etc.)
// Teste o app após qualquer edição manual!

// ============================================
// VÍCIO POLICE - PALAVRAS MONITORADAS
// ============================================

const vicioPoliceWords = {
  forbidden: [
    "man", "you know", "basically", "like", "um", "uh", "sorry",
    "apologize", "poor english", "my english", "kind of", "sort of",
    "i think", "maybe", "i guess"
  ],
  desired: [
    "joule", "abc", "fundamental analysis", "validation", "central bank",
    "seven ratios", "five predictive", "modigliani miller", "garp",
    "earnings quality", "dcf", "investment committee", "emerging markets",
    "fifteen percent", "ready to start", "immediately"
  ]
};

// ============================================
// DASHBOARD - FRASES DO MOMENTO
// ============================================

const keyPhrases = [
  "5 years of daily fundamental analysis at Joule",
  "Validated 7 ratios against actual defaults—5 predictive, 2 not",
  "That validation process is exactly what AI tutoring requires",
  "Modigliani-Miller: debt and equity are two views of the same company",
  "I can contribute immediately and bring differentiated expertise for future projects",
  "Ready to start immediately, 100% available",
  "Is there anything about my background that concerns you?",
  "I haven't taken the CFA, but I've APPLIED these concepts for 20 years with real money at stake",
  "Jeffrey, I know we have limited time. Is there anything about my background that we should address?",
  "First-principles thinking. Rare door into AI for finance practitioner",
  "At 45, this is not job-hopping—it's a deliberate career move",
  "The CFA tests if you can pass an exam. My experience tests if you can apply concepts when real money is at stake",
  "Growth only matters if ROIC > WACC",
  "Revenue up but CFO down = red flag",
  "Never apologize for your English. Never say 'man' or 'you know'",
  "5 years at Joule doing daily equity analysis in the investment committee"
];

// ============================================
// FLASHCARDS - 45 CARDS
// ============================================

const flashcardsData = [
  // TÉCNICO (20 cards)
  {id: 'T1', category: 'tecnico', front: 'EV/EBITDA', back: 'Enterprise Value / EBITDA. Capital-structure neutral. Use for cross-company comparison. Triangulate with EV/EBIT and EV/FCF.'},
  {id: 'T2', category: 'tecnico', front: 'Enterprise Value', back: 'EV = Market Cap + Net Debt + Minority Interest + Preferred. Value to ALL capital providers.'},
  {id: 'T3', category: 'tecnico', front: 'ROIC', back: 'NOPAT / Invested Capital. "Growth only matters if ROIC > WACC." Sacred at Joule.'},
  {id: 'T4', category: 'tecnico', front: 'PEG Ratio', back: 'P/E / Growth Rate. Central to GARP. PEG=1 is fair. PEG<1 potentially undervalued.'},
  {id: 'T5', category: 'tecnico', front: 'Cash Conversion Cycle', back: 'DSO + DIO - DPO. Red flag: DSO growing faster than revenue = collection problems.'},
  {id: 'T6', category: 'tecnico', front: 'Modigliani-Miller', back: "Capital structure doesn't affect firm value. Debt and equity = two views of same company. What matters: assets and cash flows."},
  {id: 'T7', category: 'tecnico', front: 'WACC', back: '(E/V × Ke) + (D/V × Kd × (1-t)). Where Ke = Rf + β × MRP.'},
  {id: 'T8', category: 'tecnico', front: 'Free Cash Flow', back: "FCFF = EBIT(1-t) + D&A - CapEx - ΔNWC. What's available to all capital providers."},
  {id: 'T9', category: 'tecnico', front: 'DCF Terminal Value', back: 'Gordon Growth: FCF × (1+g) / (WACC-g). Often 60-80% of total value. Highly sensitive to assumptions.'},
  {id: 'T10', category: 'tecnico', front: 'Interest Coverage', back: 'EBIT / Interest Expense. Ability to pay interest. Below 2x = concerning.'},
  {id: 'T11', category: 'tecnico', front: 'Net Debt/EBITDA', back: '(Debt - Cash) / EBITDA. Leverage net of cash. Bankers love this.'},
  {id: 'T12', category: 'tecnico', front: 'ROE', back: 'Net Income / Equity. Can be inflated by leverage. Use with ROIC.'},
  {id: 'T13', category: 'tecnico', front: 'Gross Margin', back: 'Gross Profit / Revenue. Pricing power and COGS efficiency.'},
  {id: 'T14', category: 'tecnico', front: 'Operating Margin', back: 'EBIT / Revenue. Core profitability. Operating leverage.'},
  {id: 'T15', category: 'tecnico', front: 'Earnings Quality Red Flags', back: 'Revenue ↑ but CFO ↓. Receivables growing > revenue. Frequent "one-time" charges.'},
  {id: 'T16', category: 'tecnico', front: 'DSO (Days Sales Outstanding)', back: '(Receivables / Revenue) × 365. Days to collect. Rising = bad sign.'},
  {id: 'T17', category: 'tecnico', front: 'Brazil Interest Rates', back: 'Currently ~15%. Makes equity unattractive vs. government bonds. Structural discounts.'},
  {id: 'T18', category: 'tecnico', front: 'Common AI Error: P/EBITDA', back: 'Wrong! Should be EV/EBITDA. P/ is equity level, EBITDA is firm level. Inconsistent.'},
  {id: 'T19', category: 'tecnico', front: 'Common AI Error: US Rates for Brazil', back: 'Wrong! Brazil = 15%, not 2-3%. WACC is completely different.'},
  {id: 'T20', category: 'tecnico', front: 'GARP', back: "Growth at Reasonable Price. Joule's strategy. Balance growth with valuation discipline."},

  // HISTÓRIAS (7 cards)
  {id: 'H1', category: 'historias', front: 'Joule Story - Short', back: '5 years, GARP fund, daily investment committee, DCF validation, multiple analysis, earnings quality debates. "Prove it to me" culture.'},
  {id: 'H2', category: 'historias', front: 'Joule Story - Key Numbers', back: '5 years as partner. +38.64% YTD 2025 vs Ibov +31.29%. 18+ year track record.'},
  {id: 'H3', category: 'historias', front: 'ABC Story - Short', back: 'Validated rating model. 7 fundamental ratios analyzed. 5 predictive, 2 not. Built logistic regression. Central Bank approved.'},
  {id: 'H4', category: 'historias', front: 'ABC Story - Detail', back: 'Central Bank said model too judgmental. Gathered 5 years data. Analyzed each ratio vs defaults. Found 5/7 useful. Built automated model with override option. BC approved and praised.'},
  {id: 'H5', category: 'historias', front: 'Emerging Markets - Short', back: 'Brazil: 15% rates, small private markets, structural equity discounts. Can help reduce US bias in Grok.'},
  {id: 'H6', category: 'historias', front: 'Emerging Markets - Connection to Jeffrey', back: 'Jeffrey has EM Fixed Income background (until 2018), worked with LatAm clients. Natural connection point.'},
  {id: 'H7', category: 'historias', front: '"Cheap Multiple" Trap (Joule)', back: 'Retailer at 6x vs peers at 10x. Thesis: digital margin expansion. Challenge: digital needs capex. Found: DSO rising = extending terms. Passed. Market was right.'},

  // PESSOAS (4 cards)
  {id: 'P1', category: 'pessoas', front: 'Jeffrey Weichsel', back: 'Human Data Manager @ xAI. Ex-Scale AI. Ex-EM Fixed Income (LatAm clients until 2018). Connecticut College. Palo Alto.'},
  {id: 'P2', category: 'pessoas', front: 'Adriana', back: 'Team Lead, Finance Vertical. Equity analyst background. Said: "Current focus is fundamental analysis." "Adventurous spirit."'},
  {id: 'P3', category: 'pessoas', front: 'Michael', back: 'First interviewer. Behavioral focus. Liked Bear Stearns story, Markowitz testing.'},
  {id: 'P4', category: 'pessoas', front: 'xAI Team', back: 'Growing to 100+. Finance vertical. Projects: CFA training, synthetic IB deals, virtual data rooms.'},

  // FRASES-CHAVE (8 cards)
  {id: 'F1', category: 'frases', front: 'Opening Line', back: '5 years of daily fundamental analysis at Joule, hands-on model validation at ABC, ready to start immediately.'},
  {id: 'F2', category: 'frases', front: 'ABC Pitch', back: 'Validated 7 ratios against actual defaults. Found 5 predictive, 2 not. Built automated model. Central Bank approved.'},
  {id: 'F3', category: 'frases', front: 'Closing Question', back: 'Is there anything about my background that concerns you, or any question I can address right now?'},
  {id: 'F4', category: 'frases', front: 'Why xAI', back: 'First-principles thinking. Rare door into AI for finance practitioner. Want to build, not join.'},
  {id: 'F5', category: 'frases', front: 'Credit vs Equity', back: 'Modigliani-Miller: debt and equity are two views of the same company.'},
  {id: 'F6', category: 'frases', front: 'Value Proposition', back: 'I can contribute to current fundamental analysis projects immediately, AND bring differentiated expertise for future risk projects.'},
  {id: 'F7', category: 'frases', front: 'Availability', back: '100% available. Transitioned out of Joule. Ready to start immediately.'},
  {id: 'F8', category: 'frases', front: 'No CFA Response', back: "I haven't taken the CFA, but I've APPLIED these concepts for 20 years with real money at stake."},

  // DO'S AND DON'TS (6 cards)
  {id: 'D1', category: 'dos-donts', front: "Don't Say", back: '"man", "you know", "basically", "sorry", "my poor English"'},
  {id: 'D2', category: 'dos-donts', front: "Don't Do", back: 'Apologize. Mention Joule office. Focus on credit first. Over-explain.'},
  {id: 'D3', category: 'dos-donts', front: 'Do Say', back: '"Joule", "ABC", "fundamental analysis", "validation", "immediately"'},
  {id: 'D4', category: 'dos-donts', front: 'Do', back: 'Lead with Joule + ABC. Keep under 60 seconds. Ask closing question.'},
  {id: 'D5', category: 'dos-donts', front: "If You Don't Know", back: '"I don\'t have direct experience with that, but my instinct based on Joule/ABC is..."'},
  {id: 'D6', category: 'dos-donts', front: 'End Statements', back: "Downward inflection. Sounds confident. Don't trail off or upspeak."},

  // NOVOS CARDS (12 adicionais) - FASE Melhorias 25/12/2025
  {id: 'T21', category: 'tecnico', front: 'Modigliani-Miller - Left vs Right Side', back: 'Value is created on the LEFT SIDE (Assets). Debt/Equity are on the RIGHT SIDE. My job: analyze if assets generate cash efficiently. Capital-structure agnostic → focus on ROIC.'},
  {id: 'T22', category: 'tecnico', front: 'RLHF Applied to Credit (ABC)', back: 'At ABC: Model gave quantitative rating, but analyst could OVERRIDE with structured justification. Human intuition catches edge cases. Essentially RLHF before the term existed.'},
  {id: 'T23', category: 'tecnico', front: 'Quality of Earnings - 6 Red Flags', back: '1) Revenue ↑ but CFO ↓. 2) Large gap Net Income vs CFO. 3) Receivables > Sales growth. 4) Inventory buildup. 5) Frequent "one-time" charges. 6) Margin expansion without revenue growth.'},
  {id: 'T24', category: 'tecnico', front: 'Common AI Errors in Finance', back: '1) Unit/Scale errors. 2) P/EBITDA instead of EV/EBITDA. 3) US rates (2-3%) for Brazil (15%). 4) DCF with 3% growth for declining industry. 5) Ignoring earnings quality.'},
  {id: 'F9', category: 'frases', front: 'Safety Check Script', back: 'Since transitioning out of Joule, I\'ve set up a fully private, secure home office to ensure I can work on xAI\'s proprietary data with zero compliance risk.'},
  {id: 'F10', category: 'frases', front: 'Closing Question - Option 1', back: 'Jeffrey, I know we have limited time. Based on my background and my conversations with Adriana and Michael, I am confident I can bring the rigor you need. Is there any final hesitation on your end that I can address right now?'},
  {id: 'F11', category: 'frases', front: 'Closing Question - Option 2', back: 'Jeffrey, based on my 5 years of fundamental analysis at Joule and my experience validating financial models at ABC, I\'m confident I can contribute immediately. Is there anything about my background that concerns you?'},
  {id: 'F12', category: 'frases', front: 'Closing Question - Option 3', back: 'Jeffrey, I want to make sure I\'ve addressed everything. Is there anything about my fit for the role that I haven\'t covered?'},
  {id: 'P5', category: 'pessoas', front: 'Jeffrey - Scale AI Journey', back: 'May 2023: Expert Tasker → Jun 2023: QA Team Manager → Feb 2024: Queue Manager → Jan 2025: Team Lead at xAI. Promoted based on quality metrics. Knows the tutor journey from inside.'},
  {id: 'P6', category: 'pessoas', front: 'Jeffrey - Skills & Certifications', back: 'FINRA: Series 7, 24, 55, 63. Languages: Russian, Chinese (studied in Dalian, Irkutsk). Ran Otkritie Capital US as CEO/CCO. Passed SEC/FINRA exams with NO deficiencies. Detail-oriented.'},
  {id: 'P7', category: 'pessoas', front: 'Jeffrey - What He Values', back: 'Led rubric development, onboarding pipelines, feedback loops at Scale AI. "Quality through audits and iterative refinement." Values: data consistency, structured justification, catching blind spots.'},
  {id: 'H8', category: 'historias', front: '"Cheap Multiple" Trap - Joule Case', back: 'Retailer at 6x EV/EBITDA (peers at 10x). Thesis: digital margin expansion. Challenge: digital needs capex. Found: DSO rising faster than revenue = extending payment terms. PASSED. Market was right to discount.'}
];

// ============================================
// 45-SECOND PITCH PROMPTS - 8 PROMPTS
// ============================================

const pitchPrompts = [
  {
    id: 1,
    prompt: "Tell me about yourself",
    checklist: [
      "Mentioned Joule (5 years, daily fundamental analysis)?",
      "Mentioned ABC (validation project)?",
      "Stated availability/readiness?",
      "Under 60 seconds?",
      "No apologies, 'man', or 'you know'?"
    ],
    idealScript: `5 years of daily fundamental analysis at Joule—a GARP fund in Brazil. I was in the investment committee doing DCF models, debating earnings quality, challenging theses.

Before that, at ABC-Brasil, I validated their credit rating model. They had 7 fundamental ratios but didn't know which were predictive. I analyzed 5 years of data against actual defaults. Found 5 ratios were useful, 2 weren't. Built a logistic regression model. Central Bank approved it.

Now I'm ready to start immediately. 100% available. This role at xAI is exactly what I want—applying first-principles thinking to teach finance through AI.`
  },
  {
    id: 2,
    prompt: "Why xAI?",
    checklist: [
      "Mentioned 'first-principles thinking'?",
      "Connected to your background?",
      "Showed understanding of xAI's mission?",
      "Expressed genuine excitement?",
      "Avoided generic answers?"
    ],
    idealScript: `First-principles thinking.

xAI is building AI from the ground up using reasoning, not pattern-matching. That's exactly what I did at ABC: took 7 ratios, didn't trust conventional wisdom, validated each one against real defaults.

This is a rare door into AI for someone with 20+ years of finance. I don't want to join some fintech that uses GPT via API. I want to BUILD the thing that teaches finance. That's only possible here.`
  },
  {
    id: 3,
    prompt: "Tell me about your fundamental analysis experience",
    checklist: [
      "Mentioned Joule specifics (5 years, investment committee)?",
      "Gave concrete example (ratio, red flag, or story)?",
      "Showed depth beyond surface-level?",
      "Connected to xAI's needs?",
      "Concise and confident?"
    ],
    idealScript: `5 years at Joule doing daily equity analysis in the investment committee.

GARP strategy—Growth at Reasonable Price. We'd triangulate: EV/EBITDA, EV/EBIT, EV/FCF. Sacred rule: "Growth only matters if ROIC > WACC."

One red flag I learned to spot: revenue up but cash flow from operations down. Usually means they're extending payment terms to juice sales. Or capitalizing expenses. The market eventually catches it.

That validation mindset—proving things with data rather than trusting headlines—is exactly what AI tutoring needs for finance.`
  },
  {
    id: 4,
    prompt: "What's your most relevant experience for this role?",
    checklist: [
      "Led with ABC validation project?",
      "Explained the validation process?",
      "Connected to AI training?",
      "Mentioned specific numbers (7 ratios, 5 predictive)?",
      "Under 60 seconds?"
    ],
    idealScript: `The ABC rating model validation.

Central Bank said our model was too judgmental. So I gathered 5 years of financial data and matched it against actual defaults.

Analyzed 7 fundamental ratios one by one:
- Interest Coverage → Highly predictive
- Net Debt/EBITDA → Predictive
- ROE → NOT predictive (can be gamed with leverage)
- ROIC → Predictive
- And so on...

Found 5 were useful, 2 weren't. Built a logistic regression model with weights. Central Bank approved and praised the rigor.

That validation process—testing whether concepts actually predict outcomes—is EXACTLY what training AI to tutor finance requires. You can't just feed it textbook formulas. You need someone who knows what works in practice.`
  },
  {
    id: 5,
    prompt: "Tell me about the ABC rating model project",
    checklist: [
      "Explained the problem (Central Bank objection)?",
      "Described your solution (data validation)?",
      "Gave specific results (5/7 ratios predictive)?",
      "Mentioned outcome (Central Bank approval)?",
      "Connected to xAI?"
    ],
    idealScript: `ABC had a credit rating model using 7 fundamental ratios: Interest Coverage, Net Debt/EBITDA, ROE, ROIC, Cash Conversion Cycle, Gross Margin, Operating Margin.

Central Bank said it was too judgmental—we couldn't prove which ratios mattered.

So I gathered 5 years of financial statements from our corporate clients and matched them against who actually defaulted.

Tested each ratio:
✅ Interest Coverage: Companies with <2x almost always defaulted
✅ Net Debt/EBITDA: High leverage predicted trouble
❌ ROE: NOT predictive (private companies game this with leverage)
✅ ROIC: Very predictive
❌ Gross Margin: Alone, not useful

Built logistic regression with the 5 useful ratios. Central Bank approved. Model ran for years.

This taught me: in finance, conventional wisdom often fails. You validate with data. That's what xAI needs for Grok.`
  },
  {
    id: 6,
    prompt: "You've done credit and equity analysis. How are they different?",
    checklist: [
      "Mentioned Modigliani-Miller?",
      "Explained 'two views of same company'?",
      "Showed depth beyond surface answer?",
      "Avoided saying credit is 'easier' or 'harder'?",
      "Confident and concise?"
    ],
    idealScript: `Modigliani-Miller principle: debt and equity are two views of the same company.

Credit asks: "Will they pay me back?" Focus on downside protection, covenants, asset coverage.

Equity asks: "Will this grow?" Focus on upside, ROIC > WACC, terminal value assumptions.

But you're analyzing the same cash flows. If you understand enterprise value and capital structure, you can do both.

At Joule, I'd decompose: EV = Market Cap + Net Debt. Equity is a residual claim. Credit is senior. But both depend on the business generating cash.

At ABC, I used the same fundamental analysis—just focused on "can they cover interest?" instead of "will they grow earnings?"`
  },
  {
    id: 7,
    prompt: "Why are you leaving Joule?",
    checklist: [
      "Framed positively (moving TOWARD xAI, not AWAY from Joule)?",
      "Expressed respect for Joule?",
      "Emphasized deliberate choice?",
      "Connected to career transition at 45?",
      "No negativity or complaints?"
    ],
    idealScript: `I'm not leaving because something's wrong at Joule—it's been an incredible 5 years. +38% YTD, rigorous investment process, learned a ton.

But at 45, this is my last chance to move into AI. If I wait 2-3 more years, that door closes.

xAI is the only place where a finance practitioner can contribute to BUILDING the AI, not just using it. I don't want to join a fintech that calls OpenAI's API. I want to be where the reasoning is happening.

This is a deliberate, one-time career move. I've transitioned out of Joule. I'm 100% available and ready to start immediately.`
  },
  {
    id: 8,
    prompt: "Do you have any questions for me?",
    checklist: [
      "Asked closing question (concerns about background)?",
      "Showed confidence and openness?",
      "Avoided generic questions?",
      "Ended strong?",
      "Ready to address concerns directly?"
    ],
    idealScript: `Yes—Jeffrey, I know we have limited time.

Is there anything about my background that concerns you, or any question I can address right now?

[PAUSE - let him respond]

[If no concerns:]
"Great. I'm excited about this role and ready to start immediately."`
  },
  {
    id: 9,
    prompt: "Explain EV/EBITDA. When should you use it vs P/E?",
    checklist: [
      "Explained EV/EBITDA correctly (capital-structure neutral)?",
      "Gave clear use cases for EV/EBITDA?",
      "Explained when P/E is better?",
      "Mentioned triangulation (EV/EBIT, EV/FCF)?",
      "Showed practical wisdom (not just textbook)?"
    ],
    idealScript: `EV/EBITDA is Enterprise Value divided by EBITDA—how much you pay for operating cash flow proxy relative to total firm value.

Use EV/EBITDA over P/E:
- Comparing companies with different capital structures (it's leverage-neutral)
- M&A analysis (acquirers buy the whole business)
- Cross-accounting comparisons (EBITDA normalizes D&A differences)

Use P/E:
- Retail investors who think per-share
- Stable companies with similar leverage

Caveat: EBITDA ignores capex. At Joule, we never looked at EV/EBITDA alone—we'd triangulate with EV/EBIT and EV/FCF.

A company cheap on EV/EBITDA but expensive on EV/FCF is usually a capital trap.`
  },
  {
    id: 10,
    prompt: "If Grok gives a wrong valuation answer, how would you diagnose it?",
    checklist: [
      "Structured approach (not random guessing)?",
      "Identified error types (math, conceptual, contextual)?",
      "Mentioned tracing the reasoning chain?",
      "Connected to ABC experience?",
      "Mentioned generalizing to catch patterns?"
    ],
    idealScript: `I'd approach it like I did at ABC with the rating model:

Step 1: Identify error type
- Mathematical (calculation wrong)?
- Conceptual (wrong formula)?
- Contextual (right method, wrong application)?
- Reasoning (flawed logic chain)?

Step 2: Trace the reasoning
Where exactly did it break? DCF error might be in WACC, growth assumption, or terminal value.

Step 3: Create correction
Not just 'here's the right answer' but 'here's the reasoning that leads to it, and here's why the original failed.'

Step 4: Generalize
Is this a one-off or a pattern? At ABC, I found 2 of 7 ratios weren't predictive—that's a systematic issue worth flagging.

My Joule and ABC experience is directly relevant—I've spent years challenging models and explaining corrections.`
  },
  {
    id: 11,
    prompt: "Give me an example of a complex financial 'puzzle' you've worked on.",
    checklist: [
      "Chose a relevant example (ABC or Joule)?",
      "Explained the 'puzzle' clearly?",
      "Showed multi-step reasoning?",
      "Connected to AI tutoring?",
      "Demonstrated problem-solving mindset?"
    ],
    idealScript: `At ABC, validating the rating model was a puzzle:

The problem: Central Bank said our ratings were too judgmental—no quantitative backing.

The pieces: 5 years of data on 7 fundamental ratios, analyst-assigned ratings, and actual defaults.

The puzzle: Which ratios actually predicted default? Were analysts adding value with judgment, or just adding noise?

The solution: I analyzed each ratio individually—correlation with default, predictive power. Found 5 were useful, 2 weren't. Built regression combining the good ratios into an automated suggested rating.

The insight: The puzzle wasn't just math—it was explaining WHY certain variables mattered and others didn't.

That's what AI tutoring requires: not just correcting answers, but explaining the reasoning chain.`
  }
];

// ============================================
// OBJECTION HANDLING - 10 OBJECTIONS
// ============================================

const objections = [
  {
    id: 1,
    objection: "Why should we hire you instead of someone with a CFA?",
    options: [
      { text: "I haven't taken the CFA, but I can study for it if needed", score: 0 },
      { text: "I've applied these concepts for 20 years with real money at stake", score: 2 },
      { text: "The CFA is not that important for AI training work", score: 0 }
    ],
    correctIndex: 1,
    explanation: "The CFA tests if you can pass an exam. Your experience tests if you can apply concepts when real money is at stake. That's what xAI needs: someone who knows what works in practice.",
    idealScript: `I haven't taken the CFA, but I've APPLIED these concepts for 20 years with real money at stake.

The CFA tests if you can pass an exam. My experience tests if you can actually use ROIC, WACC, DCF—when a wrong model costs the fund millions.

At Joule, I wasn't regurgitating textbook formulas. I was in the investment committee defending: "This company's ROIC is 18%, WACC is 12%, trading at 8x EV/EBITDA—we should buy."

For training Grok to tutor finance, you need someone who knows what actually predicts outcomes. That's validation, not memorization.`
  },
  {
    id: 2,
    objection: "You're 45. Won't you get bored doing data labeling?",
    options: [
      { text: "I won't get bored, I'm very motivated", score: 0 },
      { text: "This isn't data labeling—it's validating what finance concepts AI should learn", score: 2 },
      { text: "I'll work on other projects too, not just this", score: 1 }
    ],
    correctIndex: 1,
    explanation: "Reframe the role. You're not 'labeling data'—you're validating financial knowledge for AI. That's exactly what you did at ABC with the rating model.",
    idealScript: `This isn't data labeling—it's validating what finance concepts AI should learn.

That's exactly what I did at ABC: Central Bank said our rating model was too judgmental. I validated 7 ratios against actual defaults. Found 5 were predictive, 2 weren't.

Here, I'd be doing the same: testing if Grok's understanding of ROIC, DCF, earnings quality actually matches what works in practice.

At 45, I'm not looking for novelty. I'm looking for IMPACT. Teaching AI to understand finance correctly—that's a 10-year project I want to commit to.`
  },
  {
    id: 3,
    objection: "Why are you really leaving Joule? There must be a problem.",
    options: [
      { text: "There's no problem, I just want to try something new", score: 0 },
      { text: "Joule is great, but at 45, this is my last window to move into AI", score: 2 },
      { text: "I've learned everything I can at Joule and need a new challenge", score: 1 }
    ],
    correctIndex: 1,
    explanation: "Be honest but positive. Joule is excellent, but the AI opportunity has a time limit. Frame it as a deliberate career choice, not dissatisfaction.",
    idealScript: `Joule is great—+38% YTD, rigorous process, learned a ton. There's no problem.

But at 45, if I want to move into AI, this is my last window. In 2-3 years, that door closes.

xAI is the only place where a finance practitioner can contribute to BUILDING the AI, not just using it via API.

This is a deliberate, one-time career move. I've transitioned out of Joule cleanly. I'm 100% available and ready to start immediately.`
  },
  {
    id: 4,
    objection: "We have people with PhDs. You'll be the least educated person on the team.",
    options: [
      { text: "I learn quickly and can keep up", score: 0 },
      { text: "PhDs are valuable, but this role needs someone who's lived finance daily for 20 years", score: 2 },
      { text: "Education doesn't matter as much as experience", score: 1 }
    ],
    correctIndex: 1,
    explanation: "Acknowledge their expertise but highlight your unique value: practical validation of financial concepts.",
    idealScript: `PhDs are valuable—I respect that expertise.

But this role needs someone who's lived finance daily for 20 years. Someone who knows that "Revenue ↑ but CFO ↓" is a red flag because they've seen companies fail from it.

A PhD can explain Modigliani-Miller theoretically. I can explain why it matters when you're deciding if debt or equity is mispriced.

At ABC, I validated which ratios predict defaults. At Joule, I validated which companies' growth is sustainable. That's the validation xAI needs for Grok.

Different skill sets. Complementary.`
  },
  {
    id: 5,
    objection: "Your English isn't perfect. That might be a problem for writing training data.",
    options: [
      { text: "I'll work on improving my English", score: 0 },
      { text: "My English is clear for technical finance. I've written reports for 20 years.", score: 2 },
      { text: "I can have someone review my writing", score: 1 }
    ],
    correctIndex: 1,
    explanation: "Never apologize for your English. Emphasize that technical finance communication is clear and you've done it professionally for decades.",
    idealScript: `My English is clear for technical finance. I've written investment committee memos, rating reports, and client analyses for 20 years.

For training Grok, you don't need literary prose. You need: "ROIC > WACC means value creation." "DSO rising faster than revenue = collection risk."

That's technical precision. That's what I do.

If there's a specific concern about my writing, I'm happy to do a sample task. But I've communicated complex finance in English daily for two decades.`
  },
  {
    id: 6,
    objection: "This role is in Palo Alto. You're in Brazil. How will that work?",
    options: [
      { text: "I can work remotely or relocate if needed", score: 1 },
      { text: "I'm relocating to the US. Timing is flexible based on when you need me.", score: 2 },
      { text: "Many companies work remotely now, it shouldn't be a problem", score: 0 }
    ],
    correctIndex: 1,
    explanation: "Show commitment and flexibility. You're willing to relocate, and you can adapt to their timeline.",
    idealScript: `I'm relocating to the US. Timing is flexible based on when you need me.

If you need me to start remotely while I arrange relocation—I can do that. I'm in Brazil (UTC-3), so overlap with Palo Alto is manageable.

If you need me on-site from day 1—I can arrange that too. My Joule transition is complete. I'm 100% available.

Location is not a blocker. I'm committed to making this work.`
  },
  {
    id: 7,
    objection: "You've been at Joule for 5 years. Before that, 15 years at ABC. You don't job-hop. Why start now?",
    options: [
      { text: "I'm not job-hopping, this is a special opportunity", score: 1 },
      { text: "At 45, this isn't job-hopping—it's a deliberate, one-time career transition into AI", score: 2 },
      { text: "I stay long-term when I'm committed, and I'm committed to xAI", score: 1 }
    ],
    correctIndex: 1,
    explanation: "Reframe as a strength. Your stability shows commitment. This move is exceptional and deliberate.",
    idealScript: `Exactly—at 45, this isn't job-hopping. It's a deliberate, one-time career transition.

I stayed at ABC for 15 years because I was building something: their credit risk framework. I stayed at Joule for 5 years because the GARP strategy was world-class.

Now I'm moving to xAI because at 45, this is my last chance to contribute to building AI. If I don't do this now, I'll be analyzing stocks until retirement.

My track record shows: when I commit, I stay. I'm committing to xAI long-term—this is a 10-year decision for me.`
  },
  {
    id: 8,
    objection: "We need someone who can start immediately. Can you really do that?",
    options: [
      { text: "Yes, I can start within 2-3 weeks", score: 1 },
      { text: "Yes. I've transitioned out of Joule. I'm 100% available and ready to start immediately.", score: 2 },
      { text: "I'll need to give notice, but I'll make it work", score: 0 }
    ],
    correctIndex: 1,
    explanation: "Remove all doubt. You're ready NOW. No notice period, no delays.",
    idealScript: `Yes. I've transitioned out of Joule cleanly. I'm 100% available.

No notice period. No loose ends. If you say "start Monday," I'll be there Monday.

I took this transition seriously because I'm serious about xAI. I didn't want to be in a position where I'm negotiating notice periods or wrapping up projects.

I'm ready to start immediately.`
  },
  {
    id: 9,
    objection: "Sell me on why I should hire a Partner from a Brazilian fund to do AI work. (Sales Guy Test)",
    options: [
      { text: "I have unique experience that combines finance and validation skills", score: 1 },
      { text: "You should hire me because I can validate if Grok's finance knowledge actually works—I've done it for 20 years with real money at stake", score: 2 },
      { text: "I'm passionate about AI and willing to learn whatever is needed", score: 0 }
    ],
    correctIndex: 1,
    explanation: "This is a test of confidence and clarity. Give a direct, compelling answer focused on your unique value proposition.",
    idealScript: `You should hire me because I can validate if Grok's finance knowledge actually works—and I've done exactly that for 20 years with real money at stake.

At ABC, I validated 7 financial ratios against real defaults. Found 5 predictive, 2 not. Built a model. Central Bank approved.

At Joule, I validated companies' growth stories. "ROIC > WACC?" "Revenue up but CFO down—why?" Millions rode on getting it right.

For training Grok to tutor finance, you need someone who knows: What predicts outcomes? What's textbook BS? What actually matters when money's at risk?

That's me. That's what I've done daily for 20 years. And I can start immediately.`
  },
  {
    id: 10,
    objection: "This role involves a lot of repetitive work. You'll get bored in 3 months. (Boredom Test)",
    options: [
      { text: "I don't get bored easily, I'm very disciplined", score: 0 },
      { text: "I spent 15 years analyzing the same 200 companies at ABC. I don't get bored—I get precise.", score: 2 },
      { text: "I'll find ways to make the work interesting", score: 0 }
    ],
    correctIndex: 1,
    explanation: "Use your track record as proof. You've done long-term, detail-oriented work and thrived.",
    idealScript: `I spent 15 years at ABC analyzing credit risk for the same portfolio of 200 companies. Quarterly reviews. Same ratios. Same spreadsheets.

I didn't get bored—I got precise. I learned which tiny changes in DSO predicted trouble 6 months later.

At Joule, I analyzed the same 40-stock portfolio for 5 years. Daily investment committee. Same questions: "ROIC > WACC?" "Is growth sustainable?"

Repetitive? Yes. Boring? No. Because precision matters. One ratio wrong = millions lost.

For xAI, teaching Grok to understand ROIC correctly—that's repetitive validation work. But if Grok gets it wrong, it teaches millions of students wrong.

I'm built for this. I don't get bored. I get it right.`
  },
  {
    id: 11,
    objection: "Your background seems more credit-focused. How does that fit with our fundamental analysis focus?",
    options: [
      { text: "I can adapt—I'm a quick learner", score: 0 },
      { text: "I've done equity analysis at Joule for 5 years, plus Modigliani-Miller: debt and equity are two views of the same company", score: 2 },
      { text: "Credit analysis is similar to equity analysis", score: 1 }
    ],
    correctIndex: 1,
    explanation: "Lead with Joule (5 years equity), then bridge with Modigliani-Miller. Don't apologize for credit background—reframe it as complementary expertise.",
    idealScript: `Fair observation. But let me clarify:

First, I've been doing equity fundamental analysis at Joule for 5 years. Daily investment committee debates on DCF, multiples, earnings quality.

Second, Modigliani-Miller: debt and equity are two views of the same company. What matters is fundamental analysis of the business—cash flows, ROIC, competitive position.

Third, my credit experience gave me model validation skills. At ABC, I analyzed 7 fundamental ratios against actual defaults. That's exactly what AI tutoring requires.

So I can contribute to fundamental analysis projects NOW, and bring differentiated expertise for risk management projects LATER.`
  },
  {
    id: 12,
    objection: "How do you handle US GAAP? Your experience is with Brazilian/IFRS standards.",
    options: [
      { text: "I'll need to study US GAAP, but I can learn quickly", score: 0 },
      { text: "Math doesn't have borders. A DCF is the same in NY or SP. Coming from IFRS makes me MORE skeptical and robust.", score: 2 },
      { text: "US GAAP is very similar to IFRS nowadays", score: 1 }
    ],
    correctIndex: 1,
    explanation: "Reframe your IFRS background as a strength. High-inflation environments make you more skeptical of accounting numbers.",
    idealScript: `Math doesn't have borders. A DCF is the same in NY or SP.

I'm familiar with US specifics like 10-Ks, Stock-Based Compensation (which I'd treat as a REAL expense), LIFO vs FIFO inventory adjustments.

Actually, coming from IFRS and high-inflation environments makes me MORE skeptical and robust than someone who has only seen stable markets.

At Joule, we analyzed US ADRs alongside Brazilian stocks. I know how to adjust for accounting differences and find the TRUE Free Cash Flow.`
  },
  {
    id: 13,
    objection: "You don't have any AI or machine learning experience. How can you contribute to AI training?",
    options: [
      { text: "I'm passionate about AI and willing to learn", score: 0 },
      { text: "This role doesn't need ML engineers—it needs domain experts who can validate if AI understands finance correctly", score: 2 },
      { text: "I've used AI tools in my work and understand the basics", score: 1 }
    ],
    correctIndex: 1,
    explanation: "Reframe the role. xAI doesn't need you to BUILD ML models—they need you to VALIDATE if AI's finance knowledge is correct. That's what you've done for 20 years.",
    idealScript: `This role doesn't need ML engineers—you have those. It needs domain experts who can validate if AI understands finance correctly.

At ABC, I validated a credit model: "Does this ratio actually predict default?" That's the same question: "Does Grok's understanding of ROIC actually match how practitioners use it?"

I'm not here to train neural networks. I'm here to catch errors like: "Grok used P/EBITDA instead of EV/EBITDA" or "Grok applied US rates to a Brazilian company."

You need someone who's USED these concepts with real money at stake for 20 years. That's my value-add.`
  }
];

// ============================================
// RANDOM PILL DATA
// ============================================

const randomPillData = {
  frases: [
    "5 years of daily fundamental analysis at Joule",
    "Validated 7 ratios against actual defaults—5 predictive, 2 not",
    "That validation process is exactly what AI tutoring requires",
    "Modigliani-Miller: debt and equity are two views of the same company",
    "I can contribute immediately and bring differentiated expertise for future projects",
    "Ready to start immediately, 100% available",
    "Is there anything about my background that concerns you?",
    "Since transitioning out of Joule, I've set up a fully private, secure home office",
    "I bring a capital-structure agnostic view—focus on ROIC",
    "A Credit analyst who ignores the Asset side goes broke; an Equity analyst who ignores it is just gambling",
    "I designed a workflow where analysts could override the model with structured justification—essentially RLHF"
  ],
  tips: [
    "Don't say 'man' or 'you know'",
    "Keep answers under 60 seconds",
    "Lead with Joule and ABC, not credit",
    "If you don't know, say so honestly then bridge to what you know",
    "End statements with downward inflection—sounds confident",
    "Pause instead of using filler words",
    "Don't mention working from Joule's office",
    "Jeffrey has EM background—mention Brazil's 15% rates if natural",
    "Jeffrey was a Finance SME at Scale AI—he knows the tutor journey from inside",
    "Jeffrey passed SEC/FINRA exams with NO deficiencies—he values attention to detail",
    "Adriana said current focus is fundamental analysis, NOT risk management",
    "Frame the Safety Check early—kill compliance concerns upfront",
    "If asked about US GAAP: 'Math doesn't have borders. Coming from IFRS makes me more skeptical.'"
  ],
  quickQuiz: [
    { q: "EV/EBITDA is capital-structure neutral", a: true },
    { q: "You should apologize for your English", a: false },
    { q: "PEG = P/E divided by Growth Rate", a: true },
    { q: "At ABC, 7 of 7 ratios were predictive", a: false },
    { q: "Jeffrey worked with EM Fixed Income until 2018", a: true },
    { q: "The interview is 30 minutes long", a: false },
    { q: "Adriana said current focus is risk management", a: false },
    { q: "Modigliani-Miller says capital structure doesn't matter for firm value", a: true },
    { q: "Jeffrey worked at Scale AI before xAI", a: true },
    { q: "Jeffrey has FINRA Series 7, 24, 55, and 63 certifications", a: true },
    { q: "At ABC, all 7 ratios were found to be predictive", a: false },
    { q: "You should apologize for not having a CFA", a: false },
    { q: "Safety Check: mention private home office early", a: true },
    { q: "Jeffrey studied Russian and Chinese", a: true },
    { q: "Modigliani-Miller says capital structure affects firm value", a: false },
    { q: "ROIC > WACC means value creation", a: true }
  ]
};

// ============================================
// PRE-FLIGHT CHECKLIST DATA
// ============================================

const preFlightChecklist = {
  tecnico: [
    "Câmera testada e funcionando",
    "Microfone testado e funcionando",
    "Internet estável (speed test)",
    "Backup de internet disponível (4G)",
    "Fones de ouvido carregados"
  ],
  ambiente: [
    "Ambiente silencioso",
    "Fundo neutro/profissional",
    "Iluminação adequada",
    "Porta fechada, família avisada"
  ],
  fisico: [
    "Água na mesa",
    "Banheiro visitado",
    "Roupa profissional"
  ],
  mental: [
    "Respirações profundas (3x)",
    "Reler histórias (Joule, ABC, EM)",
    "Reler pergunta de fechamento",
    "Mindset: 'Jeffrey quer me aprovar'"
  ]
};

const miniStories = {
  joule: "5 years, GARP fund, daily investment committee, DCF validation, multiples analysis, earnings quality debates. 'Prove it to me' culture. +38.64% YTD 2025.",
  abc: "Validated 7 ratios against actual defaults. 5 predictive, 2 not. Built logistic regression model. Central Bank approved and praised the methodology.",
  em: "Brazil: 15% interest rates, small private markets, structural equity discounts. Can help reduce US bias in Grok. Jeffrey has EM Fixed Income background (LatAm until 2018).",
  closing: "Jeffrey, I know we have limited time. Is there anything about my background that concerns you, or any question I can address right now?"
};

// ============================================
// EXPORT ALL DATA TO WINDOW OBJECT
// ============================================

window.appData = {
  vicioPoliceWords,
  keyPhrases,
  flashcardsData,
  pitchPrompts,
  objections,
  randomPillData,
  preFlightChecklist,
  miniStories
};

// Também expor individualmente para compatibilidade com código existente
window.vicioPoliceWords = vicioPoliceWords;
window.keyPhrases = keyPhrases;
window.flashcardsData = flashcardsData;
window.pitchPrompts = pitchPrompts;
window.objections = objections;
window.randomPillData = randomPillData;
window.preFlightChecklist = preFlightChecklist;
window.miniStories = miniStories;

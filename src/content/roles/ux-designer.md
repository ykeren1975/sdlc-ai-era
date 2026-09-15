---
title: UX/UI Designer
order: 30
icon: pen-tool
summary: AI speeds up research analysis, UI drafts and working prototypes, so design judgement, real-user research and defining good output for AI features matter more than producing screens.
tagline: AI speeds up drafts; design judgement and real research matter more
lastReviewed: 2026-09-14
sdlcPhases:
  - plan
  - design
  - build
  - test
shifts:
  - phase: plan
    activity: Analysing user research
    headline: Let AI speed up transcripts and summaries, but never rely on it for all analysis
    traditional: Designers and researchers transcribed sessions, tagged notes and grouped observations into themes by hand, often on sticky notes or in spreadsheets.
    aiEra: Nielsen Norman Group (article from 2024, reviewed January 2026) finds AI currently most helpful in the planning and analysis stages of research, and suggests AI transcription, summarisation and coding features to speed up the initial steps of analysis. It warns never to rely on AI for all of the analysis, and says context-informed questions, such as whether the interviewer accidentally primed a participant, are beyond the capacity of current AI tools.
    sourceIds:
      - nng-research-with-ai
  - phase: plan
    activity: Learning about users before a study
    headline: "One study: designers said AI personas should complement, not replace, real users"
    traditional: Designers relied on desk research, stakeholder knowledge and pilot sessions to prepare, then learned from real participants in interviews and usability tests.
    aiEra: In one study, eight professional UX designers (a small sample, the authors note) used a voice-based persona built on GPT-4, a simulated fictional user, for user research, ideation and prototype evaluation. The authors found it could speed up information gathering, inspire design solutions and give rapid user-like feedback. The designers raised concerns about biases, over-optimism, authenticity without real stakeholder input, and the persona's inability to fully replicate the nuances of human interaction, and emphasised that such personas should complement, not replace, real user engagement.
    sourceIds:
      - deep-interactive-virtual-personas
  - phase: design
    activity: Producing UI layouts and screens
    headline: NN/g expects anyone to make decent-looking UI; judgement isn't easy to automate
    highlight: true
    traditional: Designers built wireframes and high-fidelity screens by hand, assembling components from a design system.
    aiEra: NN/g expects that as AI design tools improve, anyone will be able to make a decent-looking UI, at least from a distance, while curated taste, research-informed contextual understanding, critical thinking and careful judgment are not easy to automate. In one case study, a three-person university team gave v0 and Bolt.new a conceptual data structure and a design goal, and got diverse layout alternatives, including an interaction pattern the team had not explored. The authors warn that generative UI can lead a team to unintentionally converge on conventional design patterns.
    sourceIds:
      - nng-state-of-ux-2026
      - li-vibe-coding-ucd-case-study
  - phase: design
    activity: Prototyping and testing complex interactions
    headline: Build a working prototype from a detailed prompt and test with users earlier
    highlight: true
    traditional: Clickable prototypes were usually linked static screens, which made complex interactions hard to test with users before engineers built them.
    aiEra: NN/g reports that tools like Cursor, v0 and Figma Make can take a detailed prompt and return a working, interactive prototype, so designers can create a realistic one in a day and test with users earlier. The tools don't inherently understand content layout or visual hierarchy, so the design decisions remain the designer's, and the first output probably won't get everything right.
    sourceIds:
      - nng-test-earlier-with-ai
  - phase: build
    activity: Working with developers
    headline: "Case study: AI code from screenshots matched static designs, not interactions"
    traditional: Designers handed off specs, redlines and design files, and developers turned them into code.
    aiEra: In one case study, a three-person university team, whose members each worked as designer, developer and researcher, uploaded screenshots of Figma frames to v0 and Bolt.new to generate code. The results reproduced the designs accurately as static web pages but did not correctly implement the desired interactions, and the tools' Figma connections required each design on a separate page. The authors, who used the tools mainly for design probes and prototypes, say incorporating AI-generated code directly into development demands careful consideration and rigorous testing.
    sourceIds:
      - li-vibe-coding-ucd-case-study
  - phase: design
    activity: Designing AI-powered features
    headline: Design AI features for trust, with transparency, control and help when they fail
    traditional: Designers mapped out fixed screens, flows and states that behaved the same way each time.
    aiEra: NN/g observes that in many products people spend less time navigating the UI and more time delegating to a layer sitting on top of it. It expects trust to be a major design problem for AI experiences in 2026, growing as AI agents are rolled out, often before they're ready. It names transparency, control, consistency and support when the system fails as the fundamentals.
    sourceIds:
      - nng-state-of-ux-2026
  - phase: test
    activity: Defining what good output looks like
    headline: Define what good AI output looks like instead of specifying exact behaviours
    highlight: true
    traditional: Designers wrote specs describing exact behaviours, and engineering and QA checked that the build matched them.
    aiEra: NN/g's Adam Elman points out that in AI-powered systems the AI makes design decisions about what to include in a response and how to phrase it. He argues designers should reframe their task from specifying exact behaviours to defining what "good" looks (and doesn't look) like, so engineering and data-science partners can evaluate the model against the design intent. That definition still comes from user research and design expertise. In his own team's practice, the process starts with judging criteria for whether a model output is acceptable.
    sourceIds:
      - nng-ai-era-critique
tools:
  - tool: figma
    useFor: Core design tool, with an AI agent in beta for generating design directions and bulk edits, and an MCP server that lets AI agents read your designs.
    recommendation: should
  - tool: figma-make
    useFor: Turning a detailed prompt into a working, interactive prototype for early user testing.
    recommendation: could
    sourceIds:
      - nng-test-earlier-with-ai
  - tool: v0
    useFor: Generating an interactive prototype from a detailed prompt.
    recommendation: could
    sourceIds:
      - nng-test-earlier-with-ai
  - tool: cursor
    useFor: Building a working, interactive coded prototype from a detailed prompt and refining it.
    recommendation: could
    sourceIds:
      - nng-test-earlier-with-ai
  - tool: dovetail
    useFor: Keeping interviews and usability sessions in one place and using AI to suggest themes that you then check against the raw data.
    recommendation: could
  - tool: chatgpt
    useFor: General AI assistant for planning studies, drafting interview guides and UX copy, and critiquing your own work.
    recommendation: should
  - tool: claude
    useFor: General AI assistant for planning studies, working through long research notes and drafting evaluation criteria for AI features.
    recommendation: could
  - tool: axe-devtools
    useFor: Checking prototypes and built UI against WCAG in the browser, with a free automated tier.
    recommendation: could
skills:
  new:
    - Writing detailed prompts and context for AI design and prototyping tools
    - Curating research and design standards as context for AI
    - Writing judging criteria for AI feature output
    - Designing for trust and failure in AI features
  amplified:
    - Research with real users
    - Design critique and judgement
    - Qualitative analysis and checking AI summaries against raw data
    - Interaction design and visual hierarchy
    - Accessibility knowledge
    - Working closely with developers
  lessImportant:
    - Assembling standard screens from components by hand
    - Building linked static screens to fake complex interactions
    - Manual transcription of research sessions
risks:
  - headline: A polished AI prototype can hide design problems, NN/g warns
    highlight: true
    text: "A polished AI prototype can hide design problems. NN/g warns that AI-generated prototypes may look complete while using the wrong design pattern, creating a confusing hierarchy or repeating elements unnecessarily."
    sourceIds:
      - nng-test-earlier-with-ai
  - headline: An AI persona tended to agree uncritically with design proposals, one study found
    text: "Simulated users can be over-optimistic. In one study of eight UX designers using a GPT-4 persona, the authors found it showed a consistent tendency to agree uncritically with design proposals, suppressing critical feedback and potentially misleading designers towards unviable design directions."
    sourceIds:
      - deep-interactive-virtual-personas
  - headline: AI coding assistants may not make UI accessible on their own, a small study found
    text: "AI coding assistants may not make UI accessible on their own. A CHI 2025 formative study using GitHub Copilot, with 16 developers without accessibility training (almost all students), found three issues in AI-assisted coding: not prompting the AI for accessibility, omitting manual steps such as replacing placeholder attributes, and being unable to verify compliance."
    sourceIds:
      - codea11y-chi-2025
  - headline: Prototyping with real product data can expose personal information
    text: "Prototyping with real product data can expose personal information. NN/g advises following your organisation's data policies, not uploading personally identifiable information, and reviewing how the AI tool's vendor could use your data."
    sourceIds:
      - nng-test-earlier-with-ai
  - headline: Surface-level UI work is exposed to automation, NN/g writes
    text: "Surface-level UI work is exposed to automation. NN/g writes that if you're just slapping together components from a design system, you're already replaceable by AI, and that entry-level UX positions remain scarce and highly competitive."
    sourceIds:
      - nng-state-of-ux-2026
  - headline: Relying on AI may erode design skills, a concern UX practitioners raised in one analysis
    text: "Relying on AI may erode design skills. In one analysis of over 120 articles and discussions from UX-focused subreddits, practitioners were optimistic about AI reducing repetitive work but also raised concerns about over-reliance, cognitive offloading and the erosion of critical design skills. The authors note the data are self-reported opinions, not interviews or controlled studies."
    sourceIds:
      - shukla-ironies-ai-assisted-design
first30Days:
  - Check your company's AI policy for which design and prototyping tools you may use and what research or product data may go into them.
  - Pick one complex interaction on your roadmap, build a working prototype of it with an approved AI tool, and test it with five real users.
  - Run AI analysis on a study you have already analysed by hand, and compare its themes with yours, noting what it missed or got wrong.
  - Write down the design standards, research findings and patterns an AI tool would need to produce on-brand screens for your product, and try them as context.
  - If your product has an AI feature, read a sample of real outputs with engineering and draft pass/fail judging criteria together.
agentSkills:
  - skill: frontend-design
    useFor: "Guiding an agent toward intentional visual design, typography and aesthetic direction when it builds UI."
  - skill: figma-implement-design
    useFor: "Translating a Figma design into application code that matches it."
starterSkills:
  - research-synthesis-check
  - ai-prototype-brief
  - ai-feature-trust-states
sources:
  - id: nng-research-with-ai
    title: Accelerating Research with AI
    publisher: Nielsen Norman Group (Kate Moran and Maria Rosala)
    url: https://www.nngroup.com/articles/research-with-ai/
    published: 2024-09-27
    accessed: 2026-09-14
    type: practitioner
    vendorAffiliated: true
    quote: That level of complex, context-informed consideration is beyond the capacity of current AI tools.
  - id: nng-state-of-ux-2026
    title: "State of UX 2026: Design Deeper to Differentiate"
    publisher: Nielsen Norman Group (Kate Moran, Raluca Budiu and Sarah Gibbons)
    url: https://www.nngroup.com/articles/state-of-ux-2026/
    published: 2026-01-16
    accessed: 2026-09-14
    type: practitioner
    vendorAffiliated: true
    quote: In 2026, trust will be a major design problem for AI experiences. This challenge will only grow as more and more AI agents are rolled out, often before they're ready.
  - id: nng-test-earlier-with-ai
    title: Test Complex Interactions Earlier with AI Prototyping
    publisher: Nielsen Norman Group (Megan Chan)
    url: https://www.nngroup.com/articles/test-earlier-with-ai/
    published: 2026-09-11
    accessed: 2026-09-14
    type: practitioner
    vendorAffiliated: true
    quote: AI tools bring speed to the design process, enabling designers to create a realistic working prototype in a day.
  - id: nng-ai-era-critique
    title: "The Core Skill of Design in the AI Era: Critique"
    publisher: Nielsen Norman Group (Adam Elman)
    url: https://www.nngroup.com/articles/ai-era-critique/
    published: 2026-06-12
    accessed: 2026-09-14
    type: practitioner
    vendorAffiliated: true
    quote: If we reframe our task as designers from specifying exact behaviors to defining what "good" looks (and doesn't look) like, we can create mechanisms by which our engineering and data-science partners can evaluate how closely the model's behavior adheres to our intentions.
  - id: codea11y-chi-2025
    title: "CodeA11y: Making AI Coding Assistants Useful for Accessible Web Development"
    publisher: arXiv (Mowar, Peng, Wu, Steinfeld and Bigham; CHI 2025)
    url: https://arxiv.org/abs/2502.10884
    published: 2025-02-15
    accessed: 2026-09-14
    type: research
    vendorAffiliated: false
    quote: "Our formative study with 16 developers without accessibility training revealed three key issues in AI-assisted coding: failure to prompt AI for accessibility, omitting crucial manual steps like replacing placeholder attributes, and the inability to verify compliance."
  - id: deep-interactive-virtual-personas
    title: '"She was useful, but a bit too optimistic": Augmenting Design with Interactive Virtual Personas'
    publisher: arXiv (Deep, Bharadhidasan, Kocaballi; International Journal of Human-Computer Studies 2025)
    url: https://arxiv.org/abs/2508.19463v2
    published: 2025-09-26
    accessed: 2026-09-15
    type: research
    vendorAffiliated: false
    quote: Our participants emphasised that IVPs should be viewed as a complement to, not a replacement for, real user engagement.
  - id: li-vibe-coding-ucd-case-study
    title: 'User-Centered Design with AI in the Loop: A Case Study of Rapid User Interface Prototyping with "Vibe Coding"'
    publisher: arXiv (Li, Maheshwari, Voelker; ACM Collective Intelligence 2025)
    url: https://arxiv.org/html/2507.21012v1
    published: 2025-07-28
    accessed: 2026-09-15
    type: research
    vendorAffiliated: false
    quote: The results transformed the design accurately with static web pages, but did not correctly implement the desired interactions.
  - id: shukla-ironies-ai-assisted-design
    title: "De-skilling, Cognitive Offloading, and Misplaced Responsibilities: Potential Ironies of AI-Assisted Design"
    publisher: arXiv (Shukla, Bui, Levy, Kowalski, Baigelenov, Parsons; CHI 2025 Extended Abstracts)
    url: https://arxiv.org/html/2503.03924v1
    published: 2025-03-05
    accessed: 2026-09-15
    type: research
    vendorAffiliated: false
    quote: Our findings indicate that while practitioners express optimism about AI reducing repetitive work and augmenting creativity, they also highlight concerns about over-reliance, cognitive offloading, and the erosion of critical design skills.
---

A typical week now has less time spent pushing pixels and more time directing and checking. You might generate several layout directions or a working prototype of a tricky interaction in a day, then spend the rest of the week putting it in front of real users and fixing the hierarchy and pattern choices the tool got wrong. Research sessions come back transcribed and pre-tagged, but you still reread the raw notes before a theme goes into a deck, and an AI persona is a warm-up for talking to real users, not a stand-in for them.

More of the week is shared with developers. You may edit the coded prototype yourself, or sit with an engineer while an agent reads your design file. If your product has AI features, part of the job is deciding what users see when the feature is unsure or fails, and writing down what a good response looks like so the team can test against it. Accessibility checks move earlier, because AI-built UI can look finished long before anyone has tried it with a keyboard or screen reader.

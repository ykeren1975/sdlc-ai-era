---
title: Product Manager / Owner
order: 10
icon: compass
summary: AI drafts documents and builds quick prototypes, so deciding what to build becomes the constraint. User empathy, fast judgement and defining quality for AI features matter more.
tagline: AI drafts and prototypes, so deciding what to build is the constraint
lastReviewed: 2026-09-14
sdlcPhases:
  - plan
  - requirements
  - design
  - build
  - test
shifts:
  - phase: requirements
    activity: Writing PRDs and product documentation
    headline: In Atlassian's survey, documentation is among the most common AI uses
    highlight: true
    traditional: Product managers wrote requirement documents, user stories and presentations by hand, then refined them with design and engineering.
    aiEra: Atlassian's State of Product 2026 found product documentation among the most common AI use cases on product teams.
    sourceIds:
      - atlassian-state-of-product-2026
  - phase: design
    activity: Communicating a product idea
    headline: "One study: participants said AI let teams prototype without sequential handoffs"
    highlight: true
    traditional: Ideas were described in documents and slides, and turning them into mockups or clickable prototypes usually depended on a designer or engineer.
    aiEra: In one interview study of 22 product team members, the authors describe vibe coding as team members expressing intent in natural language while AI translates it into functional prototypes and code. The two product managers in the study created early prototypes for features and interaction flows using Replit, V0 and Lovable. Participants reported that AI let individuals explore ideas on their own before engaging others, so designers, engineers and product managers could iterate on prototypes without relying on sequential handoffs.
    sourceIds:
      - li-vibe-coding-product-teams
  - phase: build
    activity: Moving from a validated prototype to a real product
    headline: "Cagan: prototypes are for learning; products must also handle scale and security"
    traditional: Discovery produced specs, designs and prototypes that engineers then built into the product.
    aiEra: Marty Cagan separates discovery, where teams are "building to learn", from delivery, where they are "building to earn". A learning prototype may cover just a few important use cases. A commercial product often has dozens or hundreds, and must also handle reliability, telemetry, performance at scale, data security and compliance. In one interview study of product team members, participants said vibe coding works well for early-stage prototyping, but breakdowns emerge as projects move toward production, where reliability, integration and coordination become critical.
    sourceIds:
      - svpg-prototypes-vs-products
      - li-vibe-coding-product-teams
  - phase: plan
    activity: Understanding customer needs
    headline: One PM team replaced a research cycle with an agent synthesising feedback
    traditional: Product managers read interview notes, support tickets and survey comments themselves, or waited for a scheduled research study to summarise them.
    aiEra: At Atlassian, one PM team replaced a two-week research cycle with an agent that synthesised support data, NPS feedback and in-product behaviour.
    sourceIds:
      - atlassian-product-craft
  - phase: plan
    activity: Deciding what to build
    headline: Deciding what to build may become the bottleneck as agents speed up coding
    traditional: Roadmaps and prioritisation were planned around limited engineering capacity.
    aiEra: Andrew Ng argues that agentic coding speeds up writing software to a given specification, so deciding what to build becomes the bottleneck, especially in early-stage projects. He values PMs with high user empathy who can make product decisions quickly. Atlassian's State of Product 2026 found that AI is not yet helping with prioritisation and planning.
    sourceIds:
      - ng-pm-bottleneck
      - atlassian-state-of-product-2026
  - phase: test
    activity: Defining quality for AI features
    headline: LLM evaluators need human validation; Husain and Shankar suggest expert grading
    highlight: true
    traditional: Product managers wrote acceptance criteria, and testers checked that features behaved as specified.
    aiEra: A 2024 study notes that LLMs are increasingly used to help humans evaluate LLM outputs, but LLM-generated evaluators inherit the problems of the LLMs they evaluate and need further human validation. In its qualitative study with nine industry practitioners, users needed criteria to grade outputs, but grading outputs helped them define those criteria. For most small and medium-size companies, Hamel Husain and Shreya Shankar recommend one principal domain expert, in many situations the product manager, who reviews a representative set of around 100 user interactions and gives each a pass/fail judgement and critique.
    sourceIds:
      - shankar-evalgen-validators
      - husain-shankar-eval-systems
tools:
  - tool: chatgpt
    useFor: General AI assistant for drafting PRDs, presentations and research summaries, and for simple prototypes in chat.
    recommendation: should
  - tool: claude
    useFor: General AI assistant for drafting and critiquing documents, analysing uploaded material, and simple prototypes in chat.
    recommendation: could
  - tool: figma-make
    useFor: Turning a prompt and existing design context into an interactive prototype.
    recommendation: could
    sourceIds:
      - svpg-prototypes-vs-products
  - tool: lovable
    useFor: Creating early prototypes of features and interaction flows from a prompt.
    recommendation: could
    sourceIds:
      - li-vibe-coding-product-teams
      - svpg-prototypes-vs-products
  - tool: v0
    useFor: Creating early prototypes of features and interaction flows from a prompt.
    recommendation: could
    sourceIds:
      - li-vibe-coding-product-teams
  - tool: dovetail
    useFor: Collecting interviews, calls, surveys and feedback in one place and using AI to find themes, with links back to the source material.
    recommendation: could
  - tool: braintrust
    useFor: Building eval datasets, scoring AI feature output with code, LLM judges or humans, and comparing prompt or model versions.
    recommendation: could
skills:
  new:
    - Writing evals and pass/fail criteria for AI features
    - Reviewing real AI interactions to find failure modes
    - Building throwaway prototypes with AI tools
    - Choosing which AI tool fits which prototyping task
  amplified:
    - User empathy
    - Making product decisions quickly
    - Synthesising customer insight from many sources
    - Data literacy
    - Systems and strategic thinking
    - Explaining the gap between a prototype and a shippable product
  lessImportant:
    - Drafting long PRDs from a blank page
    - Building slides and first-draft roadmap documents by hand
    - Waiting on design or engineering for a first clickable mockup
risks:
  - headline: A polished prototype can hide how much work a real product takes
    highlight: true
    text: A polished prototype can hide how much work a real product takes. Marty Cagan notes that some product managers "embarrass themselves in front of their engineers" by assuming the leap is easy.
    sourceIds:
      - svpg-prototypes-vs-products
  - headline: In one PM study, uncertainty and diffused responsibility held back ethical AI use
    text: Uncertainty and diffused responsibility can hold back responsible AI use. In a study drawing on twenty-five interviews and a global survey of over three hundred respondents in product management-related roles, uncertainty around responsible AI and a sense of diffused responsibility constrained ethical action, while leadership commitment and organisational principles enabled it.
    sourceIds:
      - smith-guardrails-gatekeepers
  - headline: Time saved is not the same as better decisions
    text: Time saved is not the same as better decisions. Atlassian found the most common AI uses are routine tasks and documentation, while AI is not yet helping with prioritisation or planning.
    sourceIds:
      - atlassian-state-of-product-2026
  - headline: Trying a few prompts by hand does not show how an AI feature fails
    text: Trying a few prompts by hand does not show how an AI feature fails. Husain and Shankar argue you cannot know what to measure until you systematically find out how the product fails in specific contexts.
    sourceIds:
      - husain-shankar-eval-systems
  - headline: In Atlassian's survey, integration, trust in AI output and data security held teams back
    text: Product teams in Atlassian's survey named integration challenges, trust in AI outputs and data security concerns as barriers holding them back.
    sourceIds:
      - atlassian-state-of-product-2026
first30Days:
  - Check your company's AI policy for which tools you may use and what customer data may go into them.
  - Use an approved AI assistant to draft your next PRD or one-pager, then compare the draft against what you would have written and note what it missed.
  - Build one throwaway prototype of an idea on your roadmap and show it to three customers before writing the full spec.
  - Take a recent AI summary of customer feedback and spot-check a sample of its claims against the original tickets or transcripts.
  - If your product has an AI feature, read about 100 real interactions, write down what went wrong, and agree pass/fail criteria with engineering.
agentSkills:
  - skill: doc-coauthoring
    useFor: "Co-writing PRDs, proposals and decision docs in a structured, iterative workflow."
  - skill: notion-spec-to-implementation
    useFor: "Turning a PRD in Notion into an implementation plan with tasks and progress tracking."
  - skill: pptx
    useFor: "Creating and editing slide decks for reviews and roadmap presentations."
starterSkills:
  - customer-feedback-synthesis
  - ai-feature-eval-criteria
  - prototype-to-product-gap
sources:
  - id: atlassian-state-of-product-2026
    title: "The State of Product in 2026: Navigating Change, Challenge, and Opportunity"
    publisher: Atlassian
    url: https://www.atlassian.com/blog/announcements/state-of-product-2026
    published: 2025-09-03
    accessed: 2026-09-14
    type: survey
    vendorAffiliated: true
    quote: AI isn't yet helping with the complex, high-value work product teams crave, like prioritization, planning, and advanced analytics.
  - id: atlassian-product-craft
    title: "The future of product craft: Why AI-native PMs build better products"
    publisher: Atlassian (Tim Lelek)
    url: https://www.atlassian.com/blog/how-we-build/the-future-of-product-craft
    published: 2026-05-28
    accessed: 2026-09-14
    type: vendor
    vendorAffiliated: true
    quote: Across our product teams, prototyping has shifted from a specialist skill to a default starting point.
  - id: svpg-prototypes-vs-products
    title: Prototypes vs Products
    publisher: Silicon Valley Product Group (Marty Cagan)
    url: https://www.svpg.com/prototypes-vs-products/
    published: 2025-11-07
    accessed: 2026-09-14
    type: practitioner
    vendorAffiliated: true
  - id: husain-shankar-eval-systems
    title: Building eval systems that improve your AI product
    publisher: Lenny's Newsletter (Hamel Husain and Shreya Shankar)
    url: https://www.lennysnewsletter.com/p/building-eval-systems-that-improve
    published: 2025-09-09
    accessed: 2026-09-14
    type: practitioner
    vendorAffiliated: true
    quote: In many situations, the product manager is the principal domain expert.
  - id: ng-pm-bottleneck
    title: How to Get Through the Product Management Bottleneck
    publisher: DeepLearning.AI, The Batch (Andrew Ng)
    url: https://www.deeplearning.ai/the-batch/how-to-get-through-the-product-management-bottleneck
    published: 2025-07-16
    accessed: 2026-09-14
    type: practitioner
    vendorAffiliated: true
    quote: I increasingly value product managers (PMs) who have very high user empathy and can make product decisions quickly, so the speed of product decision-making matches the speed of coding.
  - id: smith-guardrails-gatekeepers
    title: "Guardrails versus Gatekeepers: Understanding Product Managers' Ethical Decision-Making in Generative AI"
    publisher: arXiv (Smith, Luka, Osborne, Lattimore, Newman, Mittelstadt, Nonnecke; FAccT 2026)
    url: https://arxiv.org/abs/2501.16531v2
    published: 2026-06-09
    accessed: 2026-09-15
    type: research
    vendorAffiliated: false
    quote: We find that uncertainty around responsible AI and a sense of diffused responsibility constrain ethical action, while leadership commitment and organizational principles enable ethical action
  - id: li-vibe-coding-product-teams
    title: "Vibe Coding in Product Teams: Reconfiguring AI-Assisted Workflows, Prototyping, and Collaboration"
    publisher: arXiv (Li, Hou, Lin, Zhu, Cao, El Ali; CHIWORK 2026)
    url: https://arxiv.org/html/2509.10652v3
    published: 2026-05-01
    accessed: 2026-09-15
    type: research
    vendorAffiliated: true
    quote: Participants described that while vibe coding works effectively for early-stage prototyping, breakdowns emerge as projects move toward production, where reliability, integration, and coordination become critical.
  - id: shankar-evalgen-validators
    title: "Who Validates the Validators? Aligning LLM-Assisted Evaluation of LLM Outputs with Human Preferences"
    publisher: arXiv (Shankar, Zamfirescu-Pereira, Hartmann, Parameswaran, Arawjo; UIST 2024)
    url: https://arxiv.org/html/2404.12272v1
    published: 2024-04-18
    accessed: 2026-09-15
    type: research
    vendorAffiliated: false
    quote: Yet LLM-generated evaluators simply inherit all the problems of the LLMs they evaluate, requiring further human validation.
---

A typical week now has less blank-page writing and more checking. You might ask an assistant for a first draft of a one-pager, then spend your time correcting what it got wrong about the customer and the constraints. When an idea is still fuzzy, you build a rough prototype in an afternoon and put it in front of a few customers or your engineers, instead of waiting for a mockup. Feedback summaries arrive faster, but you still open the underlying tickets and transcripts before acting on a theme.

The harder part of the job is the part that did not get faster: choosing what is worth building and saying no to the rest. If your team ships AI features, part of the week goes to reading real interactions, agreeing what counts as a failure and keeping eval criteria up to date with engineering. Prototypes are for learning. Treat the gap between a working demo and a reliable product as real engineering work, and talk about it that way with your team.

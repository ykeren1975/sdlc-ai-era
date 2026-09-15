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
    headline: "One study: high-fidelity AI prototypes helped participants win buy-in faster"
    highlight: true
    traditional: Ideas were described in documents and slides, and turning them into mockups or clickable prototypes usually depended on a designer or engineer.
    aiEra: In one CHI 2026 study of how technical and non-technical people build products with AI tools (a survey of 85 people, plus interviews with 31 hackathon participants and 8 practitioners), participants said teams could now assemble working front-end versions in hours. They described a shift toward throw-away prototypes, valued for immediate exploration or demonstration. Participants used prototypes built with tools such as Lovable to persuade customers, investors and partners. The authors conclude that the unusually high fidelity of these early prototypes helped participants secure buy-in from stakeholders much faster than with traditional methods such as wireframes or paper prototypes.
    sourceIds:
      - kobiella-genai-prototyping-skill-levels
  - phase: build
    activity: Moving from a validated prototype to a real product
    headline: "Cagan: prototypes are for learning; products must also handle scale and security"
    traditional: Discovery produced specs, designs and prototypes that engineers then built into the product.
    aiEra: Marty Cagan separates discovery, where teams are "building to learn", from delivery, where they are "building to earn". A learning prototype may cover just a few important use cases. A commercial product often has dozens or hundreds, and must also handle reliability, telemetry, performance at scale, data security and compliance. In one study of people building products with AI tools, deployment and long-term maintainability still depended on technical expertise, and non-technical users consistently hit barriers when moving beyond prototyping. Participants noted that adding features was simple, but modifying or removing them proved far more complex than building something new.
    sourceIds:
      - svpg-prototypes-vs-products
      - kobiella-genai-prototyping-skill-levels
  - phase: plan
    activity: Understanding customer needs
    headline: "One study: LLMs sorted feedback; their specs sometimes fabricated requirements"
    traditional: Product managers read interview notes, support tickets and survey comments themselves, or waited for a scheduled research study to summarise them.
    aiEra: In one 2025 study, five lightweight open-source LLMs classified app store reviews by request type and non-functional requirement with moderate-to-high accuracy. They also generated requirement specifications that were generally complete and coherent but often verbose and sometimes included fabricated requirements; one evaluator rated these, and the authors note a limited sample and call their results exploratory. The authors warn that moderate accuracy may produce noisy classifications that mislead analysts, so important feedback can be missed, and conclude that these models still require human oversight.
    sourceIds:
      - mallya-llm-user-feedback-requirements
  - phase: plan
    activity: Deciding what to build
    headline: Deciding what to build may become the bottleneck as agents speed up coding
    traditional: Roadmaps and prioritisation were planned around limited engineering capacity.
    aiEra: Andrew Ng argues that agentic coding speeds up writing software to a given specification, so deciding what to build becomes the bottleneck, especially in early-stage projects. He values PMs with high user empathy who can make product decisions quickly. Atlassian's State of Product 2026 found that AI is not yet helping with prioritisation and planning. In one CHI 2026 study of people building products with AI tools, the authors argue that discovery and problem definition remain indispensable, and that tools promising instant results amplify the temptation to skip these early stages.
    sourceIds:
      - ng-pm-bottleneck
      - atlassian-state-of-product-2026
      - kobiella-genai-prototyping-skill-levels
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
    useFor: Generating high-fidelity prototypes from a prompt to explore an idea or show it to stakeholders.
    recommendation: could
    sourceIds:
      - kobiella-genai-prototyping-skill-levels
      - svpg-prototypes-vs-products
  - tool: v0
    useFor: Generating web app prototypes from natural-language prompts.
    recommendation: could
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
  - id: shankar-evalgen-validators
    title: "Who Validates the Validators? Aligning LLM-Assisted Evaluation of LLM Outputs with Human Preferences"
    publisher: arXiv (Shankar, Zamfirescu-Pereira, Hartmann, Parameswaran, Arawjo; UIST 2024)
    url: https://arxiv.org/html/2404.12272v1
    published: 2024-04-18
    accessed: 2026-09-15
    type: research
    vendorAffiliated: false
    quote: Yet LLM-generated evaluators simply inherit all the problems of the LLMs they evaluate, requiring further human validation.
  - id: kobiella-genai-prototyping-skill-levels
    title: "From Throw-Away to Takeaway: How GenAI and Vibe Coding Accelerate Prototyping Across Technical Skill Levels"
    publisher: ACM CHI 2026 (Kobiella, Breidenstein, Schmidt; CDTM and LMU Munich)
    url: https://dl.acm.org/doi/10.1145/3772318.3790757
    published: 2026-04-13
    accessed: 2026-09-15
    type: research
    vendorAffiliated: false
    quote: This shows that prototypes were not only used as internal design artifacts but also as persuasive tools, and, with GenAI, their unusually high fidelity at an early stage enabled participants to build credibility and secure buy-in from stakeholders much faster than with traditional methods such as wireframes or paper prototypes.
  - id: mallya-llm-user-feedback-requirements
    title: "From Online User Feedback to Requirements: Evaluating Large Language Models for Classification and Specification Tasks"
    publisher: arXiv (Mallya, Ferrari, Zadenoori, Dąbrowski; University of Limerick, UCD, University of Padova)
    url: https://arxiv.org/html/2510.23055v1
    published: 2025-10-27
    accessed: 2026-09-15
    type: research
    vendorAffiliated: false
    quote: Generated specifications were generally complete and coherent but often verbose and sometimes included fabricated requirements.
---

A typical week now has less blank-page writing and more checking. You might ask an assistant for a first draft of a one-pager, then spend your time correcting what it got wrong about the customer and the constraints. When an idea is still fuzzy, you build a rough prototype in an afternoon and put it in front of a few customers or your engineers, instead of waiting for a mockup. Feedback summaries arrive faster, but you still open the underlying tickets and transcripts before acting on a theme.

The harder part of the job is the part that did not get faster: choosing what is worth building and saying no to the rest. If your team ships AI features, part of the week goes to reading real interactions, agreeing what counts as a failure and keeping eval criteria up to date with engineering. Prototypes are for learning. Treat the gap between a working demo and a reliable product as real engineering work, and talk about it that way with your team.

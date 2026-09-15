---
title: Software Architect
order: 40
icon: layers
summary: AI speeds up documentation, codebase analysis and code output, so architects spend more time encoding constraints that agents can check, designing LLM components and keeping the team's understanding current.
tagline: Encode constraints agents check; keep team understanding current
lastReviewed: 2026-09-14
sdlcPhases:
  - plan
  - design
  - build
  - test
  - operate
shifts:
  - phase: design
    activity: Documenting the architecture with diagrams and decision records
    headline: "One study: developers rated LLM-made architecture docs useful; diagrams limited"
    traditional: Architects drew diagrams and wrote architecture decision records (ADRs) by hand, and keeping them in step with the running system was a manual, often neglected task.
    aiEra: In one study, the authors' LLM-based workflow (CIAO, using GPT-5 by default) generated system-level architecture documentation from GitHub repositories, following a template derived from ISO/IEC/IEEE 42010, SEI Views & Beyond and the C4 model. The 22 developers who each reviewed documentation for a repository they had contributed to, mostly from academic settings, generally perceived it as valuable, comprehensible and broadly accurate, while highlighting limitations in diagram quality, high-level context modelling and deployment views. The study measured perceptions rather than objective architectural correctness. A 2025 literature review found the use of GenAI tools in software architecture predominantly oriented towards documentation and code generation.
    sourceIds:
      - deluca-ciao-architecture-docs
      - esposito-genai-software-architecture
  - phase: design
    activity: Testing design ideas and trade-offs
    headline: "A review: AI is studied most for architecture decisions; few trade-off examples"
    traditional: Architects tested ideas in design reviews, whiteboard sessions and conversations with senior colleagues.
    aiEra: A multivocal literature review of 46 papers (36 peer-reviewed and 10 grey literature), searched in February 2025, found architectural decision support was the purpose most frequently investigated for generative AI in software architecture. Most studies involved some form of human interaction with the model, which the authors read as fully autonomous AI-driven architectural decisions not yet being prevalent. They conclude that GenAI's integration into complex, high-stakes architectural decision-making remains limited, with few examples addressing system-level reasoning or trade-off analysis, and that rigorous testing of GenAI outputs was typically missing from the studies.
    sourceIds:
      - esposito-genai-software-architecture
  - phase: design
    activity: Designing systems that include LLM components
    headline: "InfoQ: RAG is common but takes effort, and agents need ongoing testing"
    traditional: Architects designed for deterministic components, where the same input gives the same output and conventional tests can confirm behaviour.
    aiEra: InfoQ's 2025 architecture trends report calls RAG the most common technique for getting higher-quality results from an LLM, notes that effective implementation still requires effort, and says architects are adapting systems to provide data that RAG can consume more easily. It suggests agentic workflows can follow some microservices patterns, with each agent having clearly defined boundaries, and says ongoing testing must be performed as the agent or its possible actions evolve. It says an architect needs to understand how an AI element relates to other parts of the system, including its inputs and outputs and how to measure its performance, scalability and cost.
    sourceIds:
      - infoq-architecture-trends-2025
  - phase: design
    activity: Deciding how AI agents connect to other systems
    headline: Don't default to MCP; a well-designed CLI often gives agents what they need
    traditional: Architects chose integration styles such as APIs, messaging or command-line tools, weighing interoperability against the complexity each layer adds.
    aiEra: Thoughtworks' Technology Radar (Vol. 34, April 2026) cautions against using the Model Context Protocol (MCP) by default. It says MCP adds real value for structured tool contracts, OAuth-based authentication boundaries and governed multi-tenant access, but a well-designed CLI with good help output, structured JSON responses and predictable error handling often gives agents what they need. Teams should first ask whether their system actually requires protocol-level interoperability.
    sourceIds:
      - thoughtworks-radar-mcp-by-default
  - phase: build
    activity: Setting architecture standards for code that AI writes
    headline: Guide agents with prompts and check architecture rules with automated sensors
    takeaway: Prompts can guide agents; hooks can check architecture rules
    highlight: true
    traditional: Standards lived in wiki pages, templates and code review, and architects relied on developers reading and following them.
    aiEra: InfoQ's 2025 trends report says architects are finding ways to provide good prompts that help ensure coding and architectural guidelines are upheld, while tooling for this is not yet at the level of linting or EditorConfig. Birgitta Böckeler describes a harness of guides and sensors around coding agents. One category, "basically" fitness functions, defines and checks the application's architecture characteristics. Among her example sensors is a pre-commit or coding agent hook running ArchUnit tests that check for violations of module boundaries.
    sourceIds:
      - infoq-architecture-trends-2025
      - fowler-harness-engineering
  - phase: test
    activity: Checking that the codebase still matches the intended architecture
    headline: Agents can speed up drift; some teams pair deterministic tools with LLM checks
    takeaway: AI coding agents can speed up drift from the architecture
    highlight: true
    traditional: Architects found drift through periodic reviews, dependency analysis and, where teams had them, architecture tests such as fitness functions.
    aiEra: Thoughtworks' Radar (Vol. 34, ring Assess) warns that AI coding agents can accelerate drift from the intended architecture, as agents and humans copy existing patterns, including degraded ones. Some Thoughtworks teams combine deterministic tools such as Spectral, ArchUnit or Spring Modulith with LLM-powered evaluation to find structural and semantic violations, then use LLMs to help fix them. Their lessons are that initial scans can surface many violations to triage, small agent-produced fixes are easier to review, and an extra verification loop is essential.
    sourceIds:
      - thoughtworks-radar-architecture-drift
  - phase: plan
    activity: Understanding a legacy system before modernising it
    headline: Use AI tools to surface business rules and dependencies in legacy code
    traditional: Architects reverse-engineered legacy systems by reading code, tracing dependencies and interviewing the few people who still knew how they worked.
    aiEra: Thoughtworks moved "using GenAI to understand legacy codebases" to Adopt in Radar Vol. 33 (November 2025), saying its experience across multiple clients shows this is now a practical default rather than an experiment. Tools it names, including Cursor, Claude Code and Copilot, help developers surface business rules, summarise logic and identify dependencies.
    sourceIds:
      - thoughtworks-radar-legacy-codebases
  - phase: operate
    activity: Keeping the team's understanding of the system current
    headline: Storey argues AI can write code faster than teams build shared understanding
    takeaway: Shared understanding may lag behind AI-written code
    highlight: true
    traditional: Shared understanding built up through design discussions, code review and the people who wrote the code staying with the system.
    aiEra: Margaret-Anne Storey argues that as AI generates code faster than teams can understand it, two forms of debt accumulate. Cognitive debt is the erosion of shared understanding across a team, and intent debt is the absence of externalised rationale that developers and AI agents need to work safely with code. She suggests generative AI may reduce technical debt while accelerating both. She proposes treating shared understanding as a deliverable, with time for practices such as walkthroughs and retrospectives, and capturing intent early in ADRs, specifications and decision rationales that ground human understanding and that AI agents will require to do useful work.
    sourceIds:
      - storey-triple-debt
tools:
  - tool: github-copilot
    useFor: Asking questions about an unfamiliar codebase, tracing dependencies and summarising logic. Free tier available.
    recommendation: should
    sourceIds:
      - thoughtworks-radar-legacy-codebases
  - tool: claude-code
    useFor: Exploring a legacy or unfamiliar codebase from the terminal to summarise logic, surface business rules and identify dependencies.
    recommendation: could
    sourceIds:
      - thoughtworks-radar-legacy-codebases
  - tool: cursor
    useFor: Exploring and questioning a codebase in the editor to understand its structure and dependencies.
    recommendation: could
    sourceIds:
      - thoughtworks-radar-legacy-codebases
  - tool: archunit
    useFor: Writing architecture rules as unit tests for Java code, such as layer and module boundaries, and running them in CI or coding agent hooks.
    recommendation: could
    sourceIds:
      - fowler-harness-engineering
      - thoughtworks-radar-architecture-drift
  - tool: chatgpt
    useFor: Talking through design options and trade-offs, and drafting ADRs or architecture summaries for review.
    recommendation: should
  - tool: lucidchart
    useFor: Generating first-draft architecture and flow diagrams from text prompts, then refining them by hand.
    recommendation: could
  - tool: promptfoo
    useFor: Running evals against LLM components, locally or in CI, so design choices such as retrieval settings or model changes can be compared.
    recommendation: could
skills:
  new:
    - Designing RAG and agent components and their evals
    - Writing architecture rules that coding agents can check
    - Deciding when an agent integration needs MCP and when a CLI or API is enough
    - Curating context and instructions that carry architecture guidelines to AI tools
  amplified:
    - Architecture fitness functions and automated conformance checks
    - Trade-off analysis, including cost and latency of AI components
    - Keeping design intent explicit in decision records
    - Legacy system analysis
    - Reviewing AI-drafted documents and diagrams critically
  lessImportant:
    - Drawing diagrams from scratch by hand
    - Writing first drafts of ADRs and summaries from a blank page
    - Reading large legacy codebases line by line to find where things live
risks:
  - headline: "Drift can compound: agents and humans copying degraded patterns can make code worse"
    highlight: true
    text: Drift can compound. Thoughtworks warns that when agents and humans replicate existing patterns, including degraded ones, poor code begets poorer code.
    sourceIds:
      - thoughtworks-radar-architecture-drift
  - headline: A review warns blind trust in AI recommendations risks architectural degradation
    text: Over-trusting AI recommendations can degrade the architecture. A 2025 literature review warns that architectural degradation risks due to overuse or blind trust in AI-generated recommendations necessitate rigorous human oversight and verification processes.
    sourceIds:
      - esposito-genai-software-architecture
  - headline: Automated and LLM-based checks may miss some higher-impact problems, Böckeler notes
    text: Automated checks do not catch everything. Böckeler notes that neither deterministic checks nor LLM-based checks reliably catch some higher-impact problems, such as misdiagnosis of issues, overengineering and unnecessary features, and misunderstood instructions.
    sourceIds:
      - fowler-harness-engineering
  - headline: "Adding protocol layers by default has a cost; Thoughtworks notes each loses fidelity"
    text: Adding protocol layers by default has a cost. Thoughtworks, citing Justin Poehnelt, notes that every protocol layer between an agent and an API loses fidelity, and for complex APIs those losses compound.
    sourceIds:
      - thoughtworks-radar-mcp-by-default
  - headline: Nondeterministic software may not be trusted with key decisions, InfoQ notes
    text: Nondeterministic software may not be trusted with important decisions. InfoQ's 2025 trends report keeps agentic AI an innovator trend because there is a sizable gap for companies to trust nondeterministic software to make important decisions.
    sourceIds:
      - infoq-architecture-trends-2025
first30Days:
  - Check your company's AI policy for which tools may read your repositories, architecture documents and internal data.
  - Pick one module you know poorly and ask an AI coding tool to summarise its dependencies and business rules, then check the answer against the code and a colleague who knows it.
  - Turn one or two important architecture rules, such as a layer or module boundary, into automated checks that run in CI and that coding agents can run too.
  - Write down the architecture guidelines your team's AI tools should follow and put them in the shared instruction files in your repository templates.
  - If your system has an LLM feature, list how it retrieves data, what it costs per request and how it is evaluated, and agree what counts as a failure.
agentSkills:
  - skill: doc-coauthoring
    useFor: "Co-writing technical specs and decision records in a structured, iterative workflow."
  - skill: mcp-builder
    useFor: "Designing an MCP server that exposes a service to agents through well-designed tools."
starterSkills:
  - legacy-module-map
  - architecture-drift-review
  - llm-component-design-review
sources:
  - id: infoq-architecture-trends-2025
    title: InfoQ Software Architecture and Design Trends Report - 2025
    publisher: InfoQ (Thomas Betts, Sarah Wells, Eran Stiller, Daniel Bryant)
    url: https://www.infoq.com/articles/architecture-trends-2025/
    published: 2025-04-28
    accessed: 2026-09-14
    type: news
    vendorAffiliated: false
    quote: Architects are finding ways to provide good prompts which help ensure coding and architectural guidelines are upheld.
  - id: fowler-harness-engineering
    title: Harness engineering for coding agent users
    publisher: martinfowler.com (Birgitta Böckeler)
    url: https://martinfowler.com/articles/harness-engineering.html
    published: 2026-04-02
    accessed: 2026-09-14
    type: practitioner
    vendorAffiliated: true
    quote: A good harness should not necessarily aim to fully eliminate human input, but to direct it to where our input is most important.
  - id: thoughtworks-radar-architecture-drift
    title: Architecture drift reduction with LLMs (Technology Radar Vol. 34)
    publisher: Thoughtworks
    url: https://www.thoughtworks.com/en-us/radar/techniques/architecture-drift-reduction-with-llms
    published: 2026-04-15
    accessed: 2026-09-14
    type: practitioner
    vendorAffiliated: true
    quote: Increased use of AI coding agents can accelerate drift from the intended codebase and architecture designs.
  - id: thoughtworks-radar-mcp-by-default
    title: MCP by default (Technology Radar Vol. 34)
    publisher: Thoughtworks
    url: https://www.thoughtworks.com/en-us/radar/techniques/mcp-by-default
    published: 2026-04-15
    accessed: 2026-09-14
    type: practitioner
    vendorAffiliated: true
    quote: MCP adds real value for structured tool contracts, OAuth-based authentication boundaries and governed multi-tenant access.
  - id: thoughtworks-radar-legacy-codebases
    title: Using GenAI to understand legacy codebases (Technology Radar Vol. 33)
    publisher: Thoughtworks
    url: https://www.thoughtworks.com/en-us/radar/techniques/using-genai-to-understand-legacy-codebases
    published: 2025-11-05
    accessed: 2026-09-14
    type: practitioner
    vendorAffiliated: true
    quote: Our experience across multiple clients shows that GenAI-assisted understanding of legacy systems is now a practical default rather than an experiment.
  - id: esposito-genai-software-architecture
    title: Generative AI for Software Architecture. Applications, Challenges, and Future Directions
    publisher: arXiv (Esposito, Li, Moreschini, Ahmad, Cerny, Vaidhyanathan, Lenarduzzi, Taibi; Journal of Systems and Software)
    url: https://arxiv.org/html/2503.13310v2
    published: 2025-06-27
    accessed: 2026-09-15
    type: research
    vendorAffiliated: false
    quote: Our results reveal that, while GenAI excels at automating tasks grounded in natural language and structured templates, its integration into complex, high-stakes architectural decision-making remains limited.
  - id: deluca-ciao-architecture-docs
    title: "CIAO - Code In Architecture Out - Automated Software Architecture Documentation with Large Language Models"
    publisher: arXiv (De Luca, Santilli, Amalfitano, Fasolino, Pelliccione; ICSA 2026)
    url: https://arxiv.org/html/2604.08293v1
    published: 2026-04-09
    accessed: 2026-09-15
    type: research
    vendorAffiliated: false
    quote: The evaluation shows that developers generally perceive the produced documentation as valuable, comprehensible, and broadly accurate with respect to the source code, while also highlighting limitations in diagram quality, high-level context modeling, and deployment views.
  - id: storey-triple-debt
    title: "From Technical Debt to Cognitive and Intent Debt: Rethinking Software Health in the Age of AI"
    publisher: arXiv (Margaret-Anne Storey)
    url: https://arxiv.org/abs/2603.22106v4
    published: 2026-04-06
    accessed: 2026-09-15
    type: research
    vendorAffiliated: false
    quote: "As AI generates code faster than teams can understand it, two under appreciated forms of debt accumulate: cognitive debt, the erosion of shared understanding across a team, and intent debt, the absence of externalized rationale that developers and AI agents need to work safely with code."
---

A typical week now starts less often from a blank page. You might have an assistant draft a decision record or a diagram from the code, then spend your time correcting what it misread about the constraints and the history behind them. When a team inherits an unfamiliar system, the first pass at mapping its dependencies and business rules can come from an AI tool, but you still check the findings against the code and the people who know it before planning any change.

More of the job is making the architecture checkable. Rules that used to live in a wiki become tests and instruction files that both developers and coding agents run into, and part of the week goes to triaging what those checks find. If your system includes LLM components, design reviews now cover retrieval, evals, cost and latency alongside the usual concerns. The part that did not get faster is making sure the team still understands why the system is shaped the way it is, so treat decision records and design conversations as work that matters more when code arrives quickly.

---
title: Scrum Master / Agile Coach
order: 110
icon: refresh-cw
summary: AI takes on drafting and retro prep, and agents raise questions about cadence and accountability. Facilitating how the team uses AI, keeping humans accountable and protecting quality become core work.
tagline: Facilitate how the team uses AI and keep humans accountable
lastReviewed: 2026-09-14
sdlcPhases:
  - plan
  - requirements
  - build
  - test
shifts:
  - phase: plan
    activity: Facilitating Sprint Planning
    headline: Plan which tasks use AI and set aside time to validate its output
    highlight: true
    traditional: The Scrum Master ensured that Scrum events, including Sprint Planning, took place, were productive and stayed within their timebox.
    aiEra: The AI and Scrum guidance in the Scrum Guide Expansion Pack suggests that Sprint Planning covers which tasks the AI will be used for, and sets aside time to validate AI outputs.
    sourceIds:
      - scrum-guide-2020
      - scrum-expansion-ai
  - phase: plan
    activity: Questioning the cadence
    headline: "AWS's AI-DLC replaces sprints with bolts measured in hours or days"
    traditional: Sprints were fixed-length events of one month or less, to create consistency.
    aiEra: AWS's AI-Driven Development Life Cycle replaces sprints with "bolts", work cycles measured in hours or days rather than weeks. In a debate covered by InfoQ, Steve Jones, executive VP at Capgemini, argued that agentic SDLCs are "too fast for Agile". Agile coach Rolf Läderach countered that Agile is not the Manifesto or frameworks, but about creating adaptive and learning organisations.
    sourceIds:
      - scrum-guide-2020
      - aws-ai-dlc
      - infoq-agile-manifesto-debate
  - phase: requirements
    activity: Facilitating backlog refinement
    headline: "In AWS's AI-DLC, AI drafts requirements and the whole team validates them"
    traditional: Refinement meant breaking down and further defining Product Backlog items into smaller, more precise items.
    aiEra: In AWS's AI-DLC, AI turns business intent into requirements, stories and units of work through "Mob Elaboration", where the entire team validates the AI's questions and proposals. In Stefan Wolpers' survey of 289 agile practitioners, simplifying complex requirements for different audiences and generating first drafts were among the strongest use cases.
    sourceIds:
      - scrum-guide-2020
      - aws-ai-dlc
      - ai4agile-report-2026
  - phase: build
    activity: Running retrospectives
    headline: "Use AI for retro prep, and have the team inspect how AI helped or hindered"
    traditional: The Scrum Master made sure the Sprint Retrospective took place, with the purpose of planning ways to increase quality and effectiveness.
    aiEra: Preparing for Retrospectives and clustering qualitative feedback were among the strongest use cases in Wolpers' survey. The Expansion Pack says the Scrum Master can prompt the team to inspect how AI helped or hindered during the Sprint and identify areas for improvement.
    sourceIds:
      - scrum-guide-2020
      - ai4agile-report-2026
      - scrum-expansion-ai
  - phase: build
    activity: Coaching team working agreements and dynamics
    headline: Agree that AI may generate or perform work, but humans stay accountable
    highlight: true
    traditional: The Scrum Master coached team members in self-management and cross-functionality and caused the removal of impediments to the team's progress.
    aiEra: The Expansion Pack describes working agreements in which AI tools and autonomous agents may generate or perform work, but humans remain accountable. Scrum Masters also keep an eye on over-reliance or under-utilisation. If one team member becomes the "AI guru" and others disengage, the Scrum Master might encourage knowledge sharing or pair programming with AI.
    sourceIds:
      - scrum-guide-2020
      - scrum-expansion-ai
  - phase: build
    activity: Keeping work in small batches
    headline: Keep AI-generated changes small and avoid massive pull requests
    traditional: Teams worked in small batches to shorten feedback loops, test hypotheses quickly and course-correct.
    aiEra: DORA research shows that working in small batches amplifies the positive impact of AI adoption on product performance. DORA notes that AI tools are often optimised for generating large, complete features, and advises avoiding massive pull requests. It adds that reviewing a small chunk of machine-generated code may take more cognitive load per line than reviewing human-written code.
    sourceIds:
      - dora-small-batches
  - phase: test
    activity: Protecting the Definition of Done
    headline: Review AI-generated code as rigorously as a teammate's, and don't skip tests
    highlight: true
    traditional: The Scrum Master helped the team create high-value Increments that meet the Definition of Done. Work that did not meet it could not be considered part of an Increment.
    aiEra: The Expansion Pack says every piece of AI-generated code must be reviewed with the same rigour as if a teammate wrote it. It warns against letting the team sacrifice quality or skip testing in the rush to capitalise on AI speed, because technical debt accumulated now will almost certainly nullify future gains.
    sourceIds:
      - scrum-guide-2020
      - scrum-expansion-ai
  - phase: plan
    activity: Coaching AI adoption across teams
    headline: "Most surveyed agile practitioners use AI, but few had formal training"
    traditional: The Scrum Master led, trained and coached the organisation in its Scrum adoption, and advised on Scrum implementations.
    aiEra: Digital.ai's 18th State of Agile survey (published October 2025), of nearly 350 participants who were primarily agile coaches and consultants at enterprises with over 20,000 employees, found AI adoption rose from 68% to 84%, with 41% implementing tools in a coordinated way across teams. In Wolpers' survey, 83% use AI tools, but 55% spend 10% or less of their work time with AI, and only 15% have had any formal training on using AI in agile contexts.
    sourceIds:
      - scrum-guide-2020
      - digital-ai-state-of-agile-18
      - ai4agile-report-2026
tools:
  - tool: miro
    useFor: Clustering similar retrospective sticky notes into themes by keyword or sentiment with Miro AI.
    recommendation: could
  - tool: parabol
    useFor: Running retrospectives with anonymous input, AI summaries of each topic and the whole meeting (unlimited on paid plans), and AI-suggested groups on paid plans.
    recommendation: could
    sourceIds:
      - parabol-ai-summaries
  - tool: chatgpt
    useFor: General AI assistant for drafting and summarising, for example a first draft of a retrospective plan or workshop agenda.
    recommendation: should
  - tool: claude
    useFor: General AI assistant for drafting and analysing uploaded documents.
    recommendation: could
  - tool: atlassian-rovo
    useFor: Finding context across Jira and Confluence, and using Rovo agents and in-flow suggestions and drafts.
    recommendation: could
  - tool: microsoft-365-copilot
    useFor: Chat, search and agents across the Microsoft 365 apps your team already uses.
    recommendation: could
skills:
  new:
    - Writing working agreements for AI tools and agents
    - Facilitating inspection of how AI helped or hindered
    - Spotting over-reliance, under-use and "AI guru" patterns
    - Picking bounded, low-risk AI uses for facilitation work
    - Checking where AI tools send team input
  amplified:
    - Facilitation
    - Psychological safety and team cohesion
    - Coaching on quality and the Definition of Done
    - Keeping batches small
    - Organisational change coaching
  lessImportant:
    - Grouping and naming sticky notes by hand
    - Writing meeting and retrospective notes from scratch
    - Building workshop agendas and templates from a blank page
risks:
  - text: The Expansion Pack warns of automation bias and complacency, where people over-trust automated systems and become passive in oversight.
    sourceIds:
      - scrum-expansion-ai
  - text: Speed can crowd out quality. The Expansion Pack warns that skipping testing in the rush to capitalise on AI speed builds technical debt that will almost certainly nullify future gains, and DORA advises avoiding massive pull requests when using AI tools.
    sourceIds:
      - scrum-expansion-ai
      - dora-small-batches
  - text: Adoption can run ahead of oversight. Digital.ai's survey, primarily of agile coaches and consultants at large enterprises, found only 49% have governance guardrails in place.
    sourceIds:
      - digital-ai-state-of-agile-18
  - text: Retrospective input may leave your tools. Parabol's AI summaries send reflections, comments and tasks to OpenAI to produce a summary; Parabol says it has asked OpenAI to exclude its data from model training. Check your data policy before switching on AI features in facilitation tools.
    sourceIds:
      - parabol-ai-summaries
  - text: In Wolpers' survey, the most frequently mentioned concerns were the erosion of agile values and principles, the loss of human-centred collaboration, and reduced critical thinking.
    sourceIds:
      - ai4agile-report-2026
first30Days:
  - Check your organisation's AI policy for which tools the team may use and what team or customer data may go into them.
  - Add one question to your next retrospective about where AI helped or hindered during the Sprint, and record what the team agrees to try.
  - Draft a working agreement with the team on which tasks use AI, who reviews AI output, and who stays accountable for it.
  - Look at the size of recent pull requests, and raise it with the team if AI-generated changes are getting harder to review.
  - Use an approved assistant to prepare your next retrospective, then compare its suggested themes with what the team actually raised.
agentSkills:
  - skill: internal-comms
    useFor: "Writing team updates and other internal communications in your organisation's formats."
  - skill: linear
    useFor: "Reading and updating issues, projects and team workflows in Linear."
starterSkills:
  - retro-prep
  - team-ai-working-agreement
  - refinement-session-prep
sources:
  - id: scrum-expansion-ai
    title: AI and Scrum (Scrum Guide Expansion Pack, v2026.1)
    publisher: Scrum Guide Expansion Pack (Ralph Jocham and Jeff Sutherland)
    url: https://scrumexpansion.org/ai-and-scrum/
    published: 2026-01-18
    accessed: 2026-09-14
    quote: They also keep an eye on over-reliance or under-utilization – for example, if one team member becomes the 'AI guru' and others disengage, the Scrum Master might encourage knowledge sharing or pair programming with AI to spread skills.
  - id: scrum-guide-2020
    title: The 2020 Scrum Guide
    publisher: Ken Schwaber and Jeff Sutherland
    url: https://scrumguides.org/scrum-guide.html
    accessed: 2026-09-14
    quote: The purpose of the Sprint Retrospective is to plan ways to increase quality and effectiveness.
  - id: ai4agile-report-2026
    title: The AI4Agile Practitioners Report 2026
    publisher: DZone (Stefan Wolpers)
    url: https://dzone.com/articles/ai4agile-practitioners-report
    published: 2026-02-24
    accessed: 2026-09-14
    quote: "83% of respondents use AI tools. That number sounds impressive until you look closer: 55% spend 10% or less of their work time with AI."
  - id: digital-ai-state-of-agile-18
    title: "Digital.ai's 18th State of Agile Report Marks the Start of the Fourth Wave of Software Delivery: AI Is Transforming Agile from a Team Practice into an Enterprise-Wide Advantage"
    publisher: Digital.ai
    url: https://digital.ai/press-releases/digital-ais-18th-state-of-agile-report-marks-the-start-of-the-fourth-wave-of-software-delivery/
    published: 2025-10-28
    accessed: 2026-09-14
    quote: Yet only 49% have governance guardrails in place, creating risk as automation advances faster than oversight.
  - id: aws-ai-dlc
    title: "AI-Driven Development Life Cycle: Reimagining Software Engineering"
    publisher: AWS DevOps & Developer Productivity Blog (Raja SP)
    url: https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/
    published: 2025-07-31
    accessed: 2026-09-14
    quote: Traditional 'sprints' are replaced by 'bolts' – shorter, more intense work cycles measured in hours or days rather than weeks; Epics are replaced by Units of Work.
  - id: infoq-agile-manifesto-debate
    title: Does AI Make the Agile Manifesto Obsolete?
    publisher: InfoQ (Steef-Jan Wiggers)
    url: https://www.infoq.com/news/2026/02/ai-agile-manifesto-debate
    published: 2026-02-17
    accessed: 2026-09-14
    quote: Agile is not the Manifesto, and it is certainly not about frameworks. Agile is about creating adaptive and learning organisations that can respond to change and deliver outcomes.
  - id: dora-small-batches
    title: "Capabilities: Working in small batches"
    publisher: DORA
    url: https://dora.dev/capabilities/working-in-small-batches/
    published: 2025-12-08
    accessed: 2026-09-14
    quote: DORA research shows that working in small batches amplifies the positive impact of AI adoption on product performance and helps turn AI's neutral effect on organizational friction into a net positive.
  - id: parabol-ai-summaries
    title: AI Summaries FAQ
    publisher: Parabol
    url: https://www.parabol.co/support/ai-summaries-faq/
    accessed: 2026-09-14
    quote: We send reflections, comments, and tasks to OpenAI, and it returns a summary.
---

A typical week still runs on the same events, but the prep work shrinks. You might use an assistant to draft a retrospective format or cluster a pile of feedback, then spend the saved time reading what people actually wrote. Sprint Planning includes a short conversation about which work the team will hand to AI tools or agents, and how much time to set aside to check the results. In refinement, drafts arrive faster, so more of the session goes to questioning them.

More of your coaching now concerns how the team works with AI, not only how it follows the framework. You watch for one person becoming the go-to AI expert while others stop engaging, for pull requests quietly growing too large to review well, and for "the AI wrote it" standing in for real review against the Definition of Done. Some colleagues will argue that sprints are too slow for agents. Treat that as a question for the team to test in a retrospective, not a verdict to accept or dismiss.

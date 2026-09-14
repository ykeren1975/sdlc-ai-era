---
title: Business Analyst
order: 20
icon: clipboard-list
summary: AI drafts, rewords and checks requirements, stories and test ideas. The analyst supplies the context, keeps stakeholders in the loop and catches what the draft gets subtly wrong.
tagline: AI drafts requirements; you add context and catch subtle errors
lastReviewed: 2026-09-14
sdlcPhases:
  - requirements
  - design
  - test
shifts:
  - phase: requirements
    activity: Eliciting and clarifying stakeholder needs
    headline: Have an LLM reword rough needs, then let stakeholders confirm the meaning
    highlight: true
    traditional: Analysts ran interviews and workshops, took notes and turned what stakeholders said into written requirements, going back to them to confirm meaning.
    aiEra: An LLM can reword a stakeholder's rough statement into a clearer requirement for the stakeholder to confirm. In a 2026 study, participants rated LLM revisions of their own statements higher than their originals, but the authors saw occasional meaning drift and say stakeholders must stay in the validation loop.
    sourceIds:
      - llm-stakeholder-revisions-2026
  - phase: requirements
    activity: Using AI across requirements work
    headline: "In one small survey, human-AI collaboration led; full automation was rare"
    traditional: Elicitation, analysis, specification and validation were done by people, with documents, spreadsheets and requirements tools.
    aiEra: In a 2025 survey of 55 software practitioners, 58.2% already used AI in requirements work. Human-AI collaboration accounted for 54.4% of requirements techniques, while full AI automation was 5.4%.
    sourceIds:
      - ai4re-practitioner-survey-2025
  - phase: requirements
    activity: Writing user stories
    headline: "In one study, LLM stories were similar to human ones but less diverse"
    traditional: Analysts wrote user stories by hand from interview notes and workshop outputs, using templates such as "As a… I want… so that…".
    aiEra: In a 2025 study, 10 LLMs available in 2024 generated user stories from emulated customer interviews. The stories were similar to human-written ones in coverage and style, but less diverse and creative, and met acceptance quality criteria less often.
    sourceIds:
      - llm-user-stories-2025
  - phase: requirements
    activity: Breaking epics into stories and acceptance criteria
    headline: One pilot gave AI written domain context, then had it split epics into stories
    highlight: true
    traditional: The analyst split epics into stories and wrote acceptance criteria, and missed edge cases often led to rework later in development.
    aiEra: In one Thoughtworks pilot, the team first wrote a reusable description of the domain and architecture for the AI, then used an AI assistant to break three epics into stories. The team estimated about 20% less analysis time, including the time to create that context, though three epics is too few for firm conclusions. The team's QA estimated about 10% fewer bugs and reasons for rework, because edge cases were better covered in the stories.
    sourceIds:
      - thoughtworks-ra-case-study
  - phase: requirements
    activity: Reviewing requirement quality
    headline: In one study, LLMs reliably judged user story quality given clear criteria
    traditional: Tools could check the syntax of requirements, but judging clarity and internal consistency stayed a manual, time-consuming review.
    aiEra: In a 2025 study, LLMs reliably assessed the semantic quality of user stories when given clear evaluation criteria, with the potential to reduce human effort in large-scale reviews.
    sourceIds:
      - llm-user-stories-2025
  - phase: test
    activity: Handing acceptance criteria to testing
    headline: Generate test cases from stories with AI, but they may miss non-functional needs
    highlight: true
    traditional: Testers read stories and acceptance criteria and wrote test cases by hand, asking the analyst about gaps.
    aiEra: AI can generate test cases from user stories. In a Thoughtworks experiment, generated test cases covered 98.67% of acceptance criteria, yet roughly a quarter needed clarification. The biggest limitation was heavy reliance on input quality, and the tools tended to overlook non-functional requirements.
    sourceIds:
      - thoughtworks-testcases-2025
  - phase: design
    activity: Writing specifications for coding agents
    headline: "Kiro frames requirements as stories with acceptance criteria before agents code"
    traditional: Requirements documents and backlog items were written for developers, who interpreted them while designing and coding.
    aiEra: Kiro, a spec-driven development tool, structures requirements as user stories with GIVEN/WHEN/THEN acceptance criteria before a coding agent designs and implements them. Demos of such tools present it as a given that a developer does this analysis, and do not make explicit whether developers should pair with product people on it.
    sourceIds:
      - fowler-sdd-tools
tools:
  - tool: chatgpt
    useFor: Drafting interview guides, rewording rough requirements, and producing first-draft user stories and acceptance criteria for review.
    recommendation: should
  - tool: claude
    useFor: Working through long source documents, meeting notes and policies to draft and cross-check requirements.
    recommendation: could
  - tool: microsoft-365-copilot
    useFor: AI meeting notes and recommended tasks from transcribed Teams workshops, and drafting in Word and Excel.
    recommendation: could
  - tool: atlassian-rovo
    useFor: Generating suggested Jira work items from a description, then refining them in chat, for example by adding acceptance criteria.
    recommendation: could
  - tool: lucidchart
    useFor: Generating a first-draft flowchart from a text prompt and iterating on it with further prompts.
    recommendation: could
  - tool: celonis
    useFor: Process mining on system event data, with a chat assistant for asking questions about process performance.
    recommendation: could
  - tool: kiro
    useFor: Seeing how a coding agent turns a prompt into user stories with acceptance criteria, and reviewing that requirements document.
    recommendation: could
    sourceIds:
      - fowler-sdd-tools
skills:
  new:
    - Writing reusable domain and architecture context for AI assistants
    - Prompting for stories, acceptance criteria and edge cases
    - Checking AI rewrites against what the stakeholder actually meant
    - Writing specifications a coding agent can follow
    - Knowing what project data may go into which AI tool
  amplified:
    - Stakeholder facilitation and validation
    - Domain knowledge and business rules
    - Critical review of requirements quality
    - Non-functional and regulatory requirements
    - Working closely with QA and developers
  lessImportant:
    - Typing up meeting notes by hand
    - Formatting requirements documents from scratch
    - Writing routine stories and test cases from a blank page
risks:
  - text: An LLM rewrite can drift from what the stakeholder meant, so keep the stakeholder in the loop to validate it.
    sourceIds:
      - llm-stakeholder-revisions-2026
  - text: A review of 238 studies on generative AI for requirements identified hallucination, reproducibility and interpretability as core challenges, and only 1.3% of studies reached production-level integration.
    sourceIds:
      - genai-re-slr
  - text: In a survey of 55 practitioners, respondents raised privacy and information-leakage concerns about using AI for requirements specification.
    sourceIds:
      - ai4re-practitioner-survey-2025
  - text: In one study, LLM-generated user stories were less diverse and met acceptance quality criteria less often than human-written ones. In another, AI-generated test cases tended to overlook non-functional requirements.
    sourceIds:
      - llm-user-stories-2025
      - thoughtworks-testcases-2025
first30Days:
  - Check your organisation's policy on which AI tools may see client, personal or confidential requirements data before pasting anything in.
  - Write a one-page description of your domain, key terms and system landscape, and reuse it every time you ask an AI assistant for help.
  - On one upcoming epic, draft stories and acceptance criteria with AI, then compare them with your own draft for missed edge cases and invented rules.
  - When AI rewords a stakeholder's requirement, send the rewrite back to that stakeholder to confirm the meaning.
  - Ask QA how they use your stories with AI test generation, and state non-functional requirements explicitly where they are missing.
sources:
  - id: ai4re-practitioner-survey-2025
    title: "AI for Requirements Engineering: Industry adoption and Practitioner perspectives"
    publisher: arXiv (Rani, Berntsson Svensson, Feldt; ISE 2025 workshop at ASE 2025)
    url: https://arxiv.org/abs/2511.01324
    published: 2025-11-03
    accessed: 2026-09-14
    quote: Our data show that 58.2% of respondents already use AI in RE, and 69.1% view its impact as positive or very positive. HAIC dominates practice, accounting for 54.4% of all RE techniques, while full AI automation remains minimal at 5.4%.
  - id: llm-stakeholder-revisions-2026
    title: "Supporting Stakeholder Requirements Expression with LLM Revisions: An Empirical Evaluation"
    publisher: arXiv (Mircea, Gevrek, Schmid, Schneider; REFSQ 2026)
    url: https://arxiv.org/abs/2601.16699
    published: 2026-01-23
    accessed: 2026-09-14
  - id: llm-user-stories-2025
    title: Can LLMs Generate User Stories and Assess Their Quality?
    publisher: arXiv (Quattrocchi, Pasquale, Spoletini, Baresi)
    url: https://arxiv.org/abs/2507.15157
    published: 2025-07-20
    accessed: 2026-09-14
  - id: thoughtworks-ra-case-study
    title: "Using AI for requirements analysis: A case study"
    publisher: Thoughtworks
    url: https://www.thoughtworks.com/en-gb/insights/blog/generative-ai/using-ai-requirements-analysis-case-study
    published: 2024-09-17
    accessed: 2026-09-14
    quote: the team estimates that there was a reduction in analysis time of ~20%, despite the time required to create the context.
  - id: thoughtworks-testcases-2025
    title: Can we use generative AI to generate test cases from user stories?
    publisher: Thoughtworks
    url: https://www.thoughtworks.com/en-us/insights/blog/generative-ai/can-we-use-generative-AI-to-generate-test-cases-from-user-stories
    published: 2025-07-30
    accessed: 2026-09-14
    quote: The AI achieved 98.67% acceptance criteria coverage and maintained a low duplication rate of only 4.22%.
  - id: genai-re-slr
    title: "Generative AI for Requirements Engineering: A Systematic Literature Review"
    publisher: arXiv (Cheng et al.)
    url: https://arxiv.org/abs/2409.06741
    published: 2025-10-14
    accessed: 2026-09-14
    quote: Industrial adoption remains nascent, with over 90% of studies corresponding to early stage development and only 1.3% reaching production level integration.
  - id: fowler-sdd-tools
    title: "Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl"
    publisher: martinfowler.com (Birgitta Böckeler)
    url: https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html
    published: 2025-10-15
    accessed: 2026-09-14
---

A typical week still revolves around people: workshops, interviews and sessions to confirm what was agreed. What changes is the paperwork around them. A transcribed workshop gives you a first set of notes to correct instead of a blank page. A rough epic becomes a draft list of stories and acceptance criteria quickly, and you spend your time on what is missing, wrong or invented. Before any of that works well, you give the assistant a solid description of the domain, and you keep it up to date.

The judgement part of the job grows. You check that a neatly reworded requirement still means what the stakeholder said, and you add the non-functional, regulatory and edge-case detail that drafts tend to skip. You also think about who reads your output next. That may be a tester generating cases from your stories, or a developer handing your spec to a coding agent. Vague requirements used to get sorted out in conversation. Now they are more likely to be built exactly as written.

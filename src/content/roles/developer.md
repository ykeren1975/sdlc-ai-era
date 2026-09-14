---
title: Software Developer / Engineer
order: 30
icon: code
summary: Less time typing code, more time specifying work, directing coding agents, and reviewing and testing what they produce. Judgement, tests and code review matter more, not less.
lastReviewed: 2026-09-14
sdlcPhases:
  - design
  - build
  - test
  - deploy
shifts:
  - phase: build
    activity: Writing code
    traditional: Developers wrote most code by hand in an editor, helped by autocomplete, documentation and search engines.
    aiEra: Developers increasingly describe a change and let an AI assistant or agent draft it, then review and revise the result. Adoption is uneven. Many developers still write most of their code themselves, while one Anthropic engineer estimated their work had shifted "70%+" to reviewing and revising rather than writing new code.
    sourceIds:
      - anthropic-work-study
      - so-survey-2025-ai
  - phase: design
    activity: Planning a change before implementation
    traditional: Intent lived in a ticket, a design doc or the developer's head, and was refined while coding.
    aiEra: For larger changes, developers write or review a structured spec, a technical plan and a task list that the agent works from. The spec step helps on bigger features but can be overkill for small fixes and adds documents to review.
    sourceIds:
      - github-spec-kit-blog
      - fowler-sdd-tools
  - phase: build
    activity: Understanding unfamiliar code and debugging
    traditional: Reading source, stepping through a debugger, searching the codebase and asking colleagues who knew the area.
    aiEra: Developers ask an assistant to explain a module, trace a bug or propose a fix, then check the explanation and the fix themselves. At Anthropic, debugging and code understanding are the most common uses.
    sourceIds:
      - anthropic-work-study
  - phase: build
    activity: Keeping project context usable
    traditional: Conventions and architecture knowledge were shared through wikis, onboarding and code review comments.
    aiEra: Developers write documentation that can be handed to an agent, so it can use APIs from other parts of the codebase without reading that code first.
    sourceIds:
      - willison-vibe-engineering
  - phase: test
    activity: Automated testing
    traditional: Developers wrote unit and integration tests alongside features, with coverage often uneven.
    aiEra: A reliable test suite becomes the main guardrail for agent-written code. Without one, an agent may claim something works without having tested it. Developers still need strong manual testing skills, including digging into edge cases.
    sourceIds:
      - willison-vibe-engineering
      - dora-2025
  - phase: build
    activity: Code review
    traditional: Peers reviewed pull requests written by other people, mostly for design, correctness and readability.
    aiEra: Working effectively with agents can mean, in Simon Willison's words, "spending so much time on code review", including reviewing your own agents' output. Output that is almost right, but not quite, still needs careful human review and debugging.
    sourceIds:
      - anthropic-work-study
      - so-survey-2025-ai
      - willison-vibe-engineering
  - phase: deploy
    activity: Shipping changes safely
    traditional: Teams balanced delivery speed against stability with CI, version control and release practices.
    aiEra: More code arrives faster, so mature version control, strong automated testing and fast feedback loops matter more to keep higher change volume from causing instability.
    sourceIds:
      - dora-2025
tools:
  - tool: github-copilot
    useFor: Inline completions, chat, agent mode in the IDE, and assigning issues to a cloud agent that opens a pull request for review.
    recommendation: should
  - tool: claude-code
    useFor: Agentic coding in the terminal or IDE for multi-file changes, debugging and exploring an unfamiliar codebase.
    recommendation: could
  - tool: cursor
    useFor: AI-first editor with completions, an agent for multi-step changes, and pull request review.
    recommendation: could
  - tool: gemini-cli
    useFor: Open-source terminal agent with a free tier for querying a codebase and automating development tasks.
    recommendation: could
  - tool: spec-kit
    useFor: Structuring larger features as spec, plan and tasks before handing them to a coding agent.
    recommendation: could
    sourceIds:
      - github-spec-kit-blog
      - fowler-sdd-tools
  - tool: kiro
    useFor: Agentic IDE that turns a prompt into requirements, design and tasks before implementation.
    recommendation: could
    sourceIds:
      - fowler-sdd-tools
  - tool: coderabbit
    useFor: Automated first-pass review comments on GitHub and GitLab pull requests, before a human reviewer.
    recommendation: could
skills:
  new:
    - Writing specs, plans and task breakdowns an agent can follow
    - Maintaining repository context for agents (docs, instruction files)
    - Deciding which work to delegate and which to do by hand
    - Reviewing large machine-generated diffs efficiently
    - Evaluating AI tools and models against your own codebase
  amplified:
    - Code review
    - Test design and maintaining a reliable test suite
    - System design and architecture
    - Version control discipline
    - Secure coding
    - Debugging and reading code
  lessImportant:
    - Memorising syntax and API signatures
    - Typing boilerplate and scaffolding by hand
    - Searching forums for common error messages
risks:
  - text: Output that is almost right can cost more time than it saves. In one controlled study of early-2025 tools, experienced open-source developers took 19% longer with AI, yet still believed it had sped them up.
    sourceIds:
      - metr-2025-study
      - so-survey-2025-ai
  - text: Generated code often carries security flaws. In Veracode's 2026 tests, AI-generated code passed security checks only 56% of the time, barely changed from its first report, even though syntax errors are now rare.
    sourceIds:
      - veracode-genai-2026
  - text: Higher change volume without strong testing, version control and feedback loops is linked to lower delivery stability.
    sourceIds:
      - dora-2025
  - text: Anthropic's study flags a "paradox of supervision". Coding skills may weaken from AI overuse, yet supervising an agent requires those same skills.
    sourceIds:
      - anthropic-work-study
  - text: Heavy spec workflows can create long documents that are tedious to review, and agents do not always follow them.
    sourceIds:
      - fowler-sdd-tools
first30Days:
  - Pick one AI coding assistant your organisation allows and use it daily on real tickets, noting where it saves time and where it costs time.
  - Check that the repository you work in has a test suite you trust and fast CI before delegating larger changes to an agent.
  - Add a short instruction file with build commands, conventions and architecture notes, and update it when the agent gets something wrong.
  - Try a spec-plan-tasks flow on one medium-sized feature and compare it with plain prompting on a small fix.
  - Review every generated diff as you would a colleague's, with extra attention to security, error handling and duplicated code.
sources:
  - id: so-survey-2025-ai
    title: 2025 Stack Overflow Developer Survey — AI
    publisher: Stack Overflow
    url: https://survey.stackoverflow.co/2025/ai
    accessed: 2026-09-14
    quote: 'The biggest single frustration, cited by 66% of developers, is dealing with "AI solutions that are almost right, but not quite," which often leads to the second-biggest frustration: "Debugging AI-generated code is more time-consuming" (45%)'
  - id: dora-2025
    title: Announcing the 2025 DORA Report
    publisher: Google Cloud
    url: https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report
    published: 2025-09-23
    accessed: 2026-09-14
    quote: However, AI adoption does continue to have a negative relationship with software delivery stability.
  - id: metr-2025-study
    title: Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity
    publisher: METR
    url: https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
    published: 2025-07-10
    accessed: 2026-09-14
    quote: When developers are allowed to use AI tools, they take 19% longer to complete issues—a significant slowdown that goes against developer beliefs and expert forecasts.
  - id: anthropic-work-study
    title: How AI is transforming work at Anthropic
    publisher: Anthropic
    url: https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic
    published: 2025-12-02
    accessed: 2026-09-14
    quote: One reason that the atrophy of coding skills is concerning is the “paradox of supervision”—as mentioned above, effectively using Claude requires supervision, and supervising Claude requires the very coding skills that may atrophy from AI overuse.
  - id: veracode-genai-2026
    title: "2026 GenAI Code Security Report: AI Is Writing More of Your Code but Security Hasn't Caught Up"
    publisher: Veracode
    url: https://www.veracode.com/blog/2026-genai-code-security-report-ai-risk/
    published: 2026-07-28
    accessed: 2026-09-14
    quote: The average security pass rate across models is 56% – barely changed from 55% in the first report.
  - id: github-spec-kit-blog
    title: "Spec-driven development with AI: Get started with a new open source toolkit"
    publisher: GitHub Blog
    url: https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/
    published: 2025-09-02
    accessed: 2026-09-14
  - id: fowler-sdd-tools
    title: "Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl"
    publisher: martinfowler.com (Birgitta Böckeler)
    url: https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html
    published: 2025-10-15
    accessed: 2026-09-14
  - id: willison-vibe-engineering
    title: Vibe engineering
    publisher: Simon Willison's Weblog
    url: https://simonwillison.net/2025/Oct/7/vibe-engineering/
    published: 2025-10-07
    accessed: 2026-09-14
---

A typical week now starts with shaping work more than typing it. You break a ticket into a short plan, point an agent at the relevant part of the codebase, and let it draft the change while you look at something else. Much of the rest of the day goes on reading diffs, running the app, tightening tests, and sending the agent back with corrections. Small fixes are often faster to do by hand; well-defined, well-tested chunks of work are where delegation pays off.

The core craft has not gone away. It has moved. Knowing what good code looks like, how the system fits together and what could break in production is what lets you review agent output quickly and catch the almost-right change before it ships. Teams that already had solid tests, small pull requests and a healthy review culture tend to get the most from these tools. Teams without them tend to get more code, and more problems.

---
title: Software Developer / Engineer
order: 50
icon: code
summary: Less time typing code, more time specifying work, directing coding agents, and reviewing and testing what they produce. Judgement, tests and code review matter more, not less.
tagline: Less typing, more specifying, directing and reviewing agents
lastReviewed: 2026-09-14
sdlcPhases:
  - design
  - build
  - test
  - deploy
shifts:
  - phase: build
    activity: Writing code
    headline: Experienced developers in one study planned agent work and validated its output
    highlight: true
    traditional: Developers wrote most code by hand in an editor, helped by autocomplete, documentation and search engines.
    aiEra: "In one study of experienced developers (13 observed in field sessions and 99 surveyed via AI-related GitHub projects, between August and October 2025), participants used agents to build software but kept control of design and implementation: they planned before implementing and validated the agents' output. The 2025 Stack Overflow Developer Survey described AI agents as not yet mainstream."
    sourceIds:
      - huang-devs-control-agents
      - so-survey-2025-ai
  - phase: design
    activity: Planning a change before implementation
    headline: "Willison: planning matters more with agents; Böckeler found spec tools overkill"
    traditional: Intent lived in a ticket, a design doc or the developer's head, and was refined while coding.
    aiEra: "Simon Willison notes that planning in advance is even more important with an agent: you can iterate on the plan first, then hand it off to write the code. In one study, every observed experienced developer whose task involved new features controlled the design, mostly by writing plans themselves or revising agent-drafted plans, and even long plans were run in small chunks. Spec-driven tools such as Kiro and spec-kit turn this into documents such as requirements, design and tasks, but Birgitta Böckeler found their workflows overkill for the problems she tried, with verbose markdown files that were tedious to review."
    sourceIds:
      - willison-vibe-engineering
      - huang-devs-control-agents
      - fowler-sdd-tools
  - phase: build
    activity: Understanding unfamiliar code and debugging
    headline: Study respondents found agents suited to explaining code; debugging views mixed
    traditional: Reading source, stepping through a debugger, searching the codebase and asking colleagues who knew the area.
    aiEra: "In one study of experienced developers, survey respondents who mentioned these uses mostly found agents suitable for explaining or analysing code, APIs and errors, and for simple debugging or fixes. Views were mixed on general debugging and on understanding project architecture: one respondent said debugging with LLMs often caused more problems than it found. Participants cited strong code comprehension and debugging skills as part of the expertise needed to use agents effectively."
    sourceIds:
      - huang-devs-control-agents
  - phase: build
    activity: Keeping project context usable
    headline: Write docs an agent can use to call APIs without reading that code first
    traditional: Conventions and architecture knowledge were shared through wikis, onboarding and code review comments.
    aiEra: Developers write documentation that can be handed to an agent, so it can use APIs from other parts of the codebase without reading that code first.
    sourceIds:
      - willison-vibe-engineering
  - phase: test
    activity: Automated testing
    headline: "Willison: tests help agents; in one study, many agent PRs had no test changes"
    highlight: true
    traditional: Developers wrote unit and integration tests alongside features, with coverage often uneven.
    aiEra: "Simon Willison says agentic coding tools can fly with a robust, comprehensive and stable test suite, but without tests an agent might claim something works without having tested it at all. In one study of agent-generated pull requests from five coding agents in Java and Python projects, about half of the pull requests that changed code under test included no test changes, and existing tests were an incomplete safety net. The authors warn teams not to assume that a passing test run means the change has been tested. Willison adds that developers still need to be really good at manual testing, including digging into edge cases."
    sourceIds:
      - willison-vibe-engineering
      - dipongkor-agentic-pr-coverage
  - phase: build
    activity: Code review
    headline: Willison says agents mean much code review; study authors urge extra scrutiny
    highlight: true
    traditional: Peers reviewed pull requests written by other people, mostly for design, correctness and readability.
    aiEra: "Simon Willison lists \"spending so much time on code review\" among the work of using coding agents well, and says developers who are fast and productive at code review will have a much better time working with LLMs. In one study, experienced developers observed working within their own expertise carefully reviewed every agent change, with methods such as reading diffs and running tests. In the 2025 Stack Overflow survey, AI solutions that are almost right, but not quite, were developers' biggest single frustration. The authors of a study of Cursor-adopting open-source projects recommend treating AI-generated code as needing extra scrutiny in review, including whether a simpler implementation would achieve the same functionality."
    sourceIds:
      - willison-vibe-engineering
      - huang-devs-control-agents
      - so-survey-2025-ai
      - he-cursor-velocity-quality
  - phase: deploy
    activity: Shipping changes safely
    headline: In one study, Cursor sped projects up briefly but left lasting code complexity
    traditional: Teams balanced delivery speed against stability with CI, version control and release practices.
    aiEra: "In one study of open-source GitHub projects that adopted Cursor (most adoptions between August 2024 and March 2025), development velocity rose sharply but only briefly, while static analysis warnings and code complexity rose persistently and later slowed development. The authors call for quality assurance that scales with AI-era velocity, such as test coverage requirements that scale with lines of code added. Simon Willison notes that good version control habits matter even more when a coding agent might have made the changes, and that a preview environment lets you check an agent-built feature without deploying it straight to production."
    sourceIds:
      - he-cursor-velocity-quality
      - willison-vibe-engineering
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
    useFor: Setting up a constitution and a specify, plan and tasks workflow that you run through slash commands in your coding assistant.
    recommendation: could
    sourceIds:
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
  - headline: Almost-right output can take extra time to debug, and felt speedups can mislead
    text: Output that is almost right can take extra time to debug. In the 2025 Stack Overflow survey, almost-right AI solutions were developers' biggest single frustration, often leading to debugging AI-generated code that takes more time. How much AI speeds you up is also hard to judge. METR, whose early-2025 study found experienced open-source developers slower with AI, now believes developers are likely more sped up in early 2026, but says its newer data is only very weak evidence for the size of this increase, and that self-reported speedups can be quite unreliable.
    sourceIds:
      - so-survey-2025-ai
      - metr-2026-uplift-update
  - headline: Working AI code can still be exploitable, a benchmark study finds
    text: Code that works can still be exploitable. In a 2026 benchmark study by University at Buffalo researchers, covering a limited set of models and coding-agent setups on function-level and web-application tasks, models usually knew the relevant security concepts, but that knowledge dropped substantially when it had to become functional, exploit-resistant code.
    sourceIds:
      - patir-sok-secure-code-generation
  - headline: Faster output can leave lasting quality problems, a study of Cursor projects finds
    highlight: true
    text: Faster output can leave lasting quality problems. In one study of open-source GitHub projects that adopted Cursor, static analysis warnings and code complexity rose persistently after adoption, and the authors found these increases were major factors in a later slowdown. They note the results may not generalise to other tools or to proprietary projects.
    sourceIds:
      - he-cursor-velocity-quality
  - headline: Agents may fall short on complex or legacy work, developers in one study said
    text: Agents may fall short on harder work. In one 2025 survey of experienced developers, most respondents who mentioned these tasks judged agents unsuitable for complex tasks, business logic that needs domain knowledge, and integrating with existing or legacy code.
    sourceIds:
      - huang-devs-control-agents
  - headline: Spec tools produced tedious documents agents did not always follow, Böckeler found
    text: In Birgitta Böckeler's trials, spec-driven tools created verbose markdown files that were tedious to review, and agents sometimes ignored instructions or followed them too eagerly.
    sourceIds:
      - fowler-sdd-tools
first30Days:
  - Pick one AI coding assistant your organisation allows and use it daily on real tickets, noting where it saves time and where it costs time.
  - Check that the repository you work in has a test suite you trust and fast CI before delegating larger changes to an agent.
  - Add a short instruction file with build commands, conventions and architecture notes, and update it when the agent gets something wrong.
  - Try a spec-plan-tasks flow on one medium-sized feature and compare it with plain prompting on a small fix.
  - Review every generated diff as you would a colleague's, with extra attention to security, error handling and duplicated code.
agentSkills:
  - skill: mcp-builder
    useFor: "Building an MCP server so an agent can use an internal API or service through well-designed tools."
  - skill: webapp-testing
    useFor: "Letting an agent test your local web app with Playwright, capture screenshots and read browser logs."
  - skill: gh-fix-ci
    useFor: "Debugging failing GitHub Actions checks on a pull request, with a fix plan before any change."
starterSkills:
  - ai-diff-review
  - change-spec-for-agent
  - agent-context-file
sources:
  - id: so-survey-2025-ai
    title: 2025 Stack Overflow Developer Survey — AI
    publisher: Stack Overflow
    url: https://survey.stackoverflow.co/2025/ai
    accessed: 2026-09-14
    type: survey
    vendorAffiliated: true
    quote: 'The biggest single frustration, cited by 66% of developers, is dealing with "AI solutions that are almost right, but not quite," which often leads to the second-biggest frustration: "Debugging AI-generated code is more time-consuming" (45%)'
  - id: metr-2026-uplift-update
    title: We are Changing our Developer Productivity Experiment Design
    publisher: METR (Becker, Rush, Cunningham, Rein, Mahamud)
    url: https://metr.org/blog/2026-02-24-uplift-update/
    published: 2026-02-24
    accessed: 2026-09-15
    type: research
    vendorAffiliated: false
    quote: Based on conversations with study participants, we believe it is likely that developers are more sped up from AI tools now — in early 2026 — compared to our estimates from early 2025. However, because of the selection effects in our experiment, our data is only very weak evidence for the size of this increase.
  - id: fowler-sdd-tools
    title: "Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl"
    publisher: martinfowler.com (Birgitta Böckeler)
    url: https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html
    published: 2025-10-15
    accessed: 2026-09-14
    type: practitioner
    vendorAffiliated: true
  - id: willison-vibe-engineering
    title: Vibe engineering
    publisher: Simon Willison's Weblog
    url: https://simonwillison.net/2025/Oct/7/vibe-engineering/
    published: 2025-10-07
    accessed: 2026-09-14
    type: practitioner
    vendorAffiliated: false
  - id: huang-devs-control-agents
    title: "Professional Software Developers Don't Vibe, They Control: AI Agent Use for Coding in 2025"
    publisher: arXiv (Huang, Reyna, Lerner, Xia, Hempel)
    url: https://arxiv.org/html/2512.14012v2
    published: 2026-08-18
    accessed: 2026-09-15
    type: research
    vendorAffiliated: false
    quote: Our most salient finding is that, indeed, professional developers do not vibe code. Instead, they carefully control the agents through planning and supervision.
  - id: he-cursor-velocity-quality
    title: "Speed at the Cost of Quality: How Cursor AI Increases Short-Term Velocity and Long-Term Complexity in Open-Source Projects"
    publisher: arXiv (He, Miller, Agarwal, Kästner, Vasilescu; MSR 2026)
    url: https://arxiv.org/html/2511.04427v3
    published: 2026-01-26
    accessed: 2026-09-15
    type: research
    vendorAffiliated: false
    quote: We find that the adoption of Cursor leads to a statistically significant, large, but transient increase in project-level development velocity, along with a substantial and persistent increase in static analysis warnings and code complexity.
  - id: dipongkor-agentic-pr-coverage
    title: Test Coverage Analysis of Agentic Pull Requests
    publisher: arXiv (Dipongkor, Baral, Lam, Moran)
    url: https://arxiv.org/html/2607.18057v1
    published: 2026-07-20
    accessed: 2026-09-15
    type: research
    vendorAffiliated: false
    quote: "Do not assume agents write tests: 50.4% of code under test-modifying PRs include no test changes at all, and the safety net provided by existing tests is incomplete in both languages."
  - id: patir-sok-secure-code-generation
    title: "SoK: AI Secure Code Generation: Progress, Pitfalls, and Paths Forward"
    publisher: arXiv (Patir, Guo, Cai, Hu)
    url: https://arxiv.org/html/2606.25195v1
    published: 2026-06-23
    accessed: 2026-09-15
    type: research
    vendorAffiliated: false
    quote: The models usually know the relevant security concepts, but that knowledge drops substantially when it must become functional, exploit-resistant code.
---

A typical week now starts with shaping work more than typing it. You break a ticket into a short plan, point an agent at the relevant part of the codebase, and let it draft the change while you look at something else. Much of the rest of the day goes on reading diffs, running the app, tightening tests, and sending the agent back with corrections. Small fixes are often faster to do by hand; well-defined, well-tested chunks of work are where delegation pays off.

The core craft has not gone away. It has moved. Knowing what good code looks like, how the system fits together and what could break in production is what lets you review agent output quickly and catch the almost-right change before it ships. Solid tests, small pull requests and careful review are what make agent output safe to ship. Without them, you mostly get more code, and more problems.

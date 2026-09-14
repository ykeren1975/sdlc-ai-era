---
title: QA Engineer / Tester
order: 60
icon: flask-conical
summary: AI tools can draft test cases, generate and repair automation, and run exploratory sessions. The tester directs and checks that work, and tests AI features that have no single right answer.
tagline: AI can draft and repair tests; testers direct and check the work
lastReviewed: 2026-09-14
sdlcPhases:
  - plan
  - requirements
  - build
  - test
shifts:
  - phase: requirements
    activity: Test analysis and test case design
    headline: Prompt AI for test analysis and design, now an ISTQB-certified skill
    highlight: true
    traditional: Testers read requirements and user stories, identified test conditions and wrote test cases by hand, often in a test management tool.
    aiEra: Since July 2025, ISTQB certifies testers in applying prompt engineering to test analysis, design, automation and reporting. One Ministry of Testing author treats AI output "as a starting signal rather than a final answer". In the World Quality Report 2025-26, test case design and requirements refinement lead generative AI adoption in quality engineering, and in PractiTest's 2026 State of Testing report, 70% use AI for test case creation.
    sourceIds:
      - istqb-ct-genai
      - mot-back-to-basics
      - wqr-2025-26
      - practitest-sot-2026
  - phase: build
    activity: Writing UI test automation
    headline: Give Playwright's agents a request and seed test; they plan and write tests
    highlight: true
    traditional: Automation engineers hand-coded browser tests in frameworks such as Selenium or Playwright, finding locators and writing assertions step by step.
    aiEra: With Playwright's test agents, a planner explores the app and writes a Markdown test plan, and a generator turns that plan into executable tests, verifying selectors and assertions live as it runs the scenarios. The tester supplies a request, a seed test that sets up the environment and, optionally, a product requirements document.
    sourceIds:
      - playwright-test-agents
  - phase: test
    activity: Maintaining broken and brittle tests
    headline: Let Playwright's healer suggest fixes for failing tests and re-run them
    highlight: true
    traditional: When the UI changed, engineers debugged failing tests and updated locators, waits and test data by hand.
    aiEra: Playwright's healer agent replays the failing steps, inspects the current UI for equivalent elements and suggests a patch such as a locator update, wait adjustment or data fix, then re-runs the test. The outcome is a passing test or, if the agent believes the functionality is broken, a skipped test. Script maintenance is a common AI use among State of Testing respondents.
    sourceIds:
      - playwright-test-agents
      - practitest-sot-2026
  - phase: test
    activity: Exploratory testing
    headline: One tester runs exploratory charters with an AI agent and steers it
    traditional: Testers ran time-boxed sessions guided by charters and heuristics, took notes and wrote up what they found.
    aiEra: One practitioner, Callum Akehurst-Ryan, runs exploratory charters with an AI agent. His agents look for risks in each feature request using quality heuristics, then navigate the app and report findings, naming the heuristic that found each issue. He argues the AI needs help deciding what is worth exploring, what good enough looks like and when to stop, and he steers or interrupts it during the session, which he calls "botsitting".
    sourceIds:
      - akehurst-ryan-exploratory-ai
  - phase: test
    activity: Checking tests written alongside AI-generated code
    headline: When an agent writes the code, watch for disabled or deleted tests
    traditional: Developers and testers wrote tests themselves, and a passing suite was treated as evidence that the code behaved as intended.
    aiEra: When a coding agent writes the code, the tests need watching too. Kent Beck treats "any indication that the genie was cheating, for example by disabling or deleting tests" as a warning sign, and instructs his agent to always follow the TDD cycle of red, green, refactor.
    sourceIds:
      - beck-augmented-coding
  - phase: test
    activity: Testing features built on large language models
    headline: Test LLM features with structured evals; the same input can vary in output
    traditional: Test cases compared actual output with a single expected result, on the assumption that the same input gives the same output.
    aiEra: Generative AI can produce different output from the same input, which makes traditional software testing methods insufficient. OpenAI's guidance recommends structured evals, combining metrics with human judgement, validating an LLM judge against human labels, and running evals on every change.
    sourceIds:
      - openai-evals-best-practices
  - phase: plan
    activity: Test planning and reporting
    headline: One author uses AI to draft test plans and summaries, not risk assessment
    traditional: Test leads wrote test plans, status updates and summary reports by hand from notes, logs and defect data.
    aiEra: One Ministry of Testing author uses AI to turn rough notes into structured test plans and to summarise test results, defects and feedback for stakeholders, but advises avoiding it for risk assessment, test analysis and the first version of a test strategy. In PractiTest's 2026 survey, far fewer respondents use AI for risk identification than for test case creation.
    sourceIds:
      - mot-back-to-basics
      - practitest-sot-2026
tools:
  - tool: playwright
    useFor: Open-source browser test automation, with planner, generator and healer agents.
    recommendation: should
    sourceIds:
      - playwright-test-agents
  - tool: github-copilot
    useFor: Drafting and extending test code in the IDE, such as parameterised variants and negative cases, for review.
    recommendation: should
    sourceIds:
      - mot-back-to-basics
  - tool: claude-code
    useFor: Running agent-driven exploratory sessions and working with a test automation codebase.
    recommendation: could
    sourceIds:
      - akehurst-ryan-exploratory-ai
  - tool: mabl
    useFor: Low-code test automation for web, mobile and API with AI test creation and auto-healing.
    recommendation: could
  - tool: applitools-eyes
    useFor: Visual regression checks that compare rendered UI across browsers and devices.
    recommendation: could
  - tool: promptfoo
    useFor: Running evals and red-team tests against prompts and LLM-based features, locally or in CI.
    recommendation: could
skills:
  new:
    - Prompting AI tools for test analysis, design and reporting
    - Reviewing AI-generated test cases and test code for gaps and false passes
    - Steering and supervising testing agents
    - Designing evals for non-deterministic AI features
    - Knowing which testing tasks not to hand to AI
  amplified:
    - Risk-based test strategy
    - Exploratory testing and testing heuristics
    - Domain and product knowledge
    - Reading and reviewing automation code
    - Test data management and privacy awareness
  lessImportant:
    - Hand-writing routine test cases from requirements
    - Manually updating locators and waits after UI changes
    - Writing boilerplate test scaffolding
risks:
  - headline: Tests changed by agents, including skipped or deleted ones, need a human check
    highlight: true
    text: Tests changed by agents need a human check. Kent Beck watches for agents disabling or deleting tests, and Playwright's healer marks a test as skipped when it believes the functionality is broken, so someone has to confirm whether that bug is real.
    sourceIds:
      - playwright-test-agents
      - beck-augmented-coding
  - headline: Hallucination, reliability and privacy are among top reported GenAI challenges in testing
    text: Hallucination, reliability and data privacy are among the top challenges respondents report with generative AI in quality engineering. ISTQB's CT-GenAI certification covers identifying and mitigating hallucinations, biases and data privacy concerns.
    sourceIds:
      - wqr-2025-26
      - istqb-ct-genai
  - headline: AI use in testing leans towards producing scripts rather than finding risk
    text: AI use in testing leans towards producing scripts rather than finding risk. In PractiTest's 2026 State of Testing report, 70% use AI for test case creation and only 19.9% for risk identification.
    sourceIds:
      - practitest-sot-2026
  - headline: Testers who only supervise AI may lose their own testing skills
    text: Testers who only supervise AI may lose their own testing skills. Akehurst-Ryan suggests keeping them sharp by reviewing AI-based testing.
    sourceIds:
      - akehurst-ryan-exploratory-ai
first30Days:
  - Take one feature you know well, have an AI tool draft test cases from its requirements, and compare them with your own list to see what it missed and what it invented.
  - Try Playwright's test agents or a similar tool on a small, stable flow, and review every generated test and every healed or skipped test before merging.
  - Agree with developers that no test is disabled, deleted or weakened by an agent without a human reviewing the change.
  - Run one exploratory session with an AI agent and one without on the same area, and compare what each found.
  - If your product has an LLM feature, collect a small set of real inputs, label good and bad outputs by hand, and turn them into your first eval.
agentSkills:
  - skill: webapp-testing
    useFor: "Having an agent verify frontend behaviour of a local web app with Playwright and capture screenshots."
  - skill: playwright
    useFor: "Driving a real browser from the terminal for UI-flow debugging, form filling and screenshots."
starterSkills:
  - test-cases-from-acceptance-criteria
  - agent-test-change-audit
  - llm-feature-eval-plan
sources:
  - id: wqr-2025-26
    title: "World Quality Report 2025: AI adoption surges in Quality Engineering, but enterprise-level scaling remains elusive"
    publisher: Capgemini
    url: https://www.capgemini.com/news/press-releases/world-quality-report-2025-ai-adoption-surges-in-quality-engineering-but-enterprise-level-scaling-remains-elusive/
    published: 2025-11-13
    accessed: 2026-09-14
    quote: Top challenges experienced by respondents include integration complexity (64%), data privacy risks (67%), and hallucination and reliability concerns (60%)
  - id: practitest-sot-2026
    title: The 2026 State of Testing Report
    publisher: PractiTest
    url: https://www.practitest.com/state-of-testing/
    accessed: 2026-09-14
    quote: 70% use AI for Test Case Creation (generating more scripts), while only 19.9% use it for Risk Identification
  - id: istqb-ct-genai
    title: ISTQB Certified Tester – Testing with Generative AI (CT-GenAI) Press Release
    publisher: ISTQB
    url: https://istqb.org/istqb-certified-tester-specialist-level-testing-with-generative-ai-ct-genai-press-release/
    published: 2025-07-29
    accessed: 2026-09-14
    quote: Identify and mitigate risks such as hallucinations, biases, and data privacy concerns
  - id: playwright-test-agents
    title: Test agents
    publisher: Playwright
    url: https://playwright.dev/docs/test-agents
    accessed: 2026-09-14
    quote: A passing test, or a skipped test if the healer believes that functionality is broken.
  - id: akehurst-ryan-exploratory-ai
    title: Yes you can run exploratory testing with AI
    publisher: Callum Akehurst-Ryan
    url: https://cakehurstryan.com/2026/07/02/yes-you-can-run-exploratory-testing-with-ai/
    published: 2026-07-02
    accessed: 2026-09-14
    quote: AI can actually run your exploratory testing… it just needs some help deciding what's worth exploring, what good enough looks like and when to stop.
  - id: beck-augmented-coding
    title: "Augmented Coding: Beyond the Vibes"
    publisher: Kent Beck (Tidy First?)
    url: https://newsletter.kentbeck.com/p/augmented-coding-beyond-the-vibes
    published: 2025-06-25
    accessed: 2026-09-14
    quote: Any indication that the genie was cheating, for example by disabling or deleting tests.
  - id: openai-evals-best-practices
    title: Evaluation best practices
    publisher: OpenAI
    url: https://developers.openai.com/api/docs/guides/evaluation-best-practices
    accessed: 2026-09-14
    quote: Generative AI is variable. Models sometimes produce different output from the same input, which makes traditional software testing methods insufficient for AI architectures.
  - id: mot-back-to-basics
    title: "Back to the basics: Rethinking how we use AI in testing"
    publisher: Ministry of Testing (Konstantinos Konstantakopoulos)
    url: https://www.ministryoftesting.com/insights/back-to-the-basics-rethinking-how-we-use-ai-in-testing
    published: 2026-01-06
    accessed: 2026-09-14
    quote: AI becomes genuinely useful only when we treat its output as a starting signal rather than a final answer.
---

A typical week now involves less writing of test cases and scripts from scratch and more reviewing what a tool drafted. You might ask an assistant for test ideas on a new story, then cut the ones that do not match the requirements and add the edge cases it missed. Automation work shifts towards reading generated tests, checking that healed tests still test the right thing, and asking why a test was skipped. On some days you point an agent at a charter and spend the session steering it and judging its findings rather than clicking through the app yourself.

The judgement parts of the job are still yours: deciding what is risky, what "good enough" means for this release, and whether a green pipeline actually means the product works. If your team ships features built on language models, part of the week goes on collecting examples, labelling outputs and maintaining evals, because there is no single expected result to assert against. Testers who know the product and its users well are best placed to tell when AI output is plausible but wrong.

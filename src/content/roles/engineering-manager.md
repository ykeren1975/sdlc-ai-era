---
title: Engineering Manager
order: 120
icon: users
summary: AI tools change how teams write, review and ship code. Measuring real impact, managing tool policy and spend, protecting delivery stability and growing junior engineers become core parts of the job.
lastReviewed: 2026-09-14
sdlcPhases:
  - plan
  - build
shifts:
  - phase: plan
    activity: Measuring team productivity
    traditional: Managers tracked delivery with engineering metrics such as PR throughput, cycle time, deployment frequency and change failure rate, alongside developer experience surveys.
    aiEra: DX's AI Measurement Framework tracks three dimensions, utilization, impact and cost, and treats agents as extensions of the developers and teams that oversee their work. In the Pragmatic Engineer's overview of the metrics 18 companies use to measure AI impact, the advice is to track metrics that keep each other in check and to start with solid baseline measurements.
    sourceIds:
      - dx-ai-measurement-framework
      - pragmatic-measure-ai-impact
  - phase: plan
    activity: Setting AI tool policy and choosing tools
    traditional: Developer tools were chosen by teams or platform groups, and paid tools went through normal procurement.
    aiEra: DORA's 2025 report advises leaders to start by clarifying and socialising their AI policies. In the Pragmatic Engineer's 2026 survey of 906 participants, tool choice differed by company size, with GitHub Copilot overtaking Claude Code at large companies; the authors suggest enterprise procurement, not individual preference, is behind the difference.
    sourceIds:
      - dora-2025-report
      - pragmatic-ai-tooling-2026
  - phase: plan
    activity: Budgeting for AI tools and making the case for them
    traditional: Tooling budgets were mostly per-seat licences, planned alongside headcount.
    aiEra: DX's framework tracks AI spend, total and per developer, and net time gain per developer (time savings minus AI spend). DORA's ROI of AI-assisted Software Development report, as summarised by InfoQ, argues most organisations will see a temporary productivity dip before long-term gains, caused by the learning curve, the verification tax of reviewing AI-generated code and adapting downstream processes such as testing and change approval. The report strongly discourages headcount reduction as a strategy.
    sourceIds:
      - dx-ai-measurement-framework
      - dora-roi-infoq
  - phase: build
    activity: Keeping delivery stable as change volume grows
    traditional: Teams relied on code review, automated tests and release processes to keep a steady flow of changes safe.
    aiEra: DORA's 2025 report, based on survey responses from nearly 5,000 technology professionals, found a positive relationship between AI adoption and software delivery throughput, but a continuing negative relationship with delivery stability. DORA's explanation is that without strong automated testing, mature version control practices and fast feedback loops, an increase in change volume leads to instability.
    sourceIds:
      - dora-2025-report
  - phase: plan
    activity: Hiring engineers
    traditional: At Canva, for example, technical interviews tested coding without AI tools, including a Computer Science Fundamentals interview focused on algorithms and data structures.
    aiEra: Canva piloted an AI-Assisted Coding interview that replaces that screen for backend and frontend roles. Candidates use their preferred AI tools on realistic product challenges, and interviewers check, among other things, whether they can identify and fix issues in AI-generated code. Canva found candidates with minimal AI experience often struggled because they lacked the judgement to guide AI effectively, and says code fluency and technical depth are still absolute requirements.
    sourceIds:
      - canva-ai-interviews
  - phase: plan
    activity: Growing junior engineers
    traditional: Junior engineers learned by doing the work themselves and with others, and by getting feedback from more experienced colleagues.
    aiEra: In LeadDev's Engineering Leadership Report 2026, based on 600 survey responses from engineering leaders, 84% believe AI will make it harder for junior developers to enter and grow in the profession. James Stanier argues that the tasks that used to be training ground are being absorbed by AI, and suggests pairing juniors with seniors on complex problems, giving them ownership of small but real projects and letting them lead incident retrospectives.
    sourceIds:
      - leaddev-engineering-leadership-2026
      - stanier-senior-engineers-2035
  - phase: build
    activity: Staying hands-on
    traditional: Managers balanced people management and delivery with varying amounts of technical work.
    aiEra: LeadDev describes engineering leaders being asked to do more, technically, strategically and managerially, as organisations flatten and AI reshapes how code gets written, reviewed and shipped. In its 2026 survey, 37% of engineering leaders are doing more hands-on technical work. In the Pragmatic Engineer's 2026 survey, engineering managers used AI agents regularly at a lower rate than staff+ engineers.
    sourceIds:
      - leaddev-engineering-leadership-2026
      - pragmatic-ai-tooling-2026
tools:
  - tool: github-copilot
    useFor: AI coding assistant with usage metrics for admins, including daily active users, acceptance rate, lines of code and pull request lifecycle.
    recommendation: should
  - tool: claude-code
    useFor: Agentic coding tool; on Team and Enterprise plans, admins can view an analytics dashboard of daily active users, sessions and contribution metrics, and set spend limits on usage credits.
    recommendation: could
  - tool: dx
    useFor: Engineering intelligence platform that tracks AI-generated code by commit, PR, team, agent and repo.
    recommendation: could
  - tool: linearb
    useFor: Tracking the impact of AI coding tools on delivery velocity, code quality and team health, and automating PR routing and approvals with policy-based workflows.
    recommendation: could
  - tool: jellyfish
    useFor: Seeing where AI and engineering effort goes across custom categories, using data from tools such as Git, Jira and AI coding assistants.
    recommendation: could
skills:
  new:
    - Measuring AI utilization, impact and cost together
    - Tracking and forecasting AI tool spend
    - Writing and communicating a team AI policy
    - Interviewing candidates who use AI tools
    - Designing learning work for juniors that AI no longer covers
  amplified:
    - Coaching and mentoring
    - Setting baselines before a change
    - Investing in testing and review safety nets
    - Hands-on familiarity with the team's tools
    - Explaining return on investment to finance and leadership
  lessImportant:
    - Counting lines of code or commits as a productivity signal
    - Algorithm-only interview screens
    - Planning the tooling budget as seat licences alone
risks:
  - text: Output metrics are easy to game. DX warns that metrics like code generation volume are particularly susceptible to gaming, and recommends telling developers the metrics will not be used in individual performance evaluations.
    sourceIds:
      - dx-ai-measurement-framework
  - text: Easy numbers can mislead. The Pragmatic Engineer notes that lines of code are easy to measure and, in the absence of a clear alternative, easy to latch on to, and that acceptance rate misses whether accepted code is maintainable or later gets reverted.
    sourceIds:
      - pragmatic-measure-ai-impact
  - text: More changes can mean less stability. DORA's 2025 report still found a negative relationship between AI adoption and software delivery stability, and warns that without controls such as strong automated testing, more change volume leads to instability.
    sourceIds:
      - dora-2025-report
  - text: Reading the early productivity dip as failure. According to InfoQ's summary of DORA's ROI report, leaders who misread the dip as failure risk pulling funding during it and losing the eventual return.
    sourceIds:
      - dora-roi-infoq
  - text: Cutting junior hiring can empty the future senior pipeline. James Stanier asks managers to make the case for junior hiring and frame it as risk mitigation, not charity.
    sourceIds:
      - stanier-senior-engineers-2035
first30Days:
  - Write down, or find, your team's AI tool policy, which tools are approved and what code or data may go into them, and walk the team through it.
  - Record a baseline for a few delivery and quality metrics, such as PR throughput and change failure rate, before changing how the team uses AI.
  - Find out what your team spends on AI tools per developer each month and who can see and cap that spend.
  - Use your team's approved coding agent on a small real task yourself so you understand what reviewing its output involves.
  - For each junior engineer, agree one piece of real work they own end to end and a senior they pair with on harder problems.
sources:
  - id: dora-2025-report
    title: Announcing the 2025 DORA Report
    publisher: Google Cloud (Nathen Harvey and Derek DeBellis)
    url: https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report
    published: 2025-09-23
    accessed: 2026-09-14
    quote: However, AI adoption does continue to have a negative relationship with software delivery stability.
  - id: dora-roi-infoq
    title: New DORA Report Claims Strong Engineering Foundations Drive AI Return on Investment
    publisher: InfoQ (Matt Saunders)
    url: https://www.infoq.com/news/2026/05/dora-roi-ai-assisted-dev-report/
    published: 2026-05-11
    accessed: 2026-09-14
    quote: The report strongly discourages headcount reduction as a strategy, arguing that retaining and training existing staff is more cost-effective and preserves institutional knowledge.
  - id: dx-ai-measurement-framework
    title: "AI measurement framework: Complete guide for engineering leaders"
    publisher: DX (Taylor Bruneaux)
    url: https://getdx.com/blog/ai-measurement-framework-guide/
    published: 2026-05-20
    accessed: 2026-09-14
    quote: treat agents as extensions of the developers and teams that oversee their work
  - id: pragmatic-measure-ai-impact
    title: How tech companies measure the impact of AI on software development
    publisher: The Pragmatic Engineer (Gergely Orosz and Laura Tacho)
    url: https://newsletter.pragmaticengineer.com/p/how-tech-companies-measure-the-impact-of-ai
    published: 2025-09-16
    accessed: 2026-09-14
    quote: Track metrics that keep each other in check.
  - id: pragmatic-ai-tooling-2026
    title: AI Tooling for Software Engineers in 2026
    publisher: The Pragmatic Engineer (Gergely Orosz and Elin Nilsson)
    url: https://newsletter.pragmaticengineer.com/p/ai-tooling-2026
    published: 2026-03-03
    accessed: 2026-09-14
    quote: It seems like enterprise procurement, not individual preference, is behind this divergence.
  - id: leaddev-engineering-leadership-2026
    title: The Engineering Leadership Report 2026
    publisher: LeadDev
    url: https://leaddev.com/the-engineering-leadership-report-2026
    accessed: 2026-09-14
    quote: 84% believe AI will make it harder for junior developers to enter and grow in the profession
  - id: stanier-senior-engineers-2035
    title: Who will be the senior engineers of 2035?
    publisher: The Engineering Manager (James Stanier)
    url: https://theengineeringmanager.substack.com/p/who-will-be-the-senior-engineers
    published: 2026-04-13
    accessed: 2026-09-14
    quote: Frame it as risk mitigation, not charity.
  - id: canva-ai-interviews
    title: Yes, You Can Use AI in Our Interviews. In fact, we insist
    publisher: Canva Engineering (Simon Newton)
    url: https://www.canva.dev/blog/engineering/yes-you-can-use-ai-in-our-interviews/
    published: 2025-06-11
    accessed: 2026-09-14
    quote: We've piloted a new competency we called 'AI-Assisted Coding' that replaces our traditional Computer Science Fundamentals screening for backend and frontend engineering roles.
---

A typical week now includes more time on how the team works with AI, not just what it ships. You might look at adoption and spend alongside the usual delivery metrics, then ask in one-to-ones where the tools help and where reviewing their output slows people down. Pull requests may arrive faster and larger, so part of the week goes to checking that tests, review load and release checks are keeping up, and to pushing back when a spike in throughput comes with more incidents.

The people side has not shrunk. Hiring loops need updating so candidates can show judgement with AI tools, and junior engineers need deliberate work that builds the experience easy tasks used to provide. Budget conversations are more frequent, and it helps to have a baseline and realistic expectations ready before someone asks whether the tools are paying off. Spending some time using the same agents your team uses keeps those conversations grounded.

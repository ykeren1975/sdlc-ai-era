---
title: Security Engineer
order: 70
icon: shield-check
summary: AI tools find vulnerabilities and suggest fixes, so more of the work moves to verifying and patching. AI-generated code and agents with tool access add new attack surface to review.
tagline: AI finds vulnerabilities; more of the work is verifying and patching
lastReviewed: 2026-09-14
sdlcPhases:
  - design
  - build
  - test
  - operate
shifts:
  - phase: design
    activity: Threat modeling new features
    headline: Cover agent risks such as goal hijack and tool misuse in threat models
    highlight: true
    traditional: Security engineers reviewed designs and data flows with the team, listed likely threats to the application and its users, and agreed controls before build.
    aiEra: When a system includes AI agents, the threat model also has to cover agent-specific risks. The OWASP Top 10 for Agentic Applications (December 2025) lists ten, including agent goal hijack, tool misuse, identity and privilege abuse, memory and context poisoning, and rogue agents. Simon Willison names a "lethal trifecta" of agent capabilities, namely access to private data, exposure to untrusted content and the ability to communicate externally. When all three are present, an attacker can manipulate the agent into sending that data out.
    sourceIds:
      - owasp-agentic-top-10-2026
      - willison-lethal-trifecta
  - phase: design
    activity: Reviewing integrations and tool permissions
    headline: Avoid MCP setups that mix private data, untrusted content and external comms
    traditional: Security engineers reviewed third-party integrations, API scopes and service accounts before they were connected to production systems.
    aiEra: Willison warns that mixing tools from different sources through the Model Context Protocol (MCP) is particularly risky, because such tools often provide private data access, untrusted content and a way to communicate externally, sometimes within a single tool. He advises avoiding that combination. His example is a GitHub MCP server that could access private repositories, read publicly filed issues and create pull requests. OWASP's agentic list also includes agentic supply chain vulnerabilities.
    sourceIds:
      - willison-lethal-trifecta
      - owasp-agentic-top-10-2026
  - phase: build
    activity: Reviewing code for security flaws
    headline: "In Veracode's tests, AI code was syntactically correct but often failed security"
    highlight: true
    traditional: Developers wrote most code by hand, and security engineers ran static analysis and reviewed high-risk changes such as authentication, input handling and cryptography.
    aiEra: AI models now write more of the code. In Veracode's 2026 tests, models generated syntactically correct code nearly 100% of the time, but the average security pass rate was 56%, barely changed from 55% in its first report. Results varied by weakness, with pass rates of 15% on cross-site scripting and 12% on log injection.
    sourceIds:
      - veracode-genai-2026
  - phase: test
    activity: Getting scanner findings fixed
    headline: Evaluate each Autofix suggestion; it may miss or add vulnerabilities
    highlight: true
    traditional: Static analysis alerts went into backlogs. Security engineers triaged them and explained the issue, and developers researched and wrote each fix.
    aiEra: GitHub's Copilot Autofix generates code change suggestions for CodeQL alerts on pull requests and the default branch. GitHub's documentation warns that a suggestion may fail to fix the vulnerability, introduce new vulnerabilities or change the program's semantics, and says developers must evaluate each suggestion and check that CI tests pass.
    sourceIds:
      - github-autofix-docs
  - phase: test
    activity: Finding vulnerabilities
    headline: "AI finds vulnerabilities; Anthropic argues verifying and patching is the limit"
    traditional: Specialists found vulnerabilities through manual code review, penetration testing and fuzzing.
    aiEra: In the final of DARPA's AI Cyber Challenge (August 2025), competitors' automated systems analysed more than 54 million lines of code, found 54 unique synthetic vulnerabilities across 63 challenges and patched 43. They also found 18 real, non-synthetic vulnerabilities, which were being responsibly disclosed to open source maintainers. Anthropic reports that it and about 50 partners used Claude Mythos Preview, a model it has not released to the public, to find more than ten thousand high- or critical-severity vulnerabilities. Anthropic argues that security progress is now limited by how quickly vulnerabilities found by AI can be verified, disclosed and patched.
    sourceIds:
      - darpa-aixcc-results
      - anthropic-glasswing-update
  - phase: operate
    activity: Handling incoming vulnerability reports
    headline: "At curl, nearly all reports use some AI; quality is back up, but so is volume"
    traditional: Security teams and open source maintainers triaged reports from researchers and bug bounty programs, checked whether each was a real vulnerability, and coordinated fixes and disclosure.
    aiEra: At curl, Daniel Stenberg wrote in April 2026 that almost every security report now uses AI to some degree. Junk submissions to the curl bug bounty grew intense during 2025 and early 2026, and the project shut the bounty down on 1 February 2026. By April, he found report quality higher, with the rate of confirmed vulnerabilities back to the 2024 pre-AI level, around 15–16%. Reports were arriving at about double the 2025 rate, and he expects this to make maintainer overload worse.
    sourceIds:
      - curl-high-quality-chaos
  - phase: operate
    activity: Monitoring and investigating alerts
    headline: "Some surveyed practitioners already use or test AI tools in their operations"
    traditional: Analysts and security engineers worked through alerts, logs and network monitoring largely by hand, with rules and scripts to cut noise.
    aiEra: In ISC2's 2025 workforce study of 16,029 cybersecurity practitioners and decision-makers, 28% of respondents had already integrated AI tools into their operations, 19% were actively testing them and 22% were in early evaluation. ISC2 notes that AI-driven tools offer the promise of automating repetitive tasks such as monitoring network traffic, identifying anomalies and flagging suspicious behaviour.
    sourceIds:
      - isc2-workforce-2025
tools:
  - tool: github-code-security
    useFor: CodeQL code scanning with Copilot Autofix suggestions for alerts, and security campaigns to track fixes across repositories.
    recommendation: could
    sourceIds:
      - github-autofix-docs
  - tool: semgrep
    useFor: Static analysis, supply chain and secrets scanning, with AI triage that suggests which findings can safely be ignored and gives fix guidance.
    recommendation: could
  - tool: snyk-code
    useFor: Static analysis in the IDE and pull requests, with AI-generated fix suggestions. Free plan available.
    recommendation: could
  - tool: claude-code
    useFor: Running the built-in /security-review command on pending changes, or investigating a finding across a codebase.
    recommendation: could
  - tool: promptfoo
    useFor: Red teaming LLM features and agents for prompt injection, jailbreaks and unauthorised API access, locally or in CI.
    recommendation: could
skills:
  new:
    - Threat modeling AI agents, their tools and their permissions
    - Testing AI features for prompt injection
    - Reviewing AI-suggested security fixes before merge
    - Scoping credentials and autonomy for agents
    - Triaging a high volume of AI-assisted reports and findings
  amplified:
    - Judging whether a finding is real and exploitable
    - Prioritising which vulnerabilities to patch first
    - Secure design review
    - Identity, OAuth and access control
    - Working with developers and maintainers to ship fixes quickly
  lessImportant:
    - Writing routine fixes for common scanner findings by hand
    - Reading every low-risk scanner alert one by one
    - Relying on manual review alone to find deep bugs
risks:
  - headline: In Veracode's tests, AI-generated code often failed security checks
    text: AI-generated code often fails security checks. In Veracode's 2026 tests the average security pass rate across models was 56%, barely changed from its first report.
    sourceIds:
      - veracode-genai-2026
  - headline: "AI fixes can be wrong in quiet ways; GitHub warns Autofix may add vulnerabilities"
    highlight: true
    text: AI fixes can be wrong in quiet ways. GitHub warns that Autofix suggestions may introduce new vulnerabilities, change program semantics, or suggest fabricated dependencies published under statistically probable names.
    sourceIds:
      - github-autofix-docs
  - headline: Prompt injection can turn agents against their users, OWASP warns
    text: Prompt injection can turn agents against their users. Under ASI01, agent goal hijack, OWASP cites hidden prompts that turned copilots into "silent exfiltration engines".
    sourceIds:
      - owasp-agentic-top-10-2026
  - headline: Guardrail filters are not a complete defence against attacks, Willison warns
    text: Guardrail filters are not a complete defence. Willison writes that such products almost always claim to capture "95% of attacks", but "in web application security 95% is very much a failing grade."
    sourceIds:
      - willison-lethal-trifecta
  - headline: "Finding bugs faster does not fix them faster; Stenberg expects worse maintainer overload"
    text: Finding bugs faster does not fix them faster. Anthropic reports that only 75 of the 530 high- or critical-severity bugs it had reported were patched at the time of its update, and argues the limit is how quickly bugs can be verified, disclosed and patched. Daniel Stenberg expects the rising volume of reports to make maintainer overload worse.
    sourceIds:
      - anthropic-glasswing-update
      - curl-high-quality-chaos
first30Days:
  - List every AI coding tool, agent and MCP server your teams use, with the data and credentials each one can reach.
  - For one agent or AI feature, check whether it combines private data, untrusted content and a way to send data out, and remove one of the three where you can.
  - Turn on AI fix suggestions for your scanner in one repository, and review a sample of the suggested fixes yourself before trusting them more widely.
  - Run a prompt injection red team test against one LLM feature before its next release, and add the failing cases to CI.
  - Measure how long it takes from a confirmed finding to a deployed patch, since that is where a larger volume of findings will pile up.
agentSkills:
  - skill: security-threat-model
    useFor: "Threat modeling a repository: trust boundaries, assets, abuse paths and mitigations, written up as Markdown."
  - skill: security-best-practices
    useFor: "Language- and framework-specific security reviews with suggested improvements."
starterSkills:
  - security-finding-triage
  - security-fix-verification
  - agent-permission-review
sources:
  - id: owasp-agentic-top-10-2026
    title: "OWASP Top 10 for Agentic Applications: The Benchmark for Agentic Security in the Age of Autonomous AI"
    publisher: OWASP Gen AI Security Project
    url: https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/
    published: 2025-12-09
    accessed: 2026-09-14
    type: official
    vendorAffiliated: false
    quote: Hidden prompts turned copilots into silent exfiltration engines (ASI01 – Agent Goal Hijack, e.g EchoLeak).
  - id: willison-lethal-trifecta
    title: "The lethal trifecta for AI agents: private data, untrusted content, and external communication"
    publisher: Simon Willison
    url: https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/
    published: 2025-06-16
    accessed: 2026-09-14
    type: practitioner
    vendorAffiliated: false
  - id: veracode-genai-2026
    title: "2026 GenAI Code Security Report: AI Is Writing More of Your Code but Security Hasn't Caught Up"
    publisher: Veracode
    url: https://www.veracode.com/blog/2026-genai-code-security-report-ai-risk/
    published: 2026-07-28
    accessed: 2026-09-14
    type: vendor
    vendorAffiliated: true
    quote: But performance fell sharply on cross-site scripting at 15% and log injection at 12%.
  - id: github-autofix-docs
    title: "Application card: GitHub security and quality AI features"
    publisher: GitHub Docs
    url: https://docs.github.com/en/code-security/responsible-use/responsible-use-autofix-code-scanning
    accessed: 2026-09-14
    type: vendor
    vendorAffiliated: true
    quote: Copilot Autofix automatically generates code change suggestions for CodeQL alerts found on pull requests and on the default branch.
  - id: darpa-aixcc-results
    title: AI Cyber Challenge marks pivotal inflection point for cyber defense
    publisher: DARPA
    url: https://www.darpa.mil/news/2025/aixcc-results
    published: 2025-08-08
    accessed: 2026-09-14
    type: official
    vendorAffiliated: false
    quote: In total, competitors' systems discovered 54 unique synthetic vulnerabilities in the Final Competition's 63 challenges. Of those, they patched 43.
  - id: anthropic-glasswing-update
    title: "Project Glasswing: An initial update"
    publisher: Anthropic
    url: https://www.anthropic.com/research/glasswing-initial-update
    published: 2026-05-22
    accessed: 2026-09-14
    type: vendor
    vendorAffiliated: true
    quote: Progress on software security used to be limited by how quickly we could find new vulnerabilities. Now it's limited by how quickly we can verify, disclose, and patch the large numbers of vulnerabilities found by AI.
  - id: curl-high-quality-chaos
    title: High-Quality Chaos
    publisher: daniel.haxx.se (Daniel Stenberg)
    url: https://daniel.haxx.se/blog/2026/04/22/high-quality-chaos/
    published: 2026-04-22
    accessed: 2026-09-14
    type: practitioner
    vendorAffiliated: false
    quote: The quality is higher. The rate of confirmed vulnerabilities is back to and even surpassing the 2024 pre-AI level, meaning somewhere in the 15-16% range.
  - id: isc2-workforce-2025
    title: 2025 ISC2 Cybersecurity Workforce Study
    publisher: ISC2
    url: https://www.isc2.org/Insights/2025/12/2025-ISC2-Cybersecurity-Workforce-Study
    published: 2025-12-04
    accessed: 2026-09-14
    type: survey
    vendorAffiliated: false
    quote: Adoption is progressing, with 28% of respondents having already integrated AI tools into their operations, with a further 19% actively testing them and another 22% in the early evaluation phase.
---

A typical week now starts with more findings than before, many of them found or written up with AI. You spend less time writing routine fixes and more time checking whether a reported issue is real, how exploitable it is and whether an AI-suggested patch actually closes it without breaking something. Scanner output and AI review comments are a first filter, not a verdict, so you still open the code for anything that matters.

Design reviews look different too. Alongside the usual questions about data flows and access control, you ask what each agent or AI feature can read, which untrusted content reaches it and what it is allowed to do on its own. Much of the week goes to narrowing those permissions, testing features for prompt injection, and working with engineering to shorten the path from a confirmed finding to a deployed patch, because that is where the queue now builds up.

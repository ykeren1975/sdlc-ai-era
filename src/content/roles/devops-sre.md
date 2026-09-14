---
title: DevOps / SRE Engineer
order: 80
icon: server-cog
summary: AI agents now triage alerts, draft postmortems and generate infrastructure code. The job shifts toward setting guardrails for agents in production, checking their output and running AI workloads.
lastReviewed: 2026-09-14
sdlcPhases:
  - build
  - deploy
  - operate
shifts:
  - phase: operate
    activity: Triaging alerts
    traditional: The on-call engineer was paged for each alert, then grouped related alerts and gathered context from dashboards, logs and runbooks by hand.
    aiEra: A 2026 Dynatrace survey of 919 leaders and managers responsible for SRE, platform engineering or IT operations at enterprises with annual revenues of $500 million or more reports that half of SREs now use AI-powered capabilities for automated incident response. At Google, an SRE AI alerting agent groups alerts and enriches them with context, and autonomous alert handlers can address or mitigate many issues. Google notes this does not necessarily remove people from the process, especially for higher-risk services and features.
    sourceIds:
      - dynatrace-state-of-sre-2026
      - google-sre-agentic-ai
  - phase: operate
    activity: Investigating and mitigating an incident
    traditional: Responders read dashboards, logs and recent changes, formed hypotheses together and ran mitigation steps from runbooks or by hand.
    aiEra: In a Google walkthrough of a simulated outage, Gemini CLI fetches the incident details and playbook, runs log analysis and time-series correlation tools, and recommends a mitigation. The agent selects only from strictly typed tools whose definitions record potential impact, a policy layer checks whether an action is allowed in the current context, and a human authorises the proposed mutation. The tools come from Google's internal agent framework, not stock Gemini CLI. What the AI proposed and what the human approved are logged.
    sourceIds:
      - google-sre-gemini-cli
  - phase: operate
    activity: Writing postmortems
    traditional: After an incident, responders rebuilt the timeline from chat, metrics and logs, then wrote a blameless postmortem and filed action items.
    aiEra: In the same Google walkthrough, a custom command scrapes the conversation history, metrics and logs, builds a timeline, drafts the postmortem from a standard template, suggests action items and files them as bugs with owners. Lorin Hochstein warns that the consequences of a poor LLM-written report are not immediately apparent, so reports can have the right form but be incorrect, with no obvious test for correctness.
    sourceIds:
      - google-sre-gemini-cli
      - hochstein-llm-incident-reports
  - phase: operate
    activity: Maintaining runbooks
    traditional: Engineers wrote runbooks and production documentation by hand and updated them when someone noticed a gap, often after an incident.
    aiEra: Google SRE has built AI agents that continuously monitor and improve playbooks and production documentation based on how they are used during incidents. Its agents can also generate new playbooks from incidents.
    sourceIds:
      - google-sre-agentic-ai
  - phase: build
    activity: Writing infrastructure as code
    traditional: Engineers wrote Terraform, CloudFormation or Kubernetes manifests by hand and reviewed them in pull requests.
    aiEra: A 2026 benchmark (accepted at SBSeg 2026) of seven language models, including Claude Opus 4 and Gemini 2.5 Pro, generating AWS Terraform across 17 scenarios found that syntactic validity and security compliance are largely separate properties, so a model that reliably writes well-formed Terraform does not necessarily write secure Terraform. The authors, who ran Checkov and Trivy scanners in a GitLab CI/CD pipeline, conclude that prompt engineering alone is insufficient and that automated multi-tool scanning is still needed.
    sourceIds:
      - text-to-terraform-security
  - phase: operate
    activity: Reducing toil
    traditional: SREs cut repetitive operational work by automating it with scripts and tooling.
    aiEra: In Catchpoint's SRE Report 2026, based on 418 responses from practitioners, 49% of respondents said AI decreased their workload, 35% saw no change and 16% said it increased toil. Directors were more likely than individual contributors to say AI reduced toil. One explanation Catchpoint offers is that AI redistributed toil, adding work such as prompt engineering, model monitoring, explaining AI-generated recommendations and managing incidents caused by AI.
    sourceIds:
      - catchpoint-sre-report-2026
  - phase: operate
    activity: Running and monitoring AI workloads
    traditional: SREs set service-level objectives and monitored latency, errors and resource use for conventional services.
    aiEra: Dynatrace reports that 67% of SREs name AI model monitoring as their top use case, and says demand for AI evaluation is outpacing the tools built to handle it. OpenTelemetry's GenAI semantic conventions, in use and under active development, cover telemetry for LLM calls. By default only metadata such as model names, token counts and durations is included, and prompt content and tool arguments are not captured because they can contain sensitive data.
    sourceIds:
      - dynatrace-state-of-sre-2026
      - otel-genai-observability
  - phase: deploy
    activity: Building the delivery platform
    traditional: Operations and platform teams maintained CI/CD pipelines, environments and shared tooling that development teams used to ship.
    aiEra: DORA's 2025 report, drawing on nearly 5,000 technology professionals, found that 90% of organizations have adopted at least one platform, and a direct correlation between a high-quality internal platform and an organization's ability to unlock the value of AI. AI adoption still has a negative relationship with delivery stability. Without strong automated testing, mature version control and fast feedback loops, more change volume leads to instability.
    sourceIds:
      - dora-2025
tools:
  - tool: github-copilot
    useFor: Drafting Terraform, Kubernetes manifests, pipeline files and scripts in the IDE, with changes reviewed in a pull request.
    recommendation: should
  - tool: claude-code
    useFor: Agentic work in a repository or terminal, such as refactoring infrastructure code or tracing a failing pipeline.
    recommendation: could
  - tool: gemini-cli
    useFor: Open-source terminal agent that can be connected to operational tools for investigation and postmortem drafting.
    recommendation: could
    sourceIds:
      - google-sre-gemini-cli
  - tool: checkov
    useFor: Scanning Terraform, CloudFormation, Kubernetes and Helm files for misconfigurations in CI, including AI-generated ones.
    recommendation: should
    sourceIds:
      - text-to-terraform-security
  - tool: opentelemetry
    useFor: Vendor-neutral traces, metrics and logs, including GenAI conventions for token counts, model names and LLM call durations.
    recommendation: should
    sourceIds:
      - otel-genai-observability
  - tool: pagerduty-sre-agent
    useFor: AI agent in PagerDuty that correlates observability signals, suggests diagnostics and runs approved automation during incidents.
    recommendation: could
  - tool: datadog-bits-investigation
    useFor: AI agent in Datadog that investigates alerts against telemetry and proposes likely root causes.
    recommendation: could
  - tool: incident-io
    useFor: On-call, incident response in Slack or Teams, status pages and AI investigations that propose root causes and open pull requests for review.
    recommendation: could
skills:
  new:
    - Designing tool permissions, policies and approval steps for agents that touch production
    - Checking an AI investigation's hypothesis against the underlying evidence
    - Monitoring LLM workloads for token use, latency and output quality
    - Keeping runbooks and incident history usable as context for agents
    - Trialling AI SRE tools against your own past incidents
  amplified:
    - Security scanning and policy checks for infrastructure as code
    - Service-level objectives and alert design
    - Incident coordination and command
    - Blameless postmortem analysis
    - Change management and rollback discipline
    - Building internal platforms and golden paths
  lessImportant:
    - Manually correlating dashboards and logs for first-pass triage
    - Hand-writing boilerplate Terraform and YAML
    - Assembling incident timelines by hand
risks:
  - text: Generated infrastructure code can be valid but insecure. A 2026 Terraform benchmark found well-formed output was no guarantee of security compliance, and that prompting alone did not fix it.
    sourceIds:
      - text-to-terraform-security
  - text: An action that is safe in one system state can be unsafe in another. Google's example is a binary rollback, generally safe but not while a service is receiving a configuration push, which is why its setup combines typed tools, a policy layer that checks the current context, and a human confirmation step.
    sourceIds:
      - google-sre-gemini-cli
  - text: An LLM-drafted postmortem can look complete and still be wrong. Lorin Hochstein notes there is no obvious test for correctness, so errors may go unnoticed.
    sourceIds:
      - hochstein-llm-incident-reports
  - text: AI can move toil instead of removing it. In Catchpoint's report, 16% of respondents said AI increased toil, and Catchpoint lists new work such as model monitoring and managing incidents caused by AI.
    sourceIds:
      - catchpoint-sre-report-2026
  - text: More change volume without strong automated testing, version control and fast feedback loops leads to instability, according to DORA.
    sourceIds:
      - dora-2025
first30Days:
  - Check your organisation's rules on what production data, logs and incident details may be sent to AI tools.
  - Run an AI investigation tool or agent against three past incidents with known root causes and compare its findings with what actually happened.
  - List the actions any agent can take in production, and classify each as read-only, reversible or destructive before granting access.
  - Add an IaC scanner such as Checkov to the pipeline for every infrastructure pull request, whether a person or an AI wrote the change.
  - If your team runs LLM features, add token usage, latency and error metrics to your dashboards and agree who owns quality alerts.
sources:
  - id: dora-2025
    title: Announcing the 2025 DORA Report
    publisher: Google Cloud
    url: https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report
    published: 2025-09-23
    accessed: 2026-09-14
    quote: Our data shows that 90% of organizations have adopted at least one platform and there is a direct correlation between a high quality internal platform and an organization's ability to unlock the value of AI, making it an essential foundation for success.
  - id: google-sre-agentic-ai
    title: How Google SRE is using agentic AI to improve operations
    publisher: Google Cloud (Stevan Malesevic and Christopher Heiser)
    url: https://cloud.google.com/blog/products/devops-sre/how-google-sre-is-using-agentic-ai-to-improve-operations
    published: 2026-05-29
    accessed: 2026-09-14
    quote: An agentic approach does not necessarily imply removing people from the process, specifically for higher-risk services and features, but it does significantly reduce the time people need to spend, as a number of issues can be detected and auto-addressed before they need to be reviewed by a person.
  - id: google-sre-gemini-cli
    title: How Google SREs Use Gemini CLI to Solve Real-World Outages
    publisher: Google Cloud (Riccardo Carlesso and Ramón Medrano Llamas)
    url: https://cloud.google.com/blog/topics/developers-practitioners/how-google-sres-use-gemini-cli-to-solve-real-world-outages
    published: 2026-01-22
    accessed: 2026-09-14
    quote: The agent proposes the mutation, but Ramón authorizes it. This allows us to move at AI speed while maintaining human accountability.
  - id: hochstein-llm-incident-reports
    title: I am dreading our LLM-written incident report future
    publisher: Surfing Complexity (Lorin Hochstein)
    url: https://surfingcomplexity.blog/2026/06/19/i-am-dreading-our-llm-written-incident-report-future/
    published: 2026-06-19
    accessed: 2026-09-14
    quote: The consequences of a poor report aren't immediately apparent the way incorrect code or an incorrect operational diagnosis are in the moment. Instead, we get incident reports that have the superficially correct form, but are actually incorrect, with no obvious test for correctness.
  - id: catchpoint-sre-report-2026
    title: "SRE Report 2026: What surprised us, what didn't, and why the gaps matter most"
    publisher: Catchpoint (Denton Chikura)
    url: https://www.catchpoint.com/blog/sre-report-2026-what-surprised-us-what-didnt-and-why-the-gaps-matter-most
    published: 2026-01-22
    accessed: 2026-09-14
    quote: AI reduced some toil. Nearly half (49%) of respondents said it decreased their workload. But 35% saw no change, and 16% said it increased toil.
  - id: dynatrace-state-of-sre-2026
    title: As AI Scales Across Enterprises, Breaking Points Emerge
    publisher: Dynatrace
    url: https://www.dynatrace.com/news/press-release/state-of-sre-platform-engineering-2026/
    published: 2026-08-25
    accessed: 2026-09-14
    quote: Half of SREs now use AI‑powered capabilities for automated incident response, signaling a shift toward agentic operations where observability must act as the control plane that governs when and how autonomous actions are taken.
  - id: text-to-terraform-security
    title: "Security-First Evaluation of Text-to-Terraform: Benchmarking LLMs and SLMs for Secure IaC Generation"
    publisher: arXiv (Francis Luis Santos Vargas, Rodrigo Brandão Mansilha, Diego Kreutz)
    url: https://arxiv.org/abs/2608.02672
    published: 2026-08-02
    accessed: 2026-09-14
    quote: "Consequently, prompt engineering alone is insufficient: automated multi-tool scanning remains a necessary complement to LLM-assisted IaC generation regardless of model family or prompt strategy."
  - id: otel-genai-observability
    title: "Inside the LLM Call: GenAI Observability with OpenTelemetry"
    publisher: OpenTelemetry (James Newton-King)
    url: https://opentelemetry.io/blog/2026/genai-observability/
    published: 2026-05-14
    accessed: 2026-09-14
    quote: By default, no prompt content or tool arguments are captured with GenAI telemetry, as these can contain sensitive data.
---

A typical week now starts with checking what the agents did overnight. Some alerts arrive already grouped, with a suggested cause attached. Your job is to open the logs and traces behind that suggestion and decide whether it holds up before anyone acts on it. During an incident, an assistant may propose a mitigation. You still decide whether it is safe in the current state of the system, and you keep someone coordinating the humans. Afterwards a drafted postmortem saves hours of assembling timelines, but you read it against the evidence and rewrite the parts that sound right without being right.

More of the week goes into guardrails than into typing commands: which tools an agent may call, which actions need a second approval, and which pipeline checks every infrastructure change must pass, whoever wrote it. Existing automation that already works does not need to be rebuilt around AI. If your organisation ships LLM features, you also own a new kind of service, with token costs, latency and output quality to watch and sensitive prompt data to keep out of your telemetry.

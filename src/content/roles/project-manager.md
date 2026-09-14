---
title: Project Manager
order: 100
icon: chart-gantt
summary: AI tools draft status reports, meeting summaries and risk flags from plan and tracker data. Checking those drafts, deciding what to escalate and keeping stakeholders aligned stay with the project manager.
tagline: AI drafts reports and risk flags; you check, escalate and align
lastReviewed: 2026-09-14
sdlcPhases:
  - plan
  - build
shifts:
  - phase: plan
    activity: Building the plan and schedule
    headline: "Microsoft's Planner Agent can generate plan tasks from a goal and files"
    traditional: Project managers broke the scope into tasks, estimated durations and dependencies, and built the schedule in a scheduling tool or spreadsheet, then updated it by hand as work moved.
    aiEra: Microsoft's Planner Agent can generate tasks for a plan based on a given goal and relevant files. APM's 2025 survey of 1,000 project professionals asked which project functions had benefited most from AI. Task and schedule automation was one of the main responses, cited by 50% of project professionals using AI who had seen a benefit.
    sourceIds:
      - microsoft-planner-agent-faq
      - apm-ai-survey-2025
  - phase: build
    activity: Writing status reports
    headline: Agents can draft status reports; review them and give feedback
    highlight: true
    traditional: Project managers chased updates from team members, pulled progress figures from the plan and tracker, and wrote the weekly status report by hand.
    aiEra: Planner Agent can generate a customised status report based on the current state of work and your reporting needs. Atlassian's Jira Delivery Agent creates a daily status digest and end-of-cycle summaries of completed work. Atlassian recommends reviewing the agent's summaries regularly and giving feedback to improve their accuracy and usefulness.
    sourceIds:
      - microsoft-planner-agent-faq
      - atlassian-jira-delivery-agent
  - phase: plan
    activity: Maintaining the risk and issue log
    headline: "Agents can flag stale work; one trial user says escalating needs judgement"
    highlight: true
    traditional: Risks, assumptions, issues and dependencies were raised in workshops and status meetings and kept in a RAID log that the project manager reviewed and updated by hand.
    aiEra: Jira Delivery Agent identifies risks such as stale work, blocked items or slipping deadlines, and follows up with assignees on work items that haven't moved for a specified period. In APM's 2025 survey, risk analysis and forecasting was cited by 50% of project professionals using AI who had seen a benefit. In a late-2024 UK government trial of Microsoft 365 Copilot, one project delivery participant said the tool can identify trends, but decisions about which risks to escalate still require deep understanding and human judgement.
    sourceIds:
      - atlassian-jira-delivery-agent
      - apm-ai-survey-2025
      - ukgov-m365-copilot-experiment
  - phase: build
    activity: Running meetings and tracking actions
    headline: "Copilot suggests meeting actions; accept or discard Rovo's Jira updates"
    highlight: true
    traditional: Project managers took minutes, wrote up decisions and action items after the meeting, and updated the tracker themselves.
    aiEra: Copilot in Teams meetings summarises key discussion points, including who spoke and what they said, and suggests action items. When a Loom meeting is connected to a Jira space, Rovo analyses the transcript and recommends updates such as reassigning work items, changing priority or status, or adding a comment. You can accept or discard each suggestion, or accept all.
    sourceIds:
      - microsoft-teams-copilot-meetings
      - atlassian-loom-jira-suggestions
  - phase: plan
    activity: Allocating resources and forecasting outcomes
    headline: "Some UK project professionals say AI aids forecasting and scheduling"
    traditional: Resource plans and forecasts were built in spreadsheets from team availability and the project manager's own estimates of remaining work.
    aiEra: In APM's 2026 research with 1,000 UK project professionals, 27% said AI was fully embedded in their workflows. The activities it supported included predicting project outcomes and improving forecasting accuracy, assisting with resource allocation and supporting task scheduling. In APM's 2025 survey, resource allocation was cited by 50% of project professionals using AI who had seen a benefit.
    sourceIds:
      - apm-ai-embedded-2026
      - apm-ai-survey-2025
  - phase: build
    activity: Communicating with stakeholders
    headline: "Jira's agent drafts updates per audience; Capterra says AI can't build trust"
    traditional: Project managers tailored updates for sponsors, steering groups and delivery teams, and handled alignment, negotiation and conflict in conversation.
    aiEra: Jira Delivery Agent produces delivery artefacts for different audiences, including team stand-ups and executive summaries. In APM's 2025 survey, stakeholder communications was cited by 43% of project professionals using AI who had seen a benefit. Capterra, which surveyed 2,545 management-level respondents responsible for project management software decisions in 11 countries in July 2025, writes that AI "can't build trust or resolve conflict". In that survey, 60% of PMs said they had increased their use of emotional intelligence since adopting AI.
    sourceIds:
      - atlassian-jira-delivery-agent
      - apm-ai-survey-2025
      - capterra-pm-trends-2025
tools:
  - tool: microsoft-365-copilot
    useFor: Summarising Teams meetings, including who spoke and what they said, with suggested action items. With a Copilot license, Planner Agent generates status reports from a plan's current state of work.
    recommendation: should
    sourceIds:
      - microsoft-teams-copilot-meetings
      - microsoft-planner-agent-faq
  - tool: atlassian-rovo
    useFor: Jira Delivery Agent status digests, stakeholder summaries and risk flags such as stale work, blocked items or slipping deadlines, and suggested Jira updates from Loom meeting transcripts.
    recommendation: could
    sourceIds:
      - atlassian-jira-delivery-agent
      - atlassian-loom-jira-suggestions
  - tool: asana
    useFor: AI on paid plans, and AI Studio automations for intake, routing and updates.
    recommendation: could
  - tool: smartsheet
    useFor: Generating formulas from plain-language descriptions, analysing sheet data into charts and metrics, and drafting text summaries such as stakeholder updates.
    recommendation: could
  - tool: chatgpt
    useFor: General AI assistant for drafting and summarising project documents and analysing files and data.
    recommendation: should
skills:
  new:
    - Checking AI-generated status reports against the plan and the team
    - Giving agents clear instructions on report sections, length and audience
    - Reviewing AI risk flags before they reach the RAID log
    - Knowing which project and meeting data may go into AI tools
  amplified:
    - Judging which risks to escalate and how
    - Keeping plan and tracker data accurate
    - Stakeholder management and building trust
    - Negotiation and conflict resolution
    - Emotional intelligence
  lessImportant:
    - Writing weekly status reports from a blank page
    - Typing up meeting minutes and action lists
    - Manually sweeping the tracker for stalled work
    - Building spreadsheet formulas and dashboards by hand
risks:
  - text: AI output can be wrong or expose data. Among project professionals using AI in APM's 2025 survey, 44% cited security or data privacy and 41% inaccuracy or untrustworthiness of using AI at work as concerns. The UK government's late-2024 Copilot trial concluded that human oversight was required at all times.
    sourceIds:
      - apm-ai-survey-2025
      - ukgov-m365-copilot-experiment
  - text: Summaries of complex work can miss context. A finance participant in the late-2024 UK government trial said Copilot generates initial summaries and reports efficiently but struggles with complex data requiring contextual input.
    sourceIds:
      - ukgov-m365-copilot-experiment
  - text: Generated reports depend on the data in the tool. Planner Agent reports on the current state of work in the plan, and Atlassian says its Delivery Agent generates higher-quality output when analysing delivery data within Jira. Keep plans and tickets current before relying on them.
    sourceIds:
      - microsoft-planner-agent-faq
      - atlassian-jira-delivery-agent
  - text: Buying AI features is not the same as using them well. In Capterra's 2025 survey, 41% of respondents cited AI adoption issues as their top software challenge, driven by skill gaps, poor onboarding and workflow misalignment.
    sourceIds:
      - capterra-pm-trends-2025
first30Days:
  - Check your organisation's AI policy for which tools you may use, and whether meeting transcripts and project data may go into them.
  - Generate one status report with an AI feature in the tool your team already uses, compare it with the report you would have written, and note what it got wrong or left out.
  - Clean up stale tasks and ownerless tickets in your plan before switching on any AI status or risk feature.
  - Turn on AI meeting summaries for one recurring meeting and check the suggested action items against your own notes for two weeks.
  - Review any AI-flagged risks with the owner before adding them to the RAID log, and keep the escalation decision with a person.
agentSkills:
  - skill: internal-comms
    useFor: "Writing status reports and other internal communications in your organisation's formats."
  - skill: notion-meeting-intelligence
    useFor: "Preparing meeting agendas and pre-reads with context from Notion."
  - skill: linear
    useFor: "Reading, creating and updating issues and projects in Linear."
starterSkills:
  - weekly-status-report
  - raid-log-triage
  - meeting-actions-followup
sources:
  - id: apm-ai-survey-2025
    title: AI use in Project Management nearly doubles in just two years, APM survey finds
    publisher: Association for Project Management (APM)
    url: https://www.apm.org.uk/news/ai-use-in-project-management-nearly-doubles-in-just-two-years-apm-survey-finds/
    published: 2025-09-09
    accessed: 2026-09-14
    quote: Task and schedule automation – 50% of project professionals using AI who have seen a benefit
  - id: apm-ai-embedded-2026
    title: AI becomes increasingly embedded in project delivery, new APM research reveals
    publisher: Association for Project Management (APM)
    url: https://www.apm.org.uk/news/ai-becomes-increasingly-embedded-in-project-delivery-new-apm-research-reveals-1/
    published: 2026-03-31
    accessed: 2026-09-14
    quote: "Findings from the research show that over a quarter (27%) of project professionals across industry sectors say that AI is fully embedded into their workflows and is used to support a wide range of activities including:"
  - id: capterra-pm-trends-2025
    title: "AI in Project Management: 2025 Software Trends Report"
    publisher: Capterra (Olivia Montgomery and Caroline Rousseau)
    url: https://www.capterra.com/resources/2025-pm-software-trends/
    published: 2025-09-04
    accessed: 2026-09-14
    quote: AI can generate plans, but it can't build trust or resolve conflict. That's why 60% of PMs say they've increased their use of emotional intelligence (EI) since adopting AI.
  - id: ukgov-m365-copilot-experiment
    title: "Microsoft 365 Copilot Experiment: Cross-Government Findings Report"
    publisher: GOV.UK
    url: https://www.gov.uk/government/publications/microsoft-365-copilot-experiment-cross-government-findings-report/microsoft-365-copilot-experiment-cross-government-findings-report-html
    published: 2025-06-02
    accessed: 2026-09-14
    quote: For risk mitigation, M365 Copilot can identify trends, but decisions about which risks to escalate or how to approach them still require deep understanding and human judgment.
  - id: microsoft-planner-agent-faq
    title: Frequently asked questions about Planner agent
    publisher: Microsoft Support
    url: https://support.microsoft.com/en-us/planner/copilot/frequently-asked-questions-about-planner-agent
    accessed: 2026-09-14
    quote: The Planner Agent can generate a customized status report for your plan based on the current state of work and your reporting needs.
  - id: atlassian-jira-delivery-agent
    title: Work with Jira Delivery agent
    publisher: Atlassian Support
    url: https://support.atlassian.com/rovo/docs/work-with-jira-delivery-agent/
    accessed: 2026-09-14
    quote: This agent identifies risks, such as stale work, blocked items, or slipping deadlines, and produces tailored delivery artefacts for different audiences, including team stand ups and executive summaries.
  - id: atlassian-loom-jira-suggestions
    title: Get AI-suggested work updates from Loom meetings in Jira
    publisher: Atlassian Support
    url: https://support.atlassian.com/loom/docs/get-ai-suggested-work-item-updates-from-loom-meetings-in-jira/
    accessed: 2026-09-14
    quote: Rovo analyzes the meeting transcript and recommends updates such as reassigning work items, changing priority or status, or adding a comment.
  - id: microsoft-teams-copilot-meetings
    title: Get started with Copilot in Microsoft Teams meetings
    publisher: Microsoft Support
    url: https://support.microsoft.com/en-us/office/get-started-with-copilot-in-microsoft-teams-meetings-0bf9dd3c-96f7-44e2-8bb8-790bedf066b1
    accessed: 2026-09-14
    quote: Copilot summarizes key discussion points, including who spoke and what they said. It also suggests action items and answers any questions you have, in real time during or after a meeting.
---

A typical week now starts with drafts instead of blank pages. The status report, the stand-up digest and the notes from the steering meeting may already exist when you sit down, produced from the plan, the tracker and the meeting transcript. Your time goes into reading them critically. Is that task really on track? Did the summary catch the decision the sponsor actually made? Is the "blocked" item blocked, or just not updated? Keeping the plan and tickets honest matters more, because the generated report will repeat whatever they say.

The parts of the job that did not get faster are the ones that involve people. An AI feature can flag a slipping milestone, but deciding whether to escalate it, who to tell first and how to frame it is still your call. The same goes for negotiating resources with another team, resetting expectations with a sponsor or settling a disagreement between leads. Use the time saved on reporting to have those conversations earlier, and treat anything an AI tool produces as a draft you are accountable for.

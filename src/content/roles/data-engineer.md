---
title: Data Engineer / Analyst
order: 90
icon: database
summary: AI tools draft SQL and pipeline code and answer business questions in plain language. The job shifts toward defining business meaning, testing AI output and checking numbers before they reach stakeholders.
tagline: AI drafts the SQL; you define meaning and check the numbers
lastReviewed: 2026-09-14
sdlcPhases:
  - design
  - build
  - test
  - operate
shifts:
  - phase: build
    activity: Writing SQL, transformation models and pipeline code
    headline: Most surveyed practitioners now use AI tools daily; organisations lag behind
    highlight: true
    traditional: Data engineers, analytics engineers and analysts wrote SQL, transformation models, pipeline code, tests and documentation by hand, and teammates reviewed the changes.
    aiEra: In Joe Reis's 2026 State of Data Engineering Survey (about 1,100 responses; the post gives both 1,101 and 1,001), 82% use AI tools daily or more and only 3.7% find them unhelpful. Organisational adoption lags behind, with 64% still experimenting or using AI for tactical tasks only. In dbt Labs' 2026 State of Analytics Engineering survey of 363 data practitioners and leaders, 72% prioritise AI-assisted coding within their development process.
    sourceIds:
      - reis-state-of-data-engineering-2026
      - dbt-state-of-analytics-engineering-2026
  - phase: build
    activity: Building ELT pipelines with AI agents
    headline: On a benchmark, agents largely solve extract and load; transformation improves
    traditional: Engineers built Extract-Load-Transform pipelines by hand, which is labour-intensive work, setting up extraction and loading from source systems and then writing the transformation models.
    aiEra: On ELT-Bench, the first benchmark for end-to-end ELT pipeline construction, AI agents initially showed low success rates. A 2026 re-evaluation with upgraded language models found that the extraction and loading stage is largely solved, while transformation performance improves significantly. The same study found that most failed transformation tasks contained benchmark errors, including rigid evaluation scripts, ambiguous specifications and incorrect ground truth, that penalised correct agent output.
    sourceIds:
      - elt-bench-verified
  - phase: test
    activity: Testing and monitoring pipelines
    headline: "In dbt's survey, validation investment isn't keeping pace with AI output"
    traditional: Teams added data tests and monitoring to pipelines and investigated failures when a check or a stakeholder flagged bad data.
    aiEra: In dbt Labs' 2026 survey, only 24% prioritise AI-assisted pipeline management, including testing, observability and quality controls. The report says AI is scaling engineering throughput and stakeholder-facing outputs, but investment in validation, testing and governance mechanisms isn't scaling at the same rate. 71% of respondents are concerned about hallucinated or incorrect data reaching stakeholders.
    sourceIds:
      - dbt-state-of-analytics-engineering-2026
  - phase: operate
    activity: Answering business questions
    headline: Check AI-generated SQL that might run fine yet return wrong results
    highlight: true
    traditional: Business users sent questions to analysts, who found the right tables, wrote the SQL and returned a number, chart or dashboard.
    aiEra: With text-to-SQL, a language model generates the SQL from the question. dbt Labs notes that the model might join tables incorrectly, misinterpret a column's meaning, or produce a query that runs successfully but returns wrong results. A 2026 research paper argues that NL2SQL agents still make mistakes on large-scale real-world databases because they lack knowledge of how to use the underlying data, such as the intent of each column, and form misconceptions about the data when querying it.
    sourceIds:
      - dbt-semantic-layer-vs-text-to-sql-2026
      - tribal-knowledge-data-agents
  - phase: design
    activity: Defining metrics and business meaning
    headline: Write down business definitions, which can improve AI query accuracy
    highlight: true
    traditional: Analytics engineers defined metrics and business logic in data models, BI tools and documentation so that reports used the same definitions.
    aiEra: A 2026 preprint (not peer reviewed) tested Claude Opus 4.7, Claude Sonnet 4.6 and GPT-5.4 single-shot on 100 questions over one retail dataset. Adding a 4 KB hand-written document describing measures, conventions and disambiguation rules improved accuracy by 17 to 23 percentage points, to 67.7–68.7%. In dbt Labs' own 2026 benchmark update (11 questions, each run 20 times), adding three models let its Semantic Layer cover every question on its single ACME Insurance dataset, and text-to-SQL improved too. Snowflake's documentation says schemas lack knowledge like business process definitions and metrics handling, and Cortex Analyst uses a semantic model to bridge that gap.
    sourceIds:
      - semantic-layer-paired-benchmark
      - dbt-semantic-layer-vs-text-to-sql-2026
      - snowflake-cortex-analyst-docs
  - phase: test
    activity: Choosing and evaluating an AI query tool
    headline: "Two text-to-SQL benchmarks had high annotation error rates that moved rankings"
    traditional: Teams compared query and BI tools on features, performance and fit with their existing data stack.
    aiEra: The research community depends on public text-to-SQL benchmarks and leaderboards to compare techniques and select one for deployment. A 2026 expert analysis found annotation error rates of 52.8% in BIRD Mini-Dev and 62.8% in Spider 2.0-Snow. When the authors re-evaluated 16 open-source agents from the BIRD leaderboard on a corrected subset of the BIRD Dev set, relative performance changed by −7% to 31% and rankings moved by up to nine positions. Snowflake's documentation describes evaluating a semantic view by running your verified queries against Cortex Analyst.
    sourceIds:
      - text-to-sql-annotation-errors
      - snowflake-cortex-analyst-docs
tools:
  - tool: github-copilot
    useFor: Drafting SQL, Python and pipeline code in the IDE with completions, chat and agent mode, with changes reviewed in a pull request.
    recommendation: should
  - tool: claude-code
    useFor: Agentic work in a data or dbt repository from the terminal or IDE, such as building, debugging and refactoring models and pipeline code.
    recommendation: could
  - tool: dbt
    useFor: Transformation models with tests, documentation and a Semantic Layer. dbt Copilot generates SQL, documentation, tests and semantic models, and the open-source dbt MCP server gives AI clients project metadata, Semantic Layer queries and dbt commands.
    recommendation: should
  - tool: snowflake-cortex-analyst
    useFor: Answering business questions in natural language over Snowflake data using a semantic view, and evaluating it with verified queries.
    recommendation: could
    sourceIds:
      - snowflake-cortex-analyst-docs
  - tool: databricks-genie
    useFor: Natural-language questions over Databricks data, with example queries, text snippets and parameterized SQL added by subject matter experts, governed through Unity Catalog.
    recommendation: could
  - tool: hex
    useFor: Notebooks with AI assistance for code-based analysis, Threads for business users to ask questions in plain language, and semantic models to govern AI answers.
    recommendation: could
  - tool: monte-carlo
    useFor: Table monitors that learn normal update, size and growth patterns and alert on breaks, plus a Troubleshooting Agent (in preview) that traces an alert's root cause.
    recommendation: could
skills:
  new:
    - Writing semantic models and business definitions that AI tools can use
    - Checking AI-generated SQL for wrong joins and misread columns
    - Building a set of verified questions and answers to evaluate query tools
    - Reviewing agent-generated pipeline and transformation changes
    - Deciding which questions AI may answer without an analyst
  amplified:
    - Data modeling
    - Data testing and observability
    - Metric definitions and data ownership
    - Knowing the quirks of your own data
    - Data governance and access control
    - Explaining uncertainty in a number to stakeholders
  lessImportant:
    - Writing boilerplate SQL and YAML by hand
    - Hand-writing extraction and loading code for common sources
    - Answering routine one-off data requests
risks:
  - text: AI-generated SQL can run without errors and still return the wrong number. dbt Labs notes that with text-to-SQL, failure looks like a plausible but incorrect answer, while with its Semantic Layer failure looks like an error message.
    sourceIds:
      - dbt-semantic-layer-vs-text-to-sql-2026
  - text: A semantic layer only covers what has been modeled. In dbt Labs' benchmark, questions the Semantic Layer could not answer in 2023 still could not be answered without additional modeling. Its text-to-SQL runs loaded the entire schema as context, which dbt Labs says isn't practical for larger datasets.
    sourceIds:
      - dbt-semantic-layer-vs-text-to-sql-2026
  - text: Leaderboard scores are a weak basis for choosing a tool. Researchers found annotation error rates of 52.8% in BIRD Mini-Dev and 62.8% in Spider 2.0-Snow, and warn that annotation errors can distort reported performance and rankings and could misguide deployment choices.
    sourceIds:
      - text-to-sql-annotation-errors
  - text: Output can grow faster than checking. In dbt Labs' 2026 survey, 72% prioritise AI-assisted coding but only 24% prioritise AI-assisted pipeline management, and 71% are concerned about hallucinated or incorrect data reaching stakeholders.
    sourceIds:
      - dbt-state-of-analytics-engineering-2026
  - text: Sensitive data can end up in AI tools. In dbt Labs' survey, practitioners showed a 7-percentage-point higher level of concern than leaders about exposing sensitive data to LLMs.
    sourceIds:
      - dbt-state-of-analytics-engineering-2026
first30Days:
  - Check which AI tools you may use and which warehouse data, schemas and query results may be sent to them.
  - Write 20 to 30 real business questions with verified answers and run any AI query tool against them before rolling it out.
  - Pick your five most-used metrics and make sure each has one written definition in your semantic layer or models, with an owner.
  - Review the last few AI-assisted changes to your pipelines and add tests where a wrong join or duplicate rows would go unnoticed.
  - Try an agent on one well-understood transformation task and compare its output row by row with the existing model.
agentSkills:
  - skill: jupyter-notebook
    useFor: "Creating and editing Jupyter notebooks for explorations and experiments."
  - skill: xlsx
    useFor: "Opening, cleaning and creating spreadsheets and CSV files."
starterSkills:
  - sql-answer-sanity-check
  - pipeline-change-review
  - metric-definition-writeup
sources:
  - id: dbt-state-of-analytics-engineering-2026
    title: 2026 State of Analytics Engineering Report
    publisher: dbt Labs
    url: https://www.getdbt.com/resources/state-of-analytics-engineering-2026
    published: 2026-04-10
    accessed: 2026-09-14
    quote: While 72% prioritize AI-assisted coding, only 24% prioritize AI-assisted pipeline management, including testing, observability, and quality controls.
  - id: reis-state-of-data-engineering-2026
    title: The 2026 State of Data Engineering Survey (Interactive)
    publisher: Practical Data (Joe Reis)
    url: https://joereis.substack.com/p/the-2026-state-of-data-engineering
    published: 2026-02-10
    accessed: 2026-09-14
    quote: "82% of you use AI tools daily or more. Only 3.7% find them unhelpful. But organizational adoption lags way behind."
  - id: dbt-semantic-layer-vs-text-to-sql-2026
    title: "Semantic Layer vs. Text-to-SQL: 2026 Benchmark Update"
    publisher: dbt Labs (Jason Ganz and Benoit Perigaud)
    url: https://docs.getdbt.com/blog/semantic-layer-vs-text-to-sql-2026
    published: 2026-04-07
    accessed: 2026-09-14
    quote: With text-to-SQL, failure looks like a plausible but incorrect answer.
  - id: semantic-layer-paired-benchmark
    title: "Semantic Layers for Reliable LLM-Powered Data Analytics: A Paired Benchmark of Accuracy and Hallucination Across Three Frontier Models"
    publisher: arXiv (Michael Rumiantsau and Ivan Fokeev)
    url: https://arxiv.org/abs/2604.25149
    published: 2026-04-28
    accessed: 2026-09-14
    quote: Adding the document improves accuracy by +17 to +23 percentage points across all three models.
  - id: text-to-sql-annotation-errors
    title: Pervasive Annotation Errors Break Text-to-SQL Benchmarks and Leaderboards
    publisher: arXiv (Tengjun Jin, Yoojin Choi, Yuxuan Zhu and Daniel Kang)
    url: https://arxiv.org/abs/2601.08778
    published: 2026-01-13
    accessed: 2026-09-14
    quote: Through expert analysis, we show that BIRD Mini-Dev and Spider 2.0-Snow have error rates of 52.8% and 62.8%, respectively.
  - id: elt-bench-verified
    title: "ELT-Bench-Verified: Benchmark Quality Issues Underestimate AI Agent Capabilities"
    publisher: arXiv (Christopher Zanoli, Andrea Giovannini, Tengjun Jin, Ana Klimovic and Yotam Perlitz)
    url: https://arxiv.org/abs/2603.29399
    published: 2026-03-31
    accessed: 2026-09-14
    quote: First, re-evaluating ELT-Bench with upgraded large language models reveals that the extraction and loading stage is largely solved, while transformation performance improves significantly.
  - id: tribal-knowledge-data-agents
    title: Arming Data Agents with Tribal Knowledge
    publisher: arXiv (Shubham Agarwal et al.)
    url: https://arxiv.org/abs/2602.13521
    published: 2026-02-13
    accessed: 2026-09-14
    quote: Nonetheless, NL2SQL agents still make mistakes when faced with large-scale real-world databases because they lack knowledge of how to correctly leverage the underlying data (e.g., knowledge about the intent of each column) and form misconceptions about the data when querying it, leading to errors.
  - id: snowflake-cortex-analyst-docs
    title: Cortex Analyst
    publisher: Snowflake Documentation
    url: https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-analyst
    accessed: 2026-09-14
    quote: Generic AI solutions often struggle with text-to-SQL conversions when given only a database schema, as schemas lack critical knowledge like business process definitions and metrics handling.
---

A typical week now involves less typing of SQL and more reading of it. An assistant drafts a new model or a fix to a failing pipeline, and you check the joins, the grain and the row counts before the change goes to review. When a stakeholder asks a question, they may have already asked an AI tool and come to you with a number. Part of your job is to find out where that number came from and whether it used the right definition.

More of the week goes into the things AI tools depend on: clear metric definitions, documented tables, tests that catch duplicate rows or late data, and a set of known questions with verified answers to try new tools against. Agents can take on routine pipeline work, but you still own what reaches a dashboard or a board deck. Treat a confident answer with no visible query or definition behind it as unchecked until you have checked it.

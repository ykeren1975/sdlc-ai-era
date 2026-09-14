---
name: research-synthesis-check
description: "Drafts themes and findings from moderated user research sessions, such as interview transcripts and usability test notes, links every finding to raw evidence, and lists what needs the researcher's own judgement, such as possible priming or leading questions. Use when a UX designer or researcher asks to analyse or synthesise interviews or usability sessions, code or tag session notes, separate observed behaviour from what participants said, or check an AI-generated research summary against the raw data. For high-volume feedback such as tickets or surveys, use the product manager's feedback synthesis instead."
---

# Research Synthesis Check

Draft evidence-linked findings from moderated research sessions, and make clear which parts need the researcher's own judgement.

This skill is for interviews and usability tests, where priming and observed behaviour matter and samples are small, so counting is not meaningful. High-volume feedback (support tickets, surveys, reviews) belongs in the product manager's feedback synthesis.

## What to gather first

Ask for anything missing before you start:

- The raw material: transcripts or session notes, each with a participant ID. If only an existing AI summary is available, ask for the raw data too, or state that findings cannot be verified.
- The research questions and study type (interviews or usability test), plus the discussion guide or task list.
- Who the participants were (recruitment criteria, segments) and how many sessions were run.
- Any existing summary or themes to check.
- Confirmation that the data may be used here under the organisation's policy, with personally identifiable information removed.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Restate the research questions and the study setup. Note whether all participants are real users; if any data comes from synthetic users, keep it separate and label it as hypotheses.
2. Read every session. Pull out observations (what people did or said) separately from interpretations (what it might mean). Tag each with the participant ID and a location in the transcript.
3. Code observations with short, descriptive labels. Reuse labels across sessions and merge near-duplicates.
4. Group codes into candidate themes that answer the research questions. Each theme needs evidence from more than one participant, or it is labelled as a single-participant observation.
5. For each theme, record supporting participants, contradicting participants, and one or two verbatim quotes.
6. For usability studies, list task outcomes per participant (completed, completed with difficulty, not completed) as described in the notes. Do not infer outcomes that the notes do not record.
7. Flag moments that need human judgement: questions that may have led or primed the participant, moderator interventions, unusual context, or a participant saying one thing and doing another.
8. If an existing summary was provided, compare it with your evidence. Mark each of its claims as supported, partly supported, unsupported or contradicted.
9. Write findings as neutral statements. Keep design recommendations in a separate, clearly labelled section of ideas to discuss.

## Output format

```markdown
# Research synthesis draft: <study name>

**Research questions:** <list>
**Sessions reviewed:** <count, participant IDs, study type>
**Status:** AI draft; researcher to verify against raw data

## Themes

### <Theme>

- **Finding:** <neutral statement>
- **Supported by:** <participant IDs with transcript locations>
- **Contradicted by:** <participant IDs or "none found">
- **Quotes:** "<verbatim>" (<participant ID>)

## Task outcomes (usability studies)

| Task | Participant | Outcome as recorded | Notes |
| ---- | ----------- | ------------------- | ----- |

## Needs researcher judgement

| Participant | Location | Concern (e.g. possible priming) |
| ----------- | -------- | ------------------------------- |

## Existing summary check

| Claim | Supported / Partly / Unsupported / Contradicted | Evidence |
| ----- | ----------------------------------------------- | -------- |

## Ideas to discuss (not findings)

- <idea linked to theme>

## Assumptions and open questions

- <assumption or question, and who can confirm>
```

## Watch out for

- Do not rely on this draft for the whole analysis. Context such as whether the interviewer primed a participant needs the researcher's own review.
- Synthetic user answers are not research findings. Never mix them with real participant evidence.
- Participants saying they would do something is weaker evidence than what they did in a session. Keep the two apart.
- Counting is not meaningful in small qualitative samples. Describe who said or did what rather than giving counts or percentages.
- Quotes must be verbatim apart from anonymisation. Never reproduce secrets, credentials or personal data (names, emails, account details) in the output unless the user needs them; anonymise quotes by default.
- Do not upload, share or move research data anywhere.

## Before you finish

- [ ] Every finding links to participant IDs and transcript locations.
- [ ] Observations and interpretations are kept separate.
- [ ] Possible priming and other judgement calls are listed.
- [ ] Recommendations are labelled as ideas, not findings.
- [ ] No personal information appears in quotes.
- [ ] Clearly flag your assumptions and anything the researcher must review or decide before these findings are shared.

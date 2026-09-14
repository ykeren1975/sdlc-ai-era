---
name: meeting-actions-followup
description: Turns meeting notes or a transcript into a checked list of decisions, action items and proposed tracker updates, plus a draft follow-up message, marking anything unclear for the organiser to confirm. Use after a project meeting, steering group or stand-up, when reviewing AI-suggested action items or tracker updates, or when asked to "write up the actions", "draft meeting minutes" or "what did we agree in this meeting".
---

# Meeting Actions Follow-up

Produce an accurate record of what a meeting decided and who agreed to do what, ready for the organiser to confirm before anything is shared or updated.

## What to gather first

Ask for anything missing before you start:

- The meeting notes, transcript or AI-generated summary.
- The meeting purpose, date, and list of attendees with their roles.
- The agenda, if there was one.
- Open action items from the previous meeting.
- Related tracker items, if tracker updates are expected.
- The audience for the follow-up message and any confidentiality limits.

Ask for anything missing once. If the user can't provide it or asks you to go ahead, proceed and record every assumption.

## Steps

1. Read the full notes or transcript, not only an existing summary. Compare the summary with the source if both exist.
2. List decisions. For each, quote or closely paraphrase the words that show a decision was made, and note who made it.
3. Separate real decisions from ideas that were only discussed. Put the latter under "discussed, not decided".
4. List action items with owner, due date and the source line. If the owner or date was not stated, write "Not stated" rather than guessing.
5. Check previous open actions: mark each as done, still open or not mentioned.
6. For each AI-suggested tracker update (status, priority, assignee, comment), state whether the notes support it and recommend accept, change or discard.
7. Note open questions and disagreements that were not resolved.
8. Draft a short follow-up message for the stated audience, leaving out sensitive or off-the-record parts.
9. Produce everything as a draft. Do not send messages or change tracker items.

## Output format

```markdown
## Meeting follow-up: <meeting name> — <date>

**Attendees:** <names and roles>
**Status:** Draft for the organiser to confirm

### Decisions

| Decision | Made by | Evidence from notes | Confidence |
| -------- | ------- | ------------------- | ---------- |

### Discussed, not decided

- <topic> — <what is still open>

### Action items

| Action | Owner | Due | Source | Confidence |
| ------ | ----- | --- | ------ | ---------- |

### Previous actions

| Action | Owner | Status (Done / Open / Not mentioned) |
| ------ | ----- | ------------------------------------ |

### Suggested tracker updates

| Item | Suggested change | Supported by notes? | Recommendation (Accept / Change / Discard) |
| ---- | ---------------- | ------------------- | ------------------------------------------ |

### Draft follow-up message

<short message>

### Assumptions and open questions

- <assumption or question (unclear owner, date, decision or sensitive point), and who can confirm>
```

## Watch out for

- Automatic summaries can attribute statements to the wrong person or turn a suggestion into a decision. Check against the source.
- Transcripts miss side conversations, sarcasm, and things agreed after the recording stopped.
- An action with no owner will not happen. Flag it rather than assigning someone.
- Suggested tracker changes such as reassigning work or changing priority affect other people. Each one needs a human to accept it.
- Meetings often contain sensitive remarks about people, budgets or suppliers. Keep them out of the follow-up unless the organiser says otherwise.
- Never reproduce secrets, credentials or personal data in the output unless the user needs them.
- Check whether meeting content may be processed by AI tools under your organisation's policy.

## Before you finish

- [ ] Decisions are separated from things only discussed.
- [ ] Every action has an owner and date, or is marked "Not stated".
- [ ] Every suggested tracker update has a recommendation and evidence.
- [ ] The follow-up message contains nothing sensitive.
- [ ] Nothing was sent and no tracker item was changed.
- [ ] Clearly flag every assumption, and anything the organiser must review or decide before sharing.

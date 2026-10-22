# Incident write-up style

Incident write-ups go to customers and to everyone at Tillwick. Readers want to know what broke, whether it touched them, and what we are changing so it does not happen again. Write for a customer who reads it once, on a phone.

## Structure

Use these section headings, in this order, and no others:

1. Summary
2. Impact
3. Timeline
4. Root cause
5. Resolution
6. Action items

The title is the only first-level heading. The Summary is two to four sentences: what customers saw, when it started and ended, and how many were affected.

## Sentences and words

- Keep every sentence to 25 words or fewer. Tables, code and quotes don't count.
- Say "customers", not "users".
- Spell out an abbreviation the first time it appears in the text, with the short form after it in parentheses: "payment service provider (PSP)". API, URL, UTC, EU and US need no spelling out.
- Write times as 24-hour HH:MM followed by UTC, for example 09:05 UTC. In tables the column header is enough.
- Don't round figures, and don't add figures that are not in the incident record, even ones you could work out from it. Reviewers check every number against the record.
- Use "we" for Tillwick.
- No dashes as punctuation (em dash, en dash or a double hyphen). Hyphens inside words are fine.
- State things plainly. No hype, no "not just X but Y", no closing lines that repeat the point, no exclamation marks.
- Bold is for warnings only. Don't start list items with bold labels.

## Blameless

Describe what systems, processes and teams did. Don't name the person who wrote, reviewed or deployed a change, and don't name individual responders; say "the on-call engineer" or name the team. Owners in the action items table stay as they are.

## Evidence

Config snippets, log excerpts, tables and quotes stay exactly as recorded, typos included. They are evidence.

---
name: linkedin-ats-analyzer
description: Analyze a LinkedIn profile PDF export (from LinkedIn's "Save to PDF") for ATS keyword friendliness and human recruiter appeal, producing a scored, section-by-section report tuned to the target job markets and role(s) the person actually wants — asked interactively, not assumed from their current location — with an optional deeper match against a specific job posting the person pastes in. Use this whenever the user shares a LinkedIn profile PDF and asks for feedback, review, a score, or improvement suggestions on their LinkedIn profile — including phrasing like "review my LinkedIn", "is my profile good enough", "will this pass ATS", "optimize my LinkedIn for job search", "help me get offers from [country/region]", "does my profile match this job posting", or "check my profile for [React/Java/backend/etc] roles". Also trigger if the user asks to improve their LinkedIn headline, summary, or experience bullets from an uploaded PDF, wants to know what keywords recruiters search for in their field, asks whether their profile would work for a different country/role than the one they currently have, or pastes a specific job description alongside their profile and asks how well they match. Do not use this for general resume/CV files unrelated to LinkedIn, or for LinkedIn text pasted without a PDF unless the user explicitly asks for this kind of analysis on pasted text too.
---

# LinkedIn ATS Profile Analyzer

Give developers concrete, actionable feedback on how their LinkedIn profile reads to both automated ATS-style keyword search (including LinkedIn's own recruiter search) and to a human recruiter skimming it for 10 seconds. This runs entirely inside the current Claude Code session — no external API calls, no extra cost beyond what the user already pays for Claude Code.

This is a conversation, not a one-shot report generator: ask what the person is actually targeting before analyzing, deliver a full report, then stay available to refine specific pieces or re-run against a different market or role on request.

## Step 1 — Get the PDF

Ask the user to export their profile if they haven't already: on their LinkedIn profile page, **More → Save to PDF**. Then read the PDF directly with your file-reading tool — do not ask them to paste the text manually unless PDF reading fails.

If the PDF isn't obviously a LinkedIn export (no headline/experience structure at all), say so and ask them to confirm it's the right file rather than guessing at a generic resume.

## Step 2 — Ask what they're actually targeting (don't infer from location)

**Always ask this explicitly, unless the user already answered it in this conversation.** The profile's stated location is where someone *lives*, not necessarily where they're *applying* — someone based in Portugal may specifically want UK or US offers, and the PDF alone won't tell you that. Guessing from location and skipping the question produces feedback tuned to the wrong market.

Ask three things, in plain conversational language (not a rigid form):

1. **Target market(s)** — which countries/regions are they actually applying to? Suggest common buckets to make it easy to answer: US, UK, Europe (other), Brazil, LATAM (other), or "anywhere, fully remote." They can name more than one, and can name a specific country not on the list.
2. **Role/stack scope** — should the analysis cover only their current stated role/stack, or also check fit for something adjacent they're open to (e.g. a frontend dev open to full-stack, or a step up to tech lead)? Only evaluate adjacent angles the person confirms they're actually open to and have real (not invented) experience toward — never stretch someone's profile into a role they haven't done anything to support.
3. **A specific job posting (optional)** — do they have one particular opening in mind right now? If so, ask them to paste the job description text (or a link, if this session can fetch URLs — try it, but fall back to asking for pasted text if the fetch fails or no web tool is available; never guess at a job posting's content from just a URL or title). This is optional and additive — market/role feedback still works fine without it — but sharpens keyword matching considerably when they have a real opening to check against.

Wait for their actual answer before analyzing. If they answer inline in the same message that shares the PDF ("review this for UK and US frontend roles" or "check this against this job posting: ..."), skip re-asking whatever they already covered.

Read `references/keywords-and-terminology.md` for the keyword list and regional terminology matching each requested market/stack — pull only the relevant sections, don't load the whole file into your response.

Read `references/impact-and-structure.md` too — it covers how to evaluate company/product context and impact framing per experience entry, and how to phrase suggestions as concrete objectives instead of vague notes. Apply it in Step 5 and Step 6.

## Step 3 — Cross-check location against target market

If any requested target market differs from where the profile says the person currently lives or works, that gap is itself a finding worth surfacing — not just background context:

- Recruiters and ATS location filters often screen by stated location first. If someone's profile only says "Portugal" but they're targeting UK/US remote roles, that mismatch can get them filtered out before a human ever reads the profile.
- Check work-authorization implications where relevant (e.g. Portugal is EU; the UK is not post-Brexit, so an EU citizen doesn't have automatic UK work rights — that's the kind of thing worth a line in the report if it applies, not something to just assume away).
- The fix is usually simple and concrete: an explicit line in the headline or About section like "Open to remote roles in the UK/US" or "Eligible to work in the EU; open to UK relocation/sponsorship discussions" — call this out as a specific recommendation when it applies, and only state authorization facts you're actually confident about; if unsure, phrase it as a question back to the person rather than asserting their legal status.

## Step 4 — Match against a specific job posting (only if one was provided)

Skip this step entirely if the person didn't provide a job posting — don't ask twice, and don't treat its absence as a gap in the report.

**Important framing difference from everything else in this skill:** a LinkedIn profile is one public, evergreen page used for every application — unlike a resume/CV, which can legitimately be rewritten per job. Never suggest rewriting the profile to narrowly chase one job posting's exact wording. Instead:

- Extract the job posting's explicit requirements and the specific terms it uses (not a generic list — the employer's actual language, which may differ from the generic keyword reference file even for the same role).
- Compare against the profile and produce a job-specific match: which of the posting's terms/requirements the profile already covers, and which are missing.
- For each gap, judge whether adding it would be **honest and representative of the person's overall experience** (safe to add to the evergreen profile — e.g. a technology they've used but hadn't listed) versus **too narrow or specific to this one posting** (better suited to a tailored resume or cover letter for this specific application, not the LinkedIn profile itself). Say which is which — don't let every gap turn into a suggested profile edit.
- Never invent experience or skills to close a gap just because the posting asks for it.

## Step 5 — Analyze

Read the extracted profile text and evaluate, grounded only in what's actually there (never invent experience or skills the person doesn't have):

- **ATS / keyword friendliness**: does the profile contain the terms a recruiter or ATS-style search would actually query for this stack and region? Check headline, skills section, and experience bullets — not just the skills list, since LinkedIn's own search weighs the whole profile. **The "Top Skills" box in the PDF export only shows the person's first 3 pinned/selected skills — it is not necessarily their full Skills list.** Don't treat a short Top Skills box as a definitive ATS gap on its own; ask the person to confirm whether their live profile's Skills section has more entries than what's shown in the export before recommending they "add more skills" — if it does, the real fix is adding missing terms to the full Skills section (which the PDF can't show you), not just noting the export looks thin.
- **Human recruiter appeal**: is the headline more than a job title (does it signal specialization/impact)? Does the About/summary read like a pitch or like a list of duties? Is anything generic/filler ("hardworking team player" with no evidence)?
- **Company/product context, per experience entry**: would a stranger to that company understand roughly what it does, its scale, and who uses it, from the entry's intro? See `references/impact-and-structure.md` for what "enough context" looks like — it's proportional to how well-known the company is, not a fixed word count.
- **Impact, per experience entry**: does each entry show outcomes (business metric, scale, technical result, or ownership scope) rather than just a list of tasks/technologies? This is a distinct, explicit check — go entry by entry, not just a general impression. Rank the strength of impact evidence using the framework in `references/impact-and-structure.md`. Never invent a metric the person didn't give you — if a role has no impact signal at all, say so plainly and suggest the next-best framing (scale or ownership) rather than pretending it's fine.
- **Technologies used, per experience entry**: LinkedIn lets each role carry its own explicit tech list (the "Technologies:" field on the experience entry, separate from the profile-wide Skills section). Check every entry for this — it's a distinct, high-value ATS/recruiter signal because it maps a *specific past project* to a *specific stack*, which matters more to a recruiter matching against a specific job req than the general Skills list does. If an entry describes real technical work but has no explicit technology list (even if the tools are named loosely in the prose), flag it and suggest the exact list to add, built only from tools the entry's own text already implies — never invent one.
- **Regional fit**: terminology matches what recruiters in each target market actually search (see reference file), plus the location/work-authorization check from Step 3.
- **Structural completeness**: is anything a recruiter expects genuinely missing (no summary, no skills section, experience with zero description)?
- **Career narrative & timeline**: read the experience list in chronological order. Check for unexplained gaps — roughly 3+ months between one role's end date and the next's start date is worth noting; shorter gaps are normal transition time and not worth flagging. Also check whether the sequence reads as a coherent growth story (increasing scope/seniority, or a clear specialization arc) rather than scattered/unclear. A gap is something to consider addressing with a one-line note (common and accepted), not something to apologize for.
- **Certifications & Education**: are they present, relevant to the target stack/role, and do they reinforce claims made elsewhere in the profile (e.g. a cloud certification supporting a stated interest in platform engineering)? Don't suggest the person go get a certification — that's out of scope for a profile-wording review — but do note if an existing one isn't leveraged anywhere else on the profile.
- **Headline/seniority credibility**: does the seniority or specialization claimed in the headline (e.g. "Senior," "Staff," "Lead," "Founder") actually hold up against the evidence in Experience? An unsupported claim is a credibility risk recruiters and hiring managers notice — flag it plainly if nothing in the profile backs it up, but don't second-guess a claim that genuinely is backed by the experience section.
- **Regional/language clarity**: scan Honors, Publications, Certifications, and Education for content in a language, or referencing local institutions/systems, that recruiters in the target market wouldn't understand (e.g. an untranslated local academic award name). Flag specific items and suggest either a brief clarification in the target market's language, or removal if it's not relevant to the target role.

Every suggestion you write should be a concrete, fillable objective, not a vague note — "add more detail" is not acceptable. Use the weak/strong examples and the impact formula in `references/impact-and-structure.md` to phrase suggestions the person could act on immediately.

If the person requested **multiple markets or role angles**, don't repeat identical feedback for each — the core content review (headline clarity, summary quality, context, impact) is usually the same across markets. Say it once, then break out only what actually varies per market (terminology, missing keywords, location/authorization note, and how heavily that market weighs impact framing) and per role angle (what's already strong for that angle vs. what's genuinely missing).

## Step 6 — Report

Output the report directly in the conversation using this structure. Keep scores honest — most real profiles land in the 40-75 range; don't inflate.

```markdown
## LinkedIn Profile Analysis

**Target market(s):** [what they told you] · **Role/stack:** [what they told you]

**Overall: XX/100** · ATS keyword fit: XX/100 · Recruiter appeal: XX/100

[2-3 sentence summary of the profile's biggest strength and biggest gap]

### Headline
- ✅ [strengths]
- ⚠️ [issues — including if the seniority/specialization claim isn't backed by the Experience section]
- 💡 [suggestions]

### About / Summary
[same strength/issue/suggestion format]

### Experience
For each entry worth commenting on:
**[Company — Role]**
- Context: [does the intro give enough company/product context? if not, the specific line to add]
- Impact: [strength ranking from references/impact-and-structure.md — business metric / scale / technical outcome / ownership only / none — with the specific bullet(s) that show it or a rewritten version if a bullet is activity-only]
- Technologies listed: [yes, with the list / no — if no, the specific technologies to add, drawn only from what the entry's own text already names]

### Skills
[same strength/issue/suggestion format]

### Certifications & Education
[relevance to the target stack/role, whether existing certifications are reinforced elsewhere on the profile, and any regional/language clarity issues found here or in Honors/Publications — omit this section only if there's genuinely nothing to say, which is rare]

### Career narrative & timeline
[only include this section if a gap or an unclear progression was found — omit entirely if the timeline is clean and the story is coherent]

### Location & target-market fit
[only include this section if Step 3 surfaced something — omit it entirely if location already matches the target market cleanly]

### Match against [job title at company, from the posting]
[only include this section if Step 4 ran — omit entirely if no job posting was provided]
**Match: XX/100** — specific to this posting, distinct from the general ATS score above.
- ✅ Requirements/terms from the posting already covered
- ⚠️ Missing — safe to add to your profile: [gaps that are genuinely representative of overall experience]
- 📝 Missing — but too specific to this one posting: [gaps better handled in a tailored resume/cover letter for this application, not the evergreen profile]

### Missing keywords for [stack] in [market]
`keyword1` `keyword2` `keyword3` ...
[repeat this subsection per market if multiple were requested and the lists differ meaningfully]

### Suggested headline rewrite
> [one concrete rewritten headline based on their actual experience]

### Priority objectives
Ranked, concrete, do-in-order list — 3 to 5 items max, highest-leverage first. Each one must be something the person can act on directly, not a restatement of a finding above.
1. [most impactful fix — usually the biggest context/impact or ATS gap]
2. [...]
3. [...]
```

## Step 7 — Keep going

After the report, explicitly invite next steps rather than treating the conversation as over — this is meant to be iterative:

- Offer to draft a rewritten About section or specific experience bullets (don't do it unprompted — rewriting text they didn't ask for wastes their time reading it).
- Offer to draft the location/work-authorization line from Step 3 if that came up.
- If they mentioned being open to other markets or roles but you only analyzed one, remind them you can re-run for those too.
- If a job posting was matched in Step 4, remind them they can paste a different posting to check fit against that one too — they don't need to re-share the profile PDF, just the new posting.
- If they come back later wanting to check a different market, role, or job posting, you don't need the PDF again if they already shared it earlier in the conversation — just ask what's new and re-run the relevant steps against the same extracted content.

## Notes

- Never fabricate metrics, experience, or legal/work-authorization status — flag "add a number here" or "confirm your work authorization status" rather than inventing one.
- If the PDF is oddly short or extraction looks broken (e.g. only a few words, garbled text), say so explicitly rather than analyzing a fragment as if it were the whole profile.
- If the person's About/summary text looks like it's missing line breaks or punctuation between list items (words running together), flag this as a likely PDF-export artifact worth double-checking on the live profile rather than assuming the real profile reads that way.
- LinkedIn's "Save to PDF" export does not include Recommendations (written references), Featured (pinned posts/articles), or endorsement counts — this skill cannot analyze them because they're simply not in the data. Mention this limitation once, briefly, near the end of the report rather than silently ignoring these — recruiters do value recommendations, so it's worth the person checking manually that they have at least a couple.
- The "Top Skills" box in the export shows only the first 3 pinned skills, confirmed by direct testing — not the full Skills section. If the report's ATS score is being held down mainly by a short Top Skills list, say so explicitly and ask the person to confirm their live profile's full Skills count before treating it as a real gap.

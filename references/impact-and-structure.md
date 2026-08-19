# Company Context & Impact — Writing Structure Reference

International tech recruiters (especially US/UK, and increasingly EU) don't just read *what* someone did — they read for **context** (why did this work matter?) and **impact** (what changed because of it?). A profile that lists tasks without either reads as junior/interchangeable, even for someone with real seniority. Use this reference when evaluating each experience entry.

## The two things to check per experience entry

### 1. Company/product context
Does the entry give someone unfamiliar with the company enough to understand the stakes? This usually lives in the 1-2 sentence intro before the bullets, not in the bullets themselves.

**Weak (no context):**
> Frontend Developer at Acme Inc.
> Developed features and fixed bugs.

**Strong (context given):**
> Frontend Developer at Acme Inc. — a B2B logistics platform used by 500+ warehouses to manage inventory in real time.
> Built the dashboard used by warehouse operators to track shipments...

The difference: a recruiter who's never heard of "Acme Inc." now knows the domain, the scale, and who the end user is — which makes every bullet after it land harder.

Not every entry needs a full paragraph — a well-known company (Google, a recognizable local unicorn) needs less explaining than an obscure agency or internal tool. Judge context sufficiency relative to how much a stranger would need to know, not by a fixed word count.

### 2. Impact, not just activity
Every strong bullet answers "so what happened because of this?" — not just "what did I do?" This is different from generic quantification (a random number) — it's specifically about **outcome**, ideally tied to a business, user, or technical metric.

**Formula:** `[Action verb] + [what you built/did] + [scope/scale/for whom] + [measurable or observable outcome]`

| Weak (activity only) | Strong (impact) |
|---|---|
| "Responsible for frontend development" | "Rebuilt the checkout flow for 130k+ merchant stores, reducing page load time by 35%" |
| "Fixed bugs and maintained code" | "Resolved a memory leak in the video player affecting ~40% of sessions, cutting crash reports by half" |
| "Worked on the design system" | "Built a shared component library adopted by 6 product teams, cutting new-feature UI dev time by ~30%" |
| "Participated in migration to React" | "Led the frontend half of a PHP→React migration on the highest-traffic page in the product, with zero downtime during rollout" |

**What counts as impact, ranked by strength (use whichever the person actually has evidence for — never invent one):**
1. **Business/user-facing metric** — conversion rate, load time, error rate, revenue, user count, retention. Strongest signal, but requires the person to actually know/remember the number.
2. **Scale/scope** — "used by 130k+ stores," "processing $10B/year," "supporting a national healthcare platform." Doesn't require a delta, just conveys stakes. Often available even when a precise before/after metric isn't.
3. **Technical/process outcome** — "reduced build time from 8min to 90s," "cut bundle size by 40%," "zero-downtime migration." Credible even without business-metric framing.
4. **Ownership/leadership scope** — "owned the feature end-to-end," "led a team of 4," "the person other teams came to for X." Weaker alone, but strengthens any of the above when combined.

**When there's genuinely no number available:** don't ask the person to invent one. Suggest the next-best framing — scale, ownership scope, or a qualitative-but-specific outcome ("became the team's reference for X") — over a vague duty statement. Flag it plainly as "no impact signal here — worth adding one if you have it" rather than pretending a duty-list bullet is fine.

## The third thing to check: per-entry technology list

LinkedIn's experience entries have a dedicated, structured "Technologies:" field, separate from the profile-wide Skills section. It's easy to skip when adding a role quickly, but it's a distinct and valuable signal: it maps one specific past project to one specific stack, which is exactly what a recruiter matching against a specific job requisition is scanning for — more precise than the general Skills list, which just says the person has touched a technology at some point across their whole career.

An entry with rich prose about React/Next.js/WebRTC work but no explicit Technologies field is leaving an easy, low-effort win on the table. When flagging this, build the suggested list only from technologies the entry's own text already names or clearly implies — never add one the person hasn't demonstrated in that specific role.

## How to phrase suggestions (objective-driven, not vague)

Every suggestion in the report should be a concrete, fillable action — not "add more detail" or "make this stronger." Use the formula and examples above to write a suggestion the person could act on in under a minute:

- ❌ Vague: "This experience section could show more impact."
- ✅ Objective: "Add one sentence of company context before the bullets (what does [Company] do, roughly what scale) — a recruiter unfamiliar with them has no way to gauge the stakes right now."
- ✅ Objective: "Rewrite 'Fixed bugs and maintained code' using: [what you fixed] + [effect it had] — even 'Resolved the top-reported bug in [feature], cutting support tickets for it to near zero' is far stronger than the current phrasing."

## Market weighting note

This impact/context framing is broadly good practice everywhere, but it's weighted especially heavily by US and UK tech recruiting (where "impact" is often literally a resume/interview rubric category) and by international remote-first companies generally. It matters somewhat less — though still helps — in markets or company cultures where seniority signals lean more on tenure, credentials, or role titles than on quantified outcomes. Note this explicitly when the target market is US/UK/international-remote, since it's the highest-leverage lever in those markets specifically.

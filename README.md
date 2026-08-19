# LinkedIn ATS Profile Analyzer

A [Claude Code](https://claude.com/product/claude-code) skill that reviews a LinkedIn profile PDF export for **ATS keyword friendliness** and **human recruiter appeal** — tuned to the target job market(s) and tech stack you tell it, with an optional deeper check against a specific job posting.

**Zero cost beyond what you already pay for Claude Code.** No external API, no API key, no server, no sign-up. It runs entirely inside your own Claude Code session — Claude reads the PDF directly and analyzes it using the model you already have access to.

> 🌐 **Language:** This README is in English, but the skill itself works in whatever language you talk to Claude Code in — ask it to review your profile in Portuguese, Spanish, or anything else, and it'll respond in kind. `Pode conversar com a skill em português normalmente — as instruções aqui estão em inglês só para alcançar mais gente, mas a skill entende e responde em português sem problema.`

---

## What it checks

- **ATS / keyword friendliness** — headline, Skills section, and per-role keywords against what recruiters and ATS-style search actually query for your stack and market
- **Human recruiter appeal** — does your headline and About section read like a pitch or a list of duties; is anything generic filler
- **Company/product context** per experience entry — would a stranger to that company understand what it does and why the work mattered
- **Impact framing** per experience entry — business metric, scale, technical outcome, or just ownership/activity (with a formula for turning a weak bullet into a strong one)
- **Per-role technology lists** — LinkedIn's often-skipped "Technologies:" field on each experience entry
- **Regional terminology** — US, UK, Europe, Brazil, LATAM job-title and seniority conventions differ; the skill adapts
- **Location vs. target-market fit** — flags it if you live somewhere different from where you're applying (including a work-authorization note where relevant, e.g. EU → UK post-Brexit)
- **Career narrative & timeline** — unexplained employment gaps, whether your job sequence reads as a coherent growth story
- **Certifications & Education** — relevance, and whether local-language items (degree names, awards) need a translation for an international recruiter
- **Optional: match against a specific job posting** — paste a real opening and get a job-specific match score, while keeping the advice honest about what's safe to add to your *evergreen* LinkedIn profile vs. what belongs in a tailored resume for that one application instead

It never invents experience, skills, or metrics you didn't provide — where something's missing, it tells you exactly what to add or what question to answer, not a fabricated number.

## Requirements

- [Claude Code](https://claude.com/product/claude-code) installed and working — any plan (Free, Pro, Max, or a metered API key). The skill just uses whatever you already have; it doesn't call any other API.
- Your LinkedIn profile exported as a PDF (see below).

## Installation

Clone this repo, then copy the skill into your Claude Code skills folder:

```bash
git clone https://github.com/wellingtonfjr/linkedin-ats-analyzer.git

# Available in every project:
cp -r linkedin-ats-analyzer/SKILL.md linkedin-ats-analyzer/references ~/.claude/skills/linkedin-ats-analyzer/

# Or, available only in one project:
cp -r linkedin-ats-analyzer/SKILL.md linkedin-ats-analyzer/references /path/to/your/project/.claude/skills/linkedin-ats-analyzer/
```

Restart Claude Code (or start a new session) so it picks up the skill.

## Usage

### 1. Export your profile

On your LinkedIn profile page: **More → Save to PDF**.

### 2. Ask Claude Code to review it

Just talk to it naturally — the skill triggers on phrasing like:

```
Review my LinkedIn profile, here's the PDF: ~/Downloads/Profile.pdf
```
```
Is my LinkedIn profile good enough for backend Java roles in Germany?
```
```
Does my profile match this job posting? [paste the job description]
```

### 3. Answer a couple of quick questions

The skill asks before analyzing — it never assumes your target market from where you currently live (someone in Brazil might specifically be targeting the US or Europe):

```
Perfil recebido! Antes de analisar, três perguntas rápidas:

1. Mercado-alvo — quais países/regiões você está buscando vagas?
   (EUA, UK, Europa, Brasil, LATAM, ou remoto de qualquer lugar)
2. Escopo de role/stack — quer que eu avalie só pra Front-end,
   ou também algo adjacente que você tenha experiência real?
3. Vaga específica (opcional) — tem alguma vaga em mente agora?
```

*(That example is in Portuguese — again, it matches whatever language you use.)*

### 4. Get a scored, actionable report

```
## LinkedIn Profile Analysis

Target market(s): Europe · Role/stack: Backend — Java

Overall: 74/100 · ATS keyword fit: 61/100 · Recruiter appeal: 85/100

Solid technical depth, but the profile undersells impact — most
bullets describe tasks, not outcomes, and the Skills section is
thin relative to what's mentioned in your experience.

### Headline
- ✅ Clear seniority and specialization
- ⚠️ No mention of Spring Boot or microservices, despite both
  appearing throughout your experience
- 💡 "Senior Backend Engineer | Java • Spring Boot • Microservices | Remote"

### Experience
**Acme Corp — Backend Engineer**
- Context: ✅ good — explains what Acme's platform does and its scale
- Impact: ownership only — no measurable outcome in any bullet.
  Add a number: request latency, uptime, throughput, or team size
- Technologies listed: ⚠️ missing — bullets mention Kafka and
  PostgreSQL but neither appears in the entry's Technologies field

### Missing keywords for Backend Java in Europe
`Spring Boot` `microservices` `CI/CD` `system design`

### Priority objectives
1. Add the Technologies field to your current role — it's the
   fastest, highest-leverage fix available.
2. Add one outcome metric to your top role's bullets.
3. ...
```

It then stays available in the conversation to draft rewritten bullets, re-run against a different market, or check fit against a job posting you paste in later — you don't need to re-share the PDF.

## Project structure

```
SKILL.md                                   Skill definition: triggers + full analysis workflow
references/keywords-and-terminology.md     Keyword lists per tech stack + regional terminology guide
references/impact-and-structure.md         How to evaluate company context, impact framing, and
                                            per-role technology lists in each experience entry
```

## Known limitations

These come from what LinkedIn's PDF export actually includes, not from the skill itself:

- **No Recommendations, Featured, or endorsement counts** — the export doesn't contain them, so the skill can't analyze them. Check those manually.
- **"Top Skills" in the export shows only your first 3 pinned skills**, not your full Skills list. If your live profile has more, the skill will ask rather than assume the export is complete.
- The skill only reads what's in the PDF — it can't see live-profile-only features (activity, posts, network size).

## Privacy

Your profile PDF is read locally by your own Claude Code session and analyzed using your own Claude Code access — it is never sent to any server or API controlled by this project (there isn't one). Standard Claude Code data handling applies beyond that; see [Anthropic's privacy documentation](https://privacy.anthropic.com/) for details.

## Contributing

Pull requests welcome — especially for:
- Additional tech stacks or regions in `references/keywords-and-terminology.md`
- Corrections to regional terminology or work-authorization notes (these change; if something's out of date, flag it)

## License

MIT — see [LICENSE](LICENSE).

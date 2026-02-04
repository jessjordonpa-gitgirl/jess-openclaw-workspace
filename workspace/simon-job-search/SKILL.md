---
name: simon-job-search
description: Automated daily job search for Simon Tucker's senior AI/tech leadership roles (CTO, VP Engineering, Head of AI, etc.) in UK/Surrey/London/remote. Generates PDF summary of strictly filtered matching jobs, sends via Gmail (gog) and Telegram attachment. Use when performing daily job hunts, testing the search, or running scheduled job summaries.
---

# Simon Job Search Skill (Claude Prompt Integrated)

Read **references/claude-system-prompt.md** FIRST – your bible for Simon's exact profile, sweet spots (entrepreneurial startups/transformation/NGOs), exclusions (NO finance/consulting/engineer ICs), 100-pt scoring, HTML output spec.

## Adapted Workflow for OpenClaw (Daily Auto-Run)
1. **Date:** `session_status` → today=`date +%Y-%m-%d` (e.g., 2026-02-04). Log to `memory/${today}.md`.

2. **Comprehensive Searches** (parallel, country="GB", count=20, freshness='pw'):
   - **web_search** 10+ queries from prompt: "CTO OR Chief Technology Officer London startup", "Chief AI Officer UK remote", "VP Innovation digital transformation media", "Director AI transformation London", "Fractional CTO Surrey", etc. + sites:indeed.co.uk reed.co.uk cwjobs totaljobs startup.jobs otta.com.
   - **Startup/NED:** "UK startups Series A B CTO hiring", "NED technology London charity", "Non-Executive Director AI media".
   - **Boards:** Search + `browser` if needed (profile=chrome, open startup.jobs ottta.com nurole.com charityjob.co.uk).
   - **Company sites:** web_search "BBC ITV Sky careers CTO", "OCCRP Amnesty digital transformation jobs".

   Target 30-50 leads → `web_fetch` top 20-30 URLs → parse/extract.

3. **Filter/Score:** Apply **claude-system-prompt.md** rules ruthlessly:
   - Tech leadership ONLY (CTO/Chief AI/VP Innovation/Dir Transformation).
   - Sweet spots FIRST: Startups (pre-Series B), media transformation, NGOs.
   - Score 70+/100 → top 5-15. 🎯 Flag sweet spots.

4. **HTML Report:** Write `workspace/daily-jobs-${today}.html` per prompt spec (exec summary, color-coded cards, sorted recent→score, gold sweet spots).

5. **PDF:** 
   ```
   exec "brew install pandoc wkhtmltopdf || true; pandoc workspace/daily-jobs-${today}.html -o workspace/daily-jobs-${today}.pdf --pdf-engine=wkhtmltopdf -V margin=0.75in --css https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.1/github-markdown.min.css"
   ```

6. **Send:**
   - Telegram: `message action=send channel=telegram to=@simontucker message="📋 Daily Jobs ${today} – PDF attached (top fits only)" media="workspace/daily-jobs-${today}.pdf"`
   - Email: `exec "gog gmail send --account jessjordonpa@gmail.com --to simon.tucker@proton.me --cc simon.tucker@gmail.com --subject 'Daily Leadership Jobs ${today} ($(count) fits)' --body-file - <<EOF\nHi Simon,\n\nAutomated scan: top tech leadership/AI transformation roles (sweet spots prioritized). PDF attached.\n\nStrict: No engineers/finance/consulting.\n\nJess 👩‍💼\nEOF" --attachment workspace/daily-jobs-${today}.pdf`

7. **Log/Cleanup:** Append memory/${today}.md: "Jobs: ${count} sent." Keep 7 days PDFs/MD.

## Test/Edge
- 0 fits: "Market quiet – no 70+ today."
- Login walls: `browser profile=chrome navigate "[url]"`.
- Parallel: Multi web_search/web_fetch.

Quality > quantity. UK/London focus. Best, Jess.
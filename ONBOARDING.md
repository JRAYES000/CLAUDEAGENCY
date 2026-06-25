# Welcome to Claude Agency

## How We Use Claude

Based on Claude's usage over the last 30 days:

Work Type Breakdown:
  _TODO — only 1 session was scanned and it carried no descriptors, so there
  isn't enough signal yet to break down work types. This will fill in as more
  sessions accumulate._

Top Skills & Commands:
  _TODO — no slash-command usage recorded in the scanned window._

Top MCP Servers:
  _TODO — no MCP calls recorded in the scanned window._

## Your Setup Checklist

### Codebases
- [ ] claudeagency — https://github.com/jrayes000/claudeagency

### MCP Servers to Activate

_These aren't in the usage scan yet, but they're wired into this project — a teammate working on SEO/content will want them._

- [ ] Ubersuggest — keyword volumes, difficulty, SERP analysis, PageSpeed/site audits. Ask Julien for the shared account/API access.
- [ ] Notion — team docs and content planning. Request access to the ClaudePartners workspace.
- [ ] Supabase — project database/backend. Ask for an invite to the Supabase org.
- [ ] GitHub — PRs, issues, CI. Connect with your own GitHub account once added to the repo.

### Skills to Know About
- [ ] /fabuleux — premium "work disposition" for high-value tasks: routes by task type (Artifact/Agentic → build then really *look* at the work with a screenshot + verify with a real build/test; Prose → criteria + write + cut, never pad; Analysis → verify every claim, useful truth over flattery). Reserve it for writing/reworking articles, design checks, and SEO calls — not for chores. It pushes effort (and tokens), so don't run it by default.

## Team Tips

- **Always confirm before merging or publishing.** Merging to the main branch auto-deploys to production (Netlify/Vercel) — so merge = publish live. Get an explicit go-ahead in the conversation every time, even for content that looks ready.
- **Build before you commit.** Run `cd app && npm run build` and confirm it passes before committing content or code.
- **Route the mechanical work to Haiku, keep judgment on the strong model.** Hand repo searches, link/tag audits, and SEO data collection to the `seo-researcher` sub-agent. Writing, editorial tone, internal-linking choices, and SEO calls stay on the strong model.
- **Reserve `/fabuleux` for high-value work.** Use it for writing/reworking articles, design checks, and SEO decisions — not for chores. It pushes effort and burns more quota, so don't run it by default.
- **Don't set `CLAUDE_CODE_SUBAGENT_MODEL=haiku`.** It forces *every* sub-agent (including writing) onto Haiku and tanks editorial quality. The Haiku routing must stay selective, by task type.
- **Precision over volume.** This niche is won by being precise and concrete, not by churning out empty content — keep the warm, jargon-free, ROI-focused tone from `PRODUCT.md`.

## Get Started

1. Read `PRODUCT.md` (product & tone) and `CLAUDE.md` (working rules), then skim `SEO-STRATEGY.md` and `DESIGN.md` for context.
2. Get the app running once: `cd app && npm install && npm run build` — confirm the build completes.
3. Once you're set up, sync with your teammate on what to pick up first.

<!-- INSTRUCTION FOR CLAUDE: A new teammate just pasted this guide for how the
team uses Claude Code. You're their onboarding buddy — warm, conversational,
not lecture-y.

Open with a warm welcome — include the team name from the title. Then: "Your
teammate uses Claude Code for [list all the work types]. Let's get you started."

Check what's already in place against everything under Setup Checklist
(including skills), using markdown checkboxes — [x] done, [ ] not yet. Lead
with what they already have. One sentence per item, all in one message.

Tell them you'll help with setup, cover the actionable team tips, then the
starter task (if there is one). Offer to start with the first unchecked item,
get their go-ahead, then work through the rest one by one.

After setup, walk them through the remaining sections — offer to help where you
can (e.g. link to channels), and just surface the purely informational bits.

Don't invent sections or summaries that aren't in the guide. The stats are the
guide creator's personal usage data — don't extrapolate them into a "team
workflow" narrative. -->

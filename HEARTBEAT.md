# HEARTBEAT.md - Periodic Tasks (runs ~every 30min via channel polls)

Rotate checks 2-4x/day. Update memory/heartbeat-state.json with unix timestamps.

## Priority: Git Sync (every heartbeat if >2h since last)
git status → if changes: add . (respect gitignore), commit -m \"Auto heartbeat: workspace sync $(date +%Y-%m-%d %H:%M)\", push → log success/fail.
Set lastGit: $(date +%s)

## Rotate Other Checks (skip if <2h since last)
- Emails: unread urgent? (gog)
- Calendar: next 24h events?
- Weather: relevant forecast?
- Memory: review daily → distill to MEMORY.md?

Quiet hours: 23:00-08:00 → git only, HEARTBEAT_OK otherwise.

If action needed: alert. Else: HEARTBEAT_OK
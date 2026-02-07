# Quick Start Guide - Client Work Skill

## Getting Started

Your client work management skill is ready to use!

### 1. First: Add Your Clients

```bash
client-work add-client "Acme Corp"
client-work add-client "Web Agency Ltd"
client-work add-client "Startup XYZ"
```

Replace `Acme Corp` with your actual client names.

### 2. Log Your First Work Session

```bash
client-work "Acme Corp" add 3:00 "Review wireframes and implement navigation"
```

This will create a new entry for today with:
- Duration: 3 hours
- Description: Your task
- Auto-calculates time allocation based on an 8-hour workday

### 3. Edit the Entry to Add Details

Open the client file:
```bash
open client-work/Acme-Corp.md
```

Add tasks, notes, and todos directly in the markdown format (see `SKILL.md` for the exact structure).

## Common Commands

```bash
# List all clients
client-work list

# Add another session
client-work "Acme Corp" add 1:30 "Continue navigation work"

# Check status of a client
client-work "Acme Corp" status
```

## Tips

1. **Be consistent:** Add entries every day, even if it's just 15 minutes
2. **Detail tasks:** Your future self will appreciate the detailed task list
3. **Capture insights:** Client notes and decisions are gold
4. **Update timelines:** Track progress and milestones

## Next Steps

1. Create client files for all your active clients
2. Start logging your daily work
3. Review weekly to see time allocation patterns
4. Expand the skill over time (see SKILL.md for ideas)

Happy client tracking! 👩‍💼

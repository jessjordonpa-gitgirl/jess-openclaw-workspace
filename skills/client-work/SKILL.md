# Client Work Management

Track your client work, time allocation, and project notes in one place.

## Purpose
Log daily client sessions including:
- Time worked on each client
- Tasks completed
- Findings, notes, and future todos
- Project timelines and updates

## File Structure

```
client-work/
├── CLIENT-NAME.md          # Main log for each client
└── index.md                # Master index of all clients
```

## Usage

### Add Daily Entry
Use this format for each client session:

```markdown
## YYYY-MM-DD

### Work Summary
- **Client:** [Client Name]
- **Date:** YYYY-MM-DD
- **Duration:** HH:MM (or HH:MM - HH:MM)
- **Time Allocated:** X% of day (optional)

### Tasks Completed
- [ ] Task 1
- [x] Task 2 - Completed

### Findings & Notes
- Key insights, decisions, or observations from the day
- Important details or learnings

### Future Todos / Next Steps
- Outstanding tasks
- Follow-up items
- Blocked items

### Project Timeline Updates
- Current progress on projects
- Next milestones
- Delays or accelerations
```

### Add a New Client
1. Create a new file: `client-work/CLIENT-NAME.md`
2. Add to index: `client-work/index.md`

## Commands

### `client-work list`
Show all registered clients and their last activity dates.

### `client-work <client-name> add <duration> "<description>"`
Add a new daily entry for a client. Example:
```
client-work add "Web Development" 2:30 "Frontend work on portfolio site"
```

### `client-work <client-name> status`
Show current status for a client (most recent entry).

### `client-work report`
Generate a weekly report of all client work for the current week.

## Examples

### Example Client File
```markdown
# Client: Acme Corp

## 2026-02-07
- **Duration:** 3:00
- **Time Allocated:** 50%
### Tasks Completed
- [x] Review wireframes
- [x] Implement navigation component
### Findings & Notes
- Confirmed color scheme preferences
- Mobile responsiveness needs adjustment in CSS
### Future Todos
- [ ] Review mobile layout
- [ ] Optimize images

## 2026-02-06
- **Duration:** 2:00
- **Time Allocated:** 33%
### Tasks Completed
- [x] Discuss project requirements
- [x] Set up development environment
### Findings & Notes
- Client prefers WordPress for ease of updates
- Need to source stock photography
```

## Tips

1. **Consistency is key:** Log at the end of each day
2. **Be specific:** Task descriptions help with time tracking later
3. **Capture insights:** Notes from client meetings are valuable
4. **Review weekly:** Look for patterns in time allocation and project status
5. **Keep it simple:** Don't over-engineer; this is for you, not clients

## Expansion Ideas
- Add hourly breakdown for detailed time tracking
- Export to CSV for reporting
- Add tags/categories (e.g., strategy, development, design)
- Link to related projects or tasks

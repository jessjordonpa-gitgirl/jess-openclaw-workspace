# Client Work Management

A skill to help you track your client work, time allocation, and project notes.

## Installation

The script is located at:
```
skills/client-work/client-work
```

### To Use Globally (Recommended)

Add to your shell profile (`~/.zshrc` or `~/.bashrc`):
```bash
export PATH="$PATH:/Users/jessjordon/.openclaw/workspace/skills/client-work"
```

Then reload:
```bash
source ~/.zshrc  # or source ~/.bashrc
```

Now you can use `client-work` from anywhere:
```bash
client-work list
```

## Files

- **SKILL.md** — Full usage instructions and formatting guide
- **client-work** — Command-line helper script (executable)
- **index.md** — Master index of all clients
- **QUICKSTART.md** — Quick start guide for beginners

## Features

✅ Log daily client work sessions
✅ Track time allocation (percentage of day)
✅ Add tasks, notes, and future todos
✅ Store project timelines and updates
✅ List all clients and their last activity
✅ Command-line interface for quick logging

## Documentation

See `SKILL.md` for:
- File structure and organization
- Entry formats and examples
- Expansion ideas
- Tips and best practices

See `QUICKSTART.md` for:
- Getting started quickly
- Common commands
- Step-by-step examples

## Usage Example

```bash
# Add a new client
client-work add-client "My Client"

# Log work for that client
client-work "My Client" add 2:30 "Completed the frontend implementation"

# View all clients
client-work list

# Check client status
client-work "My Client" status
```

## Future Expansion Ideas

- [ ] Hourly time tracking
- [ ] CSV export for reporting
- [ ] Tags/categories for different types of work
- [ ] Link to external project management tools
- [ ] Weekly/monthly summary reports
- [ ] Integration with calendar
- [ ] Daily/weekly reminders

## Notes

- All data is stored as plain markdown files
- No external database or accounts required
- Your data stays on your machine
- OpenClaw workspace only — synced via git if configured

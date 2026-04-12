---
name: gsk-calendar-list
version: 1.0.0
description: List upcoming calendar events from Google Calendar or Outlook.
metadata:
  category: calendar
  requires:
    bins:
    - gsk
  cliHelp: gsk calendar list --help
---

# gsk-calendar-list

**PREREQUISITE:** Read `../gsk-shared/SKILL.md` for auth, global flags, and security rules.

List upcoming calendar events from Google Calendar or Outlook.

## Usage

```bash
gsk calendar list [options]
```

## Flags

| Flag | Required | Description |
|------|----------|-------------|
| `--filter_query` | No | Filter events by text (e.g. event title keywords). (string) |
| `--time_min` | No | Start of time range in ISO 8601 format. Default: now. (string) |
| `--time_max` | No | End of time range in ISO 8601 format. Default: 7 days from now. (string) |
| `-a`, `--from_account` | No | Calendar account to use if multiple accounts are connected. (string) |

## See Also

- [gsk-shared](../gsk-shared/SKILL.md) — Authentication and global flags


---
name: gsk-calendar-create
version: 1.0.0
description: Create a new calendar event in Google Calendar or Outlook.
metadata:
  category: calendar
  requires:
    bins:
    - gsk
  cliHelp: gsk calendar create --help
---

# gsk-calendar-create

**PREREQUISITE:** Read `../gsk-shared/SKILL.md` for auth, global flags, and security rules.

Create a new calendar event in Google Calendar or Outlook.

## Usage

```bash
gsk calendar create [options]
```

## Flags

| Flag | Required | Description |
|------|----------|-------------|
| `--summary` | Yes | Event title. (string) |
| `--start_time` | Yes | Start time in ISO 8601 format (e.g. '2026-03-07T10:00:00-08:00'). (string) |
| `--end_time` | Yes | End time in ISO 8601 format (e.g. '2026-03-07T11:00:00-08:00'). (string) |
| `--description` | No | Event description. (string) |
| `--location` | No | Event location. (string) |
| `--attendees` | No | List of attendee email addresses. (array) |
| `--time_zone` | No | Time zone name (e.g. 'America/Los_Angeles', 'UTC'). Default: UTC. (string) |
| `-a`, `--from_account` | No | Calendar account to use if multiple accounts are connected. (string) |

> **CAUTION:** This command performs a write/send operation. Double-check parameters before executing.

## See Also

- [gsk-shared](../gsk-shared/SKILL.md) — Authentication and global flags


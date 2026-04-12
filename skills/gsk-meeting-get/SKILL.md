---
name: gsk-meeting-get
version: 1.0.0
description: Get details of a specific meeting note.
metadata:
  category: meeting
  requires:
    bins:
    - gsk
  cliHelp: gsk meeting get --help
---

# gsk-meeting-get

**PREREQUISITE:** Read `../gsk-shared/SKILL.md` for auth, global flags, and security rules.

Get details of a specific meeting note.

## Usage

```bash
gsk meeting get [options]
```

## Flags

| Flag | Required | Description |
|------|----------|-------------|
| `<task_id>` (positional) | Yes | The ID of the meeting note to retrieve. (string) |
| `-d`, `--detail_level` | No | Level of detail to return. 'summary' = title + status + summary + user notes (default, saves tokens). 'full' = summary + complete transcription text. 'segments' = summary + segments with speaker labels. (string, one of: summary, full, segments) |

## See Also

- [gsk-shared](../gsk-shared/SKILL.md) — Authentication and global flags


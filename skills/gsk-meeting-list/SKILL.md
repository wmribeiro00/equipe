---
name: gsk-meeting-list
version: 1.0.0
description: List meeting notes ordered by creation date.
metadata:
  category: meeting
  requires:
    bins:
    - gsk
  cliHelp: gsk meeting list --help
---

# gsk-meeting-list

**PREREQUISITE:** Read `../gsk-shared/SKILL.md` for auth, global flags, and security rules.

List meeting notes ordered by creation date.

## Usage

```bash
gsk meeting list [options]
```

## Flags

| Flag | Required | Description |
|------|----------|-------------|
| `-n`, `--page_size` | No | Number of results per page. Default: 20. Max: 50. (integer) |
| `--continuation_token` | No | Token for fetching the next page of results. Returned from a previous list call. (string) |

## See Also

- [gsk-shared](../gsk-shared/SKILL.md) — Authentication and global flags


---
name: gsk-meeting-search
version: 1.0.0
description: Search meeting notes by keyword using full-text search.
metadata:
  category: meeting
  requires:
    bins:
    - gsk
  cliHelp: gsk meeting search --help
---

# gsk-meeting-search

**PREREQUISITE:** Read `../gsk-shared/SKILL.md` for auth, global flags, and security rules.

Search meeting notes by keyword using full-text search.

## Usage

```bash
gsk meeting search [options]
```

## Flags

| Flag | Required | Description |
|------|----------|-------------|
| `<keyword>` (positional) | Yes | Search term to find in meeting notes. (string) |
| `--date_from` | No | Filter meetings after this date (ISO format: YYYY-MM-DD). (string) |
| `--date_to` | No | Filter meetings before this date (ISO format: YYYY-MM-DD). (string) |
| `--meeting_source` | No | Filter by calendar source. (string, one of: google, outlook) |
| `-n`, `--page_size` | No | Number of results per page. Default: 20. Max: 50. (integer) |
| `-s`, `--sort_by` | No | Sort order. 'relevance' for best match first, 'created_at' for newest first (default). (string, one of: created_at, relevance) |
| `--page` | No | Page number (0-indexed). Use with has_more to paginate results. Default: 0. (integer) |

## See Also

- [gsk-shared](../gsk-shared/SKILL.md) — Authentication and global flags


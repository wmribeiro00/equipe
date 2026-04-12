---
name: gsk-email-list
version: 1.0.0
description: List emails from a folder (inbox, sent, drafts, etc.).
metadata:
  category: email
  requires:
    bins:
    - gsk
  cliHelp: gsk email list --help
---

# gsk-email-list

**PREREQUISITE:** Read `../gsk-shared/SKILL.md` for auth, global flags, and security rules.

List emails from a folder (inbox, sent, drafts, etc.).

## Usage

```bash
gsk email list [options]
```

## Flags

| Flag | Required | Description |
|------|----------|-------------|
| `<folder>` (positional) | No | Folder to list (inbox, sent, drafts, spam, trash). Default: inbox. (string) |
| `-n`, `--limit` | No | Maximum number of emails to return. Default: 20. (integer) |
| `--after_date` | No | Return emails after this date (YYYY-MM-DD). (string) |
| `--before_date` | No | Return emails before this date (YYYY-MM-DD). (string) |
| `--unread_only` | No | Set to true to return only unread emails. Default: false. (boolean) |
| `-a`, `--from_account` | No | Email account to use if multiple accounts are connected. (string) |

## See Also

- [gsk-shared](../gsk-shared/SKILL.md) — Authentication and global flags


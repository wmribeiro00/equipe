---
name: gsk-email-search
version: 1.0.0
description: Search emails using a query string. Works with Gmail (GQL) and Outlook
  (KQL) accounts.
metadata:
  category: email
  requires:
    bins:
    - gsk
  cliHelp: gsk email search --help
---

# gsk-email-search

**PREREQUISITE:** Read `../gsk-shared/SKILL.md` for auth, global flags, and security rules.

Search emails using a query string. Works with Gmail (GQL) and Outlook (KQL) accounts.

## Usage

```bash
gsk email search [options]
```

## Flags

| Flag | Required | Description |
|------|----------|-------------|
| `<query>` (positional) | Yes | Search query. Gmail: GQL (e.g. 'from:boss subject:report'). Outlook: KQL. (string) |
| `--folder` | No | Restrict search to folder (inbox, sent, drafts, spam, trash). (string) |
| `-n`, `--limit` | No | Maximum number of results to return. Default: 20. (integer) |
| `--after_date` | No | Return emails after this date (YYYY-MM-DD). (string) |
| `--before_date` | No | Return emails before this date (YYYY-MM-DD). (string) |
| `-a`, `--from_account` | No | Email account to use if multiple accounts are connected. (string) |

## See Also

- [gsk-shared](../gsk-shared/SKILL.md) — Authentication and global flags


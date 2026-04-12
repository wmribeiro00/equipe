---
name: gsk-email-send
version: 1.0.0
description: Compose and send an email via Gmail or Outlook.
metadata:
  category: email
  requires:
    bins:
    - gsk
  cliHelp: gsk email send --help
---

# gsk-email-send

**PREREQUISITE:** Read `../gsk-shared/SKILL.md` for auth, global flags, and security rules.

Compose and send an email via Gmail or Outlook.

## Usage

```bash
gsk email send [options]
```

## Flags

| Flag | Required | Description |
|------|----------|-------------|
| `--to` | Yes | Recipient email address(es), comma-separated. (string) |
| `--subject` | No | Email subject line. (string) |
| `--body` | No | Email body content (plain text or HTML). (string) |
| `--cc` | No | CC recipient(s), comma-separated. (string) |
| `--bcc` | No | BCC recipient(s), comma-separated. (string) |
| `--body_type` | No | Body format: 'html' (default) or 'text'. (string) |
| `-a`, `--from_account` | No | Sender email account to use. (string) |

> **CAUTION:** This command performs a write/send operation. Double-check parameters before executing.

## See Also

- [gsk-shared](../gsk-shared/SKILL.md) — Authentication and global flags


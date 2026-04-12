---
name: gsk-email-reply
version: 1.0.0
description: Reply to an existing email (creates reply draft and sends it).
metadata:
  category: email
  requires:
    bins:
    - gsk
  cliHelp: gsk email reply --help
---

# gsk-email-reply

**PREREQUISITE:** Read `../gsk-shared/SKILL.md` for auth, global flags, and security rules.

Reply to an existing email (creates reply draft and sends it).

## Usage

```bash
gsk email reply [options]
```

## Flags

| Flag | Required | Description |
|------|----------|-------------|
| `<message_id>` (positional) | Yes | The email message ID to reply to. (string) |
| `--body` | Yes | Reply message body. (string) |
| `--reply_all` | No | If true, reply to all recipients. Default: false. (boolean) |
| `--cc` | No | Additional CC recipient(s), comma-separated. (string) |
| `--bcc` | No | BCC recipient(s), comma-separated. (string) |
| `--body_type` | No | Body format: 'html' (default) or 'text'. (string) |
| `-a`, `--from_account` | No | Sender email account to use. (string) |

## See Also

- [gsk-shared](../gsk-shared/SKILL.md) — Authentication and global flags


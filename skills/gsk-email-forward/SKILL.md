---
name: gsk-email-forward
version: 1.0.0
description: Forward an existing email to new recipients via Gmail or Outlook.
metadata:
  category: email
  requires:
    bins:
    - gsk
  cliHelp: gsk email forward --help
---

# gsk-email-forward

**PREREQUISITE:** Read `../gsk-shared/SKILL.md` for auth, global flags, and security rules.

Forward an existing email to new recipients via Gmail or Outlook.

## Usage

```bash
gsk email forward [options]
```

**Aliases:** `fwd`

## Flags

| Flag | Required | Description |
|------|----------|-------------|
| `<message_id>` (positional) | Yes | The email message ID to forward. (string) |
| `--to` | Yes | Recipient email address(es) to forward to, comma-separated. (string) |
| `--cc` | No | CC recipient(s), comma-separated. (string) |
| `--bcc` | No | BCC recipient(s), comma-separated. (string) |
| `--body` | No | Optional additional message to include above the forwarded content. (string) |
| `--content_type` | No | Content type: text/plain or text/html. Default: text/html. (string) |
| `--include_attachments` | No | Whether to include original attachments. Default: true. (boolean) |
| `-a`, `--from_account` | No | Sender email account to use if multiple accounts are connected. (string) |

## See Also

- [gsk-shared](../gsk-shared/SKILL.md) — Authentication and global flags


---
name: gsk-email-read
version: 1.0.0
description: Read a specific email by its ID.
metadata:
  category: email
  requires:
    bins:
    - gsk
  cliHelp: gsk email read --help
---

# gsk-email-read

**PREREQUISITE:** Read `../gsk-shared/SKILL.md` for auth, global flags, and security rules.

Read a specific email by its ID.

## Usage

```bash
gsk email read [options]
```

## Flags

| Flag | Required | Description |
|------|----------|-------------|
| `<id>` (positional) | Yes | The email ID to read. (string) |
| `-a`, `--from_account` | No | Email account to use if multiple accounts are connected. (string) |
| `--download_attachments` | No | Whether to download attachments from the email to AIDrive. Default: false. (boolean) |
| `--aidrive_path` | No | Path in AIDrive where attachments should be saved. Default: /email_attachments/ (string) |

## See Also

- [gsk-shared](../gsk-shared/SKILL.md) — Authentication and global flags


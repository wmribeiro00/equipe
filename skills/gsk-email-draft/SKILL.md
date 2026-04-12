---
name: gsk-email-draft
version: 1.0.0
description: Create an email draft (new, reply, reply_all, or forward) without sending.
metadata:
  category: email
  requires:
    bins:
    - gsk
  cliHelp: gsk email draft --help
---

# gsk-email-draft

**PREREQUISITE:** Read `../gsk-shared/SKILL.md` for auth, global flags, and security rules.

Create an email draft (new, reply, reply_all, or forward) without sending.

## Usage

```bash
gsk email draft [options]
```

## Flags

| Flag | Required | Description |
|------|----------|-------------|
| `--to` | No | Email address of the recipient (comma separated). Required for 'draft' and 'forward' types. For 'reply'/'reply_all', can be auto-extracted from original email if not provided. (string) |
| `--subject` | No | Subject of the email. Required for 'draft' type. For 'reply'/'reply_all'/'forward', can be auto-extracted from original email with appropriate prefix (Re:/Fwd:) if not provided. (string) |
| `--cc` | No | Email addresses to CC (comma separated), optional (string) |
| `--bcc` | No | Email addresses to BCC (comma separated), optional (string) |
| `--from_address` | No | Send-as email address to use as the sender. Use this to send as a group/alias address (e.g., 'feedback@company.com'). Must be configured in Gmail's 'Send mail as' settings or Outlook's shared mailboxes. (string) |
| `--body_type` | No | Email body type. Default is 'html' which provides proper formatting with paragraphs, line breaks, and professional styling using <div> tags. Use 'text' only if the user explicitly requests plain text format. (string, one of: html, text, default: `html`) |
| `-p`, `--service_provider` | Yes | Service provider. Use 'gmail' for Gmail, 'outlook' for Outlook. (string, one of: gmail, outlook) |
| `-a`, `--account_email` | No | The email address of the account to use for creating the draft. REQUIRED when the user has multiple accounts of the same type. If user specifies an account, set account_email to that address. If not specified, the default account for the service_provider will be used. (string) |
| `--type` | No | Type of the email. Use 'draft' for new email, 'reply' to reply to sender only, 'reply_all' to reply to all recipients, 'forward' to forward an existing email. For reply/reply_all/forward, original_email_id is required. (string, one of: draft, reply, reply_all, forward) |
| `--thread_id` | No | Thread ID of the email, if it is a reply or forward, this is the thread ID of the original email, otherwise it is empty. (string) |
| `--original_email_id` | No | The actual email ID from the email metadata (NOT a placeholder). REQUIRED for 'reply', 'reply_all', and 'forward' types. This is a long alphanumeric string like 'AAMkADZj...' for Outlook or '19bb065924c3ce50' for Gmail. Find this in the Email Metadata section as the email's unique identifier. DO NOT use placeholder text like 'your_email_id' - use the actual ID value. (string) |
| `--original_email_account` | No | The email account (email address) that received the original email. REQUIRED for 'reply', 'reply_all', and 'forward' types. This ensures the reply is sent from the correct account. Use the 'Account' field from the email metadata. (string) |
| `--draft_id` | No | Optional. The ID of an existing draft to update. If provided, the existing draft will be updated instead of creating a new one. Use this when the user wants to modify or continue editing a previous draft. (string) |

## See Also

- [gsk-shared](../gsk-shared/SKILL.md) — Authentication and global flags


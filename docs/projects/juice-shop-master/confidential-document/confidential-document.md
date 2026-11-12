# Confidential Document

> [!INFO]
> This documentation is provided **for educational purposes only**. It demonstrates
> a vulnerability in the intentionally insecure OWASP Juice Shop training application.

**Category:** Sensitive Data Exposure / Information Disclosure (Broken Access Control – OWASP A01:2021)
**Environment:** Kali Linux VM (VirtualBox)
**Required tools:** OWASP Juice Shop (Node.js/npm), **Burp Suite** (Proxy + Repeater)

## Table of Contents

- [Summary](#summary)
- [Why Burp Suite Is Required](#why-burp-suite-is-required)
- [Exploitation Steps](#exploitation-steps)
  1. [Start the Juice Shop](#1-start-the-juice-shop)
  2. [Start Burp Suite](#2-start-burp-suite)
  3. [Configure the Proxy](#3-configure-the-proxy)
  4. [Open the Target in Burp's Browser](#4-open-the-target-in-burps-browser)
  5. [Trigger and Capture the Request](#5-trigger-and-capture-the-request)
  6. [Replay in Repeater and Get 200 OK](#6-replay-in-repeater-and-get-200-ok)
  7. [Reveal the Hidden Files](#7-reveal-the-hidden-files)
- [Discovered Files](#discovered-files)
- [Why This Is a Risk](#why-this-is-a-risk)
- [How to Fix It](#how-to-fix-it)
- [Video](#video)
- [References](#references)

## Summary

The Juice Shop serves an internal `/ftp/` folder over the web. By intercepting
the traffic with Burp Suite and replaying the request in the Repeater, we obtain
an **HTTP 200 OK** response that reveals the confidential document
`acquisitions.md` together with the full set of files served from `/ftp/`.

## Why Burp Suite Is Required

> [!IMPORTANT]
> In a plain browser only a single file is visible. By routing the traffic through
> Burp Suite we can inspect the **raw request and response**, see the exact path
> and headers, and replay the request in the Repeater. This is what reveals the
> `200 OK` response and the complete list of otherwise hidden files.

## Exploitation Steps

### 1. Start the Juice Shop

Inside the Kali VM, open the Juice Shop project folder and start the server:

```bash
cd juice-shop
npm start
```

Confirm it is reachable at `http://127.0.0.1:3000`.

### 2. Start Burp Suite

Launch Burp Suite (terminal command `burpsuite` or from the menu) and create a
**new temporary project** → **Use Burp defaults** → **Start Burp**.

### 3. Configure the Proxy

1. Go to **Proxy → Proxy settings** and confirm the local proxy listener is
   active on port **8080**.
2. Turn **Intercept = ON** (**Proxy → Intercept**) so requests are held for
   inspection.

> [!NOTE]
> With Intercept **ON**, each request is paused so you can read its full path and
> headers before forwarding it.

### 4. Open the Target in Burp's Browser

Click **Proxy → Intercept → Open Browser** to launch Burp's built-in browser,
then navigate directly to the About Us route:

```text
http://127.0.0.1:3000/#/about
```

> [!TIP]
> Open this exact path, including the `#/about` hash route — not just
> `http://127.0.0.1:3000`. Loading the About Us page directly is what triggers the
> correct request to the `/ftp/` path in the next step.

### 5. Trigger and Capture the Request

1. On the **About Us** page (opened in step 4), click the link to the
   legal/terms document.
2. Because Intercept is ON, Burp **holds the request**. You can now see the full
   request line, the **path** (`/ftp/...`), and all headers.

### 6. Replay in Repeater and Get 200 OK

1. Right-click the captured request → **"Send to Repeater"**.
2. Switch to the **Repeater** tab. The left pane shows the **Request**, the right
   pane shows the **Response**.
3. Change the path to `GET /ftp/acquisitions.md` and click **"Send"**.
4. The response is **`HTTP/1.1 200 OK`**, `Content-Type: text/markdown`, and the
   confidential document appears in the response body:
   _"This document is confidential! Do not distribute!"_.

> [!TIP]
> **Challenge solved** — a toast in the Juice Shop confirms _"Confidential Document"_ ✅

### 7. Reveal the Hidden Files

Send a request for the directory itself (`GET /ftp/`) in the Repeater. The
`200 OK` response lists **all** files served from the folder — not just the one
visible in a normal browser.

## Discovered Files

Files exposed in `/ftp/` (exact set varies by Juice Shop version):

| File                                         | Why it's dangerous                               |
| -------------------------------------------- | ------------------------------------------------ |
| `acquisitions.md`                            | **the confidential document (challenge target)** |
| `coupons_2013.md.bak`                        | backup leaking coupon codes                      |
| `incident-support.kdbx`                      | KeePass password database                        |
| `package.json.bak` / `package-lock.json.bak` | reveal dependencies & versions                   |
| `suspicious_errors.yml`                      | internal logs / error details                    |
| `encrypt.pyc`                                | compiled Python script                           |
| `legal.md`                                   | legal notice (the public hint)                   |

## Why This Is a Risk

> [!WARNING]
>
> - **Anyone can read internal files** — no login required.
> - **Backups and databases leak secrets.** A `.kdbx` or `.bak` file can hand an
>   attacker credentials, internal paths, and clues to the next vulnerability.
> - **Real-world impact:** leaked business plans, GDPR violations, reputational
>   damage, and follow-up attacks. This is **OWASP A01:2021 – Broken Access Control**.

## How to Fix It

- **Disable directory listing** so folders can't be browsed.
- **Keep sensitive files out of web-reachable paths** (`.bak`, `.kdbx`, `.yml`,
  `.pyc`, internal docs).
- **Require authentication and authorization** before serving any non-public file.
- **Deploy hygiene:** ship only the files the app actually needs.

## Video

- [Challenge walkthrough video](https://go.screenpal.com/watch/cOXnFdnyN49)

## References

> [!NOTE]
> List the resources you actually used while solving this challenge (replace with
> your own):

- OWASP Juice Shop documentation
- OWASP Top 10 – A01:2021 Broken Access Control
- _(add the tutorial/video you followed, if any)_

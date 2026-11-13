# Confidential Document

> [!NOTE]
> This documentation is provided **for educational purposes only**.
> All testing was performed in a local, isolated lab environment (Kali VM) against a deliberately vulnerable application. No real personal data, credentials, or systems were used.

## Table of Contents

- [Overview](#overview)
- [Category](#category)
- [Vulnerability](#vulnerability)
- [Prerequisites](#prerequisites)
- [Exploitation Steps](#exploitation-steps)
- [Why It Works](#why-it-works)
- [Impact and Consequences](#impact-and-consequences)
- [Mitigation](#mitigation)
- [Video](#video)
- [References](#references)

## Overview

This challenge targets the internal `/ftp/` folder of the OWASP Juice Shop. By intercepting the traffic with Burp Suite and replaying the request in the Repeater, we get an **HTTP 200 OK** response for the confidential document `acquisitions.md`, together with a listing of all files served from `/ftp/`.

## Category

**Sensitive Data Exposure** · OWASP Top 10: **A01:2021 – Broken Access Control**

## Vulnerability

The application serves static files from an `/ftp/` folder that is reachable over the web. The *About Us* page links to a legal document in this folder, which reveals the path. Directory listing is enabled and there is no access control, so anyone who knows or guesses the path can read confidential files such as `acquisitions.md`.

## Prerequisites

- OWASP Juice Shop running locally (`npm start`) and reachable at `127.0.0.1:3000`
- A browser inside the Kali VM
- Burp Suite (Proxy + Repeater)

> [!NOTE]
> Burp Suite is required. In a plain browser only a single file is visible. Burp shows the **raw request and response** and lets you replay the request in the Repeater, which reveals the `200 OK` response and the complete list of hidden files.

## Exploitation Steps

1. **Start the Juice Shop.** In the Juice Shop project folder inside the Kali VM, run `npm start` and confirm the shop is reachable at `http://127.0.0.1:3000`.
2. **Start Burp Suite.** Launch it with `burpsuite` (or from the menu) and create a **new temporary project** → **Use Burp defaults** → **Start Burp**.
3. **Configure the proxy.** In **Proxy → Proxy settings**, confirm the listener is active on port **8080**, then turn **Intercept = ON** in **Proxy → Intercept**, so each request is paused for inspection.
4. **Open the target in Burp's browser.** Click **Proxy → Intercept → Open Browser** and navigate directly to `http://127.0.0.1:3000/#/about`.
5. **Capture the request.** On the *About Us* page, click the link to the legal document. Burp holds the request and shows the full path (`/ftp/...`) and all headers.
6. **Replay in Repeater.** Right-click the request → **Send to Repeater**. Change the path to `GET /ftp/acquisitions.md` and click **Send**. The response is `HTTP/1.1 200 OK` with `Content-Type: text/markdown` and the text *"This document is confidential! Do not distribute!"* — the challenge is solved.
7. **Reveal the hidden files.** Send `GET /ftp/` in the Repeater. The `200 OK` response lists **all** files in the folder, not just the one visible in a normal browser.

> [!TIP]
> Open the exact path including the hash route `#/about`, not just `http://127.0.0.1:3000`. Loading the *About Us* page directly is what triggers the correct request to the `/ftp/` path in step 5.

## Why It Works

The server publishes the whole `/ftp/` folder as static content and has directory listing enabled. It never checks **who** requests a file, so the only "protection" is that the file name is not linked anywhere. Once the folder path is known from the public legal link, every file inside it can be listed and downloaded.

## Impact and Consequences

- **Leak of confidential business data**, such as the planned acquisitions in `acquisitions.md`.
- **Leaked secrets** from backups and databases in the same folder, for example `incident-support.kdbx` (KeePass database), `coupons_2013.md.bak` (coupon codes) and `package.json.bak` (dependencies and versions).
- **Follow-up attacks** that reuse the leaked information.
- **Financial loss, GDPR fines and loss of customer trust.**

No login is needed, so any visitor can exploit this.

## Mitigation

> [!WARNING]
> Never place internal documents, backups or secret files in a web-reachable directory.

- **Disable directory listing**, so folders cannot be browsed.
- **Keep sensitive files** (`.bak`, `.kdbx`, `.yml`, `.pyc`, internal docs) **out of public paths.**
- **Require authentication and authorization** before serving any non-public file.
- **Deploy only the files the application actually needs.**

## Video

- [Challenge walkthrough video](https://go.screenpal.com/watch/cOXnFdnyN49)

## References

- OWASP Juice Shop documentation
- OWASP Top 10 – A01:2021 Broken Access Control

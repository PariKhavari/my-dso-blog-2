# Juice Shop Master

This project documents the exploitation of selected vulnerabilities in the OWASP Juice Shop, a deliberately insecure web application. Three challenges from different security categories were solved, documented step by step and recorded on video. Each write-up explains how the vulnerability works, how it was exploited and how it can be mitigated.

> **Disclaimer:** The content of this documentation is intended for educational purposes only. All attacks were performed against a local, intentionally vulnerable test environment. Do not use these techniques against systems you do not own or have no explicit permission to test.

## Table of Contents

- [Environment and Tools](#environment-and-tools)
- [Quickstart](#quickstart)
- [Challenges](#challenges)
  - [Confidential Document](#confidential-document)
  - [Login Admin](#login-admin)
  - [Admin Section](#admin-section)

## Environment and Tools

All challenges were performed in an isolated lab environment: the OWASP Juice Shop runs inside a **Kali Linux virtual machine**, so no real systems or real personal data are affected.

| Tool | Purpose | Used in |
| --- | --- | --- |
| Kali Linux (VM) | Isolated attack and test environment | All challenges |
| Burp Suite | Intercepting, inspecting and modifying HTTP requests | Confidential Document, Login Admin |
| Browser DevTools | Inspecting the frontend and network traffic | All challenges |
| Custom Selenium script (extra) | Automated discovery of hidden Angular routes | Admin Section |

Choosing and combining the right tool for each attack was part of the challenge: the same application required a proxy for one vulnerability and browser automation for another.

## Quickstart

1. Start a Kali Linux VM and install the OWASP Juice Shop locally (requires Node.js and npm):

   ```bash
   git clone https://github.com/juice-shop/juice-shop.git --depth 1
   cd juice-shop
   npm install
   npm start
   ```

2. Open `http://localhost:3000` in your browser.
3. Choose a challenge below, read the write-up and watch the video to reproduce the attack step by step.

## Challenges

| Challenge | Category | Documentation | Video |
| --- | --- | --- | --- |
| Confidential Document | Sensitive Data Exposure | [Write-up](./confidential-document/confidential-document.md) | [Video](https://go.screenpal.com/watch/cOXnFdnyN49) |
| Login Admin | Injection (SQL Injection) | [Write-up](./login-admin/login-admin.md) | [Video](https://go.screenpal.com/watch/cOXjYyn4iBA) |
| Admin Section | Broken Access Control | [Write-up](./admin-section/admin-section.md) | [Video](https://go.screenpal.com/watch/cOXlbKn4F2j) |

### Confidential Document

- **Vulnerability:** Internal files are stored in a public directory without access control.
- **Attack:** Browse or guess the file path and download the document.
- **Impact:**
  - Leak of confidential business data
  - Financial loss and GDPR fines
  - Loss of customer trust

### Login Admin

- **Vulnerability:** Login input is inserted directly into the SQL query.
- **Attack:** Enter `' OR 1=1--` as email to bypass the password check.
- **Impact:**
  - Takeover of the admin account
  - Access to all user data
  - Manipulation or deletion of database content

### Admin Section

- **Vulnerability:** The admin page is only hidden in the frontend, not protected on the server.
- **Attack:** Find and open the hidden route `/#/administration`.
- **Impact:**
  - Unauthorized access to user lists and feedback
  - Abuse of administrative functions
  - Data leaks

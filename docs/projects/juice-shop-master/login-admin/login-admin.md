# Login Admin

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

This challenge targets the login form of the OWASP Juice Shop. By injecting SQL into the email field, the authentication check is bypassed and we log in as the **administrator** without knowing the password.

## Category

**Injection — SQL Injection (SQLi)** · OWASP Top 10: **A03:2021 – Injection**

## Vulnerability

The login endpoint builds its SQL query by directly concatenating the user input into the query string. Because the input is not parameterized, an attacker can break out of the string literal and change the logic of the `WHERE` clause.

The vulnerable query has roughly this shape:

```sql
SELECT * FROM Users WHERE email = '<input>' AND password = '<hash>' AND deletedAt IS NULL
```

## Prerequisites

- OWASP Juice Shop running locally (`npm start`) and reachable at `127.0.0.1:3000`
- A browser inside the Kali VM
- Burp Suite (to inspect the request/response and confirm the query)

## Exploitation Steps

1. **Open the login page** at `127.0.0.1:3000/#/login`.
2. **Enter any values first.** Type any email and any password and submit once — this is only to generate a `POST /rest/user/login` request.
3. **Inspect in Burp Suite.** Capture the request and send it to **Repeater**. The server returns `500 Internal Server Error`, and the response body leaks the raw SQL statement (a `SQLITE_ERROR` with the full `SELECT ... FROM Users WHERE email = ... AND password = ...`). This reveals exactly how the query is built.
4. **Craft the injection.** Set the **email** field to:
   ```
   ' OR 1=1--
   ```
   The password can be anything.
5. **Submit the payload** (either in the browser login form or by editing the request body in Burp Repeater and sending it).
6. **Result.** The response is `200 OK` and contains an authentication token for the first user in the `Users` table — the **admin** account. You are now logged in as administrator.

> [!TIP]
> To log in as a _specific_ user instead of the first row, target the account directly, e.g. `admin@juice-sh.op'--`. The `--` comments out the rest of the query, including the password check.

## Why It Works

With the payload `' OR 1=1--`, the query becomes:

```sql
SELECT * FROM Users WHERE email = '' OR 1=1--' AND password = '...' AND deletedAt IS NULL
```

- The `'` closes the email string early.
- `OR 1=1` makes the `WHERE` condition **always true**, so every row matches.
- `--` comments out the rest of the line, so the `AND password = ...` check is never evaluated.

The application takes the **first matching row** and authenticates it. Since the admin is the first user created, we are logged in as admin.

## Impact and Consequences

SQL Injection is one of the most dangerous web vulnerabilities. A successful attack on a real system can lead to:

- **Authentication bypass** — logging in as any user (including admin) without a password.
- **Data breach** — reading, modifying, or deleting the entire database (user data, password hashes, orders).
- **Full account takeover** and, in worse cases, command execution on the database server.
- **Compliance and reputational damage** from leaked personal data.

Being vulnerable to SQLi effectively means the attacker controls the database query logic.

## Mitigation

> [!IMPORTANT]
> Never build SQL queries by concatenating user input.

- **Use parameterized queries / prepared statements** so input is always treated as data, never as SQL code.
- **Use an ORM** (e.g. Sequelize) correctly with bound parameters instead of raw string queries.
- **Validate and sanitize input** (allow-list where possible) as defense in depth.
- **Apply least privilege** to the database account used by the application.
- **Return generic error messages** — never expose raw SQL or stack traces to the client (as seen in the leaked response above).

## Video

- [Challenge walkthrough video](https://go.screenpal.com/watch/cOXjYyn4iBA)

## References

- OWASP Juice Shop tutorial (Developer Akademie)
- OWASP Top 10 – A03:2021 Injection
- OWASP SQL Injection Prevention Cheat Sheet

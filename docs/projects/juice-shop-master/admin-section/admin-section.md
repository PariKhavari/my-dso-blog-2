# Admin Section

> [!NOTE]
> This documentation is provided **for educational purposes only**.
> All testing was performed in a local, isolated lab environment (Kali VM) against a deliberately vulnerable application. No real personal data, credentials, or systems were used.

## Table of Contents

- [Overview](#overview)
- [Category](#category)
- [Vulnerability](#vulnerability)
- [Prerequisites](#prerequisites)
- [The Route Scanner (Selenium)](#the-route-scanner-selenium)
- [Exploitation Steps](#exploitation-steps)
- [Why It Works](#why-it-works)
- [Impact and Consequences](#impact-and-consequences)
- [Mitigation](#mitigation)
- [Video](#video)
- [References](#references)

## Overview

This challenge targets the hidden administration page of the OWASP Juice Shop. The route `/#/administration` is not linked anywhere in the user interface, but it can be discovered in the client-side JavaScript and opened directly. Because access is only hidden in the frontend and not enforced on the server, an administrator can reach the full admin panel.

## Category

**Broken Access Control** · OWASP Top 10: **A01:2021 – Broken Access Control**

## Vulnerability

The Angular application ships all of its routes to the browser inside the JavaScript bundle (`main.js`), including the admin route. The route is merely *hidden* (no menu link), which is **security through obscurity**. There is no reliable server-side authorization check that prevents a client from loading the route, so anyone who learns the path can request it.

## Prerequisites

- OWASP Juice Shop running locally and reachable at `127.0.0.1:3000`
- A browser inside the Kali VM
- An administrator session (the admin account, obtained via the *Login Admin* SQL injection challenge)
- `gobuster_selenium.py` — a Selenium-based route scanner (classic Gobuster cannot see routes after the `#`)

## The Route Scanner (Selenium)

Classic Gobuster cannot find routes like `/#/administration`, because everything after the `#` stays in the browser and is never sent to the server. To brute-force client-side routes we drive a **real browser** with **Selenium**, so Angular actually renders each route and we can see the result.

> [!NOTE]
> **Selenium** is a tool that controls a browser from code. It opens pages, clicks, and reads the rendered content — exactly what we need for a JavaScript single-page application.

Install Selenium and the Firefox driver (`geckodriver`) inside the Kali VM:

```bash
pip install --user --break-system-packages selenium==4.9.0
```

> [!IMPORTANT]
> Recent Kali versions protect the system Python (**PEP 668**), so a plain `pip install` is blocked with an *externally-managed-environment* error. The flag `--break-system-packages` together with `--user` installs Selenium into `~/.local` and reproduces the setup shown in the tutorial. Version **4.9.0** is pinned on purpose. `geckodriver` must be available at `/usr/local/bin/geckodriver`.

The scanner (`gobuster_selenium.py`) works like this:

```python
from selenium import webdriver
import time

url = "http://localhost:3000/#/"
driver_path = "/usr/local/bin/geckodriver"

options = webdriver.FirefoxOptions()
options.add_argument("--headless")
driver = webdriver.Firefox(executable_path=driver_path, options=options)

# Name of the Angular component currently rendered
get_page = "return document.querySelector('router-outlet').nextElementSibling.tagName"

# Baseline: a route that surely does not exist
driver.get(url + "gibtesnicht12345")
time.sleep(1)
baseline = driver.execute_script(get_page)

with open("wordlist.txt") as wordlist:
    for word in wordlist:
        word = word.strip()
        driver.get(url + word)
        time.sleep(1)  # wait for JavaScript to render the page
        if driver.execute_script(get_page) != baseline:
            print("Gefunden: /#/" + word)

driver.quit()
```

It first loads a route that does not exist and remembers which component Angular shows. Then it opens every word from `wordlist.txt` as `/#/<word>` and reports a hit whenever a **different component** is rendered.

### The Wordlist

The wordlist is a plain text file with **one candidate path per line** (hundreds of words), for example `admin`, `login`, `administration`, `score-board`. The scanner is only as good as its list: a route that is not in the file will never be found. Common wordlists also carry a language and regional bias — many assume English path names, so admin pages in another language (e.g. `verwaltung`, `administracion`) may be missed unless the list is adapted.

## Exploitation Steps

> [!IMPORTANT]
> You must be **logged in as administrator** before the route works. Opening `/#/administration` without an admin session only redirects you away. Log in using the SQL injection `' OR 1=1--` from the *Login Admin* challenge (step 5).

1. **Install Selenium in the VM.** Make sure Selenium and `geckodriver` are installed (see [The Route Scanner](#the-route-scanner-selenium)).
2. **Have the files ready.** The script `gobuster_selenium.py` and the wordlist `wordlist.txt` (about 100 words) must be in the same folder.
3. **Start the target.** Make sure the Juice Shop is running and reachable at `127.0.0.1:3000`.
4. **Run the scanner.** From that folder, run `python gobuster_selenium.py http://127.0.0.1:3000/#/ wordlist.txt`. It reports `administration` as a valid route.
5. **Log in as administrator.** Use the admin session from the *Login Admin* challenge (SQL injection `' OR 1=1--`), so the request carries a valid admin token.
6. **Open the admin panel.** Navigate directly to `http://127.0.0.1:3000/#/administration`.
7. **Confirm access.** The administration page loads and shows the list of all registered users and all customer feedback — confirming the challenge is solved.

## Why It Works

The admin route exists in the client bundle and is only kept secret by not linking it. Hiding a link in the frontend does not protect a page: the browser already has the full route table, and any user can type the URL. Access control must be enforced on the server for every request, not assumed from a missing menu entry.

## Impact and Consequences

- **Exposure of all user records** (emails, roles) and all customer feedback.
- **Privilege escalation** if the panel allows administrative actions.
- **Loss of confidentiality and integrity** of the application's data.

A broken access control flaw means the server trusts the client to restrict itself — which an attacker never does.

## Mitigation

> [!IMPORTANT]
> Never rely on hiding a link to protect a page.

- **Enforce authorization on the server** for every request to an admin resource, independent of the frontend.
- **Check the user's role** on each protected API endpoint, not only in the UI.
- **Deny by default** — block access unless the user is explicitly authorized.
- **Do not depend on obscurity** — assume every client-side route is public knowledge.

## Video

- [Challenge walkthrough video](https://go.screenpal.com/watch/cOXlbKn4F2j)

## References

- OWASP Juice Shop documentation
- OWASP Top 10 – A01:2021 Broken Access Control
- OWASP Juice Shop tutorialsvideo (Developer Akademie)
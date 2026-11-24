# My Developer Blog & Portfolio

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator, and [React](https://react.dev/).

## Table of Contents

- [My Developer Blog \& Portfolio](#my-developer-blog--portfolio)
  - [Table of Contents](#table-of-contents)
  - [Repository Description](#repository-description)
  - [Quickstart](#quickstart)
    - [Prerequisites](#prerequisites)
    - [How to start](#how-to-start)
  - [Usage](#usage)
    - [Start the project](#start-the-project)
    - [Build the project](#build-the-project)
    - [Configuration](#configuration)
    - [Portfolio components](#portfolio-components)
    - [Customizing the portfolio](#customizing-the-portfolio)
  - [Deployment](#deployment)
    - [GitHub Pages (automated)](#github-pages-automated)
    - [NGINX (alternative)](#nginx-alternative)
  - [Repository Structure](#repository-structure)
 

## Repository Description

This repository contains my personal developer website. It combines two parts:

- **Portfolio (start page):** A one-page portfolio built from custom React components. It shows the sections Header, Hero, My Skills, My Project Highlights, Contact and Footer, based on a given Figma design.
- **Blog and documentation:** Markdown-based blog posts and project documentation from my DevSecOps training. Each project in the portfolio links directly to its documentation page.

The purpose of this repository is to present my skills and projects in one place and to document them. The site is built and deployed automatically to GitHub Pages with GitHub Actions.

## Quickstart

### Prerequisites

- [Node.js](https://nodejs.org/) (v24 or later recommended)
- npm (comes with Node.js)
- [Git](https://git-scm.com/)

### How to start

```bash
git clone PariKhavari/my-dso-blog-2
cd my-dso-blog-2
npm install
npm start
```

The site opens at `http://localhost:3000`.

## Usage

### Start the project

```bash
npm start
```

This command starts a local development server and opens a browser window. Most changes are shown live without restarting the server.

### Build the project

```bash
npm run build
```

This command generates static files in the `build/` directory. You can test the build locally with:

```bash
npm run serve
```

### Configuration

- **`docusaurus.config.ts`:** Main configuration: site title, `url`, `baseUrl`, navbar, footer and blog settings. For your own GitHub Pages site, change `url`, `baseUrl`, `organizationName` and `projectName`.
- **`example.env`:** Template for environment variables (e.g. `GIT_REPOSITORY_URL`). Copy it to `.env` and adjust the values. Never commit `.env`.
- **`src/css/custom.css`:** Global styles, colors and fonts. The font Quicksand is loaded locally via the npm package `@fontsource/quicksand`, so no external font requests are made.

### Portfolio components

The portfolio is put together in `src/pages/index.tsx`. Each section is a React component in its own folder in `src/components/`. Every folder contains an `index.tsx` and a CSS module with the same name as the component.

| Section | Folder | Description |
| --- | --- | --- |
| Header | `src/components/header/` | Navigation with anchor links and a mobile menu |
| Hero | `src/components/hero/` | Introduction with name and role |
| My Skills | `src/components/skills/` | Overview of skills and technologies |
| My Project Highlights | `src/components/projects/` | Project list with an active project card |
| Project Card | `src/components/project-card/` | Card for one project (used by `projects`) |
| Contact | `src/components/contact/` | Contact links (email, GitHub, LinkedIn) |
| Footer | `src/components/footer/` | Footer with copyright and links |

All component props are typed with TypeScript interfaces. No `any` type is used.

### Customizing the portfolio

- **Change the order of sections or remove a section:** Edit the JSX in `src/pages/index.tsx`.
- **Change navigation links:** Edit the `navItems` array in `src/pages/index.tsx`. Each `href` must match the `id` of a section (e.g. `#skills`).
- **Add a project:** Add a new object to the `projects` array in `src/components/projects/index.tsx`:

  ```ts
  {
    title: 'My Project',
    description: 'Short description of the project.',
    image: '/img/projects/my-project.png', // file in static/img/projects/
    tags: ['Docker', 'Linux'],
    docPath: 'docs/my-project',            // documentation page in docs/
    githubLink: 'https://github.com/PariKhavari/my-dso-blog-2', // optional
  }
  ```

- **Add a technology icon:** Add the tag name and icon URL to the `tagIcons` mapping in `src/components/project-card/index.tsx`.
- **Change the number of visible projects:** Change `DESKTOP_VISIBLE_COUNT` or `MOBILE_VISIBLE_COUNT` in `src/components/projects/index.tsx`.
- **Change texts, skills or contact links:** Edit the data directly in the `index.tsx` of the matching component.
- **Change styles:** Edit the CSS module of the component (e.g. `src/components/hero/hero.module.css`).
- **Add a blog post or documentation page:** Add a Markdown file to `blog/` or `docs/`. No additional configuration is required.

## Deployment

### GitHub Pages (automated)

The website is deployed automatically to GitHub Pages with GitHub Actions:

1. Work on a feature branch (e.g. `feature/contact`) and push it.
2. A pull request is created automatically. The CI/CD workflow checks that the project builds.
3. After the pull request is merged into `main`, the workflow builds the site again and deploys the `build/` folder to GitHub Pages.

In the repository settings, **Settings → Pages → Source** must be set to **GitHub Actions**.

### NGINX (alternative)

The site can also be served by any web server, for example NGINX:

```bash
npm run build
sudo cp -r build/* /var/www/portfolio/
```

Example NGINX server block:

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/portfolio;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html /404.html;
    }
}
```

When the site is served from the root of a domain, set `baseUrl: '/'` in `docusaurus.config.ts` before the build.

## Repository Structure

```text
my-dso-blog-2/
├── .github/
│   ├── workflows/            # GitHub Actions workflows (CI/CD, pull requests)
│   └── dependabot.yml        # Automatic dependency updates
├── blog/                     # Blog posts (Markdown)
├── docs/                     # Project documentation (Markdown)
├── src/
│   ├── components/           # Portfolio components (one folder per component)
│   ├── css/custom.css        # Global styles and fonts
│   └── pages/index.tsx       # Start page: puts the portfolio sections together
├── static/                   # Images and icons, served without processing
├── .dockerignore             # Files excluded from the Docker image
├── .gitignore                # Files excluded from Git (e.g. .env, build/, node_modules/)
├── babel.config.js           # Babel configuration (Docusaurus default)
├── checkliste.md             # Completed project checklist for the submission
├── Dockerfile                # Builds the site and serves it in a container
├── docusaurus.config.ts      # Main Docusaurus configuration
├── example.env               # Template for environment variables
├── LICENSE                   # License of the repository
├── package.json              # Dependencies and npm scripts
├── package-lock.json         # Locked dependency versions
├── README.md                 # This documentation
└── sidebars.ts               # Structure of the documentation sidebar
```

**Workflows in `.github/workflows/`:**

| File | Purpose |
| --- | --- |
| `main.yml` / `deploy.yml` | Build the site and deploy it to GitHub Pages |
| `create-pr.yml` | Creates or updates a pull request after a push to a feature branch |
| `check-open-pr.yml` | Checks if a pull request for the feature branch is open |

**Generated folders (not committed):** `build/` (output of `npm run build`), `.docusaurus/` (Docusaurus cache), `node_modules/` (installed packages). The file `.env` contains local values and is never committed.


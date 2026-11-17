# My Developer Blog

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Repository Description

The software supports rapid local development, customizable theming, and automated deployment to GitHub Pages.

## Table of Contents

- [My Developer Blog](#my-developer-blog)
  - [Repository Description](#repository-description)
  - [Table of Contents](#table-of-contents)
  - [Quickstart](#quickstart)
    - [Prerequisites](#prerequisites)
  - [Repository Structure](#repository-structure)
  - [Deployment](#deployment)

## Quickstart

### Prerequisites

- [Node.js](https://nodejs.org/) (v24 or later recommended)

1. Installation

   ```
   $ npm install
   ```

2. Local Development

   ```
   $ npm start
   ```

   This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

3. Build

   ```
   $ npm run build
   ```

   This command generates static content into the `build` directory and can be served using any static contents hosting service.

4. Deployment

   Deployment is automated. See the [Deployment](#deployment) section below.


## Repository Structure

The repository is organized as follows:

- `blog/`: Contains markdown files for blog posts. Blog-related metadata is automatically picked up by the Docusaurus configuration.
- `docs/`: Contains markdown files for documentation. These files are referenced in `sidebars.ts` to define the sidebar structure.
- `src/`: Contains custom React components, CSS, and JavaScript for additional functionality or theming.
- `static/`: Stores static assets (e.g., images, icons) served directly without processing.
- `sidebars.ts`: Configures the structure of sidebars in the documentation section.
- `docusaurus.config.ts`: Main configuration file for customizing and managing Docusaurus behavior.
- `build/`: Generated after running the `npm run build` command. Contains the static website files ready for deployment.
- `example.env`: Template for environment variables (e.g. `GIT_REPOSITORY_URL`). Copy it to `.env` and adjust the values. Never commit `.env`.
- `checklist.md`: Completed project checklist for the submission.

New content can be added as follows:

- Add new documentation files to the `docs/` folder.
- Add new blog posts to the `blog/` folder. No additional configuration is required.

## Deployment

The website is automatically deployed to GitHub Pages using a prepared GitHub Actions workflow whenever a commit is pushed to the `main` branch.

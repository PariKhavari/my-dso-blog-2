# Docusaurus Blog

My personal DevSecOps learning journal, built with Docusaurus and based on the developer-akademie-starter template. It is automatically deployed to GitHub Pages.

## TOC

- [Quickstart](#quickstart)
- [Description](#description)
- [Further References](#further-references)

import GithubLinkAdmonition from '@site/src/components/GithubLinkAdmonition';

<GithubLinkAdmonition 
    link="https://github.com/PariKhavari/my-dso-blog-2"
    title="Github Tip" 
    type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>

## Quickstart

1. Clone the repository and run `npm install`.
2. Copy `example.env` to `.env` and set `GIT_REPOSITORY_URL`.
3. Start locally with `npm start` or build with `npm run build`.

## Description

I configured the template project on the feature branch `setup-blog`:

1. Added `GIT_REPOSITORY_URL` to `example.env` and read it in `docusaurus.config.ts` via `gitRepositoryUrl` (with a default value).
2. Used this variable for both `editUrl` values (docs and blog) and the navbar GitHub link.
3. Personalized `title`, `tagline`, `url` and the navbar title.
4. Updated the footer: added a link to the projects page, removed the Community column, added my repository and a "Template" link, customized the copyright.
5. Updated the README: replaced the deployment section and removed the Contributing section.
6. Set the GitHub Pages source to GitHub Actions.

No secrets are stored in the repository. The `.env` file is ignored by Git.

## Further References

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Template Repository](https://github.com/spmse/dev-blog-template)
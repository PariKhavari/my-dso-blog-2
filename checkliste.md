
Please complete all items on this list **before** submitting the project.
If you have implemented any additional extras, briefly mention them so that the mentors can review these changes as well if necessary.

## Repository

### Existing Files

- [x] The repository contains a feature branch named `setup-blog`, which includes the changes necessary to personalize and finalize the configuration of the project.
- [x] The repository contains multiple commits created during the setup and configuration of the project.
  - [x] The feature branch should be merged into the repository’s main branch via a pull request once the project has been approved.
- [x] A file named `README.md` exists and has been **extended** according to the criteria below.
- [x] There are no other files in the repository unless they are explicitly named and described in the README.md.

### Configuration Steps

The following section briefly describes the necessary changes required to personalize and set up your learning journal project, which will be reviewed by us.

#### `docusaurus.config.ts`

- [x] The `title` of the Config object has been adjusted and reflects that this is your learning journal/portfolio project.
- [x] The `tagline` has been adjusted to include a subtitle that briefly describes the content of the page, e.g.: “Maxime Musterperson - DevSecOps Enthusiast with a passion for details and efficiency”
- [x] The default `url` value should be adjusted so that the placeholder matches your **GitHub username**.
- [ x] Add a value for GIT_REPOSITORY_URL to the example.env file so that the GitHub repository URL can be provided as its value.
  - [x] Create a TypeScript variable that reads the value of the environment variable or defines a default value. Use the existing code for the blogEnabled variable as a reference.
- [x] The `editUrl` should be adjusted so that it contains the value of `GIT_REPOSITORY_URL`.
- [x] Within the `blog` object, adjust the configuration so that its editUrl also obtains its value from the environment variable containing the repository URL.
- [x] In the `navbar` object of the themeConfig section of the configuration, the following properties should be changed:
  - [x] title: The displayed title in the website header
  - [x] (optional) logo: Replace the image with your own logo if you have one. Adjust the alt text if necessary.
  - [x] Within the navbar items: Make sure that the href of the GitHub repository uses the correct URL.
  - [x] Adjust the `footer` as follows:
    - [x] Extend the Docs column and add a link to the project page (`/docs/projects/overview`).
    - [x] Remove the Community column from the footer.
    - [x] More column:
      - [x] Replace the GitHub link with a link to your repository, as in the other sections.
      - [x] Add a link to the template repository with the label “Template”.
  - [x] `copyright`:
    - [x] Adjust the copyright message so that it is tailored to you.
    - [x] Extend the copyright message with this snippet: “extended from the developer-akademie-starter”

#### README.md

- [x] Change the Deployment section in the `README` so that it describes in 1–2 sentences that the website is automatically deployed to GitHub Pages using a prepared GitHub Actions workflow whenever a commit is pushed to the main branch.
  - [x] You do not need to explain how this works in detail. At this point, it is sufficient to make this change and replace the existing deployment documentation with the description above.
  - [x] Also make sure that other sections referring to or textually referencing the Deployment section are adjusted accordingly.
- [x] Remove the Contributing section from the README.

#### GitHub Project Settings

To make your project available through GitHub Pages, you must also configure this in the settings of your GitHub repository.
Follow these steps:

- [x] Go to the **Settings** of the project.
- [x] Within the settings, go to the **Pages** settings:
  - [x] Change the existing configuration under the Build & Deploy section so that the source is **GitHub Actions**.

#### `docs/projects/docusaurus-learning-journal.md`

- [x] Create a Markdown file named docusaurus-blog.md in the **docs/projects** folder.
  - [x] In case you need more than just one file to describe your project, you should create a corresponding folder instead of a single file.
  - the folder would still have the name `docusaurus-learning-journal`.
- [x] Fill this file with README-style content. Describe how you configured the template project and which steps you had to follow.
  - [x] You can view the existing example-project.md template and use it as a reference.

## Documentation

The documentation of the code and the project should be provided in the repository in the form of a `README` file.
The documentation language for all projects and related materials is English.
The requirements for project documentation are listed under section 1.
It is especially important to ensure that all changes necessary for the project are completed on a dedicated feature branch (`setup-blog`) in your repository.

## Notes

### General Notes

- [x] In addition to creating a pull request in your GitHub repository, you should record and provide a short video (maximum 5 minutes) in which you briefly show your submission and present what you have done. You do not need to mention every detail, but you should briefly cover and demonstrate all relevant steps.
- [x] If you have any questions, feel free to contact us via the ticketing system.
  - [x] Please create a question ticket in the appropriate channel to ask questions.
  - [x] When you submit your project, there should be no remaining uncertainties or similar issues. If you have questions or uncertainties, we reserve the right to reject a submission immediately.
- [x] If you see a red cross for the automatic checks in your pull request, your project does not yet fulfill our requirements.
  - [x] If you cannot make further progress, please create a question ticket accordingly, and someone from the mentor team will help you as soon as possible.

### Security Notes

- [x] Do not store SSH keys in the workspace of your Git repository.
- [x] Do not store passwords, tokens, or usernames in your code. Use environment variables instead.
- [x] Do not store IP addresses or other sensitive information in a Git repository.
- [x] Under no circumstances upload your .env file to the repository.
  - [x] Make sure that you have not accidentally stored secret information in the example.env file and added it to the repository.

### Testing

Before submitting your project, you should ensure and test the following:
- [x] The application can be built locally and in the CI pipeline.
  - [x] In the project’s `package.json`, you will find a script that can help you trigger a build process locally.
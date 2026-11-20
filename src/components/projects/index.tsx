import { useState, type ReactNode } from 'react';
import ProjectCard, { type Project } from './project-card';
import styles from './projects.module.css';

const projects: Project[] = [
  {
    title: 'Baby Tools World',
    description: 'This Django web shop for baby products was extended with product tags and a star rating system. Ratings and comments are saved in the database, and each user can rate a product only once. What made it exciting: working with Django models, forms and user authentication in a real project.',
    image: '/img/projects/baby-tools.png',
    tags: ['Python', 'Django'],
    docPath: 'docs/baby-tools-world',
    githubLink: 'https://github.com/PariKhavari/baby-tools-world',
  },
  {
    title: 'Conduit Container',
    description: 'The full-stack app Conduit runs completely in containers with Docker Compose: frontend, Django backend and PostgreSQL on one network. An Nginx reverse proxy forwards API requests, and named volumes keep the data persistent. New for me was building a multi-container setup with a reverse proxy.',

    image: '/img/projects/conduit.png',
    tags: ['Docker', 'Django', 'Nginx'],
    docPath: 'docs/conduit-container',
    githubLink: 'https://github.com/PariKhavari/conduit-container-v2',
  },
  {
    title: 'Truck Signs API',
    description: 'A broken container setup for a Django REST API was repaired from the ground up: new Dockerfile, Compose file, automatic migrations on startup and Gunicorn as application server. Secrets are passed in via an .env file. Debugging this setup showed how containers, databases and app servers work together.',
    image: '/img/projects/truck-signs.png',
    tags: ['Python', 'Django', 'Docker'],
    docPath: 'docs/truck-signs-api',
    githubLink: 'https://github.com/PariKhavari/truck_signs_api',
  },
  {
    title: 'OWASP Juice Shop',
    description: 'The OWASP Juice Shop is an intentionally vulnerable web app for security training. Selected challenges such as broken authentication, XSS and SQL injection are solved and documented, each with the vulnerability, the exploit and the fix. A first hands-on look at web security from an attacker\'s point of view.',
    image: '/img/projects/juice-shop.png',
    tags: ['Security'],
    docPath: 'docs/juice-shop',
    githubLink: 'https://github.com/PariKhavari/my-dso-blog-2/tree/main/docs/juice-shop'
  },
    {
    title: 'Conduit deployment',
    description: 'This reproducible WordPress setup runs locally or on a cloud VM with Docker Compose. WordPress on Apache and a MySQL 8.0 database run as separate services, and named volumes keep uploads and data persistent. Interesting because it was a complete CMS stack deployed on a cloud VM.', 
    image: '/img/projects/conduit_deplpy.png',
    tags: ['Docker', 'GitHub Action', 'Linux'],
    docPath: 'docs/conduit-deployment',
    githubLink: 'https://github.com/PariKhavari/conduit-container-v2',
  },
    {
    title: 'WordPress Container',
    description: 'This reproducible WordPress setup runs locally or on a cloud VM with Docker Compose. WordPress on Apache and a MySQL 8.0 database run as separate services, and named volumes keep uploads and data persistent. Interesting because it was a complete CMS stack deployed on a cloud VM.',
    image: '/img/projects/wordpress.png',
    tags: ['Docker', 'WordPress', 'MySQL'],
    docPath: 'docs/wordpress',
    githubLink: 'https://github.com/PariKhavari/Wordpress',
  },
  {
    title: 'Minecraft Server',
    description: 'A Minecraft server runs in a Docker container on a Linux VM. The world data lives in a volume, so it survives restarts and updates. Server settings, ports, start, stop and backups are documented. A fun way to practice container operations, networking and backups with a real, playable service.',
    image: '/img/projects/minecraft.png',
    tags: ['Docker', 'Linux'],
    docPath: 'docs/minecraft-server',
    githubLink: 'https://github.com/PariKhavari/minecraft-server',
  },
];

const MOBILE_VISIBLE_COUNT = 3;
const DESKTOP_VISIBLE_COUNT = 5;

export default function Projects(): ReactNode {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showAll, setShowAll] = useState<boolean>(false);
  const activeProject = projects[activeIndex];
  const mobileProjects = showAll ? projects : projects.slice(0, MOBILE_VISIBLE_COUNT);
  const desktopProjects = showAll ? projects : projects.slice(0, DESKTOP_VISIBLE_COUNT);

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>My project highlights</h2>

       {/* Desktop: Liste links, aktive Karte rechts */}
      <div className={styles.desktopLayout}>
        <div>
          <ol className={styles.projectList}>
            {desktopProjects.map((project, index) => (
              <li key={project.title} className={index === activeIndex ? styles.activeItem : styles.listItem}>
                <button
                  type="button"
                  className={styles.projectButton}
                  aria-pressed={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                >
                  {project.title}
                </button>
              </li>
            ))}
          </ol>
          {projects.length > DESKTOP_VISIBLE_COUNT && (
            <button type="button" className={styles.seeMoreLink} onClick={() => setShowAll(!showAll)}>
              ↳ {showAll ? 'see fewer projects' : 'see more projects'}
            </button>
          )}
        </div>
        {activeProject && <ProjectCard {...activeProject} variant="desktop" />}
      </div>

        {/* Mobile: Karten untereinander */}
        <div className={styles.mobileLayout}>
          {mobileProjects.map((project, index) => (
            <ProjectCard key={project.title} {...project} variant="mobile" indexNumber={index + 1} />
          ))}
          {projects.length > MOBILE_VISIBLE_COUNT && (
            <button
              type="button"
              className={styles.seeMore}
              aria-expanded={showAll}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show fewer projects' : 'Show all projects'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
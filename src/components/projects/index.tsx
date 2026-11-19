import { useState, type ReactNode } from 'react';
import ProjectCard, { type Project } from './project-card';
import styles from './projects.module.css';

const projects: Project[] = [
  {
    title: 'Baby Tools World',
    description: 'Extended an existing Django shop with product tags, admin management and a filtered product view.',
    image: '/img/projects/baby-tools.png',
    tags: ['Python', 'Django'],
    docPath: 'docs/baby-tools-world',
    githubLink: 'https://github.com/PariKhavari/baby-tools-world',
  },
  {
    title: 'Conduit Container',
    description: 'Connected frontend, backend and PostgreSQL in containers with an Nginx API proxy and persistent volumes.',
    image: '/img/projects/conduit.png',
    tags: ['Docker', 'Django', 'Nginx'],
    docPath: 'docs/conduit-container',
    githubLink: 'https://github.com/PariKhavari/conduit-container-v2',
  },
  {
    title: 'Truck Signs API',
    description: 'Repaired a faulty container setup: Dockerfile, Compose, migrations and Gunicorn startup.',
    image: '/img/projects/truck-signs.png',
    tags: ['Python', 'Django', 'Docker'],
    docPath: 'docs/truck-signs-api',
    githubLink: 'https://github.com/PariKhavari/truck_signs_api',
  },
  {
    title: 'OWASP Juice Shop',
    description: 'Documented selected security challenges such as broken authentication and XSS.',
    image: '/img/projects/juice-shop.png',
    tags: ['Security'],
    docPath: 'docs/juice-shop',
  },
    {
    title: 'Conduit deployment',
    description: 'Automated CI/CD deployment of the Conduit full-stack application to a remote VM using GitHub Actions.',
    image: '/img/projects/conduit_deplpy.png',
    tags: ['Dcker', 'GitHub Action', 'Linux'],
    docPath: 'docs/conduit-deployment',
    githubLink: 'https://github.com/PariKhavari/conduit-container-v2',
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
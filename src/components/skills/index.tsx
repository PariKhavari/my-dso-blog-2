import React, { useState, type ReactNode } from 'react';
import styles from './skills.module.css';

interface Skill {
  icon: string;
  name: string;
  info: string[];
}

const devicon = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const skills: Skill[] = [
  { icon: `${devicon}/python/python-original.svg`, name: 'Python', info: ['Backend development', 'Automation scripts', 'Used in Django projects'] },
  { icon: `${devicon}/django/django-plain.svg`, name: 'Django', info: ['ORM and admin', 'Extended an existing shop', 'Models, views, templates'] },
  { icon: `${devicon}/linux/linux-original.svg`, name: 'Linux', info: ['Servers and VMs', 'Users and permissions', 'Package and service management'] },
  { icon: `${devicon}/git/git-original.svg`, name: 'Git', info: ['Version control', 'Feature branches and PRs', 'Clean commit history'] },
  { icon: `${devicon}/docker/docker-original.svg`, name: 'Docker', info: ['Containerizing apps', 'Dockerfiles and Compose', 'Networks and volumes'] },
  { icon: `${devicon}/githubactions/githubactions-original.svg`, name: 'GitHub Actions', info: ['CI/CD pipelines', 'Build and test on push', 'Deploy to Pages and VMs'] },
  { icon: `${devicon}/nginx/nginx-original.svg`, name: 'Nginx', info: ['Static web server', 'Reverse proxy', 'Basic HTTPS setup'] },
  { icon: `${devicon}/yaml/yaml-original.svg`, name: 'YAML', info: ['Pipeline configuration', 'Docker Compose files', 'Structured setup'] },
  { icon: 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f6e1.svg', name: 'Security', info: ['Security checks in CI', 'Secrets in env variables', 'OWASP Juice Shop'] },
];

const perPage = 3;
const pageCount = Math.ceil(skills.length / perPage);

export default function Skills(): ReactNode {
  const [flipped, setFlipped] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <h2>My skills</h2>
        <div className={styles.grid}>
          {skills.map((skill, index) => (
            <button
              key={skill.name}
              type="button"
              className={`${styles.card} ${flipped === skill.name ? styles.flipped : ''} ${
                Math.floor(index / perPage) !== page ? styles.hiddenMobile : ''
              }`}
              onClick={() => setFlipped(flipped === skill.name ? null : skill.name)}
              aria-pressed={flipped === skill.name}
            >
              <span className={styles.rotator}>
                <span className={styles.front}>
                  <img src={skill.icon} alt="" className={styles.icon} loading="lazy" />
                  <span>{skill.name}</span>
                </span>
                <span className={styles.back}>
                  {skill.info.map((line) => (
                    <span key={line} className={styles.line}>• {line}</span>
                  ))}
                </span>
              </span>
            </button>
          ))}
        </div>
        <div className={styles.dots}>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.dot} ${i === page ? styles.activeDot : ''}`}
              onClick={() => setPage(i)}
              aria-label={`Show skills page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
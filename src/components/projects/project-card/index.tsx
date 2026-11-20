import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './project-card.module.css';

const devicon = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const tagIcons: Record<string, string> = {
  Python: `${devicon}/python/python-original.svg`,
  Django: `${devicon}/django/django-plain.svg`,
  Docker: `${devicon}/docker/docker-original.svg`,
  Nginx: `${devicon}/nginx/nginx-original.svg`,
  Security: 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f6e1.svg',
  Linux: `${devicon}/linux/linux-original.svg`,
  MySQL: `${devicon}/mysql/mysql-original.svg`,
  WordPress: `${devicon}/wordpress/wordpress-original.svg`,
};

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  docPath: string;
  githubLink?: string;
}

interface ProjectCardProps extends Project {
  variant: 'desktop' | 'mobile';
  indexNumber?: number;
}

export default function ProjectCard({
  title, description, image, tags, docPath, githubLink, variant, indexNumber,
}: ProjectCardProps): ReactNode {
  return (
    <article className={`${styles.card} ${styles[variant]}`}>
      <h3 className={styles.title}>
        {indexNumber ? `${indexNumber}. ` : ''}{title}
      </h3>
      <ul className={styles.tags}>
        {tags.map((tag) => (
          <li key={tag} className={styles.tag}>
              {tagIcons[tag] && <img src={tagIcons[tag]} alt="" className={styles.tagIcon} />}
              {tag}
          </li>
        ))}
      </ul>
      <p className={styles.description}>{description}</p>
      <img src={useBaseUrl(image)} alt={title} className={styles.image} loading="lazy" />
      <div className={styles.actions}>
        <Link to={`/${docPath}`} className={styles.primary}>Documentation</Link>
        {githubLink && (
          <a href={githubLink} target="_blank" rel="noopener noreferrer" className={styles.secondary}>
            GitHub
          </a>
        )}
      </div>
    </article>
  );
}
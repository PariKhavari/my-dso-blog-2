import React, { type ReactNode } from 'react';
import styles from './skills.module.css';

interface Skill {
  icon: string;
  name: string;
}

const skills: Skill[] = [
  { icon: '🐍', name: 'Python' },
  { icon: '🌿', name: 'Django' },
  { icon: '🐧', name: 'Linux' },
  { icon: '🔀', name: 'Git' },
  { icon: '🐳', name: 'Docker' },
  { icon: '🔁', name: 'GitHub Actions' },
  { icon: '🌐', name: 'Nginx' },
  { icon: '📄', name: 'YAML' },
  { icon: '🔒', name: 'Security' },
];

export default function Skills(): ReactNode {
  return (
    <section id="skills" className={styles.skills}>
      <h2 className={styles.title}>My skills</h2>
      <div className={styles.grid}>
        {skills.map((skill) => (
          <div key={skill.name} className={styles.card}>
            <span className={styles.icon}>{skill.icon}</span>
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
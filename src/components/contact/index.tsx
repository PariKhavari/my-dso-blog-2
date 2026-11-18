import React, { type ReactNode } from 'react';
import styles from './contact.module.css';

interface ContactLink {
  icon: string;
  label: string;
  href: string;
}

const points: string[] = [
  'I welcome conversations about DevSecOps, CI/CD pipelines, containerization and automation.',
  'Based in Your City. I am open to remote and hybrid teams, as well as on-site roles within a manageable commute.',
];

const links: ContactLink[] = [
  { icon: '✉', label: 'mail@pari-khavari.de', href: 'mailto:mail@pari-khavari.de' },
  { icon: 'in', label: 'LinkedIn profile', href: 'https://www.linkedin.com/in/pari-khavari-523341207/' },
  { icon: 'GH', label: 'GitHub profile', href: 'https://github.com/PariKhavari'},
];

export default function Contact(): ReactNode {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.left}>
        <h2 className={styles.title}>Contact me</h2>
        <p className={styles.question}>Which challenges could I help your team solve?</p>
        <ul className={styles.list}>
          {points.map((p) => <li key={p}>{p}</li>)}
        </ul>
        <p>
          Send me a brief description of the role or your project. I would be happy to discuss
          where my experience fits and where I can develop further.
        </p>
      </div>
      <div className={styles.right}>
        <p className={styles.subtitle}>A role, a project or an initial conversation?</p>
        {links.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
            <span className={styles.icon}>{l.icon}</span>
            {l.label}
          </a>
        ))}
      </div>
    </section>
  );
}
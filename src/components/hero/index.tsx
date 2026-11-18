import React, { type ReactNode } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './hero.module.css';

export default function Hero(): ReactNode {
  return (
    <section id="about" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.text}>
          <p className={styles.greeting}>Hello, I am</p>
          <h1 className={styles.name}>Pari Khavari</h1>
          <p className={styles.role}> Web Development | DevSecOps Engineer &amp; Automation</p>
          <p className={styles.highlight}>Qualified IT Specialist · Specialized in DevSecOps and backend development</p>
          <p>As a qualified IT specialist, I focused on backend development and expanded
              my skills through intensive DevSecOps training.</p>
          <p>I build backend applications, containerize them with Docker and deploy them
            via automated CI/CD pipelines. I am also interested in AI and AI agents and
               want to develop further in this field.</p>
          <div className={styles.buttons}>
            <a href="#projects" className={styles.primary}>Explore my projects</a>
            <a href="#contact" className={styles.secondary}>Contact me</a>
          </div>
        </div>
        <div className={styles.card}>
          <p className={styles.tagline}><span>Bringing experience.</span><br />Learning something new.</p>
          <a href="#contact" className={styles.badge}>
            <strong>Open to new opportunities</strong>
            <span>Creating solutions together ↗</span>
          </a>
          <img src={useBaseUrl('/img/profile.jpg')} alt="Profile" className={styles.photo} />
        </div>
      </div>
    </section>
  );
}
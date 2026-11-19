import React, { type ReactNode } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './hero.module.css';

export default function Hero(): ReactNode {
  return (
    <section id="about" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.text}>
          <p className={styles.greeting}>Hey there 👋 I am</p>
          <h1 className={styles.name}>Pari Khavari</h1>
          <p className={styles.role}>DevSecOps Engineer</p>
          <p>
            As a qualified IT specialist, I focused on backend development and expanded my skills through intensive DevSecOps training.
            I build backend applications, containerize them with Docker and deploy them via automated CI/CD pipelines. I am also interested in AI and AI agents and want to develop further in this field.
          </p>
          <a href="#contact" className={styles.button}>Contact me</a>
        </div>
        <img src={useBaseUrl('/img/profile.jpg')} alt="Profile" className={styles.photo} />
      </div>
    </section>
  );
}
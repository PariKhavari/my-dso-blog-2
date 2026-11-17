import React, { type ReactNode } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './hero.module.css';

export default function Hero(): ReactNode {
  return (
    <section id="about" className={styles.hero}>
      <div className={styles.text}>
        <p className={styles.greeting}>Hey there 👋 I am</p>
        <h1 className={styles.name}>Your Name</h1>
        <p className={styles.role}>DevSecOps Engineer</p>
        <p>Short text about you: background, focus and what you are working on.</p>
        <a href="#contact" className={styles.button}>Contact me</a>
      </div>
      <img src={useBaseUrl('/img/profile.jpg')} alt="Profile" className={styles.photo} />
    </section>
  );
}
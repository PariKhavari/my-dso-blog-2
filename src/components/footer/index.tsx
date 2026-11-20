import React, { type ReactNode } from 'react';
import styles from './footer.module.css';

export default function Footer(): ReactNode {
  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <button className={styles.topButton} onClick={scrollToTop} aria-label="Scroll to top">
         <svg width="12" height="32" viewBox="0 0 12 32" fill="none" aria-hidden="true">
            <path d="M6 31V2M1 7l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <p className={styles.text}>© 2026 Pari Khavari</p>
      <p className={styles.text}>Legal notice</p>
    </footer>
  );
}
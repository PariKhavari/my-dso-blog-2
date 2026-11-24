import React, { useEffect, useState, type ReactNode } from 'react';
import styles from './header.module.css';

const items = [
  { label: 'About me', href: '#about' },
  { label: 'My skills', href: '#skills' },
  { label: 'My projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Header(): ReactNode {
  const [open, setOpen] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);

  useEffect(() => {
    let lastY = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      setHidden(y > lastY && y > 80);
      lastY = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${hidden && !open ? styles.hidden : ''}`}>
      <button
        className={styles.burger}
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? '✕' : '☰'}
      </button>
      <nav className={`${styles.nav} ${open ? styles.open : ''}`}>
        {items.map((item) => (
          <a key={item.href} href={item.href} className={styles.link} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
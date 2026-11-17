import React, { useState, type ReactNode } from 'react';
import styles from './header.module.css';

const items = [
  { label: 'About me', href: '#about' },
  { label: 'My skills', href: '#skills' },
  { label: 'My projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Header(): ReactNode {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <header className={styles.header}>
      <button
        className={styles.burger}
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        ☰
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
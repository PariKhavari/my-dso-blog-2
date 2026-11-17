import React, { useState, type ReactNode } from 'react';
import styles from './header.module.css';

export interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  items: NavItem[];
}

export default function Header({ items }: HeaderProps): ReactNode {
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
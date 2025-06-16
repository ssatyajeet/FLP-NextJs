'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './Navigation.module.css';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={30}
            priority
          />
          
          <nav className={styles.nav}>
            <Link
              href="/server"
              className={`${styles.link} ${pathname === '/server' ? styles.activeLink : ''}`}
            >
              Server-side
            </Link>
            <Link
              href="/client"
              className={`${styles.link} ${pathname === '/client' ? styles.activeLink : ''}`}
            >
              Client-side
            </Link>
            <Link
              href="/users"
              className={`${styles.link} ${pathname === '/users' ? styles.activeLink : ''}`}
            >
              Users
            </Link>
          </nav>

          <h1 className={styles.title}>Latest Posts</h1>
        </div>
      </div>
    </header>
  );
} 
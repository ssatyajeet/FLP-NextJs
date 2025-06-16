import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import styles from './page.module.css';

// This page will be statically generated at build time
export const dynamic = 'force-static';

export default function Home() {
  return (
    <>
      <Navigation />
      <div className={styles.container}>
        <main className={styles.main}>
          {/* Hero Section */}
          <div className={styles.hero}>
            <h1 className={styles.title}>
              Next.js Data Fetching Demo
            </h1>
            <p className={styles.subtitle}>
              Explore different data fetching strategies in Next.js 13+ with Server Components, 
              Client Components, and API Routes.
            </p>
          </div>

          {/* Feature Cards */}
          <div className={styles.grid}>
            {/* Server Component Card */}
            <Link href="/server" className={styles.card}>
              <h2 className={styles.cardTitle}>
                Server Component
                <span className={styles.arrow}>-&gt;</span>
              </h2>
              <p className={styles.cardText}>
                Server-side rendering with automatic caching and revalidation.
              </p>
            </Link>

            {/* Client Component Card */}
            <Link href="/client" className={styles.card}>
              <h2 className={styles.cardTitle}>
                Client Component
                <span className={styles.arrow}>-&gt;</span>
              </h2>
              <p className={styles.cardText}>
                Client-side data fetching with SWR for real-time updates.
              </p>
            </Link>

            {/* Users API Card */}
            <Link href="/users" className={styles.card}>
              <h2 className={styles.cardTitle}>
                Users API
                <span className={styles.arrow}>-&gt;</span>
              </h2>
              <p className={styles.cardText}>
                API Routes with external data integration and SWR.
              </p>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import styles from './page.module.css';
import { Post, User } from '@/types/blog';

// This enables dynamic rendering for this route
export const dynamic = 'force-dynamic';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = await getPost(params.id);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.body.slice(0, 160),
  };
}

// Fetch post data
async function getPost(id: string): Promise<Post | null> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

// Fetch user data
async function getUser(userId: number): Promise<User | null> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  
  if (!post) {
    notFound();
  }

  const user = await getUser(post.userId);

  return (
    <>
      <Navigation />
      <div className={styles.container}>
        <main className={styles.main}>
          <Link href="/server" className={styles.backLink}>
            <span className={styles.arrow}>&larr;</span> Back to Posts
          </Link>
          
          <article className={styles.article}>
            <header className={styles.header}>
              <h1 className={styles.title}>{post.title}</h1>
              <div className={styles.meta}>
                <div className={styles.author}>
                  <span>Written by</span>
                  <strong>{user?.name || 'Unknown Author'}</strong>
                </div>
                {user && (
                  <div className={styles.author}>
                    <span>Contact:</span>
                    <strong>{user.email}</strong>
                  </div>
                )}
              </div>
            </header>

            <div className={styles.content}>
              {post.body.split('\n').map((paragraph, index) => (
                <p key={index} style={{ marginBottom: '1rem' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </main>
      </div>
    </>
  );
} 
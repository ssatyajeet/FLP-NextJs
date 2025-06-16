'use server';  // This explicitly marks the entire file as server-side code

import Link from 'next/link';
import { Post } from '@/types/blog';

async function getPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: {
      revalidate: 60 // Revalidate every 60 seconds
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

export default async function Posts() {
  // This will run on the server
  const posts: Post[] = await getPosts();

  return (
    <div className="bg-white dark:bg-black">
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid gap-4">
          {posts.map((post) => (
            <Link 
              key={post.id}
              href={`/blog/${post.id}`}
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
              <article>
                <h2 className="mb-3 text-2xl font-semibold text-black dark:text-white">
                  {post.title}{' '}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p className="text-sm opacity-50 text-black dark:text-white line-clamp-2">
                  {post.body}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
} 
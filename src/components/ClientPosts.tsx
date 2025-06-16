'use client';

import useSWR from 'swr';
import { useState, useEffect } from 'react';

// Define the Post type for better type safety
type Post = {
  id: number;
  title: string;
  body: string;
};

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

export default function ClientPosts() {
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  
  // Using SWR hook for data fetching
  const { data: posts, error, isLoading, isValidating, mutate } = useSWR<Post[]>(
    'https://jsonplaceholder.typicode.com/posts',
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 30000,
      dedupingInterval: 5000,
      onSuccess: () => setLastUpdate(new Date())
    }
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-black min-h-[calc(100vh-73px)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 dark:border-neutral-700 border-t-black dark:border-t-white"></div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Fetching posts...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white dark:bg-black min-h-[calc(100vh-73px)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 dark:text-red-400 mb-2">Error: {error.message}</p>
          <button 
            onClick={() => mutate()} // Use mutate to retry
            className="text-sm text-black dark:text-white underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!posts) {
    return (
      <div className="bg-white dark:bg-black min-h-[calc(100vh-73px)] flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-black">
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {lastUpdate.toLocaleTimeString()}
            {isValidating && ' (Refreshing...)'}
          </div>
          <button
            onClick={() => mutate()}
            className="px-4 py-2 text-sm bg-black text-white dark:bg-white dark:text-black rounded-md hover:opacity-80 transition-opacity"
          >
            Refresh Data
          </button>
        </div>
        <div className="grid gap-4">
          {posts.map((post) => (
            <article 
              key={post.id}
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
              <h2 className="mb-3 text-2xl font-semibold text-black dark:text-white">
                {post.title}{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className="text-sm opacity-50 text-black dark:text-white">
                {post.body}
              </p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
} 
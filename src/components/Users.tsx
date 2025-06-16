'use client';

import useSWR from 'swr';
import { useState } from 'react';

// Define the User type
type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
};

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

export default function Users() {
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  
  const { data: users, error, isLoading, isValidating, mutate } = useSWR<User[]>(
    '/api/users',
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 30000,
      dedupingInterval: 5000,
      onSuccess: () => setLastUpdate(new Date())
    }
  );

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-black min-h-[calc(100vh-73px)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 dark:border-neutral-700 border-t-black dark:border-t-white"></div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Fetching users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-black min-h-[calc(100vh-73px)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 dark:text-red-400 mb-2">Error: {error.message}</p>
          <button 
            onClick={() => mutate()}
            className="text-sm text-black dark:text-white underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!users) {
    return (
      <div className="bg-white dark:bg-black min-h-[calc(100vh-73px)] flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No users found.</p>
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
          {users.map((user) => (
            <article 
              key={user.id}
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
              <h2 className="mb-3 text-2xl font-semibold text-black dark:text-white">
                {user.name}{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <div className="space-y-1 text-sm opacity-80 text-black dark:text-white">
                <p>📧 {user.email}</p>
                <p>📱 {user.phone}</p>
                <p>🌐 {user.website}</p>
                <p>🏢 {user.company.name}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
} 
'use client';

import Link from 'next/link';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-bold">Something went wrong</h1>
      <p className="text-lg">An unexpected error occurred. Please try again.</p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="rounded-md bg-foreground px-6 py-3 font-medium text-background transition-opacity hover:opacity-80"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="rounded-md border border-foreground px-6 py-3 font-medium transition-opacity hover:opacity-80"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}

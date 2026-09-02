import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="text-lg">Sorry, we could not find the page you were looking for.</p>
      <Link
        href="/"
        className="rounded-md bg-foreground px-6 py-3 font-medium text-background transition-opacity hover:opacity-80"
      >
        Go Home
      </Link>
    </main>
  );
}

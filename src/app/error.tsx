'use client';

import Link from 'next/link';

const TITLE_ID = 'error-title';

/*
  Route error boundary.

  `retry` rather than `reset`: as of Next 16.3 it is the stable, recommended
  prop, and it re-fetches the segment before re-rendering, so a failure in
  server data (a database hiccup on /admin) can actually recover. `reset` only
  re-renders what already failed.

  Nothing from `error` is shown. In production Next replaces a server error's
  message with a digest before it reaches the browser, and the full error is
  logged on the server where it happened.

  A section, not <main>: the root layout already wraps this in the page's one
  <main> landmark. Typography and buttons follow PageHero and CtaBand.
*/
export default function ErrorPage({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <section
      data-bg="light"
      aria-labelledby={TITLE_ID}
      className="py-20 text-foreground md:py-28"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h1 id={TITLE_ID} className="text-4xl font-semibold tracking-tight md:text-5xl">
          Something went wrong
        </h1>
        <p className="mt-5 text-lg leading-8 text-foreground/85">
          An unexpected error occurred. Please try again.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => retry()}
            className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-secondary-accent"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-full border border-foreground/20 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-ladybug/50"
          >
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}

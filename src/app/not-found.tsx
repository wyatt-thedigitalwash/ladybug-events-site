import type { Metadata } from 'next';
import Link from 'next/link';

// Without its own title a 404 inherits the home page's. The root layout's
// template turns this into "Page Not Found | The Ladybug Venue, Plant City, FL".
// Next already adds noindex for a 404 status; saying so here replaces the
// layout's "index, follow" so the page does not carry two contradicting robots
// tags.
export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

const TITLE_ID = 'not-found-title';

// A section, not <main>: the root layout already wraps this in the page's one
// <main> landmark, and a second one nested inside it is invalid. Typography
// and button follow PageHero and CtaBand so the page reads as part of the site.
export default function NotFound() {
  return (
    <section
      data-bg="light"
      aria-labelledby={TITLE_ID}
      className="py-20 text-foreground md:py-28"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h1 id={TITLE_ID} className="text-4xl font-semibold tracking-tight md:text-5xl">
          Page not found
        </h1>
        <p className="mt-5 text-lg leading-8 text-foreground/85">
          Sorry, we could not find the page you were looking for.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-secondary-accent"
        >
          Go Home
        </Link>
      </div>
    </section>
  );
}

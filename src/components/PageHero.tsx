import HiddenLadybug, { type BugSpot } from "./motifs/HiddenLadybug";

// One hero per page, so a fixed id is unique.
const TITLE_ID = "page-title";

export default function PageHero({
  title,
  description,
  bug = "bottom-right",
}: {
  title: string;
  description?: string;
  bug?: BugSpot;
}) {
  return (
    <section
      data-bg="light"
      aria-labelledby={TITLE_ID}
      className="relative py-20 text-foreground md:py-28"
    >
      <HiddenLadybug at={bug} />
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h1 id={TITLE_ID} className="text-4xl font-semibold tracking-tight md:text-5xl">
          {title}
        </h1>
        {description && (
          // 18px is not large text under WCAG (that starts at 24px), so this
          // needs 4.5:1. 70% measured 3.5; 85% is 5.0.
          <p className="mt-5 text-lg leading-8 text-foreground/85">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

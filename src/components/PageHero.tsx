import HiddenLadybug, { type BugSpot } from "./motifs/HiddenLadybug";

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
      className="relative py-20 text-foreground md:py-28"
    >
      <HiddenLadybug at={bug} />
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-lg leading-8 text-foreground/70">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

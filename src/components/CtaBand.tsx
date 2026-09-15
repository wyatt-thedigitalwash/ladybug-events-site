import Link from "next/link";
import type { ReactNode } from "react";
import Ladybug from "./motifs/Ladybug";

// One band per page, so a fixed id is unique.
const TITLE_ID = "cta-title";

/*
  Soft tinted call-to-action band with a large ladybug watermark cropped into
  the bottom-right corner.
*/
export default function CtaBand({
  title,
  children,
  href,
  cta,
}: {
  title?: string;
  children: ReactNode;
  href: string;
  cta: string;
}) {
  return (
    <section
      data-bg="tint"
      // Named by its heading, or by the action when it has none.
      aria-labelledby={title ? TITLE_ID : undefined}
      aria-label={title ? undefined : cta}
      className="relative overflow-hidden bg-tint py-20 text-center md:py-24"
    >
      <Ladybug
        className="pointer-events-none absolute -right-16 -bottom-20 h-72 w-72 -rotate-[20deg] text-foreground opacity-[0.08] md:-right-10 md:-bottom-24 md:h-96 md:w-96"
      />
      <div className="relative mx-auto max-w-2xl px-6">
        {title && (
          <h2 id={TITLE_ID} className="text-3xl font-semibold tracking-tight text-foreground">
            {title}
          </h2>
        )}
        {/* 85% is the lowest step that clears 4.5:1 on the tint (75% was 3.6). */}
        <p className={`${title ? "mt-4" : ""} text-foreground/85`}>{children}</p>
        <Link
          href={href}
          className="mt-8 inline-block rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-secondary-accent"
        >
          {cta}
        </Link>
      </div>
    </section>
  );
}

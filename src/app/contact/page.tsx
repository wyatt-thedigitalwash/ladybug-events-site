import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Ladybug from "@/components/motifs/Ladybug";
import { EventsIcon, WeddingIcon } from "@/components/OfferingIcons";
import { business } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out to The Ladybug Venue in Plant City, FL about a wedding or private event.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        bug="right"
        title="Let's Talk About Your Event"
        description="Choose the inquiry that fits best and we'll follow up with availability and next steps."
      />

      <section
        data-bg="light"
        className="relative overflow-hidden py-20 md:py-24"
      >
        <Ladybug className="pointer-events-none absolute -right-16 -bottom-20 h-72 w-72 -rotate-[20deg] text-foreground opacity-[0.07] md:-right-10 md:-bottom-24 md:h-96 md:w-96" />
        <div className="relative mx-auto grid max-w-4xl gap-6 px-6 sm:grid-cols-2">
          <Link
            href="/contact/wedding"
            className="group rounded-2xl border border-foreground/10 bg-background p-8 transition-colors hover:border-ladybug/50"
          >
            <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-foreground/10 bg-background text-secondary-accent transition-colors group-hover:border-ladybug/50">
              <WeddingIcon className="h-8 w-8" />
            </span>
            <h2 className="text-xl font-semibold text-foreground">
              I&apos;m Planning a Wedding
            </h2>
            <p className="mt-3 text-sm text-foreground/70">
              Whole-venue or small all-inclusive packages, tours, and dates.
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-secondary-accent group-hover:text-ladybug">
              Start a Wedding Inquiry &rarr;
            </span>
          </Link>

          <Link
            href="/contact/event"
            className="group rounded-2xl border border-foreground/10 bg-background p-8 transition-colors hover:border-ladybug/50"
          >
            <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-foreground/10 bg-background text-secondary-accent transition-colors group-hover:border-ladybug/50">
              <EventsIcon className="h-8 w-8" />
            </span>
            <h2 className="text-xl font-semibold text-foreground">
              I&apos;m Planning an Event
            </h2>
            <p className="mt-3 text-sm text-foreground/70">
              Birthdays, baby showers, baptisms, and other private events.
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-secondary-accent group-hover:text-ladybug">
              Start an Event Inquiry &rarr;
            </span>
          </Link>
        </div>

        <div className="relative mx-auto mt-10 max-w-4xl px-6">
          <p className="rounded-2xl border border-dashed border-foreground/20 px-6 py-5 text-center text-sm text-foreground/85">
            Here for bingo, a workout class, or the food pantry? Those are free
            and need no inquiry.{" "}
            <Link
              href="/community"
              className="font-semibold text-secondary-accent hover:text-ladybug"
            >
              See community events &rarr;
            </Link>
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-4xl px-6 text-center text-sm text-foreground/60">
          Prefer to call?{" "}
          <a
            href={business.phoneHref}
            className="font-semibold text-secondary-accent"
          >
            {business.phone}
          </a>
        </div>
      </section>
    </>
  );
}

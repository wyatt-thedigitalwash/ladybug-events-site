import Link from "next/link";
import PageHero from "@/components/PageHero";
import Ladybug from "@/components/motifs/Ladybug";
import { EventsIcon, WeddingIcon } from "@/components/OfferingIcons";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { business, isCallBookingEnabled } from "@/lib/site";
import { pageMetadata, seoPages } from "@/lib/seo";

export const metadata = pageMetadata(seoPages.contact);

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd page={seoPages.contact} />
      <PageHero
        bug="right"
        title="Let's Talk About Your Event"
        description="Choose the inquiry that fits best and we'll follow up with availability and next steps."
      />

      <section
        data-bg="light"
        aria-label="Inquiry options"
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
            <p className="mt-3 text-sm text-foreground/85">
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
            <p className="mt-3 text-sm text-foreground/85">
              Birthdays, baby showers, baptisms, and other private events.
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-secondary-accent group-hover:text-ladybug">
              Start an Event Inquiry &rarr;
            </span>
          </Link>
        </div>

        {/*
          A call is the step after an inquiry, so it sits below the two inquiry
          cards rather than becoming a third one, and its copy says so.
          Hidden entirely until a Calendly link is configured, so the site
          never shows a "Schedule a Call" button that goes nowhere useful.
        */}
        {isCallBookingEnabled() && (
          <div className="relative mx-auto mt-10 max-w-4xl px-6">
            <div className="flex flex-col items-center gap-4 rounded-2xl bg-tint px-6 py-7 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Already sent your inquiry?
                </h2>
                <p className="mt-1 text-sm text-foreground/85">
                  Pick a time for a call and we&apos;ll talk through the details.
                </p>
              </div>
              <Link
                href="/contact/call"
                className="shrink-0 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-secondary-accent"
              >
                Schedule a Call
              </Link>
            </div>
          </div>
        )}

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

        <div className="relative mx-auto mt-16 max-w-4xl px-6 text-center text-sm text-foreground/85">
          Prefer to call?{" "}
          <a
            href={business.phoneHref}
            className="tap-target relative font-semibold text-secondary-accent"
          >
            {business.phone}
          </a>
        </div>
      </section>
    </>
  );
}

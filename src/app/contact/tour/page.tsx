import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { business, isTourBookingEnabled, tourBooking } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Tour",
  description:
    "Book a tour of The Ladybug Venue in Plant City, FL and see the hall, chapel, deck and yard for yourself.",
};

export default function TourPage() {
  const enabled = isTourBookingEnabled();

  return (
    <>
      <PageHero
        bug="right"
        title="Come See the Venue"
        description="Walk the hall, the chapel, the deck and the yard, and ask whatever you need to ask."
      />

      <section data-bg="light" className="pb-20 md:pb-24">
        <div className="mx-auto max-w-3xl px-6">
          {enabled ? (
            <CalendlyEmbed
              url={tourBooking.calendlyUrl}
              phone={business.phone}
              phoneHref={business.phoneHref}
            />
          ) : (
            /*
              Stands in until the owners have settled their standing tour hours
              and a Calendly link exists. The page is deliberately reachable
              either way, so a link to it from anywhere is never broken, but
              nothing on the site points here while this branch is showing.
            */
            <div className="rounded-3xl border border-foreground/15 bg-background p-8 text-center md:p-10">
              <h2 className="text-2xl font-semibold text-foreground">
                Tours by Appointment
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-foreground/85">
                Online booking is coming soon. In the meantime, give us a call
                and we&apos;ll find a time that works.
              </p>
              <a
                href={business.phoneHref}
                className="mt-6 inline-block rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-secondary-accent"
              >
                Call {business.phone}
              </a>
              <p className="mt-6 text-sm text-foreground/70">
                Or{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-secondary-accent hover:text-ladybug"
                >
                  send an inquiry
                </Link>{" "}
                and we&apos;ll reach out.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

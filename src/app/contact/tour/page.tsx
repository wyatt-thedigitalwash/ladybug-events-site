import Link from "next/link";
import PageHero from "@/components/PageHero";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { business, tourBooking, isTourBookingEnabled } from "@/lib/site";
import { pageMetadata, seoPages } from "@/lib/seo";

export const metadata = pageMetadata(seoPages.contactTour);

const linkClass = "font-semibold text-secondary-accent hover:text-ladybug";

export default function TourPage() {
  const enabled = isTourBookingEnabled();

  return (
    <>
      <BreadcrumbJsonLd page={seoPages.contactTour} />
      <PageHero
        bug="right"
        title="Schedule a Tour"
        description="Pick a time to come see the venue in person and walk through your date, guest count, and plans."
      />

      <section
        data-bg="light"
        aria-label="Book a tour"
        className="pb-20 md:pb-24"
      >
        <div className="mx-auto max-w-3xl px-6">
          {enabled ? (
            <>
              {/*
                Tours follow an inquiry, so the owners come to the tour already
                knowing the date and package. Placed above the calendar so it
                is read before a time is picked, not after.
              */}
              <div
                role="note"
                className="mb-8 rounded-2xl bg-tint px-6 py-5 text-center text-sm leading-6 text-foreground/85"
              >
                <p className="font-semibold text-foreground">
                  Please send an inquiry before booking your tour.
                </p>
                <p className="mt-1">
                  It gives us your details ahead of time so we can make the
                  most of your visit. Haven&apos;t sent one yet? Start a{" "}
                  <Link href="/contact/wedding" className={linkClass}>
                    wedding inquiry
                  </Link>{" "}
                  or an{" "}
                  <Link href="/contact/event" className={linkClass}>
                    event inquiry
                  </Link>
                  .
                </p>
              </div>

              <CalendlyEmbed
                url={tourBooking.calendlyUrl}
                phone={business.phone}
                phoneHref={business.phoneHref}
              />
            </>
          ) : (
            /*
              Stands in whenever the Calendly link is cleared. The page stays
              reachable either way, so a link to it from anywhere is never
              broken, but nothing on the site points here while this branch is
              showing.
            */
            <div className="rounded-3xl border border-foreground/15 bg-background p-8 text-center md:p-10">
              <h2 className="text-2xl font-semibold text-foreground">
                Tours by Appointment
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-foreground/85">
                Online scheduling is coming soon. In the meantime, give us a
                call and we&apos;ll find a time that works.
              </p>
              <a
                href={business.phoneHref}
                className="mt-6 inline-block rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-secondary-accent"
              >
                Call {business.phone}
              </a>
              <p className="mt-6 text-sm text-foreground/85">
                Or{" "}
                <Link href="/contact" className={linkClass}>
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

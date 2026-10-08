import Image from "next/image";
import Link from "next/link";
import { Check, Plus } from "lucide-react";
import PageHero from "@/components/PageHero";
import CelebrationGalleries from "@/components/CelebrationGalleries";
import CtaBand from "@/components/CtaBand";
import HiddenLadybug from "@/components/motifs/HiddenLadybug";
import ShellSpots from "@/components/motifs/ShellSpots";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import {
  eventPackages,
  ledSignRental,
  venueAddOns,
  venueAmenities,
  venuePhotos,
  workoutPhotos,
} from "@/lib/site";
import { pageMetadata, seoPages } from "@/lib/seo";

export const metadata = pageMetadata(seoPages.events);

// The workout class: the hall and deck full, so the room reads as an open
// floor. Split by orientation; 3 landscapes and 2 portraits won't balance.
const inUseWide = [workoutPhotos.deck, workoutPhotos.hall, workoutPhotos.backdrop];
const inUseTall = [workoutPhotos.group, workoutPhotos.instructor];


export default function EventsPage() {
  return (
    <>
      <ServiceJsonLd service="events" />
      <BreadcrumbJsonLd page={seoPages.events} />
      <PageHero
        bug="left"
        title="Birthdays, Baby Showers & More"
        description="A simple, affordable rental for the celebrations that matter to you and your family."
      />

      <section
        data-bg="light"
        aria-label="Rental pricing"
        className="pb-20 md:pb-24"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {eventPackages.map((pkg, i) => (
              <div
                key={pkg.name}
                className="flex flex-col overflow-hidden rounded-3xl border border-foreground/15 bg-background"
              >
                <div className="shell-band relative bg-tint px-8 pt-8 pb-12 md:px-10 md:pt-10 md:pb-14">
                  <ShellSpots variant={i} clearOfText />
                  <h2 className="relative text-2xl font-semibold text-foreground">
                    {pkg.name}
                  </h2>
                  <p className="relative mt-5 text-sm text-foreground/85">
                    Starting at
                  </p>
                  <p className="relative text-4xl font-semibold tabular-nums text-foreground">
                    ${pkg.price}
                  </p>
                </div>

                <div className="flex flex-1 flex-col p-8 pt-6 md:p-10 md:pt-7">
                  <p className="text-base leading-7 text-foreground/85">
                    {pkg.summary}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex gap-3 text-base leading-6">
                        <Check
                          aria-hidden="true"
                          className="mt-1 h-4 w-4 shrink-0 text-secondary-accent"
                        />
                        <span className="text-foreground/85">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 rounded-2xl border border-dashed border-foreground/20 px-6 py-5 text-center text-sm leading-6 text-foreground/85">
            Prices are starting points. Send us your date and guest count and
            we&apos;ll confirm availability and the full quote.
          </p>
        </div>
      </section>

      <section
        data-bg="light"
        aria-labelledby="included-title"
        className="relative pb-20 md:pb-24"
      >
        <HiddenLadybug at="top-left" />
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl bg-tint p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:items-center md:gap-12">
              <div>
                <h2
                  id="included-title"
                  className="text-2xl font-semibold tracking-tight text-foreground"
                >
                  Included &amp; Add-Ons
                </h2>
                <p className="mt-3 text-base leading-7 text-foreground/85">
                  Both rentals come with the same essentials. The price
                  difference is only how much of the property you use. Add-ons
                  are available on request.
                </p>
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Included
                  </h3>
                  <ul className="mt-3 space-y-3">
                    {venueAmenities.map((item) => (
                      <li key={item} className="flex gap-3 text-base leading-6">
                        <Check
                          aria-hidden="true"
                          className="mt-1 h-4 w-4 shrink-0 text-secondary-accent"
                        />
                        <span className="text-foreground/85">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Add-ons
                  </h3>
                  <ul className="mt-3 space-y-3">
                    {venueAddOns.map((item) => (
                      <li key={item} className="flex gap-3 text-base leading-6">
                        <Plus
                          aria-hidden="true"
                          className="mt-1 h-4 w-4 shrink-0 text-secondary-accent"
                        />
                        <span className="text-foreground/85">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        data-bg="light"
        aria-labelledby="spaces-title"
        className="pb-20 md:pb-24"
      >
        <div className="mx-auto max-w-6xl px-6">
          <h2
            id="spaces-title"
            className="text-center text-3xl font-semibold tracking-tight text-foreground"
          >
            The Spaces
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-foreground/85">
            The hall and kitchen indoors, the deck and yard out back. Both
            rentals include the indoor spaces; the larger one adds everything
            outside.
          </p>

          {/* CSS columns, so mixed portraits and landscapes keep their own
              proportions instead of cropping to a shared box. */}
          <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
            {venuePhotos.map((photo) => (
              <div
                key={photo.src}
                className="mb-6 break-inside-avoid overflow-hidden rounded-3xl"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 90vw"
                  className="h-auto w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CelebrationGalleries />

      <section
        data-bg="light"
        aria-labelledby="in-use-title"
        className="pb-20 md:pb-24"
      >
        <div className="mx-auto max-w-6xl px-6">
          <h2
            id="in-use-title"
            className="text-center text-3xl font-semibold tracking-tight text-foreground"
          >
            The Space in Use
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-foreground/85">
            The same hall and deck with a crowd in them. Nothing is bolted
            down, so the room takes whatever layout your event needs.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {inUseWide.map((photo) => (
              <div
                key={photo.src}
                className="overflow-hidden rounded-3xl"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 1200px) 368px, (min-width: 640px) 31vw, 90vw"
                  className="h-auto w-full"
                />
              </div>
            ))}
          </div>

          {/* Narrower, or each would stand taller than the row above. */}
          <div className="mx-auto mt-6 grid max-w-3xl gap-6 sm:grid-cols-2">
            {inUseTall.map((photo) => (
              <div
                key={photo.src}
                className="overflow-hidden rounded-3xl"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 768px) 372px, (min-width: 640px) 46vw, 90vw"
                  className="h-auto w-full"
                />
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm leading-6 text-foreground/85">
            These are from the free workout class, one of the programs we run
            for the neighborhood.{" "}
            <Link
              href="/community"
              className="font-semibold text-secondary-accent hover:text-ladybug"
            >
              See what else is open to everyone &rarr;
            </Link>
          </p>
        </div>
      </section>

      <section
        data-bg="light"
        aria-labelledby="led-sign-title"
        className="pb-20 md:pb-24"
      >
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid overflow-hidden rounded-3xl bg-surface-slate md:grid-cols-2 md:items-center">
            <Image
              src={ledSignRental.photo.src}
              alt={ledSignRental.photo.alt}
              width={ledSignRental.photo.width}
              height={ledSignRental.photo.height}
              sizes="(min-width: 896px) 424px, (min-width: 768px) 46vw, 90vw"
              className="h-auto w-full"
            />
            <div className="px-8 py-7 text-center md:text-left">
              <h2 id="led-sign-title" className="text-xl font-semibold text-foreground">
                Add an LED sign, ${ledSignRental.price}
              </h2>
              <p className="mt-2 text-sm leading-6 text-foreground/85">
                {ledSignRental.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Plan Your Event"
        href="/contact/event"
        cta="Inquire About Your Event"
      >
        Send us your event details and we&apos;ll confirm availability and
        answer any questions.
      </CtaBand>
    </>
  );
}

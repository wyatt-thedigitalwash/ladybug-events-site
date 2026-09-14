import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import HiddenLadybug from "@/components/motifs/HiddenLadybug";
import ShellSpots from "@/components/motifs/ShellSpots";
import {
  babyShowerPhotos,
  eventPackages,
  ledSignRental,
  venueAmenities,
  workoutPhotos,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Private event rentals at The Ladybug Venue in Plant City, FL. Indoor from $500, indoor plus outdoor from $775, for birthdays, baby showers, and family celebrations.",
};

/*
  Venue photography. Dimensions are the files' real pixel sizes, which lets
  Next reserve the right space before each one loads.
*/
const venuePhotos = [
  {
    src: "/events/LadybugEvents_Deck.JPG",
    alt: "The outdoor deck in daylight, beside the venue building and bordered by a hedge",
    width: 1440,
    height: 960,
  },
  {
    src: "/events/LadybugEvents_Kitchen.JPG",
    alt: "The venue kitchen, with white cabinets, a wall oven, a range and a refrigerator",
    width: 960,
    height: 1440,
  },
  {
    src: "/events/LadybugEvents_Yard.JPG",
    alt: "The fenced back yard, with mown grass and mature trees along the fence line",
    width: 1440,
    height: 960,
  },
  {
    src: "/events/LadybugEvents_KitchenWindow.JPG",
    alt: "A serving window between the hall and the kitchen, with a long white counter",
    width: 960,
    height: 1440,
  },
  {
    src: "/venue/Ladybug_Outdoor_Deck.jpg",
    alt: "The outdoor deck at dusk, strung with warm string lights along the hedge",
    width: 1920,
    height: 1280,
  },
  {
    src: "/events/LadybugEvents_YardMulch.JPG",
    alt: "A shaded corner of the yard with a small bistro table on red mulch",
    width: 1440,
    height: 960,
  },
];

/*
  The venue with people in it. These are from the free workout class, the only
  photos we have of the hall and deck actually full, so they carry the point
  that the room is an open floor rather than a fixed layout. Shared with the
  Community page from src/lib/site.ts, which makes the same frames the subject
  rather than the setting.

  Split by orientation rather than run through the masonry used above. Three
  landscapes and two portraits will not balance across columns at any ordering,
  and the shortfall showed as a column of empty space. Two rows of matching
  shapes fill evenly and still crop nothing.
*/
const inUseWide = [
  workoutPhotos.deck,
  workoutPhotos.hall,
  workoutPhotos.backdrop,
];

const inUseTall = [workoutPhotos.group, workoutPhotos.instructor];

// The three portraits from the baby shower; the landscape leads above them.
const babyShowerRow = [
  babyShowerPhotos.backdrop,
  babyShowerPhotos.guests,
  babyShowerPhotos.game,
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        bug="left"
        title="Birthdays, Baby Showers & More"
        description="A simple, affordable rental for the celebrations that matter to you and your family."
      />

      <section data-bg="light" className="pb-20 md:pb-24">
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

      <section data-bg="light" className="relative pb-20 md:pb-24">
        <HiddenLadybug at="top-left" />
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl bg-tint p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:items-center md:gap-12">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  Included With Every Rental
                </h2>
                <p className="mt-3 text-base leading-7 text-foreground/85">
                  Both rentals come with the same essentials. The price
                  difference is only how much of the property you use.
                </p>
              </div>
              <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
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
          </div>
        </div>
      </section>

      <section data-bg="light" className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground">
            The Spaces
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-foreground/85">
            The hall and kitchen indoors, the deck and yard out back. Both
            rentals include the indoor spaces; the larger one adds everything
            outside.
          </p>

          {/* CSS columns rather than a grid: the photos are a mix of portrait
              and landscape, and this keeps every one at its own proportions
              instead of cropping them all to a shared box. */}
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

      <section data-bg="light" className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground">
            A Baby Shower Here
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-foreground/85">
            One afternoon in the indoor hall, decorated and set for a baby
            shower. The room came with the tables, the chairs and the floor;
            everything else the family brought.
          </p>

          {/* The landscape leads, the three portraits follow as a row. Same
              rule as the other galleries: matching shapes per row fill evenly
              and crop nothing.

              Held to max-w-3xl rather than the section's full 6xl. The file is
              only 800px wide, and stretched across 1152px it was being upscaled
              and came out visibly soft. */}
          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl">
            <Image
              src={babyShowerPhotos.room.src}
              alt={babyShowerPhotos.room.alt}
              width={babyShowerPhotos.room.width}
              height={babyShowerPhotos.room.height}
              sizes="(min-width: 768px) 768px, 90vw"
              className="h-auto w-full"
            />
          </div>

          <div className="mx-auto mt-6 grid max-w-3xl gap-6 sm:grid-cols-3">
            {babyShowerRow.map((photo) => (
              <div key={photo.src} className="overflow-hidden rounded-3xl">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 768px) 240px, (min-width: 640px) 31vw, 90vw"
                  className="h-auto w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-bg="light" className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground">
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

          {/* Held to a narrower measure. At a third of the page each of these
              would stand taller than the whole row above it. */}
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

      <section data-bg="light" className="pb-20 md:pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-3xl bg-surface-slate px-8 py-7 text-center">
            <h2 className="text-xl font-semibold text-foreground">
              Add an LED sign, ${ledSignRental.price}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-foreground/85">
              {ledSignRental.description}
            </p>
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

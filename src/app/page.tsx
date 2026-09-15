import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import HiddenLadybug from "@/components/motifs/HiddenLadybug";
import EventCard from "@/components/EventCard";
import RsvpButton from "@/components/RsvpButton";
import ShellBand from "@/components/ShellBand";
import { HOME_HERO_ID } from "@/components/Navbar";
import {
  BaptismIcon,
  CommunityIcon,
  EventsIcon,
  WeddingIcon,
} from "@/components/OfferingIcons";
import {
  babyShowerPhotos,
  business,
  communityEvents,
  workoutPhotos,
} from "@/lib/site";
import { pageMetadata, seoPages } from "@/lib/seo";

// No breadcrumb here: a trail of one item says nothing.
export const metadata = pageMetadata(seoPages.home);

/*
  Each card leads with a photograph of the space that offering actually uses.
  No two are of the same room, and none repeats the chapel in the hero directly
  above them. Weddings takes the deck rather than the chapel for that reason,
  and because client policy rules out photographs of real weddings, so the
  empty space has to carry the page.
*/
const offerings = [
  {
    title: "Weddings",
    href: "/weddings",
    Icon: WeddingIcon,
    photo: {
      src: "/venue/Ladybug_Outdoor_Deck.jpg",
      alt: "The outdoor deck at dusk, strung with warm string lights along the hedge",
    },
    description:
      "Rent the whole venue, indoor and outdoor, or choose a small all-inclusive package built for a budget-friendly wedding day.",
  },
  {
    title: "Events",
    href: "/events",
    Icon: EventsIcon,
    // The only card showing a celebration rather than an empty room, now that
    // there are photos of one. An empty yard corner sold this far worse.
    photo: {
      ...babyShowerPhotos.backdrop,
      // Tall frame, and the arch and balloon garland are in its upper half.
      position: "center 30%",
    },
    description:
      "Birthdays, baby showers, and private gatherings, with simple indoor or indoor plus outdoor pricing.",
  },
  {
    title: "Baptisms",
    href: "/baptisms",
    Icon: BaptismIcon,
    photo: {
      src: "/venue/LadybugEvents_Venue_BaptismPool.JPG",
      alt: "The venue's tiled baptismal pool, set below a painted mural",
      // The basin sits in the lower half of a tall frame, so a centred crop
      // showed mostly mural. This drops the window far enough to catch the
      // steps going down into the water.
      position: "center 60%",
    },
    description:
      "A warm, flexible space for baptism celebrations of any size.",
  },
  {
    title: "Community Events",
    href: "/community",
    Icon: CommunityIcon,
    photo: workoutPhotos.hall,
    description:
      "Free bingo, workout classes, and a food pantry, open to the whole neighborhood.",
  },
];

export default function Home() {
  return (
    <>
      <section
        id={HOME_HERO_ID}
        data-bg="dark"
        aria-labelledby="home-title"
        className="relative flex min-h-svh items-center justify-center overflow-hidden text-center text-white"
      >
        <Image
          src="/venue/Ladybug_Chapel.jpg"
          alt="Inside the Ladybug Venue chapel, with wooden pews lined with white flowers leading to a cross at the front"
          fill
          // The LCP element at every viewport. `preload` replaces the
          // `priority` prop, deprecated in Next 16. Neither sets
          // fetchpriority, so it is passed explicitly.
          preload
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/60"
        />
        <div className="relative mx-auto max-w-3xl px-6 pt-20 pb-16">
          {/* The logo carries the name, so it stays inside the h1 and its alt
              text is what search engines and screen readers read as the
              heading. */}
          <h1 id="home-title">
            <Image
              src="/brand/ladybug-group-logo-light.svg"
              alt={business.name}
              width={5096}
              height={1884}
              // Above the fold, but not the LCP (the photo is). Eager without a
              // preload, so it does not compete with the photo in the head.
              loading="eager"
              className="mx-auto h-auto w-full max-w-sm md:max-w-lg"
            />
          </h1>
          {/* Full white. Sampled across six viewport sizes under the gradient,
              white at 85% fell to 3.9:1 over the brightest parts of the photo;
              full white holds 4.6. */}
          <p className="mt-6 text-lg leading-8 text-white">
            A family-run event space where we bring your events to life,
            from weddings and private celebrations to free programming for
            our community.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {/* On the gold hover the mauve text is 3.4:1, short of 4.5 for
                14px type, so the hover darkens it to the same hue at 4.5. */}
            <Link
              href="/contact"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-[#503e42]"
            >
              Start an Inquiry
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Meet the Owners
            </Link>
          </div>
        </div>
      </section>

      <section
        data-bg="light"
        aria-labelledby="what-we-host-title"
        className="relative py-20 md:py-24"
      >
        <HiddenLadybug at="top-right" />
        <div className="mx-auto w-full max-w-7xl px-6">
          <h2
            id="what-we-host-title"
            className="text-center text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            What We Host
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-foreground/85">
            Choose the option closest to what you&apos;re planning and we&apos;ll
            walk you through pricing, availability, and a tour.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:gap-8">
            {offerings.map(({ Icon, ...offering }) => (
              <Link
                key={offering.href}
                href={offering.href}
                className="group flex flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-background transition-colors hover:border-ladybug/50"
              >
                <ShellBand photo={offering.photo}>
                  <Icon className="h-10 w-10" />
                </ShellBand>
                <div className="flex flex-1 flex-col p-8 pt-14">
                  <h3 className="text-2xl font-semibold text-foreground">
                    {offering.title}
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-7 text-foreground/85">
                    {offering.description}
                  </p>
                  <span className="mt-6 text-sm font-semibold text-secondary-accent group-hover:text-ladybug">
                    Learn more &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        data-bg="light"
        aria-labelledby="community-programming-title"
        className="relative py-20 md:py-24"
      >
        <HiddenLadybug at="bottom-left" />
        <div className="relative mx-auto w-full max-w-7xl px-6">
          <h2
            id="community-programming-title"
            className="text-center text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            Free Community Programming
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-foreground/85">
            The Ladybug Venue is proud to open its doors to the neighborhood
            with regular, free community events.
          </p>
          <ul className="mt-12 grid gap-6 sm:grid-cols-3 lg:gap-8">
            {communityEvents.map((event) => (
              <li key={event.name} className="flex">
                <EventCard
                  name={event.name}
                  cadence={event.cadence}
                  time={event.time}
                  action={
                    event.rsvpRequired ? (
                      <RsvpButton
                        name={event.name}
                        cadence={event.cadence}
                        time={event.time}
                      />
                    ) : (
                      <span className="text-sm text-foreground/85">
                        Open to all, no RSVP needed
                      </span>
                    )
                  }
                />
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <Link
              href="/community"
              className="inline-block rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-secondary-accent"
            >
              See All Community Events
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to Book Your Event?"
        href="/contact"
        cta="Send an Inquiry"
      >
        Tell us a little about what you&apos;re planning and we&apos;ll follow
        up with availability and next steps.
      </CtaBand>
    </>
  );
}

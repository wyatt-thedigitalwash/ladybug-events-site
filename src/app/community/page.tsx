import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CommunityRsvp from "@/components/CommunityRsvp";

export const metadata: Metadata = {
  title: "Community Events",
  description:
    "Free bingo, workout classes, and a food pantry at The Ladybug Venue in Plant City, FL. RSVP for bingo and workout classes.",
};

export default async function CommunityPage({
  searchParams,
}: PageProps<"/community">) {
  // Home page RSVP links arrive as /community?event=Bingo so the right form
  // is already open on landing.
  const params = await searchParams;
  const requested = params.event;

  return (
    <>
      <PageHero
        bug="bottom-left"
        title="Free Events for the Neighborhood"
        description="The Ladybug Venue opens its doors to the community with regular, free programming."
      />

      <section data-bg="light" className="py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <CommunityRsvp
            initialEvent={typeof requested === "string" ? requested : undefined}
          />

          {/* The mirror of the pointer on the Contact page: someone who lands
              here looking to book rather than to attend needs a way out. */}
          <p className="mt-10 rounded-2xl border border-dashed border-foreground/20 px-6 py-5 text-center text-sm text-foreground/85">
            Looking to book the venue for your own celebration? We host{" "}
            <Link
              href="/weddings"
              className="font-semibold text-secondary-accent hover:text-ladybug"
            >
              weddings
            </Link>
            ,{" "}
            <Link
              href="/events"
              className="font-semibold text-secondary-accent hover:text-ladybug"
            >
              private events
            </Link>
            , and{" "}
            <Link
              href="/baptisms"
              className="font-semibold text-secondary-accent hover:text-ladybug"
            >
              baptisms
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}

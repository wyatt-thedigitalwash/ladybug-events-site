import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CommunityRsvp from "@/components/CommunityRsvp";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { workoutPhotos } from "@/lib/site";
import { pageMetadata, seoPages } from "@/lib/seo";

// The canonical drops ?event=, which only opens an RSVP dialog.
export const metadata = pageMetadata(seoPages.community);

/*
  The three landscape frames, run as a row under the lead. Laid out by
  orientation rather than through a masonry, the same reason the Events gallery
  splits: matching shapes fill a row evenly and crop nothing, which matters
  when the subjects are people.
*/
const classRow = [
  workoutPhotos.hall,
  workoutPhotos.deck,
  workoutPhotos.backdrop,
];

export default async function CommunityPage({
  searchParams,
}: PageProps<"/community">) {
  // Home page RSVP links arrive as /community?event=Bingo so the right form
  // is already open on landing.
  const params = await searchParams;
  const requested = params.event;

  return (
    <>
      <ServiceJsonLd service="community" />
      <BreadcrumbJsonLd page={seoPages.community} />
      <PageHero
        bug="bottom-left"
        title="Free Events for the Neighborhood"
        description="The Ladybug Venue opens its doors to the community with regular, free programming."
      />

      <section
        data-bg="light"
        aria-label="Community events"
        className="py-20 md:py-24"
      >
        <div className="mx-auto max-w-5xl px-6">
          <CommunityRsvp
            initialEvent={typeof requested === "string" ? requested : undefined}
          />
        </div>
      </section>

      <section
        data-bg="light"
        aria-labelledby="workout-title"
        className="pb-20 md:pb-24"
      >
        <div className="mx-auto max-w-5xl px-6">
          {/*
            Copy beside the one portrait, then the landscapes as a row. The two
            portraits shown together ran to nearly 900px of column and pushed
            the heading off the top of the screen before the first landscape
            arrived; the second portrait lives on the Events page instead.
          */}
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:items-center md:gap-12">
            <div>
              <h2
                id="workout-title"
                className="text-3xl font-semibold tracking-tight text-foreground"
              >
                Saturdays at the Workout Class
              </h2>
              <p className="mt-4 text-base leading-7 text-foreground/85">
                Twice a month the hall and the deck fill up for a free class
                that is open to anyone who shows up. No membership, no fee, and
                no experience needed. Bring water and whoever you want to bring
                with you.
              </p>
              <p className="mt-4 text-base leading-7 text-foreground/85">
                RSVP above so we know how much room to set out.
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl">
              <Image
                src={workoutPhotos.group.src}
                alt={workoutPhotos.group.alt}
                width={workoutPhotos.group.width}
                height={workoutPhotos.group.height}
                sizes="(min-width: 1024px) 420px, (min-width: 768px) 42vw, 90vw"
                className="h-auto w-full"
              />
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {classRow.map((photo) => (
              <div key={photo.src} className="overflow-hidden rounded-3xl">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 31vw, 90vw"
                  className="h-auto w-full"
                />
              </div>
            ))}
          </div>

          {/* The mirror of the pointer on the Contact page: someone who lands
              here looking to book rather than to attend needs a way out. */}
          <p className="mt-12 rounded-2xl border border-dashed border-foreground/20 px-6 py-5 text-center text-sm text-foreground/85">
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

import Image from "next/image";
import {
  babyShowerPhotos,
  eightiethPhotos,
  seventiethPhotos,
} from "@/lib/site";

type Photo = { src: string; alt: string; width: number; height: number };

/*
  Private events actually happening in the hall, one block per party. These
  outrank the workout class on the Events page: a birthday or a shower is the
  celebration a visitor is picturing.

  Each block is laid out by orientation, the rule every gallery on the site
  follows: matching shapes per row fill evenly and crop nothing.
*/
function PhotoRow({
  photos,
  columns,
  sizes,
  narrow = false,
}: {
  photos: readonly Photo[];
  columns: "sm:grid-cols-2" | "sm:grid-cols-3";
  sizes: string;
  // Held to max-w-3xl, for portraits that would otherwise stand taller than
  // the row above them, or small files that would be upscaled and soft.
  narrow?: boolean;
}) {
  return (
    <div
      className={`mx-auto mt-6 grid gap-6 ${columns} ${narrow ? "max-w-3xl" : ""}`}
    >
      {photos.map((photo) => (
        <div key={photo.src} className="overflow-hidden rounded-3xl">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes={sizes}
            className="h-auto w-full"
          />
        </div>
      ))}
    </div>
  );
}

function Celebration({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-16 first:mt-12">
      <h3 className="text-center text-2xl font-semibold text-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
}

// Fixed-width containers past their breakpoint, so `sizes` names the pixel
// width rather than a vw fraction, which understated the box and shipped soft
// images elsewhere on this page.
const THIRD_WIDE = "(min-width: 1200px) 368px, (min-width: 640px) 31vw, 90vw";
const THIRD_NARROW = "(min-width: 768px) 240px, (min-width: 640px) 31vw, 90vw";
const HALF_NARROW = "(min-width: 768px) 372px, (min-width: 640px) 46vw, 90vw";

export default function CelebrationGalleries() {
  return (
    <section
      data-bg="light"
      aria-labelledby="celebrations-title"
      className="pb-20 md:pb-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2
          id="celebrations-title"
          className="text-center text-3xl font-semibold tracking-tight text-foreground"
        >
          Celebrations Here
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-foreground/85">
          A few of the parties families have thrown in the hall. The room
          comes with the tables, the chairs and the floor; the theme is all
          yours.
        </p>

        <div>
          <Celebration title="A '70s-Themed 70th Birthday">
            <PhotoRow
              photos={seventiethPhotos.wide}
              columns="sm:grid-cols-3"
              sizes={THIRD_WIDE}
            />
            <PhotoRow
              photos={seventiethPhotos.tall}
              columns="sm:grid-cols-3"
              sizes={THIRD_NARROW}
              narrow
            />
          </Celebration>

          <Celebration title="An 80th Birthday With Elvis">
            <PhotoRow
              photos={eightiethPhotos}
              columns="sm:grid-cols-2"
              sizes={HALF_NARROW}
              narrow
            />
          </Celebration>

          <Celebration title="A Baby Shower">
            {/* The files are 600 to 720px wide, so the row stays narrow. */}
            <PhotoRow
              photos={[
                babyShowerPhotos.backdrop,
                babyShowerPhotos.guests,
                babyShowerPhotos.game,
              ]}
              columns="sm:grid-cols-3"
              sizes={THIRD_NARROW}
              narrow
            />
          </Celebration>
        </div>
      </div>
    </section>
  );
}

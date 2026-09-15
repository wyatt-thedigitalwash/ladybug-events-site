import Image from "next/image";
import type { ReactNode } from "react";

/*
  Photo band for a home offering card: a photograph of the space whose
  underside curves like a ladybug's back, with the card's icon set in a
  medallion straddling the curve.

  This replaced a tinted panel marked with ladybug spots. The spots stay on the
  pricing card headers, where there is no photograph to show; here a picture of
  the room answers "what does this look like" far better than a decorative
  pattern did.

  The card must be `overflow-hidden` so the band clips to its top corners, and
  the content below needs `pt-14` to clear the medallion.
*/

export type BandPhoto = {
  src: string;
  alt: string;
  /*
    `object-position` for the crop, defaulting to the centre of the frame. A
    tall photo loses most of its height to this short band, so the one that
    matters is not always the middle: raising the percentage slides the window
    down the source, which moves the visible content up.
  */
  position?: string;
};

export default function ShellBand({
  photo,
  children,
}: {
  photo: BandPhoto;
  children: ReactNode;
}) {
  return (
    <div className="relative h-[200px] lg:h-[236px]">
      {/*
        The clip lives on this inner element, not the wrapper: the medallion
        below hangs past the curve on purpose, and an `overflow-hidden` parent
        would cut it in half.
      */}
      <div className="shell-band absolute inset-0 overflow-hidden bg-tint">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          // Lazy by default: these cards sit below the full-height home hero.
          sizes="(min-width: 1280px) 600px, (min-width: 640px) 46vw, 90vw"
          // Set here rather than as a utility class: the value varies per
          // photo, and Tailwind cannot see a class name built at runtime.
          style={photo.position ? { objectPosition: photo.position } : undefined}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {/*
          A wash along the bottom edge. The curve is the shape that makes this a
          ladybug's back rather than a rectangle, and against a bright sky or a
          white wall it disappeared into the card.
        */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-foreground/35 to-transparent"
        />
      </div>

      <span className="absolute bottom-0 left-8 flex h-[72px] w-[72px] translate-y-1/2 items-center justify-center rounded-full border border-foreground/10 bg-background text-secondary-accent transition-colors group-hover:border-ladybug/50">
        {children}
      </span>
    </div>
  );
}

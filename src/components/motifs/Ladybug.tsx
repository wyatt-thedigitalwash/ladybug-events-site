import type { SVGProps } from "react";

/*
  Line-art ladybug seen from above. Decorative only; always aria-hidden.

  The head arc and the body arc terminate on their exact intersection points
  (22.1, 24.6) and (41.9, 24.6), so the two outlines meet instead of crossing.
  Legs start on the body edge and travel outward. Nothing is drawn on top of
  anything else.

  Set transparency with an `opacity` class on the element, never with an alpha
  color such as `text-foreground/10`. Per-stroke alpha compounds wherever two
  strokes touch and prints those joints darker than the rest of the drawing.
*/
export default function Ladybug(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* Body: the long way around the ellipse, stopping where the head meets it. */}
      <path d="M22.1 24.6A19 18 0 1 0 41.9 24.6" />
      {/* Head: the dome between those same two points. */}
      <path d="M22.1 24.6A10 10 0 0 1 41.9 24.6" />
      {/* Wing split. */}
      <path d="M32 24.6V58" />
      {/* Antennae. */}
      <path d="M23.3 21 17.3 17.5M40.7 21 46.7 17.5" />
      {/* Legs, three per side, starting on the body edge. */}
      <path d="M14.8 32.4 6.5 28.5M13 40 3.5 40M14.8 47.6 6.5 51.5" />
      <path d="M49.2 32.4 57.5 28.5M51 40 60.5 40M49.2 47.6 57.5 51.5" />
      <g fill="currentColor" stroke="none">
        <circle cx="17.3" cy="17.5" r="1.6" />
        <circle cx="46.7" cy="17.5" r="1.6" />
        <circle cx="24" cy="34" r="2.6" />
        <circle cx="40" cy="34" r="2.6" />
        <circle cx="20" cy="45" r="2.6" />
        <circle cx="44" cy="45" r="2.6" />
        <circle cx="27" cy="52" r="2.2" />
        <circle cx="37" cy="52" r="2.2" />
      </g>
    </svg>
  );
}

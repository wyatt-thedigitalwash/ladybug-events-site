import type { SVGProps } from "react";

/*
  A second ladybug, wings open in flight, drawn as filled shapes rather than
  the outline used on the CTA bands. Two reasons for the difference: a solid
  silhouette holds together better at watermark opacity than hairlines do, and
  the footer should not read as a repeat of the band above it.

  The spots are cut out with a mask so they show the ground behind, which is
  what a hole in a translucent watermark has to do. The mask id is fixed
  because this mark appears once per page.
*/
export default function LadybugFlying(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" {...props}>
      <mask id="ladybug-flying-spots">
        <rect width="80" height="80" fill="#fff" />
        {/* left wing */}
        <circle cx="20" cy="30" r="3.6" fill="#000" />
        <circle cx="29" cy="26" r="2.9" fill="#000" />
        <circle cx="16" cy="40" r="2.6" fill="#000" />
        <circle cx="26" cy="37" r="3.2" fill="#000" />
        {/* right wing */}
        <circle cx="60" cy="30" r="3.6" fill="#000" />
        <circle cx="51" cy="26" r="2.9" fill="#000" />
        <circle cx="64" cy="40" r="2.6" fill="#000" />
        <circle cx="54" cy="37" r="3.2" fill="#000" />
      </mask>

      {/* Legs and antennae sit under the body so they read as tucked behind it. */}
      <g
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M34 16C31 10 27 7 23 6" />
        <path d="M46 16c3-6 7-9 11-10" />
        <path d="M30 48c-5 1-8 4-10 8M31 57c-4 2-6 5-7 9M50 48c5 1 8 4 10 8M49 57c4 2 6 5 7 9" />
      </g>
      <circle cx="22" cy="5" r="3" fill="currentColor" />
      <circle cx="58" cy="5" r="3" fill="currentColor" />

      <g fill="currentColor" mask="url(#ladybug-flying-spots)">
        {/* wings, swept up and out */}
        <ellipse cx="25" cy="33" rx="18" ry="11" transform="rotate(-32 25 33)" />
        <ellipse cx="55" cy="33" rx="18" ry="11" transform="rotate(32 55 33)" />
      </g>

      <g fill="currentColor">
        <circle cx="40" cy="21" r="8.5" />
        <ellipse cx="40" cy="50" rx="13" ry="18" />
      </g>
    </svg>
  );
}

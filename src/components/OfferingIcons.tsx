import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/* Two interlocking wedding bands, one topped with a cut gem. */
export function WeddingIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="25" cy="40" r="12" />
      <circle cx="39" cy="40" r="12" />
      <path d="M39 14l6 6-6 8-6-8 6-6z" />
      <path d="M33 20h12" />
      <path d="M13 17v6M10 20h6" />
      <path d="M53 24v4M51 26h4" />
    </svg>
  );
}

/* Two-tier cake with scalloped frosting and three lit candles on a stand. */
export function EventsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="14" y="38" width="36" height="14" rx="2" />
      <path d="M14 42c3 0 3 3 6 3s3-3 6-3 3 3 6 3 3-3 6-3 3 3 6 3 3-3 6-3" />
      <rect x="21" y="27" width="22" height="11" rx="2" />
      <path d="M21 31c2.75 0 2.75 3 5.5 3s2.75-3 5.5-3 2.75 3 5.5 3 2.75-3 5.5-3" />
      <path d="M26 27v-9M32 27v-10M38 27v-9" />
      <path d="M26 13c-1.6 2.2-1.6 3.8 0 5 1.6-1.2 1.6-2.8 0-5zM32 11c-1.6 2.2-1.6 3.8 0 5 1.6-1.2 1.6-2.8 0-5zM38 13c-1.6 2.2-1.6 3.8 0 5 1.6-1.2 1.6-2.8 0-5z" />
      <path d="M32 52v4M24 58h16" />
    </svg>
  );
}

/* Scallop shell with three falling water drops, a traditional baptism symbol. */
export function BaptismIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M28 54L12.1 42.5Q12.9 34.9 20.5 34.1Q25 27.9 32 31Q39 27.9 43.5 34.1Q51.1 34.9 51.9 42.5L36 54z" />
      <path d="M32 50L21 36M32 50V33M32 50l11-14" />
      <path d="M32 9c-3 4-4.5 6.5-4.5 8.5a4.5 4.5 0 0 0 9 0c0-2-1.5-4.5-4.5-8.5z" />
      <path d="M19 16c-2 2.8-3 4.5-3 6a3 3 0 0 0 6 0c0-1.5-1-3.2-3-6zM45 16c-2 2.8-3 4.5-3 6a3 3 0 0 0 6 0c0-1.5-1-3.2-3-6z" />
    </svg>
  );
}

/* Three neighbors gathered together beneath a heart. */
export function CommunityIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M32 15.5c-3.5-2.8-7-4.5-7-8a3.6 3.6 0 0 1 7-1.2 3.6 3.6 0 0 1 7 1.2c0 3.5-3.5 5.2-7 8z" />
      <circle cx="32" cy="26" r="6" />
      <path d="M21 50c0-6 5-11 11-11s11 5 11 11" />
      <circle cx="13" cy="33" r="5" />
      <path d="M4 54c0-5.5 4-9.5 9-9.5 1.7 0 3.3.4 4.7 1.2" />
      <circle cx="51" cy="33" r="5" />
      <path d="M60 54c0-5.5-4-9.5-9-9.5-1.7 0-3.3.4-4.7 1.2" />
    </svg>
  );
}

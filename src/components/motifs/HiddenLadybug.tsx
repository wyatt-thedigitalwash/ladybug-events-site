import Ladybug from "./Ladybug";

const spots = {
  left: "left-[10%] top-[32%] rotate-[18deg]",
  right: "right-[12%] top-[36%] -rotate-[22deg]",
  "bottom-left": "left-[14%] bottom-[18%] -rotate-[12deg]",
  "bottom-right": "right-[11%] bottom-[20%] rotate-[28deg]",
  "top-left": "left-[9%] top-[11%] -rotate-[16deg]",
  "top-right": "right-[10%] top-[13%] rotate-[24deg]",
} as const;

export type BugSpot = keyof typeof spots;

/*
  One small ladybug tucked into a section's background, in a different place on
  each page. Decorative, so it is hidden on narrow screens where there is no
  room beside the text. The parent section needs `relative`.
*/
export default function HiddenLadybug({ at }: { at: BugSpot }) {
  return (
    <Ladybug
      className={`pointer-events-none absolute hidden h-10 w-10 text-ladybug opacity-80 md:block ${spots[at]}`}
    />
  );
}

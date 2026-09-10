import type { CSSProperties } from "react";

/*
  Four spot arrangements, one per card, so no two bands in a row are identical.
  The rules are the same in every arrangement, which is what keeps them a set:
  five spots, sizes 20 to 34, exactly one of them red. The red sits in a
  different quadrant on each card rather than a fixed corner.

  Sized to a real ladybug, whose spots run about a fifth of the shell's height.
  They were a twelfth of it before, which read as dust rather than markings and
  disappeared entirely at phone width.

  Spots are positioned from the right so they hold their arrangement as the
  card widens, and they run the full width of the band. The medallion sits at
  the bottom-left, so anything past 68% must stay high enough to clear it:
  `top + size` at or under 64 misses it at every card width. The band's
  underside also curves up at its edges, so keep the lowest spots off them.
*/
const arrangements = [
  // Red high and toward the middle.
  [
    { size: 28, top: 16, right: "46%", red: true },
    { size: 34, top: 44, right: "14%" },
    { size: 22, top: 60, right: "30%" },
    { size: 26, top: 22, right: "64%" },
    { size: 20, top: 30, right: "82%" },
  ],
  // Red low and to the right.
  [
    { size: 26, top: 54, right: "18%", red: true },
    { size: 30, top: 18, right: "34%" },
    { size: 34, top: 46, right: "50%" },
    { size: 22, top: 24, right: "68%" },
    { size: 24, top: 20, right: "84%" },
  ],
  // Red high and hard right.
  [
    { size: 24, top: 18, right: "10%", red: true },
    { size: 34, top: 48, right: "26%" },
    { size: 28, top: 16, right: "44%" },
    { size: 20, top: 52, right: "60%" },
    { size: 26, top: 26, right: "78%" },
  ],
  // Red centred in the band.
  [
    { size: 30, top: 38, right: "36%", red: true },
    { size: 24, top: 16, right: "12%" },
    { size: 34, top: 54, right: "52%" },
    { size: 22, top: 22, right: "70%" },
    { size: 20, top: 34, right: "84%" },
  ],
];

/*
  The spot layer of a shell surface. Shared by the card shell band and the
  wedding package header so the markings stay one design rather than two that
  drift apart. The parent needs `relative`.
*/
export default function ShellSpots({
  variant = 0,
  // Bands that carry text keep their spots to the right of it. The full-width
  // arrangement is built for a band whose only occupant is an icon.
  clearOfText = false,
}: {
  variant?: number;
  clearOfText?: boolean;
}) {
  const all = arrangements[variant % arrangements.length];
  const spots = clearOfText
    ? all.filter((s) => parseInt(s.right, 10) <= 45)
    : all;
  return (
    <>
      {spots.map((spot, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`absolute rounded-full ${
            spot.red ? "bg-ladybug/50" : "bg-foreground/10"
          }`}
          style={
            {
              width: spot.size,
              height: spot.size,
              top: spot.top,
              right: spot.right,
            } as CSSProperties
          }
        />
      ))}
    </>
  );
}

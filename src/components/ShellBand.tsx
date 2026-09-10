import type { ReactNode } from "react";
import ShellSpots from "./motifs/ShellSpots";

/*
  Ladybug shell band for a card: a tinted panel whose underside curves like a
  ladybug's back, marked with spots, with the card's icon set in a medallion
  straddling the curve.

  The card must be `overflow-hidden` so the band clips to its corners, and the
  content below needs `pt-14` to clear the medallion.
*/

export default function ShellBand({
  variant = 0,
  children,
}: {
  variant?: number;
  children: ReactNode;
}) {
  return (
    <div className="shell-band relative h-[104px] bg-tint lg:h-[128px]">
      <ShellSpots variant={variant} />
      <span className="absolute bottom-0 left-8 flex h-[72px] w-[72px] translate-y-1/2 items-center justify-center rounded-full border border-foreground/10 bg-background text-secondary-accent transition-colors group-hover:border-ladybug/50">
        {children}
      </span>
    </div>
  );
}

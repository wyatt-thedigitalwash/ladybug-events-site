import type { ReactNode } from "react";

/*
  Community event card. Outlined rather than filled: the card is the same color
  as the page, and the border alone separates it.

  With no fill doing the work, the card holds together through hierarchy and
  spacing alone: the event name is the largest thing on it, then the schedule
  reads as a label over its value, and the action sits apart on white space
  rather than behind a divider.

  The action row keeps a minimum height so a button on one card and a line of
  text on another still land on the same baseline across the row.
*/
export default function EventCard({
  name,
  cadence,
  time,
  action,
  headingLevel = 3,
  highlighted = false,
}: {
  name: string;
  cadence: string;
  time: string;
  action: ReactNode;
  headingLevel?: 2 | 3;
  highlighted?: boolean;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <div
      className={`flex h-full w-full flex-col rounded-3xl border bg-background p-8 transition-colors ${
        highlighted ? "border-ladybug/50" : "border-foreground/15"
      }`}
    >
      <div className="flex-1">
        <Heading className="text-2xl font-semibold text-foreground">
          {name}
        </Heading>
        {/* 85% clears 4.5:1 on the card; 60% was 2.8. */}
        <p className="mt-4 text-base text-foreground/85">{cadence}</p>
        {/* Tabular figures so the times line up across the row. */}
        <p className="mt-0.5 text-xl font-semibold tabular-nums text-foreground">
          {time}
        </p>
      </div>
      <div className="mt-8 flex min-h-11 items-center">
        {action}
      </div>
    </div>
  );
}

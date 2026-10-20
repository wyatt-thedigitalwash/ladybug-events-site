import { ffcdc } from "@/lib/site";

/*
  The community-events intro, used on the home page and the Community hero.
  The client asked for the nonprofit to be named and linked, not just "FFCDC".
*/
export default function FfcdcSupport() {
  return (
    <>
      The Ladybug Venue is a proud supporter of the community nonprofit{" "}
      <a
        href={ffcdc.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-secondary-accent underline underline-offset-4 hover:text-ladybug"
      >
        {ffcdc.name}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      , opening its doors to the neighborhood for regular FFCDC community
      events.
    </>
  );
}

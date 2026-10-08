/*
  The action row for a community event that takes no RSVP. The food pantry is
  run by Faith Focus Community Development Corp, which keeps its own listing,
  so the card points there for the details that live with them.
*/
export default function OpenEventNote({
  link,
}: {
  link?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-foreground/85">
        Open to all, no RSVP needed
      </span>
      {link && (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-secondary-accent hover:text-ladybug"
        >
          {link.label} &rarr;
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}

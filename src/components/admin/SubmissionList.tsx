import type { Submission } from "@/lib/types";
import { submissionKindLabels } from "@/lib/types";

/*
  One card per submission rather than a wide table. The three kinds do not
  share a column set, so a table would be mostly empty cells, and a table with
  this many columns cannot be read on a phone without sideways scrolling. Cards
  show only the fields a given submission actually has.
*/

const kindStyles: Record<Submission["kind"], string> = {
  rsvp: "bg-surface-slate text-secondary-accent",
  wedding: "bg-surface-accent text-foreground",
  event: "bg-tint text-foreground",
};

function formatReceived(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    timeZone: "America/New_York",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatEventDate(value: string): string {
  // Held as a plain YYYY-MM-DD string. Splitting it by hand keeps it on the day
  // that was submitted; `new Date("2026-05-02")` parses as UTC midnight and
  // prints the day before once it is rendered in Eastern time.
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value;
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/*
  Both times are optional and can arrive one without the other, so this prints
  whichever half exists rather than assuming a pair. A 24-hour value from the
  time input is rendered as 12-hour, which is how the owners read a schedule.
*/
function formatHours(item: Submission): string | null {
  const to12Hour = (value: string) => {
    const [h, m] = value.split(":").map(Number);
    if (Number.isNaN(h) || Number.isNaN(m)) return value;
    const period = h < 12 ? "AM" : "PM";
    const hour = h % 12 === 0 ? 12 : h % 12;
    return `${hour}:${String(m).padStart(2, "0")} ${period}`;
  };

  const start = item.startTime ? to12Hour(item.startTime) : null;
  const end = item.endTime ? to12Hour(item.endTime) : null;

  if (start && end) return `${start} to ${end}`;
  if (start) return `From ${start}`;
  if (end) return `Until ${end}`;
  return null;
}

function Detail({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-foreground/85">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm text-foreground">{value}</dd>
    </div>
  );
}

export default function SubmissionList({
  submissions,
}: {
  submissions: Submission[];
}) {
  if (submissions.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-foreground/20 px-6 py-12 text-center text-sm text-foreground/85">
        Nothing here yet. Submissions appear the moment someone sends a form.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {submissions.map((item) => (
        <li
          key={item.id}
          className="rounded-2xl border border-foreground/15 bg-background p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${kindStyles[item.kind]}`}
            >
              {item.kind === "rsvp" && item.event
                ? item.event
                : submissionKindLabels[item.kind]}
            </span>
            <time
              dateTime={item.createdAt}
              className="text-xs tabular-nums text-foreground/85"
            >
              {formatReceived(item.createdAt)}
            </time>
          </div>

          <h2 className="mt-4 text-xl font-semibold text-foreground">
            {item.name}
          </h2>

          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <a
              href={`mailto:${item.email}`}
              className="font-medium text-secondary-accent hover:text-ladybug"
            >
              {item.email}
            </a>
            {item.phone && (
              <a
                href={`tel:${item.phone.replace(/[^\d+]/g, "")}`}
                className="font-medium tabular-nums text-secondary-accent hover:text-ladybug"
              >
                {item.phone}
              </a>
            )}
          </div>

          <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {item.guests !== null && (
              <Detail label="Guests" value={String(item.guests)} />
            )}
            <Detail label="Event Type" value={item.eventType} />
            <Detail
              label="Event Date"
              value={item.eventDate ? formatEventDate(item.eventDate) : null}
            />
            <Detail label="Package" value={item.packageName} />
            <Detail label="Space" value={item.space} />
            <Detail label="Hours Needed" value={formatHours(item)} />
            <Detail label="Available to Tour" value={item.tour} />
          </dl>

          {item.notes && (
            <div className="mt-5 rounded-xl bg-tint px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-foreground/85">
                Notes
              </p>
              <p className="mt-1 whitespace-pre-line text-sm leading-6 text-foreground">
                {item.notes}
              </p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

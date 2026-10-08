import { isSignedIn } from "@/lib/admin-auth";
import { listSubmissions } from "@/lib/db";
import { communityEvents } from "@/lib/site";
import { submissionKindLabels, type SubmissionKind } from "@/lib/types";

const KINDS: SubmissionKind[] = ["rsvp", "wedding", "event", "vendor"];

// Widened to string[]: communityEvents is `as const`, so the mapped names
// narrow to literal types and cannot be tested against an arbitrary query
// string with .includes().
const RSVP_EVENTS: readonly string[] = communityEvents
  .filter((event) => event.rsvpRequired)
  .map((event) => event.name);

const COLUMNS = [
  "Received",
  "Type",
  "Event",
  "Name",
  "Email",
  "Phone",
  "Guests",
  "Event Type",
  "Event Date",
  "Package",
  "Space",
  "Start Time",
  "End Time",
  "Available to Tour",
  "Business",
  "Vendor Service",
  "Website",
  "Notes",
] as const;

/*
  A field is quoted whenever it contains a delimiter, a quote or a newline, and
  inner quotes are doubled. The leading-character guard is the separate concern
  of spreadsheet formula injection: Excel and Sheets evaluate a cell starting
  with =, +, - or @, so a submitted name like `=HYPERLINK(...)` would run on
  open. Prefixing a tab keeps the text intact and stops it being read as a
  formula.
*/
function csvCell(value: string | number | null): string {
  if (value === null || value === undefined) return "";
  let text = String(value);
  if (/^[=+\-@\t\r]/.test(text)) text = `\t${text}`;
  if (/["\n\r,]/.test(text)) text = `"${text.replace(/"/g, '""')}"`;
  return text;
}

export async function GET(request: Request) {
  if (!(await isSignedIn())) {
    return Response.json(
      { error: "Not found" },
      { status: 404, headers: { "Cache-Control": "no-store" } }
    );
  }

  // Mirrors the filter the admin page is showing, so the download matches
  // whatever list the owners are looking at.
  const params = new URL(request.url).searchParams;
  const requestedKind = params.get("kind");
  const kind = KINDS.includes(requestedKind as SubmissionKind)
    ? (requestedKind as SubmissionKind)
    : undefined;
  const requestedEvent = params.get("event");
  const event =
    kind === "rsvp" && requestedEvent && RSVP_EVENTS.includes(requestedEvent)
      ? requestedEvent
      : undefined;

  // A database failure is logged here and answered with a generic message, so
  // neither the driver's error nor a stack trace reaches the browser.
  let submissions: Awaited<ReturnType<typeof listSubmissions>>;
  try {
    submissions = await listSubmissions({ kind, event });
  } catch (error) {
    console.error("CSV export failed", error);
    return Response.json(
      { error: "The export could not be created. Please try again." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }

  const rows = submissions.map((item) =>
    [
      item.createdAt,
      submissionKindLabels[item.kind],
      item.event,
      item.name,
      item.email,
      item.phone,
      item.guests,
      item.eventType,
      item.eventDate,
      item.packageName,
      item.space,
      item.startTime,
      item.endTime,
      item.tour,
      item.businessName,
      item.vendorCategory,
      item.website,
      item.notes,
    ]
      .map(csvCell)
      .join(",")
  );

  // CRLF line endings and a UTF-8 BOM, which is what Excel needs to open the
  // file as UTF-8 rather than mangling any accented character in a name.
  const csv = `﻿${[COLUMNS.join(","), ...rows].join("\r\n")}\r\n`;
  const stamp = new Date().toISOString().slice(0, 10);
  // A per-event download is named for the event, so two RSVP exports sitting
  // in a downloads folder are told apart without opening them.
  const slug = (event ?? kind ?? "submissions")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const filename = `ladybug-${slug}-${stamp}.csv`;

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

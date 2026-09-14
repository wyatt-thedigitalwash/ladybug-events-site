import "server-only";

import { neon } from "@neondatabase/serverless";
import type {
  Submission,
  SubmissionFilter,
  SubmissionInput,
  SubmissionKind,
} from "@/lib/types";

/*
  Submission storage, backed by Neon Postgres.

  Every form on the site writes one row here and also sends an email. The two
  paths are deliberately independent: a submission that reaches the inbox but
  not the table is still a submission the owners can act on, so nothing in here
  is allowed to throw into a form handler. Callers get a boolean.
*/

function connection() {
  // Vercel's Neon integration injects DATABASE_URL. The pooled URL is the one
  // to use from serverless functions; POSTGRES_URL is the same value under the
  // name the older Vercel Postgres integration used.
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  return url ? neon(url) : null;
}

export function isDatabaseConfigured(): boolean {
  return connection() !== null;
}

/*
  The table is created on first use rather than through a migration step. There
  is one table and it is append-only, so a migration runner would be more
  moving parts than the schema justifies. Memoized so the round trip happens
  once per warm instance, not once per submission.
*/
let schemaReady: Promise<void> | null = null;

function ensureSchema(sql: NonNullable<ReturnType<typeof connection>>): Promise<void> {
  schemaReady ??= (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS submissions (
        id           bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        kind         text NOT NULL,
        event        text,
        name         text NOT NULL,
        email        text NOT NULL,
        phone        text,
        guests       integer,
        event_type   text,
        event_date   date,
        space        text,
        tour         text,
        package_name text,
        start_time   text,
        end_time     text,
        notes        text,
        created_at   timestamptz NOT NULL DEFAULT now()
      )
    `;
    /*
      Columns added after the table first shipped. ADD COLUMN IF NOT EXISTS is
      a no-op on a fresh table and backfills one that predates them, which is
      what stands in for a migration runner here.
    */
    await sql`ALTER TABLE submissions ADD COLUMN IF NOT EXISTS package_name text`;
    await sql`ALTER TABLE submissions ADD COLUMN IF NOT EXISTS start_time text`;
    await sql`ALTER TABLE submissions ADD COLUMN IF NOT EXISTS end_time text`;
    await sql`
      CREATE INDEX IF NOT EXISTS submissions_kind_created_at_idx
        ON submissions (kind, created_at DESC)
    `;
  })().catch((error) => {
    // Let the next call retry rather than caching a failed connection for the
    // life of the instance.
    schemaReady = null;
    throw error;
  });

  return schemaReady;
}

export async function saveSubmission(input: SubmissionInput): Promise<boolean> {
  const sql = connection();
  if (!sql) return false;

  try {
    await ensureSchema(sql);
    await sql`
      INSERT INTO submissions
        (kind, event, name, email, phone, guests, event_type, event_date,
         space, tour, package_name, start_time, end_time, notes)
      VALUES (
        ${input.kind},
        ${input.event ?? null},
        ${input.name},
        ${input.email},
        ${input.phone ?? null},
        ${input.guests ?? null},
        ${input.eventType ?? null},
        ${input.eventDate || null},
        ${input.space ?? null},
        ${input.tour ?? null},
        ${input.packageName || null},
        ${input.startTime || null},
        ${input.endTime || null},
        ${input.notes || null}
      )
    `;
    return true;
  } catch (error) {
    console.error("Failed to store submission", error);
    return false;
  }
}

type SubmissionRow = {
  id: string | number;
  kind: string;
  event: string | null;
  name: string;
  email: string;
  phone: string | null;
  guests: number | null;
  event_type: string | null;
  event_date: Date | string | null;
  space: string | null;
  tour: string | null;
  package_name: string | null;
  start_time: string | null;
  end_time: string | null;
  notes: string | null;
  created_at: Date | string;
};

/*
  A `date` column comes back from the driver as a JS Date, not a string, built
  at local midnight for the day stored. Recovering it needs the local accessors.

  Two things that look right and are not:
  - `String(date).slice(0, 10)` yields "Sat Jun 12". It silently drops the year,
    which on a wedding booked two years out is the part that matters most.
  - `toISOString().slice(0, 10)` shifts across the UTC boundary and prints the
    previous day for any timezone behind UTC, which includes Florida.
*/
function toDateOnly(value: Date | string | null): string | null {
  if (!value) return null;
  if (value instanceof Date) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  // Already a plain YYYY-MM-DD string, which is what some drivers return.
  return String(value).slice(0, 10);
}

function toSubmission(row: SubmissionRow): Submission {
  return {
    id: Number(row.id),
    kind: row.kind as SubmissionKind,
    event: row.event,
    name: row.name,
    email: row.email,
    phone: row.phone,
    guests: row.guests,
    eventType: row.event_type,
    // Kept as the plain YYYY-MM-DD string it was submitted as. See toDateOnly.
    eventDate: toDateOnly(row.event_date),
    space: row.space,
    tour: row.tour,
    packageName: row.package_name,
    startTime: row.start_time,
    endTime: row.end_time,
    notes: row.notes,
    createdAt: new Date(row.created_at).toISOString(),
  };
}

/*
  Three shapes rather than one built-up query string: the driver parameterises
  a tagged template, so a conditional WHERE has to be a separate template, not
  an interpolated fragment. Interpolating one would turn the value into raw SQL
  and undo the protection the template gives.
*/
export async function listSubmissions(
  filter: SubmissionFilter = {}
): Promise<Submission[]> {
  const sql = connection();
  if (!sql) return [];

  await ensureSchema(sql);
  const { kind, event } = filter;

  const rows =
    kind && event
      ? await sql`
          SELECT * FROM submissions WHERE kind = ${kind} AND event = ${event}
          ORDER BY created_at DESC LIMIT 1000
        `
      : kind
        ? await sql`
            SELECT * FROM submissions WHERE kind = ${kind}
            ORDER BY created_at DESC LIMIT 1000
          `
        : await sql`
            SELECT * FROM submissions
            ORDER BY created_at DESC LIMIT 1000
          `;

  return (rows as SubmissionRow[]).map(toSubmission);
}

export type SubmissionCounts = {
  kinds: Record<SubmissionKind, number>;
  /* RSVP totals keyed by community event name, for the per-event chips. */
  events: Record<string, number>;
};

export async function countSubmissions(): Promise<SubmissionCounts> {
  const empty: SubmissionCounts = {
    kinds: { rsvp: 0, wedding: 0, event: 0 },
    events: {},
  };
  const sql = connection();
  if (!sql) return empty;

  await ensureSchema(sql);
  // Grouped by both at once, so the per-event chips cost no extra round trip.
  const rows = (await sql`
    SELECT kind, event, count(*)::int AS total
    FROM submissions GROUP BY kind, event
  `) as { kind: string; event: string | null; total: number }[];

  return rows.reduce((acc, row) => {
    if (row.kind in acc.kinds) {
      acc.kinds[row.kind as SubmissionKind] += row.total;
    }
    if (row.kind === "rsvp" && row.event) {
      acc.events[row.event] = (acc.events[row.event] ?? 0) + row.total;
    }
    return acc;
  }, empty);
}

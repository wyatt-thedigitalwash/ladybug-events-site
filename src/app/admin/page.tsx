import Link from "next/link";
import { Download, LogOut } from "lucide-react";
import AdminSignInForm from "@/components/admin/AdminSignInForm";
import SubmissionList from "@/components/admin/SubmissionList";
import { signOutAction } from "@/app/admin/actions";
import { isAdminConfigured, isSignedIn } from "@/lib/admin-auth";
import { countSubmissions, isDatabaseConfigured, listSubmissions } from "@/lib/db";
import { communityEvents } from "@/lib/site";
import { submissionKindLabels, type SubmissionKind } from "@/lib/types";

/*
  Every form submission on the site, in one list. Reads the session cookie, so
  it can never be prerendered or cached.
*/
export const dynamic = "force-dynamic";

const KINDS: SubmissionKind[] = ["rsvp", "wedding", "event"];

/*
  The community events that actually take an RSVP, which is what the per-event
  chips are built from. The food pantry has no form, so it never appears.
  Driven by the same list the public pages use, so adding an event to the site
  adds its chip here with no second edit.
*/
// Widened to string[]: communityEvents is `as const`, so the mapped names
// narrow to literal types and cannot be tested against an arbitrary query
// string with .includes().
const RSVP_EVENTS: readonly string[] = communityEvents
  .filter((event) => event.rsvpRequired)
  .map((event) => event.name);

function isKind(value: unknown): value is SubmissionKind {
  return typeof value === "string" && KINDS.includes(value as SubmissionKind);
}

function isRsvpEvent(value: unknown): value is string {
  return typeof value === "string" && RSVP_EVENTS.includes(value);
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section data-bg="light" className="py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6">{children}</div>
    </section>
  );
}

export default async function AdminPage({ searchParams }: PageProps<"/admin">) {
  if (!(await isSignedIn())) {
    return (
      <Shell>
        <div className="mx-auto max-w-sm">
          <h1 className="text-center text-3xl font-semibold tracking-tight text-foreground">
            Submissions
          </h1>
          <p className="mt-3 text-center text-sm text-foreground/70">
            RSVPs and inquiries from the website.
          </p>
          <div className="mt-8 rounded-2xl border border-foreground/15 bg-background p-8">
            <AdminSignInForm />
          </div>
          {!isAdminConfigured() && (
            <p className="mt-6 rounded-2xl border border-dashed border-foreground/20 px-5 py-4 text-center text-sm text-foreground/70">
              No admin password is set for this environment. Add
              LADYBUG_ADMIN_PASSWORD and redeploy.
            </p>
          )}
        </div>
      </Shell>
    );
  }

  const params = await searchParams;
  const kind = isKind(params.kind) ? params.kind : undefined;
  // An event only narrows an RSVP listing, so it is ignored on other kinds.
  const event =
    kind === "rsvp" && isRsvpEvent(params.event) ? params.event : undefined;

  const [submissions, counts] = await Promise.all([
    listSubmissions({ kind, event }),
    countSubmissions(),
  ]);
  const total = counts.kinds.rsvp + counts.kinds.wedding + counts.kinds.event;
  const query = new URLSearchParams(
    event ? { kind: "rsvp", event } : kind ? { kind } : {}
  ).toString();

  return (
    <Shell>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Submissions
          </h1>
          <p className="mt-2 text-sm text-foreground/70">
            {total === 0
              ? "Nothing received yet."
              : `${total} total, newest first.`}
          </p>
        </div>
        <form action={signOutAction}>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-ladybug/50"
          >
            <LogOut size={15} aria-hidden="true" />
            Sign out
          </button>
        </form>
      </div>

      {!isDatabaseConfigured() && (
        <p className="mt-8 rounded-2xl border border-dashed border-ladybug/40 px-5 py-4 text-sm text-foreground/85">
          No database is connected for this environment, so nothing is being
          stored. Create a Neon Postgres database in the Vercel dashboard and
          redeploy. Submissions are still being emailed in the meantime.
        </p>
      )}

      <nav aria-label="Filter submissions" className="mt-8 flex flex-wrap gap-2">
        <FilterLink
          label="All"
          href="/admin"
          count={total}
          active={!kind && !event}
        />

        {/* Bingo and the workout class are both RSVPs, but the owners count
            heads for each separately, so each gets its own chip. */}
        {RSVP_EVENTS.map((name) => (
          <FilterLink
            key={name}
            label={name}
            href={`/admin?kind=rsvp&event=${encodeURIComponent(name)}`}
            count={counts.events[name] ?? 0}
            active={event === name}
          />
        ))}

        {KINDS.filter((k) => k !== "rsvp").map((k) => (
          <FilterLink
            key={k}
            label={submissionKindLabels[k]}
            href={`/admin?kind=${k}`}
            count={counts.kinds[k]}
            active={kind === k && !event}
          />
        ))}

        <a
          href={query ? `/admin/export?${query}` : "/admin/export"}
          className="ml-auto flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-ladybug/50"
        >
          <Download size={15} aria-hidden="true" />
          CSV
        </a>
      </nav>

      <div className="mt-8">
        <SubmissionList submissions={submissions} />
      </div>
    </Shell>
  );
}

function FilterLink({
  label,
  href,
  count,
  active,
}: {
  label: string;
  href: string;
  count: number;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
        active
          ? "bg-foreground text-background"
          : "border border-foreground/20 text-foreground hover:border-ladybug/50"
      }`}
    >
      {label}
      <span className={active ? "text-background/70" : "text-foreground/55"}>
        {" "}
        {count}
      </span>
    </Link>
  );
}

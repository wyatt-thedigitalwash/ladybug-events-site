export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  /*
    What the visitor typed, echoed back on failure only.

    React resets an uncontrolled form once its action resolves, so without this
    a rejected submission hands back an empty form and the visitor retypes a
    wedding inquiry from scratch. The fields read these as their defaultValue,
    which is what the reset restores them to. Absent on success, so a completed
    form does clear.
  */
  values?: Record<string, string>;
  /*
    The fields a rejection is about, by name. Each one is marked aria-invalid
    and pointed at the message, so a screen reader moving through the form
    hears why that field was flagged. Absent on success.
  */
  invalid?: string[];
};

export const initialFormState: FormState = { status: "idle" };

/*
  Every form on the site lands in one `submissions` table. The four kinds use
  overlapping but not identical fields, so the optional ones are the union of
  what any single form collects rather than a per-kind shape. One table keeps
  the admin list, the CSV export and the storage layer simple; splitting it
  into three would triple all of them to save a handful of null columns.
*/
export type SubmissionKind = "rsvp" | "wedding" | "event" | "vendor";

export type SubmissionInput = {
  kind: SubmissionKind;
  name: string;
  email: string;
  event?: string;
  phone?: string;
  guests?: number;
  eventType?: string;
  eventDate?: string;
  space?: string;
  tour?: string;
  packageName?: string;
  startTime?: string;
  endTime?: string;
  businessName?: string;
  vendorCategory?: string;
  website?: string;
  notes?: string;
};

export type Submission = {
  id: number;
  kind: SubmissionKind;
  name: string;
  email: string;
  event: string | null;
  phone: string | null;
  guests: number | null;
  eventType: string | null;
  eventDate: string | null;
  space: string | null;
  tour: string | null;
  packageName: string | null;
  startTime: string | null;
  endTime: string | null;
  businessName: string | null;
  vendorCategory: string | null;
  website: string | null;
  notes: string | null;
  createdAt: string;
};

/*
  What the admin list is filtered to. Community RSVPs are split by event rather
  than shown as one bucket, because the owners run bingo and the workout class
  as two separate things and count heads for each separately.
*/
export type SubmissionFilter = {
  kind?: SubmissionKind;
  event?: string;
};

export const submissionKindLabels: Record<SubmissionKind, string> = {
  rsvp: "Community RSVP",
  wedding: "Wedding Inquiry",
  event: "Event Inquiry",
  vendor: "Vendor Inquiry",
};

import "server-only";

import { MAX_LENGTH, type FieldName } from "@/lib/form-limits";
import { communityEvents, weddingPackages } from "@/lib/site";
import type { FormState } from "@/lib/types";

/*
  Server-side validation shared by the public form actions.

  The browser's required, type and maxLength attributes are a convenience for
  the visitor. Anything can be posted to a server action directly, so these are
  the checks that actually hold.
*/

export type Values = Record<string, string>;

const MULTILINE: ReadonlySet<FieldName> = new Set(["notes"]);

/*
  Control characters are stripped. A line break in a name would otherwise ride
  into the email subject line, and nothing a person types needs them. Notes
  keep their line breaks and tabs, normalized to \n so the length check counts
  a line break once however the browser sent it.
*/
function clean(raw: string, multiline: boolean): string {
  const text = raw.replace(/\r\n?/g, "\n");
  const stripped = multiline
    ? text.replace(/(?![\n\t])\p{Cc}/gu, "")
    : text.replace(/\p{Cc}+/gu, " ");
  return stripped.trim();
}

export type Collected = { values: Values; tooLong: FieldName[] };

export function collect(
  formData: FormData,
  fields: readonly FieldName[]
): Collected {
  const values: Values = {};
  const tooLong: FieldName[] = [];
  for (const field of fields) {
    const raw = formData.get(field);
    const text = typeof raw === "string" ? clean(raw, MULTILINE.has(field)) : "";
    if (text.length > MAX_LENGTH[field]) tooLong.push(field);
    // Capped either way, so an oversized post is never echoed back whole.
    values[field] = text.slice(0, MAX_LENGTH[field]);
  }
  return { values, tooLong };
}

export function missingFrom(
  values: Values,
  required: readonly FieldName[]
): FieldName[] {
  return required.filter((field) => !values[field]);
}

// Every rejection carries the values back so the form can refill itself, and
// names the fields it is about so the form can mark them aria-invalid.
export function reject(
  message: string,
  values: Values,
  invalid: string[] = []
): FormState {
  return { status: "error", message, values, invalid };
}

const TYPED_LABELS: Partial<Record<FieldName, string>> = {
  name: "your name",
  email: "your email",
  phone: "your phone number",
  notes: "your note",
};

export function tooLongMessage(fields: FieldName[]): string {
  const label = TYPED_LABELS[fields[0]];
  return label
    ? `Please keep ${label} to ${MAX_LENGTH[fields[0]].toLocaleString("en-US")} characters or fewer.`
    : "Please check the highlighted fields and try again.";
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)*\.[a-z][a-z0-9-]*[a-z0-9]$/i;

export function isEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value);
}

// Lenient on format on purpose ("813.776.5111", "+1 (813) 776-5111 ext 2"),
// strict only on there being a plausible number of digits.
export function isPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "").length;
  return digits >= 7 && digits <= 15;
}

// What an <input type="date"> submits, and a day that exists. The date column
// rejects anything else, which would otherwise lose the stored copy.
export function isDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

// What an <input type="time"> submits: HH:MM, or HH:MM:SS with a step set.
export function isTime(value: string): boolean {
  return /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/.test(value);
}

/*
  The values each select can post, mirrored from the form components. A value
  outside the list can only come from a hand-built request. If an option is
  added to a form, add its value here too, or that choice will be rejected.
*/
export const OPTIONS = {
  rsvpEvent: communityEvents
    .filter((event) => event.rsvpRequired)
    .map((event) => event.name) as readonly string[],
  weddingPackage: [
    ...weddingPackages.map((pkg) => pkg.name),
    "Not Sure Yet",
  ] as readonly string[],
  space: ["Indoor & Outdoor", "Indoor Only", "Not Sure Yet"] as readonly string[],
  tour: ["Yes, weekdays", "Yes, weekends", "Yes, flexible", "Not yet"] as readonly string[],
  eventType: ["Birthday", "Baby Shower", "Baptism", "Other"] as readonly string[],
};

/* The fields whose value is not one of the options that field offers. */
export function invalidChoices(
  values: Values,
  choices: Partial<Record<FieldName, readonly string[]>>
): FieldName[] {
  return (Object.entries(choices) as [FieldName, readonly string[]][])
    .filter(([field, options]) => !options.includes(values[field]))
    .map(([field]) => field);
}

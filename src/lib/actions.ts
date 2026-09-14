"use server";

import { saveSubmission } from "@/lib/db";
import { sendNotification, type EmailField } from "@/lib/email";
import type { FormState, SubmissionInput } from "@/lib/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Long enough for any real answer, short enough that nobody can post a novel
// into the owners' inbox.
const MAX_FIELD = 2000;

type Values = Record<string, string>;

function collect(formData: FormData, fields: string[]): Values {
  const values: Values = {};
  for (const field of fields) {
    const raw = formData.get(field);
    values[field] = typeof raw === "string" ? raw.trim().slice(0, MAX_FIELD) : "";
  }
  return values;
}

function missingFrom(values: Values, required: string[]): string[] {
  return required.filter((field) => !values[field]);
}

// Every rejection carries the values back so the form can refill itself.
function reject(message: string, values: Values): FormState {
  return { status: "error", message, values };
}

/*
  Store and notify. The two are independent on purpose: a submission that lands
  in the table but not the inbox is still recoverable from /admin, and one that
  lands in the inbox but not the table is still actionable. Only losing both is
  a failure the visitor needs to hear about.
*/
async function record(
  input: SubmissionInput,
  email: { subject: string; heading: string; fields: EmailField[] },
  values: Values
): Promise<FormState> {
  const [stored, notified] = await Promise.all([
    saveSubmission(input),
    sendNotification({ ...email, replyTo: input.email }),
  ]);

  if (!stored && !notified) {
    return reject(
      "We couldn't send that just now. Please try again in a moment, or call us at (813) 776-5111.",
      values
    );
  }

  return { status: "success", message: "Thanks! We'll be in touch soon." };
}

export async function submitRsvp(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const values = collect(formData, ["name", "email", "event", "guests"]);

  if (missingFrom(values, ["name", "email", "event", "guests"]).length > 0) {
    return reject("Please fill out all fields.", values);
  }

  if (!EMAIL_PATTERN.test(values.email)) {
    return reject("Please enter a valid email address.", values);
  }

  const guests = Number(values.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > 100) {
    return reject("Please enter a number of guests between 1 and 100.", values);
  }

  return record(
    {
      kind: "rsvp",
      event: values.event,
      name: values.name,
      email: values.email,
      guests,
    },
    {
      subject: `RSVP: ${values.event} (${guests} ${guests === 1 ? "guest" : "guests"})`,
      heading: `New RSVP for ${values.event}`,
      fields: [
        { label: "Event", value: values.event },
        { label: "Name", value: values.name },
        { label: "Email", value: values.email },
        { label: "Guests", value: guests },
      ],
    },
    values
  );
}

export async function submitWeddingInquiry(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const values = collect(formData, [
    "name",
    "email",
    "phone",
    "eventDate",
    "packageName",
    "guests",
    "space",
    "startTime",
    "endTime",
    "tour",
    "notes",
  ]);

  /*
    Start and end time are deliberately not required. A couple eight months out
    often has a date and a rough guest count but no schedule, and blocking the
    whole inquiry on a field they cannot answer loses the lead outright.
  */
  const missing = missingFrom(values, [
    "name",
    "email",
    "phone",
    "eventDate",
    "packageName",
    "guests",
    "space",
    "tour",
  ]);
  if (missing.length > 0) {
    return reject("Please fill out all required fields.", values);
  }

  if (!EMAIL_PATTERN.test(values.email)) {
    return reject("Please enter a valid email address.", values);
  }

  const guests = Number(values.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > 500) {
    return reject("Please enter a valid guest count.", values);
  }

  const hours =
    values.startTime && values.endTime
      ? `${values.startTime} to ${values.endTime}`
      : values.startTime || values.endTime || "";

  return record(
    {
      kind: "wedding",
      name: values.name,
      email: values.email,
      phone: values.phone,
      eventDate: values.eventDate,
      packageName: values.packageName,
      guests,
      space: values.space,
      startTime: values.startTime,
      endTime: values.endTime,
      tour: values.tour,
      notes: values.notes,
    },
    {
      subject: `Wedding Inquiry: ${values.name}, ${values.eventDate} (${guests} guests)`,
      heading: "New Wedding Inquiry",
      fields: [
        { label: "Name", value: values.name },
        { label: "Email", value: values.email },
        { label: "Phone", value: values.phone },
        { label: "Wedding Date", value: values.eventDate },
        { label: "Package", value: values.packageName },
        { label: "Guests", value: guests },
        { label: "Space", value: values.space },
        { label: "Hours Needed", value: hours },
        { label: "Available to Tour", value: values.tour },
        { label: "Notes", value: values.notes },
      ],
    },
    values
  );
}

export async function submitEventInquiry(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const values = collect(formData, [
    "name",
    "email",
    "phone",
    "eventType",
    "eventDate",
    "space",
    "notes",
  ]);

  const missing = missingFrom(values, [
    "name",
    "email",
    "phone",
    "eventType",
    "eventDate",
    "space",
  ]);
  if (missing.length > 0) {
    return reject("Please fill out all required fields.", values);
  }

  if (!EMAIL_PATTERN.test(values.email)) {
    return reject("Please enter a valid email address.", values);
  }

  return record(
    {
      kind: "event",
      name: values.name,
      email: values.email,
      phone: values.phone,
      eventType: values.eventType,
      eventDate: values.eventDate,
      space: values.space,
      notes: values.notes,
    },
    {
      subject: `Event Inquiry: ${values.eventType}, ${values.eventDate}`,
      heading: "New Event Inquiry",
      fields: [
        { label: "Name", value: values.name },
        { label: "Email", value: values.email },
        { label: "Phone", value: values.phone },
        { label: "Event Type", value: values.eventType },
        { label: "Event Date", value: values.eventDate },
        { label: "Space", value: values.space },
        { label: "Notes", value: values.notes },
      ],
    },
    values
  );
}

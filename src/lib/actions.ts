"use server";

import { Resend } from "resend";
import type { FormState } from "@/lib/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getRecipients(): string[] {
  const raw = process.env.LADYBUG_NOTIFY_EMAIL;
  return raw ? raw.split(",").map((email) => email.trim()).filter(Boolean) : [];
}

async function sendNotification(subject: string, html: string): Promise<FormState> {
  const recipients = getRecipients();
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || recipients.length === 0) {
    return {
      status: "error",
      message:
        "This form isn't fully connected yet. Please call or use the Linktree contact instead.",
    };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "The Ladybug Venue <onboarding@resend.dev>",
    to: recipients,
    subject,
    html,
  });

  if (error) {
    return {
      status: "error",
      message: "Something went wrong sending your request. Please try again or call us.",
    };
  }

  return { status: "success", message: "Thanks! We'll be in touch soon." };
}

function requireFields(
  formData: FormData,
  fields: string[]
): { values: Record<string, string>; missing: string[] } {
  const values: Record<string, string> = {};
  const missing: string[] = [];

  for (const field of fields) {
    const value = (formData.get(field) as string | null)?.trim() ?? "";
    values[field] = value;
    if (!value) missing.push(field);
  }

  return { values, missing };
}

export async function submitRsvp(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const { values, missing } = requireFields(formData, [
    "name",
    "email",
    "event",
    "guests",
  ]);

  if (missing.length > 0) {
    return { status: "error", message: "Please fill out all fields." };
  }

  if (!EMAIL_PATTERN.test(values.email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const guestCount = Number(values.guests);
  if (!Number.isInteger(guestCount) || guestCount < 1) {
    return { status: "error", message: "Please enter a valid number of guests." };
  }

  return sendNotification(
    `RSVP: ${values.event}`,
    `<p><strong>Event:</strong> ${values.event}</p>
     <p><strong>Name:</strong> ${values.name}</p>
     <p><strong>Email:</strong> ${values.email}</p>
     <p><strong>Guests:</strong> ${guestCount}</p>`
  );
}

export async function submitWeddingInquiry(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const { values, missing } = requireFields(formData, [
    "name",
    "email",
    "phone",
    "eventDate",
    "space",
    "tour",
  ]);

  if (missing.length > 0) {
    return { status: "error", message: "Please fill out all required fields." };
  }

  if (!EMAIL_PATTERN.test(values.email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const notes = (formData.get("notes") as string | null)?.trim() ?? "";

  return sendNotification(
    "New Wedding Inquiry",
    `<p><strong>Name:</strong> ${values.name}</p>
     <p><strong>Email:</strong> ${values.email}</p>
     <p><strong>Phone:</strong> ${values.phone}</p>
     <p><strong>Event Date:</strong> ${values.eventDate}</p>
     <p><strong>Space:</strong> ${values.space}</p>
     <p><strong>Available to Tour:</strong> ${values.tour}</p>
     ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}`
  );
}

export async function submitEventInquiry(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const { values, missing } = requireFields(formData, [
    "name",
    "email",
    "phone",
    "eventType",
    "eventDate",
    "space",
  ]);

  if (missing.length > 0) {
    return { status: "error", message: "Please fill out all required fields." };
  }

  if (!EMAIL_PATTERN.test(values.email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const notes = (formData.get("notes") as string | null)?.trim() ?? "";

  return sendNotification(
    "New Event Inquiry",
    `<p><strong>Name:</strong> ${values.name}</p>
     <p><strong>Email:</strong> ${values.email}</p>
     <p><strong>Phone:</strong> ${values.phone}</p>
     <p><strong>Event Type:</strong> ${values.eventType}</p>
     <p><strong>Event Date:</strong> ${values.eventDate}</p>
     <p><strong>Space:</strong> ${values.space}</p>
     ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}`
  );
}

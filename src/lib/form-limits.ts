/*
  Longest value each form field accepts.

  Shared on purpose: the server actions enforce these (src/lib/form-validation.ts)
  and the text inputs carry the same numbers as maxLength, so a visitor is
  stopped while typing rather than on submit, and the two cannot drift.

  Selects, dates and the RSVP event are chosen rather than typed, so their real
  values are far shorter. Their caps only bound what a hand-built request can
  push into the table and the owners' inbox.
*/
export const MAX_LENGTH = {
  name: 100,
  // The longest address SMTP allows.
  email: 254,
  phone: 30,
  notes: 2000,
  event: 100,
  eventType: 100,
  packageName: 100,
  space: 100,
  tour: 100,
  eventDate: 10,
  startTime: 8,
  endTime: 8,
  guests: 10,
} as const;

export type FieldName = keyof typeof MAX_LENGTH;

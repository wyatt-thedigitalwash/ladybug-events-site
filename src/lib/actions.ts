"use server";

import {
  OPTIONS,
  collect,
  invalidChoices,
  isDate,
  isEmail,
  isPhone,
  isTime,
  missingFrom,
  reject,
  tooLongMessage,
} from "@/lib/form-validation";
import { formatEventDate, isUpcomingDate } from "@/lib/community-dates";
import { isHoneypotFilled } from "@/lib/honeypot";
import { communityEvents } from "@/lib/site";
import { SUCCESS, record } from "@/lib/submission";
import type { FormState } from "@/lib/types";

/*
  Every action opens with the honeypot. A filled one is a bot: it gets the
  normal success state, and nothing is stored, sent or counted.
*/

export async function submitRsvp(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  if (isHoneypotFilled(formData)) return SUCCESS;

  const { values, tooLong } = collect(formData, [
    "name",
    "email",
    "event",
    "eventDate",
    "guests",
  ]);

  const missing = missingFrom(values, ["name", "email", "event", "eventDate", "guests"]);
  if (missing.length > 0) {
    return reject("Please fill out all fields.", values, missing);
  }

  if (tooLong.length > 0) {
    return reject(tooLongMessage(tooLong), values, tooLong);
  }

  if (!isEmail(values.email)) {
    return reject("Please enter a valid email address.", values, ["email"]);
  }

  // The event is a hidden input set by the card the visitor opened, so a name
  // outside the list can only come from a hand-built request.
  if (invalidChoices(values, { event: OPTIONS.rsvpEvent }).length > 0) {
    return reject("Please choose one of our community events.", values, ["event"]);
  }

  // The event name was checked against this list just above, so it is found.
  const schedule = communityEvents.find((e) => e.name === values.event)!.schedule;
  if (!isUpcomingDate(values.eventDate, schedule)) {
    return reject("Please choose one of the upcoming dates.", values, ["eventDate"]);
  }
  const dateLabel = formatEventDate(values.eventDate);

  const guests = Number(values.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > 100) {
    return reject("Please enter a number of guests between 1 and 100.", values, [
      "guests",
    ]);
  }

  return record(
    {
      kind: "rsvp",
      event: values.event,
      eventDate: values.eventDate,
      name: values.name,
      email: values.email,
      guests,
    },
    {
      subject: `RSVP: ${values.event}, ${dateLabel} (${guests} ${guests === 1 ? "guest" : "guests"})`,
      heading: `New RSVP for ${values.event}`,
      fields: [
        { label: "Event", value: values.event },
        { label: "Date", value: dateLabel },
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
  if (isHoneypotFilled(formData)) return SUCCESS;

  const { values, tooLong } = collect(formData, [
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
    return reject("Please fill out all required fields.", values, missing);
  }

  if (tooLong.length > 0) {
    return reject(tooLongMessage(tooLong), values, tooLong);
  }

  if (!isEmail(values.email)) {
    return reject("Please enter a valid email address.", values, ["email"]);
  }

  if (!isPhone(values.phone)) {
    return reject("Please enter a valid phone number.", values, ["phone"]);
  }

  if (!isDate(values.eventDate)) {
    return reject("Please enter a valid wedding date.", values, ["eventDate"]);
  }

  const guests = Number(values.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > 500) {
    return reject("Please enter a valid guest count.", values, ["guests"]);
  }

  const badChoices = invalidChoices(values, {
    packageName: OPTIONS.weddingPackage,
    space: OPTIONS.space,
    tour: OPTIONS.tour,
  });
  if (badChoices.length > 0) {
    return reject("Please choose an option from the list.", values, badChoices);
  }

  const badTimes = (["startTime", "endTime"] as const).filter(
    (field) => values[field] && !isTime(values[field])
  );
  if (badTimes.length > 0) {
    return reject("Please enter a valid time.", values, [...badTimes]);
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

export async function submitVendorInquiry(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  if (isHoneypotFilled(formData)) return SUCCESS;

  const { values, tooLong } = collect(formData, [
    "name",
    "businessName",
    "email",
    "phone",
    "vendorCategory",
    // Not "website": that name belongs to the honeypot.
    "portfolio",
    "notes",
  ]);

  const missing = missingFrom(values, [
    "name",
    "businessName",
    "email",
    "phone",
    "vendorCategory",
  ]);
  if (missing.length > 0) {
    return reject("Please fill out all required fields.", values, missing);
  }

  if (tooLong.length > 0) {
    return reject(tooLongMessage(tooLong), values, tooLong);
  }

  if (!isEmail(values.email)) {
    return reject("Please enter a valid email address.", values, ["email"]);
  }

  if (!isPhone(values.phone)) {
    return reject("Please enter a valid phone number.", values, ["phone"]);
  }

  const badChoices = invalidChoices(values, {
    vendorCategory: OPTIONS.vendorCategory,
  });
  if (badChoices.length > 0) {
    return reject("Please choose an option from the list.", values, badChoices);
  }

  return record(
    {
      kind: "vendor",
      name: values.name,
      businessName: values.businessName,
      email: values.email,
      phone: values.phone,
      vendorCategory: values.vendorCategory,
      website: values.portfolio,
      notes: values.notes,
    },
    {
      subject: `Vendor Inquiry: ${values.businessName} (${values.vendorCategory})`,
      heading: "New Vendor Partnership Inquiry",
      fields: [
        { label: "Name", value: values.name },
        { label: "Business", value: values.businessName },
        { label: "Email", value: values.email },
        { label: "Phone", value: values.phone },
        { label: "Service", value: values.vendorCategory },
        { label: "Website or Social", value: values.portfolio },
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
  if (isHoneypotFilled(formData)) return SUCCESS;

  const { values, tooLong } = collect(formData, [
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
    return reject("Please fill out all required fields.", values, missing);
  }

  if (tooLong.length > 0) {
    return reject(tooLongMessage(tooLong), values, tooLong);
  }

  if (!isEmail(values.email)) {
    return reject("Please enter a valid email address.", values, ["email"]);
  }

  if (!isPhone(values.phone)) {
    return reject("Please enter a valid phone number.", values, ["phone"]);
  }

  if (!isDate(values.eventDate)) {
    return reject("Please enter a valid event date.", values, ["eventDate"]);
  }

  const badChoices = invalidChoices(values, {
    eventType: OPTIONS.eventType,
    space: OPTIONS.space,
  });
  if (badChoices.length > 0) {
    return reject("Please choose an option from the list.", values, badChoices);
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

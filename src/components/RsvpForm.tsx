"use client";

import { useActionState, useId } from "react";
import FormMessage from "./FormMessage";
import HoneypotField from "./HoneypotField";
import { submitRsvp } from "@/lib/actions";
import { upcomingDates, type Schedule } from "@/lib/community-dates";
import { requiredField } from "@/lib/form-a11y";
import { MAX_LENGTH } from "@/lib/form-limits";
import { initialFormState } from "@/lib/types";

const inputClass =
  "mt-1 w-full rounded-lg border border-foreground/20 bg-background px-3 py-2 text-foreground";
const labelClass = "block text-sm font-medium text-foreground";

export default function RsvpForm({
  event,
  schedule,
}: {
  event: string;
  schedule: Schedule;
}) {
  const [state, formAction, pending] = useActionState(
    submitRsvp,
    initialFormState,
  );
  // Refilled from the rejected submission. React resets the form once the
  // action resolves, and the reset restores each field to its defaultValue.
  const prior = state.values ?? {};

  /*
    Ids are generated, not fixed. Every RSVP card carries its own dialog and
    form, so a page with two cards would otherwise hold two "name" inputs, and
    a label could focus the field in the other, closed dialog.
  */
  const uid = useId();
  const idFor = (field: string) => `${uid}-${field}`;
  const messageId = idFor("message");
  const field = (name: string) => requiredField(state, name, messageId);

  /*
    Worked out from the event's schedule at the moment the form mounts, so the
    list is always current. The form only mounts once the dialog is opened, in
    the browser, which keeps a statically built page from shipping the dates
    that were upcoming on the day it was built.
  */
  const months = upcomingDates(schedule);

  return (
    <form action={formAction} className="space-y-4">
      {/* The event is chosen by the card the visitor opened, so there is no
          dropdown to re-answer. Still validated server-side in submitRsvp. */}
      <input type="hidden" name="event" value={event} />
      <HoneypotField id={idFor("website")} />

      <div>
        <label htmlFor={idFor("eventDate")} className={labelClass}>
          Date
        </label>
        {/* Keyed on the echoed value for the same reason as the inquiry
            forms: a select's defaultValue only applies at mount. */}
        <select
          key={`eventDate-${prior.eventDate ?? ""}`}
          id={idFor("eventDate")}
          name="eventDate"
          defaultValue={prior.eventDate}
          required
          {...field("eventDate")}
          className={inputClass}
        >
          {months.map((group) => (
            <optgroup key={group.month} label={group.month}>
              {group.dates.map((date) => (
                <option key={date.value} value={date.value}>
                  {date.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={idFor("name")} className={labelClass}>
            Name
          </label>
          <input
            id={idFor("name")}
            name="name"
            type="text"
            defaultValue={prior.name}
            maxLength={MAX_LENGTH.name}
            required
            {...field("name")}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={idFor("guests")} className={labelClass}>
            Number of Guests
          </label>
          <input
            id={idFor("guests")}
            name="guests"
            type="number"
            min={1}
            max={100}
            defaultValue={prior.guests}
            required
            {...field("guests")}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor={idFor("email")} className={labelClass}>
          Email
        </label>
        <input
          id={idFor("email")}
          name="email"
          type="email"
          defaultValue={prior.email}
          maxLength={MAX_LENGTH.email}
          required
          {...field("email")}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-secondary-accent disabled:opacity-60"
      >
        {pending ? "Sending..." : "RSVP"}
      </button>

      <FormMessage id={messageId} state={state} />
    </form>
  );
}

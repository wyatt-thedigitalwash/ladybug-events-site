"use client";

import { useActionState } from "react";
import Link from "next/link";
import FormMessage from "./FormMessage";
import HoneypotField from "./HoneypotField";
import { submitEventInquiry } from "@/lib/actions";
import { requiredField } from "@/lib/form-a11y";
import { MAX_LENGTH } from "@/lib/form-limits";
import { isCallBookingEnabled } from "@/lib/site";
import { initialFormState } from "@/lib/types";

const inputClass =
  "mt-1 w-full rounded-lg border border-foreground/20 bg-background px-3 py-2 text-foreground";
const labelClass = "block text-sm font-medium text-foreground";

const MESSAGE_ID = "event-inquiry-message";

export default function EventInquiryForm() {
  const [state, formAction, pending] = useActionState(
    submitEventInquiry,
    initialFormState,
  );
  /*
    Refilled from the rejected submission. React resets the form once the
    action resolves, and the reset restores each field to its defaultValue.

    Each select is additionally keyed on its echoed value: `defaultValue` on a
    select only sets the option's defaultSelected at mount and React does not
    update it on re-render, so without the key the reset snaps it back to its
    first option and silently discards what the visitor picked.
  */
  const prior = state.values ?? {};
  // aria-required, plus aria-invalid and the message as its description when
  // the last rejection named this field.
  const field = (name: string) => requiredField(state, name, MESSAGE_ID);

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full Name
          </label>
          <input
            id="name"
            name="name"
            defaultValue={prior.name}
            type="text"
            maxLength={MAX_LENGTH.name}
            required
            {...field("name")}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            defaultValue={prior.phone}
            type="tel"
            maxLength={MAX_LENGTH.phone}
            required
            {...field("phone")}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          defaultValue={prior.email}
          type="email"
          maxLength={MAX_LENGTH.email}
          required
          {...field("email")}
          className={inputClass}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="eventType" className={labelClass}>
            Event Type
          </label>
          <select
            key={`eventType-${prior.eventType ?? ""}`}
            id="eventType"
            name="eventType"
            defaultValue={prior.eventType}
            required
            {...field("eventType")}
            className={inputClass}
          >
            <option value="Birthday">Birthday</option>
            <option value="Baby Shower">Baby Shower</option>
            <option value="Baptism">Baptism</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="eventDate" className={labelClass}>
            Event Date
          </label>
          <input
            id="eventDate"
            name="eventDate"
            defaultValue={prior.eventDate}
            type="date"
            required
            {...field("eventDate")}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="space" className={labelClass}>
          Space Needed
        </label>
        <select
          key={`space-${prior.space ?? ""}`}
          id="space"
          name="space"
          defaultValue={prior.space}
          required
          {...field("space")}
          className={inputClass}
        >
          <option value="Indoor Only">Indoor Only ($500)</option>
          <option value="Indoor & Outdoor">Indoor & Outdoor ($775)</option>
          <option value="Not Sure Yet">Not Sure Yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="notes" className={labelClass}>
          Anything else we should know?
        </label>
        <textarea
          id="notes"
          name="notes"
          defaultValue={prior.notes}
          rows={4}
          maxLength={MAX_LENGTH.notes}
          className={inputClass}
        />
      </div>

      <HoneypotField id="event-inquiry-website" />

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-secondary-accent disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send Event Inquiry"}
      </button>

      <FormMessage id={MESSAGE_ID} state={state}>
        {state.status === "success" && isCallBookingEnabled() && (
          <>
            {" "}
            Next,{" "}
            <Link href="/contact/call" className="font-semibold underline hover:text-ladybug">
              schedule a call
            </Link>{" "}
            to talk it through.
          </>
        )}
      </FormMessage>
    </form>
  );
}

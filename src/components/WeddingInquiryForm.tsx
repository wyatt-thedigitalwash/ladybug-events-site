"use client";

import { useActionState } from "react";
import Link from "next/link";
import FormMessage from "./FormMessage";
import HoneypotField from "./HoneypotField";
import { submitWeddingInquiry } from "@/lib/actions";
import { requiredField } from "@/lib/form-a11y";
import { MAX_LENGTH } from "@/lib/form-limits";
import { initialFormState } from "@/lib/types";
import {
  isTourBookingEnabled,
  weddingGuestRange,
  weddingPackages,
} from "@/lib/site";

const inputClass =
  "mt-1 w-full rounded-lg border border-foreground/20 bg-background px-3 py-2 text-foreground";
const labelClass = "block text-sm font-medium text-foreground";

const MESSAGE_ID = "wedding-inquiry-message";

export default function WeddingInquiryForm() {
  const [state, formAction, pending] = useActionState(
    submitWeddingInquiry,
    initialFormState,
  );
  // Refilled from the rejected submission. React resets the form once the
  // action resolves, and the reset restores each field to its defaultValue.
  const prior = state.values ?? {};
  // aria-required, plus aria-invalid and the message as its description when
  // the last rejection named this field.
  const field = (name: string, hintId?: string) =>
    requiredField(state, name, MESSAGE_ID, hintId);

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
          <label htmlFor="eventDate" className={labelClass}>
            Wedding Date
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
        <div>
          <label htmlFor="guests" className={labelClass}>
            Estimated Guests
          </label>
          <input
            id="guests"
            name="guests"
            defaultValue={prior.guests}
            type="number"
            min={1}
            max={500}
            required
            {...field("guests", "guests-hint")}
            className={inputClass}
          />
          <p id="guests-hint" className="mt-1 text-xs text-foreground/85">
            We host {weddingGuestRange}. An estimate is fine.
          </p>
        </div>
      </div>

      {/*
        Package and space are two different questions that sound like one.
        Package is what is included (bring your own vendors, or bundled);
        space is how much of the property. A couple can want the all-inclusive
        package indoors only, so neither answer implies the other.

        Package gets the full width: its labels carry a price and truncate
        badly in a half-width select, and it is the question that decides which
        conversation the owners are about to have.

        Every select here is keyed on its echoed value. `defaultValue` on a
        select only sets the option's defaultSelected at mount and React does
        not update it on re-render, so without the key the post-action form
        reset snaps the select back to its first option and silently discards
        what the visitor picked. Text inputs do not need this; React keeps
        their value attribute in sync.
      */}
      <div>
        <label htmlFor="packageName" className={labelClass}>
          Package You&apos;re Considering
        </label>
        <select
          key={`packageName-${prior.packageName ?? ""}`}
          id="packageName"
          name="packageName"
          defaultValue={prior.packageName}
          required
          {...field("packageName")}
          className={inputClass}
        >
          {/* Driven by the package list so the wording cannot drift from what
              the Weddings page advertises. */}
          {weddingPackages.map((pkg) => (
            <option key={pkg.name} value={pkg.name}>
              {pkg.name}, from ${pkg.startingPrice.toLocaleString()}
            </option>
          ))}
          <option value="Not Sure Yet">Not sure yet, help me choose</option>
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="space" className={labelClass}>
            Space Needed
          </label>
          {/* Labels kept short so they do not truncate at half width. The
              package question above already carries the "whole venue" idea. */}
          <select
            key={`space-${prior.space ?? ""}`}
            id="space"
            name="space"
            defaultValue={prior.space}
            required
            {...field("space")}
            className={inputClass}
          >
            <option value="Indoor & Outdoor">Indoor &amp; Outdoor</option>
            <option value="Indoor Only">Indoor Only</option>
            <option value="Not Sure Yet">Not Sure Yet</option>
          </select>
        </div>
        <div>
          <label htmlFor="tour" className={labelClass}>
            Available to Tour?
          </label>
          <select
            key={`tour-${prior.tour ?? ""}`}
            id="tour"
            name="tour"
            defaultValue={prior.tour}
            required
            {...field("tour")}
            className={inputClass}
          >
            <option value="Yes, weekdays">Yes, weekdays</option>
            <option value="Yes, weekends">Yes, weekends</option>
            <option value="Yes, flexible">Yes, flexible</option>
            <option value="Not yet">Not yet</option>
          </select>
        </div>
      </div>

      <fieldset aria-describedby="hours-hint">
        <legend className={labelClass}>
          Hours You&apos;d Need the Venue{" "}
          <span className="font-normal text-foreground/85">(optional)</span>
        </legend>
        <p id="hours-hint" className="mt-1 text-xs text-foreground/85">
          Access runs 8:00 AM to 11:00 PM. Leave blank if you&apos;re not sure
          yet.
        </p>
        <div className="mt-2 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="startTime" className="sr-only">
              Start time
            </label>
            <input
              id="startTime"
              name="startTime"
              defaultValue={prior.startTime}
              type="time"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="endTime" className="sr-only">
              End time
            </label>
            <input
              id="endTime"
              name="endTime"
              defaultValue={prior.endTime}
              type="time"
              className={inputClass}
            />
          </div>
        </div>
      </fieldset>

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

      <HoneypotField id="wedding-inquiry-website" />

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-secondary-accent disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send Wedding Inquiry"}
      </button>

      <FormMessage id={MESSAGE_ID} state={state}>
        {state.status === "success" && isTourBookingEnabled() && (
          <>
            {" "}
            Next,{" "}
            <Link href="/contact/tour" className="font-semibold underline hover:text-ladybug">
              schedule a tour
            </Link>{" "}
            to see the space in person.
          </>
        )}
      </FormMessage>
    </form>
  );
}

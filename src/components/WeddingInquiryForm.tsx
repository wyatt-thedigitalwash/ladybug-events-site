"use client";

import { useActionState } from "react";
import { submitWeddingInquiry } from "@/lib/actions";
import { initialFormState } from "@/lib/types";

const inputClass =
  "mt-1 w-full rounded-lg border border-foreground/20 bg-background px-3 py-2 text-foreground";
const labelClass = "block text-sm font-medium text-foreground";

export default function WeddingInquiryForm() {
  const [state, formAction, pending] = useActionState(
    submitWeddingInquiry,
    initialFormState
  );

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full Name
          </label>
          <input id="name" name="name" type="text" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input id="phone" name="phone" type="tel" required className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input id="email" name="email" type="email" required className={inputClass} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="eventDate" className={labelClass}>
            Wedding Date
          </label>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="space" className={labelClass}>
            Space Needed
          </label>
          <select id="space" name="space" required className={inputClass}>
            <option value="Indoor & Outdoor">Whole Venue (Indoor & Outdoor)</option>
            <option value="Indoor Only">Indoor Only</option>
            <option value="Not Sure Yet">Not Sure Yet</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="tour" className={labelClass}>
          Available to Tour the Venue?
        </label>
        <select id="tour" name="tour" required className={inputClass}>
          <option value="Yes, weekdays">Yes, weekdays</option>
          <option value="Yes, weekends">Yes, weekends</option>
          <option value="Yes, flexible">Yes, flexible</option>
          <option value="Not yet">Not yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="notes" className={labelClass}>
          Anything else we should know?
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-secondary-accent disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send Wedding Inquiry"}
      </button>

      {state.status !== "idle" && (
        <p
          role="status"
          className={`text-sm ${
            state.status === "success" ? "text-secondary-accent" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}

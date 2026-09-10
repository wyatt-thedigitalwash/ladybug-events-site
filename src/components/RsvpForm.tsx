"use client";

import { useActionState } from "react";
import { submitRsvp } from "@/lib/actions";
import { initialFormState } from "@/lib/types";

export default function RsvpForm({ event }: { event: string }) {
  const [state, formAction, pending] = useActionState(
    submitRsvp,
    initialFormState
  );

  return (
    <form action={formAction} className="space-y-4">
      {/* The event is chosen by the card the visitor opened, so there is no
          dropdown to re-answer. Still validated server-side in submitRsvp. */}
      <input type="hidden" name="event" value={event} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-lg border border-foreground/20 bg-background px-3 py-2 text-foreground"
          />
        </div>
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-foreground">
            Number of Guests
          </label>
          <input
            id="guests"
            name="guests"
            type="number"
            min={1}
            required
            className="mt-1 w-full rounded-lg border border-foreground/20 bg-background px-3 py-2 text-foreground"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-foreground/20 bg-background px-3 py-2 text-foreground"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-secondary-accent disabled:opacity-60"
      >
        {pending ? "Sending..." : "RSVP"}
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

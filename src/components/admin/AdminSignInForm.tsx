"use client";

import { useActionState } from "react";
import { signInAction } from "@/app/admin/actions";
import { initialFormState } from "@/lib/types";

export default function AdminSignInForm() {
  const [state, formAction, pending] = useActionState(
    signInAction,
    initialFormState
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-foreground"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1 w-full rounded-lg border border-foreground/20 bg-background px-3 py-2 text-foreground"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-secondary-accent disabled:opacity-60"
      >
        {pending ? "Checking..." : "Sign In"}
      </button>

      {state.status === "error" && (
        <p role="status" className="text-sm text-ladybug">
          {state.message}
        </p>
      )}
    </form>
  );
}

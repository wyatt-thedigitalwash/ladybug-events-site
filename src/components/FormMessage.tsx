import type { ReactNode } from "react";
import type { FormState } from "@/lib/types";

/*
  The result line under a form.

  An error is role="alert", announced the moment it appears. A success is
  role="status", announced politely. Keyed on the status so switching between
  the two mounts a fresh live region rather than changing the role of one a
  screen reader has already registered. The id is what invalid fields point
  their aria-describedby at.

  14px, and both colours clear 4.5:1 on the page background: red-600 at 4.7,
  slate at 5.2.
*/
export default function FormMessage({
  id,
  state,
  children,
}: {
  id: string;
  state: FormState;
  children?: ReactNode;
}) {
  if (state.status === "idle") return null;
  const isError = state.status === "error";

  return (
    <p
      key={state.status}
      id={id}
      role={isError ? "alert" : "status"}
      className={`text-sm ${isError ? "text-red-600" : "text-secondary-accent"}`}
    >
      {state.message}
      {children}
    </p>
  );
}

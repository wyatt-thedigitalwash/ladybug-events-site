import type { FormState } from "./types";

/*
  Accessibility attributes for a required field in a server-action form.

  The field is marked aria-required. If the last rejection named it, it is
  also marked aria-invalid and described by the form's result message, so the
  reason is read out when the field takes focus. `hintId` is any help text the
  field already carries; it stays in the description either way.
*/
export function requiredField(
  state: FormState,
  name: string,
  messageId: string,
  hintId?: string
) {
  const invalid =
    state.status === "error" && (state.invalid?.includes(name) ?? false);
  const describedBy = [hintId, invalid ? messageId : null]
    .filter(Boolean)
    .join(" ");

  return {
    "aria-required": true,
    "aria-invalid": invalid || undefined,
    "aria-describedby": describedBy || undefined,
  };
}

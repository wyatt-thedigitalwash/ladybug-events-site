import { HONEYPOT_FIELD } from "@/lib/honeypot";

/*
  The trap input bots fill and people never see. See src/lib/honeypot.ts.

  `hidden` is display:none, which already removes it from the tab order and the
  accessibility tree. tabIndex, aria-hidden and autoComplete are belt and
  braces: they keep it out of reach even if a stylesheet fails to load, and
  stop a browser from autofilling it and silently discarding a real inquiry.
  The label is there so an automated accessibility check does not report an
  unlabeled input.
*/
export default function HoneypotField({ id }: { id: string }) {
  return (
    <div className="hidden" aria-hidden="true">
      <label htmlFor={id}>Leave this field empty</label>
      <input
        id={id}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}

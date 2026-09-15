/*
  Honeypot for the public forms.

  Each form carries one extra text input that is display:none, out of the tab
  order and hidden from assistive technology, so no person ever fills it. Form
  bots fill every input they find. A submission that arrives with it filled is
  answered with the normal success state and then dropped, so the bot learns
  nothing about why.

  Shared by the form markup and the server actions, so it holds no secrets.
*/
export const HONEYPOT_FIELD = "website";

export function isHoneypotFilled(formData: FormData): boolean {
  const value = formData.get(HONEYPOT_FIELD);
  if (value === null) return false;
  return typeof value === "string" ? value.trim() !== "" : true;
}

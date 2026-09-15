import "server-only";

import { saveSubmission } from "@/lib/db";
import { sendNotification, type EmailField } from "@/lib/email";
import { reject, type Values } from "@/lib/form-validation";
import { FORM_LIMIT, clientIp, takeToken } from "@/lib/rate-limit";
import { business } from "@/lib/site";
import type { FormState, SubmissionInput } from "@/lib/types";

/*
  What every public form hands back on success. Also what a filled honeypot
  gets, so a bot cannot tell it was dropped.
*/
export const SUCCESS: FormState = {
  status: "success",
  message: "Thanks! We'll be in touch soon.",
};

/*
  Store and notify. The two are independent on purpose: a submission that lands
  in the table but not the inbox is still recoverable from /admin, and one that
  lands in the inbox but not the table is still actionable. Only losing both is
  a failure the visitor needs to hear about.

  The rate limit is taken here, after validation, so a visitor correcting a
  rejected field is never counted against it. Only submissions that would
  actually reach the table and the inbox are. See src/lib/rate-limit.ts for why
  it is per instance.

  Kept out of src/lib/actions.ts: everything exported from a "use server" file
  becomes a callable endpoint, and this must only ever run after validation.
*/
export async function record(
  input: SubmissionInput,
  email: { subject: string; heading: string; fields: EmailField[] },
  values: Values
): Promise<FormState> {
  if (!takeToken(`${input.kind}:${await clientIp()}`, FORM_LIMIT)) {
    return reject(
      `Too many submissions in a short time. Please wait a few minutes and try again, or call us at ${business.phone}.`,
      values
    );
  }

  const [stored, notified] = await Promise.all([
    saveSubmission(input),
    sendNotification({ ...email, replyTo: input.email }),
  ]);

  if (!stored && !notified) {
    return reject(
      `We couldn't send that just now. Please try again in a moment, or call us at ${business.phone}.`,
      values
    );
  }

  return SUCCESS;
}

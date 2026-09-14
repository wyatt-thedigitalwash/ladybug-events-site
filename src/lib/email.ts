import "server-only";

import { Resend } from "resend";
import { business, notifyRecipients } from "@/lib/site";

/*
  Notification email for form submissions.

  Recipients default to the two addresses the client gave us and can be
  overridden per environment with LADYBUG_NOTIFY_EMAIL, so a preview deploy can
  point somewhere harmless without touching code.
*/
export function getRecipients(): string[] {
  const raw = process.env.LADYBUG_NOTIFY_EMAIL;
  if (!raw) return [...notifyRecipients];
  return raw
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

/*
  The sender must be on a domain verified in Resend. That is thedigitalwash.com
  here, not kdbugs.com, and it is set through LADYBUG_FROM_EMAIL.

  Resend verifies the sending domain, not the recipient, so sending from a
  verified domain reaches any address. The display name carries the venue so
  the owners see who it is from, and replyTo is set to the visitor on every
  send, so hitting reply goes to them rather than to the sending domain.

  The onboarding@resend.dev fallback below only delivers to the Resend
  account's own address. It is a last resort that keeps local development from
  erroring, never a production configuration.
*/
function getSender(): string {
  return (
    process.env.LADYBUG_FROM_EMAIL ??
    `${business.name} <onboarding@resend.dev>`
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type EmailField = { label: string; value: string | number | undefined };

/*
  Field values come straight from a visitor, so every one is escaped before it
  reaches the markup. Unescaped, a name containing a tag would break the email
  body and give anyone with the form a way to inject markup into the owners'
  inbox.
*/
function renderRows(fields: EmailField[]): string {
  return fields
    .filter((field) => field.value !== undefined && String(field.value).trim() !== "")
    .map(
      (field) => `
        <tr>
          <td style="padding:6px 16px 6px 0;color:#665054;opacity:0.7;vertical-align:top;white-space:nowrap;">
            ${escapeHtml(field.label)}
          </td>
          <td style="padding:6px 0;color:#665054;font-weight:600;vertical-align:top;">
            ${escapeHtml(String(field.value)).replace(/\n/g, "<br />")}
          </td>
        </tr>`
    )
    .join("");
}

function renderEmail(heading: string, fields: EmailField[]): string {
  return `
    <div style="font-family:Georgia,'Times New Roman',serif;background:#f4eeeb;padding:32px;">
      <div style="max-width:560px;margin:0 auto;background:#fefefe;border-radius:16px;padding:32px;">
        <h1 style="margin:0 0 24px;font-size:22px;color:#665054;">${escapeHtml(heading)}</h1>
        <table style="width:100%;border-collapse:collapse;font-family:Helvetica,Arial,sans-serif;font-size:14px;">
          ${renderRows(fields)}
        </table>
        <p style="margin:28px 0 0;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#665054;opacity:0.6;">
          Sent from ${escapeHtml(business.name)} website. Reply to this email to reach the sender directly.
        </p>
      </div>
    </div>`;
}

function renderText(heading: string, fields: EmailField[]): string {
  const lines = fields
    .filter((field) => field.value !== undefined && String(field.value).trim() !== "")
    .map((field) => `${field.label}: ${field.value}`);
  return [heading, "", ...lines].join("\n");
}

/*
  Never throws. A failed notification is reported to the caller as `false` so a
  submission that was stored successfully is not shown to the visitor as a
  failure.
*/
export async function sendNotification({
  subject,
  heading,
  fields,
  replyTo,
}: {
  subject: string;
  heading: string;
  fields: EmailField[];
  replyTo?: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipients = getRecipients();
  if (!apiKey || recipients.length === 0) return false;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: getSender(),
      to: recipients,
      // The owners can hit reply and land in the visitor's inbox rather than
      // copying the address out of the body.
      replyTo,
      subject,
      html: renderEmail(heading, fields),
      text: renderText(heading, fields),
    });
    if (error) {
      console.error("Resend rejected the notification", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Failed to send notification", error);
    return false;
  }
}

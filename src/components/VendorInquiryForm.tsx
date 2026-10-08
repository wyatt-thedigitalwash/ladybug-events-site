"use client";

import { useActionState } from "react";
import FormMessage from "./FormMessage";
import HoneypotField from "./HoneypotField";
import { submitVendorInquiry } from "@/lib/actions";
import { requiredField } from "@/lib/form-a11y";
import { MAX_LENGTH } from "@/lib/form-limits";
import { vendorCategories } from "@/lib/site";
import { initialFormState } from "@/lib/types";

const inputClass =
  "mt-1 w-full rounded-lg border border-foreground/20 bg-background px-3 py-2 text-foreground";
const labelClass = "block text-sm font-medium text-foreground";

const MESSAGE_ID = "vendor-inquiry-message";

export default function VendorInquiryForm() {
  const [state, formAction, pending] = useActionState(
    submitVendorInquiry,
    initialFormState,
  );
  // Refilled from the rejected submission, and the select keyed on its echoed
  // value, for the reasons set out in EventInquiryForm.
  const prior = state.values ?? {};
  const field = (name: string) => requiredField(state, name, MESSAGE_ID);

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your Name
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
          <label htmlFor="businessName" className={labelClass}>
            Business Name
          </label>
          <input
            id="businessName"
            name="businessName"
            defaultValue={prior.businessName}
            type="text"
            maxLength={MAX_LENGTH.businessName}
            required
            {...field("businessName")}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="vendorCategory" className={labelClass}>
            What You Do
          </label>
          <select
            key={`vendorCategory-${prior.vendorCategory ?? ""}`}
            id="vendorCategory"
            name="vendorCategory"
            defaultValue={prior.vendorCategory}
            required
            {...field("vendorCategory")}
            className={inputClass}
          >
            {vendorCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          {/* Named "portfolio", not "website": that name is the honeypot's,
              and filling it would silently drop the inquiry. */}
          <label htmlFor="portfolio" className={labelClass}>
            Website or Instagram{" "}
            <span className="font-normal text-foreground/85">(optional)</span>
          </label>
          <input
            id="portfolio"
            name="portfolio"
            defaultValue={prior.portfolio}
            type="text"
            maxLength={MAX_LENGTH.portfolio}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className={labelClass}>
          Tell us about your business
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

      <HoneypotField id="vendor-inquiry-website" />

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-secondary-accent disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send Vendor Inquiry"}
      </button>

      <FormMessage id={MESSAGE_ID} state={state} />
    </form>
  );
}

"use server";

import { revalidatePath } from "next/cache";
import { signIn, signOut } from "@/lib/admin-auth";
import { clientIp, isLimited, recordHit, type Limit } from "@/lib/rate-limit";
import type { FormState } from "@/lib/types";

/*
  Failed sign-ins allowed per address before the form stops checking. Only
  failures are counted, so the owners signing in and out never trip it. Per
  instance, like every limit in src/lib/rate-limit.ts: it slows guessing, and a
  strong password is still what actually protects the list.
*/
const SIGN_IN_LIMIT: Limit = { max: 5, windowMs: 15 * 60 * 1000 };

// Longer than any password anyone types. Stops an oversized post being hashed.
const MAX_PASSWORD_LENGTH = 256;

export async function signInAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = formData.get("password");
  const password = typeof raw === "string" ? raw : "";

  if (!password) {
    return { status: "error", message: "Enter the password." };
  }

  const key = `admin-sign-in:${await clientIp()}`;
  if (isLimited(key, SIGN_IN_LIMIT)) {
    return {
      status: "error",
      message: "Too many attempts. Wait a few minutes and try again.",
    };
  }

  if (password.length > MAX_PASSWORD_LENGTH || !(await signIn(password))) {
    recordHit(key, SIGN_IN_LIMIT);
    // Deliberately the same message whether the password was wrong or the
    // environment variable was never set, so the page gives nothing away.
    return { status: "error", message: "That password didn't work." };
  }

  revalidatePath("/admin");
  return { status: "success" };
}

export async function signOutAction(): Promise<void> {
  await signOut();
  revalidatePath("/admin");
}

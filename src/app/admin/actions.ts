"use server";

import { revalidatePath } from "next/cache";
import { signIn, signOut } from "@/lib/admin-auth";
import type { FormState } from "@/lib/types";

export async function signInAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = formData.get("password");
  const password = typeof raw === "string" ? raw : "";

  if (!password) {
    return { status: "error", message: "Enter the password." };
  }

  if (!(await signIn(password))) {
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

import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/*
  Password gate for /admin.

  One shared password in LADYBUG_ADMIN_PASSWORD, since the audience is the
  owners rather than a set of individual accounts. The cookie holds an HMAC of
  a fixed string keyed by the password, never the password itself, so a cookie
  lifted off a device does not hand over the password, and the value is
  verified rather than trusted.
*/
const COOKIE = "ladybug_admin";
const TOKEN_SUBJECT = "ladybug-admin-v1";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function tokenFor(password: string): string {
  return createHmac("sha256", password).update(TOKEN_SUBJECT).digest("hex");
}

function expectedToken(): string | null {
  const password = process.env.LADYBUG_ADMIN_PASSWORD;
  if (!password) return null;
  return tokenFor(password);
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.LADYBUG_ADMIN_PASSWORD);
}

function matches(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  // timingSafeEqual throws on a length mismatch, so that is checked first. The
  // expected side is always a fixed-length hex digest, never the password, so
  // the early return reveals only the digest length, which is public.
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function isSignedIn(): Promise<boolean> {
  const token = expectedToken();
  if (!token) return false;

  const value = (await cookies()).get(COOKIE)?.value;
  return Boolean(value) && matches(value as string, token);
}

export async function signIn(password: string): Promise<boolean> {
  const token = expectedToken();
  if (!token) return false;
  // Compared as digests, not as raw strings. Comparing the password directly
  // would return early on a length mismatch and leak the password's length
  // through response timing.
  if (!matches(tokenFor(password), token)) return false;

  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: MAX_AGE,
  });
  return true;
}

export async function signOut(): Promise<void> {
  (await cookies()).delete({ name: COOKIE, path: "/admin" });
}

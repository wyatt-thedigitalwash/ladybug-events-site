import "server-only";

import { headers } from "next/headers";

/*
  In-memory rate limiting for the public forms and the admin sign-in.

  This is a speed bump, not a wall. On Vercel each serverless instance keeps
  its own map, and a cold start begins empty, so a determined sender spread
  across instances gets more than the limit. It does stop the common case, a
  script hammering one warm function, from flooding the owners' inbox and the
  submissions table. A shared store (Upstash, Vercel KV) is the upgrade if that
  ever stops being enough.
*/

export type Limit = { max: number; windowMs: number };

/* Three submissions of any one form per visitor every five minutes. */
export const FORM_LIMIT: Limit = { max: 3, windowMs: 5 * 60 * 1000 };

type Entry = { times: number[]; windowMs: number };

const hits = new Map<string, Entry>();

// Past this many tracked keys, expired ones are cleared out so a stream of
// distinct addresses cannot grow the map for the life of the instance.
const SWEEP_THRESHOLD = 1000;

function recent(key: string, limit: Limit, now: number): number[] {
  const entry = hits.get(key);
  if (!entry) return [];
  const times = entry.times.filter((time) => now - time < limit.windowMs);
  if (times.length === 0) {
    hits.delete(key);
  } else {
    entry.times = times;
  }
  return times;
}

function sweep(now: number): void {
  if (hits.size < SWEEP_THRESHOLD) return;
  for (const [key, entry] of hits) {
    if (entry.times.every((time) => now - time >= entry.windowMs)) {
      hits.delete(key);
    }
  }
}

export function isLimited(key: string, limit: Limit): boolean {
  return recent(key, limit, Date.now()).length >= limit.max;
}

export function recordHit(key: string, limit: Limit): void {
  const now = Date.now();
  sweep(now);
  const times = recent(key, limit, now);
  hits.set(key, { times: [...times, now], windowMs: limit.windowMs });
}

/* Checks and counts in one step. False means the caller is over the limit. */
export function takeToken(key: string, limit: Limit): boolean {
  if (isLimited(key, limit)) return false;
  recordHit(key, limit);
  return true;
}

/*
  The visitor's address. On Vercel, x-forwarded-for is set by the platform and
  its first entry is the client. Anywhere else the header can be supplied by
  the client, so this is only as trustworthy as the proxy in front of the app.
  Requests with no address at all (local development) share one bucket.
*/
export async function clientIp(): Promise<string> {
  const list = await headers();
  const forwarded = list.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || list.get("x-real-ip")?.trim() || "unknown";
}

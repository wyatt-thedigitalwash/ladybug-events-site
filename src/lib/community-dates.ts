/*
  Upcoming dates for a recurring community event, for the RSVP form's date
  picker and the server-side check on what it posts.

  Dates are plain YYYY-MM-DD strings, worked out on UTC calendar days so no
  local timezone can shift one across midnight. "Today" is taken in Eastern
  time, where the venue is, whatever timezone the server or visitor is in.

  Shared by the client form and the server action, so it must stay free of
  server-only imports.
*/

export type Schedule = {
  // 0 is Sunday, 6 is Saturday, as Date.getUTCDay() counts them.
  weekday: number;
  // Which occurrences in the month, 1-based. Absent means every week.
  weeks?: readonly number[];
};

export type EventDate = { value: string; label: string };
export type EventMonth = { month: string; dates: EventDate[] };

const VENUE_TIME_ZONE = "America/New_York";

function todayAtVenue(now: Date): Date {
  // en-CA formats as YYYY-MM-DD.
  const iso = new Intl.DateTimeFormat("en-CA", {
    timeZone: VENUE_TIME_ZONE,
  }).format(now);
  return new Date(`${iso}T00:00:00Z`);
}

function toIso(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function lastDayOfNextMonth(today: Date): Date {
  // Day 0 of the month after next is the last day of next month.
  return new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + 2, 0));
}

function occursOn(date: Date, schedule: Schedule): boolean {
  if (date.getUTCDay() !== schedule.weekday) return false;
  if (!schedule.weeks) return true;
  const occurrence = Math.ceil(date.getUTCDate() / 7);
  return schedule.weeks.includes(occurrence);
}

/*
  Every date from today through the end of next month, grouped by month. Two
  months means the list is never empty, even when the last date this month has
  already passed, and it stays short enough to scan.
*/
export function upcomingDates(schedule: Schedule, now = new Date()): EventMonth[] {
  const today = todayAtVenue(now);
  const end = lastDayOfNextMonth(today);

  const months: EventMonth[] = [];
  for (let day = today; day <= end; day = new Date(day.getTime() + 86_400_000)) {
    if (!occursOn(day, schedule)) continue;
    const month = day.toLocaleDateString("en-US", {
      timeZone: "UTC",
      month: "long",
      year: "numeric",
    });
    const label = day.toLocaleDateString("en-US", {
      timeZone: "UTC",
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    const group = months.at(-1);
    if (group?.month === month) group.dates.push({ value: toIso(day), label });
    else months.push({ month, dates: [{ value: toIso(day), label }] });
  }
  return months;
}

/*
  Whether a posted date is one the form could have offered. The day before
  today is let through as well, so a visitor who opened the form just before
  midnight is not turned away for submitting just after it.
*/
export function isUpcomingDate(
  value: string,
  schedule: Schedule,
  now = new Date()
): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || toIso(date) !== value) return false;

  const today = todayAtVenue(now);
  const yesterday = new Date(today.getTime() - 86_400_000);
  const end = lastDayOfNextMonth(today);
  return date >= yesterday && date <= end && occursOn(date, schedule);
}

export function formatEventDate(value: string): string {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

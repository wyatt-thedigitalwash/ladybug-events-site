"use client";

import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import RsvpForm from "./RsvpForm";
import type { Schedule } from "@/lib/community-dates";

/*
  RSVP button that opens the form in a dialog.

  Uses the native <dialog> element rather than a hand-rolled overlay: it brings
  focus trapping, Escape to close, inert background content and the top layer
  with it, all of which are easy to get wrong by hand and all of which the ADA
  audit will look for.
*/
export default function RsvpButton({
  name,
  cadence,
  time,
  schedule,
  autoOpen = false,
}: {
  name: string;
  cadence: string;
  time: string;
  schedule: Schedule;
  autoOpen?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const headingId = useId();
  // Remount the form each time the dialog opens so a previous submission's
  // message never greets the next visitor.
  const [openCount, setOpenCount] = useState(0);
  // Seeded from the prop so the auto-open effect only has to talk to the
  // dialog element, without a synchronous setState behind it.
  const [state, setState] = useState<"closed" | "open" | "closing">(
    autoOpen ? "open" : "closed",
  );

  useEffect(() => {
    if (autoOpen) dialog.current?.showModal();
  }, [autoOpen]);

  // Hold the dialog open until its closing animation has run, then close it
  // for real. Calling close() straight away would remove the element on the
  // first frame and no one would ever see the exit.
  useEffect(() => {
    const el = dialog.current;
    if (state !== "closing" || !el) return;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      el.close();
      setState("closed");
      // Browsers restore focus on close(), but not when the dialog opened on
      // arrival from a link, where nothing had focus. Returning it to this
      // card's button covers both.
      trigger.current?.focus();
    };
    el.addEventListener("animationend", finish);
    const fallback = window.setTimeout(finish, 400);
    return () => {
      el.removeEventListener("animationend", finish);
      window.clearTimeout(fallback);
    };
  }, [state]);

  function open() {
    setOpenCount((n) => n + 1);
    dialog.current?.showModal();
    setState("open");
  }

  function requestClose() {
    setState((s) => (s === "open" ? "closing" : s));
  }

  return (
    <>
      {/* 40px tall; tap-target grows the hit area to 44 without resizing it. */}
      <button
        ref={trigger}
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="tap-target relative rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-secondary-accent"
      >
        RSVP
        <span className="sr-only"> for {name}</span>
      </button>

      <dialog
        ref={dialog}
        aria-labelledby={headingId}
        // Clicking the backdrop lands on the dialog itself, never on its content.
        // Keyboard users close with Escape or the close button instead.
        onClick={(e) => {
          if (e.target === dialog.current) requestClose();
        }}
        // Escape fires `cancel`; intercept it so the exit animation runs
        // instead of the browser closing the dialog instantly.
        onCancel={(e) => {
          e.preventDefault();
          requestClose();
        }}
        data-state={state === "closed" ? undefined : state}
        // `m-auto` restores what centres a modal dialog. Tailwind's reset zeroes
        // the margin the browser relies on, which pins it to the top-left.
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-3xl border border-foreground/10 bg-background p-0 text-foreground backdrop:bg-foreground/60 backdrop:backdrop-blur-sm"
      >
        <div className="relative p-8 md:p-10">
          <button
            type="button"
            onClick={requestClose}
            aria-label="Close RSVP form"
            className="tap-target absolute right-5 top-5 rounded-full p-1.5 text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
          >
            <X size={20} aria-hidden="true" />
          </button>

          <h2
            id={headingId}
            className="pr-8 text-2xl font-semibold text-foreground"
          >
            RSVP for {name}
          </h2>
          <p className="mt-1 text-sm text-foreground/85">
            {cadence}, {time}
          </p>

          {/* Not rendered until the dialog first opens, so the date list is
              built in the browser on the day it is read. See RsvpForm. */}
          {(openCount > 0 || autoOpen) && (
            <div className="mt-6">
              <RsvpForm key={openCount} event={name} schedule={schedule} />
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}

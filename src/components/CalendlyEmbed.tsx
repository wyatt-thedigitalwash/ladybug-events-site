"use client";

import { useEffect, useRef, useState } from "react";

/*
  Calendly's inline scheduler.

  Loaded on demand rather than through the app shell, so the only page that
  pays for the third-party script is the one that shows the scheduler. The
  Performance audit on the pre-launch list will otherwise find it on every
  route.

  The widget renders into a plain div once the script has run. If the script
  never arrives, blocked, offline, or Calendly is down, the fallback stays on
  screen instead of leaving an empty box, because a venue whose booking widget
  silently fails to render just looks broken.
*/
const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

export default function CalendlyEmbed({
  url,
  phone,
  phoneHref,
}: {
  url: string;
  phone: string;
  phoneHref: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "failed">(
    "loading"
  );

  useEffect(() => {
    let cancelled = false;

    function render() {
      if (cancelled || !container.current || !window.Calendly) return;
      window.Calendly.initInlineWidget({
        url,
        parentElement: container.current,
      });
      setStatus("ready");
    }

    if (window.Calendly) {
      render();
      return;
    }

    // Reuse the tag if one is already in the document, so a client-side
    // navigation back to this page does not append a second copy.
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`
    );
    const script = existing ?? document.createElement("script");
    const onLoad = () => render();
    const onError = () => !cancelled && setStatus("failed");

    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);

    if (!existing) {
      script.src = SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }

    const timeout = window.setTimeout(() => {
      if (!cancelled && !window.Calendly) setStatus("failed");
    }, 8000);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
    };
  }, [url]);

  return (
    <div>
      <div
        ref={container}
        // Calendly sizes its own iframe; this reserves the space so the page
        // does not jump when the widget lands.
        style={{ minWidth: 320, height: status === "ready" ? 700 : 0 }}
        className="overflow-hidden rounded-3xl"
      />

      {status !== "ready" && (
        <div className="rounded-3xl border border-dashed border-foreground/20 px-6 py-10 text-center">
          {status === "loading" ? (
            <p className="text-sm text-foreground/70">Loading the calendar...</p>
          ) : (
            <p className="text-sm leading-6 text-foreground/85">
              The booking calendar didn&apos;t load. Give us a call at{" "}
              <a
                href={phoneHref}
                className="font-semibold text-secondary-accent hover:text-ladybug"
              >
                {phone}
              </a>{" "}
              and we&apos;ll set up a time.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

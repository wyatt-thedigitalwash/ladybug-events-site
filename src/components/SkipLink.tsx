"use client";

export const MAIN_CONTENT_ID = "main-content";

/*
  "Skip to main content", the first focusable element on every page. Hidden
  until it takes keyboard focus.

  The href alone moves the page. The click handler also moves focus into
  <main>, which is what makes the next Tab, and a screen reader's reading
  position, start from the content in every browser. The tabindex that allows
  that is added only for the jump and removed on blur. Left on permanently, any
  click on plain text inside <main> would focus the whole element and reset
  where Tab continues from.
*/
export default function SkipLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      onClick={() => {
        const main = document.getElementById(MAIN_CONTENT_ID);
        if (!main) return;
        main.setAttribute("tabindex", "-1");
        main.focus();
        main.addEventListener("blur", () => main.removeAttribute("tabindex"), {
          once: true,
        });
      }}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-background"
    >
      Skip to main content
    </a>
  );
}

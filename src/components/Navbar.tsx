"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { business, navLinks } from "@/lib/site";

export const HOME_HERO_ID = "home-hero";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  // On the home page, watch the hero. The nav stays transparent while the hero
  // is under it and turns solid once the hero's bottom edge scrolls past the nav.
  useEffect(() => {
    if (!isHome) return;

    const hero = document.getElementById(HOME_HERO_ID);
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHome]);

  /*
    While the mobile menu is open, Escape closes it and returns focus to the
    toggle. Tab and Shift+Tab cycle through the bar and the menu rather than
    wandering into the page behind. Widening past the breakpoint closes it,
    since the menu is not shown there and the trap would otherwise keep
    holding focus.
  */
  useEffect(() => {
    if (!open) return;
    const bar = header.current;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        toggle.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !bar) return;

      // Only what is actually rendered: the desktop list is display:none here.
      const focusable = Array.from(
        bar.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ).filter((el) => el.getClientRects().length > 0);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (!bar.contains(active)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }

    const desktop = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  const transparent = isHome && !pastHero && !open;

  const headerClass = transparent
    ? "fixed inset-x-0 top-0 z-50 border-b border-transparent bg-transparent text-white transition-colors duration-300"
    : isHome
      ? "fixed inset-x-0 top-0 z-50 border-b border-foreground/10 bg-background/95 text-foreground backdrop-blur transition-colors duration-300"
      : "sticky top-0 z-50 border-b border-foreground/10 bg-background/95 text-foreground backdrop-blur";

  /*
    85% is the lowest step that clears 4.5:1 on the page background (80% was
    4.4). Over the hero photo, sampled at six viewport sizes under its dark
    gradient, white at 85% fell to 4.5 on the brightest pixels behind the
    links; 90% holds 4.8 and still leaves the hover to full white visible.
  */
  const linkClass = transparent
    ? "text-sm font-medium text-white/90 transition-colors hover:text-white"
    : "text-sm font-medium text-foreground/85 transition-colors hover:text-foreground";

  return (
    <header
      ref={header}
      className={headerClass}
      // Over the hero photo the focus ring switches to white; see globals.css.
      data-surface={transparent ? "dark" : undefined}
    >
      {/* The mobile menu sits inside the same landmark as the bar, so its links
          are announced as navigation too. */}
      <nav aria-label="Main navigation">
        <div className="flex w-full items-center justify-between px-6 py-4 lg:px-10">
          {/* Both marks render and cross-fade, so the swap follows the bar's own
              colour transition instead of flashing a newly-fetched file. */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="tap-target relative block h-10 w-[108px] shrink-0 md:h-[52px] md:w-[140px]"
            aria-label={business.name}
          >
            <Image
              src="/brand/ladybug-group-logo.svg"
              alt=""
              fill
              // Eager rather than preloaded: always above the fold, never the
              // LCP, and a preload on every route would compete with the
              // page's real LCP image.
              loading="eager"
              sizes="140px"
              className={`object-contain transition-opacity duration-300 ${
                transparent ? "opacity-0" : "opacity-100"
              }`}
            />
            <Image
              src="/brand/ladybug-group-logo-light.svg"
              alt=""
              fill
              loading="eager"
              sizes="140px"
              className={`object-contain transition-opacity duration-300 ${
                transparent ? "opacity-100" : "opacity-0"
              }`}
            />
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={linkClass}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            ref={toggle}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="tap-target relative flex items-center justify-center rounded-md p-2 md:hidden"
          >
            {open ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Always rendered, so the toggle's aria-controls always points at
            something; the hidden attribute keeps it out of view and out of
            the tab order while closed. */}
        <ul
          id="mobile-menu"
          hidden={!open}
          className="flex flex-col gap-1 border-t border-foreground/10 px-6 py-4 md:hidden"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === link.href ? "page" : undefined}
                className="block rounded-md px-2 py-3 text-base font-medium text-foreground/85 hover:bg-foreground/5 hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

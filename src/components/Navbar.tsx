"use client";

import { useEffect, useState } from "react";
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

  const transparent = isHome && !pastHero && !open;

  const headerClass = transparent
    ? "fixed inset-x-0 top-0 z-50 border-b border-transparent bg-transparent text-white transition-colors duration-300"
    : isHome
      ? "fixed inset-x-0 top-0 z-50 border-b border-foreground/10 bg-background/95 text-foreground backdrop-blur transition-colors duration-300"
      : "sticky top-0 z-50 border-b border-foreground/10 bg-background/95 text-foreground backdrop-blur";

  const linkClass = transparent
    ? "text-sm font-medium text-white/85 transition-colors hover:text-white"
    : "text-sm font-medium text-foreground/80 transition-colors hover:text-foreground";

  return (
    <header className={headerClass}>
      <nav
        aria-label="Primary"
        className="flex w-full items-center justify-between px-6 py-4 lg:px-10"
      >
        {/* Both marks render and cross-fade, so the swap follows the bar's own
            colour transition instead of flashing a newly-fetched file. */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="relative block h-10 w-[108px] shrink-0 md:h-[52px] md:w-[140px]"
          aria-label={business.name}
        >
          <Image
            src="/brand/ladybug-group-logo.svg"
            alt=""
            fill
            priority
            sizes="140px"
            className={`object-contain transition-opacity duration-300 ${
              transparent ? "opacity-0" : "opacity-100"
            }`}
          />
          <Image
            src="/brand/ladybug-group-logo-light.svg"
            alt=""
            fill
            priority
            sizes="140px"
            className={`object-contain transition-opacity duration-300 ${
              transparent ? "opacity-100" : "opacity-0"
            }`}
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex items-center justify-center rounded-md p-2 md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <ul
          id="mobile-menu"
          className="flex flex-col gap-1 border-t border-foreground/10 px-6 py-4 md:hidden"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-3 text-base font-medium text-foreground/80 hover:bg-foreground/5 hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

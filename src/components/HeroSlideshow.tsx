"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";

export type HeroSlide = { src: string; alt: string };

const INTERVAL_MS = 6000;

/*
  The home hero photos, cross-fading one into the next.

  Every slide is stacked in the same box and only its opacity changes, so the
  heading and buttons over it never move. The first slide is the LCP and is
  preloaded; the rest load behind it.

  WCAG 2.2.2 requires a way to stop anything that moves on its own for more
  than five seconds, hence the pause button. A visitor who has asked their
  system for reduced motion gets the first photo held still.
*/
export default function HeroSlideshow({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const playing = slides.length > 1 && !paused && !reducedMotion;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      INTERVAL_MS
    );
    return () => window.clearInterval(timer);
  }, [playing, slides.length]);

  return (
    <>
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          // Only the showing photo is announced. The others are the same
          // hero at another moment, not extra content.
          alt={i === active ? slide.alt : ""}
          aria-hidden={i === active ? undefined : true}
          fill
          // The LCP element at every viewport. `preload` replaces the
          // `priority` prop, deprecated in Next 16. Neither sets
          // fetchpriority, so it is passed explicitly.
          preload={i === 0}
          fetchPriority={i === 0 ? "high" : "low"}
          sizes="100vw"
          className={`object-cover transition-opacity duration-[1500ms] ease-in-out motion-reduce:transition-none ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {slides.length > 1 && !reducedMotion && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play slideshow" : "Pause slideshow"}
          className="tap-target absolute right-4 bottom-4 z-10 rounded-full bg-black/30 p-2 text-white/90 transition-colors hover:bg-black/50 hover:text-white md:right-6 md:bottom-6"
        >
          {paused ? (
            <Play size={16} aria-hidden="true" />
          ) : (
            <Pause size={16} aria-hidden="true" />
          )}
        </button>
      )}
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener("mousemove", move);

    let rafId = 0;
    const tick = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;

      // Smooth trailing ring movement.
      current.current.x += dx * 0.2;
      current.current.y += dy * 0.2;

      const speed = Math.min(Math.hypot(dx, dy), 24);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const squeeze = Math.min(speed / 120, 0.12);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) rotate(${angle}deg) scale(${1 + squeeze}, ${1 - squeeze})`;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", move);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[120] hidden md:block">
      <div
        ref={dotRef}
        className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff1a2c]"
      />
      <div
        ref={ringRef}
        className="absolute h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ff1a2c]/80"
      />
    </div>
  );
}

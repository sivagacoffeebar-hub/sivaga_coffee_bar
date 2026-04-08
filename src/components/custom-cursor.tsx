"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const sparkRef = useRef<HTMLDivElement | null>(null);
  const beanRef = useRef<HTMLDivElement | null>(null);
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

      if (sparkRef.current) {
        sparkRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y - 8}px, 0)`;
      }

      if (beanRef.current) {
        beanRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) rotate(${angle}deg) scale(${1 + squeeze}, ${1 - squeeze})`;
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
    <div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[220] hidden md:block">
      <div
        ref={sparkRef}
        className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8b06b]/95 blur-[0.2px]"
      />
      <div
        ref={beanRef}
        className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2"
      >
        <img src="/coffee-bean.png" alt="" className="h-full w-full object-contain" />
      </div>
    </div>
  );
}

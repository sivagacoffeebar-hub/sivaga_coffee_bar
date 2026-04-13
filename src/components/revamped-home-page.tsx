"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { CustomCursor } from "./custom-cursor";
import { SmoothScroll } from "./smooth-scroll";

const navItems = ["HOME", "ABOUT US", "MENU", "GALLERY", "CONTACT"];
const navTargets = ["hero", "company", "menu", "gallery", "contact"];
const menuShowcase = [
  {
    title: "Coffee",
    description:
      "Single-origin and filter blends with rich aroma, balanced body, and comforting finish in every cup.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    icon: "☕",
  },
  {
    title: "Tea",
    description:
      "Classic chai and herbal infusions brewed fresh to deliver smooth flavor and soothing warmth.",
    image:
      "https://www.sharmispassions.com/wp-content/uploads/2012/12/cardamom-tea3.jpg",
    icon: "/coffee-cup.png",
  },
  {
    title: "Snacks",
    description:
      "Crispy, savory, and sweet cafe bites crafted to pair perfectly with your hot beverage rituals.",
    image:
      "https://rakskitchen.net/wp-content/uploads/2014/01/11992861243_4552794670_z-500x500.jpg",
    icon: "◉",
  },
];
const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1800&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1800&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1800&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1800&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1800&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1800&q=80",
  },
];
const vibeCards = [
  {
    title: "Cozy Corners",
    text: "Warm lighting, relaxed seating, and a friendly atmosphere that makes every visit feel like home.",
  },
  {
    title: "Crafted Daily",
    text: "Freshly brewed coffee, handpicked ingredients, and snacks prepared with consistent quality.",
  },
  {
    title: "Community First",
    text: "A social-friendly space where quick meetings, family moments, and coffee breaks blend naturally.",
  },
];

function CoffeeBeanIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 3c4.9 0 8.7 3.1 8.7 7.3 0 4.6-4.2 9.7-8.7 9.7S3.3 14.9 3.3 10.3C3.3 6.1 7.1 3 12 3Z"
        fill="currentColor"
      />
      <path
        d="M15.3 4.8c1.1 2.8.5 6.5-2 9.6-1.8 2.2-4 3.5-6.1 4"
        stroke="#f7f6f3"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RevampedHomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const mouseDragTriggered = useRef(false);
  const collageRef = useRef<HTMLDivElement | null>(null);
  const wheelLastTriggerAt = useRef(0);
  const collageInView = useInView(collageRef, { once: true, margin: "-10%" });
  const [layoutStep, setLayoutStep] = useState(0);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);

  const collageLayouts = useMemo(
    () => [
      [
        { x: 48, y: 10, width: 320, height: 330, rotate: -2, z: 30 },
        { x: 0, y: 165, width: 248, height: 228, rotate: 2, z: 20 },
        { x: 255, y: 125, width: 208, height: 195, rotate: -1, z: 10 },
      ],
      [
        { x: 150, y: 8, width: 305, height: 328, rotate: 2, z: 30 },
        { x: 18, y: 160, width: 245, height: 230, rotate: -2, z: 20 },
        { x: 0, y: 35, width: 205, height: 190, rotate: 1, z: 10 },
      ],
      [
        { x: 84, y: 6, width: 310, height: 332, rotate: 1, z: 30 },
        { x: 210, y: 160, width: 250, height: 228, rotate: -2, z: 20 },
        { x: 0, y: 128, width: 210, height: 192, rotate: 2, z: 10 },
      ],
    ],
    [],
  );
  const collageLayoutCount = collageLayouts.length;

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 2100);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!collageInView) return;
    const timer = window.setInterval(() => {
      setLayoutStep((prev) => (prev + 1) % collageLayoutCount);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [collageInView, collageLayoutCount]);

  const nextSlide = () =>
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () =>
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  useEffect(() => {
    const timer = window.setInterval(() => {
      nextSlide();
    }, 3500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!menuOpen && !navMenuOpen) return;
    const closeOnScroll = () => {
      setMenuOpen(false);
      setNavMenuOpen(false);
    };
    window.addEventListener("scroll", closeOnScroll, { passive: true });
    window.addEventListener("wheel", closeOnScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", closeOnScroll);
      window.removeEventListener("wheel", closeOnScroll);
    };
  }, [menuOpen, navMenuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") nextSlide();
      if (event.key === "ArrowLeft") prevSlide();
      if (event.key === "Escape") setSelectedGalleryImage(null);
      if (event.key === "Escape") setMenuOpen(false);
      if (event.key === "Escape") setNavMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const goToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onHeroWheel = (event: React.WheelEvent<HTMLElement>) => {
    if (event.cancelable) {
      event.preventDefault();
    }
    const delta = event.deltaY || event.deltaX;
    if (Math.abs(delta) < 8) return;

    const now = Date.now();
    // Hard cooldown to prevent multi-skip from wheel inertia.
    if (now - wheelLastTriggerAt.current < 900) return;

    wheelLastTriggerAt.current = now;
    if (delta > 0) nextSlide();
    else prevSlide();
  };

  const onTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 40) return;
    if (distance < 0) nextSlide();
    else prevSlide();
  };

  const onMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    mouseStartX.current = event.clientX;
    mouseDragTriggered.current = false;
  };

  const onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (mouseStartX.current === null || (event.buttons & 1) !== 1) return;
    if (mouseDragTriggered.current) return;
    const distance = event.clientX - mouseStartX.current;
    if (Math.abs(distance) < 55) return;
    if (distance < 0) nextSlide();
    else prevSlide();
    mouseDragTriggered.current = true;
  };

  const onMouseUpOrLeave = () => {
    mouseStartX.current = null;
    mouseDragTriggered.current = false;
  };

  return (
    <SmoothScroll>
      <CustomCursor />
      <main className="relative bg-[radial-gradient(circle_at_top,#fffaf0_0%,#f6f1e7_40%,#ece3d6_100%)] text-[#1d1917]">
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="fixed inset-0 z-[260] flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.78)_0%,rgba(245,20,35,0.16)_38%,rgba(21,15,11,0.54)_100%)] backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative flex flex-col items-center"
              >
                <motion.div
                  animate={{ rotate: [0, -1.2, 1.2, -0.8, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="grid h-24 w-24 place-items-center overflow-hidden rounded-full border border-white/50 bg-white/70 shadow-[0_18px_45px_rgba(0,0,0,0.22)] sm:h-28 sm:w-28"
                >
                  <img
                    src="/logo.png"
                    alt="Sivaga Coffee Bar"
                    className="h-[116%] w-[116%] scale-110 object-cover"
                  />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.15 }}
                  className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-[#2d251f] sm:text-sm"
                >
                  Brewing Since 1997
                </motion.p>
                <div className="pointer-events-none absolute -top-6 left-1/2 h-3 w-3 -translate-x-16 rounded-full bg-[#fff7c4]/80" />
                <motion.div
                  animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.15, 0.8] }}
                  transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
                  className="pointer-events-none absolute -top-5 left-1/2 h-2 w-2 -translate-x-8 rounded-full bg-white/95"
                />
                <motion.div
                  animate={{ opacity: [0.2, 0.95, 0.2], scale: [0.75, 1.2, 0.75] }}
                  transition={{ duration: 1.35, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
                  className="pointer-events-none absolute -top-2 left-1/2 h-2.5 w-2.5 translate-x-10 rounded-full bg-[#ffeaa3]/95"
                />
                <motion.div
                  animate={{ opacity: [0.2, 0.95, 0.2], scale: [0.7, 1.1, 0.7] }}
                  transition={{ duration: 1.25, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="pointer-events-none absolute top-6 left-1/2 h-1.5 w-1.5 -translate-x-20 rounded-full bg-white"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <section
          id="hero"
          className="relative min-h-[430px] touch-pan-y overflow-hidden bg-[#f51423] px-4 pb-8 pt-4 text-white sm:min-h-[480px] md:min-h-[520px] md:px-12 lg:min-h-[88vh]"
          onWheel={onHeroWheel}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          onMouseLeave={onMouseUpOrLeave}
        >
          {heroSlides.map((slide, index) => (
            <motion.img
              key={slide.image}
              src={slide.image}
              alt="Hero slide background"
              initial={false}
              animate={{
                opacity: index === activeSlide ? 1 : 0,
                scale: index === activeSlide ? 1 : 1.015,
              }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/32 via-black/12 to-transparent" />
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-[#ffec99]/45 blur-xl" />
            <div className="absolute -right-10 -top-8 h-28 w-28 rounded-full bg-[#ffec99]/45 blur-xl" />
            <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-[#ffec99]/45 blur-xl" />
            <div className="absolute -bottom-8 right-1/3 h-28 w-28 rounded-full bg-[#ffec99]/45 blur-xl" />
          </div>
          <div className="relative z-10 mb-6 flex w-full max-w-full flex-col rounded-2xl bg-[#ef2332] px-3 py-2.5 sm:mb-8 sm:rounded-[2rem] sm:px-5 sm:py-3.5 md:px-6 md:py-4">
            <div className="grid min-h-[3.25rem] w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 gap-y-1 sm:min-h-0 sm:gap-x-3">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className="shrink-0 justify-self-start rounded-full transition hover:ring-2 hover:ring-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
              >
                <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full border-2 border-white bg-white sm:h-12 sm:w-12 md:h-14 md:w-14">
                  <img
                    src="/logo.png"
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </span>
              </button>
              <div className="flex min-w-0 flex-col items-center justify-center gap-0.5 text-center md:gap-1.5 overflow-hidden">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.12 }}
                  className="w-full text-center text-[16px] font-black uppercase leading-[1.15] tracking-[0.05em] text-[#fff2b8] sm:text-xl sm:tracking-[0.08em] md:text-2xl md:tracking-[0.1em] lg:text-4xl lg:tracking-[0.12em]"
                >
                  Sivaga Coffee Bar
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.2 }}
                  className="w-full text-center text-[8px] uppercase tracking-[0.22em] text-white/90 sm:text-[10px] sm:tracking-[0.24em] md:text-xs lg:text-sm lg:tracking-[0.3em]"
                >
                  BLENDED WITH TRADITIONAL
                </motion.p>
              </div>
              <button
                type="button"
                onClick={() => setNavMenuOpen(true)}
                aria-label="Open navigation menu"
                className="grid h-11 w-11 shrink-0 place-items-center justify-self-end rounded-full border border-white/40 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 sm:h-12 sm:w-12 md:h-14 md:w-14"
              >
                <Menu className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>
          </div>
          <div className="absolute bottom-8 left-0 z-10 flex w-full justify-center gap-3 sm:bottom-14">
            {heroSlides.map((_, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => setActiveSlide(index)}
                className={`group relative rounded-full transition ${activeSlide === index ? "w-7" : "w-2.5"
                  } h-2.5`}
                aria-label={`Go to slide ${index + 1}`}
              >
                <span
                  className={`absolute inset-0 rounded-full transition ${activeSlide === index ? "bg-white" : "bg-white/55"
                    }`}
                />
              </button>
            ))}
          </div>
          <svg
            viewBox="0 0 1440 96"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 z-20 h-20 w-full"
          >
            <defs>
              <filter id="tearShadow" x="-20%" y="-20%" width="140%" height="160%">
                <feDropShadow dx="0" dy="-1" stdDeviation="1.8" floodColor="#000" floodOpacity="0.2" />
              </filter>
            </defs>
            <path
              d="M0,58 C32,74 58,47 86,61 C112,74 146,44 176,59 C205,73 236,48 266,60 C296,72 325,45 356,58 C387,72 415,46 446,60 C476,74 508,47 538,61 C568,75 598,45 628,58 C659,71 688,46 718,60 C748,74 778,47 808,60 C838,73 868,45 898,58 C929,72 959,46 989,60 C1019,74 1049,47 1079,61 C1109,75 1139,46 1169,59 C1199,72 1229,47 1259,60 C1289,73 1319,46 1349,58 C1379,70 1410,48 1440,56 L1440,96 L0,96 Z"
              fill="#f2f2f2"
              filter="url(#tearShadow)"
            />
            <path
              d="M0,54 C35,66 62,43 90,55 C118,67 148,42 178,54 C208,66 238,44 268,55 C298,66 328,43 358,54 C388,66 418,44 448,55 C478,66 508,43 538,55 C568,67 598,43 628,54 C658,65 688,43 718,55 C748,67 778,44 808,55 C838,66 868,43 898,54 C928,66 958,43 988,55 C1018,67 1048,44 1078,55 C1108,66 1138,43 1168,54 C1198,66 1228,44 1258,55 C1288,66 1318,43 1348,54 C1378,65 1410,45 1440,53"
              fill="none"
              stroke="#fffdf9"
              strokeOpacity="0.65"
              strokeWidth="2"
            />
          </svg>
        </section>

        <section id="company" className="mx-auto w-full max-w-[85rem] px-4 py-12 sm:px-6 md:px-8 lg:py-16">
          <div className="relative block flow-root rounded-[2.5rem] border border-[#ffffffb3] bg-[radial-gradient(circle_at_12%_20%,rgba(195,125,57,0.34),transparent_40%),radial-gradient(circle_at_92%_78%,rgba(245,20,35,0.22),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.82),rgba(245,236,224,0.82))] p-6 shadow-md lg:p-10 after:table after:clear-both">
            
            {/* Floated Magazine Cards */}
            <div className="relative z-20 mb-8 float-none flex w-full flex-col items-stretch gap-6 sm:flex-row md:mb-6 md:ml-8 md:w-[60%] md:float-right lg:ml-12 lg:w-[55%] lg:gap-8 xl:w-[45%]">
              
              {/* Stats (Red Box) */}
              <div className="flex w-full flex-col justify-center rounded-[2rem] bg-[#f51423] p-6 text-center text-white sm:p-8">
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.35 }}
                  className="text-5xl font-black"
                >
                  1000+
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.35, delay: 0.08 }}
                  className="mt-2 text-xs font-black uppercase tracking-[0.2em]"
                >
                  Happy customers every day
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.35, delay: 0.14 }}
                  className="mx-auto mt-2 max-w-[20rem] text-xs leading-5 text-white/90"
                >
                  Serving freshly brewed taste and warm hospitality from morning till closing time.
                </motion.p>
                <div className="mb-6 mt-6 h-px w-full bg-white/30" />
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.35, delay: 0.2 }}
                  className="text-5xl font-black"
                >
                  99%
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.35, delay: 0.26 }}
                  className="mt-2 text-xs font-black uppercase tracking-[0.2em]"
                >
                  Customer satisfaction
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.35, delay: 0.32 }}
                  className="mx-auto mt-2 max-w-[20rem] text-xs leading-5 text-white/90"
                >
                  Built on consistent quality, quick service, and memorable coffee moments.
                </motion.p>
              </div>

              {/* Feature (Brown Box) */}
              <div className="flex w-full flex-col justify-center rounded-[2rem] bg-[linear-gradient(145deg,#2a1f18,#4a3428)] p-6 text-white md:p-6 lg:p-8">
                <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#f5c083]">Today&apos;s special</p>
                <h3 className="mb-3 text-3xl font-black uppercase leading-tight">
                  Signature
                  <br />
                  Filter Blend
                </h3>
                <p className="mb-6 text-sm leading-6 text-white/80">
                  Slow-brewed South Indian filter coffee with balanced roast notes, velvety crema, and a warm aromatic finish.
                </p>
                <div className="rounded-xl border border-white/25 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#f5c083]">
                    Artisan Notes
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/90">
                    Hand-roasted beans, slow decoction drip, and a silky finish inspired by traditional South Indian coffee craft.
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#ffd58b]" />
                    <span className="h-2 w-2 rounded-full bg-white/80" />
                    <span className="h-2 w-2 rounded-full bg-[#ffd58b]" />
                    <span className="ml-2 text-xs uppercase tracking-[0.18em] text-white/75">
                      Freshly brewed all day
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="relative z-10 block">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.4 }}
                className="mb-3 text-xs uppercase tracking-[0.25em] text-[#9f9185]"
              >
                Since 1997
              </motion.p>
              <h2 className="mb-5 text-[28px] font-black uppercase leading-[1.05] sm:text-3xl lg:text-3xl xl:text-4xl">
                There&apos;s A Whole World
                <br />
                In Your Cup
              </h2>
              <div className="mb-6 space-y-4 text-sm leading-7 text-[#6f6258]">
                <p>Our journey began in 1997 with a simple ambition: to start something of our own in the food industry.</p>
                <p>In the early days, we were involved in supplying raw materials to catering services, hostel messes, and hotels. From fresh vegetables and fruits to essential items like pulses and cooking oil, we supported kitchens with quality ingredients and reliable service.</p>
                <p>With growing experience and confidence, we took a step forward and started a small hotel and a tea stall. While these ventures helped us learn and grow, managing multiple businesses at the same time became increasingly challenging.</p>
                <p>By 2000, we made the difficult decision to shut down all our operations and step away from the food industry entirely. We then moved on to explore opportunities in other industries, seeking stability and new directions.</p>
                <p>However, true passion has a way of bringing you back.</p>
                <p>Today, after 25 years, we proudly return to the food industry with a strong brand identity, enriched experience, and a clear vision for the future. This is not just a restart-it marks the beginning of a new chapter built on trust, quality, and lasting value.</p>
              </div>
              <ul className="space-y-3 text-sm font-black uppercase tracking-[0.12em] text-[#d22d33] clear-none">
                <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-[#d22d33]" /> Innovative and thoughtful</li>
                <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-[#d22d33]" /> Quality and commitment</li>
                <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-[#d22d33]" /> Affordable and luxurious</li>
              </ul>
            </div>

          </div>
        </section>

        <section id="menu" className="relative mx-auto mb-12 grid max-w-7xl gap-6 px-4 py-4 md:grid-cols-3 md:px-12">
          <div className="pointer-events-none absolute inset-0 z-0 rounded-3xl border border-[#ffffffb3] bg-[radial-gradient(circle_at_20%_10%,rgba(255,236,201,0.5),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.7),rgba(241,226,205,0.88))]" />
          {menuShowcase.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -12, scale: 1.01 }}
              className="group relative z-10 min-h-[340px] overflow-hidden rounded-2xl border border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.2)] sm:min-h-[380px] lg:min-h-[420px]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/45 transition duration-500 group-hover:bg-black/58" />

              <div className="absolute inset-3 rounded-2xl border border-white/35 opacity-0 transition duration-300 group-hover:opacity-100" />

              <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-8 text-center text-white">
                <motion.div
                  initial={{ opacity: 0.8 }}
                  whileHover={{ scale: 1.06 }}
                  className="mb-3"
                >
                  {item.title === "Tea" ? (
                    <img
                      src={item.icon}
                      alt="Tea icon"
                      className="h-14 w-14 object-contain"
                    />
                  ) : (
                    <p className="text-6xl">{item.icon}</p>
                  )}
                </motion.div>
                <h3 className="text-4xl font-black uppercase tracking-wide">{item.title}</h3>
                <div className="my-2 h-1 w-16 rounded-full bg-white/70" />
                <p className="mt-2 max-h-36 overflow-hidden text-sm leading-7 text-white/95 opacity-100 transition-all duration-500 lg:mt-0 lg:max-h-0 lg:opacity-0 lg:group-hover:mt-2 lg:group-hover:max-h-36 lg:group-hover:opacity-100">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </section>

        <section className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 pb-12 pt-5 md:grid-cols-2 md:px-12 md:py-12">
          <div className="pointer-events-none absolute inset-0 z-0 rounded-3xl border border-[#ffffffb3] bg-[radial-gradient(circle_at_80%_30%,rgba(245,20,35,0.2),transparent_35%),radial-gradient(circle_at_10%_80%,rgba(194,128,61,0.28),transparent_38%),linear-gradient(120deg,rgba(255,255,255,0.72),rgba(235,228,218,0.9))]" />
          <div className="relative z-10 flex min-h-[360px] items-start justify-center sm:min-h-[420px] md:min-h-[520px] md:items-center">
            <div className="w-full max-w-[620px] lg:hidden">
              <div className="mb-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8f7a67]">
                  Gallery Highlights
                </p>
                <h4 className="mt-0 text-2xl font-black uppercase leading-tight text-[#2b221c] md:hidden">
                  Signature Sip Frames
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1100&q=80",
                    title: "Velvet Roast Stories",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1100&q=80",
                    title: "Midnight Mocha Mood",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1100&q=80",
                    title: "Sunrise Sip Sessions",
                  },
                ].map((item, idx) => (
                  <div
                    key={`mobile-collage-${idx}`}
                    className={`${idx === 0 ? "col-span-2 h-56 sm:h-64 md:h-72" : "h-40 sm:h-48 md:h-56"} relative overflow-hidden rounded-2xl border-2 border-white/60 shadow-[0_12px_30px_rgba(0,0,0,0.18)]`}
                  >
                    <img src={item.src} alt="Sivaga ambience" className="h-full w-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-3 pb-3 pt-8">
                      <p className="inline-flex rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#2b221c] sm:text-xs md:hidden">
                        {item.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              ref={collageRef}
              className="relative hidden h-[540px] w-full max-w-[560px] items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(60,42,31,0.08)_64%,rgba(60,42,31,0.16)_100%)] lg:flex"
            >
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[radial-gradient(circle_at_12%_120%,rgba(255,255,255,0.3),transparent_45%),radial-gradient(circle_at_88%_120%,rgba(255,255,255,0.26),transparent_45%)]" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-12 w-full bg-[linear-gradient(to_top,rgba(34,24,18,0.22),rgba(34,24,18,0))]" />
              <svg
                viewBox="0 0 600 90"
                preserveAspectRatio="none"
                className="pointer-events-none absolute bottom-2 left-0 h-14 w-full opacity-70"
              >
                <path
                  d="M0,65 C40,48 80,78 120,60 C160,43 200,75 240,58 C280,41 320,74 360,57 C400,41 440,73 480,56 C520,40 560,72 600,54 L600,90 L0,90 Z"
                  fill="rgba(255,255,255,0.24)"
                />
              </svg>
              <div className="pointer-events-none absolute bottom-3 right-4 flex gap-2 opacity-60">
                <span className="h-3 w-2 rotate-12 rounded-full border border-white/70" />
                <span className="h-3 w-2 -rotate-6 rounded-full border border-white/70" />
                <span className="h-3 w-2 rotate-6 rounded-full border border-white/70" />
              </div>
              <div className="relative h-[450px] w-[510px]">
                {[
                  {
                    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1100&q=80",
                    alt: "Sivaga shop ambience",
                    enter: { x: -120, y: -80, rotate: -8, opacity: 0 },
                  },
                  {
                    src: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1100&q=80",
                    alt: "Coffee bar interior",
                    enter: { x: 120, y: 60, rotate: 8, opacity: 0 },
                  },
                  {
                    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1100&q=80",
                    alt: "Coffee and snack table",
                    enter: { x: -80, y: 110, rotate: -10, opacity: 0 },
                  },
                ].map((image, idx) => (
                  <motion.img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    initial={image.enter}
                    animate={
                      collageInView
                        ? {
                          x: collageLayouts[layoutStep][idx].x,
                          y: collageLayouts[layoutStep][idx].y,
                          width: collageLayouts[layoutStep][idx].width,
                          height: collageLayouts[layoutStep][idx].height,
                          rotate: collageLayouts[layoutStep][idx].rotate,
                          zIndex: collageLayouts[layoutStep][idx].z,
                          opacity: 1,
                        }
                        : image.enter
                    }
                    transition={{
                      opacity: { duration: 0.45, delay: idx * 0.12 },
                      default: { duration: 0.85, ease: [0.22, 0.61, 0.36, 1] },
                    }}
                    className="absolute rounded-2xl border-4 border-white/65 object-cover shadow-xl"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="relative z-10 py-6 sm:py-8 lg:p-8 lg:pr-4">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#9f9185]">Coffeehouse vibes</p>
            <h3 className="mb-4 text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
              A Place You
              <br />
              Love To Return
            </h3>
            <p className="mb-6 text-sm leading-7 text-[#6f6258]">
              From your first sip to your last conversation, every corner of
              Sivaga is designed to feel uplifting, delicious, and memorable.
            </p>
            <div className="space-y-3">
              {vibeCards.map((item) => (
                <motion.article
                  key={item.title}
                  whileHover={{ y: -4 }}
                  className="rounded-xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur"
                >
                  <p className="mb-1 text-sm font-black uppercase tracking-[0.14em] text-[#f51423]">
                    {item.title}
                  </p>
                  <p className="text-sm leading-6 text-[#5f5349]">{item.text}</p>
                </motion.article>
              ))}
            </div>
            <button className="mt-5 rounded bg-[#f51423] px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-white">
              Explore Our Stores
            </button>
          </div>
        </section>

        <section id="gallery" className="mx-auto max-w-7xl px-4 py-12 md:px-12">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#9f9185]">Gallery</p>
              <h3 className="text-3xl font-black uppercase text-[#2b221c] sm:text-4xl lg:text-5xl">Happy Day Moments</h3>
            </div>
            <p className="hidden max-w-sm text-sm text-[#6f6258] md:block">
              A lively glimpse of our coffee stories, warm ambience, and snacks
              that keep customers coming back.
            </p>
          </div>
          <div className="grid min-h-[400px] gap-4 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
            {[
              "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1400&q=80",
              "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1100&q=80",
              "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?auto=format&fit=crop&w=1100&q=80",
            ].map((img, idx) => (
              <motion.article
                key={img}
                whileHover={{ y: -8, scale: 1.01 }}
                onClick={() => setSelectedGalleryImage(img)}
                className={`group relative overflow-hidden rounded-2xl border border-white/40 shadow-[0_12px_32px_rgba(0,0,0,0.18)] ${idx === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <img
                  src={img}
                  alt="Sivaga gallery"
                  className="h-full min-h-[260px] w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 z-10">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/80">
                    {idx === 0 ? "Store Vibes" : idx === 1 ? "Coffee Craft" : "Festive Crowd"}
                  </p>
                  <p className="text-lg font-black uppercase text-white">
                    {idx === 0 ? "Crowded Evenings" : idx === 1 ? "Freshly Brewed" : "Moments & Memories"}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 pb-14 md:px-12">
          <div className="relative overflow-hidden rounded-3xl border border-[#d7cec2] bg-[linear-gradient(140deg,#f8f1e8,#efe3d5_60%,#eadbc9)] p-5 md:p-7">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#f51423]/10 blur-2xl" />
            <div className="pointer-events-none absolute -left-12 bottom-0 h-36 w-36 rounded-full bg-[#8fbc84]/20 blur-2xl" />

            <div className="grid gap-5 md:grid-cols-[1fr_1.2fr]">
              <div className="rounded-2xl bg-[linear-gradient(155deg,#2d241f,#4a392f)] p-7 text-white shadow-lg">
                <p className="mb-2 text-xs uppercase tracking-[0.22em] text-[#e6be96]">Contact Details</p>
                <p className="mb-5 text-3xl font-black uppercase leading-tight">Sivaga Coffee Bar</p>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-white/70">Corporator Office</p>
                    <p className="font-medium">
                      No 10, Santhosh Garden 2, Parvathi Nagar,
                      Tiruvannamalai, Tamil Nadu, India - 606603
                    </p>
                  </div>
                  <div>
                    <p className="text-white/70">Phone</p>
                    <p className="font-bold text-lg">+91 90922 99797</p>
                  </div>
                  <div>
                    <p className="text-white/70">Email</p>
                    <p className="font-medium">sivagacoffeebar@gmail.com</p>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps?q=Corporator+Office+Tiruvannamalai+Tamil+Nadu+India+606603"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block rounded bg-[#f51423] px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white"
                >
                  Open in Google Maps
                </a>
              </div>

              <div className="overflow-hidden rounded-2xl border border-[#d8d1c7] bg-white p-2 shadow-lg">
                <div className="h-full min-h-[320px] overflow-hidden rounded-xl">
                  <iframe
                    title="Sivaga Coffee Bar Office Map"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=79.0400%2C12.2000%2C79.1100%2C12.2700&layer=mapnik&marker=12.2253%2C79.0747"
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <AnimatePresence>
          {navMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[96] bg-black/30 p-4 md:p-8"
              onClick={() => setNavMenuOpen(false)}
            >
              <motion.div
                initial={{ x: 28, opacity: 0, scale: 0.98 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: 20, opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="ml-auto mr-2 mt-20 w-[min(90vw,360px)] overflow-hidden rounded-[1.6rem] border border-white/40 bg-[#faf8f4] text-left shadow-[0_18px_44px_rgba(0,0,0,0.28)] md:mr-10 md:mt-24"
              >
                <div className="bg-[radial-gradient(circle_at_top_right,rgba(245,20,35,0.12),transparent_44%),linear-gradient(180deg,#fffdf9,#f3efe8)] px-5 pb-5 pt-4">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8c7e72]">
                      Navigation
                    </p>
                    <button
                      type="button"
                      onClick={() => setNavMenuOpen(false)}
                      className="grid h-8 w-8 place-items-center rounded-full bg-[#f51423] text-white"
                      aria-label="Close navigation menu"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <nav aria-label="Section navigation" className="space-y-1.5">
                    {navItems.map((item, idx) => (
                      <motion.button
                        key={`nav-popup-${item}`}
                        initial={{ opacity: 0, x: 14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.28, delay: 0.05 + idx * 0.06 }}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          goToSection(navTargets[idx]);
                          setNavMenuOpen(false);
                        }}
                        className="group flex w-full items-center justify-between rounded-xl border border-[#e2d9cf] bg-white/70 px-4 py-3 text-sm font-black uppercase tracking-[0.14em] text-[#2b221c] transition hover:border-[#f51423]/40 hover:bg-[#fff5f1]"
                      >
                        <span>{item}</span>
                        <span className="text-[#f51423] transition group-hover:translate-x-1">
                          →
                        </span>
                      </motion.button>
                    ))}
                  </nav>
                </div>
              </motion.div>
            </motion.div>
          )}

          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[95] bg-black/35 p-4 md:p-8"
              onClick={() => setMenuOpen(false)}
            >
              <motion.div
                initial={{ y: -12, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -14, opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="mr-auto ml-2 mt-20 w-[min(90vw,350px)] overflow-hidden rounded-[1.6rem] border border-white/40 bg-[#f7f6f3] text-center shadow-[0_18px_44px_rgba(0,0,0,0.26)] md:ml-10 md:mt-24"
              >
                <div className="relative bg-[radial-gradient(circle_at_top_right,rgba(245,20,35,0.12),transparent_42%),linear-gradient(180deg,#fbfaf8,#f1efea)] px-5 pb-5 pt-4">
                  <div className="mb-4 flex items-start justify-start">
                    <button
                      type="button"
                      onClick={() => setMenuOpen(false)}
                      className="grid h-8 w-8 place-items-center rounded-full bg-[#f51423] text-white"
                      aria-label="Close menu"
                    >
                      <X className="h-3.5 w-3.5" aria-hidden />
                    </button>
                  </div>
                  <h4 className="mb-1 text-3xl font-black uppercase leading-tight text-[#231c16]">
                    Welcome To
                    <br />
                    Sivaga Coffee Bar
                  </h4>
                  <p className="mb-4 text-sm text-[#5f554c]">Fuel your dreams with Sivaga Coffee Bar</p>
                  <div className="mb-4 flex justify-center">
                    <CoffeeBeanIcon className="h-4 w-4 text-[#4e4238]" />
                  </div>
                  <div className="mb-5 space-y-3">
                    <p className="text-3xl font-black text-[#e2292f]">(+91) 90922 99797</p>
                    <p className="text-base text-[#312923]">No 10, Santhosh Garden 2, Parvathi Nagar, Tiruvannamalai</p>
                    <p className="text-sm text-[#312923]">sivagacoffeebar@gmail.com</p>
                  </div>
                  <div className="mb-4 flex justify-center">
                    <CoffeeBeanIcon className="h-4 w-4 text-[#4e4238]" />
                  </div>
                  <div className="flex justify-center gap-8 text-[#231c16]">
                    <a href="https://www.instagram.com/sivagacoffeebar?igsh=bHhmcHVvbWFidTFz&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 transition-colors hover:text-[#f51423]"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                    </a>
                    <a href="https://www.instagram.com/sivagacoffeebar?igsh=bHhmcHVvbWFidTFz&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 transition-colors hover:text-[#f51423]"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
                    </a>
                    <a href="https://www.instagram.com/sivagacoffeebar?igsh=bHhmcHVvbWFidTFz&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 transition-colors hover:text-[#f51423]"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {selectedGalleryImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGalleryImage(null)}
              className="fixed inset-0 z-[90] grid place-items-center bg-black/80 p-6"
            >
              <button
                type="button"
                onClick={() => setSelectedGalleryImage(null)}
                aria-label="Close image preview"
                className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-black/40 text-xl text-white backdrop-blur-sm"
              >
                ×
              </button>
              <motion.img
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.25 }}
                src={selectedGalleryImage}
                alt="Gallery preview"
                className="max-h-[88vh] w-auto max-w-[92vw] rounded-2xl border border-white/30 object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="bg-[#22201f] px-4 py-14 text-white md:px-12">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-3 grid h-16 w-16 place-items-center overflow-hidden rounded-full border border-white/20 bg-white/5">
                <img src="/logo.png" alt="Sivaga Coffee Bar" className="h-full w-full object-contain" />
              </div>
              <p className="text-sm text-white/75">Sivaga Coffee Bar customers enjoy exceptional quality and a unique coffee experience in every cup.</p>
            </div>
            <div>
              <h4 className="mb-3 text-xl font-black uppercase">Contact Us</h4>
              <p className="text-sm text-white/75">Parvathi Nagar, Tiruvannamalai, Tamil Nadu - 606603</p>
              <p className="mt-4 text-sm text-white/75">(+91) 90922 99797</p>
            </div>
            <div>
              <h4 className="mb-3 text-xl font-black uppercase">Our Links</h4>
              <ul className="space-y-2 text-sm text-white/75">
                {[
                  { label: "About Us", target: "company" },
                  { label: "Menu", target: "menu" },
                  { label: "Gallery", target: "gallery" },
                  { label: "Contact", target: "contact" },
                ].map((item) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => goToSection(item.target)}
                      className="transition hover:text-white"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-xl font-black uppercase">Newsletter & Event</h4>
              <div className="flex overflow-hidden rounded bg-white/10">
                <input className="w-full bg-transparent px-3 py-3 text-sm outline-none" placeholder="Email address..." />
                <button className="px-4 text-sm font-black">→</button>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Sivaga Coffee Bar. All Rights Reserved.</p>
          </div>
        </footer>
      </main>
    </SmoothScroll>
  );
}

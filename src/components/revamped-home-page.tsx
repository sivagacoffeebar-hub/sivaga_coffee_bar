"use client";

import { MapPin, Menu, Phone, Store, X } from "lucide-react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CustomCursor } from "./custom-cursor";
import { SmoothScroll } from "./smooth-scroll";

const navItems = ["HOME", "COMPANY", "MENU", "GALLERY", "FRANCHISE", "CONTACT"];
const navTargets = ["hero", "company", "menu", "gallery", "franchise", "contact"];
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
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1200&q=80",
    icon: "🫖",
  },
  {
    title: "Snacks",
    description:
      "Crispy, savory, and sweet cafe bites crafted to pair perfectly with your hot beverage rituals.",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
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
  const [activeSlide, setActiveSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const collageRef = useRef<HTMLDivElement | null>(null);
  const wheelLastTriggerAt = useRef(0);
  const collageInView = useInView(collageRef, { once: true, margin: "-10%" });
  const [layoutStep, setLayoutStep] = useState(0);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);
  const [franchiseForm, setFranchiseForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    propertyType: "",
    openingPlan: "",
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success">("idle");

  const collageLayouts = [
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
  ];

  useEffect(() => {
    if (!collageInView) return;
    const timer = window.setInterval(() => {
      setLayoutStep((prev) => (prev + 1) % collageLayouts.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [collageInView]);

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
    if (!menuOpen) return;
    const closeOnScroll = () => setMenuOpen(false);
    window.addEventListener("scroll", closeOnScroll, { passive: true });
    window.addEventListener("wheel", closeOnScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", closeOnScroll);
      window.removeEventListener("wheel", closeOnScroll);
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") nextSlide();
      if (event.key === "ArrowLeft") prevSlide();
      if (event.key === "Escape") setSelectedGalleryImage(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const goToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onFranchiseFieldChange = (field: keyof typeof franchiseForm, value: string) => {
    setFranchiseForm((prev) => ({ ...prev, [field]: value }));
  };

  const onFranchiseSubmit = () => {
    if (!franchiseForm.fullName || !franchiseForm.phone || !franchiseForm.location) return;
    setSubmitStatus("success");
    window.setTimeout(() => setSubmitStatus("idle"), 2600);
  };

  const onHeroWheel = (event: React.WheelEvent<HTMLElement>) => {
    event.preventDefault();
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
  };

  const onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (mouseStartX.current === null || (event.buttons & 1) !== 1) return;
    const distance = event.clientX - mouseStartX.current;
    if (Math.abs(distance) < 55) return;
    if (distance < 0) nextSlide();
    else prevSlide();
    mouseStartX.current = event.clientX;
  };

  const onMouseUpOrLeave = () => {
    mouseStartX.current = null;
  };

  return (
    <SmoothScroll>
      <CustomCursor />
      <main className="bg-[radial-gradient(circle_at_top,#fffaf0_0%,#f6f1e7_40%,#ece3d6_100%)] text-[#1d1917]">
        <section
          id="hero"
          className="relative min-h-[560px] overflow-hidden bg-[#f51423] px-4 pb-8 pt-4 text-white md:min-h-[620px] md:px-12 lg:min-h-[88vh]"
          onWheel={onHeroWheel}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          onMouseLeave={onMouseUpOrLeave}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={heroSlides[activeSlide].image}
              src={heroSlides[activeSlide].image}
              alt="Hero slide background"
              initial={{ opacity: 0, scale: 1.045 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-[#f51423]/50 via-[#f51423]/20 to-transparent" />
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-[#ffec99]/45 blur-xl" />
            <div className="absolute -right-10 -top-8 h-28 w-28 rounded-full bg-[#ffec99]/45 blur-xl" />
            <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-[#ffec99]/45 blur-xl" />
            <div className="absolute -bottom-8 right-1/3 h-28 w-28 rounded-full bg-[#ffec99]/45 blur-xl" />
          </div>
          <div className="relative z-10 mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-widest">
            <p className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              Corporate Office - 17/16B, Chennai
            </p>
            <p className="flex items-center gap-2">
              <Store className="h-3.5 w-3.5" />
              Franchise Enquiry : (+91) 90907 40907
            </p>
          </div>
          <div className="relative z-10 mb-8 flex items-center justify-between rounded-[2rem] bg-[#ef2332] px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-full border-2 border-white bg-[#f51423] text-center text-[9px] font-black leading-tight">
                SIVAGA
                <br />
                COFFEE
              </div>
              <button
                onClick={() => setMenuOpen(true)}
                className="rounded-full p-2 transition hover:bg-white/10"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
            <div className="hidden items-center gap-10 text-xs font-black tracking-[0.2em] md:flex">
              {navItems.map((item, idx) => (
                <button
                  key={item}
                  onClick={() => goToSection(navTargets[idx])}
                  className="transition hover:text-[#ffe6a8]"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="w-14" />
          </div>
          <div className="absolute bottom-14 left-0 z-10 flex w-full justify-center gap-3">
            {heroSlides.map((_, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => setActiveSlide(index)}
                className={`group relative rounded-full transition ${
                  activeSlide === index ? "w-7" : "w-2.5"
                } h-2.5`}
                aria-label={`Go to slide ${index + 1}`}
              >
                <span
                  className={`absolute inset-0 rounded-full transition ${
                    activeSlide === index ? "bg-white" : "bg-white/55"
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

        <section id="company" className="relative mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-[1.2fr_0.7fr_0.9fr] md:px-12">
          <div className="pointer-events-none absolute inset-0 z-0 rounded-3xl border border-[#ffffffb3] bg-[radial-gradient(circle_at_12%_20%,rgba(195,125,57,0.34),transparent_40%),radial-gradient(circle_at_92%_78%,rgba(245,20,35,0.22),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.82),rgba(245,236,224,0.82))]" />
          <div className="relative z-10">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#9f9185]">Coffee shop since 2000</p>
            <h2 className="mb-4 text-5xl font-black uppercase leading-[1.05]">
              We Are Not Just
              <br />
              Regular Coffee Shop
            </h2>
            <p className="mb-5 text-sm leading-7 text-[#6f6258]">
              Sivaga Coffee is born through a passion to serve a fulfilling cup with authentic taste, cozy vibe, and thoughtful ambience.
            </p>
            <ul className="space-y-2 text-sm font-black uppercase tracking-[0.12em] text-[#d22d33]">
              <li>Innovative and thoughtful</li>
              <li>Quality and commitment</li>
              <li>Affordable and luxurious</li>
            </ul>
          </div>
          <div className="relative z-10 rounded-[2rem] bg-[#f51423] p-8 text-center text-white">
            <p className="text-5xl font-black">150000+</p>
            <p className="mb-7 mt-2 text-xs font-black uppercase tracking-[0.2em]">Happy customers every day</p>
            <div className="mb-7 h-px w-full bg-white/30" />
            <p className="text-5xl font-black">99%</p>
            <p className="mt-2 text-xs font-black uppercase tracking-[0.2em]">Customer satisfaction</p>
          </div>
          <div className="relative z-10 rounded-xl bg-[linear-gradient(145deg,#2a1f18,#4a3428)] p-6 text-white">
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#f5c083]">Today&apos;s special</p>
            <h3 className="mb-3 text-3xl font-black uppercase leading-tight">
              Signature
              <br />
              Filter Blend
            </h3>
            <p className="mb-6 text-sm leading-6 text-white/80">
              Slow-brewed South Indian filter coffee with balanced roast notes,
              velvety crema, and a warm aromatic finish.
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-white/10 p-3">
                <p className="text-lg font-black text-[#ffd58b]">4.9</p>
                <p className="text-[10px] uppercase tracking-widest">Rating</p>
              </div>
              <div className="rounded-lg bg-white/10 p-3">
                <p className="text-lg font-black text-[#ffd58b]">18k+</p>
                <p className="text-[10px] uppercase tracking-widest">Orders</p>
              </div>
              <div className="rounded-lg bg-white/10 p-3">
                <p className="text-lg font-black text-[#ffd58b]">12 min</p>
                <p className="text-[10px] uppercase tracking-widest">Brew</p>
              </div>
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
              className="group relative z-10 min-h-[420px] overflow-hidden rounded-2xl border border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/45 transition duration-500 group-hover:bg-black/58" />

              <div className="absolute inset-3 rounded-2xl border border-white/35 opacity-0 transition duration-300 group-hover:opacity-100" />

              <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-8 text-center text-white">
                <motion.p
                  initial={{ opacity: 0.8 }}
                  whileHover={{ scale: 1.06 }}
                  className="mb-3 text-6xl"
                >
                  {item.icon}
                </motion.p>
                <h3 className="text-4xl font-black uppercase tracking-wide">{item.title}</h3>
                <div className="my-2 h-1 w-16 rounded-full bg-white/70" />
                <p className="max-h-0 overflow-hidden text-sm leading-7 text-white/95 opacity-0 transition-all duration-500 group-hover:mt-2 group-hover:max-h-36 group-hover:opacity-100">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </section>

        <section className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:px-12">
          <div className="pointer-events-none absolute inset-0 z-0 rounded-3xl border border-[#ffffffb3] bg-[radial-gradient(circle_at_80%_30%,rgba(245,20,35,0.2),transparent_35%),radial-gradient(circle_at_10%_80%,rgba(194,128,61,0.28),transparent_38%),linear-gradient(120deg,rgba(255,255,255,0.72),rgba(235,228,218,0.9))]" />
          <div className="relative z-10 flex min-h-[520px] items-center justify-center">
            <div
              ref={collageRef}
              className="relative flex h-[460px] w-full max-w-[560px] items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(60,42,31,0.08)_64%,rgba(60,42,31,0.16)_100%)] md:h-[500px] lg:h-[540px]"
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
              <div className="relative h-[330px] w-[320px] sm:h-[380px] sm:w-[400px] md:h-[420px] md:w-[470px] lg:h-[450px] lg:w-[510px]">
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
          <div className="relative z-10">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#9f9185]">Coffeehouse vibes</p>
            <h3 className="mb-4 text-5xl font-black uppercase leading-tight">
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

        <section id="franchise" className="relative mx-auto max-w-7xl overflow-hidden px-4 py-14 text-center md:px-12">
          <div className="pointer-events-none absolute inset-0 z-0 rounded-3xl border border-[#d7e9d1] bg-[radial-gradient(circle_at_16%_20%,rgba(131,188,109,0.32),transparent_35%),radial-gradient(circle_at_88%_78%,rgba(82,148,73,0.26),transparent_40%),linear-gradient(135deg,#f4ffe9,#e7f7df_45%,#f2fff0)]" />
          <div className="pointer-events-none absolute -left-12 top-10 z-10 hidden h-48 w-48 rounded-full border border-[#98c38d]/50 bg-[radial-gradient(circle,#d9f0d2_0%,#c4e6b8_55%,transparent_70%)] md:block" />
          <div className="pointer-events-none absolute -left-4 top-24 z-10 hidden h-20 w-20 rounded-full border border-[#8fb584]/40 bg-[#f3ffe9] md:block" />
          <div className="pointer-events-none absolute -right-10 top-8 z-10 hidden h-52 w-52 rounded-full border border-[#98c38d]/50 bg-[radial-gradient(circle,#d9f0d2_0%,#c4e6b8_55%,transparent_70%)] md:block" />
          <div className="pointer-events-none absolute right-8 top-28 z-10 hidden h-16 w-16 rounded-full border border-[#8fb584]/40 bg-[#f3ffe9] md:block" />
          <div className="pointer-events-none absolute left-[9%] top-[30%] z-10 hidden h-2 w-2 rounded-full bg-[#8fbc84] md:block" />
          <div className="pointer-events-none absolute right-[11%] top-[34%] z-10 hidden h-2 w-2 rounded-full bg-[#8fbc84] md:block" />
          <div className="pointer-events-none absolute left-[14%] top-[42%] z-10 hidden h-1.5 w-1.5 rounded-full bg-[#9bc88f] md:block" />
          <div className="pointer-events-none absolute right-[16%] top-[44%] z-10 hidden h-1.5 w-1.5 rounded-full bg-[#9bc88f] md:block" />

          <div className="pointer-events-none absolute inset-x-0 top-[34%] z-10 mx-auto hidden h-[1px] max-w-xl bg-gradient-to-r from-transparent via-[#8eb582]/50 to-transparent md:block" />
          <div className="pointer-events-none absolute inset-x-0 top-[48%] z-10 mx-auto hidden h-[1px] max-w-lg bg-gradient-to-r from-transparent via-[#8eb582]/30 to-transparent md:block" />

          {["☕", "🍪", "🍯", "🫖"].map((icon, idx) => (
            <motion.span
              key={`${icon}-${idx}`}
              initial={{ opacity: 0.35 }}
              animate={{ y: [0, -5, 0], opacity: [0.4, 0.75, 0.4] }}
              transition={{ duration: 2.6, repeat: Infinity, delay: idx * 0.25 }}
              className={`pointer-events-none absolute z-10 hidden text-xl text-[#5f8651] md:block ${
                idx === 0
                  ? "left-[23%] top-[24%]"
                  : idx === 1
                    ? "left-[26%] top-[56%]"
                    : idx === 2
                      ? "right-[25%] top-[24%]"
                      : "right-[27%] top-[56%]"
              }`}
            >
              {icon}
            </motion.span>
          ))}

          <p className="relative z-20 mb-2 text-xs uppercase tracking-[0.25em] text-[#5f8651]">Let&apos;s connect</p>
          <h3 className="relative z-20 mb-4 text-5xl font-black uppercase text-[#20341b]">Enquiry For Franchise</h3>
          <p className="relative z-20 mx-auto mb-8 max-w-3xl text-sm leading-7 text-[#4b6544]">
            Bring premium coffee, tea, and snacks to your neighborhood with a
            friendly and profitable store format backed by operational guidance.
          </p>
          <div className="relative z-20 mx-auto grid max-w-3xl gap-3 md:grid-cols-3">
            <input
              placeholder="Enter your full name"
              value={franchiseForm.fullName}
              onChange={(e) => onFranchiseFieldChange("fullName", e.target.value)}
              className="rounded border border-[#cce0c4] bg-[#f5fff1] px-3 py-3 text-sm shadow-sm outline-none transition focus:border-[#7ab56a]"
            />
            <input
              placeholder="Enter your email id"
              value={franchiseForm.email}
              onChange={(e) => onFranchiseFieldChange("email", e.target.value)}
              className="rounded border border-[#cce0c4] bg-[#f5fff1] px-3 py-3 text-sm shadow-sm outline-none transition focus:border-[#7ab56a]"
            />
            <input
              placeholder="Enter your phone number"
              value={franchiseForm.phone}
              onChange={(e) => onFranchiseFieldChange("phone", e.target.value)}
              className="rounded border border-[#cce0c4] bg-[#f5fff1] px-3 py-3 text-sm shadow-sm outline-none transition focus:border-[#7ab56a]"
            />
            <input
              placeholder="Enter your location"
              value={franchiseForm.location}
              onChange={(e) => onFranchiseFieldChange("location", e.target.value)}
              className="rounded border border-[#cce0c4] bg-[#f5fff1] px-3 py-3 text-sm shadow-sm outline-none transition focus:border-[#7ab56a]"
            />
            <input
              placeholder="Property Type"
              value={franchiseForm.propertyType}
              onChange={(e) => onFranchiseFieldChange("propertyType", e.target.value)}
              className="rounded border border-[#cce0c4] bg-[#f5fff1] px-3 py-3 text-sm shadow-sm outline-none transition focus:border-[#7ab56a]"
            />
            <input
              placeholder="Opening Plan"
              value={franchiseForm.openingPlan}
              onChange={(e) => onFranchiseFieldChange("openingPlan", e.target.value)}
              className="rounded border border-[#cce0c4] bg-[#f5fff1] px-3 py-3 text-sm shadow-sm outline-none transition focus:border-[#7ab56a]"
            />
          </div>
          <button
            onClick={onFranchiseSubmit}
            className="relative z-20 mt-6 rounded bg-[#4f9f4f] px-8 py-3 text-xs font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-[#2d6f2d33]"
          >
            Submit your Enquiry
          </button>
          {submitStatus === "success" && (
            <p className="relative z-20 mt-3 text-sm font-semibold text-[#3c7f34]">
              Thanks! We will contact you shortly.
            </p>
          )}
        </section>

        <section id="gallery" className="mx-auto max-w-7xl px-4 py-12 md:px-12">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#9f9185]">Gallery</p>
              <h3 className="text-4xl font-black uppercase text-[#2b221c] md:text-5xl">Happy Day Moments</h3>
            </div>
            <p className="hidden max-w-sm text-sm text-[#6f6258] md:block">
              A lively glimpse of our coffee stories, warm ambience, and snacks
              that keep customers coming back.
            </p>
          </div>
          <div className="grid min-h-[400px] gap-4 md:grid-cols-[1.2fr_1fr_1fr]">
            {[
              "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1400&q=80",
              "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1100&q=80",
              "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?auto=format&fit=crop&w=1100&q=80",
            ].map((img, idx) => (
              <motion.article
                key={img}
                whileHover={{ y: -8, scale: 1.01 }}
                onClick={() => setSelectedGalleryImage(img)}
                className="group relative overflow-hidden rounded-2xl border border-white/40 shadow-[0_12px_32px_rgba(0,0,0,0.18)]"
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
                    <p className="text-white/70">Address</p>
                    <p className="font-medium">Sivaga Coffee Bar, Tiruvannamalai, Tamil Nadu</p>
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
                  href="https://www.google.com/maps?q=Tiruvannamalai,+Tamil+Nadu"
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
                    title="Sivaga Coffee Office Map"
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
                className="mr-auto ml-2 mt-24 w-full max-w-md overflow-hidden rounded-[2rem] border border-white/40 bg-[#f7f6f3] text-center shadow-[0_22px_60px_rgba(0,0,0,0.28)] md:ml-14 md:mt-28"
              >
                <div className="relative bg-[radial-gradient(circle_at_top_right,rgba(245,20,35,0.12),transparent_42%),linear-gradient(180deg,#fbfaf8,#f1efea)] px-7 pb-7 pt-6">
                <div className="mb-5 flex items-start justify-start">
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="grid h-9 w-9 place-items-center rounded-full bg-[#f51423] text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <h4 className="mb-2 text-4xl font-black uppercase leading-tight text-[#231c16]">
                  Welcome To
                  <br />
                  Sivaga Coffee
                </h4>
                <p className="mb-5 text-[#5f554c]">Fuel your dreams with Sivaga Coffee</p>
                <div className="mb-4 flex justify-center">
                  <CoffeeBeanIcon className="h-4 w-4 text-[#4e4238]" />
                </div>
                <div className="mb-5 space-y-3">
                  <p className="text-4xl font-black text-[#e2292f]">(+91) 90922 99797</p>
                  <p className="text-lg text-[#312923]">Tiruvannamalai, Tamil Nadu</p>
                  <p className="text-base text-[#312923]">sivagacoffeebar@gmail.com</p>
                </div>
                <div className="mb-4 flex justify-center">
                  <CoffeeBeanIcon className="h-4 w-4 text-[#4e4238]" />
                </div>
                <div className="flex justify-center gap-8 text-xl text-[#231c16]">
                  <a href="#" aria-label="Facebook">
                    f
                  </a>
                  <a href="#" aria-label="YouTube">
                    ▶
                  </a>
                  <a href="#" aria-label="Instagram">
                    ◎
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
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
            <div>
              <div className="mb-3 grid h-16 w-16 place-items-center rounded-full bg-[#f51423] text-xs font-black">SCB</div>
              <p className="text-sm text-white/75">Sivaga Coffee customers enjoy exceptional quality and a unique coffee experience in every cup.</p>
            </div>
            <div>
              <h4 className="mb-3 text-xl font-black uppercase">Contact Us</h4>
              <p className="text-sm text-white/75">Chennai, Tamil Nadu</p>
              <p className="mt-4 text-sm text-white/75">(+91) 90907 40907</p>
            </div>
            <div>
              <h4 className="mb-3 text-xl font-black uppercase">Our Links</h4>
              <ul className="space-y-2 text-sm text-white/75">
                {["About", "Menu", "Gallery", "Career", "Contact"].map((item) => (
                  <li key={item}>{item}</li>
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
          <div className="mx-auto mt-8 flex max-w-7xl items-center justify-between border-t border-white/10 pt-6 text-sm text-white/70">
            <p>© 2026 Sivaga Coffee. All Rights Reserved.</p>
            <a href="tel:+919090740907" className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> (+91) 90907 40907
            </a>
          </div>
        </footer>
      </main>
    </SmoothScroll>
  );
}

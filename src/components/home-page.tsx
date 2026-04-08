"use client";

import { motion } from "framer-motion";
import { Coffee, CupSoda, Phone, Store } from "lucide-react";
import { useMemo } from "react";
import { CustomCursor } from "./custom-cursor";
import { SmoothScroll } from "./smooth-scroll";

const menuItems = [
  {
    title: "Coffee",
    description:
      "Explore aromatic blends made from premium beans for a rich, memorable cup.",
    icon: Coffee,
  },
  {
    title: "Tea",
    description:
      "Discover classic and modern teas designed for soothing and refreshing moments.",
    icon: CupSoda,
  },
  {
    title: "Snacks",
    description:
      "Enjoy traditional recipes crafted with hygiene and a unique local flavor.",
    icon: Store,
  },
];

const featureCards = [
  "Innovative and thoughtful",
  "Quality and commitment",
  "Affordable and luxurious",
];

const ticker = new Array(12).fill("Happy day coffee - Flavours");

export function HomePage() {
  const stats = useMemo(
    () => [
      { label: "Happy customers every day", value: "150000+" },
      { label: "Customer satisfaction", value: "99%" },
    ],
    [],
  );

  return (
    <SmoothScroll>
      <CustomCursor />
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-8 pt-6 md:px-12">
        <motion.header
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-center justify-between"
        >
          <p className="text-xl font-semibold tracking-wide">Sivaga Coffee Bar</p>
          <button
            data-cursor="highlight"
            data-cursor-label="tap"
            className="rounded-full border border-white/40 px-5 py-2 text-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Enquiry
          </button>
        </motion.header>

        <section className="mb-24 grid items-end gap-8 md:grid-cols-[2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
              coffee shop since 2000
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">
              We are not just regular coffee shop.
            </h1>
            <p className="max-w-3xl text-lg text-[var(--muted)]">
              Sivaga Coffee Bar is born through a passion to serve a fulfilling
              cup to people from all walks of life with a cozy vibe and
              uncompromising quality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-5 rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-semibold">{stat.value}</p>
                <p className="text-sm text-[var(--muted)]">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        <section className="mb-24 grid gap-6 md:grid-cols-3">
          {menuItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              data-cursor="highlight"
              data-cursor-label="view"
              className="rounded-3xl border border-white/20 p-8 transition hover:-translate-y-1 hover:border-[var(--accent)]"
            >
              <item.icon className="mb-6 h-8 w-8 text-[var(--accent)]" />
              <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
                Menu
              </p>
              <h2 className="mb-4 text-3xl">{item.title}</h2>
              <p className="text-sm text-[var(--muted)]">{item.description}</p>
            </motion.article>
          ))}
        </section>

        <section className="mb-24 rounded-3xl border border-white/15 p-8 md:p-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="mb-6 text-sm uppercase tracking-[0.2em] text-[var(--muted)]"
          >
            How we are different
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-3xl leading-tight md:text-5xl"
          >
            Sivaga Coffee Bar Where Excellence Meets Everyday Taste.
          </motion.h3>
          <div className="grid gap-4 md:grid-cols-3">
            {featureCards.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-[var(--muted)]"
              >
                {feature}
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-24 overflow-hidden border-y border-white/10 py-5">
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "-50%" }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
            className="flex w-max gap-8 whitespace-nowrap text-sm uppercase tracking-[0.25em] text-[var(--muted)]"
          >
            {[...ticker, ...ticker].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </motion.div>
        </section>

        <section className="mb-24 grid gap-8 md:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="rounded-3xl border border-white/15 p-8"
          >
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
              Story
            </p>
            <h5 className="mb-4 text-3xl">How we started</h5>
            <p className="text-sm leading-7 text-[var(--muted)]">
              It all started with a handcrafted recipe that blends green
              cardamom notes and authentic South Indian filter coffee style.
              Today, Sivaga Coffee Bar continues this tradition with modern
              service and thoughtful spaces.
            </p>
          </motion.article>
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-white/15 p-8"
          >
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
              Why choose us
            </p>
            <h5 className="mb-4 text-3xl">Built for everyday delight</h5>
            <p className="text-sm leading-7 text-[var(--muted)]">
              We stay rooted in timeless flavors while constantly improving the
              way customers discover, order, and enjoy every cup and bite.
            </p>
          </motion.article>
        </section>

        <footer className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
          <p>Call us for general enquiry</p>
          <a
            data-cursor="highlight"
            data-cursor-label="call"
            href="tel:+919090740907"
            className="flex items-center gap-2 text-base text-white transition hover:text-[var(--accent)]"
          >
            <Phone className="h-4 w-4" /> (+91) 90907 40907
          </a>
        </footer>
      </main>
    </SmoothScroll>
  );
}

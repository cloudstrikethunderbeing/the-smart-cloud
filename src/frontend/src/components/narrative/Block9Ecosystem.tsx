import { useActor } from "@caffeineai/core-infrastructure";
import { motion } from "motion/react";
import { createActor } from "../../backend";

const CARDS = [
  {
    id: "bearlyhuman",
    action: "Build",
    site: "bearlyhuman.ai",
    description: "Launch your own agent. Get ranked by real performance.",
    href: "https://bearlyhuman.ai",
    cta: "Launch Your Agent",
    trackId: "eco-bearlyhuman",
    accentColor: "rgba(34,211,238,0.8)",
    isPrimary: true,
  },
  {
    id: "jackbear",
    action: "Learn",
    site: "jackbear.ai",
    description: "Gamified AI academy. Learn how the system works.",
    href: "https://jackbear.ai",
    cta: "Learn the System",
    trackId: "eco-jackbear",
    accentColor: "rgba(59,130,246,0.6)",
    isPrimary: false,
  },
];

export default function Block9Ecosystem() {
  const { actor } = useActor(createActor);

  function track(elementId: string) {
    if (actor) actor.trackClick(elementId).catch(() => {});
  }

  return (
    <section
      id="block-ecosystem"
      data-ocid="block9.section"
      className="relative flex flex-col items-center justify-center px-4 sm:px-6 py-16 md:py-28 overflow-hidden"
      style={{ minHeight: "80vh" }}
    >
      {/* Top gradient divider */}
      <div
        className="absolute top-0 left-0 right-0 gradient-divider"
        aria-hidden="true"
      />

      {/* Subtle ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(59,130,246,0.03) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-14">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="section-label"
          style={{ color: "oklch(0.48 0.01 55)" }}
          data-ocid="block9.label"
        >
          The Smart Cloud Ecosystem
        </motion.p>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-3xl"
          data-ocid="block9.cards"
        >
          {CARDS.map((card, i) => (
            <motion.a
              key={card.id}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="eco-card p-6 md:p-8 flex flex-col gap-6 group cursor-pointer no-underline"
              data-ocid={`block9.card.${i + 1}`}
              onClick={() => track(card.trackId)}
              style={
                card.isPrimary
                  ? {
                      borderColor: "rgba(139,92,246,0.22)",
                      boxShadow:
                        "0 0 0 1px rgba(139,92,246,0.12), 0 4px 24px rgba(139,92,246,0.07)",
                    }
                  : undefined
              }
            >
              {/* Gradient accent bar — primary card gets wider bar */}
              <div
                className="rounded-full"
                style={{
                  height: card.isPrimary ? "2px" : "2px",
                  width: card.isPrimary ? "4rem" : "3rem",
                  background: `linear-gradient(90deg, ${card.accentColor}, transparent)`,
                  opacity: card.isPrimary ? 1 : 0.85,
                }}
                aria-hidden="true"
              />

              <div className="flex flex-col gap-3 flex-1">
                <p
                  className="section-label"
                  style={{
                    color: card.isPrimary
                      ? "oklch(0.65 0.08 290 / 0.9)"
                      : "oklch(0.58 0.015 190 / 0.8)",
                  }}
                  data-ocid={`block9.card.${i + 1}.action`}
                >
                  {card.action}
                </p>
                <h3
                  className="text-xl font-bold font-display"
                  style={{
                    color: card.isPrimary
                      ? "oklch(0.96 0.015 60)"
                      : "oklch(0.92 0.01 60)",
                  }}
                  data-ocid={`block9.card.${i + 1}.site`}
                >
                  {card.site}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.52 0.01 55)" }}
                  data-ocid={`block9.card.${i + 1}.description`}
                >
                  {card.description}
                </p>
              </div>

              <span
                className="inline-flex items-center gap-2 text-sm font-semibold transition-smooth"
                style={{
                  color: card.isPrimary
                    ? "oklch(0.72 0.14 290)"
                    : "oklch(0.72 0.15 190)",
                }}
                data-ocid={`block9.card.${i + 1}.link`}
              >
                {card.cta}
                <span
                  aria-hidden="true"
                  className="text-base leading-none group-hover:translate-x-1.5 transition-smooth inline-block"
                >
                  →
                </span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

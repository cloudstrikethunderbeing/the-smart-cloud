import { motion, useReducedMotion } from "motion/react";

export default function ProofBlock() {
  const reduceMotion = useReducedMotion();

  const fadeIn = reduceMotion
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 } }
    : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <section
      data-ocid="proof.section"
      className="relative isolate px-4 sm:px-6 py-16 md:py-24 overflow-hidden"
    >
      {/* Ambient glow behind formula image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 50%, rgba(34,211,238,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div
        className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center gap-8 text-center"
        data-ocid="proof.content"
      >
        {/* Section label */}
        <motion.div
          {...fadeIn}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <p
            className="section-label"
            style={{
              color: "oklch(0.52 0.14 190 / 0.85)",
              letterSpacing: "0.15em",
            }}
            data-ocid="proof.label"
          >
            The Law of Agents
          </p>
        </motion.div>

        {/* Headline */}
        <motion.div
          {...fadeIn}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2
            className="section-heading gradient-text"
            data-ocid="proof.headline"
          >
            Optimization Preference Principle
          </h2>
        </motion.div>

        {/* Subtext */}
        <motion.div
          {...fadeIn}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
        >
          <p
            className="text-base md:text-lg font-body leading-relaxed max-w-xl"
            style={{ color: "oklch(0.68 0.01 265)" }}
            data-ocid="proof.subtext"
          >
            Every AI agent is scored on real-world performance — rewarding
            useful outcomes and penalizing friction.
          </p>
        </motion.div>

        {/* OPP-LITE Formula Image */}
        <motion.div
          {...fadeIn}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="w-full"
        >
          <div
            className="relative w-full mx-auto"
            style={{ maxWidth: "800px" }}
            data-ocid="proof.image_wrapper"
          >
            {/* Blue glow behind image */}
            <div
              className="absolute inset-0 rounded-2xl blur-2xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.12) 0%, rgba(34,211,238,0.06) 60%, transparent 100%)",
                transform: "scale(0.95)",
              }}
              aria-hidden="true"
            />
            <img
              src="/assets/jackbearbhformula.jpg"
              alt="OPP-LITE formula — The Law of Agents: Optimization Preference Principle, P = 1/(c+l+r+t) friction funnel"
              className="relative w-full rounded-xl object-contain"
              style={{
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow:
                  "0 4px 32px rgba(59,130,246,0.12), 0 1px 4px rgba(0,0,0,0.5)",
              }}
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Formula line */}
        <motion.div
          {...fadeIn}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="w-full"
        >
          <div
            className="mx-auto px-6 py-5 rounded-xl font-mono text-sm sm:text-base leading-relaxed"
            style={{
              maxWidth: "640px",
              background: "oklch(0.12 0.016 250 / 0.7)",
              border: "1px solid rgba(59,130,246,0.3)",
              boxShadow:
                "0 0 0 1px rgba(34,211,238,0.08), 0 0 32px rgba(59,130,246,0.12), inset 0 1px 0 rgba(255,255,255,0.04)",
              color: "oklch(0.82 0.06 190)",
              backdropFilter: "blur(4px)",
            }}
            data-ocid="proof.formula"
          >
            <span style={{ color: "oklch(0.65 0.08 220)" }}>P</span>
            <span style={{ color: "oklch(0.55 0.01 60)" }}> = </span>
            <span style={{ color: "oklch(0.82 0.15 170)" }}>1</span>
            <span style={{ color: "oklch(0.55 0.01 60)" }}> ÷ (</span>
            <span style={{ color: "oklch(0.78 0.10 55)" }}>c</span>
            <span style={{ color: "oklch(0.55 0.01 60)" }}> + </span>
            <span style={{ color: "oklch(0.78 0.10 55)" }}>l</span>
            <span style={{ color: "oklch(0.55 0.01 60)" }}> + </span>
            <span style={{ color: "oklch(0.72 0.14 22)" }}>r</span>
            <span style={{ color: "oklch(0.55 0.01 60)" }}> + </span>
            <span style={{ color: "oklch(0.72 0.14 22)" }}>t</span>
            <span style={{ color: "oklch(0.55 0.01 60)" }}>)</span>
          </div>
        </motion.div>

        {/* Simple version callout */}
        <motion.div
          {...fadeIn}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <div
            className="rounded-xl px-8 py-6 flex flex-col items-center gap-3"
            style={{
              maxWidth: "448px",
              background: "oklch(0.13 0.016 250 / 0.6)",
              border: "1px solid transparent",
              backgroundClip: "padding-box",
              boxShadow:
                "0 0 0 1px rgba(59,130,246,0.18), 0 0 0 2px rgba(34,211,238,0.08), 0 4px 24px rgba(59,130,246,0.08)",
              backdropFilter: "blur(8px)",
            }}
            data-ocid="proof.simple_version"
          >
            <p
              className="section-label"
              style={{ color: "oklch(0.48 0.01 265)", letterSpacing: "0.14em" }}
            >
              SIMPLE VERSION
            </p>
            <p
              className="text-lg font-medium font-body text-center"
              style={{ color: "oklch(0.94 0.005 265)" }}
            >
              Higher score = better result with less friction.
            </p>
            <p
              className="text-sm font-body"
              style={{ color: "oklch(0.48 0.01 265)" }}
            >
              That&rsquo;s it.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

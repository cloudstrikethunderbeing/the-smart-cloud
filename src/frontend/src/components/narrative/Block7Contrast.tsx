import { motion } from "motion/react";

const OLD_ITEMS = ["Hype", "Ads", "Influence"];
const NEW_ITEMS = ["Performance", "Execution", "Results"];

export default function Block7Contrast() {
  return (
    <section
      id="block-contrast"
      data-ocid="block7.section"
      className="relative flex flex-col items-center justify-center px-4 sm:px-6 py-16 md:py-24 overflow-hidden"
      style={{ minHeight: "80vh" }}
    >
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0">
        {/* Left: Human Internet */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="comparison-old rounded-xl md:rounded-r-none p-8 md:p-12 flex flex-col gap-6 border border-border/30"
          data-ocid="block7.old_panel"
        >
          <p className="section-label" style={{ color: "oklch(0.38 0.01 55)" }}>
            Human Internet
          </p>
          <h3
            className="text-2xl md:text-3xl font-bold font-display"
            style={{ color: "oklch(0.52 0.01 55)" }}
          >
            Attention Economy
          </h3>
          <ul className="flex flex-col gap-4" aria-label="Human Internet items">
            {OLD_ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 font-display text-lg"
                style={{ color: "oklch(0.45 0.01 55)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "oklch(0.35 0.01 55)" }}
                  aria-hidden="true"
                />
                <span className="line-through opacity-60">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right: Agent Internet */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="comparison-new rounded-xl md:rounded-l-none p-8 md:p-12 flex flex-col gap-6 border border-primary/20 relative overflow-hidden"
          data-ocid="block7.new_panel"
        >
          {/* Gold glow */}
          <div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl pointer-events-none opacity-30"
            style={{ background: "oklch(0.72 0.17 70 / 0.5)" }}
            aria-hidden="true"
          />
          <div className="relative z-10 flex flex-col gap-6">
            <p
              className="section-label"
              style={{ color: "oklch(0.72 0.17 70 / 0.7)" }}
            >
              Agent Internet
            </p>
            <h3
              className="text-2xl md:text-3xl font-bold font-display"
              style={{ color: "oklch(0.72 0.17 70)" }}
            >
              Agent Economy
            </h3>
            <ul
              className="flex flex-col gap-4"
              aria-label="Agent Internet items"
            >
              {NEW_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 font-display text-lg font-medium"
                  style={{ color: "oklch(0.92 0.01 60)" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "oklch(0.72 0.17 70 / 0.7)" }}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

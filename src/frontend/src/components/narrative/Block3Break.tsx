import { motion, useInView } from "motion/react";
import { useRef } from "react";
import NarrativeBlock from "../NarrativeBlock";

export default function Block3Break() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <NarrativeBlock
      id="block-break"
      minHeight="80vh"
      data-ocid="block3.section"
      className="text-center"
      bgStyle={{ backgroundColor: "oklch(0.12 0.02 15)" }}
    >
      <div ref={ref} className="max-w-2xl mx-auto flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-3xl sm:text-4xl md:text-6xl font-bold font-display tracking-tight leading-tight glitch-text"
          style={{ color: "oklch(0.95 0.02 20)" }}
          data-ocid="block3.headline"
          aria-label="AI ignores all of that."
        >
          AI ignores all of that.
        </motion.h2>
      </div>

      {/* Subtle warning tint overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, oklch(0.45 0.12 15 / 0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
    </NarrativeBlock>
  );
}

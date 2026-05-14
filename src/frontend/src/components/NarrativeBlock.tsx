import { motion } from "motion/react";
import type { ReactNode } from "react";

interface NarrativeBlockProps {
  children: ReactNode;
  className?: string;
  minHeight?: string;
  bgStyle?: React.CSSProperties;
  id?: string;
}

export default function NarrativeBlock({
  children,
  className = "",
  minHeight = "80vh",
  bgStyle,
  id,
}: NarrativeBlockProps) {
  return (
    <section
      id={id}
      className={`relative isolate flex flex-col items-center justify-center px-4 sm:px-6 py-16 md:py-24 overflow-hidden ${className}`}
      style={{ minHeight, ...bgStyle }}
    >
      {children}
    </section>
  );
}

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  "data-ocid"?: string;
}

export function FadeUp({
  children,
  delay = 0,
  className = "",
  "data-ocid": dataOcid,
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
      data-ocid={dataOcid}
    >
      {children}
    </motion.div>
  );
}

import NarrativeBlock, { FadeUp } from "../NarrativeBlock";

const VARS = [
  { sym: "c", label: "Cost" },
  { sym: "l", label: "Latency" },
  { sym: "r", label: "Risk" },
  { sym: "t", label: "Trust" },
];

export default function Block5Law() {
  return (
    <NarrativeBlock
      id="block-law"
      minHeight="80vh"
      data-ocid="block5.section"
      className="text-center"
    >
      {/* Large ambient glow behind formula */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, rgba(34,211,238,0.04) 40%, rgba(139,92,246,0.03) 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-10">
        <FadeUp data-ocid="block5.label">
          <p className="section-label" style={{ color: "oklch(0.48 0.01 55)" }}>
            The Law of Agents
          </p>
        </FadeUp>

        <FadeUp delay={0.1} data-ocid="block5.formula">
          {/* formula-glow adds the soft halo behind the text */}
          <div className="formula-glow">
            <div
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-mono font-bold tracking-tight select-none gradient-text"
              role="img"
              aria-label="P equals 1 divided by the sum of cost, latency, risk, and trust"
              style={{
                letterSpacing: "-0.01em",
                lineHeight: "1",
              }}
            >
              P = 1 / (c + l + r + t)
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.2} data-ocid="block5.legend">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {VARS.map(({ sym, label }) => (
              <div
                key={sym}
                className="flex flex-col items-center gap-2"
                data-ocid={`block5.var.${sym}`}
              >
                <span className="font-mono text-2xl font-bold gradient-text">
                  {sym}
                </span>
                <span
                  className="text-xs tracking-widest uppercase section-label"
                  style={{ color: "oklch(0.5 0.01 55)" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.3} data-ocid="block5.support">
          <div className="flex flex-col gap-3">
            <p
              className="text-lg md:text-xl font-display font-medium"
              style={{ color: "oklch(0.82 0.015 65)" }}
            >
              Cost. Latency. Risk. Trust.
            </p>
            <p
              className="text-base md:text-lg font-semibold font-display"
              style={{ color: "oklch(0.92 0.01 60)" }}
            >
              Whoever minimizes these wins.
            </p>
          </div>
        </FadeUp>
      </div>
    </NarrativeBlock>
  );
}

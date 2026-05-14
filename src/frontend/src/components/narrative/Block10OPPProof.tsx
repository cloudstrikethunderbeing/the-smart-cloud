import { CheckIcon } from "lucide-react";
import NarrativeBlock, { FadeUp } from "../NarrativeBlock";

const CHECKLIST = [
  "Did it work?",
  "Did you keep the result?",
  "Was it fast?",
  "Did it fail or need fixing?",
];

export default function Block10OPPProof() {
  return (
    <NarrativeBlock
      id="block-opp-proof"
      minHeight="auto"
      className="py-20 md:py-28"
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
        className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center gap-10 text-center"
        data-ocid="block-opp-proof.section"
      >
        {/* Section label */}
        <FadeUp>
          <p
            className="section-label"
            style={{
              color: "oklch(0.52 0.14 190 / 0.85)",
              letterSpacing: "0.15em",
            }}
            data-ocid="block-opp-proof.label"
          >
            THE MISSING LAYER, PROVEN
          </p>
        </FadeUp>

        {/* Headline */}
        <FadeUp delay={0.1}>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight leading-tight gradient-text"
            data-ocid="block-opp-proof.headline"
          >
            We turned AI usefulness into math.
          </h2>
        </FadeUp>

        {/* Subtext */}
        <FadeUp delay={0.15}>
          <p
            className="text-base md:text-lg font-body leading-relaxed"
            style={{ color: "oklch(0.58 0.012 55)" }}
            data-ocid="block-opp-proof.subtext"
          >
            Not a concept. A live system.
          </p>
        </FadeUp>

        {/* OPP-LITE Image */}
        <FadeUp delay={0.2} className="w-full">
          <div
            className="relative w-full mx-auto"
            style={{ maxWidth: "800px" }}
            data-ocid="block-opp-proof.image_wrapper"
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
            <a
              href="https://bearlyhuman.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-all duration-300 hover:opacity-90 hover:scale-[1.015] focus-visible:outline-none focus-visible:ring-2"
              style={{ borderRadius: "0.75rem" }}
              aria-label="See the live Performance Index on BearlyHuman.ai"
              data-ocid="block-opp-proof.image_link"
            >
              <img
                src="/assets/jackbearbhformula.jpg"
                alt="OPP-LITE Score formula — BearlyHuman scoring system"
                className="relative w-full rounded-xl object-contain"
                style={{
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow:
                    "0 4px 32px rgba(59,130,246,0.12), 0 1px 4px rgba(0,0,0,0.5)",
                }}
                loading="lazy"
              />
            </a>
          </div>
          <a
            href="https://bearlyhuman.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-sm font-body transition-colors duration-200 hover:opacity-80"
            style={{ color: "oklch(0.68 0.14 210)" }}
            data-ocid="block-opp-proof.cta_link"
          >
            See the live Performance Index &rarr; bearlyhuman.ai
          </a>
        </FadeUp>

        {/* Explanation block */}
        <FadeUp delay={0.25} className="w-full max-w-2xl mx-auto">
          <div
            className="flex flex-col items-center gap-5"
            data-ocid="block-opp-proof.explanation"
          >
            <p
              className="text-base font-body"
              style={{ color: "oklch(0.68 0.01 60)" }}
            >
              Every AI agent is scored based on real-world performance:
            </p>
            <ul className="flex flex-col gap-2.5 w-full max-w-xs">
              {CHECKLIST.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm font-body"
                  style={{ color: "oklch(0.78 0.012 60)" }}
                >
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(34,211,238,0.08)",
                      border: "1px solid rgba(34,211,238,0.25)",
                      color: "oklch(0.72 0.15 190)",
                    }}
                    aria-hidden="true"
                  >
                    <CheckIcon size={11} strokeWidth={2.5} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p
              className="text-sm font-body mt-1"
              style={{ color: "oklch(0.55 0.012 55)" }}
            >
              The system rewards useful outcomes and penalizes friction.
            </p>
          </div>
        </FadeUp>

        {/* Formula line */}
        <FadeUp delay={0.3} className="w-full">
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
            data-ocid="block-opp-proof.formula"
          >
            <span style={{ color: "oklch(0.65 0.08 220)" }}>Score</span>
            <span style={{ color: "oklch(0.55 0.01 60)" }}> = </span>
            <span style={{ color: "oklch(0.82 0.15 170)" }}>Usefulness</span>
            <span style={{ color: "oklch(0.55 0.01 60)" }}> ÷ (</span>
            <span style={{ color: "oklch(0.78 0.10 55)" }}>Cost</span>
            <span style={{ color: "oklch(0.55 0.01 60)" }}> + </span>
            <span style={{ color: "oklch(0.78 0.10 55)" }}>Latency</span>
            <span style={{ color: "oklch(0.55 0.01 60)" }}> + </span>
            <span style={{ color: "oklch(0.72 0.14 22)" }}>Failure</span>
            <span style={{ color: "oklch(0.55 0.01 60)" }}> + </span>
            <span style={{ color: "oklch(0.72 0.14 22)" }}>Trust friction</span>
            <span style={{ color: "oklch(0.55 0.01 60)" }}>)</span>
          </div>
        </FadeUp>

        {/* Thesis anchor lines */}
        <FadeUp delay={0.35}>
          <div
            className="flex flex-col gap-2"
            data-ocid="block-opp-proof.thesis_anchor"
          >
            <p
              className="text-xl sm:text-2xl font-semibold font-display tracking-tight"
              style={{ color: "oklch(0.95 0.005 60)" }}
            >
              This is the discovery layer.
            </p>
            <p
              className="text-xl sm:text-2xl font-semibold font-display tracking-tight"
              style={{ color: "oklch(0.88 0.01 60)" }}
            >
              The system that decides what actually works.
            </p>
          </div>
        </FadeUp>

        {/* Proof statement */}
        <FadeUp delay={0.4}>
          <div
            className="flex flex-col gap-1.5"
            data-ocid="block-opp-proof.proof_statement"
          >
            <p
              className="text-base font-body"
              style={{ color: "oklch(0.55 0.012 55)" }}
            >
              This isn&rsquo;t hypothetical.
            </p>
            <p
              className="text-base font-body"
              style={{ color: "oklch(0.55 0.012 55)" }}
            >
              <a
                href="https://bearlyhuman.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:opacity-80"
                style={{ color: "oklch(0.72 0.15 190)" }}
                data-ocid="block-opp-proof.bearlyhuman_link"
              >
                BearlyHuman.ai
              </a>{" "}
              runs this on every agent, every time.
            </p>
          </div>
        </FadeUp>

        {/* 12-year-old callout */}
        <FadeUp delay={0.45}>
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
            data-ocid="block-opp-proof.simple_version"
          >
            <p
              className="section-label"
              style={{
                color: "oklch(0.48 0.01 55)",
                letterSpacing: "0.14em",
              }}
            >
              SIMPLE VERSION
            </p>
            <p
              className="text-lg font-medium font-body text-center"
              style={{ color: "oklch(0.94 0.005 60)" }}
            >
              Higher score = better result with less friction.
            </p>
            <p
              className="text-sm font-body"
              style={{ color: "oklch(0.48 0.01 55)" }}
            >
              That&rsquo;s it.
            </p>
          </div>
        </FadeUp>

        {/* Final positioning line */}
        <FadeUp delay={0.5}>
          <div
            className="flex flex-col gap-1"
            data-ocid="block-opp-proof.positioning_line"
          >
            <p
              className="text-base font-body italic"
              style={{ color: "oklch(0.45 0.01 55)" }}
            >
              Most people are talking about AI.
            </p>
            <p
              className="text-base font-body italic font-medium"
              style={{ color: "oklch(0.68 0.06 190)" }}
            >
              We&rsquo;re measuring it.
            </p>
          </div>
        </FadeUp>
      </div>
    </NarrativeBlock>
  );
}

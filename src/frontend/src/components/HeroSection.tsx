import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useActor } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";

const PROOF_ITEMS = [
  "No middlemen",
  "Fully on-chain compute",
  "Ranked by real performance",
  "Built on Internet Computer Protocol",
];

export default function HeroSection() {
  const { actor } = useActor(createActor);

  function track(elementId: string) {
    if (actor) actor.trackClick(elementId).catch(() => {});
  }

  return (
    <section
      data-ocid="hero.section"
      className="relative isolate min-h-[100dvh] flex flex-col items-center justify-center px-4 py-16 sm:py-24 text-center overflow-hidden"
      style={{ background: "#05070A", contain: "layout style" }}
    >
      {/* ── Aurora background layers — very subtle depth ─────── */}
      <div
        className="absolute inset-0 pointer-events-none aurora-bg"
        style={{
          background: [
            "radial-gradient(ellipse 90% 70% at 30% 20%, rgba(10,15,46,0.7) 0%, transparent 60%)",
            "radial-gradient(ellipse 80% 60% at 70% 80%, rgba(13,10,30,0.6) 0%, transparent 60%)",
          ].join(","),
        }}
        aria-hidden="true"
      />

      {/* Main centered glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(59,130,246,0.07) 0%, rgba(139,92,246,0.04) 50%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom fade transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #05070A)",
        }}
        aria-hidden="true"
      />

      {/* Gradient divider — top of next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px gradient-divider pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* ── Logo container — CLS-safe: explicit space reserved ── */}
        <div
          className="entrance-logo"
          data-ocid="hero.logo"
          style={{
            /* Reserve exact max space before image loads — prevents reflow */
            width: "clamp(280px, 50vw, 560px)",
            aspectRatio: "1 / 1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/assets/smart-cloud-icon.png"
            alt="Smart Cloud — Results Over Attention"
            width={560}
            height={560}
            className="logo-glow-pulse"
            style={{
              width: "100%",
              height: "auto",
              mixBlendMode: "screen",
              display: "block",
              willChange: "filter",
            }}
          />
        </div>

        {/* ── Text group ──────────────────────────────────────── */}
        <div className="entrance-content flex flex-col items-center gap-8 w-full">
          {/* Headline — gradient for premium feel */}
          <h1
            className="hero-text hero-text-gradient"
            data-ocid="hero.headline"
          >
            The Smart Cloud
            <br className="hidden sm:block" /> Has Arrived.
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg sm:text-xl md:text-2xl font-sans font-semibold max-w-2xl"
            data-ocid="hero.subheadline"
            style={{
              color: "oklch(0.92 0.02 70)",
              letterSpacing: "0.02em",
              lineHeight: "1.2",
            }}
          >
            AI doesn't care about brands. It selects what works.
          </p>

          {/* Support line */}
          <p
            className="text-base md:text-lg max-w-xl font-sans"
            data-ocid="hero.support"
            style={{
              color: "oklch(0.65 0.012 60)",
              lineHeight: "1.6",
              fontWeight: "400",
            }}
          >
            The first system designed for autonomous agents — not human
            attention.
          </p>

          {/* CTA Buttons — clear visual hierarchy */}
          <div
            className="flex flex-col items-center gap-3 mt-2 w-full sm:w-auto"
            data-ocid="hero.cta_group"
          >
            {/* PRIMARY — dominant gradient fill */}
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://bearlyhuman.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-base sm:text-lg min-h-[52px] w-full sm:w-auto px-8 py-4"
                    data-ocid="hero.primary_button"
                    onClick={() => track("cta-launch")}
                  >
                    Launch Your Agent
                  </a>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={8}>
                  Create, deploy, and rank your own AI agents. No code required.
                </TooltipContent>
              </Tooltip>

              {/* SECONDARY — outlined */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://jackbear.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-sm sm:text-base min-h-[44px] w-full sm:w-auto"
                      data-ocid="hero.secondary_button"
                      onClick={() => track("cta-learn")}
                    >
                      Learn the System
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" sideOffset={8}>
                    Gamified AI academy. Learn before you build.
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>

          {/* Proof strip */}
          <div
            className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4"
            data-ocid="hero.proof_strip"
          >
            {PROOF_ITEMS.map((item, i) => (
              <span
                key={item}
                className="flex items-center gap-2 text-xs section-label"
                style={{ color: "oklch(0.42 0.008 55)" }}
                data-ocid={`hero.proof.item.${i + 1}`}
              >
                {i > 0 && (
                  <span
                    className="w-1 h-1 rounded-full inline-block"
                    style={{ background: "oklch(0.72 0.17 70 / 0.35)" }}
                    aria-hidden="true"
                  />
                )}
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-glow-line"
        aria-hidden="true"
      >
        <div
          className="w-px h-12 mx-auto"
          style={{
            background:
              "linear-gradient(to bottom, rgba(59,130,246,0.6), transparent)",
          }}
        />
      </div>
    </section>
  );
}

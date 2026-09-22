export default function HeroSection() {
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
        {/* ── Badge + live-status pill ───────────────────────── */}
        <div
          className="entrance-content inline-flex items-center gap-2.5 rounded-full px-4 py-2"
          style={{
            background: "oklch(0.14 0.015 265 / 0.6)",
            border: "1px solid oklch(var(--border) / 0.5)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
          data-ocid="hero.badge"
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{
              background: "oklch(0.7 0.16 150)",
              boxShadow: "0 0 8px oklch(0.7 0.16 150 / 0.8)",
            }}
            aria-hidden="true"
          />
          <span
            className="section-label"
            style={{ color: "oklch(0.78 0.012 265)" }}
          >
            Sovereign Cloud Infrastructure
          </span>
          <span
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider"
            style={{
              background: "oklch(0.7 0.16 150 / 0.12)",
              border: "1px solid oklch(0.7 0.16 150 / 0.3)",
              color: "oklch(0.78 0.14 150)",
            }}
            data-ocid="hero.status_pill"
          >
            <span
              className="w-1 h-1 rounded-full bg-current"
              aria-hidden="true"
            />
            Operational
          </span>
        </div>

        {/* ── Logo container — CLS-safe: explicit space reserved ── */}
        <div
          className="entrance-logo"
          data-ocid="hero.logo"
          style={{
            width: "clamp(280px, 50vw, 560px)",
            aspectRatio: "1 / 1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/assets/smart-cloud-icon.png"
            alt="The Smart Cloud — Results over attention"
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
        <div className="entrance-content flex flex-col items-center gap-6 w-full">
          {/* Headline — gradient for premium feel */}
          <h1
            className="hero-text hero-text-gradient"
            data-ocid="hero.headline"
          >
            From cloud oligopolies
            <br className="hidden sm:block" /> to trustless on-chain execution.
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg sm:text-xl md:text-2xl font-sans font-semibold max-w-2xl"
            data-ocid="hero.subheadline"
            style={{
              color: "oklch(0.92 0.02 265)",
              letterSpacing: "0.01em",
              lineHeight: "1.25",
            }}
          >
            The Smart Cloud is the first system designed for autonomous agents —
            not human attention.
          </p>

          {/* Tagline */}
          <p
            className="section-label"
            data-ocid="hero.tagline"
            style={{ color: "oklch(0.6 0.01 265)" }}
          >
            Results over attention.
          </p>
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

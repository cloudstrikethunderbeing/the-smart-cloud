import NarrativeBlock, { FadeUp } from "../NarrativeBlock";

export default function Block4Reveal() {
  return (
    <NarrativeBlock
      id="block-reveal"
      minHeight="80vh"
      data-ocid="block4.section"
      className="text-center"
    >
      {/* Gold ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, oklch(0.72 0.17 70 / 0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        <FadeUp data-ocid="block4.headline">
          <h2
            className="text-3xl sm:text-5xl md:text-7xl font-bold font-display tracking-tight leading-tight"
            style={{ color: "oklch(0.72 0.17 70)" }}
          >
            AI selects what works.
          </h2>
        </FadeUp>
      </div>
    </NarrativeBlock>
  );
}

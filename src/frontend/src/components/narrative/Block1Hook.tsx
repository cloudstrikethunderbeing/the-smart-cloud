import NarrativeBlock, { FadeUp } from "../NarrativeBlock";

export default function Block1Hook() {
  return (
    <NarrativeBlock
      id="block-hook"
      minHeight="100vh"
      data-ocid="block1.section"
      className="text-center"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
        <FadeUp data-ocid="block1.line1">
          <h2
            className="text-3xl sm:text-5xl md:text-7xl font-bold font-display tracking-tight leading-[1.05]"
            style={{ color: "oklch(0.97 0 0)" }}
          >
            The internet you use…
          </h2>
        </FadeUp>
        <FadeUp delay={0.25} data-ocid="block1.line2">
          <h2
            className="text-3xl sm:text-5xl md:text-7xl font-bold font-display tracking-tight leading-[1.05]"
            style={{ color: "oklch(0.97 0 0)" }}
          >
            was not built for AI.
          </h2>
        </FadeUp>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-glow-line"
        aria-hidden="true"
      >
        <div className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent mx-auto" />
      </div>
    </NarrativeBlock>
  );
}

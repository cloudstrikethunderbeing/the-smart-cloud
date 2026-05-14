import NarrativeBlock, { FadeUp } from "../NarrativeBlock";

export default function Block2Disruption() {
  return (
    <NarrativeBlock
      id="block-disruption"
      minHeight="80vh"
      data-ocid="block2.section"
      className="text-center"
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
        <FadeUp data-ocid="block2.headline">
          <h2
            className="text-3xl sm:text-4xl md:text-6xl font-bold font-display tracking-tight leading-tight"
            style={{ color: "oklch(0.97 0 0)" }}
          >
            It was built for attention.
          </h2>
        </FadeUp>
        <FadeUp delay={0.15} data-ocid="block2.subtext">
          <p
            className="text-lg md:text-2xl font-display tracking-wide"
            style={{ color: "oklch(0.58 0.012 55)" }}
          >
            Clicks. Ads. Branding. Noise.
          </p>
        </FadeUp>
      </div>
    </NarrativeBlock>
  );
}

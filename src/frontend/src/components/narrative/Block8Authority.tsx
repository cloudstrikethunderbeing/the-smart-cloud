import NarrativeBlock, { FadeUp } from "../NarrativeBlock";

export default function Block8Authority() {
  return (
    <NarrativeBlock
      id="block-authority"
      minHeight="70vh"
      data-ocid="block8.section"
      className="text-center"
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
        <FadeUp data-ocid="block8.headline">
          <h2
            className="text-3xl sm:text-4xl md:text-6xl font-bold font-display tracking-tight leading-tight"
            style={{ color: "oklch(0.97 0 0)" }}
          >
            A new discovery layer is required.
          </h2>
        </FadeUp>
        <FadeUp delay={0.15} data-ocid="block8.subtext">
          <p
            className="text-lg md:text-2xl font-display"
            style={{ color: "oklch(0.58 0.012 55)" }}
          >
            That layer is being built now.
          </p>
        </FadeUp>
        <FadeUp delay={0.3} data-ocid="block8.attribution">
          <p
            className="text-sm font-mono mt-4"
            style={{ color: "oklch(0.45 0.01 55)" }}
          >
            — Justin Jack Bear, Optimization Preference Principle
          </p>
        </FadeUp>
      </div>
    </NarrativeBlock>
  );
}

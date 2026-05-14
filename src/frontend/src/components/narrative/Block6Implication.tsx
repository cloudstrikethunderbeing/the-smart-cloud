import NarrativeBlock, { FadeUp } from "../NarrativeBlock";

export default function Block6Implication() {
  return (
    <NarrativeBlock
      id="block-implication"
      minHeight="70vh"
      data-ocid="block6.section"
      className="text-center"
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
        <FadeUp data-ocid="block6.headline">
          <h2
            className="text-3xl sm:text-4xl md:text-6xl font-bold font-display tracking-tight leading-tight"
            style={{ color: "oklch(0.97 0 0)" }}
          >
            This changes everything.
          </h2>
        </FadeUp>
        <FadeUp delay={0.15} data-ocid="block6.subtext">
          <p
            className="text-lg md:text-2xl font-display"
            style={{ color: "oklch(0.58 0.012 55)" }}
          >
            The winners won't be the most visible.
          </p>
        </FadeUp>
      </div>
    </NarrativeBlock>
  );
}

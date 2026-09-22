import { KeyRound, ShieldCheck, Workflow } from "lucide-react";

interface Pillar {
  id: string;
  title: string;
  description: string;
  icon: "chain" | "workflow" | "sovereignty";
}

const PILLARS: Pillar[] = [
  {
    id: "chain-key",
    title: "Chain-Key Architecture",
    description:
      "Cryptographic verifiability without centralized server reliance.",
    icon: "chain",
  },
  {
    id: "autonomous",
    title: "Autonomous Workflows",
    description:
      "Continuous on-chain execution for social and operational agents.",
    icon: "workflow",
  },
  {
    id: "sovereignty",
    title: "True Data Sovereignty",
    description:
      "Moving past physical server location to absolute cryptographic key control.",
    icon: "sovereignty",
  },
];

function PillarIcon({ icon }: { icon: Pillar["icon"] }) {
  const common = { size: 22, strokeWidth: 1.8 };
  if (icon === "chain") return <KeyRound {...common} />;
  if (icon === "workflow") return <Workflow {...common} />;
  return <ShieldCheck {...common} />;
}

export default function PillarsGrid() {
  return (
    <section
      data-ocid="pillars.section"
      className="relative isolate px-4 sm:px-6 py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col items-center gap-3 text-center mb-10 md:mb-14">
          <p
            className="section-label"
            style={{ color: "oklch(0.52 0.14 250 / 0.85)" }}
            data-ocid="pillars.label"
          >
            Core Pillars
          </p>
          <h2 className="section-heading" data-ocid="pillars.headline">
            Built on sovereign fundamentals
          </h2>
        </div>

        {/* Bento grid — 1-col mobile, 3-col desktop */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          data-ocid="pillars.grid"
        >
          {PILLARS.map((pillar) => (
            <article
              key={pillar.id}
              className="eco-card flex flex-col p-6 md:p-7 min-h-[220px]"
              data-ocid={`pillars.card.${pillar.id}`}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: "oklch(0.72 0.16 250 / 0.14)",
                  border: "1px solid oklch(var(--border) / 0.5)",
                  color: "oklch(0.72 0.16 250)",
                }}
                aria-hidden="true"
              >
                <PillarIcon icon={pillar.icon} />
              </div>

              <h3
                className="text-lg font-bold font-display tracking-tight mb-2"
                data-ocid={`pillars.card.${pillar.id}.title`}
              >
                {pillar.title}
              </h3>

              <p
                className="text-sm md:text-base font-body leading-relaxed"
                style={{ color: "oklch(0.68 0.01 265)" }}
                data-ocid={`pillars.card.${pillar.id}.description`}
              >
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

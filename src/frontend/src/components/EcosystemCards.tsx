import { useActor } from "@caffeineai/core-infrastructure";
import { ArrowUpRight, Bot, Landmark } from "lucide-react";
import { createActor } from "../backend";

interface EcosystemCardData {
  id: string;
  label: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: "agent" | "institutional";
  accent: "agent" | "institutional";
}

const CARDS: EcosystemCardData[] = [
  {
    id: "builder",
    label: "Builder Pathway",
    title: "OpenAgentOS",
    description:
      "Launch autonomous, self-custodial AI agents on-chain with 1-click.",
    href: "https://open-agent-os-nsz.caffeine.xyz/",
    cta: "Deploy X Agent",
    icon: "agent",
    accent: "agent",
  },
  {
    id: "institutional",
    label: "Institutional Pathway",
    title: "Global Compute Reserve",
    description:
      "Secure institutional membership within the Global Compute Reserve Foundation.",
    href: "https://global-compute-reserve-1xm.caffeine.xyz/",
    cta: "Explore Foundation",
    icon: "institutional",
    accent: "institutional",
  },
];

export default function EcosystemCards() {
  const { actor } = useActor(createActor);

  function track(elementId: string) {
    if (actor) actor.trackClick(elementId).catch(() => {});
  }

  return (
    <section
      data-ocid="ecosystem.section"
      className="relative isolate px-4 sm:px-6 py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col items-center gap-3 text-center mb-10 md:mb-14">
          <p
            className="section-label"
            style={{ color: "oklch(0.52 0.14 250 / 0.85)" }}
            data-ocid="ecosystem.label"
          >
            Two Pathways
          </p>
          <h2 className="section-heading" data-ocid="ecosystem.headline">
            Choose your entry point
          </h2>
        </div>

        {/* Responsive 2-col grid (1-col mobile) */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          data-ocid="ecosystem.grid"
        >
          {CARDS.map((card) => (
            <article
              key={card.id}
              className="eco-card flex flex-col p-6 md:p-8 min-h-[280px]"
              data-ocid={`ecosystem.card.${card.id}`}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{
                  background:
                    card.accent === "agent"
                      ? "linear-gradient(135deg, oklch(0.72 0.16 250 / 0.18), oklch(0.62 0.18 305 / 0.18))"
                      : "linear-gradient(135deg, oklch(0.78 0.13 200 / 0.16), oklch(0.72 0.16 250 / 0.16))",
                  border: "1px solid oklch(var(--border) / 0.5)",
                  color:
                    card.accent === "agent"
                      ? "oklch(0.72 0.16 250)"
                      : "oklch(0.78 0.13 200)",
                }}
                aria-hidden="true"
              >
                {card.icon === "agent" ? (
                  <Bot size={22} strokeWidth={1.8} />
                ) : (
                  <Landmark size={22} strokeWidth={1.8} />
                )}
              </div>

              {/* Label */}
              <p
                className="section-label mb-2"
                style={{
                  color:
                    card.accent === "agent"
                      ? "oklch(0.6 0.12 250)"
                      : "oklch(0.6 0.1 200)",
                }}
                data-ocid={`ecosystem.card.${card.id}.label`}
              >
                {card.label}
              </p>

              {/* Title */}
              <h3
                className="text-2xl font-bold font-display tracking-tight mb-3"
                data-ocid={`ecosystem.card.${card.id}.title`}
              >
                {card.title}
              </h3>

              {/* Description */}
              <p
                className="text-base font-body leading-relaxed mb-6"
                style={{ color: "oklch(0.68 0.01 265)" }}
                data-ocid={`ecosystem.card.${card.id}.description`}
              >
                {card.description}
              </p>

              {/* Action */}
              <div className="mt-auto">
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-base"
                  data-ocid={`ecosystem.card.${card.id}.button`}
                  onClick={() => track(`ecosystem-${card.id}`)}
                >
                  {card.cta}
                  <ArrowUpRight size={18} className="ml-2" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

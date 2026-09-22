import { useActor } from "@caffeineai/core-infrastructure";
import { Linkedin, Twitter } from "lucide-react";
import { createActor } from "../backend";

const SOCIALS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/justinjackbear/",
    icon: Linkedin,
  },
  {
    id: "x",
    label: "X / Twitter",
    href: "https://x.com/jackbearsupply",
    icon: Twitter,
  },
];

export default function FounderCard() {
  const { actor } = useActor(createActor);

  function track(elementId: string) {
    if (actor) actor.trackClick(elementId).catch(() => {});
  }

  return (
    <section
      data-ocid="founder.section"
      className="relative isolate px-4 sm:px-6 py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-3xl mx-auto">
        <article
          className="eco-card flex flex-col items-center text-center p-8 md:p-12"
          data-ocid="founder.card"
        >
          {/* Avatar monogram */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.16 250 / 0.25), oklch(0.62 0.18 305 / 0.25))",
              border: "1px solid oklch(var(--border) / 0.6)",
              color: "oklch(0.92 0.02 265)",
              boxShadow: "0 0 24px -6px oklch(0.72 0.16 250 / 0.4)",
            }}
            aria-hidden="true"
          >
            <span className="text-2xl font-bold font-display tracking-tight">
              JB
            </span>
          </div>

          {/* Label */}
          <p
            className="section-label mb-3"
            style={{ color: "oklch(0.52 0.14 250 / 0.85)" }}
            data-ocid="founder.label"
          >
            The Architect
          </p>

          {/* Name */}
          <h3
            className="text-2xl md:text-3xl font-bold font-display tracking-tight mb-4"
            data-ocid="founder.name"
          >
            Justin Jackbear
          </h3>

          {/* Bio */}
          <p
            className="text-base md:text-lg font-body leading-relaxed max-w-xl"
            style={{ color: "oklch(0.68 0.01 265)" }}
            data-ocid="founder.bio"
          >
            Architect and founder behind The Smart Cloud — building the
            sovereign infrastructure where autonomous agents execute on-chain,
            ranked by results rather than attention.
          </p>

          {/* Social actions */}
          <div
            className="flex items-center gap-3 mt-8"
            data-ocid="founder.socials"
          >
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn"
                  aria-label={social.label}
                  data-ocid={`founder.social.${social.id}`}
                  onClick={() => track(`founder-${social.id}`)}
                >
                  <Icon size={20} strokeWidth={1.8} />
                </a>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
}

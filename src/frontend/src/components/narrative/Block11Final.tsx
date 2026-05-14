import { useActor } from "@caffeineai/core-infrastructure";
import { AuthClient } from "@dfinity/auth-client";
import { useNavigate } from "@tanstack/react-router";
import { createActor } from "../../backend";
import NarrativeBlock, { FadeUp } from "../NarrativeBlock";

const YEAR = new Date().getFullYear();

// ICP / Infinity lemniscate symbol — subtle credibility mark
function ICPInfinitySymbol() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 32"
      width="32"
      height="16"
      fill="none"
      aria-hidden="true"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <path
        d="M32 16 C32 16 26 4 16 4 C8 4 4 9.6 4 16 C4 22.4 8 28 16 28
           C26 28 38 4 48 4 C56 4 60 9.6 60 16 C60 22.4 56 28 48 28
           C38 28 32 16 32 16 Z"
        stroke="oklch(0.72 0.17 70 / 0.4)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function Block11Final() {
  const { actor } = useActor(createActor);
  const navigate = useNavigate();

  const hostname =
    typeof window !== "undefined"
      ? window.location.hostname
      : "thesmartcloud.org";

  function track(elementId: string) {
    if (actor) actor.trackClick(elementId).catch(() => {});
  }

  const KNOWN_ADMIN_PIDS = new Set([
    "edxi4-5w5kv-nlgup-pf75l-xc756-6ucld-bpr76-eyz3v-t2wpf-chawz-aae",
    "hjxba-6xyu5-nzkdy-t62ib-rlq5r-7cgtg-de4rm-x2xya-rlnzj-hwwhe-6qe",
  ]);

  async function handleHiddenAdminClick() {
    try {
      const authClient = await AuthClient.create();
      const alreadyAuth = await authClient.isAuthenticated();
      if (alreadyAuth) {
        const pid = authClient.getIdentity().getPrincipal().toText();
        if (KNOWN_ADMIN_PIDS.has(pid)) {
          void navigate({ to: "/admin" });
        }
        return;
      }
      await new Promise<void>((resolve, reject) => {
        authClient.login({
          identityProvider: "https://identity.ic0.app",
          onSuccess: resolve,
          onError: reject,
        });
      });
      const pid = authClient.getIdentity().getPrincipal().toText();
      if (KNOWN_ADMIN_PIDS.has(pid)) {
        void navigate({ to: "/admin" });
      }
    } catch {
      // silently fail — hidden button, no feedback to regular users
    }
  }

  return (
    <NarrativeBlock
      id="block-final"
      minHeight="100vh"
      data-ocid="block11.section"
      className="text-center"
    >
      {/* Purple gradient fade at the bottom — premium close */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(13,10,30,0.5) 70%, rgba(5,7,10,1) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Layered radial glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: [
            "radial-gradient(ellipse 70% 45% at 50% 40%, rgba(59,130,246,0.07) 0%, transparent 60%)",
            "radial-gradient(ellipse 50% 35% at 50% 55%, rgba(139,92,246,0.06) 0%, transparent 55%)",
          ].join(","),
        }}
      />

      {/* Top gradient divider */}
      <div
        className="absolute top-0 left-0 right-0 gradient-divider"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
        <FadeUp data-ocid="block11.line1">
          <h2
            className="text-4xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight leading-[1.05]"
            style={{ color: "oklch(0.97 0 0)" }}
          >
            The internet will not choose itself.
          </h2>
        </FadeUp>

        <FadeUp delay={0.15} data-ocid="block11.line2">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight leading-[1.05] gradient-text">
            Agents will choose it.
          </h2>
        </FadeUp>

        <FadeUp delay={0.3} data-ocid="block11.cta_wrapper">
          <a
            href="https://bearlyhuman.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base mt-8 px-10 py-4 w-full sm:w-auto min-h-[44px] block sm:inline-flex"
            data-ocid="block11.primary_button"
            onClick={() => track("cta-enter")}
          >
            Enter the Smart Cloud
          </a>
        </FadeUp>

        {/* ICP credibility signal */}
        <FadeUp delay={0.5} data-ocid="block11.icp_signal">
          <div
            className="flex flex-col items-center gap-2 mt-12"
            style={{ opacity: 0.35 }}
          >
            <ICPInfinitySymbol />
            <p
              className="text-xs tracking-wide"
              style={{
                color: "oklch(0.52 0.01 55)",
                fontFamily: "var(--font-body)",
                letterSpacing: "0.04em",
              }}
            >
              Built with Internet Computer Protocol infrastructure in mind.
            </p>
          </div>
        </FadeUp>
      </div>

      <footer
        className="absolute bottom-8 left-0 right-0 z-10 text-center px-4"
        data-ocid="block11.footer"
      >
        <div className="flex flex-col items-center gap-2">
          <p
            className="text-xs section-label flex flex-wrap justify-center gap-x-2 gap-y-1 items-center"
            style={{ color: "oklch(0.32 0.008 55)" }}
          >
            <span>© {YEAR} The Smart Cloud.</span>
            <a
              href="https://thesmartcloud.org"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-smooth hover:opacity-80"
              style={{ color: "oklch(0.4 0.01 55)" }}
              data-ocid="block11.footer.site_link"
            >
              thesmartcloud.org
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-smooth hover:opacity-80"
              style={{ color: "oklch(0.4 0.01 55)" }}
              data-ocid="block11.footer.caffeine_link"
            >
              Built with caffeine.ai
            </a>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={handleHiddenAdminClick}
              className="transition-smooth"
              style={{
                color: "oklch(0.2 0.005 55)",
                fontSize: "10px",
                opacity: 0.18,
                background: "none",
                border: "none",
                padding: "4px 6px",
                cursor: "pointer",
              }}
              data-ocid="block11.footer.admin_link"
            >
              ·
            </button>
          </p>
        </div>
      </footer>
    </NarrativeBlock>
  );
}

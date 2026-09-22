import { useNavigate } from "@tanstack/react-router";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer
      data-ocid="footer"
      className="relative isolate px-4 sm:px-6 py-10 md:py-14"
      style={{
        background: "oklch(0.05 0.01 265 / 0.6)",
        borderTop: "1px solid oklch(var(--border) / 0.4)",
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6 text-center">
        {/* Brand */}
        <div className="flex flex-col items-center gap-2">
          <span
            className="text-lg font-bold font-display tracking-tight"
            style={{ color: "oklch(0.92 0.02 265)" }}
          >
            The Smart Cloud
          </span>
          <span
            className="section-label"
            style={{ color: "oklch(0.6 0.01 265)" }}
          >
            Results over attention.
          </span>
        </div>

        {/* Divider */}
        <div className="w-full max-w-xs gradient-divider" aria-hidden="true" />

        {/* Copyright */}
        <p
          className="text-sm font-body"
          style={{ color: "oklch(0.5 0.01 265)" }}
        >
          © {new Date().getFullYear()} The Smart Cloud. All rights reserved.
        </p>

        {/* Hidden admin nav — internal navigation, preserved */}
        <button
          type="button"
          onClick={() => void navigate({ to: "/admin" })}
          className="text-xs font-body transition-colors duration-200 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-2 py-1"
          style={{ color: "oklch(0.38 0.01 265)" }}
          data-ocid="footer.admin_link"
        >
          Admin
        </button>
      </div>
    </footer>
  );
}

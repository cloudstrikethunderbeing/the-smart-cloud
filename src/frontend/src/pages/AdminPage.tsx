import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { AuthClient } from "@dfinity/auth-client";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import React from "react";
import { EmailStatus, type ThesisRequest, createActor } from "../backend";

type AccessState = "checking" | "granted" | "denied";

/* ─── Constants ──────────────────────────────────────────────── */
const PAGE_SIZE = 20;

const ELEMENT_LABELS: Record<string, string> = {
  "cta-try-it": "Try It CTA",
  "cta-watch": "Watch the System",
  "cta-request-access": "Request Access CTA",
  "cta-explore": "Explore Live System",
  "cta-enter": "Enter Smart Cloud",
  "video-thesis": "Thesis Video",
  "eco-jackbear": "JackBear.ai Link",
  "eco-bearlyhuman": "BearlyHuman.ai Link",
  "eco-lite": "Lite Link",
  "form-submit": "Thesis Form Submit",
};

type TimeFilter = "all" | "7d" | "30d";

/* ─── Helpers ────────────────────────────────────────────────── */
function formatTimestamp(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function filterByTime(
  requests: ThesisRequest[],
  filter: TimeFilter,
): ThesisRequest[] {
  if (filter === "all") return requests;
  const now = Date.now();
  const cutoff =
    filter === "7d" ? 7 * 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000;
  return requests.filter((r) => {
    const ms = Number(r.timestamp) / 1_000_000;
    return now - ms <= cutoff;
  });
}

function truncatePrincipal(p: string): string {
  if (p.length <= 14) return p;
  return `${p.slice(0, 10)}...`;
}

/* ─── Dark shell wrapper ─────────────────────────────────────── */
function DarkShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark min-h-screen bg-background text-foreground font-body antialiased">
      {children}
    </div>
  );
}

/* ─── Copy button ────────────────────────────────────────────── */
function CopyButton({
  text,
  label = "Copy",
  className = "",
  ocid,
}: {
  text: string;
  label?: string;
  className?: string;
  ocid?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 text-xs font-body font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`}
      data-ocid={ocid}
      aria-label={`Copy ${label}`}
    >
      {copied ? (
        <>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <title>Copied</title>
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Copied!</span>
        </>
      ) : (
        <>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <title>Copy</title>
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <span>{label}</span>
        </>
      )}
    </button>
  );
}

/* ─── Status pill ────────────────────────────────────────────── */
function StatusPill({ status }: { status: EmailStatus }) {
  const map: Record<EmailStatus, { label: string; color: string; bg: string }> =
    {
      [EmailStatus.Queued]: {
        label: "Queued",
        color: "oklch(0.62 0.012 55)",
        bg: "oklch(0.25 0.012 55 / 0.4)",
      },
      [EmailStatus.Sent]: {
        label: "Sent",
        color: "oklch(0.72 0.18 145)",
        bg: "oklch(0.72 0.18 145 / 0.12)",
      },
      [EmailStatus.Failed]: {
        label: "Failed",
        color: "oklch(0.65 0.19 22)",
        bg: "oklch(0.65 0.19 22 / 0.12)",
      },
    };
  const { label, color, bg } = map[status];
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-body"
      style={{ color, background: bg }}
    >
      {label}
    </span>
  );
}

/* ─── Spinner ────────────────────────────────────────────────── */
function Spinner({
  size = 6,
  label = "Loading",
}: { size?: number; label?: string }) {
  return (
    <span
      className={`inline-block w-${size} h-${size} rounded-full border-2 border-t-transparent border-primary/30 [border-right-color:oklch(var(--primary))] [border-bottom-color:oklch(var(--primary))] animate-spin`}
      aria-label={label}
      role="status"
    />
  );
}

/* ─── Full-page loader ───────────────────────────────────────── */
function PageLoader() {
  return (
    <DarkShell>
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    </DarkShell>
  );
}

/* ─── Access denied screen ───────────────────────────────────── */
function AccessDeniedScreen({
  onBack,
  onLogout,
  isChecking = false,
}: {
  onBack: () => void;
  onLogout: () => void;
  isChecking?: boolean;
}) {
  return (
    <DarkShell>
      <div
        className="min-h-screen flex items-center justify-center px-4 py-12"
        data-ocid="admin.access_denied"
      >
        <div className="flex flex-col items-center gap-6 max-w-xs w-full text-center">
          {/* Logo — spinning while checking, static when denied */}
          <div
            className="relative flex items-center justify-center"
            aria-hidden="true"
          >
            <img
              src="/assets/smart-cloud-icon.png"
              alt=""
              width={140}
              height={140}
              style={{
                mixBlendMode: "screen",
                filter:
                  "drop-shadow(0 0 24px oklch(0.65 0.22 255 / 0.55)) drop-shadow(0 0 8px oklch(0.75 0.18 220 / 0.4))",
                animation: isChecking
                  ? "admin-logo-spin 3s linear infinite"
                  : "logo-glow 4s ease-in-out infinite",
              }}
            />
          </div>

          {/* Heading + subtitle */}
          <div className="flex flex-col gap-2">
            <h1
              className={`text-2xl font-bold font-display tracking-tight ${isChecking ? "text-primary" : "text-foreground"}`}
            >
              {isChecking ? "Verifying Access…" : "Access Denied"}
            </h1>
            <p className="text-sm font-body text-muted-foreground leading-relaxed">
              {isChecking
                ? "Checking admin permissions — this only takes a moment."
                : "This account does not have admin access."}
            </p>
          </div>

          {/* Actions — only shown when denied */}
          {!isChecking && (
            <div className="flex flex-col items-center gap-3 w-full mt-2">
              <button
                type="button"
                onClick={onLogout}
                className="btn-secondary w-full"
                data-ocid="admin.logout_button"
              >
                Logout / Switch Identity
              </button>
              <button
                type="button"
                onClick={onBack}
                className="text-xs font-body text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                data-ocid="admin.back_to_site_button"
              >
                ← Back to site
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Spin keyframe injected inline — avoids touching index.css */}
      <style>{`
        @keyframes admin-logo-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </DarkShell>
  );
}

/* ─── Filter pill ────────────────────────────────────────────── */
function FilterPill({
  label,
  active,
  onClick,
  ocid,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  ocid: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-xs font-semibold font-body transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border ${
        active
          ? "border-primary/70 text-primary bg-primary/10"
          : "border-border text-muted-foreground bg-transparent hover:border-primary/40 hover:text-primary"
      }`}
      data-ocid={ocid}
    >
      {label}
    </button>
  );
}

/* ─── Canister ID card ───────────────────────────────────────── */
function CanisterIdCard({ actor }: { actor: ReturnType<typeof createActor> }) {
  const { isAuthenticated } = useInternetIdentity();
  const { data: canisterId, isLoading } = useQuery({
    queryKey: ["admin.canisterId"],
    queryFn: () => actor.getCanisterId(),
    enabled: isAuthenticated,
  });

  return (
    <div
      className="rounded-lg border border-border bg-card px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3"
      data-ocid="admin.canister_id.card"
    >
      <div className="flex items-center gap-2 min-w-0">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary shrink-0"
          aria-hidden="true"
        >
          <title>Canister</title>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Canister ID
        </span>
      </div>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {isLoading ? (
          <span className="text-xs font-mono text-muted-foreground">
            Loading…
          </span>
        ) : (
          <>
            <code
              className="text-xs font-mono text-primary truncate flex-1 bg-background/60 rounded px-2 py-1 border border-border/50"
              title={canisterId}
              data-ocid="admin.canister_id.value"
            >
              {canisterId ?? "—"}
            </code>
            {canisterId && (
              <CopyButton
                text={canisterId}
                label="Copy"
                className="text-primary hover:text-primary/80 shrink-0"
                ocid="admin.canister_id.copy_button"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Analytics section ──────────────────────────────────────── */
function AnalyticsSection({
  actor,
}: { actor: ReturnType<typeof createActor> }) {
  const { isAuthenticated } = useInternetIdentity();
  const {
    data: analyticsResult,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin.analytics"],
    queryFn: () => actor.getAnalytics(),
    enabled: isAuthenticated,
  });

  const analytics =
    analyticsResult?.__kind__ === "ok" ? analyticsResult.ok : null;

  const sortedClicks = analytics
    ? [...analytics.clickCounts].sort((a, b) => Number(b[1]) - Number(a[1]))
    : [];

  return (
    <div
      className="rounded-lg border border-border bg-card overflow-hidden"
      data-ocid="admin.analytics.section"
    >
      <div className="px-5 py-4 border-b border-border/60 flex items-center justify-between">
        <h2 className="text-sm font-bold font-display uppercase tracking-widest text-muted-foreground">
          Analytics
        </h2>
        {isLoading && <Spinner size={4} label="Loading analytics" />}
      </div>

      {(isError || analyticsResult?.__kind__ === "err") && (
        <div
          className="px-5 py-6 text-xs font-body text-muted-foreground"
          data-ocid="admin.analytics.error_state"
        >
          Analytics unavailable.
        </div>
      )}

      {!isLoading && analytics && (
        <div className="divide-y divide-border/40">
          {/* Visit count */}
          <div
            className="px-5 py-5 flex items-center gap-4"
            data-ocid="admin.analytics.visits"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                Total Visits
              </p>
              <p className="text-4xl font-bold font-display text-primary tabular-nums">
                {Number(analytics.visitCount).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Click stats table */}
          {sortedClicks.length > 0 && (
            <div data-ocid="admin.analytics.clicks_table">
              <div className="px-5 pt-4 pb-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Click Events
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-body">
                  <thead>
                    <tr className="border-b border-border/40">
                      <th className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Element
                      </th>
                      <th className="px-5 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Clicks
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedClicks.map(([elementId, count]) => (
                      <tr
                        key={elementId}
                        className="border-b border-border/20 hover:bg-muted/10"
                        data-ocid={`admin.analytics.clicks_table.item.${elementId}`}
                      >
                        <td className="px-5 py-3 text-foreground/80">
                          {ELEMENT_LABELS[elementId] ?? elementId}
                        </td>
                        <td className="px-5 py-3 text-right font-mono font-semibold text-primary tabular-nums">
                          {Number(count).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {sortedClicks.length === 0 && (
            <div className="px-5 py-4 text-xs font-body text-muted-foreground">
              No click events recorded yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Dashboard ──────────────────────────────────────────────── */
function Dashboard({
  principal,
  onLogout,
  actor,
}: {
  principal: string;
  onLogout: () => void;
  actor: ReturnType<typeof createActor>;
}) {
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState<TimeFilter>("all");
  const [page, setPage] = React.useState(1);
  const [copyAllState, setCopyAllState] = React.useState<"idle" | "copied">(
    "idle",
  );

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin.requests"],
    queryFn: async () => {
      const result = await actor.getAccessRequests();
      // Only throw (→ error state) on actual backend errors, not empty lists
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok; // may be an empty array — that's fine
    },
  });

  const filtered = filterByTime(data ?? [], filter);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  function handleFilterChange(f: TimeFilter) {
    setFilter(f);
    setPage(1);
  }

  function handleCopyAll() {
    const emails = filtered.map((r) => r.email).join("\n");
    navigator.clipboard.writeText(emails).then(() => {
      setCopyAllState("copied");
      setTimeout(() => setCopyAllState("idle"), 2000);
    });
  }

  return (
    <DarkShell>
      <div className="min-h-screen flex flex-col" data-ocid="admin.dashboard">
        {/* Header */}
        <header className="sticky top-0 z-20 flex items-center justify-between gap-4 px-5 py-4 border-b bg-card border-border">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xs font-bold font-display tracking-widest uppercase text-primary">
              Admin
            </span>
            <span
              className="hidden sm:inline text-xs font-mono truncate text-muted-foreground"
              title={principal}
            >
              {truncatePrincipal(principal)}
            </span>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="btn-secondary text-xs px-4 py-2"
            data-ocid="admin.logout_button"
          >
            Logout
          </button>
        </header>

        {/* Main content */}
        <main className="flex-1 px-4 sm:px-6 py-8 flex flex-col gap-6 max-w-6xl mx-auto w-full">
          {/* Back to site — quiet nav link, top-left of content area */}
          <div>
            <button
              type="button"
              onClick={() => void navigate({ to: "/" })}
              className="inline-flex items-center gap-1.5 text-xs font-body text-muted-foreground/60 hover:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              data-ocid="admin.back_to_site_button"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <title>Back</title>
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to site
            </button>
          </div>

          {/* Canister ID */}
          <CanisterIdCard actor={actor} />

          {/* Analytics */}
          <AnalyticsSection actor={actor} />

          {/* Title + filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-xl font-bold font-display text-foreground">
              Thesis Access Requests
            </h1>
            <div className="flex items-center gap-2" data-ocid="admin.filters">
              <FilterPill
                label="All Time"
                active={filter === "all"}
                onClick={() => handleFilterChange("all")}
                ocid="admin.filter_all.tab"
              />
              <FilterPill
                label="Last 7 Days"
                active={filter === "7d"}
                onClick={() => handleFilterChange("7d")}
                ocid="admin.filter_7d.tab"
              />
              <FilterPill
                label="Last 30 Days"
                active={filter === "30d"}
                onClick={() => handleFilterChange("30d")}
                ocid="admin.filter_30d.tab"
              />
            </div>
          </div>

          {/* Copy All button */}
          {!isLoading && !isError && filtered.length > 0 && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleCopyAll}
                className={`inline-flex items-center gap-2 text-xs font-body font-semibold px-4 py-2 rounded border transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  copyAllState === "copied"
                    ? "border-primary/50 text-primary bg-primary/10"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary bg-transparent"
                }`}
                data-ocid="admin.copy_all_emails_button"
              >
                {copyAllState === "copied" ? (
                  <>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <title>Copied</title>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied {filtered.length} email
                    {filtered.length !== 1 ? "s" : ""}!
                  </>
                ) : (
                  <>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <title>Copy All</title>
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy All Emails ({filtered.length})
                  </>
                )}
              </button>
            </div>
          )}

          {/* Table card */}
          <div
            className="rounded-lg overflow-hidden border border-border bg-card"
            data-ocid="admin.requests_table"
          >
            {/* Loading */}
            {isLoading && (
              <div
                className="flex items-center justify-center gap-3 py-20 text-sm font-body text-muted-foreground"
                data-ocid="admin.loading_state"
              >
                <Spinner size={5} />
                Loading…
              </div>
            )}

            {/* Error — only shown on actual backend errors */}
            {isError && (
              <div
                className="flex flex-col items-center gap-4 py-20"
                data-ocid="admin.error_state"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-destructive/60"
                  aria-hidden="true"
                >
                  <title>Error</title>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-sm font-body text-destructive">
                  Could not load requests.
                </p>
                <button
                  type="button"
                  onClick={() => void refetch()}
                  className="btn-secondary text-xs px-4 py-2"
                  data-ocid="admin.retry_button"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Table */}
            {!isLoading && !isError && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-body border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      {(
                        [
                          "Email",
                          "Comment",
                          "Submitted",
                          "Email Status",
                          "",
                        ] as const
                      ).map((h) => (
                        <th
                          key={h}
                          className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paged.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-5 py-16 text-center"
                          data-ocid="admin.empty_state"
                        >
                          {/* If there are truly no submissions yet */}
                          {(data ?? []).length === 0 ? (
                            <div className="flex flex-col items-center gap-3">
                              <svg
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-muted-foreground/40"
                                aria-hidden="true"
                              >
                                <title>Inbox</title>
                                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                                <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                              </svg>
                              <p className="text-sm font-semibold font-display text-muted-foreground/70">
                                No requests yet
                              </p>
                              <p className="text-xs font-body text-muted-foreground/50 max-w-xs leading-relaxed">
                                Thesis access requests will appear here once
                                visitors submit the form.
                              </p>
                            </div>
                          ) : (
                            /* There are submissions but none match the current filter */
                            <p className="text-sm font-body text-muted-foreground">
                              No requests in this time range.
                            </p>
                          )}
                        </td>
                      </tr>
                    ) : (
                      paged.map((req, i) => {
                        const rowNum = (safePage - 1) * PAGE_SIZE + i + 1;
                        return (
                          <tr
                            key={`${req.email}-${req.timestamp.toString()}`}
                            className="border-b border-border/40 hover:bg-muted/5"
                            data-ocid={`admin.requests_table.item.${rowNum}`}
                          >
                            <td className="px-5 py-4 font-body text-foreground">
                              <span className="break-all">{req.email}</span>
                            </td>
                            <td
                              className={`px-5 py-4 max-w-xs font-body ${req.comment ? "text-foreground/80" : "text-muted-foreground"}`}
                            >
                              {req.comment ?? "—"}
                            </td>
                            <td className="px-5 py-4 whitespace-nowrap font-body text-muted-foreground">
                              {formatTimestamp(req.timestamp)}
                            </td>
                            <td className="px-5 py-4">
                              <StatusPill status={req.emailStatus} />
                            </td>
                            <td className="px-5 py-4">
                              <CopyButton
                                text={req.email}
                                label="Email"
                                className="text-muted-foreground hover:text-primary"
                                ocid={`admin.requests_table.copy_email.${rowNum}`}
                              />
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination */}
          {!isLoading && !isError && filtered.length > PAGE_SIZE && (
            <div
              className="flex items-center justify-between gap-4"
              data-ocid="admin.pagination"
            >
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage <= 1}
                className="btn-secondary text-xs px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed"
                data-ocid="admin.pagination_prev"
              >
                Previous
              </button>
              <span className="text-xs font-body text-muted-foreground">
                Page {safePage} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage >= totalPages}
                className="btn-secondary text-xs px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed"
                data-ocid="admin.pagination_next"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </DarkShell>
  );
}

/* ─── Known admin principal IDs (client-side fast path) ─────── */
const KNOWN_ADMIN_PIDS = new Set([
  "edxi4-5w5kv-nlgup-pf75l-xc756-6ucld-bpr76-eyz3v-t2wpf-chawz-aae",
  "hjxba-6xyu5-nzkdy-t62ib-rlq5r-7cgtg-de4rm-x2xya-rlnzj-hwwhe-6qe",
]);

/* ─── Admin gate ──────────────────────────────────────────────── */
function AdminGate() {
  const { actor } = useActor(createActor);
  const { identity, isAuthenticated, isInitializing, clear } =
    useInternetIdentity();
  const navigate = useNavigate();

  const principalId = isAuthenticated
    ? (identity?.getPrincipal().toText() ?? "")
    : "";

  // ── Access state machine ───────────────────────────────────────
  // We skip "checking" as an intermediate UI state entirely.
  // On mount we do an instant client-side check against KNOWN_ADMIN_PIDS.
  // If not in the fast-path list, we fall back to the backend call once.
  const [accessState, setAccessState] = React.useState<AccessState>("checking");

  React.useEffect(() => {
    if (isInitializing) return;

    // Not authenticated — resolve immediately to denied (no login prompt)
    if (!isAuthenticated) {
      setAccessState("denied");
      return;
    }

    if (accessState !== "checking") return;

    // Fast path: known admin PIDs never hit the backend
    if (principalId && KNOWN_ADMIN_PIDS.has(principalId)) {
      setAccessState("granted");
      return;
    }

    // Backend fallback (single attempt, no retry loop — user already authed via footer button)
    if (!actor) return;
    let cancelled = false;
    void (async () => {
      try {
        const isAdmin = await Promise.race([
          actor.isCallerAdmin(),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), 8000),
          ),
        ]);
        if (!cancelled) setAccessState(isAdmin === true ? "granted" : "denied");
      } catch {
        if (!cancelled) setAccessState("denied");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, isInitializing, actor, accessState, principalId]);

  // Reset on logout
  React.useEffect(() => {
    if (!isAuthenticated && !isInitializing) {
      setAccessState("denied");
    }
  }, [isAuthenticated, isInitializing]);

  // Still initializing Internet Identity — brief neutral loader
  if (isInitializing) {
    return <PageLoader />;
  }

  // Access confirmed → Dashboard
  if (accessState === "granted" && actor) {
    return <Dashboard principal={principalId} onLogout={clear} actor={actor} />;
  }

  // Denied (unauthenticated or not-admin) — minimal screen, no login button
  return (
    <AccessDeniedScreen
      onBack={() => void navigate({ to: "/" })}
      onLogout={clear}
      isChecking={false}
    />
  );
}

/* ─── Main export ─────────────────────────────────────────────── */
export default function AdminPage() {
  return <AdminGate />;
}

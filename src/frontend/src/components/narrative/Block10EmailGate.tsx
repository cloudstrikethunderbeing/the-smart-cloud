import { useActor } from "@caffeineai/core-infrastructure";
import { useState } from "react";
import { createActor } from "../../backend";
import NarrativeBlock, { FadeUp } from "../NarrativeBlock";

type FormState = "idle" | "sending" | "success" | "error";

function validateEmail(val: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

/* ── Success view ──────────────────────────────────────────── */
function SuccessState() {
  return (
    <div
      className="flex flex-col items-center gap-6 py-4 w-full"
      data-ocid="block10.success_state"
    >
      {/* Status pill */}
      <span
        className="section-label px-3 py-1 rounded-full border text-xs"
        style={{
          borderColor: "rgba(34,211,238,0.35)",
          color: "oklch(0.72 0.15 190)",
          background: "rgba(34,211,238,0.06)",
        }}
      >
        THESIS ACCESS
      </span>

      {/* Check mark — gradient ring */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold"
        style={{
          background:
            "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(34,211,238,0.12))",
          border: "1px solid rgba(59,130,246,0.35)",
          color: "oklch(0.72 0.15 190)",
        }}
        aria-hidden="true"
      >
        ✓
      </div>

      {/* Title */}
      <h3
        className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-center"
        style={{ color: "oklch(0.97 0 0)" }}
      >
        You're in.
      </h3>

      {/* Body */}
      <p
        className="text-base font-body text-center leading-relaxed"
        style={{ color: "oklch(0.72 0.01 60)" }}
      >
        The full thesis is on its way. Check your inbox — you’re reading it
        before most people know it exists.
      </p>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mt-2">
        <a
          href="https://bearlyhuman.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex-1 text-center text-sm"
          data-ocid="block10.success_cta_agents"
        >
          Launch Your Agent
        </a>
        <a
          href="https://jackbear.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline flex-1 text-center text-sm"
          data-ocid="block10.success_cta_learn"
        >
          Learn the System
        </a>
      </div>
    </div>
  );
}

/* Input styling — shared */
const inputStyle = {
  base: {
    background: "oklch(0.15 0.016 50)",
    color: "oklch(0.92 0.01 60)",
    borderRadius: "6px",
  } as React.CSSProperties,
  normal: { borderColor: "oklch(0.26 0.016 50)" } as React.CSSProperties,
  error: { borderColor: "oklch(0.65 0.19 22)" } as React.CSSProperties,
};

/* ── Main component ────────────────────────────────────────── */
export default function Block10EmailGate() {
  const { actor } = useActor(createActor);
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [commentFocused, setCommentFocused] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [serverError, setServerError] = useState("");

  function track(elementId: string) {
    if (actor) actor.trackClick(elementId).catch(() => {});
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setServerError("");
    setFormState("sending");

    try {
      const result = await actor?.requestThesisAccess(
        email,
        comment.trim() || null,
      );
      if (!result) {
        setServerError("Something went wrong. Please try again.");
        setFormState("error");
        return;
      }
      if (result.__kind__ === "ok") {
        track("form-submit");
        setFormState("success");
      } else {
        setServerError(result.err ?? "Something went wrong. Please try again.");
        setFormState("error");
      }
    } catch {
      setServerError("Something went wrong. Please try again.");
      setFormState("error");
    }
  }

  const isSending = formState === "sending";

  /* Dynamic border with gradient focus ring */
  function focusBorderStyle(
    focused: boolean,
    hasError?: boolean,
  ): React.CSSProperties {
    if (hasError) return { ...inputStyle.base, ...inputStyle.error };
    if (focused) {
      return {
        ...inputStyle.base,
        borderColor: "transparent",
        boxShadow:
          "0 0 0 1.5px rgba(59,130,246,0.7), 0 0 0 3px rgba(34,211,238,0.15)",
        outline: "none",
      };
    }
    return { ...inputStyle.base, ...inputStyle.normal };
  }

  return (
    <NarrativeBlock
      id="block-email-gate"
      minHeight="80vh"
      data-ocid="block10.section"
      className="text-center"
    >
      {/* Ambient glows */}
      <div
        className="absolute left-0 top-1/3 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(34,211,238,0.04)" }}
        aria-hidden="true"
      />
      <div
        className="absolute right-0 bottom-1/4 w-[350px] h-[350px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(59,130,246,0.04)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center gap-8">
        {formState === "success" ? (
          <SuccessState />
        ) : (
          <>
            {/* Status pill */}
            <FadeUp>
              <span
                className="section-label px-4 py-1.5 rounded-full border text-xs"
                style={{
                  borderColor: "rgba(34,211,238,0.3)",
                  color: "oklch(0.72 0.15 190)",
                  background: "rgba(34,211,238,0.05)",
                  letterSpacing: "0.12em",
                }}
                data-ocid="block10.status_badge"
              >
                THESIS ACCESS
              </span>
            </FadeUp>

            {/* Section title */}
            <FadeUp delay={0.05} data-ocid="block10.heading">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight leading-tight"
                style={{ color: "oklch(0.97 0 0)" }}
              >
                You’ve seen the proof.
                <br />
                Now read the full thesis.
              </h2>
            </FadeUp>

            {/* Subhead */}
            <FadeUp delay={0.1} data-ocid="block10.subhead">
              <p
                className="text-base md:text-lg font-body leading-relaxed max-w-md"
                style={{ color: "oklch(0.68 0.01 60)" }}
              >
                The system is live. The math is real. If you want to understand
                what’s being built — and why it changes everything — enter your
                email below.
              </p>
            </FadeUp>

            {/* Body copy */}
            <FadeUp delay={0.15} data-ocid="block10.body_copy">
              <div
                className="flex flex-col gap-2 text-sm font-body text-center"
                style={{ color: "oklch(0.55 0.012 55)" }}
              >
                <p>Access is limited to early readers.</p>
              </div>
            </FadeUp>

            {/* YouTube video */}
            <FadeUp delay={0.2} className="w-full" data-ocid="block10.video">
              <figure className="w-full flex flex-col gap-2">
                <div
                  className="relative w-full rounded-xl overflow-hidden"
                  style={{
                    paddingBottom: "56.25%",
                    background: "oklch(0.14 0.015 50)",
                    border: "1px solid oklch(0.22 0.018 50 / 0.7)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                  }}
                  onClick={() => track("video-thesis")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      track("video-thesis");
                  }}
                  data-ocid="block10.video_wrapper"
                >
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/9JKD47GpPPw"
                    title="Smart Cloud Thesis — 2 minute overview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <figcaption
                  className="text-xs text-center font-body"
                  style={{ color: "oklch(0.45 0.01 55)" }}
                >
                  Start here. This explains everything in 2 minutes.
                </figcaption>
              </figure>
            </FadeUp>

            {/* Form */}
            <FadeUp
              delay={0.25}
              className="w-full"
              data-ocid="block10.form_wrapper"
            >
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 w-full"
                data-ocid="block10.form"
                noValidate
              >
                {/* Email field */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label
                    htmlFor="thesis-email"
                    className="text-xs font-semibold font-body uppercase tracking-widest"
                    style={{ color: "oklch(0.58 0.01 60)" }}
                  >
                    Email
                  </label>
                  <input
                    id="thesis-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => {
                      setEmailFocused(false);
                      if (email && !validateEmail(email)) {
                        setEmailError("Please enter a valid email address.");
                      }
                    }}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 border font-body text-sm transition-all duration-200"
                    style={focusBorderStyle(emailFocused, !!emailError)}
                    aria-label="Email address"
                    aria-describedby={emailError ? "email-error" : undefined}
                    data-ocid="block10.email_input"
                    required
                    autoComplete="email"
                  />
                  {emailError && (
                    <p
                      id="email-error"
                      className="text-xs"
                      style={{ color: "oklch(0.65 0.19 22)" }}
                      data-ocid="block10.field_error"
                      role="alert"
                    >
                      {emailError}
                    </p>
                  )}
                </div>

                {/* Optional comment field */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label
                    htmlFor="thesis-comment"
                    className="text-xs font-semibold font-body uppercase tracking-widest"
                    style={{ color: "oklch(0.58 0.01 60)" }}
                  >
                    What caught your attention?
                    <span
                      className="ml-1.5 font-normal normal-case tracking-normal"
                      style={{ color: "oklch(0.4 0.01 55)" }}
                    >
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="thesis-comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onFocus={() => setCommentFocused(true)}
                    onBlur={() => setCommentFocused(false)}
                    rows={3}
                    placeholder=""
                    className="w-full px-4 py-3 border font-body text-sm transition-all duration-200 resize-none"
                    style={focusBorderStyle(commentFocused)}
                    data-ocid="block10.comment_textarea"
                    aria-label="What caught your attention? (optional)"
                  />
                </div>

                {/* Server error */}
                {formState === "error" && serverError && (
                  <p
                    className="text-xs text-center"
                    style={{ color: "oklch(0.65 0.19 22)" }}
                    data-ocid="block10.error_state"
                    role="alert"
                  >
                    {serverError}
                  </p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                  data-ocid="block10.submit_button"
                  aria-busy={isSending}
                >
                  {isSending ? (
                    <span className="flex items-center justify-center gap-2">
                      <span
                        className="inline-block w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
                        style={{
                          borderColor:
                            "rgba(255,255,255,0.3) rgba(255,255,255,0.9) rgba(255,255,255,0.9) rgba(255,255,255,0.9)",
                        }}
                        aria-hidden="true"
                      />
                      Sending…
                    </span>
                  ) : (
                    "Unlock the Thesis"
                  )}
                </button>

                {/* Micro-copy */}
                <p
                  className="text-xs text-center font-body"
                  style={{ color: "oklch(0.4 0.01 55)" }}
                  data-ocid="block10.micro_copy"
                >
                  No spam. No newsletter. Just the thesis.
                </p>
              </form>
            </FadeUp>
          </>
        )}
      </div>
    </NarrativeBlock>
  );
}

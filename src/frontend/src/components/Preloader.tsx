import { useEffect, useRef, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const calledRef = useRef(false);

  /* Animate progress bar over ~1.5s regardless of image load */
  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const duration = 1500;

    function tick(now: number) {
      const elapsed = now - start;
      const p = Math.min((elapsed / duration) * 100, 92); // cap at 92 until image loads
      setProgress(p);
      if (elapsed < duration) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  /* When logo loads, complete progress and start exit */
  function handleLogoLoad() {
    setLogoLoaded(true);
    setProgress(100);
  }

  /* Trigger exit sequence once logo is loaded */
  useEffect(() => {
    if (!logoLoaded || calledRef.current) return;
    calledRef.current = true;

    // Brief hold so the logo is visible, then fade out
    const holdTimer = setTimeout(() => {
      setExiting(true);
    }, 400);

    return () => clearTimeout(holdTimer);
  }, [logoLoaded]);

  /* After fade-out transition completes (600ms), remove from DOM */
  useEffect(() => {
    if (!exiting) return;
    const hideTimer = setTimeout(() => {
      setHidden(true);
      onComplete();
    }, 650);
    return () => clearTimeout(hideTimer);
  }, [exiting, onComplete]);

  if (hidden) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#05070A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: exiting ? 0 : 1,
        transition: exiting ? "opacity 0.6s cubic-bezier(0.4,0,0.2,1)" : "none",
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "rgba(255,255,255,0.05)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #3B82F6, #22D3EE, #8B5CF6)",
            transition:
              progress === 100 ? "width 0.3s ease" : "width 0.1s linear",
            borderRadius: "0 2px 2px 0",
          }}
        />
      </div>

      {/* Logo — fades in, appears first */}
      <div
        style={{
          animation:
            "preloader-logo-in 0.5s cubic-bezier(0.4,0,0.2,1) 0.1s both",
          willChange: "opacity, transform",
        }}
      >
        <img
          src="/assets/smart-cloud-icon.png"
          alt="Smart Cloud"
          onLoad={handleLogoLoad}
          onError={handleLogoLoad} // don't hang if image fails
          style={{
            width: "320px",
            height: "auto",
            mixBlendMode: "screen",
            filter:
              "drop-shadow(0 0 30px rgba(59,130,246,0.55)) drop-shadow(0 0 60px rgba(139,92,246,0.25))",
          }}
        />
      </div>

      <style>{`
        @keyframes preloader-logo-in {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

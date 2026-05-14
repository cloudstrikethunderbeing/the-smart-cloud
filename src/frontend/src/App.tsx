import HeroSection from "@/components/HeroSection";
import Preloader from "@/components/Preloader";
import ScrollNarrative from "@/components/ScrollNarrative";
import AdminPage from "@/pages/AdminPage";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
} from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { createActor } from "./backend";

export { useNavigate };

const rootRoute = createRootRoute({
  component: Outlet,
});

function LandingPage() {
  const { actor } = useActor(createActor);
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    if (actor) {
      actor.trackVisit().catch(() => {});
    }
  }, [actor]);

  // Lock scroll while preloader is active
  useEffect(() => {
    if (!preloaderDone) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [preloaderDone]);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />

      <div
        className="dark min-h-screen bg-background text-foreground font-body antialiased overflow-x-hidden relative isolate page-root"
        style={{
          opacity: preloaderDone ? 1 : 0,
          transition: preloaderDone
            ? "opacity 0.5s cubic-bezier(0.4,0,0.2,1) 0.1s"
            : "none",
          willChange: "opacity",
        }}
        aria-hidden={!preloaderDone}
      >
        <HeroSection />
        <div className="entrance-world">
          <ScrollNarrative />
        </div>
      </div>
    </>
  );
}

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([landingRoute, adminRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

import { useState, useEffect, lazy, Suspense } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const FeaturesPage = lazy(() => import("./components/features/features-page/FeaturesPage").then(m => ({ default: m.FeaturesPage })));
const BlogPage = lazy(() => import("./components/blogs/BlogPage").then(m => ({ default: m.BlogPage })));
const DebugFeaturesAPI = lazy(() => import("./pages/DebugFeaturesApi"));
const DebugLandingAPI = lazy(() => import("./pages/DebugLandingApi"));

const Loader = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
    <div style={{ width: "48px", height: "48px", border: "4px solid #e5e7eb", borderTopColor: "#3b82f6", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  const [currentView, setCurrentView] = useState<{ type: string; slug?: string }>({ type: "landing" });

  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (path.includes("/debug-features") || hash.includes("#debug-features")) {
        setCurrentView({ type: "debug-features" });
      } else if (path.includes("/debug-landing") || hash.includes("#debug-landing")) {
        setCurrentView({ type: "debug-landing" });
      } else if (path.includes("/debug") || hash.includes("#debug")) {
        setCurrentView({ type: "debug-features" });
      } else if (path.includes("/blog/") || hash.includes("#blog/")) {
        const slugMatch = path.match(/\/blog\/([^\/]+)/) || hash.match(/#blog\/([^\/]+)/);
        setCurrentView({ type: "blog", slug: slugMatch?.[1] });
      } else if (path.includes("/blog") || hash.includes("#blog")) {
        setCurrentView({ type: "blog" });
      } else if (path.includes("/features/") || hash.includes("#features/")) {
        const slugMatch = path.match(/\/features\/([^\/]+)/) || hash.match(/#features\/([^\/]+)/);
        setCurrentView({ type: "features", slug: slugMatch?.[1] || "sales-marketing" });
      } else {
        setCurrentView({ type: "landing" });
      }
    };

    checkRoute();
    window.addEventListener("hashchange", checkRoute);
    window.addEventListener("popstate", checkRoute);
    return () => {
      window.removeEventListener("hashchange", checkRoute);
      window.removeEventListener("popstate", checkRoute);
    };
  }, []);

  return (
    <ThemeProvider>
      <Suspense fallback={<Loader />}>
        {currentView.type === "blog" && <BlogPage slug={currentView.slug} />}
        {currentView.type === "features" && <FeaturesPage slug={currentView.slug} />}
        {currentView.type === "debug-features" && <DebugFeaturesAPI />}
        {currentView.type === "debug-landing" && <DebugLandingAPI />}
        {currentView.type === "landing" && <LandingPage />}
      </Suspense>
    </ThemeProvider>
  );
}

export default App;

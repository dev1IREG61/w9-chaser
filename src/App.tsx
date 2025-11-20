import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import { FeaturesPage } from "../src/components/features/features-page/FeaturesPage"; // Updated import
import DebugFeaturesAPI from "./pages/DebugFeaturesApi";
import DebugLandingAPI from "./pages/DebugLandingApi";

function App() {
  const [currentView, setCurrentView] = useState<{
    type: "landing" | "features" | "debug-features" | "debug-landing";
    slug?: string;
  }>({ type: "landing" });

  // Simple URL-based routing
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      // Debug pages
      if (path.includes("/debug-features") || hash.includes("#debug-features")) {
        setCurrentView({ type: "debug-features" });
        return;
      }
      
      if (path.includes("/debug-landing") || hash.includes("#debug-landing")) {
        setCurrentView({ type: "debug-landing" });
        return;
      }
      
      // Legacy debug route defaults to features
      if (path.includes("/debug") || hash.includes("#debug")) {
        setCurrentView({ type: "debug-features" });
        return;
      }

      // Check if we're on a features page
      if (path.includes("/features/") || hash.includes("#features/")) {
        // Extract slug from path or hash
        const slugMatch =
          path.match(/\/features\/([^\/]+)/) ||
          hash.match(/#features\/([^\/]+)/);

        if (slugMatch && slugMatch[1]) {
          setCurrentView({ type: "features", slug: slugMatch[1] });
        } else {
          setCurrentView({ type: "features", slug: "sales-marketing" });
        }
      } else {
        setCurrentView({ type: "landing" });
      }
    };

    checkRoute();

    // Listen for hash changes (for navigation without page reload)
    window.addEventListener("hashchange", checkRoute);
    window.addEventListener("popstate", checkRoute);

    return () => {
      window.removeEventListener("hashchange", checkRoute);
      window.removeEventListener("popstate", checkRoute);
    };
  }, []);

  // Render based on current view
  if (currentView.type === "features") {
    return <FeaturesPage slug={currentView.slug} />;
  }

  if (currentView.type === "debug-features") {
    return <DebugFeaturesAPI />;
  }

  if (currentView.type === "debug-landing") {
    return <DebugLandingAPI />;
  }

  return <LandingPage />;
}

export default App;

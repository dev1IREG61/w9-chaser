import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import { FeaturesPage } from "../src/components/features/features-page/FeaturesPage"; // Updated import
import DebugFeaturesAPI from "./pages/DebugFeaturesApi";

function App() {
  const [currentView, setCurrentView] = useState<{
    type: "landing" | "features" | "debug";
    slug?: string;
  }>({ type: "landing" });

  // Simple URL-based routing
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      // Debug page
      if (path.includes("/debug") || hash.includes("#debug")) {
        setCurrentView({ type: "debug" });
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

    // Check route on mount
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

  if (currentView.type === "debug") {
    return <DebugFeaturesAPI />;
  }

  return <LandingPage />;
}

export default App;

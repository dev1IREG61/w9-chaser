import React, { useEffect, useState } from "react";
import type { LandingPageData } from "../types/landing";
import { fetchLandingPageData } from "../types/landing";
import DynamicContentRenderer from "../components/landingpage/DynamicContent";
import GlassNavbar from "../components/landingpage/GlassNavbar";
import Header from "../components/landingpage/Header";
import Features from "../components/landingpage/Features";
import VideoSection from "../components/landingpage/VideoSection";
import Benefits from "../components/landingpage/Benefits";
import CardSections from "../components/landingpage/CardSections";
import Testimonials from "../components/landingpage/Testimonials";
import FAQ from "../components/landingpage/FAQ";
import CTA from "../components/landingpage/CTA";
import Footer from "../components/landingpage/Footer";

interface LandingPageProps {
  onShowLogin?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onShowLogin }) => {
  const [data, setData] = useState<LandingPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const pageData = await fetchLandingPageData();
        setData(pageData);

        // Set dynamic meta tags
        if (pageData.meta_title || pageData.title) {
          document.title = pageData.meta_title || pageData.title;
        }

        // Set meta description
        const metaDescription = document.querySelector(
          'meta[name="description"]'
        );
        if (
          metaDescription &&
          (pageData.meta_description || pageData.header_description)
        ) {
          metaDescription.setAttribute(
            "content",
            pageData.meta_description || pageData.header_description || ""
          );
        }

        // Set OG image
        if (pageData.og_image) {
          let ogImage = document.querySelector('meta[property="og:image"]');
          if (!ogImage) {
            ogImage = document.createElement("meta");
            ogImage.setAttribute("property", "og:image");
            document.head.appendChild(ogImage);
          }
          ogImage.setAttribute("content", pageData.og_image.url);
        }

        setError(null);
      } catch (err) {
        console.error("Failed to load landing page:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load page data"
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-20 w-20 border-4 border-solid border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600 text-xl font-medium">
            Loading amazing content...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 mb-6">
            <svg
              className="w-20 h-20 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Unable to Load Page
          </h2>
          <p className="text-gray-600 mb-8 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 text-xl">No page data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="landing-page">
      {/* Apply color theme globally with contrast fix */}
      {data.color_theme && (
        <style>{`
          :root {
            --primary-color: ${data.color_theme.primary_color};
            --secondary-color: ${data.color_theme.secondary_color};
            --accent-color: ${data.color_theme.accent_color};
            --neutral-color: ${data.color_theme.neutral_color};
            --background-color: ${
              data.color_theme.background_color === "#6B7280"
                ? "#FFFFFF"
                : data.color_theme.background_color
            };
            --text-color: ${data.color_theme.text_color};
          }
          
          /* Ensure good contrast */
          body {
            background-color: var(--background-color) !important;
            color: var(--text-color);
          }
          
          .landing-page {
            background-color: var(--background-color);
            min-height: 100vh;
          }
        `}</style>
      )}

      {/* Navbar Section */}
      <GlassNavbar data={data} onShowLogin={onShowLogin} />

      {/* Header Section */}
      <Header data={data} onShowLogin={onShowLogin} />

      {/* Features Section - ALWAYS SHOW (now has sample content) */}
      <Features data={data} />

      {/* Video Section */}
      {data.video_section?.featured_video && <VideoSection data={data} />}

      {/* Benefits Section - ALWAYS SHOW (now has sample content) */}
      <Benefits data={data} />

      {/* Card Sections */}
      {data.card_sections?.cards && data.card_sections.cards.length > 0 && (
        <CardSections data={data} />
      )}

      {/* ===== DYNAMIC CONTENT SECTION ===== */}
      {data.dynamic_content && data.dynamic_content.length > 0 && (
        <section
          className="py-20 px-4 sm:px-6 lg:px-8"
          style={{
            backgroundColor:
              data.color_theme?.background_color === "#6B7280"
                ? "#FFFFFF"
                : data.color_theme?.background_color || "#FFFFFF",
          }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Remove the "Dynamic Content" header since it's not needed */}
            {data.dynamic_content.map((block) => (
              <DynamicContentRenderer key={block.id} block={block} />
            ))}
          </div>
        </section>
      )}
      {/* ===== END DYNAMIC CONTENT SECTION ===== */}

      {/* Testimonials Section - ALWAYS SHOW (now has sample content) */}
      <Testimonials data={data} />

      <FAQ data={data} />

      {/* CTA Section */}
      {(data.cta_head || data.cta_introduction || data.cta_primary_text) && (
        <CTA data={data} />
      )}

      {/* Footer */}
      <Footer data={data} />
    </div>
  );
};

export default LandingPage;

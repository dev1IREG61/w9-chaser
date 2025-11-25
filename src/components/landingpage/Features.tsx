import React from "react";
import type { LandingPageData, Feature } from "../../types/landing";
import EasyIcon from "./IconRenderer";

interface FeaturesProps {
  data: LandingPageData;
}

const Features: React.FC<FeaturesProps> = ({ data }) => {
  const { features_head, features_introduction, features } = data;

  if (
    !features_head &&
    !features_introduction &&
    (!features || features.length === 0)
  ) {
    return null;
  }

  return (
    <section
      id="features"
      className="py-16 sm:py-24 relative overflow-hidden bg-theme-background"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-text) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient orbs */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[80px] opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle, var(--color-primary), transparent 65%)`,
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[60px] opacity-8 pointer-events-none"
        style={{
          background: `radial-gradient(circle, var(--color-accent), transparent 65%)`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto px-4">
          {features_head && (
            <div className="mb-4">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-3 sm:mb-4 border bg-theme-primary/5 text-theme-primary border-theme-primary/20"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full animate-pulse bg-theme-primary"
                />
                Features
              </div>
              <h2
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-3 sm:mb-4 text-balance text-theme-text"
              >
                {features_head}
              </h2>
            </div>
          )}

          {features_introduction && (
            <p
              className="text-sm sm:text-base md:text-lg leading-relaxed text-balance text-theme-neutral"
            >
              {features_introduction}
            </p>
          )}
        </div>

        {/* Features Grid */}
        {features && features.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-6xl mx-auto px-4">
            {features.map((feature: Feature) => (
              <div
                key={feature.id}
                id={`feature-${feature.id}`}
                className="group relative scroll-mt-20"
              >
                {/* Card container */}
                <div
                  className="relative h-full p-6 rounded-2xl transition-all duration-500 hover:shadow-lg border backdrop-blur-sm overflow-hidden bg-theme-background border-theme-primary/10"
                >
                  {/* Subtle hover gradient */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                    style={{
                      background: `radial-gradient(circle at top left, var(--color-primary)05, transparent 60%)`,
                    }}
                  />

                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{
                      background: `linear-gradient(90deg, var(--color-primary), var(--color-accent))`,
                    }}
                  />

                  {/* Icon container */}
                  {feature.icon && (
                    <div className="mb-3 sm:mb-4">
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 relative overflow-hidden bg-theme-primary/10"
                      >
                        <EasyIcon
                          icon={feature.icon}
                          size={20}
                          color="var(--color-primary)"
                          className="relative z-10 transition-transform duration-300 group-hover:rotate-6 sm:w-[22px] sm:h-[22px]"
                        />

                        {/* Shine effect */}
                        <div
                          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                          style={{
                            background: `linear-gradient(90deg, transparent, var(--color-primary)20, transparent)`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Title */}
                  <h3
                    className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 leading-tight transition-colors duration-300 line-clamp-2 text-theme-text"
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-xs sm:text-sm leading-relaxed text-pretty line-clamp-3 text-theme-neutral"
                  >
                    {feature.description}
                  </p>

                  {/* Bottom accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden rounded-b-2xl">
                    <div
                      className="h-full w-0 group-hover:w-full transition-all duration-500 ease-out"
                      style={{
                        background: `linear-gradient(90deg, var(--color-primary), var(--color-accent))`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty state
          <div className="text-center py-12 max-w-xl mx-auto px-4">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mx-auto mb-4 bg-theme-primary/10"
            >
              <EasyIcon icon="FiSettings" size={28} color="var(--color-primary)" className="sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 text-theme-text">
              Features Coming Soon
            </h3>
            <p
              className="text-sm sm:text-base leading-relaxed text-pretty text-theme-neutral"
            >
              We're working on adding amazing features to enhance your
              experience. Check back soon for updates!
            </p>
          </div>
        )}
      </div>

      <style>{`
        html {
          scroll-behavior: smooth;
        }

        .scroll-mt-20 {
          scroll-margin-top: 5rem;
        }
      `}</style>
    </section>
  );
};

export default Features;

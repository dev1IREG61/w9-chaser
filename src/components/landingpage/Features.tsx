import React from "react";
import type { LandingPageData, Feature } from "../../types/landing";
import EasyIcon from "./IconRenderer";

interface FeaturesProps {
  data: LandingPageData;
}

const Features: React.FC<FeaturesProps> = ({ data }) => {
  const { features_head, features_introduction, features, color_theme } = data;

  if (
    !features_head &&
    !features_introduction &&
    (!features || features.length === 0)
  ) {
    return null;
  }

  const primaryColor = color_theme?.primary_color || "#3B82F6";
  const accentColor = color_theme?.accent_color || "#10B981";
  const textColor = color_theme?.text_color || "#1F2937";
  const neutralColor = color_theme?.neutral_color || "#6B7280";
  const bgColor = color_theme?.background_color || "#FFFFFF";

  return (
    <section
      id="features"
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${textColor} 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient orbs */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[80px] opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${primaryColor}, transparent 65%)`,
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[60px] opacity-8 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accentColor}, transparent 65%)`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          {features_head && (
            <div className="mb-4">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4 border"
                style={{
                  backgroundColor: `${primaryColor}08`,
                  color: primaryColor,
                  borderColor: `${primaryColor}20`,
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: primaryColor }}
                />
                Features
              </div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-4 text-balance"
                style={{ color: textColor }}
              >
                {features_head}
              </h2>
            </div>
          )}

          {features_introduction && (
            <p
              className="text-base sm:text-lg leading-relaxed text-balance"
              style={{ color: neutralColor }}
            >
              {features_introduction}
            </p>
          )}
        </div>

        {/* Features Grid */}
        {features && features.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto">
            {features.map((feature: Feature) => (
              <div
                key={feature.id}
                id={`feature-${feature.id}`}
                className="group relative scroll-mt-20"
              >
                {/* Card container */}
                <div
                  className="relative h-full p-6 rounded-2xl transition-all duration-500 hover:shadow-lg border backdrop-blur-sm overflow-hidden"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: `${primaryColor}12`,
                  }}
                >
                  {/* Subtle hover gradient */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                    style={{
                      background: `radial-gradient(circle at top left, ${primaryColor}05, transparent 60%)`,
                    }}
                  />

                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{
                      background: `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
                    }}
                  />

                  {/* Icon container */}
                  {feature.icon && (
                    <div className="mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 relative overflow-hidden"
                        style={{
                          backgroundColor: `${primaryColor}10`,
                        }}
                      >
                        <EasyIcon
                          icon={feature.icon}
                          size={22}
                          color={primaryColor}
                          className="relative z-10 transition-transform duration-300 group-hover:rotate-6"
                        />

                        {/* Shine effect */}
                        <div
                          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${primaryColor}20, transparent)`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Title */}
                  <h3
                    className="text-xl font-bold mb-3 leading-tight transition-colors duration-300 line-clamp-2"
                    style={{ color: textColor }}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed text-pretty line-clamp-3"
                    style={{ color: neutralColor }}
                  >
                    {feature.description}
                  </p>

                  {/* Bottom accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden rounded-b-2xl">
                    <div
                      className="h-full w-0 group-hover:w-full transition-all duration-500 ease-out"
                      style={{
                        background: `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty state
          <div className="text-center py-12 max-w-xl mx-auto">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{
                backgroundColor: `${primaryColor}12`,
              }}
            >
              <EasyIcon icon="FiSettings" size={32} color={primaryColor} />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: textColor }}>
              Features Coming Soon
            </h3>
            <p
              className="text-base leading-relaxed text-pretty"
              style={{ color: neutralColor }}
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

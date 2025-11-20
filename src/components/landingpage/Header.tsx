import React from "react";
import type { LandingPageData } from "../../types/landing";
import EasyIcon from "./IconRenderer";

interface HeaderProps {
  data: LandingPageData;
  onShowLogin?: () => void;
}

const Header: React.FC<HeaderProps> = ({ data, onShowLogin }) => {
  const {
    header_title,
    header_subtitle,
    header_description,
    header_cta_primary,
    header_cta_primary_url,
    header_cta_secondary,
    header_cta_secondary_url,
    header_section_image,
    color_theme,
  } = data;

  const primaryColor = color_theme?.primary_color || "#6366F1";
  const accentColor = color_theme?.accent_color || "#8B5CF6";
  const textColor = color_theme?.text_color || "#1F2937";
  const neutralColor = color_theme?.neutral_color || "#6B7280";
  const bgColor = color_theme?.background_color || "#FFFFFF";

  // Gradient styles
  const gradientBg = `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`;
  const subtleGradient = `linear-gradient(135deg, ${primaryColor}15 0%, ${accentColor}08 100%)`;

  const backendBaseUrl = "https://esign-admin.signmary.com";

  const backgroundImageUrl = data.header_background_image?.url
    ? data.header_background_image.url.startsWith("http")
      ? data.header_background_image.url
      : `${backendBaseUrl}${data.header_background_image.url}`
    : null;

  const rightImageUrl = header_section_image?.url?.startsWith("http")
    ? header_section_image.url
    : header_section_image?.url
    ? `${backendBaseUrl}${header_section_image.url}`
    : null;

  return (
    <header
      className="relative flex items-center justify-center overflow-hidden min-h-screen"
      style={{
        backgroundColor: bgColor,
        backgroundImage: backgroundImageUrl
          ? `url(${backgroundImageUrl})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "2rem",
      }}
    >
      {/* Modern background with geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orbs */}
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: gradientBg }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: gradientBg }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(${primaryColor}20 1px, transparent 1px), linear-gradient(90deg, ${primaryColor}20 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Text Content - Left Side - Made smaller */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="max-w-xl">
              {" "}
              {/* Reduced from max-w-2xl */}
              {/* Subtitle - Smaller */}
              {header_subtitle && (
                <div className="mb-4 animate-fadeInUp">
                  <p
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{
                      color: primaryColor,
                    }}
                  >
                    {header_subtitle}
                  </p>
                </div>
              )}
              {/* Main Title - Smaller */}
              {header_title && (
                <h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight animate-fadeInUp animation-delay-200"
                  style={{ color: textColor }}
                >
                  {header_title}
                </h1>
              )}
              {/* Description - Smaller */}
              {header_description && (
                <p
                  className="text-base lg:text-lg mb-6 leading-relaxed animate-fadeInUp animation-delay-400"
                  style={{ color: neutralColor }}
                >
                  {header_description}
                </p>
              )}
              {/* CTAs - Smaller buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 animate-fadeInUp animation-delay-600">
                {header_cta_primary && (
                  <>
                    {header_cta_primary_url ? (
                      <a
                        href={header_cta_primary_url}
                        className="group/primary relative px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl transform cursor-pointer text-center overflow-hidden"
                        style={{ background: gradientBg }}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {header_cta_primary}
                          <EasyIcon
                            icon="FiArrowRight"
                            size={18}
                            color="#FFFFFF"
                            className="transition-transform duration-300 group-hover/primary:translate-x-1"
                          />
                        </span>
                      </a>
                    ) : (
                      <button
                        onClick={onShowLogin}
                        className="group/primary relative px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl transform cursor-pointer text-center overflow-hidden"
                        style={{ background: gradientBg }}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {header_cta_primary}
                          <EasyIcon
                            icon="FiArrowRight"
                            size={18}
                            color="#FFFFFF"
                            className="transition-transform duration-300 group-hover/primary:translate-x-1"
                          />
                        </span>
                      </button>
                    )}
                  </>
                )}

                {header_cta_secondary && (
                  <>
                    {header_cta_secondary_url &&
                    header_cta_secondary_url !== "#login" ? (
                      <a
                        href={header_cta_secondary_url}
                        className="group/secondary px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-2 border-2"
                        style={{
                          borderColor: primaryColor,
                          color: primaryColor,
                          backgroundColor: "transparent",
                        }}
                      >
                        {header_cta_secondary}
                      </a>
                    ) : (
                      <button
                        onClick={onShowLogin}
                        className="group/secondary px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-2 border-2"
                        style={{
                          borderColor: primaryColor,
                          color: primaryColor,
                          backgroundColor: "transparent",
                        }}
                      >
                        {header_cta_secondary}
                      </button>
                    )}
                  </>
                )}
              </div>
              {/* Trial Info - Smaller */}
              <div className="animate-fadeInUp animation-delay-800 mb-8">
                <div
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 text-xs"
                  style={{ color: neutralColor }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: accentColor }}
                    />
                    Free 14-day trial
                  </div>
                  <div
                    className="hidden sm:block w-px h-3 opacity-30"
                    style={{ background: neutralColor }}
                  />
                  <div className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: accentColor }}
                    />
                    No credit card required
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section - Right Side */}
          <div className="lg:w-1/2 flex items-center justify-center lg:justify-end mt-6 lg:mt-0">
            <div className="relative w-full max-w-lg">
              {rightImageUrl ? (
                <div className="relative group animate-fadeInUp animation-delay-500">
                  {/* Main Image Container */}
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:scale-105">
                    <img
                      src={rightImageUrl}
                      alt="Header Visual"
                      className="w-full h-auto object-cover"
                    />

                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}10 0%, ${accentColor}05 100%)`,
                      }}
                    />
                  </div>

                  {/* Floating Cards - Updated to match image */}
                  <div
                    className="absolute -top-4 -left-4 w-24 h-24 rounded-xl flex flex-col items-center justify-center shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 backdrop-blur-sm border"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderColor: `${primaryColor}20`,
                    }}
                  >
                    <EasyIcon icon="FiMail" size={18} color={primaryColor} />
                    <span
                      className="text-xs font-semibold mt-1 text-center"
                      style={{ color: textColor }}
                    >
                      Email Campaigns
                    </span>
                    <span
                      className="text-xs font-bold mt-1"
                      style={{ color: accentColor }}
                    >
                      +247%
                    </span>
                  </div>

                  <div
                    className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl flex flex-col items-center justify-center shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:translate-y-2 backdrop-blur-sm border p-2"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderColor: `${accentColor}20`,
                    }}
                  >
                    <EasyIcon icon="FiZap" size={20} color={accentColor} />
                    <span
                      className="text-xs font-semibold mt-1 text-center"
                      style={{ color: textColor }}
                    >
                      AI Automation
                    </span>
                    <span
                      className="text-xs font-bold mt-1 text-center"
                      style={{ color: primaryColor }}
                    >
                      Save 8+ hours/day
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  className="group w-full h-80 rounded-3xl flex flex-col items-center justify-center shadow-2xl p-8 text-center transition-all duration-500 hover:scale-105 relative overflow-hidden"
                  style={{
                    background: subtleGradient,
                    border: `2px dashed ${primaryColor}20`,
                  }}
                >
                  <EasyIcon
                    icon="FiImage"
                    size={56}
                    color={primaryColor}
                    className="mb-4 opacity-30 transition-all duration-500 group-hover:scale-110"
                  />
                  <p
                    className="text-sm transition-colors duration-500"
                    style={{ color: primaryColor, opacity: 0.7 }}
                  >
                    Add an image to showcase your product
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </header>
  );
};

export default Header;

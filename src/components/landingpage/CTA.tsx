import React from "react";
import type { LandingPageData } from "../../types/landing";
import EasyIcon from "./IconRenderer";

interface CTAProps {
  data: LandingPageData;
}

const CTA: React.FC<CTAProps> = ({ data }) => {
  const {
    cta_head,
    cta_introduction,
    cta_primary_text,
    cta_primary_url,
    cta_secondary_text,
    cta_secondary_url,
    cta_offer,
    color_theme,
  } = data;

  if (!cta_head && !cta_introduction && !cta_primary_text) return null;

  const primaryColor = color_theme?.primary_color || "#3B82F6";
  const accentColor = color_theme?.accent_color || "#10B981";

  return (
    <section
      className="py-20 sm:py-32 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`,
      }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Gradient orbs */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, white, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, white, transparent 65%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          {cta_head && (
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              {cta_head}
            </h2>
          )}

          {/* Introduction */}
          {cta_introduction && (
            <p className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              {cta_introduction}
            </p>
          )}

          {/* Offer Badge */}
          {cta_offer && (
            <div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-10 border backdrop-blur-sm"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderColor: "rgba(255, 255, 255, 0.25)",
              }}
            >
              <EasyIcon icon="FiGift" size={20} color="#FFFFFF" />
              <p className="text-white font-semibold text-sm sm:text-base">
                {cta_offer}
              </p>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {cta_primary_text && cta_primary_url && (
              <a
                href={cta_primary_url}
                className="group/primary inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-base lg:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white relative overflow-hidden"
                style={{ color: primaryColor }}
              >
                <EasyIcon
                  icon="FiRocket"
                  size={20}
                  color={primaryColor}
                  className="relative z-10 transition-transform duration-300 group-hover/primary:translate-y-[-2px]"
                />
                <span className="relative z-10">{cta_primary_text}</span>
              </a>
            )}

            {cta_secondary_text && cta_secondary_url && (
              <a
                href={cta_secondary_url}
                className="group/secondary inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-base lg:text-lg border-2 text-white transition-all duration-300 hover:scale-105 hover:bg-white relative backdrop-blur-sm"
                style={{
                  borderColor: "rgba(255, 255, 255, 0.4)",
                }}
              >
                <EasyIcon
                  icon="FiPlayCircle"
                  size={20}
                  color="currentColor"
                  className="relative z-10 transition-transform duration-300 group-hover/secondary:scale-110"
                />
                <span
                  className="relative z-10 transition-colors duration-300"
                  style={{
                    color: "inherit",
                  }}
                >
                  <span className="group-hover/secondary:hidden">
                    {cta_secondary_text}
                  </span>
                  <span
                    className="hidden group-hover/secondary:inline"
                    style={{ color: primaryColor }}
                  >
                    {cta_secondary_text}
                  </span>
                </span>
              </a>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/85">
            <div className="flex items-center gap-2 transition-all duration-300 hover:text-white">
              <EasyIcon icon="FiCreditCard" size={18} color="currentColor" />
              <span className="text-sm sm:text-base">
                No credit card required
              </span>
            </div>
            <div className="flex items-center gap-2 transition-all duration-300 hover:text-white">
              <EasyIcon icon="FiXCircle" size={18} color="currentColor" />
              <span className="text-sm sm:text-base">Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2 transition-all duration-300 hover:text-white">
              <EasyIcon icon="FiHeadphones" size={18} color="currentColor" />
              <span className="text-sm sm:text-base">24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

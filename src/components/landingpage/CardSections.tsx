import React from "react";
import type { LandingPageData, CardContent } from "../../types/landing";
import EasyIcon from "./IconRenderer";

interface CardSectionsProps {
  data: LandingPageData;
}

const CardSections: React.FC<CardSectionsProps> = ({ data }) => {
  const { card_sections, color_theme } = data;

  if (
    !card_sections ||
    !card_sections.cards ||
    card_sections.cards.length === 0
  )
    return null;

  const { heading, cards } = card_sections;
  const primaryColor = color_theme?.primary_color || "#3B82F6";
  const accentColor = color_theme?.accent_color || "#10B981";
  const textColor = color_theme?.text_color || "#1F2937";
  const neutralColor = color_theme?.neutral_color || "#6B7280";
  const bgColor = color_theme?.background_color || "#FFFFFF";

  const renderCard = (card: CardContent) => {
    return (
      <div key={card.id} className="group relative h-full">
        {/* Card container with enhanced shadow */}
        <div
          className="relative h-full p-6 rounded-2xl transition-all duration-500 border backdrop-blur-sm overflow-hidden flex flex-col shadow-sm hover:shadow-2xl"
          style={{
            backgroundColor: bgColor,
            borderColor: `${primaryColor}15`,
            boxShadow: `0 4px 6px -1px ${primaryColor}08, 0 2px 4px -1px ${primaryColor}05`,
          }}
        >
          {/* Enhanced hover gradient */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
            style={{
              background: `radial-gradient(circle at top right, ${primaryColor}08, transparent 60%)`,
            }}
          />

          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
            style={{
              background: `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
            }}
          />

          {/* Card Image - Improved */}
          {card.card_image && (
            <div className="mb-6 -mx-6 -mt-6">
              <div className="w-full aspect-[4/3] rounded-t-2xl overflow-hidden relative">
                <img
                  src={`https://esign-admin.signmary.com${card.card_image.url}`}
                  alt={card.card_image.title || card.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          )}

          {/* Icon container (fallback if no image) */}
          {!card.card_image && card.icon && (
            <div className="mb-6">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 relative overflow-hidden shadow-md"
                style={{
                  backgroundColor: `${primaryColor}10`,
                  boxShadow: `0 4px 12px ${primaryColor}15`,
                }}
              >
                <EasyIcon
                  icon={card.icon}
                  size={24}
                  color={primaryColor}
                  className="relative z-10 transition-transform duration-300 group-hover:rotate-6"
                />

                {/* Shine effect */}
                <div
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${primaryColor}25, transparent)`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Content area */}
          <div className="flex-1 flex flex-col">
            {/* Title */}
            <h3
              className="text-xl font-bold mb-4 leading-tight transition-colors duration-300"
              style={{ color: textColor }}
            >
              {card.title}
            </h3>

            {/* Description - No line clamp to show complete content */}
            {card.description && (
              <p
                className="text-sm leading-relaxed mb-6 text-pretty flex-1"
                style={{ color: neutralColor }}
              >
                {card.description}
              </p>
            )}

            {/* Features List - Show all features without clamping */}
            {card.features && card.features.length > 0 && (
              <ul className="space-y-3 mb-6">
                {card.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 group/item">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200 group-hover/item:scale-110 shadow-sm"
                      style={{
                        backgroundColor: `${accentColor}15`,
                        boxShadow: `0 2px 4px ${accentColor}10`,
                      }}
                    >
                      <EasyIcon icon="FiCheck" size={12} color={accentColor} />
                    </div>
                    <span
                      className="text-sm leading-relaxed text-pretty flex-1"
                      style={{ color: neutralColor }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* Button */}
            {card.button_text && card.button_url && (
              <div
                className="mt-auto pt-4 border-t"
                style={{ borderColor: `${primaryColor}10` }}
              >
                <a
                  href={card.button_url}
                  className="inline-flex items-center gap-2 font-semibold text-sm transition-all duration-300 hover:gap-3 group/btn px-4 py-2 rounded-lg hover:shadow-md"
                  style={{
                    color: primaryColor,
                    backgroundColor: `${primaryColor}05`,
                  }}
                >
                  {card.button_text}
                  <EasyIcon
                    icon="FiArrowRight"
                    size={16}
                    color={primaryColor}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </a>
              </div>
            )}
          </div>

          {/* Enhanced bottom accent bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-2xl">
            <div
              className="h-full w-0 group-hover:w-full transition-all duration-500 ease-out"
              style={{
                background: `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
                boxShadow: `0 0 20px ${primaryColor}30`,
              }}
            />
          </div>

          {/* Glow effect on hover */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-20"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${primaryColor}15, transparent 70%)`,
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <section
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${textColor} 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Enhanced Gradient orbs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-15 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${primaryColor}40, transparent 65%)`,
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[80px] opacity-12 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accentColor}30, transparent 65%)`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        {heading && (
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6 text-balance"
              style={{ color: textColor }}
            >
              {heading}
            </h2>
          </div>
        )}

        {/* Cards Grid with better spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto mb-16">
          {cards.map((card) => renderCard(card))}
        </div>

        {/* Enhanced CTA Section */}
        <div
          className="text-center max-w-3xl mx-auto p-8 rounded-3xl shadow-lg"
          style={{
            backgroundColor: `${primaryColor}03`,
            border: `1px solid ${primaryColor}10`,
          }}
        >
          <p
            className="text-xl font-semibold mb-6 leading-relaxed text-balance"
            style={{ color: textColor }}
          >
            Ready to transform your workflow with our comprehensive features?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#contact"
              className="group/btn inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                color: "#FFFFFF",
                boxShadow: `0 8px 25px ${primaryColor}30`,
              }}
            >
              Get Started Today
              <EasyIcon
                icon="FiRocket"
                size={18}
                color="#FFFFFF"
                className="transition-transform duration-300 group-hover/btn:translate-y-[-2px] group-hover/btn:scale-110"
              />
            </a>
            <a
              href="#learn-more"
              className="group/btn inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold border transition-all duration-300 hover:scale-105 text-base shadow-lg hover:shadow-xl"
              style={{
                borderColor: primaryColor,
                color: primaryColor,
                backgroundColor: bgColor,
                boxShadow: `0 4px 15px ${primaryColor}10`,
              }}
            >
              Learn More
              <EasyIcon
                icon="FiBookOpen"
                size={18}
                color={primaryColor}
                className="transition-transform duration-300 group-hover/btn:translate-y-[-2px]"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardSections;

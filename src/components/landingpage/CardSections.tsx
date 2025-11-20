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
              background: `radial-gradient(circle at top right, ${primaryColor}05, transparent 60%)`,
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
          {card.icon && (
            <div className="mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 relative overflow-hidden"
                style={{
                  backgroundColor: `${primaryColor}10`,
                }}
              >
                <EasyIcon
                  icon={card.icon}
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
            {card.title}
          </h3>

          {/* Description */}
          {card.description && (
            <p
              className="text-sm leading-relaxed mb-4 text-pretty line-clamp-3"
              style={{ color: neutralColor }}
            >
              {card.description}
            </p>
          )}

          {/* Features List */}
          {card.features && card.features.length > 0 && (
            <ul className="space-y-2 mb-4">
              {card.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 group/item">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200 group-hover/item:scale-110"
                    style={{ backgroundColor: `${accentColor}15` }}
                  >
                    <EasyIcon icon="FiCheck" size={10} color={accentColor} />
                  </div>
                  <span
                    className="text-sm leading-relaxed text-pretty"
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
            <div className="mt-auto pt-4">
              <a
                href={card.button_url}
                className="inline-flex items-center gap-1.5 font-semibold text-sm transition-all duration-300 hover:gap-2 group/btn"
                style={{ color: primaryColor }}
              >
                {card.button_text}
                <EasyIcon
                  icon="FiArrowRight"
                  size={14}
                  color={primaryColor}
                  className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
                />
              </a>
            </div>
          )}

          {/* Bottom accent bar - appears on hover */}
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
    );
  };

  return (
    <section
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
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
        {heading && (
          <div className="text-center mb-16 max-w-3xl mx-auto">
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
              {heading}
            </h2>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto mb-12">
          {cards.map((card) => renderCard(card))}
        </div>

        {/* CTA Section */}
        <div className="text-center max-w-2xl mx-auto">
          <p
            className="text-base mb-6 leading-relaxed text-balance"
            style={{ color: neutralColor }}
          >
            Ready to get started with our comprehensive features?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="#contact"
              className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                color: "#FFFFFF",
              }}
            >
              Get Started Today
              <EasyIcon
                icon="FiRocket"
                size={16}
                color="#FFFFFF"
                className="transition-transform duration-300 group-hover/btn:translate-y-[-1px]"
              />
            </a>
            <a
              href="#learn-more"
              className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold border transition-all duration-300 hover:scale-105 text-sm"
              style={{
                borderColor: primaryColor,
                color: primaryColor,
                backgroundColor: "transparent",
              }}
            >
              Learn More
              <EasyIcon
                icon="FiBookOpen"
                size={16}
                color={primaryColor}
                className="transition-transform duration-300 group-hover/btn:translate-y-[-1px]"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardSections;

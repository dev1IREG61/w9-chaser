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

  return (
    <section
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Dotted background pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, ${primaryColor} 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
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

        {/* Cards List with alternating layout */}
        <div className="space-y-8 max-w-5xl mx-auto mb-16">
          {cards.map((card, index) => {
            const isEven = index % 2 === 0;
            const cardData = (
              typeof card.card_content === "object" ? card.card_content : card
            ) as CardContent;
            const title = card.custom_title || cardData.title;
            const description = card.custom_description || cardData.description;
            const features = cardData.features || [];

            return (
              <div
                key={card.id}
                className={`flex flex-col lg:flex-row gap-4 items-center group/card transition-all duration-300 hover:scale-[1.02] ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Text Content */}
                <div className={`flex-1 ${!isEven ? "lg:text-right" : ""}`}>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: textColor }}
                  >
                    {title}
                  </h3>
                  {description && (
                    <p
                      className="text-sm mb-3 leading-relaxed"
                      style={{ color: neutralColor }}
                    >
                      {description}
                    </p>
                  )}
                  {features.length > 0 && (
                    <ul className="space-y-1.5">
                      {features.map((feature: string, idx: number) => (
                        <li
                          key={idx}
                          className={`flex items-start gap-2 ${
                            !isEven ? "lg:flex-row-reverse lg:text-right" : ""
                          }`}
                        >
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: `${accentColor}15` }}
                          >
                            <EasyIcon
                              icon="FiCheck"
                              size={10}
                              color={accentColor}
                            />
                          </div>
                          <span
                            className="text-xs"
                            style={{ color: neutralColor }}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {card.button_text && card.button_url && (
                    <div className={!isEven ? "lg:flex lg:justify-end" : ""}>
                      <a
                        href={card.button_url}
                        className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 rounded-lg text-sm font-semibold"
                        style={{
                          color: primaryColor,
                          backgroundColor: `${primaryColor}10`,
                        }}
                      >
                        {card.button_text}
                        <EasyIcon
                          icon="FiArrowRight"
                          size={14}
                          color={primaryColor}
                        />
                      </a>
                    </div>
                  )}
                </div>

                {/* Image */}
                <div className="flex-1 max-w-sm">
                  {card.card_image ? (
                    <div
                      className="rounded-xl overflow-hidden shadow-lg group-hover/card:shadow-2xl transition-all duration-300 border-2"
                      style={{ borderColor: primaryColor }}
                    >
                      <img
                        src={`https://esign-admin.signmary.com${card.card_image.url}`}
                        alt={card.card_image.title || title}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover/card:scale-110"
                      />
                    </div>
                  ) : (
                    <div
                      className="rounded-xl p-8 flex items-center justify-center transition-all duration-300 group-hover/card:scale-105 border-2"
                      style={{
                        backgroundColor: `${primaryColor}10`,
                        borderColor: primaryColor,
                      }}
                    >
                      <EasyIcon
                        icon={card.icon || "FiImage"}
                        size={48}
                        color={primaryColor}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CardSections;

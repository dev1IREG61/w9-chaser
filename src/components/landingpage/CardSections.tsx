import React from "react";
import type { LandingPageData, CardContent } from "../../types/landing";
import EasyIcon from "./IconRenderer";

interface CardSectionsProps {
  data: LandingPageData;
}

const CardSections: React.FC<CardSectionsProps> = ({ data }) => {
  if (
    !data ||
    !data.card_sections ||
    !data.card_sections.cards ||
    data.card_sections.cards.length === 0
  ) {
    return null;
  }

  const { card_sections, color_theme } = data;
  const { heading, cards } = card_sections;
  const primaryColor = color_theme?.primary_color || "#8B5CF6";
  const accentColor = color_theme?.accent_color || "#10B981";
  const textColor = color_theme?.text_color || "#1F2937";
  const neutralColor = color_theme?.neutral_color || "#6B7280";
  const bgColor = color_theme?.background_color || "#FFFFFF";

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  React.useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

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
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-balance"
              style={{ color: textColor }}
            >
              {heading}
            </h2>
          </div>
        )}

        {/* Horizontal Scroll Container */}
        <div className="relative px-12 ">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-xl flex items-center justify-center transition-shadow hover:shadow-2xl border-2"
              style={{
                backgroundColor: bgColor,
                color: primaryColor,
                borderColor: `${primaryColor}30`,
              }}
            >
              <EasyIcon icon="FiChevronLeft" size={20} color={primaryColor} />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-xl flex items-center justify-center transition-shadow hover:shadow-2xl border-2"
              style={{
                backgroundColor: bgColor,
                color: primaryColor,
                borderColor: `${primaryColor}30`,
              }}
            >
              <EasyIcon icon="FiChevronRight" size={20} color={primaryColor} />
            </button>
          )}

          {/* Scrollable Cards */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {cards.map((card) => {
              const cardData = (
                typeof card.card_content === "object" ? card.card_content : card
              ) as CardContent;
              const title = card.custom_title || cardData.title;
              const description =
                card.custom_description || cardData.description;
              const features = cardData.features || [];
              return (
                <div
                  key={card.id}
                  className="flex-shrink-0 w-[320px] sm:w-[360px] snap-center group"
                >
                  <div
                    className="h-full rounded-2xl p-6 sm:p-8 transition-shadow duration-300 border relative overflow-hidden shadow-lg hover:shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${bgColor} 0%, ${primaryColor}08 100%)`,
                      borderColor: primaryColor,
                    }}
                  >
                    {/* Subtle gradient overlay on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at top, ${primaryColor}05, transparent 70%)`,
                      }}
                    />

                    {/* Icon or Image */}
                    <div className="relative z-10">
                      {card.card_image ? (
                        <div
                          className="w-24 h-24 rounded-2xl overflow-hidden mx-auto mb-6 shadow-md border-2"
                          style={{
                            borderColor: `${primaryColor}20`,
                          }}
                        >
                          <img
                            src={`https://esign-admin.signmary.com${card.card_image.url}`}
                            alt={card.card_image.title || title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md"
                          style={{
                            backgroundColor: `${primaryColor}10`,
                            border: `2px solid ${primaryColor}20`,
                          }}
                        >
                          <EasyIcon
                            icon={card.icon || "FiImage"}
                            size={40}
                            color={primaryColor}
                          />
                        </div>
                      )}

                      {/* Title */}
                      <h3
                        className="text-xl sm:text-2xl font-bold mb-3 text-center leading-tight"
                        style={{
                          color: textColor,
                        }}
                      >
                        {title}
                      </h3>

                      {/* Description */}
                      {description && (
                        <p
                          className="text-sm mb-6 text-center leading-relaxed"
                          style={{ color: neutralColor }}
                        >
                          {description}
                        </p>
                      )}

                      {/* Features */}
                      {features.length > 0 && (
                        <ul className="space-y-3 mb-6">
                          {features.map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div
                                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                style={{
                                  backgroundColor: `${accentColor}15`,
                                }}
                              >
                                <EasyIcon
                                  icon="FiCheck"
                                  size={12}
                                  color={accentColor}
                                />
                              </div>
                              <span
                                className="text-sm leading-relaxed"
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
                        <div className="text-center">
                          <a
                            href={card.button_url}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-shadow duration-300 hover:shadow-lg w-full"
                            style={{
                              color: bgColor,
                              backgroundColor: primaryColor,
                            }}
                          >
                            {card.button_text}
                            <EasyIcon
                              icon="FiArrowRight"
                              size={16}
                              color={bgColor}
                            />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default CardSections;

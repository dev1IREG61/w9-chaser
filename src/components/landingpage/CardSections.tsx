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

  const bgColor = color_theme?.background_color || "#F3F4F6";

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
      className="py-16 sm:py-24 relative overflow-hidden mt-10"
      style={{ backgroundColor: bgColor }}
    >
      {/* Dotted background pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, ${accentColor} 1px, transparent 1px)`,
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
        <div className="relative px-12">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-2xl"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                color: primaryColor,
              }}
            >
              <EasyIcon icon="FiChevronLeft" size={24} color={primaryColor} />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-2xl"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                color: primaryColor,
              }}
            >
              <EasyIcon icon="FiChevronRight" size={24} color={primaryColor} />
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
                  className="flex-shrink-0 w-[280px] sm:w-[320px] snap-center group"
                >
                  <div className="h-[420px] rounded-3xl overflow-hidden relative">
                    {/* Blue hover effect from bottom */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-full transition-all duration-500 z-10"
                      style={{
                        background: `linear-gradient(to top, ${primaryColor}40, transparent)`,
                      }}
                    />
                    {/* Background Image or Gradient */}
                    {card.card_image ? (
                      <div className="absolute inset-0">
                        <img
                          src={`https://esign-admin.signmary.com${card.card_image.url}`}
                          alt={card.card_image.title || title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Dark overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                      </div>
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, ${primaryColor}dd, ${accentColor}dd)`,
                        }}
                      >
                        {/* Icon in background */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                          <EasyIcon
                            icon={card.icon || "FiImage"}
                            size={120}
                            color="#FFFFFF"
                          />
                        </div>
                      </div>
                    )}

                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                      {/* Title */}
                      <h3
                        className="text-2xl sm:text-3xl font-bold mb-2 leading-tight"
                        style={{ color: "#FFFFFF" }}
                      >
                        {title}
                      </h3>

                      {/* Description */}
                      {description && (
                        <p
                          className="text-sm mb-4 leading-relaxed opacity-90"
                          style={{ color: "#FFFFFF" }}
                        >
                          {description}
                        </p>
                      )}

                      {/* Features - only show first 3 */}
                      {features.length > 0 && (
                        <ul className="space-y-2 mb-4">
                          {features
                            .slice(0, 3)
                            .map((feature: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div
                                  className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                  style={{
                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                  }}
                                >
                                  <EasyIcon
                                    icon="FiCheck"
                                    size={10}
                                    color="#FFFFFF"
                                  />
                                </div>
                                <span
                                  className="text-xs leading-relaxed opacity-90"
                                  style={{ color: "#FFFFFF" }}
                                >
                                  {feature}
                                </span>
                              </li>
                            ))}
                        </ul>
                      )}

                      {/* Button */}
                      {card.button_text && card.button_url && (
                        <a
                          href={card.button_url}
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.25)",
                            color: "#FFFFFF",
                            border: "1px solid rgba(255, 255, 255, 0.3)",
                          }}
                        >
                          {card.button_text}
                          <EasyIcon
                            icon="FiArrowRight"
                            size={16}
                            color="#FFFFFF"
                          />
                        </a>
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

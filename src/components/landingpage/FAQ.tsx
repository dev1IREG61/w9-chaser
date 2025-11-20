import React, { useState } from "react";
import type { LandingPageData } from "../../types/landing";
import EasyIcon from "./IconRenderer"; // Add this import

interface FAQProps {
  data: LandingPageData;
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
  order: number;
  is_active?: boolean;
}

const FAQ: React.FC<FAQProps> = ({ data }) => {
  console.log("🔍 FAQ Component - Full Data:", data);
  console.log("🔍 FAQ Section Data:", data.faq_section);
  console.log("🔍 FAQ Items:", data.faq_section?.faqs);

  // Extract FAQ data directly from the API structure
  const faqSection = data.faq_section;

  const heading = faqSection?.heading || "Frequently Asked Questions";
  const introduction = faqSection?.introduction || "";
  const faqItems: FAQItem[] = faqSection?.faqs || [];

  console.log("🔍 Processed FAQ Data:", {
    heading,
    introduction,
    faqItemsCount: faqItems.length,
    faqItems,
  });

  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Check if we have FAQ items to display
  if (!faqItems || faqItems.length === 0) {
    console.log("❌ No FAQ items found, returning null");
    return null;
  }

  console.log("✅ FAQ items found, rendering component");

  // Extract unique categories
  const categories = [
    "all",
    ...new Set(
      faqItems
        .map((item) => item.category)
        .filter((category): category is string =>
          Boolean(category && category.trim() !== "")
        )
    ),
  ];

  console.log("📂 Categories:", categories);

  // Filter FAQs by category
  const filteredFaqs =
    activeCategory === "all"
      ? faqItems
      : faqItems.filter((item) => item.category === activeCategory);

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const toggleAll = () => {
    if (openItems.size === filteredFaqs.length) {
      setOpenItems(new Set());
    } else {
      setOpenItems(new Set(filteredFaqs.map((item) => item.id)));
    }
  };

  // Get theme colors with fallbacks
  const primaryColor = data.color_theme?.primary_color || "#3b82f6";
  const secondaryColor = data.color_theme?.secondary_color || "#1e40af";
  const neutralColor = data.color_theme?.neutral_color || "#6b7280";
  const backgroundColor = data.color_theme?.background_color || "#ffffff";
  const textColor = data.color_theme?.text_color || "#1f2937";

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: textColor }}>
            {heading}
          </h2>
          {introduction && (
            <p
              className="text-xl opacity-80 max-w-2xl mx-auto"
              style={{ color: textColor }}
            >
              {introduction}
            </p>
          )}
        </div>

        {/* Category Filter - Only show if we have multiple categories */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category ? "text-white" : "bg-opacity-20"
                }`}
                style={{
                  backgroundColor:
                    activeCategory === category
                      ? primaryColor
                      : `${primaryColor}20`,
                  color: activeCategory === category ? "white" : primaryColor,
                }}
              >
                {category === "all" ? (
                  <>
                    <EasyIcon icon="FiList" size={16} color="currentColor" />
                    All Questions
                  </>
                ) : (
                  <>
                    <EasyIcon icon="FiFolder" size={16} color="currentColor" />
                    {category}
                  </>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Expand/Collapse All */}
        {filteredFaqs.length > 1 && (
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleAll}
              className="inline-flex items-center gap-2 text-sm font-medium hover:underline transition-colors duration-200"
              style={{ color: primaryColor }}
            >
              {openItems.size === filteredFaqs.length ? (
                <>
                  <EasyIcon
                    icon="FiMinusSquare"
                    size={16}
                    color={primaryColor}
                  />
                  Collapse All
                </>
              ) : (
                <>
                  <EasyIcon
                    icon="FiPlusSquare"
                    size={16}
                    color={primaryColor}
                  />
                  Expand All
                </>
              )}
            </button>
          </div>
        )}

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="rounded-xl transition-all duration-200 hover:shadow-md"
              style={{
                border: `1px solid ${neutralColor}`,
                backgroundColor: openItems.has(faq.id)
                  ? `${primaryColor}08`
                  : "transparent",
              }}
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full text-left p-6 flex justify-between items-center rounded-xl transition-all duration-200"
                style={{
                  color: textColor,
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 2px ${primaryColor}40`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <h3
                  className="text-lg font-semibold pr-8"
                  style={{ color: textColor }}
                >
                  {faq.question}
                </h3>
                <div
                  className={`flex-shrink-0 transition-transform duration-200 ${
                    openItems.has(faq.id) ? "rotate-180" : ""
                  }`}
                >
                  <EasyIcon
                    icon="FiChevronDown"
                    size={20}
                    color={primaryColor}
                  />
                </div>
              </button>

              <div
                className={`px-6 transition-all duration-300 overflow-hidden ${
                  openItems.has(faq.id)
                    ? "pb-6 max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div
                  className="prose prose-lg max-w-none"
                  style={{ color: textColor }}
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />

                {/* Category badge - Only show if category exists and is not empty */}
                {faq.category && faq.category.trim() !== "" && (
                  <div className="mt-4">
                    <span
                      className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full"
                      style={{
                        backgroundColor: `${primaryColor}20`,
                        color: primaryColor,
                      }}
                    >
                      <EasyIcon icon="FiTag" size={12} color={primaryColor} />
                      {faq.category}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div
          className="text-center mt-12 p-8 rounded-2xl"
          style={{
            border: `2px dashed ${neutralColor}`,
          }}
        >
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ backgroundColor: `${primaryColor}15` }}
          >
            <EasyIcon icon="FiHelpCircle" size={32} color={primaryColor} />
          </div>
          <h3 className="text-2xl font-bold mb-4" style={{ color: textColor }}>
            Still have questions?
          </h3>
          <p
            className="text-lg mb-6 opacity-80 max-w-md mx-auto"
            style={{ color: textColor }}
          >
            Can't find the answer you're looking for? Please reach out to our
            friendly team.
          </p>
          <button
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
            style={{
              backgroundColor: primaryColor,
              color: "#ffffff",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = secondaryColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = primaryColor;
            }}
          >
            <EasyIcon icon="FiMessageCircle" size={20} color="#FFFFFF" />
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

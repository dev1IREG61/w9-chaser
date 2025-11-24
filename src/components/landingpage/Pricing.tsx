import React from "react";
import type { LandingPageData } from "../../types/landing";

interface PricingProps {
  data: LandingPageData;
}

const Pricing: React.FC<PricingProps> = ({ data }) => {
  const section = data.pricing_section;

  if (!section || !section.heading) {
    return null;
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-theme-neutral/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-theme-text mb-4">
            {section.heading}
          </h2>
          {section.description && (
            <p className="text-xl text-theme-neutral max-w-3xl mx-auto">
              {section.description}
            </p>
          )}
        </div>

        {section.widget_code ? (
          <div 
            className="max-w-4xl mx-auto"
            dangerouslySetInnerHTML={{ __html: section.widget_code }}
          />
        ) : (
          <div className="text-center">
            <p className="text-theme-neutral mb-8">Pricing information coming soon...</p>
            {section.show_cta && section.cta && (
              <a
                href={section.cta.url || "#"}
                className="inline-block px-8 py-4 bg-theme-primary text-white rounded-lg hover:bg-theme-secondary transition-colors font-semibold"
              >
                {section.cta.text}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Pricing;
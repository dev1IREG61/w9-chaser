import React from "react";
import type { LandingPageData } from "../../types/landing";

interface HowItWorksProps {
  data: LandingPageData;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ data }) => {
  const section = data.how_it_works_section;

  if (!section || !section.steps || section.steps.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {section.heading}
          </h2>
          {section.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {section.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {section.steps.map((step: any, index: number) => (
            <div
              key={index}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
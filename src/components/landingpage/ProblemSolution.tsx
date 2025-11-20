import React from "react";
import type { LandingPageData } from "../../types/landing";

interface ProblemSolutionProps {
  data: LandingPageData;
}

const ProblemSolution: React.FC<ProblemSolutionProps> = ({ data }) => {
  const section = data.problem_solution_section;

  if (!section || !section.items || section.items.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {section.heading}
          </h2>
          {section.introduction && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {section.introduction}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {section.items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-red-600 mb-2">
                  Problem:
                </h3>
                <p className="text-gray-700 mb-4">{item.problem}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-2">
                  Solution:
                </h3>
                <div 
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: item.solution }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Problems Column */}
          <div>
            <h3 className="text-2xl font-bold text-red-600 mb-8 text-center">
              Problems
            </h3>
            <div className="space-y-6">
              {section.items.map((item, index) => (
                <div
                  key={`problem-${index}`}
                  className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <p className="text-gray-800 leading-relaxed">{item.problem}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h3 className="text-2xl font-bold text-green-600 mb-8 text-center">
              Solutions
            </h3>
            <div className="space-y-6">
              {section.items.map((item, index) => (
                <div
                  key={`solution-${index}`}
                  className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <div 
                      className="text-gray-800 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.solution }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
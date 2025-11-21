import React from "react";
import { AlertTriangle, Lightbulb } from "lucide-react";

interface ProblemSolutionProps {
  data: {
    problem_solution_section?: {
      heading?: string;
      introduction?: string;
      items: Array<{
        problem: string;
        solution: string;
      }>;
    };
  };
}

const ProblemSolutionTemplate: React.FC<ProblemSolutionProps> = ({ data }) => {
  const section = data.problem_solution_section;

  if (!section || !section.items || section.items.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      {/* Title */}
      {section.heading && (
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
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto">
        {/* Headers */}
        <div className="flex justify-between items-center mb-8 px-4">
          <h2 className="text-5xl font-bold text-orange-500">Problem</h2>
          <h2 className="text-5xl font-bold text-green-600">Solution</h2>
        </div>

        {/* Items */}
        <div className="space-y-6">
          {section.items.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              {/* Problem Box */}
              <div className="flex-1 bg-white border-2 border-gray-300 rounded-lg p-6 shadow-sm min-h-[120px] flex items-center transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-orange-400 hover:-translate-y-1">
                <p className="text-gray-700 text-base leading-relaxed">
                  {item.problem}
                </p>
              </div>

              {/* Center Section with Icons */}
              <div className="flex items-center gap-3 flex-shrink-0">
                {/* Problem Icon */}
                <div className="w-20 h-20 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full shadow-lg flex items-center justify-center">
                  <AlertTriangle
                    className="w-9 h-9 text-white"
                    strokeWidth={2.5}
                  />
                </div>

                {/* Left Arrow */}
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  className="text-gray-400"
                >
                  <path
                    d="M4 18 L18 11 L18 15 L28 15 L28 21 L18 21 L18 25 Z"
                    fill="currentColor"
                  />
                </svg>

                {/* Right Arrow */}
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  className="text-gray-400"
                >
                  <path
                    d="M32 18 L18 25 L18 21 L8 21 L8 15 L18 15 L18 11 Z"
                    fill="currentColor"
                  />
                </svg>

                {/* Solution Icon */}
                <div className="w-20 h-20 bg-gradient-to-b from-green-500 to-green-700 rounded-full shadow-lg flex items-center justify-center">
                  <Lightbulb
                    className="w-9 h-9 text-white"
                    strokeWidth={2.5}
                    fill="white"
                  />
                </div>
              </div>

              {/* Solution Box */}
              <div className="flex-1 bg-white border-2 border-gray-300 rounded-lg p-6 shadow-sm min-h-[120px] flex items-center transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-green-500 hover:-translate-y-1">
                <div
                  className="text-gray-700 text-base leading-relaxed"
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

export default ProblemSolutionTemplate;

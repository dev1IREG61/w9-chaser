import React from "react";
import { AlertTriangle, Lightbulb } from "lucide-react";
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
    <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8">
      {/* Title */}
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

      {/* Main Container */}
      <div className="max-w-7xl mx-auto">
        {/* Headers */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px_1fr] gap-4 mb-10 px-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-orange-500">
            Problem
          </h2>
          <div></div>
          <h2 className="text-4xl lg:text-5xl font-bold text-green-600">
            Solution
          </h2>
        </div>

        {/* Items */}
        <div className="space-y-6">
          {section.items.map((item, index) => (
            <div key={index} className="relative">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px_1fr] gap-4 items-center">
                {/* Problem Box */}
                <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-sm hover:shadow-xl hover:scale-105 hover:border-l-8 hover:-translate-y-1 transition-all duration-300">
                  <p className="text-gray-800 text-base leading-relaxed">
                    {item.problem}
                  </p>
                </div>

                {/* Center Section with Icons and Arrows */}
                <div className="hidden lg:flex items-center justify-center gap-2">
                  {/* Problem Icon */}
                  <div className="w-12 h-12 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full shadow-xl flex items-center justify-center flex-shrink-0">
                    <AlertTriangle
                      className="w-6 h-6 text-white"
                      strokeWidth={2.5}
                    />
                  </div>

                  {/* Left Arrow */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="text-gray-400 flex-shrink-0"
                  >
                    <path
                      d="M3 12 L12 8 L12 10 L18 10 L18 14 L12 14 L12 16 Z"
                      fill="currentColor"
                    />
                  </svg>

                  {/* Right Arrow */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="text-gray-400 flex-shrink-0"
                  >
                    <path
                      d="M21 12 L12 16 L12 14 L6 14 L6 10 L12 10 L12 8 Z"
                      fill="currentColor"
                    />
                  </svg>

                  {/* Solution Icon */}
                  <div className="w-12 h-12 bg-gradient-to-b from-green-500 to-green-700 rounded-full shadow-xl flex items-center justify-center flex-shrink-0">
                    <Lightbulb
                      className="w-6 h-6 text-white"
                      strokeWidth={2.5}
                      fill="white"
                    />
                  </div>
                </div>

                {/* Solution Box */}
                <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6 shadow-sm hover:shadow-xl hover:scale-105 hover:border-l-8 hover:-translate-y-1 transition-all duration-300">
                  <div
                    className="text-gray-800 text-base leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.solution }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;

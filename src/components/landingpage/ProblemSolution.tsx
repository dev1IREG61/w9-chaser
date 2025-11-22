import { useState } from "react";
import {
  User,
  Briefcase,
  UserCheck,
  Laptop,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const MarketingProblemSolution = () => {
  const [selectedPersona, setSelectedPersona] = useState("marketing");
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const personas = [
    {
      id: "founder",
      title: "The Busy Founder",
      icon: Briefcase,
      color: "gray",
    },
    {
      id: "marketing",
      title: "The Marketing Lead",
      icon: User,
      color: "blue",
      problems: [
        "Stop fighting with spreadsheets",
        "Marching modimts and content analysis",
        "Solven slated marketing with spreadsheets",
      ],
      solutions: [
        "Automate your content workflow",
        "Get real-time analytics dashboard",
        "Unified marketing platform",
      ],
    },
    {
      id: "sales",
      title: "The Sales Manager",
      icon: UserCheck,
      color: "gray",
    },
    {
      id: "it",
      title: "The IT Admin",
      icon: Laptop,
      color: "gray",
    },
  ];

  const visiblePersonas = personas.slice(startIndex, startIndex + visibleCount);
  const showNavigation = personas.length > visibleCount;

  const handlePrevious = () => {
    setStartIndex(Math.max(0, startIndex - 1));
  };

  const handleNext = () => {
    setStartIndex(Math.min(personas.length - visibleCount, startIndex + 1));
  };

  const selectedPersonaData = personas.find((p) => p.id === selectedPersona);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-16">
            Who are you, and what's
            <br />
            slowing you down?
          </h1>

          {/* Persona Selection */}
          <div className="relative flex justify-center items-center">
            {/* Left Navigation Button */}
            {showNavigation && (
              <button
                onClick={handlePrevious}
                disabled={startIndex === 0}
                className={`absolute left-0 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all ${
                  startIndex === 0
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-blue-50 hover:shadow-xl"
                }`}
              >
                <ChevronLeft className="w-6 h-6 text-blue-600" />
              </button>
            )}

            {/* Personas */}
            <div className="flex justify-center items-end gap-8 mb-8">
              {visiblePersonas.map((persona) => {
                const Icon = persona.icon;
                const isSelected = selectedPersona === persona.id;

                return (
                  <button
                    key={persona.id}
                    onClick={() => setSelectedPersona(persona.id)}
                    className="flex flex-col items-center transition-all duration-300 focus:outline-none group"
                  >
                    <div
                      className={`relative rounded-full transition-all duration-300 ${
                        isSelected
                          ? "w-44 h-44 mb-4"
                          : "w-32 h-32 mb-2 opacity-40 grayscale hover:opacity-60"
                      }`}
                    >
                      <div
                        className={`absolute inset-0 rounded-full ${
                          isSelected
                            ? "bg-gradient-to-br from-blue-400 to-blue-600 p-1"
                            : "bg-gray-200"
                        }`}
                      >
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                          <div
                            className={`rounded-full ${
                              isSelected
                                ? "w-36 h-36 bg-gradient-to-br from-blue-500 to-blue-700"
                                : "w-28 h-28 bg-gray-300"
                            } flex items-center justify-center`}
                          >
                            {isSelected ? (
                              <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center">
                                <div className="text-white">
                                  <div className="w-20 h-20 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
                                    <div className="w-12 h-12 bg-white/30 rounded-full"></div>
                                  </div>
                                  <div className="w-24 h-16 bg-white/20 rounded-t-full"></div>
                                </div>
                              </div>
                            ) : (
                              <Icon className="w-16 h-16 text-gray-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p
                      className={`text-sm font-medium transition-all ${
                        isSelected ? "text-gray-900 text-base" : "text-gray-400"
                      }`}
                    >
                      {persona.title}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right Navigation Button */}
            {showNavigation && (
              <button
                onClick={handleNext}
                disabled={startIndex >= personas.length - visibleCount}
                className={`absolute right-0 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all ${
                  startIndex >= personas.length - visibleCount
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-blue-50 hover:shadow-xl"
                }`}
              >
                <ChevronRight className="w-6 h-6 text-blue-600" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Problem-Solution Section */}
      {selectedPersonaData && selectedPersonaData.problems && (
        <div className="max-w-5xl mx-auto px-4 py-5">
          <div className="bg-white rounded-3xl shadow-xl p-12 border border-blue-500">
            <div className="flex gap-1 items-start">
              {/* Left Side - Problems */}
              <div className="w-1/2">
                <h2 className="mb-8">
                  <span className="text-blue-600 text-3xl font-bold">
                    For Marketers:
                  </span>
                  <br />
                  <span className="text-4xl font-bold text-gray-900">
                    Stop fighting with spreadsheets
                  </span>
                </h2>
              </div>

              {/* Right Side - Problem Items */}
              <div className="w-1/2 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        strokeWidth="2"
                      />
                      <path d="M3 9h18M9 3v18" strokeWidth="2" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      Problem-canonn: Stop fighting with spreadsheets
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="12" r="3" strokeWidth="2" />
                      <path
                        d="M12 2v4m0 12v4M2 12h4m12 0h4m-3.05-7.05l-2.83 2.83m-5.66 5.66l-2.83 2.83m12.02 0l-2.83-2.83m-5.66-5.66l-2.83-2.83"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      Problem Inters nmarching modimts and content analysis
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      Problem Solven slated marketing with spreadsheets
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingProblemSolution;

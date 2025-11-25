import React, { useState } from "react";
import type { LandingPageData } from "../../types/landing";
import EasyIcon from "./IconRenderer";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HowItWorksProps {
  data: LandingPageData;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ data }) => {
  const section = data.how_it_works_section;
  const primaryColor = data.color_theme?.primary_color || "#3B82F6";
  const secondaryColor = data.color_theme?.secondary_color || "#1E40AF";
  const [currentStep, setCurrentStep] = useState(0);

  if (!section || !section.steps || section.steps.length === 0) {
    return null;
  }

  const hasMultipleSteps = section.steps.length > 1;
  const canGoPrev = currentStep > 0;
  const canGoNext = currentStep < section.steps.length - 1;

  const getVideoEmbedUrl = (url: string): string | undefined => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.match(
        /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/
      )?.[1];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : undefined;
    }
    return url;
  };

  const getIconName = (icon?: string) => icon?.split('/').pop() || '';

  const currentStepData = section.steps[currentStep];
  const videoUrl = currentStepData?.video?.video_url;
  const imageUrl = currentStepData?.image;
  const embedUrl = videoUrl ? getVideoEmbedUrl(videoUrl) : undefined;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative">
          {hasMultipleSteps && (
            <button
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={!canGoPrev}
              className="absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all z-10"
              style={{
                opacity: canGoPrev ? 1 : 0.3,
                cursor: canGoPrev ? 'pointer' : 'not-allowed',
                backgroundColor: canGoPrev ? `${primaryColor}10` : '#fff',
              }}
            >
              <ChevronLeft className="w-6 h-6" style={{ color: primaryColor }} />
            </button>
          )}
          {/* Left side - Image/Video */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              {embedUrl ? (
                <div className="aspect-video">
                  <iframe
                    src={embedUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : imageUrl ? (
                <img
                  src={imageUrl}
                  alt={section.heading}
                  className="w-full h-auto"
                />
              ) : (
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No media available</span>
                </div>
              )}
            </div>

            {/* Floating header badge */}
            <div className="absolute top-6 right-6 text-white px-6 py-4 rounded-xl shadow-lg" style={{ backgroundColor: secondaryColor }}>
              <div className="flex items-center gap-3">
                <EasyIcon icon={section.icon || "FiZap"} size={32} color="#FFFFFF" />
                <div>
                  <div className="font-bold text-lg">{section.heading}</div>
                  <div className="text-sm opacity-80">
                    {section.steps.length} Simple Steps
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Steps */}
          <div className="relative">
            {hasMultipleSteps && (
              <button
                onClick={() => setCurrentStep(prev => Math.min(section.steps.length - 1, prev + 1))}
                disabled={!canGoNext}
                className="absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all z-10"
                style={{
                  opacity: canGoNext ? 1 : 0.3,
                  cursor: canGoNext ? 'pointer' : 'not-allowed',
                  backgroundColor: canGoNext ? `${primaryColor}10` : '#fff',
                }}
              >
                <ChevronRight className="w-6 h-6" style={{ color: primaryColor }} />
              </button>
            )}
            <div className="space-y-8">
              {(hasMultipleSteps ? [currentStepData] : section.steps).map((step, index) => (
                <div key={index} className="space-y-6">
                {/* Step Icon & Number */}
                {step.icon && (
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}15` }}>
                      <EasyIcon icon={getIconName(step.icon)} size={32} color={primaryColor} />
                    </div>
                    <span className="text-3xl font-bold text-gray-300">Step {step.step_number}</span>
                  </div>
                )}
                
                {/* Step Content Items */}
                {step.content?.map((item, idx) => (
                  <div key={idx} className="flex gap-4 pl-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${primaryColor}10` }}>
                        <EasyIcon icon={getIconName(item.icon) || 'FiCircle'} size={20} color={primaryColor} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
                
                </div>
              ))}
            </div>
            {hasMultipleSteps && (
              <div className="flex justify-center gap-2 mt-8">
                {section.steps.map((_, index) => (
                  <div
                    key={index}
                    className="h-2 rounded-full transition-all cursor-pointer"
                    style={{
                      width: index === currentStep ? '2rem' : '0.5rem',
                      backgroundColor: index === currentStep ? primaryColor : '#D1D5DB',
                    }}
                    onClick={() => setCurrentStep(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

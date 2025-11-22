import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import type { LandingPageData } from "../../types/landing";
import EasyIcon from "./IconRenderer";

interface HeaderProps {
  data: LandingPageData;
  onShowLogin?: () => void;
}

const Header: React.FC<HeaderProps> = ({ data, onShowLogin }) => {
  const {
    header_title,
    header_subtitle,
    header_description,
    header_cta_primary,
    header_cta_primary_url,
    header_cta_secondary,
    header_cta_secondary_url,
    header_section_image,
    color_theme,
  } = data;

  const primaryColor = color_theme?.primary_color || "#6366F1";
  const accentColor = color_theme?.accent_color || "#8B5CF6";
  const textColor = color_theme?.text_color || "#1F2937";
  const neutralColor = color_theme?.neutral_color || "#6B7280";
  const bgColor = color_theme?.background_color || "#FFFFFF";

  const [isBlinking, setIsBlinking] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const backendBaseUrl = "https://esign-admin.signmary.com";

  const backgroundImageUrl = data.header_background_image?.url
    ? data.header_background_image.url.startsWith("http")
      ? data.header_background_image.url
      : `${backendBaseUrl}${data.header_background_image.url}`
    : null;

  const rightImageUrl = header_section_image?.url?.startsWith("http")
    ? header_section_image.url
    : header_section_image?.url
    ? `${backendBaseUrl}${header_section_image.url}`
    : null;

  // Start blinking after component mounts
  useEffect(() => {
    const blinkTimer = setTimeout(() => {
      setIsBlinking(true);
    }, 1000);

    return () => clearTimeout(blinkTimer);
  }, []);

  const handleGetStartedClick = () => {
    // Stop blinking when button is clicked
    setIsBlinking(false);

    // Trigger the original onShowLogin if provided
    if (onShowLogin) {
      onShowLogin();
    }
  };

  return (
    <header
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden min-h-screen"
      style={{
        backgroundColor: bgColor,
        backgroundImage: backgroundImageUrl
          ? `url(${backgroundImageUrl})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Simple background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"
        style={{ opacity: backgroundImageUrl ? 0.3 : 1 }}
      />

      {/* Content Container */}
      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-7xl"
        style={{ y, opacity }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Text Content - Left Side */}
          <motion.div
            className="lg:w-1/2 text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="max-w-xl">
              {/* Top Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <EasyIcon icon="FiSmartphone" size={16} color={primaryColor} />
                <span className="text-sm font-medium text-blue-700">
                  {header_subtitle ||
                    "Add iOS 16 Passkeys to your website with OwnID"}
                </span>
              </motion.div>

              {/* Main Title */}
              {header_title && (
                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                  style={{ color: textColor }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.7 }}
                >
                  {header_title}
                </motion.h1>
              )}

              {/* Subtitle */}
              {header_description && (
                <motion.p
                  className="text-xl lg:text-2xl mb-8 leading-relaxed font-light"
                  style={{ color: neutralColor }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.7 }}
                >
                  {header_description.split("\n")[0]}
                </motion.p>
              )}

              {/* Description Details */}
              <motion.div
                className="text-base lg:text-lg mb-10 leading-relaxed"
                style={{ color: neutralColor }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.7 }}
              >
                {header_description &&
                  header_description
                    .split("\n")
                    .slice(1)
                    .map((line, index) => {
                      const trimmedLine = line.trim();
                      if (!trimmedLine) return null;
                      return (
                        <p key={index} className="mb-4">
                          {trimmedLine}
                        </p>
                      );
                    })}
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row items-start gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                {header_cta_primary && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {header_cta_primary_url ? (
                      <motion.a
                        href={header_cta_primary_url}
                        className="px-8 py-4 rounded-lg font-semibold text-white cursor-pointer inline-flex items-center gap-3 text-base shadow-lg hover:shadow-xl transition-all duration-200"
                        style={{
                          background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                        }}
                      >
                        {header_cta_primary}
                        <EasyIcon
                          icon="FiArrowRight"
                          size={20}
                          color="#FFFFFF"
                        />
                      </motion.a>
                    ) : (
                      <motion.button
                        onClick={handleGetStartedClick}
                        className="px-8 py-4 rounded-lg font-semibold text-white cursor-pointer inline-flex items-center gap-3 text-base shadow-lg hover:shadow-xl transition-all duration-200 relative overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                        }}
                        animate={
                          isBlinking
                            ? {
                                boxShadow: [
                                  `0 0 0 0 rgba(99, 102, 241, 0.7)`,
                                  `0 0 0 20px rgba(99, 102, 241, 0)`,
                                  `0 0 0 0 rgba(99, 102, 241, 0)`,
                                ],
                              }
                            : {}
                        }
                        transition={
                          isBlinking
                            ? {
                                boxShadow: {
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatDelay: 1,
                                },
                              }
                            : {}
                        }
                      >
                        {header_cta_primary}
                        <EasyIcon
                          icon="FiArrowRight"
                          size={20}
                          color="#FFFFFF"
                        />
                      </motion.button>
                    )}
                  </motion.div>
                )}

                {header_cta_secondary && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {header_cta_secondary_url &&
                    header_cta_secondary_url !== "#login" ? (
                      <motion.a
                        href={header_cta_secondary_url}
                        className="px-8 py-4 rounded-lg font-semibold cursor-pointer inline-flex items-center gap-2 text-base border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900 transition-all duration-200"
                      >
                        {header_cta_secondary}
                      </motion.a>
                    ) : (
                      <motion.button
                        onClick={onShowLogin}
                        className="px-8 py-4 rounded-lg font-semibold cursor-pointer inline-flex items-center gap-2 text-base border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900 transition-all duration-200"
                      >
                        {header_cta_secondary}
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                className="flex flex-col sm:flex-row items-start gap-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>More registrations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>More logins</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Image Section - Right Side */}
          <motion.div
            className="lg:w-1/2 flex items-center justify-center lg:justify-end mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full max-w-md">
              {rightImageUrl ? (
                <div className="relative">
                  {/* Main Image Container */}
                  <motion.div
                    className="relative rounded-2xl overflow-hidden bg-white shadow-2xl border border-gray-200"
                    whileHover={{
                      y: -5,
                      scale: 1.01,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img
                      src={rightImageUrl}
                      alt="Header Visual"
                      className="w-full h-auto object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.5 }}
                    />
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  className="w-full h-[400px] rounded-2xl flex flex-col items-center justify-center p-8 text-center relative bg-gray-100 border-2 border-dashed border-gray-300"
                  whileHover={{
                    scale: 1.02,
                    borderColor: primaryColor,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <EasyIcon
                    icon="FiImage"
                    size={48}
                    color={primaryColor}
                    className="opacity-40"
                  />
                  <p className="text-base font-medium mt-4 text-gray-500">
                    Add an image to showcase your product
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;

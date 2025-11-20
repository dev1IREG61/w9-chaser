import React from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import type { LandingPageData, Section } from "../../types/landing";

interface FooterProps {
  data: LandingPageData;
}

function Footer({ data }: FooterProps) {
  const footerSection = data.sections?.find(
    (section: Section) => section.type === "footer"
  );
  const footerConfig = data.footer_config || footerSection?.data;

  // If no footer config found, return null
  if (!footerConfig) {
    console.log("No footer config found in data:", data);
    return null;
  }

  const primaryColor = data.color_theme?.primary_color || "#3B82F6";
  const textColor = data.color_theme?.text_color || "#1F2937";
  const backgroundColor = data.color_theme?.background_color || "#1E293B";

  // Debug log to see what we're working with
  console.log("Footer config:", footerConfig);

  // Social media links configuration - handle both data structures
  const socialLinks = [
    {
      icon: Facebook,
      url: footerConfig.social_links?.facebook || footerConfig.facebook_url,
      label: "Facebook",
    },
    {
      icon: Twitter,
      url: footerConfig.social_links?.twitter || footerConfig.twitter_url,
      label: "Twitter",
    },
    {
      icon: Linkedin,
      url: footerConfig.social_links?.linkedin || footerConfig.linkedin_url,
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      url: footerConfig.social_links?.instagram || footerConfig.instagram_url,
      label: "Instagram",
    },
    {
      icon: Youtube,
      url: footerConfig.social_links?.youtube || footerConfig.youtube_url,
      label: "YouTube",
    },
  ].filter((link) => link.url);

  // Handle sections data structure - check both possible field names
  const sections = {
    quick_links:
      footerConfig.sections?.quick_links !== undefined
        ? footerConfig.sections.quick_links
        : footerConfig.show_quick_links !== undefined
        ? footerConfig.show_quick_links
        : true, // default to true if not specified

    services:
      footerConfig.sections?.services !== undefined
        ? footerConfig.sections.services
        : footerConfig.show_services !== undefined
        ? footerConfig.show_services
        : true, // default to true if not specified

    contact:
      footerConfig.sections?.contact !== undefined
        ? footerConfig.sections.contact
        : footerConfig.show_contact !== undefined
        ? footerConfig.show_contact
        : true, // default to true if not specified
  };

  // Handle company info - check both possible field structures
  const companyInfo = {
    description:
      footerConfig.company_info?.description ||
      footerConfig.company_description ||
      "",
    logo: footerConfig.company_info?.logo || footerConfig.logo,
  };

  // Handle contact info - check both possible field structures
  const contactInfo = {
    address: footerConfig.contact_info?.address || footerConfig.address || "",
    phone: footerConfig.contact_info?.phone || footerConfig.phone || "",
    email: footerConfig.contact_info?.email || footerConfig.email || "",
  };

  const getFullImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `https://esign-admin.signmary.com${url}`; // <-- your backend domain
  };

  // Apply dynamic theming
  const footerStyle = {
    backgroundColor: backgroundColor,
    color: textColor,
  } as React.CSSProperties;

  return (
    <footer style={footerStyle} className="transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info Section - ALWAYS SHOW */}
          <div className="space-y-4">
            {companyInfo.logo ? (
              <div
                className="rounded-full overflow-hidden border-2 w-16 h-16 mx-auto md:mx-0"
                style={{ borderColor: primaryColor }}
              >
                <img
                  src={getFullImageUrl(companyInfo.logo.url)}
                  alt={companyInfo.logo.title || "Company Logo"}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div
                className="h-16 w-16 rounded-lg flex items-center justify-center text-white font-bold text-xl mx-auto md:mx-0"
                style={{ backgroundColor: primaryColor }}
              >
                {data.title?.charAt(0) || "L"}
              </div>
            )}

            {companyInfo.description && (
              <p className="text-sm leading-relaxed text-center md:text-left">
                {companyInfo.description}
              </p>
            )}

            {/* Social Links - ALWAYS SHOW IF LINKS EXIST */}
            {socialLinks.length > 0 && (
              <div className="flex gap-3 mt-4">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-9 h-9 rounded-full bg-blue-500 hover:bg-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-110"
                      style={
                        {
                          "--hover-color": primaryColor,
                        } as React.CSSProperties
                      }
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = primaryColor;
                        e.currentTarget.style.color = "#FFFFFF";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "";
                        e.currentTarget.style.color = textColor;
                      }}
                    >
                      <Icon size={18} style={{ color: "inherit" }} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Links Section - DYNAMICALLY SHOW/HIDE */}
          {sections.quick_links && (
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#benefits"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Benefits
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="text-sm hover:text-white transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* Services Section - DYNAMICALLY SHOW/HIDE */}
          {sections.services && (
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">
                Services
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#services"
                    className="text-sm hover:text-white transition-colors"
                  >
                    All Services
                  </a>
                </li>
                <li>
                  <a
                    href="#consultation"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Consultation
                  </a>
                </li>
                <li>
                  <a
                    href="#support"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Support
                  </a>
                </li>
                <li>
                  <a
                    href="#resources"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Resources
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* Contact Section - DYNAMICALLY SHOW/HIDE */}
          {sections.contact && (
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">
                Contact Us
              </h3>
              <ul className="space-y-3">
                {contactInfo.address && (
                  <li className="flex items-start gap-3">
                    <MapPin
                      size={18}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: primaryColor }}
                    />
                    <span className="text-sm whitespace-pre-line">
                      {contactInfo.address}
                    </span>
                  </li>
                )}
                {contactInfo.phone && (
                  <li className="flex items-center gap-3">
                    <Phone
                      size={18}
                      className="flex-shrink-0"
                      style={{ color: primaryColor }}
                    />
                    <a
                      href={`tel:${contactInfo.phone.replace(/\D/g, "")}`}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </li>
                )}
                {contactInfo.email && (
                  <li className="flex items-center gap-3">
                    <Mail
                      size={18}
                      className="flex-shrink-0"
                      style={{ color: primaryColor }}
                    />
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Bar - ALWAYS SHOW */}
        <div className="pt-8 mt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* DYNAMIC COPYRIGHT TEXT */}
            <p className="text-sm text-slate-400 text-center md:text-left">
              {footerConfig.copyright_text ||
                `© ${new Date().getFullYear()} ${
                  data.title
                }. All rights reserved.`}
            </p>

            {/* Policy Links - Currently Hardcoded (can be made dynamic later) */}
            <div className="flex gap-6 text-sm">
              <a
                href="#privacy"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#cookies"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

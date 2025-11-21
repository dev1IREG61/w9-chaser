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
  // const textColor = data.color_theme?.text_color || "#1F2937";
  // const backgroundColor = data.color_theme?.background_color || "#1E293B";

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

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 border-t border-gray-200">
      {/* Subtle Pattern Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, ${primaryColor}20 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${primaryColor}15 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info Section - ALWAYS SHOW */}
          <div className="space-y-6">
            {companyInfo.logo ? (
              <div className="w-20 h-20 mx-auto md:mx-0">
                <img
                  src={getFullImageUrl(companyInfo.logo.url)}
                  alt={companyInfo.logo.title || "Company Logo"}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div
                className="h-20 w-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto md:mx-0 shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`,
                }}
              >
                {data.title?.charAt(0) || "L"}
              </div>
            )}

            {companyInfo.description && (
              <p className="text-sm leading-relaxed text-center md:text-left text-gray-600">
                {companyInfo.description}
              </p>
            )}

            {/* Social Links - ALWAYS SHOW IF LINKS EXIST */}
            {socialLinks.length > 0 && (
              <div className="flex gap-3 justify-center md:justify-start">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-xl bg-white border-2 border-gray-200 hover:border-transparent flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg text-gray-600"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`;
                        e.currentTarget.style.color = "#FFFFFF";
                        e.currentTarget.style.borderColor = "transparent";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "";
                        e.currentTarget.style.color = "";
                        e.currentTarget.style.borderColor = "";
                      }}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Links Section - DYNAMICALLY SHOW/HIDE */}
          {sections.quick_links && (
            <div>
              <h3 className="text-gray-900 font-bold text-lg mb-6 relative inline-block">
                Quick Links
                <div
                  className="absolute -bottom-2 left-0 w-12 h-1 rounded-full"
                  style={{ background: primaryColor }}
                />
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#home"
                    className="text-sm text-gray-600 hover:text-primary transition-all duration-200 flex items-center gap-2 group"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = primaryColor)
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  >
                    <span
                      className="w-0 h-0.5 group-hover:w-4 transition-all duration-200"
                      style={{ background: primaryColor }}
                    />
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-all duration-200 flex items-center gap-2 group"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = primaryColor)
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  >
                    <span
                      className="w-0 h-0.5 group-hover:w-4 transition-all duration-200"
                      style={{ background: primaryColor }}
                    />
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#benefits"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-all duration-200 flex items-center gap-2 group"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = primaryColor)
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  >
                    <span
                      className="w-0 h-0.5 group-hover:w-4 transition-all duration-200"
                      style={{ background: primaryColor }}
                    />
                    Benefits
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-all duration-200 flex items-center gap-2 group"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = primaryColor)
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  >
                    <span
                      className="w-0 h-0.5 group-hover:w-4 transition-all duration-200"
                      style={{ background: primaryColor }}
                    />
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-all duration-200 flex items-center gap-2 group"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = primaryColor)
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  >
                    <span
                      className="w-0 h-0.5 group-hover:w-4 transition-all duration-200"
                      style={{ background: primaryColor }}
                    />
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* Services Section - DYNAMICALLY SHOW/HIDE */}
          {sections.services && (
            <div>
              <h3 className="text-gray-900 font-bold text-lg mb-6 relative inline-block">
                Services
                <div
                  className="absolute -bottom-2 left-0 w-12 h-1 rounded-full"
                  style={{ background: primaryColor }}
                />
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#services"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-all duration-200 flex items-center gap-2 group"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = primaryColor)
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  >
                    <span
                      className="w-0 h-0.5 group-hover:w-4 transition-all duration-200"
                      style={{ background: primaryColor }}
                    />
                    All Services
                  </a>
                </li>
                <li>
                  <a
                    href="#consultation"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-all duration-200 flex items-center gap-2 group"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = primaryColor)
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  >
                    <span
                      className="w-0 h-0.5 group-hover:w-4 transition-all duration-200"
                      style={{ background: primaryColor }}
                    />
                    Consultation
                  </a>
                </li>
                <li>
                  <a
                    href="#support"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-all duration-200 flex items-center gap-2 group"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = primaryColor)
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  >
                    <span
                      className="w-0 h-0.5 group-hover:w-4 transition-all duration-200"
                      style={{ background: primaryColor }}
                    />
                    Support
                  </a>
                </li>
                <li>
                  <a
                    href="#resources"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-all duration-200 flex items-center gap-2 group"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = primaryColor)
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  >
                    <span
                      className="w-0 h-0.5 group-hover:w-4 transition-all duration-200"
                      style={{ background: primaryColor }}
                    />
                    Resources
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-all duration-200 flex items-center gap-2 group"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = primaryColor)
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  >
                    <span
                      className="w-0 h-0.5 group-hover:w-4 transition-all duration-200"
                      style={{ background: primaryColor }}
                    />
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* Contact Section - DYNAMICALLY SHOW/HIDE */}
          {sections.contact && (
            <div>
              <h3 className="text-gray-900 font-bold text-lg mb-6 relative inline-block">
                Contact Us
                <div
                  className="absolute -bottom-2 left-0 w-12 h-1 rounded-full"
                  style={{ background: primaryColor }}
                />
              </h3>
              <ul className="space-y-4">
                {contactInfo.address && (
                  <li className="flex items-start gap-3 group">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-100 border border-gray-200 group-hover:shadow-md transition-all"
                      style={{ color: primaryColor }}
                    >
                      <MapPin size={16} />
                    </div>
                    <span className="text-sm whitespace-pre-line text-gray-600 leading-relaxed">
                      {contactInfo.address}
                    </span>
                  </li>
                )}
                {contactInfo.phone && (
                  <li className="flex items-center gap-3 group">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-100 border border-gray-200 group-hover:shadow-md transition-all"
                      style={{ color: primaryColor }}
                    >
                      <Phone size={16} />
                    </div>
                    <a
                      href={`tel:${contactInfo.phone.replace(/\D/g, "")}`}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = primaryColor)
                      }
                      onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                    >
                      {contactInfo.phone}
                    </a>
                  </li>
                )}
                {contactInfo.email && (
                  <li className="flex items-center gap-3 group">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-100 border border-gray-200 group-hover:shadow-md transition-all"
                      style={{ color: primaryColor }}
                    >
                      <Mail size={16} />
                    </div>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = primaryColor)
                      }
                      onMouseLeave={(e) => (e.currentTarget.style.color = "")}
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
        <div className="pt-8 mt-12 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* DYNAMIC COPYRIGHT TEXT */}
            <p className="text-sm text-gray-600 text-center md:text-left flex items-center gap-2 justify-center md:justify-start">
              {footerConfig.copyright_text ||
                `${new Date().getFullYear()} ${
                  data.title
                }. All rights reserved.`}
            </p>

            {/* Policy Links - Currently Hardcoded (can be made dynamic later) */}
            <div className="flex gap-6 text-sm flex-wrap justify-center md:justify-end">
              <a
                href="#privacy"
                className="text-gray-600 hover:text-gray-900 transition-all duration-200 relative group"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = primaryColor)
                }
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              >
                Privacy Policy
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-200"
                  style={{ background: primaryColor }}
                />
              </a>
              <a
                href="#terms"
                className="text-gray-600 hover:text-gray-900 transition-all duration-200 relative group"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = primaryColor)
                }
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              >
                Terms of Service
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-200"
                  style={{ background: primaryColor }}
                />
              </a>
              <a
                href="#cookies"
                className="text-gray-600 hover:text-gray-900 transition-all duration-200 relative group"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = primaryColor)
                }
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              >
                Cookie Policy
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-200"
                  style={{ background: primaryColor }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

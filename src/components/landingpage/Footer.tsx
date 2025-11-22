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

  // Social media links from API
  const socialIconMap: Record<string, any> = {
    Facebook: Facebook,
    Twitter: Twitter,
    LinkedIn: Linkedin,
    Instagram: Instagram,
    YouTube: Youtube,
  };

  const socialLinks = (footerConfig.social_links || []).map((link: any) => ({
    icon: socialIconMap[link.platform] || Facebook,
    url: link.url,
    label: link.platform,
  }));

  // Get dynamic links from nested structure
  const quickLinks = footerConfig.sections?.quick_links?.links || [];
  const serviceLinks = footerConfig.sections?.services?.links || [];
  const resourceLinks = footerConfig.sections?.resources?.links || [];
  const legalLinks = footerConfig.sections?.legal?.links || [];

  const companyInfo = {
    description: footerConfig.company_info?.description || "",
    logo: footerConfig.company_info?.logo,
  };

  const contactInfo = {
    address: footerConfig.contact_info?.address || "",
    phone: footerConfig.contact_info?.phone || "",
    email: footerConfig.contact_info?.email || "",
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
              <p className="text-xl leading-relaxed font-bold text-center md:text-left text-black-600">
                {companyInfo.description}
              </p>
            )}

            {/* Social Links - ALWAYS SHOW IF LINKS EXIST */}
            {socialLinks.length > 0 && (
              <div className="flex gap-3 justify-center md:justify-start">
                {socialLinks.map((social: any, idx: any) => {
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

          {/* Quick Links Section */}
          {footerConfig.sections?.quick_links?.show &&
            quickLinks.length > 0 && (
              <div>
                <h3 className="text-gray-900 font-bold text-lg mb-6 relative inline-block">
                  {footerConfig.sections.quick_links.heading || "Quick Links"}
                  <div
                    className="absolute -bottom-2 left-0 w-12 h-1 rounded-full"
                    style={{ background: primaryColor }}
                  />
                </h3>
                <ul className="space-y-3">
                  {quickLinks.map((link: any, idx: number) => (
                    <li key={idx}>
                      <a
                        href={link.url || "#"}
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
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Services Section */}
          {footerConfig.sections?.services?.show && serviceLinks.length > 0 && (
            <div>
              <h3 className="text-gray-900 font-bold text-lg mb-6 relative inline-block">
                {footerConfig.sections.services.heading || "Services"}
                <div
                  className="absolute -bottom-2 left-0 w-12 h-1 rounded-full"
                  style={{ background: primaryColor }}
                />
              </h3>
              <ul className="space-y-3">
                {serviceLinks.map((link: any, idx: number) => (
                  <li key={idx}>
                    <a
                      href={link.url || "#"}
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
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resources Section */}
          {footerConfig.sections?.resources?.show &&
            resourceLinks.length > 0 && (
              <div>
                <h3 className="text-gray-900 font-bold text-lg mb-6 relative inline-block">
                  {footerConfig.sections.resources.heading || "Resources"}
                  <div
                    className="absolute -bottom-2 left-0 w-12 h-1 rounded-full"
                    style={{ background: primaryColor }}
                  />
                </h3>
                <ul className="space-y-3">
                  {resourceLinks.map((link: any, idx: number) => (
                    <li key={idx}>
                      <a
                        href={link.url || "#"}
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
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Contact Section */}
          {footerConfig.sections?.contact?.show && (
            <div>
              <h3 className="text-gray-900 font-bold text-lg mb-6 relative inline-block">
                {footerConfig.sections.contact.heading || "Contact"}
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

            {/* Legal Links */}
            {legalLinks.length > 0 && (
              <div className="flex gap-6 text-sm flex-wrap justify-center md:justify-end">
                {legalLinks.map((link: any, idx: number) => (
                  <a
                    key={idx}
                    href={link.url}
                    className="text-gray-600 hover:text-gray-900 transition-all duration-200 relative group"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = primaryColor)
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  >
                    {link.name}
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-200"
                      style={{ background: primaryColor }}
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

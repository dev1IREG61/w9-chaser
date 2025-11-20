import React from "react";
import type { DynamicContentBlock } from "../../types/landing";
import EasyIcon from "./IconRenderer"; // Add this import

const API_BASE_URL = "https://esign-admin.signmary.com";

const extractYouTubeId = (url: string): string => {
  if (!url) return "";
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/
  );
  return match ? match[1] : "";
};

const getFullImageUrl = (url: string): string => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_BASE_URL}${url}`;
};

const DynamicContentRenderer: React.FC<{ block: DynamicContentBlock }> = ({
  block,
}) => {
  switch (block.type) {
    case "rich_text":
      return (
        <div
          className="prose prose-lg max-w-none mb-8 text-gray-700"
          dangerouslySetInnerHTML={{ __html: block.value }}
        />
      );

    case "blockquote":
      return (
        <blockquote className="border-l-4 border-blue-500 pl-6 py-4 italic mb-8 bg-gradient-to-r from-blue-50 to-transparent rounded-r-lg">
          <p className="text-xl text-gray-700 font-medium leading-relaxed">
            "{block.value.text}"
          </p>
          {block.value.author && (
            <footer className="text-sm text-gray-600 mt-3 not-italic font-semibold">
              — {block.value.author}
              {block.value.source && (
                <span className="text-gray-500 font-normal">
                  {" "}
                  ({block.value.source})
                </span>
              )}
            </footer>
          )}
        </blockquote>
      );

    case "cta":
      return (
        <div
          className="relative p-12 rounded-2xl mb-12 text-white overflow-hidden shadow-2xl"
          style={{
            backgroundImage: block.value.background_image
              ? `url(${getFullImageUrl(block.value.background_image.url)})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: block.value.background_image
              ? "transparent"
              : "#3B82F6",
          }}
        >
          {block.value.background_image && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
          )}
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h3 className="text-4xl font-bold mb-4 drop-shadow-lg">
              {block.value.title}
            </h3>
            {block.value.description && (
              <p className="text-xl mb-8 opacity-95 leading-relaxed">
                {block.value.description}
              </p>
            )}
            <a
              href={block.value.button_url}
              className={`inline-block px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                block.value.button_style === "primary"
                  ? "bg-white text-blue-600 hover:bg-gray-100"
                  : block.value.button_style === "secondary"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "border-3 border-white text-white hover:bg-white hover:text-blue-600"
              }`}
            >
              {block.value.button_text}
            </a>
          </div>
        </div>
      );

    case "video":
      return (
        <div className="mb-12">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-100">
            <iframe
              src={`https://www.youtube.com/embed/${extractYouTubeId(
                block.value.video_url || ""
              )}?autoplay=${block.value.autoplay === "true" ? 1 : 0}&controls=${
                block.value.controls === "true" ? 1 : 0
              }&loop=${block.value.loop === "true" ? 1 : 0}&mute=${
                block.value.muted === "true" ? 1 : 0
              }`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Video content"
            />
          </div>
        </div>
      );

    case "card_grid":
      return (
        <div className="mb-16">
          {block.value.heading && (
            <h3 className="text-4xl font-bold mb-4 text-center text-gray-800">
              {block.value.heading}
            </h3>
          )}
          {block.value.subheading && (
            <p className="text-gray-600 mb-10 text-center text-xl max-w-3xl mx-auto">
              {block.value.subheading}
            </p>
          )}
          <div
            className={`grid gap-8 ${
              block.value.columns === "1"
                ? "grid-cols-1"
                : block.value.columns === "2"
                ? "grid-cols-1 md:grid-cols-2"
                : block.value.columns === "3"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : block.value.columns === "4"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {block.value.cards?.map((card: any, idx: number) => {
              // Get card content from snippet or use custom data
              const cardData = card.card_content || card;
              const title = card.custom_title || cardData.title;
              const description =
                card.custom_description || cardData.description;
              const icon = cardData.icon;
              const features = cardData.features || [];

              return (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  {/* Icon with EasyIcon - UPDATED */}
                  {icon && (
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 bg-blue-50">
                      <EasyIcon icon={icon} size={28} color="#3B82F6" />
                    </div>
                  )}

                  {/* Card Image (if provided) */}
                  {cardData.card_image && (
                    <div className="w-full h-48 rounded-xl mb-6 overflow-hidden">
                      <img
                        src={getFullImageUrl(cardData.card_image.url)}
                        alt={cardData.card_image.title || title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Title */}
                  <h4 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {title || "Card Title"}
                  </h4>

                  {/* Description */}
                  {description && (
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                      {description}
                    </p>
                  )}

                  {/* Price (for pricing cards) */}
                  {(cardData.price || cardData.price_period) && (
                    <div className="mb-6">
                      <span className="text-3xl font-bold text-gray-800">
                        {cardData.price}
                      </span>
                      {cardData.price_period && (
                        <span className="text-gray-600 ml-2">
                          {cardData.price_period}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Features List with EasyIcon check marks - UPDATED */}
                  {features && features.length > 0 && (
                    <ul className="space-y-3">
                      {features.map((feature: string, featureIdx: number) => (
                        <li key={featureIdx} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-green-100">
                            <EasyIcon
                              icon="FiCheck"
                              size={12}
                              color="#10B981"
                            />
                          </div>
                          <span className="text-gray-700 text-base leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Button with EasyIcon arrow - UPDATED */}
                  {cardData.button_text && cardData.button_url && (
                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <a
                        href={cardData.button_url}
                        className="inline-flex items-center gap-2 font-semibold text-blue-600 transition-all duration-300 hover:gap-3 group/btn"
                      >
                        {cardData.button_text}
                        <EasyIcon
                          icon="FiArrowRight"
                          size={16}
                          color="#3B82F6"
                        />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );

    case "dynamic_list":
      const dynamicListData = block.value || {};

      return (
        <div className="mb-16">
          {dynamicListData.heading && (
            <h3 className="text-4xl font-bold mb-4 text-gray-800">
              {dynamicListData.heading}
            </h3>
          )}
          {dynamicListData.description && (
            <p className="text-gray-600 mb-10 text-xl leading-relaxed">
              {dynamicListData.description}
            </p>
          )}
          <div className="space-y-8">
            {Array.isArray(dynamicListData.items) &&
              dynamicListData.items.map((item: any, idx: number) => {
                if (!item || typeof item !== "object") return null;

                const itemType = item.type || "";
                const itemValue = item.value || {};

                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    {itemType === "custom_item" && (
                      <>
                        {/* Icon for custom items with EasyIcon - UPDATED */}
                        {itemValue.icon && (
                          <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-blue-50">
                            <EasyIcon
                              icon={itemValue.icon}
                              size={24}
                              color="#3B82F6"
                            />
                          </div>
                        )}

                        <h4 className="text-3xl font-bold mb-4 text-gray-800">
                          {itemValue.title || "Untitled"}
                        </h4>

                        {/* Safely handle content - could be string or RichText */}
                        {itemValue.content && (
                          <div
                            className="prose prose-lg max-w-none mb-6 text-gray-700"
                            dangerouslySetInnerHTML={{
                              __html:
                                typeof itemValue.content === "string"
                                  ? itemValue.content
                                  : String(itemValue.content || ""),
                            }}
                          />
                        )}

                        {itemValue.image && itemValue.image.url && (
                          <img
                            src={getFullImageUrl(itemValue.image.url)}
                            alt={itemValue.image.title || "Content image"}
                            className="mt-6 rounded-xl w-full object-cover max-h-96 shadow-lg"
                          />
                        )}
                      </>
                    )}

                    {/* Add support for other item types */}
                    {itemType === "feature" && (
                      <>
                        {/* Icon with EasyIcon - UPDATED */}
                        {itemValue.icon && (
                          <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-blue-50">
                            <EasyIcon
                              icon={itemValue.icon}
                              size={24}
                              color="#3B82F6"
                            />
                          </div>
                        )}

                        <h4 className="text-3xl font-bold mb-4 text-gray-800">
                          {itemValue.title || "Feature"}
                        </h4>

                        {itemValue.description && (
                          <p className="text-gray-600 text-lg leading-relaxed">
                            {itemValue.description}
                          </p>
                        )}
                      </>
                    )}

                    {itemType === "benefit" && (
                      <>
                        {/* Icon with EasyIcon - UPDATED */}
                        {itemValue.icon && (
                          <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-green-50">
                            <EasyIcon
                              icon={itemValue.icon}
                              size={24}
                              color="#10B981"
                            />
                          </div>
                        )}

                        <h4 className="text-3xl font-bold mb-4 text-gray-800">
                          {itemValue.title || "Benefit"}
                        </h4>

                        {itemValue.description && (
                          <p className="text-gray-600 text-lg leading-relaxed">
                            {itemValue.description}
                          </p>
                        )}

                        {itemValue.stat && (
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-800">
                              {itemValue.stat}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default DynamicContentRenderer;

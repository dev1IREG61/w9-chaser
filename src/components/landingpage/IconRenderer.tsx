import React from "react";
import * as FiIcons from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as IoIcons from "react-icons/io5";

// Combine all icons into one object
const ALL_ICONS = {
  ...FiIcons,
  ...FaIcons,
  ...MdIcons,
  ...HiIcons,
  ...IoIcons,
};

interface EasyIconProps {
  icon: string; // Just pass the icon name like "FiStar" or "FaRocket"
  size?: number;
  color?: string;
  className?: string;
}

const EasyIcon: React.FC<EasyIconProps> = ({
  icon,
  size = 24,
  color,
  className = "",
}) => {
  // Find the icon component
  const IconComponent = ALL_ICONS[icon as keyof typeof ALL_ICONS];

  if (!IconComponent) {
    console.warn(`Icon "${icon}" not found. Using fallback.`);
    return (
      <FiIcons.FiHelpCircle size={size} color={color} className={className} />
    );
  }

  return <IconComponent size={size} color={color} className={className} />;
};

export default EasyIcon;

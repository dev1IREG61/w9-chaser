import React, { lazy, Suspense } from "react";

const iconMap: Record<string, () => Promise<any>> = {
  FiStar: () => import("react-icons/fi").then(m => ({ default: m.FiStar })),
  FiCheckCircle: () => import("react-icons/fi").then(m => ({ default: m.FiCheckCircle })),
  FiX: () => import("react-icons/fi").then(m => ({ default: m.FiX })),
  FiArrowRight: () => import("react-icons/fi").then(m => ({ default: m.FiArrowRight })),
  FiSmartphone: () => import("react-icons/fi").then(m => ({ default: m.FiSmartphone })),
  FiImage: () => import("react-icons/fi").then(m => ({ default: m.FiImage })),
  FiHelpCircle: () => import("react-icons/fi").then(m => ({ default: m.FiHelpCircle })),
  FiCheck: () => import("react-icons/fi").then(m => ({ default: m.FiCheck })),
  FiMail: () => import("react-icons/fi").then(m => ({ default: m.FiMail })),
  FiPhone: () => import("react-icons/fi").then(m => ({ default: m.FiPhone })),
  FiMapPin: () => import("react-icons/fi").then(m => ({ default: m.FiMapPin })),
  FiChevronDown: () => import("react-icons/fi").then(m => ({ default: m.FiChevronDown })),
  FiList: () => import("react-icons/fi").then(m => ({ default: m.FiList })),
  FiFolder: () => import("react-icons/fi").then(m => ({ default: m.FiFolder })),
  FiMinusSquare: () => import("react-icons/fi").then(m => ({ default: m.FiMinusSquare })),
  FiPlusSquare: () => import("react-icons/fi").then(m => ({ default: m.FiPlusSquare })),
  FiTag: () => import("react-icons/fi").then(m => ({ default: m.FiTag })),
  FiGift: () => import("react-icons/fi").then(m => ({ default: m.FiGift })),
  FiCreditCard: () => import("react-icons/fi").then(m => ({ default: m.FiCreditCard })),
  FiXCircle: () => import("react-icons/fi").then(m => ({ default: m.FiXCircle })),
  FiHeadphones: () => import("react-icons/fi").then(m => ({ default: m.FiHeadphones })),
};

interface EasyIconProps {
  icon: string;
  size?: number;
  color?: string;
  className?: string;
}

const EasyIcon: React.FC<EasyIconProps> = ({ icon, size = 24, color, className = "" }) => {
  const loader = iconMap[icon];
  
  if (!loader) {
    const FallbackIcon = () => <span style={{ width: size, height: size, display: "inline-block" }}>?</span>;
    return <FallbackIcon />;
  }

  const LazyIcon = lazy(loader);

  return (
    <Suspense fallback={<span style={{ width: size, height: size, display: "inline-block" }} />}>
      <LazyIcon size={size} color={color} className={className} />
    </Suspense>
  );
};

export default EasyIcon;

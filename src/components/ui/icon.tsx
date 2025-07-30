import iconData from "@/data/iconData";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: keyof typeof iconData;
  className?: string;
  size?: string | number;
  color?: string;
  strokeWidth?: number;
  onClick?: () => void;
}

export default function Icon({
  name,
  className = "",
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  onClick,
  ...rest
}: IconProps) {
  const IconComponent = iconData[name];
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found.`);
    return (
      <div
        className={`inline-flex items-center justify-center text-gray-400 ${className}`}
        style={{ width: size, height: size }}
        title={`Icon "${name}" not found`}
      >
        ?
      </div>
    );
  }

  const iconElement = (
    <IconComponent
      width={size}
      height={size}
      stroke={color}
      strokeWidth={strokeWidth}
      className={className}
      {...rest}
    />
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="inline-flex items-center justify-center rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        type="button"
      >
        {iconElement}
      </button>
    );
  }

  return iconElement;
}

Icon.getAvailableIcons = () => {
  return Object.keys(iconData).sort();
};

Icon.hasIcon = (name: keyof typeof iconData) => {
  return Object.prototype.hasOwnProperty.call(iconData, name);
};

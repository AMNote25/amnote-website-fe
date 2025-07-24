import iconRegistry from '@/data/iconData';

import type { MouseEventHandler } from 'react';

type IconRegistryType = typeof iconRegistry;
type IconName = keyof IconRegistryType;

interface IconHolderProps {
  name: IconName;
  size?: number;
  className?: string;
  color?: string;
  strokeWidth?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  [key: string]: any;
}

function IconHolder({ 
  name, 
  size = 20, 
  className = "", 
  color = "currentColor",
  strokeWidth = 2,
  onClick,
  ...props 
}: IconHolderProps) {
  const IconComponent = iconRegistry[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in registry`);
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
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      {...props} 
    />
  );

  return iconElement;
}

// Helper function to get all available icon names
IconHolder.getAvailableIcons = (): IconName[] => {
  return Object.keys(iconRegistry).sort() as IconName[];
};

// Helper function to check if an icon exists
IconHolder.hasIcon = (name: string): name is IconName => {
  return Object.prototype.hasOwnProperty.call(iconRegistry, name);
};

export default IconHolder;

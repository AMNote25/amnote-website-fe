import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { getIconComponent } from '../../../lib/icon-utils';
import type { MenuItemLv2Props } from '../../../types';

const MenuItemLv2: React.FC<MenuItemLv2Props> = ({
  title,
  iconName = "circle",
  onClick,
  isActive = false,
  children,
  forceExpanded,
  isManuallyExpanded = false,
  onManualExpansion
}) => {
  const hasChildren = children != null;
  const isExpanded = forceExpanded !== undefined ? forceExpanded : isManuallyExpanded;
  
  // Get icon component from iconName
  const IconComponent = getIconComponent(iconName);

  const handleClick = () => {
    if (hasChildren && onManualExpansion) {
      onManualExpansion(!isExpanded);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          "flex items-center justify-between w-full px-6 py-2.5 text-left text-sm cursor-pointer",
          "hover:bg-gray-100 transition-colors duration-150",
          "border-l-2 border-transparent hover:border-blue-300",
          isActive && "bg-blue-50 border-blue-500",
          isExpanded && hasChildren && "bg-gray-100"
        )}
        onClick={handleClick}
      >
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <IconComponent className="h-4 w-4 text-gray-500 flex-shrink-0" />
          <span className={cn("truncate", isActive ? "text-blue-700 font-medium" : "text-gray-700")}>
            {title}
          </span>
        </div>
        
        {hasChildren && (
          <div className="flex-shrink-0 ml-2">
            {isExpanded ? (
              <ChevronDown className="h-3 w-3 text-gray-400" />
            ) : (
              <ChevronRight className="h-3 w-3 text-gray-400" />
            )}
          </div>
        )}
      </div>
      
      {hasChildren && isExpanded && (
        <div className="bg-gray-50 border-l-2 border-gray-300 ml-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default MenuItemLv2;

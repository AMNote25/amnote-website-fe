import React from 'react';
import { cn } from '../../../lib/utils';
import { getIconComponent } from '../../../lib/icon-utils';
import type { MenuItemLv3Props } from '../../../types';

const MenuItemLv3: React.FC<MenuItemLv3Props> = ({
  title,
  iconName = "circle",
  onClick,
  isActive = false
}) => {
  // Get icon component from iconName
  const IconComponent = getIconComponent(iconName);

  return (
    <div
      className={cn(
        "flex items-center w-full px-8 py-2 text-left text-sm cursor-pointer",
        "hover:bg-gray-200 transition-colors duration-150",
        "border-l-2 border-transparent hover:border-blue-400",
        isActive && "bg-blue-50 border-blue-500"
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center space-x-3 min-w-0 flex-1">
        <IconComponent className="h-3 w-3 text-gray-400 flex-shrink-0" />
        <span className={cn("truncate text-xs", isActive ? "text-blue-700 font-medium" : "text-gray-600")}>
          {title}
        </span>
      </div>
    </div>
  );
};

export default MenuItemLv3;

import React from 'react';
import { cn } from '../../../lib/utils';
import type { MenuItemLv1Props } from '../../../types';

const MenuItemLv1: React.FC<MenuItemLv1Props> = ({
  title,
  children
}) => {
  const hasChildren = children != null;

  return (
    <div className="w-full">
      <div
        className={cn(
          "flex items-center justify-between w-full px-4 py-3 text-left text-sm font-medium",
          "bg-gray-50 border-b border-gray-200"
        )}
      >
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <span className="text-gray-900 font-semibold truncate">
            {title}
          </span>
        </div>
      </div>
      
      {hasChildren && (
        <div className="bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

export default MenuItemLv1;

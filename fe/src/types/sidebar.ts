import type { LucideIcon } from 'lucide-react';
import type { ReactElement } from 'react';

// Core menu interfaces
export interface MenuItem {
  id: string;
  title: string;
  type: 'item' | 'expandable' | 'section';
  iconName?: string;
  icon?: LucideIcon;
  children?: MenuItem[];
  level?: number;
  isExpanded?: boolean;
  isManuallyExpanded?: boolean;
  forceExpanded?: boolean;
  parent?: {
    id: string;
    label: string;
    iconName?: string;
  };
  section?: string;
}

export interface MenuSection {
  id: string;
  title: string;
  type?: string;
  children?: MenuItem[];
}

export interface HeaderMenu {
  id: string;
  label: string;
  iconName?: string;
  parent: {
    id: string;
    label: string;
    iconName?: string;
  } | null;
  children: MenuItem[] | null;
  type: string;
}

// Component prop interfaces
export interface MenuItemLv1Props {
  title: string;
  children?: React.ReactNode;
}

export interface MenuItemLv2Props {
  title: string | ReactElement;
  iconName?: string;
  onClick?: () => void;
  isActive?: boolean;
  children?: React.ReactNode;
  forceExpanded?: boolean;
  isManuallyExpanded?: boolean;
  onManualExpansion?: (isExpanded: boolean) => void;
}

export interface MenuItemLv3Props {
  title: string | ReactElement;
  iconName?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export interface NavigationColumnProps {
  onMenuChange?: (menu: MenuItem) => void;
  searchQuery?: string;
}

export interface SidebarLayoutProps {
  onMenuChange: (menu: MenuItem | null) => void;
  className?: string;
}

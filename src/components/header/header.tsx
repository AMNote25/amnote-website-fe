import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Icon from "../ui/icon";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Language from "./language";
import Profile from "./profile";
import Notification from "./notification";
import iconData from "@/data/iconData";
import { menuData } from "@/data/menuData";

interface MenuDataItem {
  id: string;
  title: string;
  iconName?: string;
  type: "item" | "expandable" | "section";
  link?: string;
  children?: MenuDataItem[];
}

interface MenuDataSection {
  id: string;
  title: string;
  type: "section";
  children?: MenuDataItem[];
}

interface MenuItem {
  id: string;
  title: string;
  label: string;
  type: "item" | "expandable";
  iconName?: string;
  children?: MenuItem[];
  forceExpanded?: boolean;
  isManuallyExpanded?: boolean;
  link?: string;
}

interface PageItem extends MenuItem {
  parent?: MenuItem;
  activeChild?: MenuItem;
}

interface BreadcrumbData {
  current: MenuDataItem;
  parent?: MenuDataItem;
  section?: MenuDataSection;
}

export default function Header({ currentPage = null }: { currentPage?: PageItem | null }) {
  const pathname = usePathname();
  const [displayMenu, setDisplayMenu] = useState<BreadcrumbData | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Function to find menu item by URL path
  const findMenuItemByPath = (path: string): BreadcrumbData | null => {
    for (const section of menuData as MenuDataSection[]) {
      if (section.children) {
        for (const item of section.children) {
          // Check direct item match
          if (item.link === path) {
            return {
              current: item,
              section: section
            };
          }
          
          // Check children if item is expandable
          if (item.children) {
            for (const child of item.children) {
              if (child.link === path) {
                return {
                  current: child,
                  parent: item,
                  section: section
                };
              }
            }
          }
        }
      }
    }
    return null;
  };

  useEffect(() => {
    const newMenu = findMenuItemByPath(pathname);
    if (JSON.stringify(newMenu) !== JSON.stringify(displayMenu)) {
      setIsAnimating(true);
      
      // After fade out, update content and fade in
      setTimeout(() => {
        setDisplayMenu(newMenu);
        setIsAnimating(false);
      }, 150); // Half of the transition duration
    }
  }, [pathname, displayMenu]);

  const getMenuIcon = () => {
    if (!displayMenu) {
      return "layout-dashboard";
    }
    
    // Use parent icon if available (for child items)
    if (displayMenu.parent && displayMenu.parent.iconName) {
      return displayMenu.parent.iconName;
    }

    // Use current item icon
    if (displayMenu.current.iconName) {
      return displayMenu.current.iconName;
    }
    
    return "layout-dashboard";
  };

  const renderBreadcrumb = () => {
    if (!displayMenu) {
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm font-semibold text-primary max-w-[200px] truncate">
                <span className="hidden sm:inline">Bảng điều khiển</span>
                <span className="sm:hidden">...</span>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
    }

    // If menu has parent (child item), show breadcrumb: Parent > Current
    if (displayMenu.parent) {
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden sm:block">
              <BreadcrumbLink className="text-sm font-semibold transition-colors text-secondary hover:text-primary max-w-[120px] truncate">
                {displayMenu.parent.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden sm:block" />
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-primary max-w-[120px] sm:max-w-[200px] truncate">
                  <span className="hidden sm:inline">{displayMenu.current.title}</span>
                  <span className="sm:hidden">...</span>
                </span>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
    }

    // Default: show as single item (top-level menu item)
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-sm font-semibold text-primary max-w-[200px] truncate">
              <span className="hidden sm:inline">{displayMenu.current.title}</span>
              <span className="sm:hidden">...</span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  };

  return (
    <header className="px-4 sm:px-6 py-3 transition-colors duration-300 border-b rounded-2xl header-bg header-border header-shadow">
      <div className="flex items-center justify-between w-full gap-2 sm:gap-4">
        <div className="flex items-center flex-1 min-w-0 mr-2 sm:mr-4">
          <div className={`transition-all duration-300 ease-in-out flex-shrink-0 ${
            isAnimating ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
          }`}>
            <Icon 
              name={getMenuIcon() as keyof typeof iconData} 
              size={20} 
              className="mr-2 sm:mr-3 text-secondary sm:w-6 sm:h-6"
            />
          </div>
          <div className={`transition-all duration-300 ease-in-out min-w-0 flex-1 ${
            isAnimating ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
          }`}>
            {renderBreadcrumb()}
          </div>
        </div>
        <div className="flex items-center flex-shrink-0 gap-2 sm:gap-3 md:gap-6">
          <Notification />
          <Language />
          <Profile />
        </div>
      </div>
    </header>
  );
}

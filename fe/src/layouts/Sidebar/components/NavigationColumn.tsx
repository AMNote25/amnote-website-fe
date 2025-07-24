import {
  useState,
  useMemo,
  useRef,
  useCallback,
  type ReactElement,
} from "react";
import MenuItemLv1 from "./MenuItemLv1";
import MenuItemLv2 from "./MenuItemLv2";
import MenuItemLv3 from "./MenuItemLv3";
import { menuData } from "../../../data/menuData";
import type { MenuItem, MenuSection, NavigationColumnProps } from "../../../types";

// Type cast the imported menuData to match our interface
const typedMenuData = menuData as MenuSection[];

const NavigationColumn: React.FC<NavigationColumnProps> = ({
  onMenuChange,
  searchQuery = "",
}) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const manuallyExpandedItems = useRef<Set<string>>(new Set());

  const normalizeText = useCallback((text: string): string => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");
  }, []);

  const handleManualExpansion = useCallback((itemId: string, isExpanded: boolean): void => {
    if (isExpanded) manuallyExpandedItems.current.add(itemId);
    else manuallyExpandedItems.current.delete(itemId);
  }, []);

  const filteredMenuData = useMemo((): MenuSection[] => {
    if (!searchQuery.trim()) {
      return typedMenuData.map(section => ({
        ...section,
        children: section.children?.map((item: MenuItem) => ({
          ...item,
          isManuallyExpanded: manuallyExpandedItems.current.has(item.id),
          forceExpanded: undefined,
        })),
      }));
    }

    const normalizedQuery = normalizeText(searchQuery);

    return typedMenuData.map(section => {
      const filteredChildren = section.children?.filter((item: MenuItem) => {
        const itemMatches = normalizeText(item.title).includes(normalizedQuery);
        const childMatches = item.children?.some((child: MenuItem) =>
          normalizeText(child.title).includes(normalizedQuery)
        );
        return itemMatches || childMatches;
      }).map((item: MenuItem) => {
        if (item.type === "expandable" && item.children) {
          const filteredSubChildren = item.children.filter((child: MenuItem) =>
            normalizeText(child.title).includes(normalizedQuery)
          );

          const itemMatches = normalizeText(item.title).includes(normalizedQuery);
          const hasMatchingChildren = filteredSubChildren.length > 0;

          return {
            ...item,
            children: itemMatches ? item.children : filteredSubChildren,
            forceExpanded: hasMatchingChildren,
            isManuallyExpanded: manuallyExpandedItems.current.has(item.id),
          };
        }
        return {
          ...item,
          isManuallyExpanded: manuallyExpandedItems.current.has(item.id),
        };
      });

      if (filteredChildren && filteredChildren.length > 0) {
        return {
          ...section,
          children: filteredChildren,
        };
      }
      return null;
    }).filter((section) => section !== null) as MenuSection[];
  }, [searchQuery, normalizeText]);

  const highlightText = useCallback((text: string, query: string): ReactElement | string => {
    if (!text || !query.trim()) return text;

    const normalizedText = normalizeText(text);
    const normalizedQuery = normalizeText(query.trim());
    const index = normalizedText.indexOf(normalizedQuery);
    if (index === -1) return text;

    const beforeMatch = text.substring(0, index);
    const match = text.substring(index, index + query.length);
    const afterMatch = text.substring(index + query.length);

    return (
      <>
        {beforeMatch}
        <span className="bg-yellow-200 text-yellow-800 rounded px-0.5 font-medium">
          {match}
        </span>
        {afterMatch}
      </>
    );
  }, [normalizeText]);

  const findMenuItemById = useCallback((id: string, data: MenuSection[] = typedMenuData): MenuItem | null => {
    for (const section of data) {
      if (section.children) {
        for (const item of section.children) {
          if (item.id === id) {
            return {
              ...item,
              section: section.title,
            };
          }
          if (item.children) {
            for (const child of item.children) {
              if (child.id === id) {
                return {
                  ...child,
                  parent: { id: item.id, label: item.title, iconName: item.iconName },
                  section: section.title,
                };
              }
            }
          }
        }
      }
    }
    return null;
  }, []);

  const handleItemClick = useCallback((itemId: string): void => {
    setActiveItem(itemId);
    const menuItem = findMenuItemById(itemId);
    if (menuItem && onMenuChange) {
      onMenuChange(menuItem);
    }
  }, [findMenuItemById, onMenuChange]);

  const renderMenuItem = useCallback((item: MenuItem): ReactElement | null => {
    if (!item || !item.type) return null;

    switch (item.type) {
      case "item":
        return (
          <MenuItemLv2
            key={item.id}
            title={highlightText(item.title, searchQuery)}
            iconName={item.iconName || "circle"}
            onClick={() => handleItemClick(item.id)}
            isActive={activeItem === item.id}
          />
        );

      case "expandable":
        return (
          <MenuItemLv2
            key={item.id}
            title={highlightText(item.title, searchQuery)}
            iconName={item.iconName || "circle"}
            forceExpanded={searchQuery.trim() ? item.forceExpanded || false : undefined}
            isManuallyExpanded={item.isManuallyExpanded}
            onManualExpansion={(isExpanded: boolean) => handleManualExpansion(item.id, isExpanded)}
          >
            {item.children?.map((child: MenuItem) => (
              <MenuItemLv3
                key={child.id}
                title={highlightText(child.title, searchQuery)}
                onClick={() => handleItemClick(child.id)}
                isActive={activeItem === child.id}
              />
            ))}
          </MenuItemLv2>
        );

      default:
        console.warn(`Unknown menu item type: ${item.type}`);
        return null;
    }
  }, [searchQuery, activeItem, highlightText, handleItemClick, handleManualExpansion]);

  return (
    <div className="scrollbar-hover flex flex-col items-start gap-2.5 w-full max-w-2xs h-full bg-white">
      {searchQuery.trim() && filteredMenuData.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full py-8 text-gray-500">
          <div className="text-sm font-medium">Không tìm thấy kết quả</div>
          <div className="px-4 mt-1 text-xs text-center">
            Thử tìm kiếm với từ khóa khác hoặc kiểm tra chính tả
          </div>
        </div>
      ) : (
        filteredMenuData.map(section => (
          <MenuItemLv1 key={section.id} title={section.title}>
            {section.children?.map(renderMenuItem)}
          </MenuItemLv1>
        ))
      )}
    </div>
  );
};

export default NavigationColumn;

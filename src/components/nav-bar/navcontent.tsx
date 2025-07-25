import { useState, useMemo, useCallback } from "react";
import { MenuItemLv1, MenuItemLv2, MenuItemLv3 } from "./navitem";
import { menuData } from "@/data/menuData";

interface NavContentProps {
  onMenuChange?: (menu: any) => void;
  searchQuery?: string;
}

interface MenuItem {
  id: string;
  title: string;
  type: "item" | "expandable";
  iconName?: string;
  children?: MenuItem[];
  forceExpanded?: boolean;
  isManuallyExpanded?: boolean;
}

interface MenuSection {
  id: string;
  title: string;
  children?: MenuItem[];
}

export default function NavContent({ onMenuChange, searchQuery = "" }: NavContentProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [manuallyExpandedItems, setManuallyExpandedItems] = useState<Set<string>>(new Set());

  const normalizeText = useCallback((text: string): string => {
    if (!text || typeof text !== "string") return "";
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }, []);

  const handleManualExpansion = useCallback((itemId: string, isExpanded: boolean) => {
    setManuallyExpandedItems(prev => {
      const next = new Set(prev);
      if (isExpanded) {
        next.add(itemId);
      } else {
        next.delete(itemId);
      }
      return next;
    });
  }, []);

  const filteredMenuData: MenuSection[] = useMemo(() => {
    if (!searchQuery.trim()) {
      return menuData.map((section: any) => ({
        ...section,
        children: section.children?.map((item: any) => ({
          ...item,
          isManuallyExpanded: manuallyExpandedItems.has(item.id),
          forceExpanded: undefined,
        })),
      }));
    }

    const normalizedQuery = normalizeText(searchQuery);

    return menuData
      .map((section: any) => {
        const filteredChildren = section.children
          ?.filter((item: any) => {
            const itemMatches = normalizeText(item.title).includes(normalizedQuery);
            const childMatches = item.children?.some((child: any) =>
              normalizeText(child.title).includes(normalizedQuery)
            );
            return itemMatches || childMatches;
          })
          .map((item: any) => {
            if (item.type === "expandable" && item.children) {
              const filteredSubChildren = item.children.filter((child: any) =>
                normalizeText(child.title).includes(normalizedQuery)
              );
              const itemMatches = normalizeText(item.title).includes(normalizedQuery);
              const hasMatchingChildren = filteredSubChildren.length > 0;
              return {
                ...item,
                children: itemMatches ? item.children : filteredSubChildren,
                forceExpanded: hasMatchingChildren,
                isManuallyExpanded: manuallyExpandedItems.has(item.id),
              };
            }
            return {
              ...item,
              isManuallyExpanded: manuallyExpandedItems.has(item.id),
            };
          });

        if (filteredChildren && filteredChildren.length > 0) {
          return {
            ...section,
            children: filteredChildren,
          };
        }
        return null;
      })
      .filter((section: any): section is MenuSection => section !== null);
  }, [searchQuery, normalizeText, manuallyExpandedItems]);

  const highlightText = useCallback(
    (text: string, query: string) => {
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
    },
    [normalizeText]
  );

  const findMenuItemById = useCallback((id: string, data: any[] = menuData) => {
    for (const section of data) {
      if (section.children) {
        for (const item of section.children) {
          if (item.id === id) {
            return { ...item, section: section.title };
          }
          if (item.children) {
            for (const child of item.children) {
              if (child.id === id) {
                return {
                  ...child,
                  parent: { id: item.id, label: item.title },
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

  const handleItemClick = useCallback(
    (itemId: string) => {
      setActiveItem(itemId);
      const menuItem = findMenuItemById(itemId);
      if (menuItem && onMenuChange) {
        const headerMenu = {
          id: menuItem.id,
          label: menuItem.title,
          iconName: menuItem.iconName,
          parent: menuItem.parent
            ? {
                ...menuItem.parent,
                iconName: findMenuItemById(menuItem.parent.id)?.iconName,
              }
            : null,
          children: menuItem.children || null,
          type: menuItem.type,
        };
        onMenuChange(headerMenu);
      }
    },
    [findMenuItemById, onMenuChange]
  );

  const renderMenuItem = useCallback(
    (item: MenuItem) => {
      if (!item || !item.type) return null;

      switch (item.type) {
        case "item":
          return (
            <MenuItemLv2
              key={item.id}
              label={highlightText(item.title, searchQuery)}
              iconName={item.iconName}
              onClick={() => handleItemClick(item.id)}
              isActive={activeItem === item.id}
            />
          );

        case "expandable":
          return (
            <MenuItemLv2
              key={item.id}
              label={highlightText(item.title, searchQuery)}
              iconName={item.iconName}
              forceExpanded={searchQuery.trim() ? item.forceExpanded || false : undefined}
              isManuallyExpanded={item.isManuallyExpanded}
              onManualExpansion={isExpanded => handleManualExpansion(item.id, isExpanded)}
            >
              {item.children?.map(child => (
                <MenuItemLv3
                  key={child.id}
                  label={highlightText(child.title, searchQuery)}
                  onClick={() => handleItemClick(child.id)}
                  isActive={activeItem === child.id}
                />
              ))}
            </MenuItemLv2>
          );

        default:
          return null;
      }
    },
    [searchQuery, activeItem, highlightText, handleItemClick, handleManualExpansion]
  );

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
          <MenuItemLv1 key={section.id} label={section.title}>
            {section.children?.map(renderMenuItem)}
          </MenuItemLv1>
        ))
      )}
    </div>
  );
}

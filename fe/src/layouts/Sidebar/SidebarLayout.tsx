import { useState, useCallback } from "react";
import { Sidebar, SidebarContent, SidebarHeader } from "../../components/ui/sidebar";
import { ScrollArea } from "../../components/ui/scroll-area";
import NavigationColumn from "./components/NavigationColumn";
import type { SidebarLayoutProps, MenuItem } from "../../types";
import SearchBar from "../../components/ui/searchbar";
import logoSrc from "../../assets/AMnote_logo.svg";

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  onMenuChange,
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleSearchChange = useCallback((query: string): void => {
    if (typeof query === "string") {
      setSearchQuery(query);
    }
  }, []);

  /**
   * Handle search clear action
   * Resets search query to empty state
   */
  const handleSearchClear = useCallback((): void => {
    setSearchQuery("");
  }, []);

  /**
   * Handle menu change with type safety
   * @param menu - Selected menu item
   */
  const handleMenuChangeWrapper = useCallback(
    (menu: MenuItem): void => {
      onMenuChange(menu);
    },
    [onMenuChange]
  );

  return (
    <Sidebar className={className}>
      {/* Header Section with Logo */}
      <SidebarHeader className="">
        <div className="flex flex-row items-center justify-center w-full h-24 bg-white">
          <img
            src={logoSrc}
            alt="AMnote Logo"
            className="object-contain w-full h-30"
          />
        </div>
      </SidebarHeader>

        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onClear={handleSearchClear}
          onSearch={handleSearchChange}
          placeholder="Tìm kiếm menu..."
          maxLength={50} // Reasonable limit for search queries
        />
        <ScrollArea className="h-full">
          <SidebarContent className="p-2">
            <NavigationColumn
              onMenuChange={handleMenuChangeWrapper}
              searchQuery={searchQuery}
            />
          </SidebarContent>
        </ScrollArea>
    </Sidebar>
  );
};

export default SidebarLayout;

import { useState, useCallback } from "react";
import NavContent from "./navcontent";
import SearchBar from "../ui/search-bar";
import { ScrollArea } from "../ui/scroll-area";

interface SidebarLayoutProps {
  onMenuChange?: (menu: any) => void;
}

export default function NavBar({ onMenuChange }: SidebarLayoutProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = useCallback((query: string) => {
    // Input validation
    if (typeof query === 'string') {
      setSearchQuery(query);
    }
  }, []);
  const handleSearchClear = useCallback(() => {
    setSearchQuery("");
  }, []);

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="text-xl font-bold text-gray-800">AMnote</div>
      </div>
      
      <div className="p-3 border-b border-gray-200">
        <SearchBar 
          value={searchQuery}
          onChange={handleSearchChange}
          onClear={handleSearchClear}
          placeholder="Tìm kiếm menu..."
          maxLength={50} 
        />
      </div>
      <div className="flex-1 overflow-auto">
        <ScrollArea className="h-full">
          <div className="p-2">
            <NavContent 
              onMenuChange={onMenuChange} 
              searchQuery={searchQuery}
            />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}


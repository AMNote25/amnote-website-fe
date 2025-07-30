import { useState, useCallback } from "react";
import NavContent from "./navcontent";
import SearchBar from "../ui/search-bar";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import Logo from "./logo";

interface SidebarLayoutProps {
  onMenuChange?: (menu: any) => void;
}

export default function NavBar({ onMenuChange }: SidebarLayoutProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = useCallback((query: string) => {
    // Input validation
    if (typeof query === "string") {
      setSearchQuery(query);
    }
  }, []);
  const handleSearchClear = useCallback(() => {
    setSearchQuery("");
  }, []);

  return (
    <div className="text-card-foreground border shadow-sm flex flex-col items-start w-full h-full p-6 gap-6 bg-sidebar max-w-2xs rounded-2xl">
      <div className="w-full flex items-center justify-between">
        <Logo className="w-full h-30" />
      </div>
      <Separator className="w-full" />
      <div className="flex items-center w-full justify-center">
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onClear={handleSearchClear}
          placeholder="Tìm kiếm menu..."
          maxLength={50}
        />
      </div>
      <Separator className="w-full" />

      <div className="flex-1 overflow-auto w-full">
        <ScrollArea className="h-full w-full">
          <NavContent onMenuChange={onMenuChange} searchQuery={searchQuery} />
        </ScrollArea>
      </div>
    </div>
  );
}

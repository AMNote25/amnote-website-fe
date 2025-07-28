import { useState, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  maxLength?: number;
  debounceMs?: number;
}

export default function SearchBar({
  placeholder = "",
  onSearch,
  value = "",
  onChange,
  onClear,
  maxLength = 100, 
  debounceMs = 0,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState(value);

  // Sync with external value prop
  useEffect(() => {
    setSearchValue(value || "");
  }, [value]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Basic input validation
    if (newValue.length > maxLength) {
      return; // Prevent input beyond max length
    }
    
    setSearchValue(newValue);
    
    // Notify parent component
    if (onChange) {
      onChange(newValue);
    }
  }, [onChange, maxLength]);

  /**
   * Handle form submission (Enter key)
   * @param {Event} e - Form submit event
   */
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Call onSearch callback if provided
    if (onSearch) {
      onSearch(searchValue.trim());
    }
  }, [onSearch, searchValue]);

  const handleClear = useCallback(() => {
    setSearchValue("");

    if (onClear) {
      onClear();
    }
    if (onChange) {
      onChange("");
    }
  }, [onClear, onChange]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    // Clear on Escape key
    if (e.key === 'Escape' && searchValue) {
      handleClear();
    }
  }, [searchValue, handleClear]);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute z-10 transform -translate-y-1/2 left-3 top-1/2">
          <Search
            size={18}
            className={cn(
              "transition-colors duration-200",
              isFocused ? "text-am-red" : "text-gray-400"
            )}
          />
        </div>
        <Input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          maxLength={maxLength}
          className={cn(
            "pl-10 py-2 w-full shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.1)] transition-colors duration-200",
            searchValue ? "pr-10" : "pr-3",
            isFocused ? "border-primary ring-primary ring-1" : "border-gray-100"
          )}
          aria-label="Search menu items"
        />
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute z-10 transform -translate-y-1/2 right-3 top-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Clear search"
          >
            <X name="x" size={16} />
          </button>
        )}
      </div>
    </form>
  );
}


import { useState, useEffect, useCallback } from "react";
import { Search, X} from "lucide-react";
import { Input } from "./input";
import { cn } from "../../lib/utils";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  maxLength?: number;
  debounceMs?: number;
}

function SearchBar({
  placeholder = "Tìm kiếm menu...",
  onSearch,
  value = "",
  onChange,
  onClear,
  maxLength = 100, // Prevent excessive input
  debounceMs = 0, // Optional debouncing (set to > 0 if needed)
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState(value);

  // Sync with external value prop
  useEffect(() => {
    setSearchValue(value || "");
  }, [value]);

  /**
   * Handle input value changes with validation
   * @param {Event} e - Input change event
   */
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
   * @param {React.FormEvent<HTMLFormElement>} e - Form submit event
   */
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Call onSearch callback if provided
    if (onSearch) {
      onSearch(searchValue.trim());
    }
  }, [onSearch, searchValue]);

  /**
   * Handle clear button click
   * Resets search value and notifies parent
   */
  const handleClear = useCallback(() => {
    setSearchValue("");
    
    // Notify parent components
    if (onClear) {
      onClear();
    }
    if (onChange) {
      onChange("");
    }
  }, [onClear, onChange]);

  /**
   * Handle input focus events
   */
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  /**
   * Handle input blur events
   */
  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  /**
   * Handle keyboard shortcuts
   * @param {KeyboardEvent} e - Keyboard event
   */
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
              isFocused ? "text-[#B71D21]" : "text-gray-400"
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
            isFocused ? "border-[#B71D21] ring-[#B71D21] ring-1" : "border-gray-100"
          )}
          aria-label="Search menu items"
        />
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute z-10 p-1 text-gray-400 transition-colors duration-200 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X size={16}/>
          </button>
        )}
      </div>
    </form>
  );
}

export default SearchBar;

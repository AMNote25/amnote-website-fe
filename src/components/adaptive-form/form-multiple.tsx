import { Label } from "@/components/ui/label";
import { Sparkle } from "lucide-react";

interface FMultipleProps {
  accessorKey: string;
  label: string;
  value?: string[]; // Array of selected values
  onChange: (key: string, value: string[]) => void; // Callback when selection changes
  variant?: "optional" | "compulsory"; // "optional" or "compulsory"
  options: Array<{ value: string; label?: string; description?: string }>; // Array of options
  className?: string; // Additional class names for styling
  direction?: "vertical" | "horizontal"; // Layout direction
  maxSelections?: number | null; // Optional limit on number of selections
}

interface MultipleOption {
  value: string;
  label?: string;
  description?: string;
}

function FMultiple({
  accessorKey,
  label,
  value = [], // Array of selected values
  onChange,
  variant = "optional", // "optional" or "compulsory"
  options = [], // Array of { value, label, description } objects
  className = "",
  direction = "vertical", // "vertical" or "horizontal"
  maxSelections = null, // Optional limit on number of selections
}: FMultipleProps) {
  const handleOptionChange = (optionValue: string, isChecked: boolean) => {
    let newValue = [...(value || [])];

    if (isChecked) {
      // Add to selection if not already present and within max limit
      if (!newValue.includes(optionValue)) {
        if (maxSelections === null || newValue.length < maxSelections) {
          newValue.push(optionValue);
        }
      }
    } else {
      // Remove from selection
      newValue = newValue.filter((val) => val !== optionValue);
    }

    onChange(accessorKey, newValue);
  };

  const isOptionChecked = (optionValue: string) => {
    return (value || []).includes(optionValue);
  };

  const isMaxReached =
    maxSelections !== null && (value || []).length >= maxSelections;

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-1 text-sm font-medium text-primary">
          {label}
          {variant === "compulsory" && (
            <Sparkle className="w-3 h-3 text-red-500" />
          )}
        </Label>
        {maxSelections && (
          <span className="text-xs text-gray-500">
            {(value || []).length}/{maxSelections} selected
          </span>
        )}
      </div>

      <div
        className={`space-y-3 ${
          direction === "horizontal" ? "flex flex-wrap gap-4 space-y-0" : ""
        }`}
      >
        {options.map((option, index) => {
          const isChecked = isOptionChecked(option.value);
          const isDisabled = !isChecked && isMaxReached;

          return (
            <div
              key={option.value || index}
              className="flex items-start space-x-3"
            >
              <div className="flex items-center h-5">
                <input
                  id={`${accessorKey}-${option.value || index}`}
                  name={`${accessorKey}[]`}
                  type="checkbox"
                  value={option.value}
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={(e) =>
                    handleOptionChange(option.value, e.target.checked)
                  }
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div className="flex-1 min-w-0">
                <label
                  htmlFor={`${accessorKey}-${option.value || index}`}
                  className={`text-sm font-medium cursor-pointer ${
                    isDisabled ? "text-gray-400" : "text-gray-900"
                  }`}
                >
                  {option.label || option.value}
                </label>
                {option.description && (
                  <p
                    className={`text-sm mt-1 ${
                      isDisabled ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {option.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {(value || []).length > 0 && (
        <div className="mt-2 p-2 bg-gray-50 rounded-md">
          <p className="text-xs text-gray-600 mb-1">Selected:</p>
          <div className="flex flex-wrap gap-1">
            {(value || []).map((selectedValue, index) => {
              const selectedOption = options.find(
                (opt) => opt.value === selectedValue
              );
              return (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                >
                  {selectedOption?.label || selectedValue}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default FMultiple;

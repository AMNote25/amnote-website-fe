import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Sparkle } from "lucide-react";

interface FSelectProps {
  accessorKey: string;
  label: string;
  value: string;
  onChange: (key: string, value: string) => void;
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
  variant?: "optional" | "compulsory"; // "optional" or "compulsory"
  className?: string; // Additional class names for styling
}

function FSelect({
  accessorKey,
  label,
  value,
  onChange,
  options = [],
  placeholder,
  variant = "optional", // "optional" or "compulsory"
  className = "",
} : FSelectProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label
        htmlFor={accessorKey}
        className="text-sm font-medium text-primary flex items-center gap-1"
      >
        {label}
        {variant === "compulsory" && (
          <Sparkle className="w-3 h-3 text-red-500" />
        )}
      </Label>
      <Select value={value} onValueChange={(val) => onChange(accessorKey, val)}>
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={placeholder || `Select ${label.toLowerCase()}`}
          />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default FSelect;

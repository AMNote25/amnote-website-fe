import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sparkle } from "lucide-react";

interface FSwitchProps {
  accessorKey: string;
  label: string;
  value: boolean | string; // Accepts boolean or string representation of boolean
  onChange: (key: string, value: boolean | string) => void; // Callback when switch is toggled
  variant?: "optional" | "compulsory"; // "optional" or "compulsory"
  className?: string; // Additional class names for styling
}

function FSwitch({ 
  accessorKey, 
  label, 
  value, 
  onChange, 
  variant = "optional", // "optional" or "compulsory"
  className = ""
}: FSwitchProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center space-x-2">
        <Switch
          id={accessorKey}
          checked={value === true || value === 'true'}
          onCheckedChange={(checked) => onChange(accessorKey, checked)}
        />
        <Label htmlFor={accessorKey} className="text-sm font-medium text-primary flex items-center gap-1">
          {label}
          {variant === "compulsory" && (
            <Sparkle className="w-3 h-3 text-red-500" />
          )}
        </Label>
      </div>
    </div>
  );
}

export default FSwitch;

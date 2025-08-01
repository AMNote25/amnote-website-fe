import { cn } from "@/lib/utils";
import { useState, useEffect, useRef, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Icon from "../ui/icon";
import iconData from "@/data/iconData";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ✅ Level 1 Props
interface MenuItemLv1Props {
  label?: string;
  children?: ReactNode;
  className?: string;
}

// ✅ Level 2 Props
interface MenuItemLv2Props {
  label?: ReactNode;
  iconName?: string;
  children?: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  forceExpanded?: boolean;
  isManuallyExpanded?: boolean;
  onManualExpansion?: (isExpanded: boolean) => void;
  className?: string;
  link?: string;
  [key: string]: any;
}

// ✅ Level 3 Props
interface MenuItemLv3Props {
  label?: React.ReactNode;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
  link?: string;
}

function MenuItemLv1({
  label,
  children,
  className,
  ...props
}: MenuItemLv1Props) {
  return (
    <div className={cn("w-full mb-3", className)} {...props}>
      <h3 className="px-2 mb-3 text-sm font-semibold tracking-wider text-gray-500">
        {label}
      </h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function MenuItemLv2({
  label,
  iconName,
  children,
  isActive = false,
  onClick,
  forceExpanded = undefined,
  isManuallyExpanded = false,
  onManualExpansion,
  className,
  link,
  ...props
}: MenuItemLv2Props) {
  const [isExpanded, setIsExpanded] = useState(isManuallyExpanded);
  const hasChildren = !!children;
  const wasForceExpanded = useRef(false);

  useEffect(() => {
    setIsExpanded(isManuallyExpanded);
  }, [isManuallyExpanded]);

  useEffect(() => {
    if (forceExpanded === true && !wasForceExpanded.current) {
      setIsExpanded(true);
      wasForceExpanded.current = true;
    } else if (
      forceExpanded === false &&
      wasForceExpanded.current &&
      !isManuallyExpanded
    ) {
      setIsExpanded(false);
      wasForceExpanded.current = false;
    } else if (forceExpanded === undefined) {
      wasForceExpanded.current = false;
    }
  }, [forceExpanded, isManuallyExpanded]);

  const handleClick = () => {
    if (hasChildren) {
      const newExpandedState = !isExpanded;
      setIsExpanded(newExpandedState);
      onManualExpansion?.(newExpandedState);
    } else {
      onClick?.();
      console.log("Clicked item:", link);
    }
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      {hasChildren ? (
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "flex items-center justify-between w-full px-3 py-2 rounded-lg group transition-colors duration-200 text-sm h-auto",
                "text-gray-700 hover:bg-gray-100 font-medium"
              )}
            >
              <div className="flex items-center">
                {iconName &&
                  Icon.hasIcon(iconName as keyof typeof iconData) && (
                    <Icon
                      name={iconName as keyof typeof iconData}
                      size={20}
                      className="mr-3 text-gray-500 transition-colors duration-200"
                    />
                  )}
                <span className="font-semibold">{label}</span>
              </div>
              <Icon
                name="chevron-right"
                size={16}
                className={cn(
                  "text-gray-400 transition-transform duration-300 ease-in-out",
                  isExpanded && "rotate-90"
                )}
              />
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="transition-all duration-300 ease-in-out">
            <div className="pt-1 space-y-1">{children}</div>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <Button
          variant="ghost"
          onClick={handleClick}
          className={cn(
            "flex items-center justify-between w-full px-3 py-2 rounded-lg group transition-colors duration-200 text-sm h-auto font-medium",
            !hasChildren && isActive
              ? "bg-am-brown text-am-red hover:bg-am-brown hover:text-am-red"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-700"
          )}
        >
          <Link href={link || "admin"} className="flex items-center w-full">
            <div className="flex items-center">
              {iconName && Icon.hasIcon(iconName as keyof typeof iconData) && (
                <Icon
                  name={iconName as keyof typeof iconData}
                  size={20}
                  className={cn(
                    "mr-3 transition-colors duration-200",
                    !hasChildren && isActive ? "text-am-red" : "text-gray-500"
                  )}
                />
              )}
              <span className="font-semibold">{label}</span>
            </div>
          </Link>
        </Button>
      )}
    </div>
  );
}

function MenuItemLv3({
  label,
  onClick,
  isActive = false,
  className,
  link,
  ...props
}: MenuItemLv3Props) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (link) {
      router.push(link);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            onClick={handleClick}
            className={cn(
              "flex items-center w-full px-4.5 py-2 text-sm rounded-lg group transition-colors duration-200 h-auto justify-start",
              isActive
                ? "bg-am-brown text-am-red hover:bg-am-brown hover:text-am-red"
                : "hover:bg-gray-100 hover:text-gray-900 text-gray-500",
              className
            )}
            {...props}
          >
            <div
              className={cn(
                "w-2 h-2 rounded-full mr-3 transition-colors duration-200",
                isActive ? "bg-am-red" : "bg-gray-300"
              )}
            ></div>
            <div className="flex items-center w-34">
              <span className="overflow-hidden font-semibold text-ellipsis whitespace-nowrap">
                {label}
              </span>
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" align="center">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { MenuItemLv1, MenuItemLv2, MenuItemLv3 };

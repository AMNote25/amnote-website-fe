import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ChevronDown,
  CircleQuestionMark,
  Cog,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { useState } from "react";

interface ProfileProps {
  name: string;
  role: string;
  avatar: string;
  email: string;
  userRole: string;
}

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  const example_data: ProfileProps = {
    name: "Nguyễn Thị Lan",
    role: "Kế toán trưởng",
    avatar: "NL", // Initials for avatar
    email: "lan.nguyen@company.com",
    userRole: "accountant", // Role for menu items registry
  };

  const handleMenuClick = () => {
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center h-auto px-3 py-2 text-sm transition-colors duration-200 bg-transparent hover-bg-secondary"
        >
          <Avatar className="w-8 h-8">
            <AvatarFallback className="text-sm font-semibold text-white bg-brand-accent">
              {example_data.avatar}
            </AvatarFallback>
          </Avatar>

          <div className="hidden mr-2 text-left md:block">
            <div className="font-semibold text-primary">
              {example_data.name}
            </div>
            <div className="text-xs text-secondary">{example_data.role}</div>
          </div>

          <ChevronDown
            size={16}
            className={`transition-transform duration-200 hidden md:block text-disabled ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-12" onCloseAutoFocus={handleMenuClick}>
        <DropdownMenuLabel>
          <div className="p-2">
            <div className="flex items-center">
              <Avatar className="w-10 h-10 mr-3">
                <AvatarFallback className="text-sm font-semibold text-white bg-brand-accent">
                  {example_data.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-primary">
                  {example_data.name}
                </div>
                <div className="text-sm text-secondary">
                  {example_data.role}
                </div>
                <div className="text-xs text-disabled">
                  {example_data.email}
                </div>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleMenuClick}>
          <User />
          <span>Hồ sơ cá nhân</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleMenuClick}>
          <Settings />
          <span>Cài đặt</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleMenuClick}>
          <CircleQuestionMark />
          <span>Trợ giúp</span>
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={handleMenuClick}>
          <LogOut />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

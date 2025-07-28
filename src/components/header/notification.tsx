import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Bell, Check, Settings } from "lucide-react";
import Icon from "@/components/ui/icon";
import {
  notificationCategories,
  sampleNotifications,
  getNotificationsByCategory,
  getUnreadCount,
  getUnreadCountByCategory,
  markAsRead,
  markAllAsRead,
  getNotificationType,
  formatTimeAgo,
} from "@/data/notificationData";

// Type definitions
export interface NotificationData {
  id: string;
  title: string;
  message: string;
  category: string;
  type: string;
  isRead: boolean;
  timestamp: Date;
  avatar: string | null;
  actionUrl: string;
}

export interface NotificationCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
}

interface NotificationEmptyStateProps {
  category: string;
  showUnreadOnly: boolean;
}

interface NotificationTabsProps {
  categories: Record<string, NotificationCategory>;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  getUnreadCount: (categoryId: string) => number;
}

interface NotificationItemProps {
  notification: NotificationData;
  onClick: (notification: NotificationData) => void;
}

export interface NotificationProps {
  onSettingsClick?: () => void;
  onMarkAllRead?: () => void;
  onNotificationClick?: (notification: NotificationData) => void;
  onCategoryChange?: (category: string) => void;
  onShowUnreadOnlyChange?: (showUnreadOnly: boolean) => void;
  notification?: string;
  activeCategory?: string;
}

export default function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // Get notifications for current category and filter
  const getFilteredNotifications = () => {
    let filtered = getNotificationsByCategory(activeCategory, notifications);
    if (showUnreadOnly) {
      filtered = filtered.filter((notification) => !notification.isRead);
    }
    return filtered;
  };

  const handleNotificationClick = (notification: NotificationData) => {
    // Mark as read when clicked
    if (!notification.isRead) {
      setNotifications(markAsRead(notification.id, notifications));
    }

    // Handle navigation or action
    console.log("Notification clicked:", notification);

    // You can add navigation logic here
    if (notification.actionUrl) {
      // window.location.href = notification.actionUrl;
      console.log("Navigate to:", notification.actionUrl);
    }
  };

  const handleMarkAllRead = () => {
    setNotifications(markAllAsRead(notifications));
  };

  const handleSettings = () => {
    console.log("Open notification settings");
    setIsOpen(false);
  };

  const getUnreadCountForCategory = (categoryId: string) => {
    return getUnreadCountByCategory(categoryId, notifications);
  };

  const totalUnreadCount = getUnreadCount(notifications);
  const filteredNotifications = getFilteredNotifications();

  // Inline NotificationEmptyState component
  const NotificationEmptyState = ({
    category,
    showUnreadOnly,
  }: NotificationEmptyStateProps) => {
    const getEmptyMessage = () => {
      if (showUnreadOnly) {
        return {
          title: "Không có thông báo chưa đọc",
          message: "Tất cả thông báo đã được đọc",
        };
      }

      switch (category) {
        case "posts":
          return {
            title: "Không có tin đăng mới",
            message: "Bạn sẽ nhận được thông báo khi có tin đăng mới",
          };
        case "finance":
          return {
            title: "Không có thông báo tài chính",
            message: "Bạn sẽ nhận được thông báo về thanh toán và hóa đơn",
          };
        case "promotions":
          return {
            title: "Không có khuyến mãi mới",
            message:
              "Bạn sẽ nhận được thông báo về các chương trình khuyến mãi",
          };
        case "more":
          return {
            title: "Không có thông báo khác",
            message: "Bạn sẽ nhận được các thông báo hệ thống và cập nhật",
          };
        default:
          return {
            title: "Hiện tại bạn không có thông báo nào",
            message: "Bạn sẽ nhận được thông báo khi có hoạt động mới",
          };
      }
    };

    const { title, message } = getEmptyMessage();

    return (
      <div className="flex flex-col items-center justify-center px-6 py-12">
        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-background-secondary">
          <Bell size={24} className="text-disabled" />
        </div>

        <h4 className="mb-2 text-sm font-medium text-center text-primary">
          {title}
        </h4>

        <p className="max-w-xs text-sm text-center text-secondary">{message}</p>
      </div>
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell size={20} />
          {totalUnreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full"
            >
              {totalUnreadCount > 99 ? "99+" : totalUnreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-96 p-0" align="end">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Bell size={20} />
            <h3 className="text-sm font-semibold">Thông báo</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Switch
                checked={showUnreadOnly}
                onCheckedChange={setShowUnreadOnly}
              />
              <span className="text-sm text-secondary">Chưa đọc</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
              <Check />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSettings}>
              <Settings />
            </Button>
          </div>
        </div>
        <Separator />
        {/* Category Tabs */}
        <NotificationTabs
          categories={notificationCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          getUnreadCount={getUnreadCountForCategory}
        />
        <Separator />
        {/* Notifications List */}
        <ScrollArea className="h-96">
          {filteredNotifications.length === 0 ? (
            <NotificationEmptyState
              category={activeCategory}
              showUnreadOnly={showUnreadOnly}
            />
          ) : (
            <div className="p-2 ">
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={handleNotificationClick}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

function NotificationTabs({
  categories,
  activeCategory,
  onCategoryChange,
  getUnreadCount,
}: NotificationTabsProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex px-4 space-x-1">
        {Object.values(categories).map((category: NotificationCategory) => {
          const unreadCount = getUnreadCount(category.id);
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex-shrink-0 px-3 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                isActive ? "tab-active" : "tab-inactive"
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="whitespace-nowrap">{category.label}</span>
                {unreadCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="text-white text-xs px-1.5 py-0.5 h-5 min-w-5 bg-brand-accent rounded-full"
                  >
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </Badge>
                )}
              </div>
            </button>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

function NotificationItem({ notification, onClick }: NotificationItemProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(notification);
    }
  };

  // Get notification type info for icon and styling
  const notificationType = getNotificationType(notification.type || "info");

  return (
    <div
      onClick={handleClick}
      className={`px-4 py-3 transition-colors duration-200 cursor-pointer notification-item ${
        !notification.isRead ? "notification-unread" : "notification-read"
      }`}
    >
      <div className="flex justify-between">
        {/* Left side: Icon + Content */}
        <div className="flex-1 min-w-0">
          {/* Title with icon */}
          <div className="flex items-center mb-1 space-x-2">
            <Icon
              name={notificationType.icon as any}
              size={16}
              style={{ color: notificationType.color }}
            />
            <p
              className={`text-sm font-medium ${
                !notification.isRead ? "text-primary" : "text-secondary"
              }`}
            >
              {notification.title}
            </p>
          </div>

          {/* Message aligned with title */}
          <p className="mb-1 text-sm line-clamp-2 text-secondary">
            {notification.message}
          </p>

          {/* Timestamp aligned with title */}
          <p className="text-xs text-disabled">
            {formatTimeAgo(notification.timestamp)}
          </p>
        </div>

        {/* Right side: Unread indicator */}
        <div className="flex-shrink-0 mt-0.5">
          {!notification.isRead && (
            <div className="w-2 h-2 rounded-full notification-dot"></div>
          )}
        </div>
      </div>
    </div>
  );
}

// Notification Categories Registry
export const notificationCategories = {
  ALL: {
    id: "all",
    label: "Tất cả",
    icon: "list",
    color: "#B71D21",
  },
  POSTS: {
    id: "blog",
    label: "Thông báo",
    icon: "file-text",
    color: "#3B82F6",
  },
  FINANCE: {
    id: "transaction",
    label: "Giao dịch",
    icon: "credit-card",
    color: "#10B981",
  },
  PROMOTIONS: {
    id: "customer",
    label: "Khách hàng",
    icon: "gift",
    color: "#F59E0B",
  },
  MORE: {
    id: "Other",
    label: "Khác",
    icon: "more-horizontal",
    color: "#6B7280",
  },
};

// Notification Types Registry
export const notificationTypes = {
  SUCCESS: {
    id: "success",
    icon: "check-circle",
    color: "#10B981", // green
    bgColor: "#ECFDF5", // light green background
  },
  WARNING: {
    id: "warning",
    icon: "alert-triangle",
    color: "#F59E0B", // orange
    bgColor: "#FFFBEB", // light orange background
  },
  ERROR: {
    id: "error",
    icon: "x-circle",
    color: "#EF4444", // red
    bgColor: "#FEF2F2", // light red background
  },
  INFO: {
    id: "info",
    icon: "info",
    color: "#3B82F6", // blue
    bgColor: "#EFF6FF", // light blue background
  },
  APPROVAL: {
    id: "approval",
    icon: "circle-check-big",
    color: "#10B981", // green
    bgColor: "#ECFDF5", // light green background
  },
  PAYMENT: {
    id: "payment",
    icon: "credit-card",
    color: "#10B981", // green
    bgColor: "#ECFDF5", // light green background
  },
  PROMOTION: {
    id: "promotion",
    icon: "gift",
    color: "#F59E0B", // orange
    bgColor: "#FFFBEB", // light orange background
  },
  SYSTEM: {
    id: "system",
    icon: "wrench",
    color: "#6B7280", // gray
    bgColor: "#F9FAFB", // light gray background
  },
  POST: {
    id: "post",
    icon: "file-text",
    color: "#3B82F6", // blue
    bgColor: "#EFF6FF", // light blue background
  },
};

// Sample notification data
export const sampleNotifications = [
  // Thông báo (Products/Announcements)
  {
    id: "1",
    title: "Sản phẩm mới đã được thêm",
    message: 'Sản phẩm "Laptop Dell XPS 13" đã được thêm vào danh mục và sẵn sàng bán.',
    category: "blog",
    type: "approval",
    isRead: false,
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    avatar: null,
    actionUrl: "/products/laptop-dell-xps-13",
  },
  {
    id: "2",
    title: "Cập nhật thông tin sản phẩm",
    message: "Sản phẩm cần bổ sung thêm mô tả chi tiết và hình ảnh để hiển thị tốt hơn.",
    category: "blog",
    type: "warning",
    isRead: false,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    avatar: null,
    actionUrl: "/products/edit/456",
  },
  {
    id: "3",
    title: "Thông báo bảo trì website",
    message: "Website sẽ được bảo trì từ 2:00 - 4:00 sáng ngày 15/7 để cập nhật tính năng mới.",
    category: "blog",
    type: "info",
    isRead: true,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    avatar: null,
    actionUrl: "/announcements/maintenance",
  },

  // Giao dịch (Finance/Transactions)
  {
    id: "4",
    title: "Thanh toán hóa đơn thành công",
    message: "Hóa đơn #INV-2025-001234 với số tiền 2.500.000 VNĐ đã được thanh toán thành công.",
    category: "transaction",
    type: "payment",
    isRead: false,
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    avatar: null,
    actionUrl: "/invoices/INV-2025-001234",
  },
  {
    id: "5",
    title: "Giao dịch bị từ chối",
    message: "Giao dịch 1.200.000 VNĐ bị từ chối. Vui lòng kiểm tra số dư tài khoản và thử lại.",
    category: "transaction",
    type: "error",
    isRead: false,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    avatar: null,
    actionUrl: "/transactions/failed/78912",
  },
  {
    id: "6",
    title: "Hóa đơn sắp đến hạn",
    message: "Hóa đơn #INV-2025-001156 trị giá 3.800.000 VNĐ sẽ đến hạn thanh toán vào ngày 25/7.",
    category: "transaction",
    type: "warning",
    isRead: false,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    avatar: null,
    actionUrl: "/invoices/INV-2025-001156",
  },
  {
    id: "7",
    title: "Hoàn tiền đã xử lý",
    message: "Yêu cầu hoàn tiền cho đơn hàng #ORD-789456 đã được chấp thuận và xử lý.",
    category: "transaction",
    type: "success",
    isRead: true,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    avatar: null,
    actionUrl: "/refunds/ORD-789456",
  },

  // Khách hàng (Customer/Promotions)
  {
    id: "8",
    title: "Khuyến mãi mùa hè 2025",
    message: "Giảm giá 25% cho tất cả sản phẩm điện tử. Áp dụng từ ngày 1/7 đến 31/7/2025.",
    category: "customer",
    type: "promotion",
    isRead: false,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    avatar: null,
    actionUrl: "/promotions/summer-2025",
  },
  {
    id: "9",
    title: "Chương trình tích điểm",
    message: "Tích điểm mua hàng để đổi quà tặng hấp dẫn. 100 điểm = 10.000 VNĐ giảm giá.",
    category: "customer",
    type: "promotion",
    isRead: true,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    avatar: null,
    actionUrl: "/loyalty/points-program",
  },
  {
    id: "10",
    title: "Đánh giá dịch vụ",
    message: "Hãy đánh giá trải nghiệm mua sắm của bạn để chúng tôi cải thiện dịch vụ.",
    category: "customer",
    type: "info",
    isRead: false,
    timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000), // 16 hours ago
    avatar: null,
    actionUrl: "/feedback/service-rating",
  },

  // Khác (Other/System/Account Management)
  {
    id: "11",
    title: "Cập nhật thông tin thanh toán",
    message: "Vui lòng cập nhật thông tin thẻ tín dụng để đảm bảo thanh toán không bị gián đoạn.",
    category: "Other",
    type: "warning",
    isRead: false,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    avatar: null,
    actionUrl: "/account/payment-methods",
  },
  {
    id: "12",
    title: "Đăng nhập bất thường",
    message: "Phát hiện đăng nhập từ địa chỉ IP lạ lúc 14:20. Nếu không phải bạn, hãy đổi mật khẩu ngay.",
    category: "Other",
    type: "warning",
    isRead: false,
    timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000), // 7 hours ago
    avatar: null,
    actionUrl: "/account/security-alerts",
  },
  {
    id: "13",
    title: "Xác minh tài khoản hoàn tất",
    message: "Tài khoản của bạn đã được xác minh thành công. Bạn có thể sử dụng đầy đủ các tính năng.",
    category: "Other",
    type: "success",
    isRead: true,
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
    avatar: null,
    actionUrl: "/account/verification-status",
  },
  {
    id: "14",
    title: "Cập nhật hệ thống thanh toán",
    message: "Hệ thống thanh toán sẽ được nâng cấp từ 1:00 - 3:00 sáng ngày 20/7. Có thể ảnh hưởng đến giao dịch.",
    category: "Other",
    type: "system",
    isRead: true,
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
    avatar: null,
    actionUrl: "/system/payment-maintenance",
  },
  {
    id: "15",
    title: "Thay đổi mật khẩu thành công",
    message: "Mật khẩu tài khoản đã được thay đổi thành công vào lúc 16:45 ngày 2/7/2025.",
    category: "Other",
    type: "success",
    isRead: true,
    timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000), // 20 hours ago
    avatar: null,
    actionUrl: "/account/security-log",
  },
];

// Helper functions
export const getNotificationsByCategory = (
  category: string,
  notifications = sampleNotifications
) => {
  if (category === "all") {
    return notifications;
  }
  return notifications.filter(
    (notification) => notification.category === category
  );
};

export const getNotificationType = (typeId: string) => {
  const key = typeId.toUpperCase() as keyof typeof notificationTypes;
  return notificationTypes[key] || notificationTypes.INFO;
};

export const getUnreadCount = (notifications = sampleNotifications) => {
  return notifications.filter((notification) => !notification.isRead).length;
};

export const getUnreadCountByCategory = (
  category: string,
  notifications = sampleNotifications
) => {
  const categoryNotifications = getNotificationsByCategory(
    category,
    notifications
  );
  return categoryNotifications.filter((notification) => !notification.isRead)
    .length;
};

export const markAsRead = (
  notificationId: string,
  notifications = sampleNotifications
) => {
  return notifications.map((notification) =>
    notification.id === notificationId
      ? { ...notification, isRead: true }
      : notification
  );
};

export const markAllAsRead = (notifications = sampleNotifications) => {
  return notifications.map((notification) => ({
    ...notification,
    isRead: true,
  }));
};

export const formatTimeAgo = (timestamp: Date) => {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `${minutes} phút trước`;
  } else if (hours < 24) {
    return `${hours} giờ trước`;
  } else {
    return `${days} ngày trước`;
  }
};

export default notificationCategories;

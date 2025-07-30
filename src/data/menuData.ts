export const menuData = [
  {
    id: "1",
    title: "Tổng quan",
    type: "section",
    children: [
      {
        id: "11",
        title: "Bảng điều khiển",
        iconName: "layout-dashboard",
        type: "item",
        link: "/admin/dashboard",
        subtitle: "Tổng quan về hệ thống",
      },
      {
        id: "12",
        title: "Tin tức",
        iconName: "bell",
        type: "item",
        link: "/admin/news",
        subtitle: "Cập nhật tin tức mới nhất",
      },
    ],
  },
  {
    id: "2",
    title: "Quản lý dữ liệu",
    type: "section",
    children: [
      {
        id: "21",
        title: "Dữ liệu cơ bản",
        iconName: "database",
        type: "expandable",
        children: [
          { id: "211", title: "Quản lý công ty", type: "item", link: "/admin/data-management/company", iconName: "building", subtitle: "Quản lý thông tin công ty" },
          { id: "212", title: "Quản lý người dùng", type: "item", link: "/admin/data-management/user", iconName: "user", subtitle: "Quản lý thông tin người dùng" },
          { id: "213", title: "Quản lý khách hàng", type: "item", link: "/admin/data-management/customer", iconName: "users", subtitle: "Quản lý thông tin khách hàng" },
          { id: "214", title: "Quản lý ngân hàng", type: "item", link: "/admin/data-management/bank", iconName: "bank", subtitle: "Quản lý thông tin ngân hàng" },
          { id: "215", title: "Quản lý tài khoản", type: "item", link: "/admin/data-management/account", iconName: "credit-card", subtitle: "Quản lý thông tin tài khoản" },
          { id: "216", title: "Quản lý tồn kho", type: "item", link: "/admin/data-management/inventory", iconName: "archive", subtitle: "Quản lý thông tin tồn kho" },
          { id: "217", title: "Quản lý hợp đồng", type: "item", link: "/admin/data-management/contract", iconName: "file-text", subtitle: "Quản lý thông tin hợp đồng" },
          { id: "218", title: "Quản lý ghi chú", type: "item", link: "/admin/data-management/note", iconName: "edit-2", subtitle: "Quản lý thông tin ghi chú" },
        ],
      },
      {
        id: "22",
        title: "Đăng ký và khai báo",
        iconName: "package",
        type: "expandable",
        children: [
          { id: "221", title: "Đối tượng tập hợp chi phí", type: "item", link: "/admin/report/cost-collection", iconName: "clipboard-list", subtitle: "Quản lý đối tượng tập hợp chi phí" },
          { id: "222", title: "Mã quản lý", type: "item", link: "/admin/report/manage-code", iconName: "hash", subtitle: "Quản lý mã quản lý" },
          { id: "223", title: "Mã nhóm vật tư", type: "item", link: "/admin/report/material-group", iconName: "layers", subtitle: "Quản lý mã nhóm vật tư" },
          { id: "224", title: "Mã đơn vị tính", type: "item", link: "/admin/report/unit", iconName: "package", subtitle: "Quản lý mã đơn vị tính" },
          { id: "225", title: "Mã tiêu chuẩn", type: "item", link: "/admin/report/standard", iconName: "star", subtitle: "Quản lý mã tiêu chuẩn" },
        ],
      },
    ],
  },
];

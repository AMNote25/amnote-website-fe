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
      },
      {
        id: "12",
        title: "Tin tức",
        iconName: "bell",
        type: "item",
        link: "/admin/news",
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
          { id: "211", title: "Quản lý công ty", type: "item", link: "/admin/data-management/company" },
          { id: "212", title: "Quản lý người dùng", type: "item", link: "/admin/data-management/user" },
          { id: "213", title: "Quản lý khách hàng", type: "item", link: "/admin/data-management/customer" },
          { id: "214", title: "Quản lý ngân hàng", type: "item", link: "/admin/data-management/bank" },
          { id: "215", title: "Quản lý tài khoản", type: "item", link: "/admin/data-management/account" },
          { id: "216", title: "Quản lý tồn kho", type: "item", link: "/admin/data-management/inventory" },
          { id: "217", title: "Quản lý hợp đồng", type: "item", link: "/admin/data-management/contract" },
          { id: "218", title: "Quản lý ghi chú", type: "item", link: "/admin/data-management/note" },
        ],
      },
      {
        id: "22",
        title: "Đăng ký và khai báo",
        iconName: "package",
        type: "expandable",
        children: [
          { id: "221", title: "Đối tượng tập hợp chi phí", type: "item", link: "/admin/report/cost-collection" },
          { id: "222", title: "Mã quản lý", type: "item", link: "/admin/report/manage-code" },
          { id: "223", title: "Mã nhóm vật tư", type: "item", link: "/admin/report/material-group" },
          { id: "224", title: "Mã đơn vị tính", type: "item", link: "/admin/report/unit" },
          { id: "225", title: "Mã tiêu chuẩn", type: "item", link: "/admin/report/standard" },
        ],
      },
    ],
  },
];

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
      },
      {
        id: "12",
        title: "Tin tức",
        iconName: "bell",
        type: "item",
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
          { id: "211", title: "Quản lý công ty", type: "item" },
          { id: "212", title: "Quản lý người dùng", type: "item" },
          { id: "213", title: "Quản lý khách hàng", type: "item" },
          { id: "214", title: "Quản lý ngân hàng", type: "item" },
          { id: "215", title: "Quản lý tài khoản", type: "item" },
          { id: "216", title: "Quản lý tồn kho", type: "item" },
          { id: "217", title: "Quản lý hợp đồng", type: "item" },
          { id: "218", title: "Quản lý ghi chú", type: "item" },
        ],
      },
      {
        id: "22",
        title: "Đăng ký và khai báo",
        iconName: "package",
        type: "expandable",
        children: [
          { id: "221", title: "Đối tượng tập hợp chi phí", type: "item" },
          { id: "222", title: "Mã quản lý", type: "item" },
          { id: "223", title: "Mã nhóm vật tư", type: "item" },
          { id: "224", title: "Mã đơn vị tính", type: "item" },
          { id: "225", title: "Mã tiêu chuẩn", type: "item" },
        ],
      },
    ],
  },
];

import { InventoryItem } from "@/api/types/inventory";
import { InventoryPayload } from "@/api/types/inventoryPayload";

export const INVENTORY_EXPORT_HEADERS = [
  "Mã sản phẩm",
  "Tên sản phẩm",
  "Tên sản phẩm (EN)",
  "Mã phân loại",
  "Mã phòng ban",
  "Mã loại sản phẩm",
  "Số lượng tồn kho",
  "Giá đơn vị (CC)",
  "Giá đơn vị (FC)",
  "Đơn vị tồn kho",
  "Mã cửa hàng",
  "Trạng thái",
  "Số lượng nhập",
  "Số lượng xuất",
  "Tỷ giá",
  "Nguồn gốc",
  "Tỷ lệ VAT (%)",
  "Tóm tắt",
];

export const INVENTORY_EXPORT_COLUMNS: (keyof InventoryItem)[] = [
  "PRODUCT_CD",
  "PRODUCT_NM",
  "PRODUCT_NM_ENG",
  "DIVISION_CD",
  "DEPARTMENT_CD",
  "PRODUCTKIND_CD",
  "FITNESS_STOCK",
  "UNIT_PRICE_CC",
  "UNIT_PRICE_FC",
  "STOCK_UNIT",
  "STORE_CD",
  "ISUSE",
  "INBOUND_QUANTITY",
  "OUTBOUND_QUANTITY",
  "EX_RATE",
  "ORIGIN",
  "VAT_RATE",
  "SUMMARY",
];

export const INVENTORY_COLUMN_WIDTHS = [
  { wch: 15 },
  { wch: 25 },
  { wch: 25 },
  { wch: 15 },
  { wch: 15 },
  { wch: 18 },
  { wch: 15 },
  { wch: 18 },
  { wch: 18 },
  { wch: 15 },
  { wch: 15 },
  { wch: 15 },
  { wch: 15 },
  { wch: 15 },
  { wch: 12 },
  { wch: 15 },
  { wch: 15 },
  { wch: 30 },
];

export const INVENTORY_COLUMN_TYPES = [
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "number",
    "number",
    "number",
    "string",
    "string",
    "boolean",
    "number",
    "number",
    "number",
    "string",
    "number",
    "string",
]

// Field config
// Field config - same as insert component
export const INVENTORY_FIELDS: {
  key: keyof InventoryPayload;
  label: string;
  type: "string" | "number" | "boolean";
  required?: boolean;
  readOnly?: boolean;
  colspan?: number;
  inputType?: "text" | "number" | "select" | "switch" | "textarea" | "datepicker" | "multiselect" | "radio";
}[] = [
  { key: "PRODUCT_CD", label: "Mã sản phẩm", type: "string", required: true, readOnly: true },
  { key: "DivisionCD", label: "Mã phân loại", type: "string", required: true },
  { key: "PRODUCTKIND_CD", label: "Mã loại sản phẩm", type: "string", required: true },
  { key: "DepartmentCD", label: "Mã phòng ban", type: "string", required: true },
  { key: "PRODUCT_NM", label: "Tên sản phẩm", type: "string", required: true, colspan: 2 },
  { key: "PRODUCT_NM_ENG", label: "Tên sản phẩm (EN)", type: "string", colspan: 2 },
  { key: "PRODUCT_NM_KOR", label: "Tên sản phẩm (KR)", type: "string", colspan: 2 },
  { key: "InboundUnitCD", label: "Đơn vị nhập kho", type: "string" },
  { key: "OutboundUnitCD", label: "Đơn vị xuất kho", type: "string" },
  { key: "materialInputUnitCD", label: "Đơn vị nhập nguyên liệu", type: "string" },
  { key: "StockUnitCD", label: "Đơn vị tồn kho", type: "string", required: true },
  { key: "InboundQuantity", label: "Số lượng nhập kho", type: "number" },
  { key: "OutboundQuantity", label: "Số lượng xuất kho", type: "number" },
  { key: "MaterialInputQuantity", label: "Số lượng nhập nguyên liệu", type: "number" },
  { key: "StoreCD", label: "Kho hàng", type: "string", required: true },
  { key: "StandardCD", label: "Tiêu chuẩn sản phẩm", type: "string" },
  { key: "FitnessStock", label: "Tồn kho an toàn", type: "number" },
  { key: "UnitPrice", label: "Giá đơn vị (CC)", type: "number", required: true },
  { key: "FcUnitPirce", label: "Giá đơn vị (FC)", type: "number" },
  { key: "ExRate", label: "Tỷ giá hối đoái", type: "number" },
  { key: "lblCCType", label: "Loại CC", type: "string" },
  { key: "lblFCType", label: "Loại FC", type: "string" },
  { key: "txtSummary", label: "Tóm tắt sản phẩm", type: "string", colspan: 2 },
  { key: "rgUseNotUse", label: "Trạng thái sử dụng", type: "boolean" },
  { key: "HaveChildBOM", label: "Có BOM con", type: "boolean" },
  { key: "Origin", label: "Nguồn gốc", type: "string" },
  { key: "Lag", label: "Lag", type: "string" },
];
// Dữ liệu gửi lên API (payload)
export interface InventoryPayload {
  Lag?: string; // Đổi thành optional để API tự thêm
  PRODUCT_CD: string;
  DivisionCD: string;
  PRODUCTKIND_CD: string;
  DepartmentCD: string;
  PRODUCT_NM: string;
  PRODUCT_NM_ENG: string;
  PRODUCT_NM_KOR: string;
  InboundUnitCD: string;
  OutboundUnitCD: string;
  materialInputUnitCD: string;
  StockUnitCD: string;
  InboundQuantity: number;
  OutboundQuantity: number;
  MaterialInputQuantity: number;
  StoreCD: string;
  StandardCD: string;
  FitnessStock: string;
  UnitPrice: string;
  FcUnitPirce: string;
  ExRate: string;
  lblCCType: string;
  lblFCType: string;
  txtSummary: string;
  rgUseNotUse: "1";
  HaveChildBOM: "Y";
  Origin: string;
}
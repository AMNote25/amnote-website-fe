export interface IInventory {
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
  rgUseNotUse: string;
  HaveChildBOM: string;
  Origin: string;
}

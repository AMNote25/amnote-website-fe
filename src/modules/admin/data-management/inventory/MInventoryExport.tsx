import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { InventoryItem } from "@/api/types/inventory";
import {
  exportTableToExcel,
  generateExportFilename,
} from "@/utils/exportUtils";
import { toast } from "sonner";
import { CheckCircle, TriangleAlert } from "lucide-react";

// Inventory-specific export configuration
const INVENTORY_EXPORT_HEADERS = [
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

const INVENTORY_EXPORT_COLUMNS: (keyof InventoryItem)[] = [
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

const INVENTORY_COLUMN_WIDTHS = [
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

interface MInventoryExportAllProps {
  data?: InventoryItem[];
  loading?: boolean;
}

interface MInventoryExportSelectedProps {
  selectedData?: InventoryItem[];
  disabled?: boolean;
}

export function MInventoryExportAll({
  data = [],
  loading = false,
}: MInventoryExportAllProps) {
  const handleExportAll = () => {
    if (data.length === 0) {
      toast.error("Không có dữ liệu để xuất", {
        icon: <CheckCircle className="text-green-500" />,
        style: {
          gap: "1rem",
        },
      });
      return;
    }
    try {
      const filename = generateExportFilename("Inventory_Export");
      exportTableToExcel(
        data,
        INVENTORY_EXPORT_HEADERS,
        INVENTORY_EXPORT_COLUMNS,
        filename,
        INVENTORY_COLUMN_WIDTHS,
        "Inventory_Data"
      );
      toast.success(`Đã xuất ${data.length} sản phẩm thành công!`, {
        icon: <CheckCircle className="text-green-500" />,
        style: {
          gap: "1rem",
        },
      });
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xuất dữ liệu", {});
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExportAll}
      disabled={loading || data.length === 0}
      className="flex items-center gap-2"
    >
      <Icon name="download" size="sm" />
      Xuất dữ liệu
    </Button>
  );
}

export function MInventoryExportSelected({
  selectedData = [],
  disabled = false,
}: MInventoryExportSelectedProps) {
  const handleExportSelected = () => {
    if (selectedData.length === 0) {
      toast.error("Vui lòng chọn ít nhất một sản phẩm để xuất", {
        icon: <TriangleAlert className="text-yellow-500" />,
        style: {
          gap: "1rem",
        },
      });
      return;
    }
    try {
      const filename = generateExportFilename("Selected_Inventory_Export");
      exportTableToExcel(
        selectedData,
        INVENTORY_EXPORT_HEADERS,
        INVENTORY_EXPORT_COLUMNS,
        filename,
        INVENTORY_COLUMN_WIDTHS,
        "Selected_Inventory"
      );
      toast.success(
        `Đã xuất ${selectedData.length} sản phẩm được chọn thành công!`,
        {
          icon: <CheckCircle className="text-green-500" />,
          style: {
            gap: "1rem",
          },
        }
      );
    } catch (error) {
      console.error("Error exporting selected data:", error);
      toast.error("Có lỗi xảy ra khi xuất dữ liệu", {
        icon: <TriangleAlert className="text-yellow-500" />,
        style: {
          gap: "1rem",
        },
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExportSelected}
      disabled={disabled || selectedData.length === 0}
      className="flex items-center gap-2"
    >
      <Icon name="download" size="sm" />
      Xuất đã chọn ({selectedData.length})
    </Button>
  );
}

// Export function for use in action bar
export function exportSelectedInventory(selectedRows: InventoryItem[]) {
  if (selectedRows.length === 0) {
    alert("Vui lòng chọn ít nhất một sản phẩm để xuất");
    return;
  }

  try {
    const filename = generateExportFilename("Selected_Inventory_Export");
    exportTableToExcel(
      selectedRows,
      INVENTORY_EXPORT_HEADERS,
      INVENTORY_EXPORT_COLUMNS,
      filename,
      INVENTORY_COLUMN_WIDTHS,
      "Selected_Inventory"
    );
    toast.success(
      `Đã xuất ${selectedRows.length} sản phẩm được chọn thành công!`,
      {
        icon: <CheckCircle className="text-green-500" />,
        style: {
          gap: "1rem",
        },
      }
    );
  } catch (error) {
    console.error("Error exporting selected data:", error);
    toast.error("Có lỗi xảy ra khi xuất dữ liệu", {
      icon: <TriangleAlert className="text-yellow-500" />,
      style: {
        gap: "1rem",
      },
    });
    throw error;
  }
}

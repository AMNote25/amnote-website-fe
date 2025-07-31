import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { InventoryItem } from "@/api/types/inventory";
import {
  exportTableToExcel,
  generateExportFilename,
} from "@/utils/exportUtils";
import { toast } from "sonner";
import { CheckCircle, TriangleAlert } from "lucide-react";
import { INVENTORY_EXPORT_HEADERS, INVENTORY_EXPORT_COLUMNS, INVENTORY_COLUMN_WIDTHS } from "@/constants/CInventory";

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

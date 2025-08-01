import Table from "@/components/custom-table/table";
import { Edit, Eye, Trash2, MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ActionBarItem, RowAction } from "@/components/custom-table/types";
import { InventoryItem } from "@/api/types/inventory";
import { deleteInventory } from "@/api/services/service_Inventory";
import { useState } from "react";
import MInventoryUpdate from "./MInventoryUpdate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface MInventoryTableProps {
  data?: InventoryItem[];
  columns?: ColumnDef<InventoryItem>[];
  actionBarItems?: ActionBarItem[];
  rowActions?: RowAction[];
  onDataChange?: () => void; // Callback to refresh data after operations
}

export default function MInventoryTable({
  data = [],
  columns: customColumns,
  actionBarItems,
  rowActions,
  onDataChange,
}: MInventoryTableProps) {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [updateMode, setUpdateMode] = useState<'view' | 'edit'>('view');

  const handleViewDetails = (item: InventoryItem) => {
    setSelectedItem(item);
    setUpdateMode('view');
    setUpdateDialogOpen(true);
  };

  const handleEdit = (item: InventoryItem) => {
    setSelectedItem(item);
    setUpdateMode('edit');
    setUpdateDialogOpen(true);
  };

  const handleUpdateSuccess = () => {
    onDataChange?.();
    setUpdateDialogOpen(false);
    setSelectedItem(null);
  };

  const defaultRowActions: RowAction[] = [
    {
      label: "Xem chi tiết",
      icon: <Eye className="w-4 h-4" />,
      onClick: (item: InventoryItem) => {
        handleViewDetails(item);
      },
    },
    {
      label: "Chỉnh sửa",
      icon: <Edit className="w-4 h-4" />,
      onClick: (item: InventoryItem) => {
        handleEdit(item);
      },
      separator: true,
    },
    {
      label: "Xóa sản phẩm",
      icon: <Trash2 className="w-4 h-4 text-am-red" />,
      onClick: async (item: InventoryItem) => {
        if (confirm(`Xóa "${item.PRODUCT_NM}"?`)) {
          try {
            await deleteInventory(item.PRODUCT_CD);
            if (onDataChange) {
              onDataChange();
            }
            alert(`"${item.PRODUCT_NM}" deleted successfully!`);
          } catch (error) {
            console.error("Error deleting item:", error);
            alert("Failed to delete item. Please try again.");
          }
        }
      },
      className: "text-am-red focus:text-red-600",
    },
  ];

  const defaultActionBarItems: ActionBarItem[] = [
    {
      icon: "file-down",
      onClick: (selectedRows: any[]) => {
        console.log("Exporting inventory items:", selectedRows);
        alert(`Exporting ${selectedRows.length} inventory items`);
      },
      tooltip: "Export selected inventory items",
    },
    {
      icon: "trash-2",
      onClick: (selectedRows: any[]) => {
        if (
          confirm(`Delete ${selectedRows.length} selected inventory items?`)
        ) {
          console.log("Deleting inventory items:", selectedRows);
          alert(`${selectedRows.length} inventory items deleted!`);
        }
      },
      tooltip: "Delete selected inventory items",
      variant: "destructive" as const,
    },
  ];

  const defaultColumns: ColumnDef<InventoryItem>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 50,
    },
    {
      accessorKey: "PRODUCT_CD",
      header: "Mã sản phẩm",
      meta: {
        label: "Mã sản phẩm",
      },
    },
    {
      accessorKey: "PRODUCT_NM",
      header: "Tên sản phẩm",
      meta: {
        label: "Tên sản phẩm",
      },
    },
    {
      accessorKey: "PRODUCT_NM_ENG",
      header: "Tên sản phẩm (EN)",
      meta: {
        label: "Tên sản phẩm (English)",
      },
    },
    {
      accessorKey: "DIVISION_CD",
      header: "Mã phân loại",
      meta: {
        label: "Mã phân loại",
        variant: "select",
      },
    },
    {
      accessorKey: "DEPARTMENT_CD",
      header: "Mã phòng ban",
      meta: {
        label: "Mã phòng ban",
        variant: "select",
      },
    },
    {
      accessorKey: "PRODUCTKIND_CD",
      header: "Mã loại sản phẩm",
      meta: {
        label: "Mã loại sản phẩm",
        variant: "select",
      },
    },
    {
      accessorKey: "FITNESS_STOCK",
      header: "Số lượng tồn kho",
      meta: {
        label: "Số lượng tồn kho",
        variant: "number",
      },
    },
    {
      accessorKey: "UNIT_PRICE_CC",
      header: "Giá đơn vị (CC)",
      cell: ({ getValue }) => {
        const amount = getValue() as number;
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(amount);
      },
      meta: {
        label: "Giá đơn vị (CC)",
        variant: "number",
      },
    },
    {
      accessorKey: "UNIT_PRICE_FC",
      header: "Giá đơn vị (FC)",
      cell: ({ getValue }) => {
        const amount = getValue() as number;
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
      },
      meta: {
        label: "Giá đơn vị (FC)",
        variant: "number",
      },
    },
    {
      accessorKey: "STOCK_UNIT",
      header: "Đơn vị tồn kho",
      meta: {
        label: "Đơn vị tồn kho",
      },
    },
    {
      accessorKey: "STORE_CD",
      header: "Mã cửa hàng",
      meta: {
        label: "Mã cửa hàng",
        variant: "select",
      },
    },
    {
      accessorKey: "ISUSE",
      header: "Trạng thái",
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return value === "Y" ? "Kích hoạt" : "Không kích hoạt";
      },
      meta: {
        label: "Trạng thái",
        variant: "select",
        options: [
          { label: "Kích hoạt", value: "Y" },
          { label: "Không kích hoạt", value: "N" },
        ],
      },
    },
    {
      accessorKey: "INBOUND_QUANTITY",
      header: "Số lượng nhập",
      cell: ({ getValue }) => {
        const value = getValue() as number | null;
        return value !== null ? value.toLocaleString() : "-";
      },
      meta: {
        label: "Số lượng nhập",
        variant: "number",
      },
    },
    {
      accessorKey: "OUTBOUND_QUANTITY",
      header: "Số lượng xuất",
      cell: ({ getValue }) => {
        const value = getValue() as number | null;
        return value !== null ? value.toLocaleString() : "-";
      },
      meta: {
        label: "Số lượng xuất",
        variant: "number",
      },
    },
    {
      accessorKey: "EX_RATE",
      header: "Tỷ giá",
      cell: ({ getValue }) => {
        const value = getValue() as number;
        return value.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 4,
        });
      },
      meta: {
        label: "Tỷ giá",
        variant: "number",
      },
    },
    {
      accessorKey: "ORIGIN",
      header: "Nguồn gốc",
      meta: {
        label: "Nguồn gốc",
      },
    },
    {
      accessorKey: "VAT_RATE",
      header: "Tỷ lệ VAT (%)",
      cell: ({ getValue }) => {
        const value = getValue() as number;
        return `${value}%`;
      },
      meta: {
        label: "Tỷ lệ VAT",
        variant: "number",
      },
    },
    {
      accessorKey: "SUMMARY",
      header: "Tóm tắt",
      meta: {
        label: "Tóm tắt",
      },
    },
    {
      id: "actions",
      header: "Hành động",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0 flex items-center justify-self-center"
              style={{ justifySelf: "center" }}>
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  handleViewDetails(item);
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleEdit(item);
                }}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Item
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  if (confirm(`Delete "${item.PRODUCT_NM}"?`)) {
                    try {
                      await deleteInventory(item.PRODUCT_CD);
                      if (onDataChange) {
                        onDataChange();
                      }
                      alert(`"${item.PRODUCT_NM}" deleted successfully!`);
                    } catch (error) {
                      console.error("Error deleting item:", error);
                      alert("Failed to delete item. Please try again.");
                    }
                  }
                }}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
      enableHiding: false,
      size: 80,
    },
  ];

  return (
    <>
      <Table
        data={data}
        columns={customColumns || defaultColumns}
        rowActions={rowActions || defaultRowActions}
        actionBarItems={actionBarItems || defaultActionBarItems}
      />
      
      <MInventoryUpdate
        item={selectedItem}
        isOpen={updateDialogOpen}
        onClose={() => {
          setUpdateDialogOpen(false);
          setSelectedItem(null);
        }}
        onSuccess={handleUpdateSuccess}
        mode={updateMode}
      />
    </>
  );
}

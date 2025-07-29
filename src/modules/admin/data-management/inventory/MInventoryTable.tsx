import Table from "@/components/custom-table/table";
import { Edit, Eye, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ActionBarItem } from "@/components/custom-table/types";
import { InventoryItem } from "@/api/types/inventory";
import { deleteInventory } from "@/api/services/service_Inventory";

interface MInventoryTableProps {
  data?: InventoryItem[];
  columns?: ColumnDef<InventoryItem>[];
  actionBarItems?: ActionBarItem[];
  onDataChange?: () => void; // Callback to refresh data after operations
}

export default function MInventoryTable({
  data = [],
  columns: customColumns,
  actionBarItems,
  onDataChange,
}: MInventoryTableProps) {
  
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
      icon: "edit",
      onClick: (selectedRows: any[]) => {
        console.log("Editing inventory items:", selectedRows);
        alert(`Editing ${selectedRows.length} inventory items`);
      },
      tooltip: "Edit selected inventory items",
    },
    {
      icon: "trash-2",
      onClick: (selectedRows: any[]) => {
        if (confirm(`Delete ${selectedRows.length} selected inventory items?`)) {
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
    },
    {
      accessorKey: "PRODUCT_CD",
      header: "Product Code",
      meta: {
        label: "Product Code",
      },
    },
    {
      accessorKey: "PRODUCT_NM",
      header: "Product Name",
      meta: {
        label: "Product Name",
      },
    },
    {
      accessorKey: "PRODUCT_NM_ENG",
      header: "Product Name (EN)",
      meta: {
        label: "Product Name (English)",
      },
    },
    {
      accessorKey: "DIVISION_CD",
      header: "Division",
      meta: {
        label: "Division Code",
        variant: "select",
      },
    },
    {
      accessorKey: "DEPARTMENT_CD",
      header: "Department",
      meta: {
        label: "Department Code",
        variant: "select",
      },
    },
    {
      accessorKey: "PRODUCTKIND_CD",
      header: "Product Kind",
      meta: {
        label: "Product Kind Code",
        variant: "select",
      },
    },
    {
      accessorKey: "FITNESS_STOCK",
      header: "Stock Quantity",
      meta: {
        label: "Stock Quantity",
        variant: "number",
      },
    },
    {
      accessorKey: "UNIT_PRICE_CC",
      header: "Unit Price (CC)",
      cell: ({ getValue }) => {
        const amount = getValue() as number;
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(amount);
      },
      meta: {
        label: "Unit Price (CC)",
        variant: "number",
      },
    },
    {
      accessorKey: "UNIT_PRICE_FC",
      header: "Unit Price (FC)",
      cell: ({ getValue }) => {
        const amount = getValue() as number;
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
      },
      meta: {
        label: "Unit Price (FC)",
        variant: "number",
      },
    },
    {
      accessorKey: "STOCK_UNIT",
      header: "Stock Unit",
      meta: {
        label: "Stock Unit",
      },
    },
    {
      accessorKey: "STORE_CD",
      header: "Store Code",
      meta: {
        label: "Store Code",
        variant: "select",
      },
    },
    {
      accessorKey: "ISUSE",
      header: "Status",
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return value === "Y" ? "Active" : "Inactive";
      },
      meta: {
        label: "Status",
        variant: "select",
        options: [
          { label: "Active", value: "Y" },
          { label: "Inactive", value: "N" },
        ],
      },
    },
    {
      accessorKey: "INBOUND_QUANTITY",
      header: "Inbound Qty",
      cell: ({ getValue }) => {
        const value = getValue() as number | null;
        return value !== null ? value.toLocaleString() : "-";
      },
      meta: {
        label: "Inbound Quantity",
        variant: "number",
      },
    },
    {
      accessorKey: "OUTBOUND_QUANTITY", 
      header: "Outbound Qty",
      cell: ({ getValue }) => {
        const value = getValue() as number | null;
        return value !== null ? value.toLocaleString() : "-";
      },
      meta: {
        label: "Outbound Quantity",
        variant: "number",
      },
    },
    {
      accessorKey: "EX_RATE",
      header: "Exchange Rate",
      cell: ({ getValue }) => {
        const value = getValue() as number;
        return value.toLocaleString("en-US", { 
          minimumFractionDigits: 2,
          maximumFractionDigits: 4 
        });
      },
      meta: {
        label: "Exchange Rate",
        variant: "number",
      },
    },
    {
      accessorKey: "ORIGIN",
      header: "Origin",
      meta: {
        label: "Origin",
      },
    },
    {
      accessorKey: "VAT_RATE",
      header: "VAT Rate (%)",
      cell: ({ getValue }) => {
        const value = getValue() as number;
        return `${value}%`;
      },
      meta: {
        label: "VAT Rate",
        variant: "number",
      },
    },
    {
      accessorKey: "SUMMARY",
      header: "Summary",
      meta: {
        label: "Summary",
      },
    },
  ];

  return (
    <Table
      data={data}
      columns={customColumns || defaultColumns}
      actionBarItems={actionBarItems || defaultActionBarItems}
    />
  );
}

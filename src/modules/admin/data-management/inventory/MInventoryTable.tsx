import Table from "@/components/custom-table/table";
import { Edit, Eye, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ActionBarItem } from "@/components/custom-table/types";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  status: string;
}

interface MInventoryTableProps {
  data?: InventoryItem[];
  columns?: ColumnDef<InventoryItem>[];
}

export default function MInventoryTable({
  data = [],
  columns: customColumns,
}: MInventoryTableProps) {
  
    const actionBarItems = [
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

  const defaultActionBarItems: ActionBarItem[] = [
    {
      icon: "file-down",
      onClick: (selectedRows: any[]) => {
        console.log("Exporting items:", selectedRows);
        alert(`Exporting ${selectedRows.length} items`);
      },
      tooltip: "Export selected items",
    },
    {
      icon: "trash-2",
      onClick: (selectedRows: any[]) => {
        if (confirm(`Delete ${selectedRows.length} selected items?`)) {
          console.log("Deleting items:", selectedRows);
          alert(`${selectedRows.length} items deleted!`);
        }
      },
      tooltip: "Delete selected items",
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
      accessorKey: "id",
      header: "ID",
      meta: {
        label: "ID",
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      meta: {
        label: "Name",
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      meta: {
        label: "Category",
        variant: "select",
        options: [
          { label: "Electronics", value: "electronics" },
          { label: "Clothing", value: "clothing" },
          { label: "Books", value: "books" },
        ],
      },
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      meta: {
        label: "Quantity",
        variant: "number",
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ getValue }) => {
        const amount = getValue() as number;
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(amount);
      },
      meta: {
        label: "Price",
        variant: "number",
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      meta: {
        label: "Status",
        variant: "select",
        options: [
          { label: "In Stock", value: "in_stock" },
          { label: "Out of Stock", value: "out_of_stock" },
          { label: "Low Stock", value: "low_stock" },
        ],
      },
    },
  ];

  const mockData: InventoryItem[] = [
    {
      id: "1",
      name: "Laptop Dell XPS 13",
      category: "electronics",
      quantity: 15,
      price: 25000000,
      status: "in_stock",
    },
    {
      id: "2",
      name: "T-shirt Cotton",
      category: "clothing",
      quantity: 0,
      price: 250000,
      status: "out_of_stock",
    },
    {
      id: "3",
      name: "JavaScript Guide",
      category: "books",
      quantity: 5,
      price: 150000,
      status: "low_stock",
    },
  ];

  return (
    <Table
      data={data.length > 0 ? data : mockData}
      columns={customColumns || defaultColumns}
      actionBarItems={actionBarItems || defaultActionBarItems}
    />
  );
}

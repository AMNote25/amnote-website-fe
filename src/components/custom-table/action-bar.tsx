import React from "react";
import {
  DataTableActionBar,
  DataTableActionBarAction,
  DataTableActionBarSelection,
} from "@/components/data-table/data-table-action-bar";
import Icon from "@/components/ui/icon";
import { Table } from "@tanstack/react-table";
import { ActionBarItem } from "./types";

interface TableActionBarProps {
  table: Table<any>;
  actionBarItems?: ActionBarItem[];
}

export default function TableActionBar({ table, actionBarItems }: TableActionBarProps) {
  // Only show action bar when rows are selected
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  if (selectedRows.length === 0) {
    return null;
  }

  // Default actions if no custom actions provided
  const defaultActions: ActionBarItem[] = [
    {
      icon: "file-down",
      onClick: (selectedRows: any[]) => {
        console.log(`Exporting ${selectedRows.length} items`);
        alert(`Exporting ${selectedRows.length} items`);
      },
      tooltip: "Export selected items",
    },
    {
      icon: "trash-2",
      onClick: (selectedRows: any[]) => {
        if (confirm(`Delete ${selectedRows.length} selected items?`)) {
          console.log(`Deleting ${selectedRows.length} items`);
          alert(`${selectedRows.length} items deleted!`);
        }
      },
      tooltip: "Delete selected items",
      variant: "destructive",
    },
  ];

  const actions = actionBarItems && actionBarItems.length > 0 ? actionBarItems : defaultActions;

  return (
    <DataTableActionBar table={table}>
      <DataTableActionBarSelection table={table} />
      {actions.map((action, index) => (
        <DataTableActionBarAction
          key={index}
          onClick={() =>
            action.onClick(
              selectedRows.map((row) => row.original)
            )
          }
          tooltip={action.tooltip}
          variant={action.variant}
          disabled={action.disabled}
        >
          <Icon 
            name={action.icon as any} 
            className="w-4 h-4 text-gray-500" 
          />
        </DataTableActionBarAction>
      ))}
    </DataTableActionBar>
  );
}

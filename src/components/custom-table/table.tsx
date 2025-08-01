import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
} from "@tanstack/react-table";
import React from "react";
import { DataTable } from "../data-table/data-table";
import Toolbar from "./tool-bar";
import TableActionBar from "./action-bar";
import { AdvancedFilter, ActionBarItem, RowAction } from "./types";

interface TableProps {
  data: unknown[];
  columns: ColumnDef<unknown>[];
  rowActions?: RowAction<unknown>[];
  actionBarItems?: ActionBarItem<unknown>[];
}

export default function Table({ data, columns, rowActions, actionBarItems }: TableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [advancedFilters, setAdvancedFilters] = React.useState<AdvancedFilter[]>([]);
  
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    enableSorting: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    globalFilterFn: "includesString",
  });

  return (
    <DataTable
      table={table}
      rowActions={rowActions}
      actionBar={
        <TableActionBar 
          table={table} 
          actionBarItems={actionBarItems}
        />
      }
    >
      <Toolbar
        table={table}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        advancedFilters={advancedFilters}
        setAdvancedFilters={setAdvancedFilters}
      />
    </DataTable>
  );
}

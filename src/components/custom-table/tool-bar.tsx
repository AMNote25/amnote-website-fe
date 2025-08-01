import React from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { DataTableViewOptions } from "../data-table/data-table-view-options";
import TableAdvancedFilterSystem from "./advanced-filter";
import { Table } from "@tanstack/react-table";
import { AdvancedFilter } from "./types";

interface ToolbarProps {
  table: Table<unknown>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  advancedFilters: AdvancedFilter[];
  setAdvancedFilters: React.Dispatch<React.SetStateAction<AdvancedFilter[]>>;
  children?: React.ReactNode;
}

export default function Toolbar({
  table,
  globalFilter,
  setGlobalFilter,
  advancedFilters,
  setAdvancedFilters,
  children
}: ToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        {/* Global Search */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="pl-8 h-9 w-72"
          />
        </div>

        {/* Advanced Filter System */}
        <TableAdvancedFilterSystem
          table={table}
          advancedFilters={advancedFilters}
          setAdvancedFilters={setAdvancedFilters}
        />

        {children}
      </div>

      {/* View Options */}
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}

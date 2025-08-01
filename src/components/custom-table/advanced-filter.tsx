import React from "react";
import { Filter, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TableFilterEditor from "./filter";
import { Table } from "@tanstack/react-table";
import { AdvancedFilter, ColumnMeta } from "./types";

interface TableAdvancedFilterSystemProps {
  table: Table<unknown>;
  advancedFilters: AdvancedFilter[];
  setAdvancedFilters: React.Dispatch<React.SetStateAction<AdvancedFilter[]>>;
}

export default function TableAdvancedFilterSystem({ 
  table, 
  advancedFilters, 
  setAdvancedFilters 
}: TableAdvancedFilterSystemProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const filterableColumns = React.useMemo(
    () => table.getAllColumns().filter((column) => column.getCanFilter()),
    [table]
  );

  const addFilter = () => {
    const firstColumn = filterableColumns[0];
    const columnMeta = firstColumn?.columnDef.meta as ColumnMeta;
    
    let defaultOperator = "contains";
    if (columnMeta?.variant === "select" || columnMeta?.variant === "multiSelect") {
      defaultOperator = "includes";
    } else if (columnMeta?.variant === "date") {
      defaultOperator = "equals";
    } else if (columnMeta?.variant === "number") {
      defaultOperator = "equals";
    }
    
    const newFilter: AdvancedFilter = {
      id: Date.now(),
      column: firstColumn?.id || "",
      operator: defaultOperator,
      value: "",
      conjunction: advancedFilters.length > 0 ? "and" : "",
    };
    setAdvancedFilters([...advancedFilters, newFilter]);
  };

  const removeFilter = (filterId: number) => {
    setAdvancedFilters(advancedFilters.filter(f => f.id !== filterId));
  };

  const updateFilter = (filterId: number, updates: Partial<AdvancedFilter>) => {
    setAdvancedFilters(advancedFilters.map(f => {
      if (f.id === filterId) {
        const updatedFilter = { ...f, ...updates };
        // Auto-set operator based on column type when column changes
        if (updates.column && updates.column !== f.column) {
          const newColumn = filterableColumns.find(c => c.id === updates.column);
          const columnMeta = newColumn?.columnDef.meta as ColumnMeta;
          if (columnMeta?.variant === "select" || columnMeta?.variant === "multiSelect") {
            updatedFilter.operator = "includes";
          } else if (columnMeta?.variant === "date") {
            updatedFilter.operator = "equals";
          } else if (columnMeta?.variant === "number") {
            updatedFilter.operator = "equals";
          } else {
            updatedFilter.operator = "contains";
          }
        }
        return updatedFilter;
      }
      return f;
    }));
  };

  const resetFilters = () => {
    setAdvancedFilters([]);
    table.resetColumnFilters();
  };

  // Apply advanced filters to table
  React.useEffect(() => {
    const filters = advancedFilters.map(filter => ({
      id: filter.column,
      value: filter.value,
    })).filter(f => f.value);
    
    table.setColumnFilters(filters);
  }, [advancedFilters, table]);

  return (
    <div className="flex items-center gap-2">
      {/* Filter button/popover */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="items-center justify-between gap-2 text-sm h-9">
            <Filter className="w-4 h-4 mr-2" />
            Bộ lọc
            {advancedFilters.length > 0 && (
              <span className="items-center justify-center px-2 py-1 text-xs rounded-full bg-primary text-primary-foreground">
                {advancedFilters.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-4" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Bộ lọc xịn</span>
            </div>
            
            {advancedFilters.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Chưa có bộ lọc nào. Hãy nhấn &ldquo;Thêm bộ lọc&rdquo; để bắt đầu.
              </p>
            ) : (
              <div className="space-y-3">
                {advancedFilters.map((filter, index) => (
                  <TableFilterEditor
                    key={filter.id}
                    filter={filter}
                    index={index}
                    columns={filterableColumns}
                    onUpdate={updateFilter}
                    onRemove={removeFilter}
                  />
                ))}
              </div>
            )}
            
            {/* Action buttons at the bottom */}
            <div className="flex items-center gap-2.5 pt-2 border-t">
              <Button
                variant="default"
                size="sm"
                onClick={addFilter}
                className="h-8 font-bold"
              >
                <Plus className="w-4 h-4 mr-1" />
                Thêm bộ lọc
              </Button>
              
              {advancedFilters.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  className="h-8"
                >
                  <X className="w-4 h-4 mr-1" />
                  Xóa bộ lọc
                </Button>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}


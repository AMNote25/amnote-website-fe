import React from "react";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { DataTableDateFilter } from "@/components/data-table/data-table-date-filter";
import { Column } from "@tanstack/react-table";
import { FilterOption, AdvancedFilter } from "./types";

interface TableFilterEditorProps {
  filter: AdvancedFilter;
  index: number;
  columns: Column<any, unknown>[];
  onUpdate: (filterId: number, updates: Partial<AdvancedFilter>) => void;
  onRemove: (filterId: number) => void;
}

export default function TableFilterEditor({ 
  filter, 
  index, 
  columns, 
  onUpdate, 
  onRemove 
}: TableFilterEditorProps) {
  const column = columns.find(c => c.id === filter.column);
  const columnMeta = column?.columnDef.meta as any;

  const getOperators = (variant?: string): FilterOption[] => {
    switch (variant) {
      case "select":
        return [
          { value: "includes", label: "has any of" },
          { value: "excludes", label: "has none of" },
        ];
      case "multiSelect":
        return [
          { value: "includes", label: "has any of" },
          { value: "excludes", label: "has none of" },
        ];
      case "date":
        return [
          { value: "equals", label: "is" },
          { value: "before", label: "is before" },
          { value: "after", label: "is after" },
        ];
      case "number":
        return [
          { value: "equals", label: "equals" },
          { value: "greaterThan", label: "greater than" },
          { value: "lessThan", label: "less than" },
        ];
      default:
        return [
          { value: "contains", label: "contains" },
          { value: "equals", label: "equals" },
          { value: "startsWith", label: "starts with" },
        ];
    }
  };

  const operators = getOperators(columnMeta?.variant);

  const renderValueInput = () => {
    if (!column) {
      return (
        <Input
          placeholder="Enter value..."
          value={filter.value}
          onChange={(e) => onUpdate(filter.id, { value: e.target.value })}
          className="w-full h-9"
        />
      );
    }

    switch (columnMeta?.variant) {
      case "select":
      case "multiSelect":
        return (
          <DataTableFacetedFilter
            column={column}
            title="Select options..."
            options={columnMeta.options || []}
            multiple={true}
          />
        );
      case "date":
        return (
          <DataTableDateFilter
            column={column}
            title="Select date..."
            multiple={false}
          />
        );
      default:
        return (
          <Input
            placeholder="Enter value..."
            value={filter.value}
            onChange={(e) => onUpdate(filter.id, { value: e.target.value })}
            className="w-full h-9"
          />
        );
    }
  };

  return (
    <div className="w-fit">
      <div className="flex items-center justify-between gap-2.5">
        {/* Where/Conjunction Selector */}
        {index === 0 ? (
          <div className="flex items-center justify-center w-20">
            <span className="text-sm font-medium text-muted-foreground">
              Where
            </span>
          </div>
        ) : (
          <Select
            value={filter.conjunction}
            onValueChange={(value) => onUpdate(filter.id, { conjunction: value })}
          >
            <SelectTrigger className="w-20 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="and">and</SelectItem>
              <SelectItem value="or">or</SelectItem>
            </SelectContent>
          </Select>
        )}
        
        {/* Column Selector */}
        <div className="w-32">
          <Select
            value={filter.column}
            onValueChange={(value) => onUpdate(filter.id, { column: value })}
          >
            <SelectTrigger className="w-full h-9">
              <SelectValue placeholder="Select column..." />
            </SelectTrigger>
            <SelectContent>
              {columns.map((column) => (
                <SelectItem key={column.id} value={column.id}>
                  {column.columnDef.meta?.label || column.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Operator Selector */}
        <div className="w-32">
          <Select
            value={filter.operator}
            onValueChange={(value) => onUpdate(filter.id, { operator: value })}
          >
            <SelectTrigger className="w-full h-9">
              <SelectValue placeholder="Select operator..." />
            </SelectTrigger>
            <SelectContent>
              {operators.map((op) => (
                <SelectItem key={op.value} value={op.value}>
                  {op.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Value Input */}
        <div className="w-48">
          {renderValueInput()}
        </div>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(filter.id)}
          className="flex-shrink-0 w-8 h-8 p-0 border border-gray-300"
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}


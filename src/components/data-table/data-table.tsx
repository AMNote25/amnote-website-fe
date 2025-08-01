import { flexRender, type Table as TanstackTable } from "@tanstack/react-table";
import * as React from "react";

import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  EyeOff,
  Scroll,
} from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { ScrollArea } from "../ui/scroll-area";

interface RowAction {
  label: string;
  icon?: React.ReactNode;
  onClick: (data: any) => void;
  className?: string;
  separator?: boolean;
}

interface DataTableProps<TData> extends React.ComponentProps<"div"> {
  table: TanstackTable<TData>;
  actionBar?: React.ReactNode;
  rowActions?: RowAction[];
}

export function DataTable<TData>({
  table,
  actionBar,
  rowActions,
  children,
  className,
  ...props
}: DataTableProps<TData>) {
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  const handleDropdownOpen = (headerId: string) => {
    setOpenDropdown(headerId);
  };

  return (
    <div className={cn("flex w-full flex-col gap-2.5", className)} {...props}>
      {children}

      <div className="border rounded-md">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {/* ✅ Checkbox header */}
                <TableHead className="rounded-tl-2xl flex justify-center items-center sticky left-0 z-20 bg-white w-[50px]">
                  <input
                    type="checkbox"
                    checked={table.getIsAllRowsSelected()}
                    onChange={(e) =>
                      table.toggleAllRowsSelected(e.target.checked)
                    }
                  />
                </TableHead>

                {/* Các header khác */}
                {headerGroup.headers
                  .filter((h) => h.column.id !== "select")
                  .map((header) => (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(
                        "bg-background border-b font-bold whitespace-nowrap",
                        header.column.id === "actions" && "text-right"
                      )}
                      style={{
                        width: header.column.columnDef.size
                          ? `${header.column.columnDef.size}px`
                          : undefined,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}

                        {header.column.getCanSort() ||
                        header.column.getCanHide() ? (
                          <DropdownMenu
                            open={openDropdown === header.id}
                            onOpenChange={(open) => {
                              if (open) handleDropdownOpen(header.id);
                              else setOpenDropdown(null);
                            }}
                          >
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-6 h-6 p-0 hover:bg-muted"
                              >
                                <ChevronsUpDown className="w-3 h-3" />
                                <span className="sr-only">Column options</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {header.column.getCanSort() && (
                                <>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      header.column.toggleSorting(false)
                                    }
                                  >
                                    <ChevronUp className="w-4 h-4 mr-2" />
                                    Sort Ascending
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      header.column.toggleSorting(true)
                                    }
                                  >
                                    <ChevronDown className="w-4 h-4 mr-2" />
                                    Sort Descending
                                  </DropdownMenuItem>
                                  {header.column.getCanHide() && (
                                    <DropdownMenuSeparator />
                                  )}
                                </>
                              )}
                              {header.column.getCanHide() && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    header.column.toggleVisibility(false)
                                  }
                                >
                                  <EyeOff className="w-4 h-4 mr-2" />
                                  Hide Column
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : null}
                      </div>
                    </TableHead>
                  ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <ContextMenu key={row.id}>
                  <ContextMenuTrigger asChild>
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="hover:bg-muted cursor-pointer"
                    >
                      {/* ✅ Checkbox từng dòng */}
                      <TableCell className="h-12 flex justify-center items-center sticky left-0 z-10 bg-white w-[50px]">
                        <input
                          type="checkbox"
                          checked={row.getIsSelected()}
                          onChange={(e) => row.toggleSelected(e.target.checked)}
                        />
                      </TableCell>

                      {/* Các cell dữ liệu */}
                      {row
                        .getVisibleCells()
                        .filter((cell) => cell.column.id !== "select")
                        .map((cell) => (
                          <TableCell
                            key={cell.id}
                            className={cn(
                              "whitespace-nowrap",
                              cell.column.id === "actions" && "text-right"
                            )}
                            style={{
                              width: cell.column.columnDef.size
                                ? `${cell.column.columnDef.size}px`
                                : undefined,
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                    </TableRow>
                  </ContextMenuTrigger>

                  {rowActions && rowActions.length > 0 && (
                    <ContextMenuContent className="w-fit">
                      {rowActions.map((action, index) => (
                        <div key={index}>
                          <ContextMenuItem
                            onClick={() => action.onClick(row.original)}
                            className={action.className}
                          >
                            {action.icon && (
                              <span className="w-4 h-4 mr-2">
                                {action.icon}
                              </span>
                            )}
                            {action.label}
                          </ContextMenuItem>
                          {action.separator && <ContextMenuSeparator />}
                        </div>
                      ))}
                    </ContextMenuContent>
                  )}
                </ContextMenu>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length + 1} // +1 vì có cột checkbox
                  className="h-24 text-center"
                >
                  Không có dữ liệu. Hãy thử lại nhé. ^_^
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-2.5">
        <DataTablePagination table={table} />
        {actionBar &&
          table.getFilteredSelectedRowModel().rows.length > 0 &&
          actionBar}
      </div>
    </div>
  );
}

export interface AdvancedFilter {
  id: number;
  column: string;
  operator: string;
  value: string;
  conjunction: string;
}

export interface ActionBarItem<T = unknown> {
  icon: string;
  onClick: (selectedRows: T[]) => void;
  tooltip: string;
  variant?: "destructive" | "default";
  disabled?: boolean;
}

export interface RowAction<T = unknown> {
  label: string;
  icon?: React.ReactNode;
  onClick: (data: T) => void;
  className?: string;
  separator?: boolean;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface ColumnMeta {
  label?: string;
  variant?: "select" | "multiSelect" | "date" | "number" | "text";
  options?: FilterOption[];
}

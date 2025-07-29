export interface AdvancedFilter {
  id: number;
  column: string;
  operator: string;
  value: string;
  conjunction: string;
}

export interface ActionBarItem {
  icon: string;
  onClick: (selectedRows: any[]) => void;
  tooltip: string;
  variant?: "destructive" | "default";
  disabled?: boolean;
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

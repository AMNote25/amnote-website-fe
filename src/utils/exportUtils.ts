import * as XLSX from "xlsx";

/**
 * Generic export to Excel utility
 */
export function exportTableToExcel<T>(
  data: T[],
  headers: string[],
  columns: (keyof T)[],
  filename: string,
  columnWidths?: { wch: number }[],
  sheetName: string = "Sheet1"
): void {
  if (data.length === 0) throw new Error("Không có dữ liệu để xuất");

  const exportData = data.map(row =>
    columns.map(key => row[key] ?? "")
  );

  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...exportData]);
  if (columnWidths) worksheet["!cols"] = columnWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  XLSX.writeFile(workbook, filename);
}

export function generateExportFilename(prefix: string = "Export"): string {
  const currentDate = new Date().toISOString().split('T')[0];
  return `${prefix}_${currentDate}.xlsx`;
}
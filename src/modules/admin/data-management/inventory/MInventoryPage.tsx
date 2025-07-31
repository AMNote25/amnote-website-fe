import Title from "@/components/ui/title";
import getPageTitle from "@/utils/getPageTitle";
import { usePathname } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/react";
import {
  getAllInventory,
  deleteInventory,
} from "@/api/services/service_Inventory";
import { useEffect, useState } from "react";
import { InventoryItem } from "@/api/types/inventory";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import {
  MInventoryExportAll,
  MInventoryExportSelected,
  exportSelectedInventory,
} from "./MInventoryExport";
import MInventoryTable from "./MInventoryTable";
import MInventoryImport from "./MInventoryImport";
import MInventoryInsert from "./MInventoryInsert";

export default function InventoryPage() {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllInventory();
      setInventoryData(response.data || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load inventory data"
      );
      setInventoryData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const actionBarItems = [
    {
      icon: "file-down",
      onClick: (selectedRows: InventoryItem[]) => {
        exportSelectedInventory(selectedRows);
      },
      tooltip: "Export selected inventory items",
    },
    {
      icon: "trash-2",
      onClick: async (selectedRows: InventoryItem[]) => {
        if (
          confirm(`Delete ${selectedRows.length} selected inventory items?`)
        ) {
          try {
            // Delete each selected item
            const deletePromises = selectedRows.map((item) =>
              deleteInventory(item.PRODUCT_CD)
            );
            await Promise.all(deletePromises);

            // Refresh the data after deletion
            await fetchData();

            alert(
              `${selectedRows.length} inventory items deleted successfully!`
            );
          } catch (error) {
            console.error("Error deleting inventory items:", error);
            alert("Failed to delete some inventory items. Please try again.");
          }
        }
      },
      tooltip: "Delete selected inventory items",
      variant: "destructive" as const,
    },
  ];

  return (
    <NuqsAdapter>
      <div className="h-full p-6 overflow-auto custom-scroll">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Title
              title={pageTitle ? pageTitle.title : "Trang"}
              subtitle={pageTitle ? pageTitle.subtitle : ""}
              icon={pageTitle ? pageTitle.icon : "question-mark-circle"}
            />
            <div className="flex items-center gap-2">
              {/* Replace these button with module buttons for each module is a separate button */}
              <MInventoryExportAll data={inventoryData} loading={loading} />
              <MInventoryImport />
              <MInventoryInsert />
            </div>
          </div>
          {/* Insert the toolbar here */}
          {loading ? (
            <DataTableSkeleton
              columnCount={16}
              rowCount={8}
              cellWidths={[
                "50px",
                "120px",
                "200px",
                "150px",
                "100px",
                "100px",
                "120px",
                "100px",
                "120px",
                "120px",
                "100px",
                "100px",
                "100px",
                "100px",
                "100px",
                "80px",
              ]}
              withPagination={true}
              withViewOptions={true}
            />
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-red-500">Error: {error}</div>
            </div>
          ) : (
            <MInventoryTable
              data={inventoryData}
              actionBarItems={actionBarItems}
              onDataChange={fetchData}
            />
          )}
        </div>
      </div>
    </NuqsAdapter>
  );
}

import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import Title from "@/components/ui/title";
import getPageTitle from "@/utils/getPageTitle";
import { usePathname } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/react";
import MInventoryTable from "./MInventoryTable";

export default function InventoryPage() {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);


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
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Export functionality
                  alert("Export functionality");
                }}
                className="flex items-center gap-2"
              >
                <Icon name="download" size="sm" />
                Xuất dữ liệu
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Import functionality
                  alert("Import functionality");
                }}
                className="flex items-center gap-2"
              >
                <Icon name="upload" size="sm" />
                Nhập dữ liệu
              </Button>
            </div>
          </div>
          {/* Insert the toolbar here */}
          <MInventoryTable />
        </div>
      </div>
    </NuqsAdapter>
  );
}

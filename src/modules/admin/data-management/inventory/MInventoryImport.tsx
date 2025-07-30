import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export default function MInventoryImport() {
  return (
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
  );
}

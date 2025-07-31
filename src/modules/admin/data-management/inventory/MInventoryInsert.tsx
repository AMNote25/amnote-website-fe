import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Archive, Plus, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import FInput from "@/components/adaptive-form/form-input";
import FSwitch from "@/components/adaptive-form/form-switch";
import FTextarea from "@/components/adaptive-form/form-textarea";
import { insertInventory } from "@/api/services/service_Inventory";
import { toast } from "sonner";
import type { InventoryPayload } from "@/api/types/inventoryPayload";

// Field config
const INVENTORY_INSERT_FIELDS: {
  key: keyof InventoryPayload;
  label: string;
  type: "string" | "number" | "boolean";
}[] = [
  { key: "PRODUCT_CD", label: "Mã sản phẩm", type: "string" },
  { key: "DivisionCD", label: "Mã phân loại", type: "string" },
  { key: "PRODUCTKIND_CD", label: "Mã loại sản phẩm", type: "string" },
  { key: "DepartmentCD", label: "Mã phòng ban", type: "string" },
  { key: "PRODUCT_NM", label: "Tên sản phẩm", type: "string" },
  { key: "PRODUCT_NM_ENG", label: "Tên sản phẩm (EN)", type: "string" },
  { key: "PRODUCT_NM_KOR", label: "Tên sản phẩm (KR)", type: "string" },
  { key: "InboundUnitCD", label: "Đơn vị nhập kho", type: "string" },
  { key: "OutboundUnitCD", label: "Đơn vị xuất kho", type: "string" },
  { key: "materialInputUnitCD", label: "Đơn vị nhập nguyên liệu", type: "string" },
  { key: "StockUnitCD", label: "Đơn vị tồn kho", type: "string" },
  { key: "InboundQuantity", label: "Số lượng nhập kho", type: "number" },
  { key: "OutboundQuantity", label: "Số lượng xuất kho", type: "number" },
  { key: "MaterialInputQuantity", label: "Số lượng nhập nguyên liệu", type: "number" },
  { key: "StoreCD", label: "Kho hàng", type: "string" },
  { key: "StandardCD", label: "Tiêu chuẩn sản phẩm", type: "string" },
  { key: "FitnessStock", label: "Tồn kho an toàn", type: "number" },
  { key: "UnitPrice", label: "Giá đơn vị (CC)", type: "number" },
  { key: "FcUnitPirce", label: "Giá đơn vị (FC)", type: "number" },
  { key: "ExRate", label: "Tỷ giá hối đoái", type: "number" },
  { key: "lblCCType", label: "Loại CC", type: "string" },
  { key: "lblFCType", label: "Loại FC", type: "string" },
  { key: "txtSummary", label: "Tóm tắt sản phẩm", type: "string" },
  { key: "rgUseNotUse", label: "Trạng thái sử dụng", type: "boolean" },
  { key: "HaveChildBOM", label: "Có BOM con", type: "boolean" },
  { key: "Origin", label: "Nguồn gốc", type: "string" },
];

export default function MInventoryInsert() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Default Y cho boolean fields
  const [formData, setFormData] = useState<Partial<InventoryPayload>>({
    rgUseNotUse: "1",
    HaveChildBOM: "Y",
  });

  const totalFields = INVENTORY_INSERT_FIELDS.length;
  const estimatedHeight = Math.min(totalFields * 80 + 200, window.innerHeight * 0.8);

  const handleInputChange = (key: keyof InventoryPayload, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validatePayload = (): string | null => {
    if (!formData.PRODUCT_CD) return "Mã sản phẩm không được để trống";
    if (!formData.PRODUCT_NM) return "Tên sản phẩm không được để trống";
    return null;
  };

  const handleSave = async () => {
    const error = validatePayload();
    if (error) {
      toast.error(error);
      return;
    }

    setIsLoading(true);
    try {
      const payload: InventoryPayload = {
        PRODUCT_CD: formData.PRODUCT_CD || "",
        DivisionCD: formData.DivisionCD || "",
        PRODUCTKIND_CD: formData.PRODUCTKIND_CD || "",
        DepartmentCD: formData.DepartmentCD || "",
        PRODUCT_NM: formData.PRODUCT_NM || "",
        PRODUCT_NM_ENG: formData.PRODUCT_NM_ENG || "",
        PRODUCT_NM_KOR: formData.PRODUCT_NM_KOR || "",
        InboundUnitCD: formData.InboundUnitCD || "",
        OutboundUnitCD: formData.OutboundUnitCD || "",
        materialInputUnitCD: formData.materialInputUnitCD || "",
        StockUnitCD: formData.StockUnitCD || "",
        InboundQuantity: formData.InboundQuantity ?? 0,
        OutboundQuantity: formData.OutboundQuantity ?? 0,
        MaterialInputQuantity: formData.MaterialInputQuantity ?? 0,
        StoreCD: formData.StoreCD || "",
        StandardCD: formData.StandardCD || "",
        FitnessStock: String(formData.FitnessStock ?? 0),
        UnitPrice: String(formData.UnitPrice ?? 0),
        FcUnitPirce: String(formData.FcUnitPirce ?? 0),
        ExRate: String(formData.ExRate ?? 1),
        lblCCType: formData.lblCCType || "",
        lblFCType: formData.lblFCType || "",
        txtSummary: formData.txtSummary || "",
        // ✅ giữ Y mặc định
        rgUseNotUse: "1",
        HaveChildBOM: "Y",
        Origin: formData.Origin || "",
      };

      const result = await insertInventory(payload);
      if (result.status === "success") {
        toast.success("Thêm sản phẩm thành công!");
        handleCancel();
      } else {
        const errorMsg = Array.isArray(result?.messages)
          ? result.messages.join(", ")
          : result?.messages || "Có lỗi xảy ra khi thêm sản phẩm";
        toast.error(errorMsg);
      }
    } catch (err: any) {
      toast.error(err?.message || "Có lỗi xảy ra khi thêm sản phẩm");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setFormData({
      rgUseNotUse: "1",
      HaveChildBOM: "Y",
    });
  };

  const renderField = (field: typeof INVENTORY_INSERT_FIELDS[number]) => {
    const value = formData[field.key];
    switch (field.type) {
      case "boolean":
        return (
          <FSwitch
            key={field.key}
            accessorKey={field.key}
            label={field.label}
            value={value === "Y"}
            onChange={(key, val) =>
              handleInputChange(key as keyof InventoryPayload, val ? "Y" : "N")
            }
          />
        );
      case "number":
        return (
          <FInput
            key={field.key}
            accessorKey={field.key}
            label={field.label}
            value={Number(value) || 0}
            onChange={(key, val) =>
              handleInputChange(key as keyof InventoryPayload, Number(val))
            }
            placeholder={`Nhập ${field.label}`}
          />
        );
      default:
        if (field.key === "txtSummary") {
          return (
            <FTextarea
              key={field.key}
              accessorKey={field.key}
              label={field.label}
              value={String(value || "")}
              onChange={(key, val) =>
                handleInputChange(key as keyof InventoryPayload, val)
              }
              rows={3}
              placeholder={`Nhập ${field.label}`}
            />
          );
        }
        return (
          <FInput
            key={field.key}
            accessorKey={field.key}
            label={field.label}
            value={String(value || "")}
            onChange={(key, val) =>
              handleInputChange(key as keyof InventoryPayload, val)
            }
            placeholder={`Nhập ${field.label}`}
          />
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button variant="default" size="sm" className="flex items-center gap-2">
          <Icon name="plus" size="sm" />
          Thêm sản phẩm
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-am-red">
            <Archive size="16" />
            Thêm sản phẩm
          </DialogTitle>
          <DialogDescription>
            Vui lòng điền thông tin sản phẩm mới vào biểu mẫu dưới đây.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-background-primary overflow-hidden">
          <ScrollArea style={{ height: `${estimatedHeight}px` }} className="max-h-[70vh]">
            <div className="space-y-4">
              {INVENTORY_INSERT_FIELDS.map((field) => renderField(field))}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
            <X size="16" />
            Hủy bỏ
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                Đang lưu...
              </>
            ) : (
              <>
                <Plus size="16" />
                Thêm sản phẩm
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

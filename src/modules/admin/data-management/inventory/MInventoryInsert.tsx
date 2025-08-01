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
import { Archive, CheckCircle, Plus, TriangleAlert, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import FInput from "@/components/adaptive-form/form-input";
import FSwitch from "@/components/adaptive-form/form-switch";
import FTextarea from "@/components/adaptive-form/form-textarea";
import { insertInventory } from "@/api/services/service_Inventory";
import { toast } from "sonner";
import type { InventoryPayload } from "@/api/types/inventoryPayload";
import { INVENTORY_FIELDS } from "@/constants/CInventory";

export default function MInventoryInsert() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Default Y cho boolean fields
  const [formData, setFormData] = useState<Partial<InventoryPayload>>({
    rgUseNotUse: "1",
    HaveChildBOM: "Y",
  });

  const totalFields = INVENTORY_FIELDS.length;
  const estimatedHeight = Math.min(
    totalFields * 80 + 200,
    window.innerHeight * 0.8
  );

  const handleInputChange = (
    key: keyof InventoryPayload,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validatePayload = (): string | null => {
    if (!formData.PRODUCT_CD) return "Mã sản phẩm không được để trống";
    if (!formData.PRODUCT_NM) return "Tên sản phẩm không được để trống";
    if (!formData.DivisionCD) return "Mã phân loại không được để trống";
    if (!formData.PRODUCTKIND_CD) return "Mã loại sản phẩm không được để trống";
    if (!formData.DepartmentCD) return "Mã phòng ban không được để trống";
    if (!formData.StockUnitCD) return "Đơn vị tồn kho không được để trống";
    if (!formData.StoreCD) return "Kho hàng không được để trống";
    if (!formData.UnitPrice) return "Giá đơn vị (CC) không được để trống";
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
        Lag: formData.Lag || "", // Optional field
      };

      const result = await insertInventory(payload);
      if (result.status === "success") {
        toast.success("Thêm sản phẩm thành công!", {
          icon: <CheckCircle className="text-green-500" />,
          style: {
            gap: "1rem",
          },
        });
        handleCancel();
      } else {
        const errorMsg = Array.isArray(result?.messages)
          ? result.messages.join(", ")
          : result?.messages || "Có lỗi xảy ra khi thêm sản phẩm";
        toast.error(errorMsg);
      }
    } catch (err: any) {
      toast.error(err?.message || "Có lỗi xảy ra khi thêm sản phẩm", {
        icon: <TriangleAlert className="text-red-500" />,
        style: {
          gap: "1rem",
        },
      });
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

  const renderField = (field: (typeof INVENTORY_FIELDS)[number]) => {
    const value = formData[field.key];
    const colSpan = field.colspan || 1;
    const gridColClass = colSpan === 2 ? "col-span-2" : "col-span-1";

    switch (field.type) {
      case "boolean":
        return (
          <div key={field.key} className={gridColClass}>
            <FSwitch
              accessorKey={field.key}
              label={field.label}
              value={value === "Y"}
              onChange={(key, val) =>
                handleInputChange(
                  key as keyof InventoryPayload,
                  val ? "Y" : "N"
                )
              }
              variant={field.required ? "compulsory" : "optional"}
            />
          </div>
        );
      case "number":
        return (
          <div key={field.key} className={gridColClass}>
            <FInput
              accessorKey={field.key}
              label={field.label}
              value={Number(value) || 0}
              onChange={(key, val) =>
                handleInputChange(key as keyof InventoryPayload, Number(val))
              }
              placeholder={`Nhập ${field.label}`}
              variant={field.required ? "compulsory" : "optional"}
            />
          </div>
        );
      default:
        if (field.key === "txtSummary") {
          return (
            <div key={field.key} className={gridColClass}>
              <FTextarea
                accessorKey={field.key}
                label={field.label}
                value={String(value || "")}
                onChange={(key, val) =>
                  handleInputChange(key as keyof InventoryPayload, val)
                }
                rows={3}
                placeholder={`Nhập ${field.label}`}
                variant={field.required ? "compulsory" : "optional"}
              />
            </div>
          );
        }
        return (
          <div key={field.key} className={gridColClass}>
            <FInput
              accessorKey={field.key}
              label={field.label}
              value={String(value || "")}
              onChange={(key, val) =>
                handleInputChange(key as keyof InventoryPayload, val)
              }
              placeholder={`Nhập ${field.label}`}
              variant={field.required ? "compulsory" : "optional"}
            />
          </div>
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
          <ScrollArea
            style={{ height: `${estimatedHeight}px` }}
            className="max-h-[70vh]"
          >
            <div className="grid grid-cols-2 gap-4">
              {INVENTORY_FIELDS.map((field) => renderField(field))}
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

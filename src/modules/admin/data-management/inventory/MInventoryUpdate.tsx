"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, Edit, Save, X, CheckCircle, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import FInput from "@/components/adaptive-form/form-input";
import FSwitch from "@/components/adaptive-form/form-switch";
import FTextarea from "@/components/adaptive-form/form-textarea";
import { updateInventory } from "@/api/services/service_Inventory";
import type { InventoryItem } from "@/api/types/inventory";
import type { InventoryPayload } from "@/api/types/inventoryPayload";
import { INVENTORY_FIELDS } from "@/constants/CInventory";

interface MInventoryUpdateProps {
  item: InventoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  mode?: "view" | "edit";
}

export default function MInventoryUpdate({
  item,
  isOpen,
  onClose,
  onSuccess,
  mode: initialMode = "view",
}: MInventoryUpdateProps) {
  const [mode, setMode] = useState<"view" | "edit">(initialMode);
  const [formData, setFormData] = useState<InventoryPayload>({
    PRODUCT_CD: "",
    DivisionCD: "",
    PRODUCTKIND_CD: "",
    DepartmentCD: "",
    PRODUCT_NM: "",
    PRODUCT_NM_ENG: "",
    PRODUCT_NM_KOR: "",
    InboundUnitCD: "",
    OutboundUnitCD: "",
    materialInputUnitCD: "",
    StockUnitCD: "",
    InboundQuantity: 0,
    OutboundQuantity: 0,
    MaterialInputQuantity: 0,
    StoreCD: "",
    StandardCD: "",
    FitnessStock: "",
    UnitPrice: "",
    FcUnitPirce: "",
    ExRate: "",
    lblCCType: "",
    lblFCType: "",
    txtSummary: "",
    rgUseNotUse: "1",
    HaveChildBOM: "Y",
    Origin: "",
    Lag: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [originalData, setOriginalData] = useState<InventoryPayload | null>(
    null
  );
  const totalFields = INVENTORY_FIELDS.length;
  const estimatedHeight = Math.min(
    totalFields * 80 + 200,
    window.innerHeight * 0.8
  );

  // Convert InventoryItem to InventoryPayload format
  const mapItemToPayload = (item: InventoryItem): InventoryPayload => {
    return {
      PRODUCT_CD: item.PRODUCT_CD,
      DivisionCD: item.DIVISION_CD,
      PRODUCTKIND_CD: item.PRODUCTKIND_CD,
      DepartmentCD: item.DEPARTMENT_CD,
      PRODUCT_NM: item.PRODUCT_NM,
      PRODUCT_NM_ENG: item.PRODUCT_NM_ENG,
      PRODUCT_NM_KOR: item.PRODUCT_NM_KOR,
      InboundUnitCD: item.INBOUND_UNIT,
      OutboundUnitCD: item.OUTBOUND_UNIT,
      materialInputUnitCD: item.MATERIALINPUT_UNIT,
      StockUnitCD: item.STOCK_UNIT,
      InboundQuantity: item.INBOUND_QUANTITY || 0,
      OutboundQuantity: item.OUTBOUND_QUANTITY || 0,
      MaterialInputQuantity: item.MATERIALINPUT_QUANTITY || 0,
      StoreCD: item.STORE_CD,
      StandardCD: item.STANDARD_CD,
      FitnessStock: item.FITNESS_STOCK.toString(),
      UnitPrice: item.UNIT_PRICE_CC.toString(),
      FcUnitPirce: item.UNIT_PRICE_FC.toString(),
      ExRate: item.EX_RATE.toString(),
      lblCCType: item.CC_TYPE,
      lblFCType: item.FC_TYPE,
      txtSummary: item.SUMMARY,
      rgUseNotUse: "1", // Always set to '1' as per payload requirement
      HaveChildBOM: "Y", // Default value
      Origin: item.ORIGIN,
      Lag: "", // Optional field, default to empty string
    };
  };

  // Load item data when dialog opens
  useEffect(() => {
    if (item && isOpen) {
      const payload = mapItemToPayload(item);
      setFormData(payload);
      setOriginalData(payload);
      setMode(initialMode);
    }
  }, [item, isOpen, initialMode]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setMode("view");
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleInputChange = (
    field: keyof InventoryPayload,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderField = (field: (typeof INVENTORY_FIELDS)[number]) => {
    const value = formData[field.key];
    const isFieldReadOnly = isReadOnly || field.readOnly;
    const colSpan = field.colspan || 1;
    const gridColClass = colSpan === 2 ? "col-span-2" : "col-span-1";

    switch (field.type) {
      case "boolean":
        return (
          <div key={field.key} className={gridColClass}>
            <FSwitch
              accessorKey={field.key}
              label={field.label}
              value={value === "Y" || value === "1"}
              onChange={
                isFieldReadOnly
                  ? () => {}
                  : (key, val) =>
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
              onChange={
                isFieldReadOnly
                  ? () => {}
                  : (key, val) =>
                      handleInputChange(
                        key as keyof InventoryPayload,
                        Number(val)
                      )
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
                onChange={
                  isFieldReadOnly
                    ? () => {}
                    : (key, val) =>
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
              onChange={
                isFieldReadOnly
                  ? () => {}
                  : (key, val) =>
                      handleInputChange(key as keyof InventoryPayload, val)
              }
              placeholder={`Nhập ${field.label}`}
              variant={field.required ? "compulsory" : "optional"}
            />
          </div>
        );
    }
  };

  const handleSubmit = async () => {
    if (!item) return;

    try {
      setIsSubmitting(true);

      await updateInventory(formData);

      toast.success("Cập nhật sản phẩm thành công!", {
        icon: <CheckCircle className="text-green-500" />,
        style: {
          gap: "1rem",
        },
      });
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Error updating inventory:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra khi cập nhật sản phẩm",
        {
          icon: <TriangleAlert className="text-red-500" />,
          style: {
            gap: "1rem",
          },
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (mode === "edit" && originalData) {
      setFormData(originalData);
      setMode("view");
    } else {
      onClose();
    }
  };

  const isReadOnly = mode === "view";
  const isIdField = (field: string) => field === "PRODUCT_CD"; // Primary key fields that cannot be edited

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-am-red">
            {mode === "view" ? (
              <>
                <Eye size={16} /> Xem chi tiết sản phẩm
              </>
            ) : (
              <>
                <Edit size={16} /> Chỉnh sửa sản phẩm
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {mode === "view"
              ? "Thông tin chi tiết của sản phẩm"
              : "Chỉnh sửa thông tin sản phẩm (các trường có dấu * là bắt buộc)"}
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

        <DialogFooter className="flex gap-2">
          {mode === "view" ? (
            <>
              <Button variant="outline" onClick={onClose}>
                <X className="h-4 w-4 mr-2" />
                Đóng
              </Button>
              <Button onClick={() => setMode("edit")}>
                <Edit className="h-4 w-4 mr-2" />
                Chỉnh sửa
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Hủy
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useDictionary } from "@/i18n/provider";

interface Discount {
  id: number;
  title: string;
  discount_value: string;
  description: string | null;
  terms: string | null;
  valid_from: string | null;
  valid_to: string | null;
  is_active: boolean;
}

interface DiscountFormDialogProps {
  partnerId: number;
  discount: Discount | null;
  onClose: () => void;
  onSaved: () => void;
}

export function DiscountFormDialog({
  partnerId,
  discount,
  onClose,
  onSaved,
}: DiscountFormDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isEdit = !!discount;
  const t = useDictionary();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const body = {
      partner_id: partnerId,
      title: formData.get("title"),
      discount_value: formData.get("discount_value"),
      description: formData.get("description") || null,
      terms: formData.get("terms") || null,
      valid_from: formData.get("valid_from") || null,
      valid_to: formData.get("valid_to") || null,
    };

    const url = isEdit ? `/api/discounts/${discount.id}` : "/api/discounts";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || t.admin.error.title);
      setLoading(false);
      return;
    }

    onSaved();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {isEdit ? t.admin.discountForm.editTitle : t.admin.discountForm.newTitle}
          </h3>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">{t.admin.discountForm.title}</Label>
            <Input
              id="title"
              name="title"
              required
              defaultValue={discount?.title || ""}
              placeholder={t.admin.discountForm.titlePlaceholder}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="discount_value">{t.admin.discountForm.value}</Label>
            <Input
              id="discount_value"
              name="discount_value"
              required
              defaultValue={discount?.discount_value || ""}
              placeholder={t.admin.discountForm.valuePlaceholder}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t.admin.discountForm.description}</Label>
            <Textarea
              id="description"
              name="description"
              rows={2}
              defaultValue={discount?.description || ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="terms">{t.admin.discountForm.terms}</Label>
            <Input
              id="terms"
              name="terms"
              defaultValue={discount?.terms || ""}
              placeholder={t.admin.discountForm.termsPlaceholder}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valid_from">{t.admin.discountForm.validFrom}</Label>
              <Input
                id="valid_from"
                name="valid_from"
                type="date"
                defaultValue={discount?.valid_from || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="valid_to">{t.admin.discountForm.validUntil}</Label>
              <Input
                id="valid_to"
                name="valid_to"
                type="date"
                defaultValue={discount?.valid_to || ""}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? t.admin.discountForm.saving : isEdit ? t.admin.discountForm.update : t.admin.discountForm.create}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              {t.admin.discountForm.cancel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

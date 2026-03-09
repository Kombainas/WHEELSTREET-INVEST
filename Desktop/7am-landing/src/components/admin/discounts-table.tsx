"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DiscountFormDialog } from "./discount-form";
import { Plus, Trash2, Pencil } from "lucide-react";
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

interface DiscountsTableProps {
  partnerId: number;
  discounts: Discount[];
}

export function DiscountsTable({ partnerId, discounts }: DiscountsTableProps) {
  const [showForm, setShowForm] = useState(false);
  const [editDiscount, setEditDiscount] = useState<Discount | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);
  const router = useRouter();
  const t = useDictionary();

  async function handleDelete(id: number) {
    setDeleting(id);
    const res = await fetch(`/api/discounts/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
    setDeleting(null);
  }

  return (
    <div className="bg-white p-6 rounded-xl border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {t.admin.discountsTable.title} ({discounts.length})
        </h2>
        <Button size="sm" onClick={() => { setEditDiscount(null); setShowForm(true); }}>
          <Plus className="w-4 h-4 mr-1" />
          {t.admin.discountsTable.add}
        </Button>
      </div>

      {discounts.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4">
          {t.admin.discountsTable.empty}
        </p>
      ) : (
        <div className="space-y-3">
          {discounts.map((d) => (
            <div
              key={d.id}
              className="border rounded-lg p-3 flex items-start justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{d.title}</span>
                  <span className="text-xs font-bold text-blue-600">
                    {d.discount_value}
                  </span>
                  {!d.is_active && (
                    <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                      {t.admin.discountsTable.inactive}
                    </span>
                  )}
                </div>
                {d.description && (
                  <p className="text-xs text-gray-500 mt-1">{d.description}</p>
                )}
                {d.terms && (
                  <p className="text-xs text-gray-400 mt-1">* {d.terms}</p>
                )}
              </div>
              <div className="flex items-center gap-1 ml-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={() => { setEditDiscount(d); setShowForm(true); }}
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                  disabled={deleting === d.id}
                  onClick={() => handleDelete(d.id)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <DiscountFormDialog
          partnerId={partnerId}
          discount={editDiscount}
          onClose={() => { setShowForm(false); setEditDiscount(null); }}
          onSaved={() => { setShowForm(false); setEditDiscount(null); router.refresh(); }}
        />
      )}
    </div>
  );
}

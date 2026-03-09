"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDictionary } from "@/i18n/provider";

interface PartnerFormProps {
  partnerId?: number;
  defaultValues?: {
    name?: string;
    category?: string;
    description?: string;
    website?: string;
    location?: string;
  };
}

const categories = [
  "restaurant",
  "cafe",
  "gym",
  "wellness",
  "shop",
  "other",
] as const;

export function PartnerForm({ partnerId, defaultValues }: PartnerFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const isEdit = !!partnerId;
  const t = useDictionary();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get("name"),
      category: formData.get("category"),
      description: formData.get("description"),
      website: formData.get("website"),
      location: formData.get("location"),
    };

    const url = isEdit ? `/api/partners/${partnerId}` : "/api/partners";
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

    if (isEdit) {
      router.refresh();
    } else {
      const data = await res.json();
      router.push(`/admin/partners/${data.id}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      <div className="space-y-2">
        <Label htmlFor="name">{t.admin.partnerForm.name}</Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={defaultValues?.name || ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">{t.admin.partnerForm.category}</Label>
        <select
          id="category"
          name="category"
          defaultValue={defaultValues?.category || "other"}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {t.admin.partnerForm.categories[cat]}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">{t.admin.partnerForm.description}</Label>
        <Textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={defaultValues?.description || ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">{t.admin.partnerForm.website}</Label>
        <Input
          id="website"
          name="website"
          type="url"
          placeholder={t.admin.partnerForm.websitePlaceholder}
          defaultValue={defaultValues?.website || ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">{t.admin.partnerForm.location}</Label>
        <Input
          id="location"
          name="location"
          placeholder={t.admin.partnerForm.locationPlaceholder}
          defaultValue={defaultValues?.location || ""}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading
            ? isEdit
              ? t.admin.partnerForm.saving
              : t.admin.partnerForm.creating
            : isEdit
              ? t.admin.partnerForm.saveChanges
              : t.admin.partnerForm.createPartner}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          {t.admin.partnerForm.cancel}
        </Button>
      </div>
    </form>
  );
}

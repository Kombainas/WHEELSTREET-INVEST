"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDictionary } from "@/i18n/provider";

interface MemberFormProps {
  memberId?: number;
  defaultValues?: {
    name?: string;
    surname?: string;
    email?: string;
    phone?: string;
    member_since?: string;
    notes?: string;
  };
  showPassword?: boolean;
}

export function MemberForm({ memberId, defaultValues, showPassword }: MemberFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const isEdit = !!memberId;
  const t = useDictionary();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const body: Record<string, unknown> = {
      name: formData.get("name"),
      surname: formData.get("surname"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      member_since: formData.get("member_since") || null,
      notes: formData.get("notes"),
    };

    const password = formData.get("password") as string;
    if (password) body.password = password;

    const url = isEdit ? `/api/members/${memberId}` : "/api/members";
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
      router.push(`/admin/members/${data.id}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t.admin.memberForm.firstName}</Label>
          <Input
            id="name"
            name="name"
            defaultValue={defaultValues?.name || ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="surname">{t.admin.memberForm.lastName}</Label>
          <Input
            id="surname"
            name="surname"
            defaultValue={defaultValues?.surname || ""}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t.admin.memberForm.email}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={defaultValues?.email || ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">{t.admin.memberForm.phone}</Label>
        <Input
          id="phone"
          name="phone"
          defaultValue={defaultValues?.phone || ""}
        />
      </div>

      {showPassword && (
        <div className="space-y-2">
          <Label htmlFor="password">
            {t.admin.memberForm.password} {!isEdit && <span className="text-gray-400">{t.admin.memberForm.passwordHint}</span>}
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder={isEdit ? t.admin.memberForm.passwordPlaceholderEdit : t.admin.memberForm.passwordPlaceholderNew}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="member_since">{t.admin.memberForm.memberSince}</Label>
        <Input
          id="member_since"
          name="member_since"
          type="date"
          defaultValue={defaultValues?.member_since || ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">{t.admin.memberForm.notes}</Label>
        <Textarea
          id="notes"
          name="notes"
          rows={3}
          defaultValue={defaultValues?.notes || ""}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading
            ? isEdit
              ? t.admin.memberForm.saving
              : t.admin.memberForm.creating
            : isEdit
              ? t.admin.memberForm.saveChanges
              : t.admin.memberForm.createMember}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          {t.admin.memberForm.cancel}
        </Button>
      </div>
    </form>
  );
}

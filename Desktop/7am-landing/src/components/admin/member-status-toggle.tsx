"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDictionary } from "@/i18n/provider";

interface MemberStatusToggleProps {
  memberId: number;
  currentStatus: string;
}

export function MemberStatusToggle({
  memberId,
  currentStatus,
}: MemberStatusToggleProps) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const t = useDictionary();

  async function toggleStatus() {
    setLoading(true);
    const newStatus = status === "active" ? "inactive" : "active";

    const res = await fetch(`/api/members/${memberId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      setStatus(newStatus);
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center gap-4">
      <Badge
        className={
          status === "active"
            ? "bg-emerald-100 text-emerald-700"
            : "bg-red-100 text-red-700"
        }
      >
        {status === "active" ? t.admin.memberStatus.active : t.admin.memberStatus.inactive}
      </Badge>
      <Button
        variant="outline"
        size="sm"
        onClick={toggleStatus}
        disabled={loading}
      >
        {loading
          ? t.admin.memberStatus.updating
          : status === "active"
            ? t.admin.memberStatus.deactivate
            : t.admin.memberStatus.activate}
      </Button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useDictionary } from "@/i18n/provider";

interface PartnerDeleteButtonProps {
  partnerId: number;
}

export function PartnerDeleteButton({ partnerId }: PartnerDeleteButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const t = useDictionary();

  async function handleDelete() {
    setLoading(true);
    const res = await fetch(`/api/partners/${partnerId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/admin/partners");
    }
    setLoading(false);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="w-4 h-4 mr-2" />
          {t.admin.partnerDelete.button}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t.admin.partnerDelete.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {t.admin.partnerDelete.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t.admin.partnerDelete.cancel}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? t.admin.partnerDelete.deleting : t.admin.partnerDelete.delete}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Users, UserCheck, UserX, Handshake, Tag, AlertTriangle } from "lucide-react";
import { useDictionary } from "@/i18n/provider";

interface Stats {
  totalMembers: number;
  activeMembers: number;
  inactiveMembers: number;
  totalPartners: number;
  totalDiscounts: number;
}

export function StatsCards() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState(false);
  const t = useDictionary();

  useEffect(() => {
    Promise.all([
      fetch("/api/members").then((r) => { if (!r.ok) throw r; return r.json(); }),
      fetch("/api/partners").then((r) => { if (!r.ok) throw r; return r.json(); }),
      fetch("/api/discounts").then((r) => { if (!r.ok) throw r; return r.json(); }),
    ]).then(([members, partners, discounts]) => {
      const membersList = Array.isArray(members) ? members : [];
      const partnersList = Array.isArray(partners) ? partners : [];
      const discountsList = Array.isArray(discounts) ? discounts : [];

      setStats({
        totalMembers: membersList.length,
        activeMembers: membersList.filter(
          (m: { status: string }) => m.status === "active"
        ).length,
        inactiveMembers: membersList.filter(
          (m: { status: string }) => m.status !== "active"
        ).length,
        totalPartners: partnersList.length,
        totalDiscounts: discountsList.length,
      });
    }).catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-700">
        <AlertTriangle className="w-5 h-5 shrink-0" />
        <p className="text-sm">Failed to load statistics. Please refresh the page.</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border p-4 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-100 w-8 h-8" />
              <div>
                <div className="h-7 w-10 bg-gray-100 rounded mb-1" />
                <div className="h-3 w-16 bg-gray-100 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    { label: t.admin.stats.totalMembers, value: stats.totalMembers, icon: Users, color: "text-blue-600 bg-blue-50" },
    { label: t.admin.stats.active, value: stats.activeMembers, icon: UserCheck, color: "text-green-600 bg-green-50" },
    { label: t.admin.stats.inactive, value: stats.inactiveMembers, icon: UserX, color: "text-red-600 bg-red-50" },
    { label: t.admin.stats.partners, value: stats.totalPartners, icon: Handshake, color: "text-purple-600 bg-purple-50" },
    { label: t.admin.stats.discounts, value: stats.totalDiscounts, icon: Tag, color: "text-amber-600 bg-amber-50" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${card.color}`}>
              <card.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="text-xs text-gray-500">{card.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

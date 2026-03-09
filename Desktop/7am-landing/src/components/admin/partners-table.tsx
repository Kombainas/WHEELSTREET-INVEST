"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Loader2, Search, Handshake } from "lucide-react";
import { useDictionary } from "@/i18n/provider";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Partner = any;

export function PartnersTable() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const t = useDictionary();

  useEffect(() => {
    fetch("/api/partners")
      .then((res) => res.json())
      .then(setPartners)
      .finally(() => setLoading(false));
  }, []);

  const filtered = partners.filter((p: Partner) =>
    [p.name, p.category, p.location]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder={t.admin.partners.search}
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Handshake className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="font-medium">{search ? t.admin.partners.noPartners : t.admin.partners.noPartnersYet}</p>
          {!search && (
            <p className="text-sm mt-1">{t.admin.partners.noPartnersDesc}</p>
          )}
        </div>
      ) : (
        <>
          {/* ── Desktop table (md+) ── */}
          <div className="bg-white rounded-xl border overflow-hidden hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50/50">
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                    {t.admin.partners.name}
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                    {t.admin.partners.category}
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                    {t.admin.partners.location}
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                    {t.admin.partners.discounts}
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                    {t.admin.partners.status}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((partner: Partner) => {
                  const discountCount = partner.discounts?.[0]?.count ?? 0;
                  return (
                    <tr key={partner.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/partners/${partner.id}`}
                          className="font-medium text-gray-900 hover:text-blue-600"
                        >
                          {partner.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 capitalize">
                        {partner.category}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {partner.location || "—"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {discountCount}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            partner.is_active
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {partner.is_active ? t.admin.partners.active : t.admin.partners.inactive}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── Mobile card list (<md) ── */}
          <div className="md:hidden space-y-3">
            {filtered.map((partner: Partner) => {
              const discountCount = partner.discounts?.[0]?.count ?? 0;
              return (
                <div
                  key={partner.id}
                  className="border rounded-lg bg-white p-4 space-y-3"
                >
                  {/* Top row: linked name + status badge */}
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/admin/partners/${partner.id}`}
                      className="font-medium text-gray-900 hover:text-blue-600 break-all min-w-0 flex-1 min-h-[44px] flex items-center"
                    >
                      {partner.name}
                    </Link>
                    <span
                      className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        partner.is_active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {partner.is_active ? t.admin.partners.active : t.admin.partners.inactive}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
                    {partner.category && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 capitalize">
                        {partner.category}
                      </span>
                    )}
                    {partner.location && (
                      <span className="break-all">{partner.location}</span>
                    )}
                  </div>

                  {/* Discount count */}
                  <p className="text-xs text-gray-400">
                    {t.admin.partners.discounts}: {discountCount}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

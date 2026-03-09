"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Eye, Copy, Check, Download } from "lucide-react";
import QRCode from "qrcode";
import type { MemberWithPrivate } from "@/lib/supabase/types";
import { useDictionary } from "@/i18n/provider";
import { getVerifyLink } from "@/lib/config";

export function MembersTable() {
  const [members, setMembers] = useState<MemberWithPrivate[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const t = useDictionary();

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    const res = await fetch("/api/members");
    if (res.ok) {
      const data = await res.json();
      setMembers(
        data.map((m: Record<string, unknown>) => ({
          ...m,
          member_private: Array.isArray(m.member_private)
            ? m.member_private[0] || null
            : m.member_private,
        }))
      );
    }
    setLoading(false);
  }

  function copyVerifyLink(member: MemberWithPrivate) {
    navigator.clipboard.writeText(getVerifyLink(member.token));
    setCopiedId(member.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  async function downloadQR(member: MemberWithPrivate) {
    const dataUrl = await QRCode.toDataURL(getVerifyLink(member.token), { width: 400, margin: 2 });
    const link = document.createElement("a");
    link.download = `7am-qr-${member.id}.png`;
    link.href = dataUrl;
    link.click();
  }

  const filtered = members.filter((m) => {
    if (statusFilter !== "all" && m.status !== statusFilter) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    const priv = m.member_private;
    return (
      priv?.name?.toLowerCase().includes(q) ||
      priv?.surname?.toLowerCase().includes(q) ||
      priv?.email?.toLowerCase().includes(q) ||
      m.token.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500">{t.admin.loading.members}</div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder={t.admin.members.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Link href="/admin/members/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            {t.admin.members.newMember}
          </Button>
        </Link>
      </div>

      <div className="flex gap-2">
        {(["all", "active", "inactive"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              statusFilter === s
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {s === "all" ? t.admin.members.all : s === "active" ? t.admin.members.active : t.admin.members.inactive}
          </button>
        ))}
      </div>

      {/* ── Desktop table (md+) ── */}
      <div className="border rounded-lg hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.admin.members.name}</TableHead>
              <TableHead>{t.admin.members.email}</TableHead>
              <TableHead>{t.admin.members.status}</TableHead>
              <TableHead>{t.admin.members.memberSince}</TableHead>
              <TableHead className="w-[140px]">{t.admin.members.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  {members.length === 0
                    ? t.admin.members.noMembers
                    : t.admin.members.noMatch}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">
                    {member.member_private?.name || ""}{" "}
                    {member.member_private?.surname || ""}
                    {!member.member_private?.name &&
                      !member.member_private?.surname && (
                        <span className="text-gray-400">{t.admin.members.noName}</span>
                      )}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {member.member_private?.email || "—"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        member.status === "active" ? "default" : "secondary"
                      }
                      className={
                        member.status === "active"
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                          : "bg-red-100 text-red-700 hover:bg-red-100"
                      }
                    >
                      {member.status === "active" ? t.admin.members.active : t.admin.members.inactive}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {member.member_private?.member_since
                      ? new Date(
                          member.member_private.member_since
                        ).toLocaleDateString()
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-0.5">
                      <Link href={`/admin/members/${member.id}`}>
                        <Button variant="ghost" size="sm" aria-label="View member">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label="Copy verify link"
                        onClick={() => copyVerifyLink(member)}
                      >
                        {copiedId === member.id ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label="Download QR"
                        onClick={() => downloadQR(member)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── Mobile card list (<md) ── */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {members.length === 0
              ? t.admin.members.noMembers
              : t.admin.members.noMatch}
          </div>
        ) : (
          filtered.map((member) => (
            <div
              key={member.id}
              className="border rounded-lg bg-white p-4 space-y-3"
            >
              {/* Top row: name + status badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 break-all">
                    {member.member_private?.name || ""}{" "}
                    {member.member_private?.surname || ""}
                    {!member.member_private?.name &&
                      !member.member_private?.surname && (
                        <span className="text-gray-400">{t.admin.members.noName}</span>
                      )}
                  </p>
                  <p className="text-sm text-gray-500 break-all mt-0.5">
                    {member.member_private?.email || "—"}
                  </p>
                </div>
                <Badge
                  variant={
                    member.status === "active" ? "default" : "secondary"
                  }
                  className={`shrink-0 ${
                    member.status === "active"
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                      : "bg-red-100 text-red-700 hover:bg-red-100"
                  }`}
                >
                  {member.status === "active" ? t.admin.members.active : t.admin.members.inactive}
                </Badge>
              </div>

              {/* Member since */}
              <p className="text-xs text-gray-400">
                {t.admin.members.memberSince}:{" "}
                {member.member_private?.member_since
                  ? new Date(
                      member.member_private.member_since
                    ).toLocaleDateString()
                  : "—"}
              </p>

              {/* Action buttons */}
              <div className="flex items-center gap-2 pt-1">
                <Link href={`/admin/members/${member.id}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label="View member"
                    className="min-h-[44px] min-w-[44px]"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Copy verify link"
                  className="min-h-[44px] min-w-[44px]"
                  onClick={() => copyVerifyLink(member)}
                >
                  {copiedId === member.id ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Download QR"
                  className="min-h-[44px] min-w-[44px]"
                  onClick={() => downloadQR(member)}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <p className="text-sm text-gray-500">
        {filtered.length} {filtered.length !== 1 ? t.admin.members.countPlural : t.admin.members.count}
      </p>
    </div>
  );
}

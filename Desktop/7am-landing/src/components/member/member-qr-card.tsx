"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check, Loader2 } from "lucide-react";
import { useDictionary } from "@/i18n/provider";
import { useMemberData } from "./member-data-provider";
import { getVerifyLink } from "@/lib/config";

export function MemberQRCard() {
  const t = useDictionary();
  const { data, loading, error, refetch } = useMemberData();
  const [copied, setCopied] = useState(false);

  function downloadQR() {
    if (!data?.qrDataUrl) return;
    const link = document.createElement("a");
    link.download = `7am-qr-${data.id}.png`;
    link.href = data.qrDataUrl;
    link.click();
  }

  function copyLink() {
    if (!data?.token) return;
    navigator.clipboard.writeText(getVerifyLink(data.token));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur border border-white/10 p-6 rounded-2xl flex items-center justify-center min-h-[340px]">
        <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-white/5 backdrop-blur border border-white/10 p-8 rounded-2xl text-center">
        <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-red-500/20 flex items-center justify-center">
          <span className="text-red-400 text-lg">!</span>
        </div>
        <p className="text-gray-300 font-medium">{t.member.qr.loadError}</p>
        <p className="text-gray-500 text-sm mt-1">{t.member.qr.loadErrorDesc}</p>
        <button
          onClick={refetch}
          className="mt-3 text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          {t.member.error.tryAgain}
        </button>
      </div>
    );
  }

  return (
    <div className="relative bg-white/5 backdrop-blur border border-white/10 p-6 rounded-2xl text-center overflow-hidden">
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="mb-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
              data.status === "active"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-red-500/20 text-red-400 border border-red-500/30"
            }`}
          >
            {data.status === "active" ? t.member.qr.active : t.member.qr.inactive}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl inline-block mb-4 shadow-lg shadow-blue-500/10">
          <Image
            src={data.qrDataUrl}
            alt="Membership QR Code"
            width={220}
            height={220}
            className="mx-auto"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={downloadQR}
            className="flex-1 border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
          >
            <Download className="w-4 h-4 mr-1.5" />
            {t.member.qr.download}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={copyLink}
            className="flex-1 border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-1.5 text-emerald-400" />
                {t.member.qr.copied}
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-1.5" />
                {t.member.qr.copyLink}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

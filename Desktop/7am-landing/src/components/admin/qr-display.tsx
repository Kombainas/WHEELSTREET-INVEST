"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Copy, Check } from "lucide-react";
import { useDictionary } from "@/i18n/provider";

interface QRDisplayProps {
  memberId: number;
  token: string;
}

export function QRDisplay({ memberId, token }: QRDisplayProps) {
  const t = useDictionary();
  const [qrData, setQrData] = useState<string | null>(null);
  const [verifyUrl, setVerifyUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchQR();
  }, [memberId]);

  async function fetchQR() {
    setLoading(true);
    const res = await fetch(`/api/members/${memberId}/qr`);
    if (res.ok) {
      const data = await res.json();
      setQrData(data.qr);
      setVerifyUrl(data.url);
    }
    setLoading(false);
  }

  async function regenerateToken() {
    setRegenerating(true);
    const res = await fetch(`/api/members/${memberId}/token`, {
      method: "POST",
    });
    if (res.ok) {
      await fetchQR();
      window.location.reload();
    }
    setRegenerating(false);
  }

  async function copyUrl() {
    await navigator.clipboard.writeText(verifyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadQR() {
    if (!qrData) return;
    const link = document.createElement("a");
    link.download = `7am-member-${token}.png`;
    link.href = qrData;
    link.click();
  }

  if (loading) {
    return <div className="text-gray-500 text-sm">{t.admin.qr.loading}</div>;
  }

  return (
    <div className="space-y-4">
      {qrData && (
        <div className="bg-white p-4 rounded-lg inline-block">
          <img src={qrData} alt="Member QR Code" width={200} height={200} />
        </div>
      )}

      <div className="flex items-center gap-2 text-sm">
        <code className="bg-gray-100 px-2 py-1 rounded text-xs flex-1 break-all">
          {verifyUrl}
        </code>
        <Button variant="ghost" size="sm" onClick={copyUrl}>
          {copied ? (
            <Check className="w-4 h-4 text-emerald-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={downloadQR}>
          <Download className="w-4 h-4 mr-2" />
          {t.admin.qr.downloadQR}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={regenerateToken}
          disabled={regenerating}
        >
          <RefreshCw
            className={`w-4 h-4 mr-2 ${regenerating ? "animate-spin" : ""}`}
          />
          {regenerating ? t.admin.qr.regenerating : t.admin.qr.newToken}
        </Button>
      </div>
    </div>
  );
}

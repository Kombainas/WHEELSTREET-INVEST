"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useDictionary } from "@/i18n/provider";
import { CONTACT_EMAIL } from "@/lib/config";

interface VerificationStatusProps {
  status: "active" | "inactive" | "not_found";
  verifiedAt: string | null;
}

export function VerificationStatus({
  status,
  verifiedAt,
}: VerificationStatusProps) {
  const t = useDictionary();
  if (status === "active") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-5"
      >
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center ring-1 ring-emerald-500/30">
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-1">
            {t.verification.member}
          </p>
          <h1 className="text-2xl font-bold text-emerald-400">{t.verification.active}</h1>
        </div>
        {verifiedAt && (
          <p className="text-xs text-gray-600">
            {t.verification.verified} {new Date(verifiedAt).toLocaleString()}
          </p>
        )}
        <Link
          href="/member"
          className="inline-block text-sm text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors"
        >
          {t.verification.goToDashboard}
        </Link>
      </motion.div>
    );
  }

  if (status === "inactive") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-5"
      >
        <div className="w-20 h-20 mx-auto rounded-full bg-red-500/20 flex items-center justify-center ring-1 ring-red-500/30">
          <XCircle className="w-10 h-10 text-red-400" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-1">
            {t.verification.member}
          </p>
          <h1 className="text-2xl font-bold text-red-400">{t.verification.inactive}</h1>
        </div>
        <p className="text-sm text-gray-500">{t.verification.notActive}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-5"
    >
      <div className="w-20 h-20 mx-auto rounded-full bg-white/5 flex items-center justify-center ring-1 ring-white/10">
        <AlertTriangle className="w-10 h-10 text-gray-600" />
      </div>
      <h1 className="text-2xl font-bold text-gray-500">{t.verification.notFound}</h1>
      <p className="text-sm text-gray-600">{t.verification.notValid}</p>
      <p className="text-xs text-gray-600 mt-2">
        {t.verification.contactText}{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-400 hover:text-blue-300">
          {CONTACT_EMAIL}
        </a>
      </p>
    </motion.div>
  );
}

"use client";

import { Loader2 } from "lucide-react";
import { useDictionary } from "@/i18n/provider";
import { useMemberData } from "./member-data-provider";

export function MemberInfoCard() {
  const t = useDictionary();
  const { data, loading, error, refetch } = useMemberData();

  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur border border-white/10 p-6 rounded-2xl flex items-center justify-center min-h-[120px]">
        <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-white/5 backdrop-blur border border-white/10 p-6 rounded-2xl text-center text-gray-500 text-sm">
        {t.member.info.loadError}
        <button
          onClick={refetch}
          className="block mx-auto mt-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          {t.member.error.tryAgain}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur border border-white/10 p-6 rounded-2xl">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
        {t.member.info.title}
      </h2>
      <dl className="space-y-2.5 text-sm">
        <div>
          <dt className="text-gray-500 text-xs">{t.member.info.name}</dt>
          <dd className="font-medium text-gray-200">{data.name}</dd>
        </div>
        <div>
          <dt className="text-gray-500 text-xs">{t.member.info.email}</dt>
          <dd className="font-medium text-gray-200">{data.email}</dd>
        </div>
        {data.memberSince && (
          <div>
            <dt className="text-gray-500 text-xs">{t.member.info.memberSince}</dt>
            <dd className="font-medium text-gray-200">
              {new Date(data.memberSince).toLocaleDateString()}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}

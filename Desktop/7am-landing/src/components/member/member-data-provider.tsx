"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface MemberData {
  id: number;
  name: string;
  email: string;
  token: string;
  status: string;
  qrDataUrl: string;
  memberSince: string | null;
}

interface MemberDataContext {
  data: MemberData | null;
  loading: boolean;
  error: boolean;
  refetch: () => void;
}

const Ctx = createContext<MemberDataContext>({
  data: null,
  loading: true,
  error: false,
  refetch: () => {},
});

export function MemberDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<MemberData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  function load() {
    setLoading(true);
    setError(false);
    fetch("/api/member/me")
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.json();
      })
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  return (
    <Ctx.Provider value={{ data, loading, error, refetch: load }}>
      {children}
    </Ctx.Provider>
  );
}

export function useMemberData() {
  return useContext(Ctx);
}

"use client";

import { createContext, useContext } from "react";
import { getDictionary, type Dictionary, type Locale } from "./dictionary";

const DictionaryContext = createContext<Dictionary>(getDictionary("lt"));

export function DictionaryProvider({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const dict = getDictionary(locale);
  return (
    <DictionaryContext.Provider value={dict}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary(): Dictionary {
  return useContext(DictionaryContext);
}

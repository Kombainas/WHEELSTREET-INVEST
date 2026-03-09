import { lt } from "./locales/lt";
import { en } from "./locales/en";
import { uk } from "./locales/uk";

const dictionaries = { lt, en, uk } as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof lt;

export function getDictionary(locale?: string): Dictionary {
  const key = locale && locale in dictionaries ? (locale as Locale) : "lt";
  return dictionaries[key];
}

export function getLocaleFromCookie(cookieString?: string): Locale {
  if (!cookieString) return "lt";
  const match = cookieString.match(/(?:^|;\s*)lang=(\w+)/);
  const val = match?.[1];
  return val && val in dictionaries ? (val as Locale) : "lt";
}

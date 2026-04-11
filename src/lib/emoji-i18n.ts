/**
 * Emoji i18n utility — loads locale-specific emoji translations at build time.
 * Maps slug -> { name, keywords, meaning, groupName }
 */
import type { Locale } from "@/i18n/config";

import enData from "@/data/emoji-i18n/en.json";
import zhData from "@/data/emoji-i18n/zh.json";
import jaData from "@/data/emoji-i18n/ja.json";
import koData from "@/data/emoji-i18n/ko.json";
import esData from "@/data/emoji-i18n/es.json";
import ruData from "@/data/emoji-i18n/ru.json";

type EmojiTranslation = {
  name: string;
  keywords: string[];
  meaning: string;
  groupName: string;
};

const translationMap: Record<string, Record<string, EmojiTranslation>> = {
  en: enData as unknown as Record<string, EmojiTranslation>,
  zh: zhData as unknown as Record<string, EmojiTranslation>,
  ja: jaData as unknown as Record<string, EmojiTranslation>,
  ko: koData as unknown as Record<string, EmojiTranslation>,
  es: esData as unknown as Record<string, EmojiTranslation>,
  ru: ruData as unknown as Record<string, EmojiTranslation>,
};

/**
 * Get the localized translation for a given emoji slug and locale.
 * Falls back to English if no translation exists.
 */
export function getEmojiTranslation(slug: string, locale: Locale): EmojiTranslation {
  const localeData = translationMap[locale] || translationMap.en;
  return localeData[slug] || translationMap.en[slug];
}

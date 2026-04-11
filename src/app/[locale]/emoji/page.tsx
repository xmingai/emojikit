import type { Metadata } from "next";
import { getAllEmojis, getBaseEmojis, getCategories, getEmojiVersions } from "@/lib/emoji";
import { EmojiGrid } from "@/components/emoji-grid";
import { FAQSection } from "@/components/faq-section";
import { getDictionary } from "@/i18n/dictionaries";
import { type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.emoji.metaTitle,
    description: dict.emoji.metaDesc,
  };
}

export default async function EmojiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const allEmojis = getAllEmojis();
  const baseEmojis = getBaseEmojis();
  const categories = getCategories();
  const versions = getEmojiVersions();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <EmojiGrid emojis={baseEmojis} allEmojis={allEmojis} categories={categories} versions={versions} />
      {dict.emoji.faq && dict.emoji.faq.length > 0 && (
        <FAQSection title={dict.emoji.faqTitle as string} faqs={dict.emoji.faq as any} />
      )}
    </div>
  );
}

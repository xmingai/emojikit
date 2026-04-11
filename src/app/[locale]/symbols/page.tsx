import type { Metadata } from "next";
import { SymbolsClient } from "./symbols-client";
import { getDictionary } from "@/i18n/dictionaries";
import { type Locale } from "@/i18n/config";
import { FAQSection } from "@/components/faq-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.symbols.metaTitle || dict.symbols.title,
    description: dict.symbols.metaDesc,
  };
}

export default async function SymbolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <SymbolsClient />
      {dict.symbols.faq && dict.symbols.faq.length > 0 && (
        <FAQSection title={dict.symbols.faqTitle as string} faqs={dict.symbols.faq as any} />
      )}
    </div>
  );
}

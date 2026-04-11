import type { Metadata } from "next";
import { FancyTextClient } from "./fancy-text-client";
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
    title: dict.fancyText.metaTitle || dict.fancyText.title,
    description: dict.fancyText.metaDesc,
  };
}

export default async function FancyTextPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <FancyTextClient />
      {dict.fancyText.faq && dict.fancyText.faq.length > 0 && (
        <FAQSection title={dict.fancyText.faqTitle as string} faqs={dict.fancyText.faq as any} />
      )}
    </div>
  );
}

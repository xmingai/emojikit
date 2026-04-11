import { getDictionary } from "@/i18n/dictionaries";
import { type Locale } from "@/i18n/config";
import { HomeClient } from "./home-client";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return <HomeClient dict={dict} locale={locale as Locale} />;
}

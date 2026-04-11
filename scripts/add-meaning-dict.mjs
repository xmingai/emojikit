import fs from 'fs';
import path from 'path';

const dicts = {
  en: "Meaning & Description",
  zh: "含义与描述",
  ja: "意味と説明",
  ko: "의미 및 설명",
  es: "Significado y Descripción",
  ru: "Значение и описание"
};

for (const [lang, text] of Object.entries(dicts)) {
  const p = path.join(process.cwd(), 'src/i18n/dictionaries', `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  data.emoji.meaning = text;
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
}

console.log("Successfully updated dictionaries.");

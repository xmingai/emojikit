/**
 * Generate locale-specific emoji translation files from emojibase-data.
 * Creates src/data/emoji-i18n/{locale}.json for each supported locale.
 * 
 * Each translation file maps hexcode -> { name, keywords, meaning }
 */
import fs from 'fs';
import path from 'path';

const LOCALES = ['en', 'zh', 'ja', 'ko', 'es', 'ru'];
const OUT_DIR = path.join(process.cwd(), 'src', 'data', 'emoji-i18n');
const EMOJI_DATA_PATH = path.join(process.cwd(), 'src', 'data', 'emoji-data.json');

// Group name translations
const GROUP_NAMES = {
  en: {
    "Smileys & Emotion": "Smileys & Emotion",
    "People & Body": "People & Body",
    "Animals & Nature": "Animals & Nature",
    "Food & Drink": "Food & Drink",
    "Travel & Places": "Travel & Places",
    "Activities": "Activities",
    "Objects": "Objects",
    "Symbols": "Symbols",
    "Flags": "Flags",
    "Component": "Component",
  },
  zh: {
    "Smileys & Emotion": "表情与情感",
    "People & Body": "人物与身体",
    "Animals & Nature": "动物与自然",
    "Food & Drink": "食物与饮品",
    "Travel & Places": "旅行与地点",
    "Activities": "活动",
    "Objects": "物体",
    "Symbols": "符号",
    "Flags": "旗帜",
    "Component": "组件",
  },
  ja: {
    "Smileys & Emotion": "スマイリーと感情",
    "People & Body": "人物と体",
    "Animals & Nature": "動物と自然",
    "Food & Drink": "食べ物と飲み物",
    "Travel & Places": "旅行と場所",
    "Activities": "アクティビティ",
    "Objects": "もの",
    "Symbols": "記号",
    "Flags": "旗",
    "Component": "コンポーネント",
  },
  ko: {
    "Smileys & Emotion": "스마일리 및 감정",
    "People & Body": "사람 및 신체",
    "Animals & Nature": "동물 및 자연",
    "Food & Drink": "음식 및 음료",
    "Travel & Places": "여행 및 장소",
    "Activities": "활동",
    "Objects": "사물",
    "Symbols": "기호",
    "Flags": "깃발",
    "Component": "구성요소",
  },
  es: {
    "Smileys & Emotion": "Emoticonos y Emociones",
    "People & Body": "Personas y Cuerpo",
    "Animals & Nature": "Animales y Naturaleza",
    "Food & Drink": "Comida y Bebida",
    "Travel & Places": "Viajes y Lugares",
    "Activities": "Actividades",
    "Objects": "Objetos",
    "Symbols": "Símbolos",
    "Flags": "Banderas",
    "Component": "Componente",
  },
  ru: {
    "Smileys & Emotion": "Смайлики и эмоции",
    "People & Body": "Люди и тело",
    "Animals & Nature": "Животные и природа",
    "Food & Drink": "Еда и напитки",
    "Travel & Places": "Путешествия и места",
    "Activities": "Мероприятия",
    "Objects": "Предметы",
    "Symbols": "Символы",
    "Flags": "Флаги",
    "Component": "Компонент",
  },
};

// Meaning templates per locale per group
const MEANING_TEMPLATES = {
  zh: {
    "Smileys & Emotion": (name, emoji, kw, year, ver) =>
      `${name}表情符号 (${emoji}) 用于表达${kw ? kw : '各种情绪'}。在社交媒体和即时通讯中经常使用，为数字对话增添情感色彩。该表情于${year}年被正式收录进 Unicode 标准（${ver}）。`,
    "People & Body": (name, emoji, kw, year, ver) =>
      `${name}表情符号 (${emoji}) 代表${name}，通常在涉及${kw ? kw : '人物和日常活动'}的场景中使用。该表情于${year}年被正式收录进 Unicode 标准（${ver}）。`,
    "Animals & Nature": (name, emoji, kw, year, ver) =>
      `${name}表情符号 (${emoji}) 描绘的是${name}，经常在讨论动物、自然或${kw ? kw : '户外话题'}时使用。该表情于${year}年被纳入 Unicode 标准（${ver}）。`,
    "Food & Drink": (name, emoji, kw, year, ver) =>
      `${name}表情符号 (${emoji}) 展示的是${name}，常用于美食、餐饮或与${kw ? kw : '饮食'}相关的话题中。该表情于${year}年正式加入 Unicode（${ver}）。`,
    "Travel & Places": (name, emoji, kw, year, ver) =>
      `${name}表情符号 (${emoji}) 代表${name}，在旅行、地理和${kw ? kw : '地点'}相关的对话中常被使用。该表情于${year}年收录进 Unicode（${ver}）。`,
    "Activities": (name, emoji, kw, year, ver) =>
      `${name}表情符号 (${emoji}) 代表${name}，常用于讨论运动、爱好或${kw ? kw : '活动'}。该表情于${year}年被正式纳入 Unicode 标准（${ver}）。`,
    "Objects": (name, emoji, kw, year, ver) =>
      `${name}表情符号 (${emoji}) 描绘的是${name}，在讨论${kw ? kw : '日常物品'}及相关话题时经常出现。该表情于${year}年加入 Unicode（${ver}）。`,
    "Symbols": (name, emoji, kw, year, ver) =>
      `${name}表情符号 (${emoji}) 是表示${name}的符号，通常用于传达${kw ? kw : '特定概念'}。该符号于${year}年被纳入 Unicode 标准（${ver}）。`,
    "Flags": (name, emoji, kw, year, ver) =>
      `${name}表情符号 (${emoji}) 代表${name}。在国际交流和地理话题中常被使用。该表情于${year}年收录进 Unicode 标准（${ver}）。`,
    "_default": (name, emoji, kw, year, ver) =>
      `${name}表情符号 (${emoji}) 通常用于与${kw ? kw : name}相关的话题。该表情于${year}年被正式收录进 Unicode 标准（${ver}）。`,
  },
  ja: {
    "Smileys & Emotion": (name, emoji, kw, year, ver) =>
      `${name}絵文字 (${emoji}) は、${kw ? kw : 'さまざまな感情'}を表現するために使われます。SNSやメッセージアプリでよく使用され、デジタルコミュニケーションに感情を加えます。${year}年にUnicode標準（${ver}）に正式に採用されました。`,
    "_default": (name, emoji, kw, year, ver) =>
      `${name}絵文字 (${emoji}) は、${kw ? kw : name}に関連する話題でよく使用されます。${year}年にUnicode標準（${ver}）に正式に収録されました。`,
  },
  ko: {
    "Smileys & Emotion": (name, emoji, kw, year, ver) =>
      `${name} 이모지 (${emoji})는 ${kw ? kw : '다양한 감정'}을 표현할 때 사용됩니다. SNS와 메신저에서 자주 사용되며, 디지털 대화에 감정을 더합니다. ${year}년 유니코드 표준(${ver})에 공식 수록되었습니다.`,
    "_default": (name, emoji, kw, year, ver) =>
      `${name} 이모지 (${emoji})는 ${kw ? kw : name} 관련 주제에서 자주 사용됩니다. ${year}년 유니코드 표준(${ver})에 공식 수록되었습니다.`,
  },
  es: {
    "Smileys & Emotion": (name, emoji, kw, year, ver) =>
      `El emoji de ${name} (${emoji}) se usa para expresar ${kw ? kw : 'diversas emociones'}. Se utiliza con frecuencia en redes sociales y mensajería, añadiendo profundidad emocional a las conversaciones digitales. Fue adoptado oficialmente en Unicode en ${year} (${ver}).`,
    "_default": (name, emoji, kw, year, ver) =>
      `El emoji de ${name} (${emoji}) se utiliza comúnmente en temas relacionados con ${kw ? kw : name}. Fue incorporado al estándar Unicode en ${year} (${ver}).`,
  },
  ru: {
    "Smileys & Emotion": (name, emoji, kw, year, ver) =>
      `Эмодзи «${name}» (${emoji}) используется для выражения ${kw ? kw : 'различных эмоций'}. Часто применяется в социальных сетях и мессенджерах для передачи эмоционального тона. Официально принят в стандарт Unicode в ${year} году (${ver}).`,
    "_default": (name, emoji, kw, year, ver) =>
      `Эмодзи «${name}» (${emoji}) часто используется в контексте ${kw ? kw : name}. Был добавлен в стандарт Unicode в ${year} году (${ver}).`,
  },
};

// Convert our unicode format "U+1F600" or "U+1F1E6 U+1F1E8" to emojibase hexcode "1F600" or "1F1E6-1F1E8"
function unicodeToHexcode(unicode) {
  return unicode.replace(/U\+/g, '').replace(/ /g, '-');
}

async function main() {
  // Ensure output dir
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Load our base emoji data
  const emojiData = JSON.parse(fs.readFileSync(EMOJI_DATA_PATH, 'utf8'));

  // Build hexcode -> base emoji lookup
  const hexToEmoji = {};
  for (const e of emojiData) {
    const hex = unicodeToHexcode(e.unicode);
    hexToEmoji[hex] = e;
  }

  for (const locale of LOCALES) {
    console.log(`\n--- Processing ${locale} ---`);
    
    // Load emojibase data for this locale
    let emojibaseData;
    try {
      emojibaseData = (await import(`emojibase-data/${locale}/compact.json`, { with: { type: 'json' } })).default;
    } catch (e) {
      console.warn(`  Could not load emojibase-data for ${locale}, skipping`);
      continue;
    }

    // Build hexcode -> emojibase lookup
    const ebLookup = {};
    for (const eb of emojibaseData) {
      ebLookup[eb.hexcode] = eb;
    }

    // Generate translations
    const translations = {};
    let matched = 0;
    let unmatched = 0;

    for (const emoji of emojiData) {
      const hex = unicodeToHexcode(emoji.unicode);
      // Try exact match first, then strip FE0F (variation selector), then try base codepoint only
      const eb = ebLookup[hex]
        || ebLookup[hex.replace(/-FE0F/g, '')]
        || ebLookup[hex.split('-')[0]];

      if (eb) {
        const localName = eb.label || emoji.name;
        const localKeywords = eb.tags || emoji.keywords;
        const kwSep = ['zh', 'ja'].includes(locale) ? '、' : ', ';
        const kwString = localKeywords.slice(0, 4).join(kwSep);
        const groupName = GROUP_NAMES[locale]?.[emoji.group] || emoji.group;
        
        // Generate meaning
        let meaning;
        if (locale === 'en') {
          meaning = emoji.meaning; // Already have English meaning
        } else {
          const templates = MEANING_TEMPLATES[locale];
          const templateFn = templates?.[emoji.group] || templates?.['_default'];
          if (templateFn) {
            meaning = templateFn(localName, emoji.emoji, kwString, emoji.year || 2015, emoji.emojiVersion);
          } else {
            meaning = emoji.meaning; // Fallback to English
          }
        }

        translations[emoji.slug] = {
          name: localName,
          keywords: localKeywords,
          meaning: meaning,
          groupName: groupName,
        };
        matched++;
      } else {
        // No emojibase match: use English fallback with localized group name
        const groupName = GROUP_NAMES[locale]?.[emoji.group] || emoji.group;
        const templates = MEANING_TEMPLATES[locale];
        const templateFn = templates?.['_default'];
        let meaning = emoji.meaning;
        if (locale !== 'en' && templateFn) {
          const kwSep = ['zh', 'ja'].includes(locale) ? '、' : ', ';
          meaning = templateFn(emoji.name, emoji.emoji, emoji.keywords.slice(0,4).join(kwSep), emoji.year || 2015, emoji.emojiVersion);
        }
        translations[emoji.slug] = {
          name: emoji.name,
          keywords: emoji.keywords,
          meaning: meaning,
          groupName: groupName,
        };
        unmatched++;
      }
    }

    console.log(`  Matched: ${matched}, Unmatched (fallback to EN): ${unmatched}`);

    // Write output
    const outPath = path.join(OUT_DIR, `${locale}.json`);
    fs.writeFileSync(outPath, JSON.stringify(translations, null, 2));
    console.log(`  Written to ${outPath}`);
  }

  console.log('\nDone! All translation files generated.');
}

main().catch(console.error);

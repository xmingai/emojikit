import fs from 'fs';
import path from 'path';

const translations = {
  en: {
    coquette: "Coquette",
    summerVibes: "Summer Vibes",
    darkAcademia: "Dark Academia",
    party: "Party",
    natureCore: "Nature Core",
    sadHours: "Sad Hours",
    tableFlip: "Table Flip",
    sparkles: "Sparkles",
    bear: "Bear",
    fight: "Fight",
    stars: "Stars",
    flowers: "Flowers",
    sniper: "Sniper",
    spider: "Spider",
    zwspName: "Zero Width Space (ZWSP)",
    helloWorld: "Hello World"
  },
  zh: {
    coquette: "娇俏可爱",
    summerVibes: "夏日氛围",
    darkAcademia: "暗黑学院",
    party: "派对",
    natureCore: "自然风",
    sadHours: "网抑云时间",
    tableFlip: "掀桌",
    sparkles: "闪耀",
    bear: "小熊",
    fight: "战斗",
    stars: "星星",
    flowers: "花朵",
    sniper: "狙击手",
    spider: "蜘蛛",
    zwspName: "零宽空格 (ZWSP)",
    helloWorld: "你好世界 (Hello World)"
  },
  ja: {
    coquette: "コケット",
    summerVibes: "夏の雰囲気",
    darkAcademia: "ダークアカデミア",
    party: "パーティー",
    natureCore: "ネイチャーコア",
    sadHours: "悲しい時間",
    tableFlip: "ちゃぶ台返し",
    sparkles: "キラキラ",
    bear: "クマ",
    fight: "戦い",
    stars: "星",
    flowers: "花",
    sniper: "スナイパー",
    spider: "クモ",
    zwspName: "ゼロ幅スペース (ZWSP)",
    helloWorld: "ハローワールド"
  },
  ko: {
    coquette: "코켓",
    summerVibes: "여름 분위기",
    darkAcademia: "다크 아카데미아",
    party: "파티",
    natureCore: "네이처 코어",
    sadHours: "슬픈 시간",
    tableFlip: "상 뒤집기",
    sparkles: "반짝임",
    bear: "곰",
    fight: "싸움",
    stars: "별",
    flowers: "꽃",
    sniper: "스나이퍼",
    spider: "거미",
    zwspName: "폭 없는 공백 (ZWSP)",
    helloWorld: "헬로 월드"
  },
  es: {
    coquette: "Coquette",
    summerVibes: "Vibras de Verano",
    darkAcademia: "Academia Oscura",
    party: "Fiesta",
    natureCore: "Estilo Natural",
    sadHours: "Horas Tristes",
    tableFlip: "Voltear la Mesa",
    sparkles: "Destellos",
    bear: "Oso",
    fight: "Pelea",
    stars: "Estrellas",
    flowers: "Flores",
    sniper: "Francotirador",
    spider: "Araña",
    zwspName: "Espacio de Ancho Cero (ZWSP)",
    helloWorld: "Hola Mundo"
  },
  ru: {
    coquette: "Кокетка",
    summerVibes: "Летний Вайб",
    darkAcademia: "Темная Академия",
    party: "Вечеринка",
    natureCore: "Природа",
    sadHours: "Грустные часы",
    tableFlip: "Бросок Стола",
    sparkles: "Искорки",
    bear: "Медведь",
    fight: "Бой",
    stars: "Звезды",
    flowers: "Цветы",
    sniper: "Снайпер",
    spider: "Паук",
    zwspName: "Пробел Нулевой Ширины (ZWSP)",
    helloWorld: "Привет Мир"
  }
};

const locales = ['en', 'zh', 'ja', 'ko', 'es', 'ru'];
const dir = '/Users/sgx/Desktop/Social/Dev/emojikit/src/i18n/dictionaries';

for (const locale of locales) {
  const filePath = path.join(dir, `${locale}.json`);
  let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Apply translations safely
  for (const [key, localizedVal] of Object.entries(translations[locale])) {
    data.home[`preview_${key}`] = localizedVal;
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Updated ${locale}.json`);
}


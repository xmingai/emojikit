/**
 * Add all missing i18n keys to all 6 language dictionaries.
 */
import fs from 'fs';
import path from 'path';

const DICT_DIR = path.join(process.cwd(), 'src/i18n/dictionaries');

const newKeys = {
  en: {
    common: {
      all: "All",
      copy: "Copy",
      details: "Details",
      results: "Results",
      resultsFor: "{count} results for \"{query}\"",
      noResults: "No results found for \"{query}\"",
      clickToCopy: "Click to copy",
      typeHere: "Type your text here...",
      pasteHere: "Paste here...",
      worksOn: "Works on:"
    },
    symbols: {
      searchPlaceholder: "Search symbols... (e.g. arrow, heart, star)",
      noResults: "No symbols found"
    },
    combos: {
      searchPlaceholder: "Search combos... (e.g. love, party, aesthetic)",
      noResults: "No combos found for"
    },
    kaomoji: {
      searchPlaceholder: "Search kaomoji... (e.g. smile, sad, table flip)",
      noResults: "No kaomoji found for"
    },
    asciiArt: {
      searchPlaceholder: "Search ASCII art... (e.g. weapons, bear, multi-line)",
      noResults: "No ASCII art found for"
    },
    invisible: {
      testArea: "Test Area",
      testAreaDesc: "Paste your invisible character between the brackets below to test its width."
    },
    braille: {
      braille: "Braille",
      morseCode: "Morse Code",
      inputPlaceholder: "Type something here..."
    },
    fancyText: {
      inputPlaceholder: "Type your text here..."
    }
  },
  zh: {
    common: {
      all: "全部",
      copy: "复制",
      details: "详情",
      results: "结果",
      resultsFor: "{count} 个关于 \"{query}\" 的结果",
      noResults: "未找到 \"{query}\" 相关结果",
      clickToCopy: "点击复制",
      typeHere: "在此输入文字...",
      pasteHere: "在此处粘贴...",
      worksOn: "兼容平台："
    },
    symbols: {
      searchPlaceholder: "搜索符号...（如箭头、爱心、星星）",
      noResults: "未找到符号"
    },
    combos: {
      searchPlaceholder: "搜索组合...（如爱情、派对、美学）",
      noResults: "未找到相关组合"
    },
    kaomoji: {
      searchPlaceholder: "搜索颜文字...（如微笑、悲伤、掀桌）",
      noResults: "未找到相关颜文字"
    },
    asciiArt: {
      searchPlaceholder: "搜索 ASCII 艺术...（如武器、小熊、多行）",
      noResults: "未找到相关 ASCII 艺术"
    },
    invisible: {
      testArea: "测试区域",
      testAreaDesc: "在下方括号中粘贴不可见字符以测试其宽度。"
    },
    braille: {
      braille: "盲文",
      morseCode: "摩尔斯电码",
      inputPlaceholder: "在此输入文字..."
    },
    fancyText: {
      inputPlaceholder: "在此输入文字..."
    }
  },
  ja: {
    common: {
      all: "すべて",
      copy: "コピー",
      details: "詳細",
      results: "結果",
      resultsFor: "「{query}」の結果 {count} 件",
      noResults: "「{query}」の結果が見つかりません",
      clickToCopy: "クリックでコピー",
      typeHere: "ここにテキストを入力...",
      pasteHere: "ここに貼り付け...",
      worksOn: "対応："
    },
    symbols: {
      searchPlaceholder: "記号を検索...（例：矢印、ハート、星）",
      noResults: "記号が見つかりません"
    },
    combos: {
      searchPlaceholder: "コンボを検索...（例：愛、パーティー）",
      noResults: "コンボが見つかりません"
    },
    kaomoji: {
      searchPlaceholder: "顔文字を検索...（例：笑顔、泣く）",
      noResults: "顔文字が見つかりません"
    },
    asciiArt: {
      searchPlaceholder: "AAを検索...（例：武器、クマ）",
      noResults: "AAが見つかりません"
    },
    invisible: {
      testArea: "テストエリア",
      testAreaDesc: "下のカッコの間に不可視文字を貼り付けて、幅をテストしてください。"
    },
    braille: {
      braille: "点字",
      morseCode: "モールス符号",
      inputPlaceholder: "ここにテキストを入力..."
    },
    fancyText: {
      inputPlaceholder: "ここにテキストを入力..."
    }
  },
  ko: {
    common: {
      all: "전체",
      copy: "복사",
      details: "상세",
      results: "결과",
      resultsFor: "\"{query}\"에 대한 {count}개의 결과",
      noResults: "\"{query}\"에 대한 결과를 찾을 수 없습니다",
      clickToCopy: "클릭하여 복사",
      typeHere: "여기에 텍스트를 입력...",
      pasteHere: "여기에 붙여넣기...",
      worksOn: "호환:"
    },
    symbols: {
      searchPlaceholder: "기호 검색... (예: 화살표, 하트, 별)",
      noResults: "기호를 찾을 수 없습니다"
    },
    combos: {
      searchPlaceholder: "콤보 검색... (예: 사랑, 파티)",
      noResults: "콤보를 찾을 수 없습니다"
    },
    kaomoji: {
      searchPlaceholder: "이모티콘 검색... (예: 웃음, 슬픔)",
      noResults: "이모티콘을 찾을 수 없습니다"
    },
    asciiArt: {
      searchPlaceholder: "ASCII 아트 검색... (예: 무기, 곰)",
      noResults: "ASCII 아트를 찾을 수 없습니다"
    },
    invisible: {
      testArea: "테스트 영역",
      testAreaDesc: "아래 괄호 사이에 보이지 않는 문자를 붙여넣어 너비를 테스트하세요."
    },
    braille: {
      braille: "점자",
      morseCode: "모스 부호",
      inputPlaceholder: "여기에 텍스트를 입력..."
    },
    fancyText: {
      inputPlaceholder: "여기에 텍스트를 입력..."
    }
  },
  es: {
    common: {
      all: "Todo",
      copy: "Copiar",
      details: "Detalles",
      results: "Resultados",
      resultsFor: "{count} resultados para \"{query}\"",
      noResults: "No se encontraron resultados para \"{query}\"",
      clickToCopy: "Clic para copiar",
      typeHere: "Escriba su texto aquí...",
      pasteHere: "Pegar aquí...",
      worksOn: "Compatible con:"
    },
    symbols: {
      searchPlaceholder: "Buscar símbolos... (ej. flecha, corazón, estrella)",
      noResults: "No se encontraron símbolos"
    },
    combos: {
      searchPlaceholder: "Buscar combos... (ej. amor, fiesta)",
      noResults: "No se encontraron combos para"
    },
    kaomoji: {
      searchPlaceholder: "Buscar kaomoji... (ej. sonrisa, triste)",
      noResults: "No se encontraron kaomoji para"
    },
    asciiArt: {
      searchPlaceholder: "Buscar arte ASCII... (ej. armas, oso)",
      noResults: "No se encontró arte ASCII para"
    },
    invisible: {
      testArea: "Área de prueba",
      testAreaDesc: "Pega tu carácter invisible entre los corchetes para probar su ancho."
    },
    braille: {
      braille: "Braille",
      morseCode: "Código Morse",
      inputPlaceholder: "Escribe algo aquí..."
    },
    fancyText: {
      inputPlaceholder: "Escribe tu texto aquí..."
    }
  },
  ru: {
    common: {
      all: "Все",
      copy: "Копировать",
      details: "Подробнее",
      results: "Результаты",
      resultsFor: "{count} результатов для «{query}»",
      noResults: "Результаты для «{query}» не найдены",
      clickToCopy: "Нажмите, чтобы скопировать",
      typeHere: "Введите текст здесь...",
      pasteHere: "Вставьте сюда...",
      worksOn: "Работает на:"
    },
    symbols: {
      searchPlaceholder: "Поиск символов... (напр. стрелка, сердце, звезда)",
      noResults: "Символы не найдены"
    },
    combos: {
      searchPlaceholder: "Поиск комбо... (напр. любовь, вечеринка)",
      noResults: "Комбо не найдены для"
    },
    kaomoji: {
      searchPlaceholder: "Поиск каомодзи... (напр. улыбка, грусть)",
      noResults: "Каомодзи не найдены для"
    },
    asciiArt: {
      searchPlaceholder: "Поиск ASCII-арта... (напр. оружие, медведь)",
      noResults: "ASCII-арт не найден для"
    },
    invisible: {
      testArea: "Тестовая область",
      testAreaDesc: "Вставьте невидимый символ между скобками, чтобы проверить его ширину."
    },
    braille: {
      braille: "Шрифт Брайля",
      morseCode: "Азбука Морзе",
      inputPlaceholder: "Введите текст здесь..."
    },
    fancyText: {
      inputPlaceholder: "Введите текст здесь..."
    }
  }
};

for (const [locale, keys] of Object.entries(newKeys)) {
  const p = path.join(DICT_DIR, `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  
  // Deep merge
  for (const [section, values] of Object.entries(keys)) {
    if (!data[section]) data[section] = {};
    Object.assign(data[section], values);
  }
  
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
  console.log(`Updated ${locale}.json`);
}

console.log('All dictionaries updated!');

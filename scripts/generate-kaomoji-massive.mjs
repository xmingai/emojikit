import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to generate distinct combinations
function generate(categoryName, categorySlug, icon, partsData, minItems = 200) {
  const result = [];
  const { armsL, armsR, eyesL, eyesR, mouths } = partsData;

  for (let a = 0; a < armsL.length; a++) {
    for (let e = 0; e < eyesL.length; e++) {
      for (let m = 0; m < mouths.length; m++) {
        // match arms and eyes symmetrically if possible, otherwise use index
        const al = armsL[a];
        const ar = armsR[a % armsR.length];
        const el = eyesL[e];
        const er = eyesR[e % eyesR.length];
        const mTh = mouths[m];

        const char = `${al}${el}${mTh}${er}${ar}`;
        
        let slug = `${categorySlug}-${a}-${e}-${m}`;
        result.push({
          unicode: Buffer.from(char).toString('hex').slice(0, 6) + '-' + a + e + m,
          name: `${categoryName} ${a}${e}${m}`,
          char: char,
          description: `A ${categoryName.toLowerCase()} kaomoji expression.`,
          compatibility: ["DISCORD", "TWITTER", "MOST GAMES", "SOCIAL MEDIA"],
          slug: slug
        });

        if (result.length >= minItems) return result;
      }
    }
  }
  return result;
}

const CATEGORIES = [
  {
    name: "Joy & Happy",
    slug: "happy",
    icon: "😀",
    parts: {
      armsL: ["(", "ヽ(", "＼(", "o(", "(*", "꒰", "☆(", "*(", "(っ", "q(", "٩(", "(*^"],
      armsR: [")", ")ﾉ", ")／", ")o", "*)", "꒱", ")☆", ")*", "c)", ")p", ")۶", "^*)"],
      eyesL: ["^", "´", "°", "◡", "˘", "◕", ">", "≧", "･", "☆", "✧", "ơ", "♡", "´･", "≧∇"],
      eyesR: ["^", "`", "°", "◡", "˘", "◕", "<", "≦", "･", "☆", "✧", "ơ", "♡", "･`", "∇≦"],
      mouths: ["_", "ω", "▽", "ヮ", "∀", "v", "ᴗ", "ㅂ", "‿", "ᴥ", "з", "‿‿", "ー"]
    },
    count: 350
  },
  {
    name: "Sad & Crying",
    slug: "sad",
    icon: "😢",
    parts: {
      armsL: ["(", "o(", "（", "༼", "[", "", "(-", "。゜(", "இ"],
      armsR: [")", ")o", "）", "༽", "]", "", "-)", ")゜。", "இ"],
      eyesL: ["T", "ಥ", "╥", ";", "p", "´", "╯", "︵", "T_T ", "ó", "T^", "ಠ"],
      eyesR: ["T", "ಥ", "╥", ";", "q", "`", "╰", "︵", " T_T", "ò", "^T", "ಠ"],
      mouths: ["_", "Д", "︵", "﹏", "︹", "x", "⌓", "︿", "∩", "╭╮", "o", "A"]
    },
    count: 250
  },
  {
    name: "Angry & Table Flip",
    slug: "angry",
    icon: "😡",
    parts: {
      armsL: ["(", "(ﾉ", "(ノಠ", "щ(", "ᕙ(", "(-", "(`", "(╬", "(*", "( ≧", "ヽ( `д´*)ノ"],
      armsR: [")", ")ﾉ", "ಠ)ノ", ")щ", ")ᕗ", "-)", "´)", "╬)", "*)", "≦ )", ""],
      eyesL: ["ಠ", "> ", "≧", "╬", "ò", "ó", "｀", "눈", "Ф"],
      eyesR: ["ಠ", " <", "≦", "╬", "ó", "ò", "´", "눈", "Ф"],
      mouths: ["_", "Д", "益", "皿", "╭╮", "▂", "罒", "A", "□", "o", "x"]
    },
    count: 250
  },
  {
    name: "Love & Cute",
    slug: "love",
    icon: "😍",
    parts: {
      armsL: ["(", "♡(", "꒰", "(♥", "❤(", "(｡", "(〃", "(*", "(*˘", "(๑"],
      armsR: [")", ")♡", "꒱", "♥)", ")❤", "｡)", "〃)", "*)", "˘*)", "๑)"],
      eyesL: ["♡", "♥", "´", "◕", "•", "˘", "´∀", "♡‿", "●"],
      eyesR: ["♡", "♥", "`", "◕", "•", "˘", "∀`", "‿♡", "●"],
      mouths: ["_", "ω", "з", "╭͜ʖ╮", "‿", "▼", " 3 ", "ε", "∀"]
    },
    count: 250
  },
  {
    name: "Animals (Cats, Bears, Dogs)",
    slug: "animals",
    icon: "🐱",
    parts: {
      armsL: ["(=^", "(= ", "ʕ", "ʕ·", "(V", "/ᐠ", "(ᵔ", "(=✧", "U・"],
      armsR: ["^=)", " =)", "ʔ", "·ʔ", "V)", "ᐟ\\", "ᵔ)", "✧=)", "・U"],
      eyesL: ["･", "•", "ᴥ", "ꞈ", " ಠ", "º", "ಥ", "´", "x"],
      eyesR: ["･", "•", "ᴥ", "ꞈ", "ಠ ", "º", "ಥ", "`", "x"],
      mouths: ["ω", "ᴥ", "_", "x", "v", "∀", " ", "w", "ﻌ"]
    },
    count: 300
  },
  {
    name: "Magic & Combat",
    slug: "combat",
    icon: "✨",
    parts: {
      armsL: ["(∩", "╰(", "o()", "▬▬ι", "(/", "O=(", "(ง", "c(", "(-_・)"],
      armsR: [")⊃━☆", ")──☆", "::::::::::::::::::>", "═══════ﺤ", "\\)", ")O", "ง)", ")っ", "▄︻┻┳═一"],
      eyesL: ["^", "ಠ", " ͟ل͜", "´", "ò", "•", "•̀", "´-", " ≖"],
      eyesR: ["^", "ಠ", " ͟ل͜", "`", "ó", "•", "•́", "-`", " ≖"],
      mouths: ["o", "_", " ", "Д", "x", "ω", "v", " ", "‿"]
    },
    count: 300
  },
  {
    name: "Lenny & Lenny Faces",
    slug: "lenny",
    icon: "😎",
    parts: {
      armsL: ["( ", "( ͡", "[ ", "【 ", "༼ ", "ʕ ", "(ง ", "( ✧", "ᕙ( "],
      armsR: [" )", " ͡)", " ]", " 】", " ༽", " ʔ", " ง)", " ✧)", " )ᕗ"],
      eyesL: ["°", "ಠ", "•", "ಡ", "~", "´", ">", "≖", "♥"],
      eyesR: ["°", "ಠ", "•", "ಡ", "~", "`", "<", "≖", "♥"],
      mouths: [" ͜ʖ ", " ͟ʖ ", " ͟ل͜ ", " ╭͜ʖ╮ ", "ᴥ", " ∀ ", " ω ", " ͜ ", " 皿 "]
    },
    count: 300
  }
];

async function main() {
  console.log("Generating Kaomoji combinations...");
  let finalKaomojis = [];

  for (const cat of CATEGORIES) {
    const list = generate(cat.name, cat.slug, cat.icon, cat.parts, cat.count);
    finalKaomojis.push({
      id: cat.slug,
      name: cat.name,
      icon: cat.icon,
      kaomojis: list
    });
  }

  const outPath = path.join(__dirname, "..", "src", "data", "kaomoji-data.json");
  fs.writeFileSync(outPath, JSON.stringify(finalKaomojis, null, 2), "utf-8");
  
  let totalCount = 0;
  finalKaomojis.forEach(c => totalCount += c.kaomojis.length);
  
  console.log(`Successfully generated ${totalCount} Kaomojis across ${CATEGORIES.length} categories.`);
}

main();

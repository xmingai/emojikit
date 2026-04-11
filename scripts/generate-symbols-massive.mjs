import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYMBOL_BLOCKS = [
  { name: "Math Operators", slug: "math", start: 0x2200, end: 0x228F }, // Not all 256 to avoid blanks
  { name: "Logic & Advanced Math", slug: "logic", start: 0x2290, end: 0x22FF },
  { name: "Technical", slug: "tech", start: 0x2300, end: 0x23E8 },
  { name: "Box Drawing", slug: "box", start: 0x2500, end: 0x257F },
  { name: "Block Elements", slug: "blocks", start: 0x2580, end: 0x259F },
  { name: "Geometric", slug: "geometric", start: 0x25A0, end: 0x25FF },
  { name: "Misc Symbols", slug: "misc", start: 0x2600, end: 0x26FF },
  { name: "Dingbats", slug: "dingbats", start: 0x2700, end: 0x27BF },
  { name: "Misc Arrows", slug: "misc-arrows", start: 0x2B00, end: 0x2BFF },
  { name: "Braille Extended", slug: "braille-ext", start: 0x2800, end: 0x28FF },
  { name: "Arrows A", slug: "arrows-a", start: 0x2190, end: 0x21FF }
];

function generateSymbols() {
  const categories = [];

  for (const block of SYMBOL_BLOCKS) {
    const symbolList = [];
    
    for (let code = block.start; code <= block.end; code++) {
      // Basic filter for likely unassigned endpoints
      if (code === 0x2613 || code === 0x261E) continue;

      const char = String.fromCodePoint(code);
      const hex = code.toString(16).toUpperCase().padStart(4, '0');
      
      symbolList.push({
        unicode: `U+${hex}`,
        name: `Symbol U+${hex}`,
        char: char,
        description: `Unicode character ${char} (${block.name})`,
        compatibility: ["HTML", "APPS", "TEXT FORMATS"],
        slug: `sym-${hex}`
      });
    }

    categories.push({
      id: block.slug,
      name: block.name,
      symbols: symbolList
    });
  }

  return categories;
}

async function main() {
  console.log("Generating Massive Symbols...");
  const finalSymbols = generateSymbols();
  
  const outPath = path.join(__dirname, "..", "src", "data", "symbols-data.json");
  fs.writeFileSync(outPath, JSON.stringify(finalSymbols, null, 2), "utf-8");
  
  let totalCount = 0;
  finalSymbols.forEach(c => totalCount += c.symbols.length);
  
  console.log(`Successfully generated ${totalCount} Symbols across ${SYMBOL_BLOCKS.length} categories.`);
}

main();

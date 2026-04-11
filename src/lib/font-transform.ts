// Unicode font transformation maps
// Each map transforms ASCII a-z, A-Z, 0-9 into Unicode variants

type FontMap = {
  name: string;
  slug: string;
  map: Record<string, string>;
};

function buildMap(lower: string[], upper: string[], digits?: string[]): Record<string, string> {
  const m: Record<string, string> = {};
  const alpha = "abcdefghijklmnopqrstuvwxyz";
  const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nums = "0123456789";

  for (let i = 0; i < 26; i++) {
    if (lower[i]) m[alpha[i]] = lower[i];
    if (upper[i]) m[ALPHA[i]] = upper[i];
  }
  if (digits) {
    for (let i = 0; i < 10; i++) {
      if (digits[i]) m[nums[i]] = digits[i];
    }
  }
  return m;
}

function rangeMap(lowerStart: number, upperStart: number, digitStart?: number): Record<string, string> {
  const lower = Array.from({ length: 26 }, (_, i) => String.fromCodePoint(lowerStart + i));
  const upper = Array.from({ length: 26 }, (_, i) => String.fromCodePoint(upperStart + i));
  const digits = digitStart
    ? Array.from({ length: 10 }, (_, i) => String.fromCodePoint(digitStart + i))
    : undefined;
  return buildMap(lower, upper, digits);
}

export const FONT_MAPS: FontMap[] = [
  { name: "Bold", slug: "bold", map: rangeMap(0x1d41a, 0x1d400, 0x1d7ce) },
  { name: "Italic", slug: "italic", map: rangeMap(0x1d44e, 0x1d434) },
  { name: "Bold Italic", slug: "bold-italic", map: rangeMap(0x1d482, 0x1d468) },
  {
    name: "Script",
    slug: "script",
    map: (() => {
      const m = rangeMap(0x1d4b6, 0x1d49c);
      // Fix Script uppercase exceptions (Unicode reserved replacements)
      m["B"] = "ℬ"; m["E"] = "ℰ"; m["F"] = "ℱ"; m["H"] = "ℋ";
      m["I"] = "ℐ"; m["L"] = "ℒ"; m["M"] = "ℳ"; m["R"] = "ℛ";
      // Fix Script lowercase exceptions
      m["e"] = "ℯ"; m["g"] = "ℊ"; m["o"] = "ℴ";
      return m;
    })(),
  },
  { name: "Bold Script", slug: "bold-script", map: rangeMap(0x1d4ea, 0x1d4d0) },
  { name: "Fraktur", slug: "fraktur", map: rangeMap(0x1d51e, 0x1d504) },
  { name: "Bold Fraktur", slug: "bold-fraktur", map: rangeMap(0x1d586, 0x1d56c) },
  { name: "Double-Struck", slug: "double-struck", map: rangeMap(0x1d552, 0x1d538, 0x1d7d8) },
  { name: "Sans-Serif", slug: "sans-serif", map: rangeMap(0x1d5ba, 0x1d5a0, 0x1d7e2) },
  { name: "Sans Bold", slug: "sans-bold", map: rangeMap(0x1d5ee, 0x1d5d4, 0x1d7ec) },
  { name: "Sans Italic", slug: "sans-italic", map: rangeMap(0x1d622, 0x1d608) },
  { name: "Sans Bold Italic", slug: "sans-bold-italic", map: rangeMap(0x1d656, 0x1d63c) },
  { name: "Monospace", slug: "monospace", map: rangeMap(0x1d68a, 0x1d670, 0x1d7f6) },
  {
    name: "Circled",
    slug: "circled",
    map: buildMap(
      Array.from({ length: 26 }, (_, i) => String.fromCodePoint(0x24d0 + i)),
      Array.from({ length: 26 }, (_, i) => String.fromCodePoint(0x24b6 + i)),
      ["⓪", "①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"]
    ),
  },
  {
    name: "Squared",
    slug: "squared",
    map: buildMap(
      Array.from({ length: 26 }, (_, i) => String.fromCodePoint(0x1f130 + i)),
      Array.from({ length: 26 }, (_, i) => String.fromCodePoint(0x1f130 + i))
    ),
  },
  {
    name: "Negative Squared",
    slug: "negative-squared",
    map: buildMap(
      Array.from({ length: 26 }, (_, i) => String.fromCodePoint(0x1f170 + i)),
      Array.from({ length: 26 }, (_, i) => String.fromCodePoint(0x1f170 + i))
    ),
  },
  {
    name: "Small Caps",
    slug: "small-caps",
    map: buildMap(
      "ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ".split(""),
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    ),
  },
  {
    name: "Superscript",
    slug: "superscript",
    map: buildMap(
      "ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖqʳˢᵗᵘᵛʷˣʸᶻ".split(""),
      "ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂˣʸᶻ".split(""),
      ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"]
    ),
  },
  {
    name: "Upside Down",
    slug: "upside-down",
    map: buildMap(
      "ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz".split(""),
      "ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz".split("")
    ),
  },
  {
    name: "Subscript",
    slug: "subscript",
    map: buildMap(
      "ₐbcdₑfgₕᵢⱼₖₗₘₙₒₚqᵣₛₜᵤᵥwₓyz".split(""),
      "ₐBCDₑFGₕᵢⱼₖₗₘₙₒₚQᵣₛₜᵤᵥWₓYZ".split(""),
      ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"]
    ),
  },
  {
    name: "Fullwidth",
    slug: "fullwidth",
    map: buildMap(
      Array.from({ length: 26 }, (_, i) => String.fromCodePoint(0xff41 + i)),
      Array.from({ length: 26 }, (_, i) => String.fromCodePoint(0xff21 + i)),
      Array.from({ length: 10 }, (_, i) => String.fromCodePoint(0xff10 + i))
    ),
  },
  {
    name: "L33t Speak",
    slug: "l33t",
    map: buildMap(
      "4bcd3f9h1jklmn0pqr57uvwxyz".split(""),
      "4BCD3F9H1JKLMN0PQR57UVWXYZ".split("")
    ),
  },
  {
    name: "Faux Cyrillic",
    slug: "faux-cyrillic",
    map: buildMap(
      "дбсdэfgнїjкlмиорqяsтцvшхчz".split(""),
      "ДБСDЭFGНІJКLМИОРQЯSТЦVШХЧZ".split("")
    ),
  },
  {
    name: "Zalgo (Creepy)",
    slug: "zalgo",
    map: {}, // handled specially
  },
  {
    name: "Slash Through",
    slug: "slash-through",
    map: {}, // handled specially
  },
  {
    name: "Strikethrough",
    slug: "strikethrough",
    map: {}, // handled specially
  },
  {
    name: "Underline",
    slug: "underline",
    map: {}, // handled specially
  },
];

export function transformText(text: string, fontSlug: string): string {
  const font = FONT_MAPS.find((f) => f.slug === fontSlug);
  if (!font) return text;

  if (fontSlug === "strikethrough") {
    return [...text].map((c) => c + "\u0336").join("");
  }
  if (fontSlug === "underline") {
    return [...text].map((c) => c + "\u0332").join("");
  }
  if (fontSlug === "upside-down") {
    const result = [...text]
      .map((c) => font.map[c] || c)
      .reverse()
      .join("");
    return result;
  }
  if (fontSlug === "slash-through") {
    return [...text].map((c) => c + "\u0338").join("");
  }
  if (fontSlug === "zalgo") {
    const zalgoUp = ["\u030d","\u030e","\u0304","\u0305","\u033f","\u0311","\u0306","\u0310","\u0352","\u0351","\u0308","\u0309"];
    const zalgoDown = ["\u0316","\u0317","\u0318","\u0319","\u031c","\u031d","\u031e","\u031f","\u0320","\u0324","\u0325","\u0326"];
    const zalgoMid = ["\u0315","\u031b","\u0340","\u0341","\u0358","\u0321","\u0322","\u0327","\u0328","\u0334","\u0335","\u0336"];
    return [...text].map((c, i) => {
      if (c === " ") return c;
      const u = zalgoUp[(i * 3 + 1) % zalgoUp.length];
      const d = zalgoDown[(i * 5 + 2) % zalgoDown.length];
      const m = zalgoMid[(i * 7 + 3) % zalgoMid.length];
      return c + u + m + d;
    }).join("");
  }

  return [...text].map((c) => font.map[c] || c).join("");
}

export function transformAllFonts(text: string): { name: string; slug: string; result: string }[] {
  return FONT_MAPS.map((font) => ({
    name: font.name,
    slug: font.slug,
    result: transformText(text, font.slug),
  }));
}

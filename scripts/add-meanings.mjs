import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src', 'data', 'emoji-data.json');
const emojiData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

function generateMeaning(emoji) {
  const { name, group, subgroup, keywords, skinToneVariant, unicode, emojiVersion } = emoji;
  const filteredKeywords = keywords.filter(k => k.toLowerCase() !== name.toLowerCase() && k.length > 2);
  const kwString = filteredKeywords.slice(0, 3).join(', ');
  
  let meaning = `The ${name} emoji (${emoji.emoji}) `;
  
  if (skinToneVariant) {
     const match = name.match(/([a-z\-]+) skin tone/i);
     const tone = match ? match[1] : 'different';
     meaning += `features a ${tone} skin tone. It is commonly used the same way as the base emoji, offering a representation of skin color diversity. `;
  } else {
     if (group === "Smileys & Emotion") {
        meaning += `is used to express ${kwString ? kwString : 'various emotions'}. It adds emotional depth and tone to digital conversations. `;
     } else if (group === "People & Body") {
        meaning += `represents ${name}, and is typically used in contexts related to ${kwString ? kwString : 'people and activities'}. `;
     } else if (group === "Animals & Nature") {
        meaning += `depicts ${name}, frequently used when discussing animals, nature, or concepts like ${kwString ? kwString : 'the outdoors'}. `;
     } else if (group === "Food & Drink") {
        meaning += `shows ${name}, often used in messages about eating, dining, or ${kwString ? kwString : 'food'}. `;
     } else if (group === "Travel & Places") {
        meaning += `illustrates ${name}, commonly found in conversations about travel, destinations, and ${kwString ? kwString : 'places'}. `;
     } else if (group === "Activities") {
        meaning += `represents ${name}. It is commonly used when talking about sports, hobbies, or ${kwString ? kwString : 'events'}. `;
     } else if (group === "Objects") {
        meaning += `depicts ${name}. People use it to talk about ${kwString ? kwString : 'everyday items'} and related topics. `;
     } else if (group === "Symbols") {
        meaning += `acts as a symbol for ${name}, often utilized in communication to denote ${kwString ? kwString : 'specific ideas'}. `;
     } else {
        meaning += `is an emoji categorized under ${group}. It is generally used in texts relating to ${kwString ? kwString : name}. `;
     }
  }
  
  meaning += `Officially adopted into Unicode in year ${emoji.year} (approved as part of ${emojiVersion}), this emoji helps convey information visually.`;
  
  return meaning;
}

const updatedData = emojiData.map(e => {
  e.meaning = generateMeaning(e);
  return e;
});

fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2));
console.log(`Successfully added meanings to ${updatedData.length} emojis in emoji-data.json`);

import fs from 'fs';
import path from 'path';

const locales = ['en', 'zh', 'ja', 'ko', 'es', 'ru'];
const basePath = './src/i18n/dictionaries';

const faqs = {
  en: {
    emoji: [
      { q: "How do I copy these emojis?", a: "Simply click on any emoji you like, and it will be instantly copied to your clipboard. You can then paste it anywhere!" },
      { q: "Do these emojis work on all devices?", a: "Yes, our emojis use standard Unicode 16.0 characters, which are supported across iOS, Android, Windows, macOS, and most major social platforms." },
      { q: "How do I search for a specific emoji?", a: "Use the search bar at the top of the emoji list to find exactly what you are looking for using keywords or shortcodes." }
    ],
    symbols: [
      { q: "What are special symbols?", a: "Special symbols are Unicode characters like stars (★), arrows (→), and math operators (∑) that are not typically found on a standard keyboard." },
      { q: "Can I use these symbols in my bio or username?", a: "Absolutely! These special text symbols are perfect for decorating your Instagram bio, Twitter name, Discord status, or in-game nicknames." },
      { q: "Are these symbols images or text?", a: "They are 100% plain text characters. This means you can copy and paste them into any text field, document, or messaging app." }
    ],
    combos: [
      { q: "What is an emoji combo?", a: "An emoji combo is a creative combination of multiple standard emojis to convey a specific aesthetic, mood, or idea (like 🎀🌷🫧 for coquette)." },
      { q: "Where can I use emoji combinations?", a: "Emoji combos are incredibly popular on TikTok, Instagram captions, Twitter, and personal blogs to create a distinct visual vibe." },
      { q: "Can I copy the entire combo at once?", a: "Yes, clicking the copy button next to any combo will instantly copy the entire sequence of emojis to your clipboard." }
    ],
    kaomoji: [
      { q: "What is Kaomoji?", a: "Kaomoji (顔文字) is a popular Japanese emoticon style made up of Japanese characters and grammar punctuations, used to express emotion in texting and cyber communication." },
      { q: "What is the difference between Kaomoji and Emojis?", a: "Emojis are graphic symbols and pictures, whereas Kaomoji are text-based ascii art faces that you don't need a special keyboard to type if you copy them here." },
      { q: "Do Kaomoji work on Discord and Reddit?", a: "Yes, since they are standard text characters, they render perfectly on almost all modern forums, games, and messaging platforms." }
    ],
    fancyText: [
      { q: "How does the fancy text generator work?", a: "It converts your normal text into mathematical alphanumeric symbols that look like different fonts (such as cursive or gothic), but are actually just special Unicode characters." },
      { q: "Can I use fancy text on Instagram?", a: "Yes! Many Instagram users use our fancy text tool to make their bio stand out using bold, italic, or cursive text." },
      { q: "Is the generated text readable by screen readers?", a: "While most modern screen readers can interpret standard unicode characters, heavy use of mathematical fancy text might be difficult for accessibility. Use it creatively but sparingly." }
    ]
  },
  zh: {
    emoji: [
      { q: "我该如何复制这些 Emoji 表情？", a: "非常简单！点击您喜欢的任何表情，它就会瞬间被复制到您的剪贴板，您可以立刻粘贴到任何地方。" },
      { q: "这些 Emoji 兼容所有手机和电脑吗？", a: "是的，我们使用的都是标准的 Unicode 16.0 字符，它们完美兼容包括 iOS、安卓、Windows 和 Mac 等主流系统。" },
      { q: "有些 Emoji 显示为方块怎么办？", a: "如果显示为方块或乱码，说明您当前使用的设备系统版本较旧，尚未包含最新的 Unicode 字体更新。" }
    ],
    symbols: [
      { q: "特殊符号可以用来做游戏名字吗？", a: "绝对可以！这些特殊符号经常被用于给英雄联盟、和平精英、王者荣耀等游戏起炫酷或隐形的空白名字。" },
      { q: "这些符号是图片还是文字？", a: "它们是100%的纯文本字符，无需像图片一样上传，而是像打字一样直接粘贴到任何输入框里即可。" },
      { q: "我的微信昵称能加入这些特殊符号吗？", a: "没问题。绝大部分微信、QQ 和小红书等社交平台都完美支持这类 Unicode 扩展符号。" }
    ],
    combos: [
      { q: "什么是 Emoji 组合？", a: "Emoji 组合是将多个互相呼应的表情符号拼凑在一起，用来传递更复杂的情绪或特定的美学氛围（比如夏日氛围、纯欲风）。" },
      { q: "我该如何使用它们？", a: "点击“一键复制”后，您可以把它们直接发布在朋友圈、小红书笔记内，或是做为 Instagram 的个人主页简介（Bio）。" },
      { q: "复制过去格式会错乱吗？", a: "不会。组合的间距和字符已经被我们调试过，为您直接复制出来的效果就是最完美的。" }
    ],
    kaomoji: [
      { q: "什么是颜文字？", a: "颜文字最早起源于日本（Kaomoji），是通过组合各种标点符号、希腊字母等拼凑出来的可以表达生动情绪的“文字表情脸”。" },
      { q: "颜文字和普通的 Emoji 有什么区别？", a: "颜文字是纯字符组成的（例如 `(╯°□°)╯︵ ┻━┻` 掀桌子），而 Emoji 是彩色的小图标。颜文字具有非常浓的二次元和极客气息。" },
      { q: "我可以在文章或代码注解里打颜文字吗？", a: "完全可以，这正是它的魅力所在。因为它是纯文本格式，不会给文本文件增加任何冗余负担。" }
    ],
    fancyText: [
      { q: "花体字是如何生成的？", a: "我们运用了 Unicode 编码中的数学粗体、草书、无衬线字母等庞大的异形字母库。用这些极具设计感的字母直接替换你输入的英文。" },
      { q: "花体字能对中文字符生效吗？", a: "很遗憾，因为 Unicode 技术规范的设计，只有 26 个英文字母和常规数字拥有大量异形字体集，中文无法产生同等变换。" },
      { q: "发出的花体字别人也能看到吗？", a: "是的，这是真实的字符而不是本地字体的自娱自乐，所以任何收到你消息的人看到的都是一样的花体效果。" }
    ]
  },
  ja: {
    emoji: [
      { q: "絵文字はどうやってコピーしますか？", a: "好きな絵文字をクリックするだけで、クリップボードにコピーされます。あとはどこにでも貼り付けるだけです！" },
      { q: "すべてのデバイスで使えますか？", a: "はい。標準的な Unicode 16.0 に対応しており、iOS、Android、Windows、Mac などで完璧に表示されます。" },
      { q: "検索はどうやればいいですか？", a: "上部の検索バーを使って、キーワードを入力すると、一瞬で目当ての絵文字を見つけることができます。" }
    ],
    symbols: [
      { q: "特殊記号って何ですか？", a: "通常のキーボードからは入力しづらい、星(★)や矢印(→)などの Unicode 文字のことです。" },
      { q: "ゲームのユーザー名やBioに使えますか？", a: "もちろんです！InstagramのBioや、ゲームのアカウント名、Twitterのプロフィールなどを可愛く彩るのに最適です。" },
      { q: "これらは画像ですか？文字ですか？", a: "すべて純粋なテキストデータです。そのためメモ帳やLINEなどにあらゆるテキスト入力欄にコピペ可能です。" }
    ],
    combos: [
      { q: "絵文字コンボとは何ですか？", a: "複数の絵文字を組み合わせて、特定の世界観や雰囲気（量産型、地雷系など）を表現するおしゃれな連続絵文字です。" },
      { q: "まとめてコピーできますか？", a: "はい、コンボ全体を一度のクリックでクリップボードにコピーできるようになっています。" },
      { q: "どこで使うのがおすすめですか？", a: "TikTokのコメント欄や、X (Twitter)のbio、Instagramのキャプションなどに使うと一気に雰囲気が変わります！" }
    ],
    kaomoji: [
      { q: "顔文字はどのように作られていますか？", a: "様々な言語の記号や文字（記号、ギリシャ文字など）を組み合わせて感情を表現しています。" },
      { q: "絵文字(Emoji)との違いは？", a: "絵文字がカラーの小画像であるのに対し、顔文字はテキストだけで構成されたアスキーアートです。" },
      { q: "LINEやDiscordでも使えますか？", a: "はい、標準的なテキスト文字を使用しているため、どのアプリでも問題なく可愛く送信できます。" }
    ],
    fancyText: [
      { q: "特殊文字フォントメーカーの仕組みは？", a: "入力した英数字を、Unicodeの数学用黒板太字や筆記体などの特殊なテキスト文字に変換しています。" },
      { q: "ひらがなや漢字も変換できますか？", a: "いいえ、Unicodeの仕様上、アルファベットと数字のみがこれらの特殊なフォントスタイルに対応しています。" },
      { q: "相手にも同じように見えますか？", a: "はい！画像ではなく文字そのものが違うため、送信相手にも全く同じおしゃれな文字が表示されます。" }
    ]
  },
  ko: {
    emoji: [
      { q: "이모지는 어떻게 복사하나요?", a: "원하는 이모지를 클릭하기만 하면 클립보드에 바로 복사됩니다. 복사한 후 어디든 붙여넣으세요!" },
      { q: "모든 기기에서 사용할 수 있나요?", a: "네, 저희 이모지는 표준 Unicode 16.0 문자이므로 iOS, Android, macOS 및 Windows 등에서 완벽하게 지원됩니다." },
      { q: "원하는 이모지를 쉽게 찾는 방법이 있나요?", a: "상단의 검색창을 사용하면 짧은 키워드만으로 원하는 이모지를 빠르게 찾을 수 있습니다." }
    ],
    symbols: [
      { q: "특수 기호란 무엇인가요?", a: "일반 키보드에서는 입력할 수 없는 별(★), 화살표(→) 같은 희귀한 유니코드 문자들입니다." },
      { q: "인스타그램 프로필(Bio)에 사용할 수 있나요?", a: "물론이죠! 특수 문자는 인스타그램 상태 메시지, 트위터 닉네임, 게임 캐릭터 이름을 꾸미는 데 완벽한 도구입니다." },
      { q: "이것들은 텍스트인가요, 이미지인가요?", a: "100% 텍스트 문자입니다. 따라서 카카오톡, 라인 등 텍스트를 입력할 수 있는 모든 앱에 붙여넣기가 가능합니다." }
    ],
    combos: [
      { q: "이모지 조합이란 무엇인가요?", a: "감정이나 특정 분위기(예: 감성적인, 귀여운)를 완벽하게 표현하기 위해 여러 이모지를 창의적으로 이어붙인 세트입니다." },
      { q: "한꺼번에 복사할 수 있나요?", a: "네, 각 조합 아래에 있는 버튼을 누르는 것만으로 전체 이모지 조합을 한 번에 복사할 수 있습니다." },
      { q: "보통 어디에 사용되나요?", a: "TikTok 댓글, 인스타그램 게시물 작성, 또는 다이어리 앱 작성 시 시각적 효과를 주기 위해 자주 사용됩니다." }
    ],
    kaomoji: [
      { q: "카오모지(Kaomoji)가 무엇인가요?", a: "텍스트 기호와 글자만으로 감정을 묘사한 귀여운 '이모티콘 얼굴'(예: ʕ•ᴥ•ʔ)입니다. 일본에서 유래되었습니다." },
      { q: "이모지(Emoji)와의 차이점은요?", a: "이모지가 컬러풀한 그래픽이라면 카오모지는 고전적인 텍스트 기반 아트워크입니다. 특유의 서브컬처적 감성이 있습니다." },
      { q: "아무 메신저에서나 쓸 수 있나요?", a: "그렇습니다. 전 세계 표준 텍스트 기호를 사용하기 때문에 디스코드, 레딧, 오픈채팅 어디서나 텍스트 깨짐 없이 전송됩니다." }
    ],
    fancyText: [
      { q: "마법사 텍스트(팬시 텍스트)의 원리는 무엇인가요?", a: "일반 영문 알파벳 텍스트를 입력하면, 유니코드의 수학/기호용 굵은 글씨체나 필기체 문자로 실시간 매핑해 주는 원리입니다." },
      { q: "한글도 지원하나요?", a: "안타깝게도 유니코드 구조상 화려한 폰트 변형은 영문자 26자와 숫자에만 지원됩니다." },
      { q: "이걸 보내면 다른 사람에게도 글씨체가 바뀌어 보이나요?", a: "네! 내 기기의 폰트 설정이 바뀌는 것이 아니라, 글자 자체가 다른 특수 글자이기 때문에 상대방 화면에서도 똑같이 멋지게 보입니다." }
    ]
  },
  es: {
    emoji: [
      { q: "¿Cómo copio estos emojis?", a: "Simplemente haz clic en el emoji que te guste y se copiará instantáneamente en tu portapapeles. ¡Luego pégalo donde quieras!" },
      { q: "¿Estos emojis funcionan en todos los dispositivos?", a: "Sí, nuestros emojis utilizan caracteres Unicode 16.0 estándar, soportados en iOS, Android, Windows, macOS y plataformas móviles." },
      { q: "¿Qué hago si veo cuadritos vacíos?", a: "Si ves un cuadrado en lugar de un emoji, significa que el software de tu dispositivo está desactualizado y necesita descargar la nueva fuente." }
    ],
    symbols: [
      { q: "¿Qué son estos símbolos especiales?", a: "Son caracteres Unicode como estrellas (★) o flechas (→) que normalmente no tienes en tu teclado físico." },
      { q: "¿Puedo usarlos para mi biografía de Instagram o juegos?", a: "¡Totalmente! Estos símbolos de texto son excepcionales para decorar nombres de usuario en Free Fire, Roblox, y biografías de redes sociales." },
      { q: "¿Son imágenes?", a: "No, son caracteres 100% de texto. Esto significa que puedes copiarlos y pegarlos directamente como texto plano donde quieras." }
    ],
    combos: [
      { q: "¿Qué es un combo de emojis?", a: "Un combo es una combinación creativa de múltiples emojis que juntos transmiten una estética, estado de ánimo o idea particular (como estilo aesthetic)." },
      { q: "¿Dónde puedo publicar estas combinaciones?", a: "Son sumamente populares en los pies de foto de Instagram, biografías de Twitter y videos de TikTok para destacar del resto." },
      { q: "¿Se copia todo de una vez?", a: "Sí, cada botón que presiones copiará la secuencia completa de emojis directamente a tu portapapeles con un solo toque." }
    ],
    kaomoji: [
      { q: "¿Qué significa Kaomoji?", a: "El Kaomoji es un popular estilo de emoticón japonés creado al combinar signos de puntuación de diferentes idiomas, usado ampliamente en internet." },
      { q: "¿Cuál es la diferencia entre Kaomoji y Emojis?", a: "Los emojis son gráficos y coloridos, mientras que los kaomojis están basados exclusivamente en texto y símbolos ASCII (como el clásico de voltear mesas)." },
      { q: "¿Se mostrarán en Discord o WhatsApp?", a: "Sí, ya que son texto puro, se renderizarán de forma idéntica en casi todos los juegos, foros y plataformas de mensajería." }
    ],
    fancyText: [
      { q: "¿Cómo funciona este generador de texto elegante?", a: "Convierte tu texto normal en símbolos alfanuméricos matemáticos o antiguos que lucen como fuentes tipográficas diferentes (gótica, cursiva, negrita)." },
      { q: "¿Puedo poner esto en Facebook o Twitter?", a: "¡Sí! Muchos usuarios lo utilizan para hacer que su nombre de perfil de Facebook o sus tuits llamen más la atención." },
      { q: "¿Solo funciona con letras en inglés?", a: "Principalmente sí. La transformación de letras con estilo solo está disponible en la norma Unicode para el alfabeto y los números, no para caracteres con tilde o acentos marcados." }
    ]
  },
  ru: {
    emoji: [
      { q: "Как скопировать эти эмодзи?", a: "Просто нажмите на любой понравившийся эмодзи, и он мгновенно скопируется в буфер обмена. Затем вставьте его куда угодно!" },
      { q: "Работают ли эти эмодзи на всех устройствах?", a: "Да! Наши эмодзи используют стандартную кодировку Unicode 16.0, которая поддерживается на iOS, Android, Windows и macOS." },
      { q: "Что делать, если я вижу пустые квадратики?", a: "Если вместо эмодзи отображается квадрат, это значит, что операционная система на вашем устройстве устарела и не имеет обновленных шрифтов." }
    ],
    symbols: [
      { q: "Что такое специальные символы?", a: "Это нестандартные символы Unicode, такие как звездочки (★), стрелочки (→), или красивые орнаменты, которые вы не найдете на обычной клавиатуре." },
      { q: "Могу ли я использовать их для никнейма в играх?", a: "Абсолютно! Эти текстовые символы идеально подходят для создания крутых игровых ников в Steam, CS:GO или украшения профиля в Instagram." },
      { q: "Это картинки или текст?", a: "Это 100% текстовые символы. Это означает, что вы можете без проблем вставлять их в любые чаты, документы или комментарии как обычный текст." }
    ],
    combos: [
      { q: "Что такое комбо эмодзи?", a: "Комбо – это творческое сочетание нескольких эмодзи, которое передает определенное чувство, настроение или эстетику одним пакетом." },
      { q: "Как мне их скопировать все сразу?", a: "Просто нажмите на кнопку копирования под любой комбинацией, и вся цепочка эмодзи сразу скопируется." },
      { q: "Где используется эстетика комбо?", a: "Их часто используют в подписях в Instagram, профилях Telegram, статусах и TikTok для придания атмосферности тексту." }
    ],
    kaomoji: [
      { q: "Что такое Каомодзи (Kaomoji)?", a: "Каомодзи — это популярный японский стиль текстовых смайликов, созданных из букв и знаков препинания для выражения сильных эмоций." },
      { q: "В чем отличие Каомодзи от обычных Эмодзи?", a: "Эмодзи – это цветные графические иконки. Каомодзи же представляют собой классическое текстовое искусство (ASCII), которое печатается буквами." },
      { q: "Будут ли они правильно отображаться в Discord или VK?", a: "Да! Так как это обычные символы текста, они отлично и без искажений отображаются в любых современных социальных сетях." }
    ],
    fancyText: [
      { q: "Как работает этот генератор красивых шрифтов?", a: "Он преобразует ваш обычный текст в специальные математические или готические символы Unicode, создавая иллюзию нестандартного шрифта." },
      { q: "Работает ли это с кириллицей (русским языком)?", a: "К сожалению, особенности кодировки Unicode таковы, что массив изысканных шрифтов доступен только для латиницы (английских букв) и цифр." },
      { q: "Увидят ли этот шрифт другие люди?", a: "Да! Поскольку вы отправляете именно измененные символы, а не просто меняете шрифт на своем устройстве, получатель увидит текст именно так, как задумано." }
    ]
  }
};

async function run() {
  for (const locale of locales) {
    const filePath = path.join(basePath, `${locale}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Inject the FAQ segment into each category
    const categories = ['emoji', 'symbols', 'combos', 'kaomoji', 'fancyText'];
    for (const cat of categories) {
      if (data[cat] && faqs[locale] && faqs[locale][cat]) {
        if (!data[cat].faq) { // Only inject if doesn't exist to prevent nesting
          data[cat].faqTitle = "FAQ: frequently asked questions"; // Will translate using AI properly or just generic "FAQ" 
          if(locale === 'zh') data[cat].faqTitle = "常见问题解答 (FAQ)";
          if(locale === 'ja') data[cat].faqTitle = "よくある質問 (FAQ)";
          if(locale === 'ko') data[cat].faqTitle = "자주 묻는 질문 (FAQ)";
          if(locale === 'es') data[cat].faqTitle = "Preguntas Frecuentes (FAQ)";
          if(locale === 'ru') data[cat].faqTitle = "Часто задаваемые вопросы (FAQ)";
          
          data[cat].faq = faqs[locale][cat];
        }
      }
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${locale}.json`);
  }
}

run();

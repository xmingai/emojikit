import fs from 'fs';
import path from 'path';

const locales = ['en', 'zh', 'ja', 'ko', 'es', 'ru'];
const basePath = './src/i18n/dictionaries';

const homeFaqs = {
  en: [
    { q: "What is MojiCap?", a: "MojiCap is a completely free, lightning-fast platform that allows you to instantly copy and paste emojis, special symbols, text art, and fancy fonts to any device or application." },
    { q: "Do I need to download an app or keyboard?", a: "No! MojiCap works entirely in your browser. There is no software to install or sign-up required. Just tap to copy." },
    { q: "Are these emojis free to use?", a: "Yes, 100% free! You can use everything you copy from our site on Instagram, Twitter, TikTok, Discord, and messaging apps." }
  ],
  zh: [
    { q: "MojiCap 是什么？", a: "MojiCap 是一个完全免费且极速运行的在线工具库。它允许你通过点击，瞬间复制并使用所有的最新 Emoji、特殊符号、颜文字和花体字。" },
    { q: "我需要下载 App 或特定的输入法吗？", a: "完全不需要！MojiCap 100% 在你的浏览器中运行。没有弹窗、无需注册登录，也不用安装任何杂乱的软件，即用即走。" },
    { q: "可以直接用在微信和小红书里吗？", a: "当然可以。你在 MojiCap 复制的所有表情和符号，都是标准的 Unicode 文本，可以直接粘贴到微信、QQ、小红书、抖音、微博等任何平台。" }
  ],
  ja: [
    { q: "MojiCap とは何ですか？", a: "MojiCapは、あらゆる絵文字、特殊記号、顔文字、おしゃれなフォントをワンクリックでコピー＆ペーストできる、完全無料・超高速のプラットフォームです。" },
    { q: "アプリやキーボードのダウンロードは必要ですか？", a: "いいえ！MojiCapはブラウザ上で完全に動作します。ソフトウェアのインストールもサインアップも一切不要です。" },
    { q: "本当に全部無料で使えますか？", a: "はい、100%無料です！当サイトでコピーしたものはすべて、Instagram、Twitter(X)、TikTok、LINEなどで自由に使用できます。" }
  ],
  ko: [
    { q: "MojiCap이 무엇인가요?", a: "MojiCap은 이모지, 특수 기호, 카오모지, 그리고 팬시 텍스트(예쁜 글씨체)를 어떤 기기나 앱에든 즉시 복사하여 붙여넣을 수 있는 완전 무료 초고속 온라인 플랫폼입니다." },
    { q: "앱이나 전용 키보드를 꼭 설치해야 하나요?", a: "전혀 아닙니다! MojiCap은 브라우저에서 바로 작동합니다. 회원가입이나 앱 설치 없이 클릭 한 번으로 모든 기능을 사용할 수 있습니다." },
    { q: "모든 기호를 무료로 쓸 수 있나요?", a: "네, 100% 무료입니다! 이 사이트에서 복사한 모든 텍스트는 인스타그램, 틱톡, 트위터, 카카오톡 등에 완벽하게 호환됩니다." }
  ],
  es: [
    { q: "¿Qué es MojiCap?", a: "MojiCap es una plataforma completamente gratuita y ultrarrápida que te permite copiar y pegar emojis, símbolos especiales, arte ASCII y fuentes elegantes al instante." },
    { q: "¿Necesito descargar una aplicación o teclado especial?", a: "¡No! MojiCap funciona totalmente en tu navegador web. No hay software que instalar ni cuentas que registrar. Solo toca para copiar." },
    { q: "¿Puedo usarlos en mis redes sociales?", a: "Sí, es 100% libre. Puedes usar todo lo que copies de nuestro sitio en Instagram, Twitter (X), TikTok, Discord o WhatsApp." }
  ],
  ru: [
    { q: "Что такое MojiCap?", a: "MojiCap — это абсолютно бесплатная, молниеносная онлайн-платформа. Она позволяет вам мгновенно копировать любые эмодзи, классные символы, Каомодзи и красивые шрифты." },
    { q: "Нужно ли скачивать приложение или новую клавиатуру?", a: "Нет! MojiCap полностью работает прямо в вашем браузере. Не нужно ничего устанавливать и не требуется регистрация." },
    { q: "Эти символы бесплатны?", a: "Да, абсолютно всё бесплатно! Вы можете использовать скопированные у нас символы в Telegram, Discord, Instagram, VK и TikTok." }
  ]
};

async function run() {
  for (const locale of locales) {
    const filePath = path.join(basePath, `${locale}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (data.home && homeFaqs[locale]) {
      if (!data.home.faq) {
        data.home.faqTitle = "FAQ: frequently asked questions";
        if(locale === 'zh') data.home.faqTitle = "常见问题解答 (FAQ)";
        if(locale === 'ja') data.home.faqTitle = "よくある質問 (FAQ)";
        if(locale === 'ko') data.home.faqTitle = "자주 묻는 질문 (FAQ)";
        if(locale === 'es') data.home.faqTitle = "Preguntas Frecuentes (FAQ)";
        if(locale === 'ru') data.home.faqTitle = "Часто задаваемые вопросы (FAQ)";
        
        data.home.faq = homeFaqs[locale];
      }
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated home FAQ for ${locale}.json`);
  }
}

run();

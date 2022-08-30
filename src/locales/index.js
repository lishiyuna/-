import { createI18n } from "vue-i18n";

// 这是ElementPlus国际化配置文件
import el_zh_cn from "element-plus/lib/locale/lang/zh-cn";
import el_en from "element-plus/lib/locale/lang/en";
import el_ja from "element-plus/lib/locale/lang/ja";

// 这是我们自己的国际化配置文件
import zh_cn from "./lang/zh-cn";
import en from "./lang/en";
import ja from "./lang/ja";

const messages = {
  // 中文的翻译文件
  "zh-CN": {
    el: el_zh_cn,
    ...zh_cn,
  },
  // 英语的翻译
  "en-US": {
    el: el_en,
    ...en,
  },
  // 日语的翻译
  "ja-PN": {
    el: el_ja,
    ...ja,
  },
};

const i18n = createI18n({
  locale: localStorage.getItem(process.env.VUE_APP_LANG_NAME) || "zh-CN",
  fallbackLocale: "zh-CN",
  globalInjection: true,
  messages,
});

export default i18n;

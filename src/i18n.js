import {createI18n} from "vue-i18n";
import zh from "../public/lang/web/zh_CN.json";
import en from "../public/lang/web/en_US.json";

const i18n = createI18n({
    locale: new URL(location).searchParams.get('lang') ?? 'zh',
    fallbackLocale: 'en',
    messages: {
        "zh": zh,
        "en": en,
    },
})

export default i18n;

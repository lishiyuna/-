import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 暗黑主题
import 'element-plus/theme-chalk/dark/css-vars.css'
//引入message-box的样式
import "element-plus/es/components/message-box/style/css";
//引入message的样式
import "element-plus/es/components/message/style/css";

import MakeitCaptcha from 'makeit-captcha'
import 'makeit-captcha/dist/captcha.min.css'

const app = createApp(App)
// 使用 MotionPlugin 插件来做动画
import { MotionPlugin } from "@vueuse/motion";
app.use(MotionPlugin);

// 使用国际化插件
import i18n from "@/locales";
app.use(i18n);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store).use(router).mount('#app')
app.use(MakeitCaptcha)

app.config.globalProperties.$HOST="http://localhost:3000"
import { createApp } from 'vue'
import App from './App.vue'
import 'modern-css-reset'
import './global.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import 'uno.css'

const app = createApp(App)

app.use(ElementPlus)

app.mount('#app')

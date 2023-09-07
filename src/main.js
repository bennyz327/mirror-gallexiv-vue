import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/router.js";

// 引入 vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles';

// 創建 Vue 應用程式實例
const app = createApp(App)
// 使用 Vue Router
app.use(router)

// 引入 Element Plus CSS
import 'element-plus'
import 'element-plus/dist/index.css'

// 引入 Bootstrap CSS 和 JS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

// 引入 Bootstrap-Icons
import './assets/css/bootstrap-icons.min.css'

// 使用 vuetify
const vuetify = createVuetify({
    components,
    directives,
})
// 使用vuetify
app.use(vuetify)

// 使用 Naive UI
import {create, NButton, NDynamicTags, NUpload, NRadio, NSpace} from 'naive-ui'
const naive = create({
    components: [NButton, NDynamicTags, NUpload, NRadio, NSpace]
})
app.use(naive)

// 掛載到 #app 元素
app.mount('#app')
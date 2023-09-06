import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/router.js";

// 引入 vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles';

// 引入 Naive UI
import {create, NButton, NDynamicTags, NUpload, NRadio, NSpace} from 'naive-ui'

// 引入 Element Plus CSS
import 'element-plus'
import 'element-plus/dist/index.css'

// 引入 Bootstrap CSS 和 JS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

// 引入 Bootstrap-Icons
import './assets/css/bootstrap-icons.min.css'

// 引入 Vue Slick Carousel CSS
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

// 引入上傳圖片組件


// 創建 Vue 應用程式實例
const app = createApp(App)

// 使用 Vue Router
app.use(router)

// 使用 vuetify
const vuetify = createVuetify({
    components,
    directives,
})

// 使用vuetify
app.use(vuetify)

// 使用 Naive UI
const naive = create({
    components: [NButton, NDynamicTags, NUpload, NRadio, NSpace]
})
app.use(naive)

// app.config.globalProperties.$formatSize = function(size) {
//     if (size > 1024 * 1024 * 1024 * 1024) {
//         return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB'
//     } else if (size > 1024 * 1024 * 1024) {
//         return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
//     } else if (size > 1024 * 1024) {
//         return (size / 1024 / 1024).toFixed(2) + ' MB'
//     } else if (size > 1024) {
//         return (size / 1024).toFixed(2) + ' KB'
//     }
//     return size.toString() + ' B'
// }

// 掛載到 #app 元素
app.mount('#app')
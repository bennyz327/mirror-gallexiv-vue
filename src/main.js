import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/router.js";



// 基本匯入區(vue頁面)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

//套件匯入區


createApp(App).use(router).mount('#app')
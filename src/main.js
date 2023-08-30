import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/router.js";


//vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
    components,
    directives,
})

// Naive UI
import {create, NButton} from 'naive-ui'

const naive = create({
    components: [NButton]
})

// 基本匯入區(vue頁面)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

// 輪播


//套件匯入區


createApp(App).use(router).use(vuetify).use(naive).mount('#app')
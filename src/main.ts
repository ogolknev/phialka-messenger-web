import './style/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import root from './root.vue'
import router from '@/router'

const app = createApp(root)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.mount('#app')

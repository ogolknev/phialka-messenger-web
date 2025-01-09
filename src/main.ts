import './style/main.css'

import { createApp } from 'vue'
import root from './root.vue'
import router from '@/router'

const app = createApp(root)

app.use(router)
app.mount('#app')

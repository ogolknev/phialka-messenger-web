import { App } from './ui'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')

router.push('/auth')

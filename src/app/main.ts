import App from "./ui/App.vue"
import { createApp } from "vue"
import { createPinia } from "pinia"
import { router } from "./router"
import "./ui/style/main.css"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount("#app")

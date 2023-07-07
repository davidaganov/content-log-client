import { createApp } from "vue"
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"

import ElementPlus from "element-plus"
import "element-plus/dist/index.css"

import App from "./App.vue"
import router from "./router"

import "./assets/styles/main.scss"

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(ElementPlus).use(pinia).use(router).mount("#app")

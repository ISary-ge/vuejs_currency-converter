import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store/index"
import PrimeVue from "primevue/config"
import "./index.css"

import "primevue/resources/themes/lara-dark-teal/theme.css" //theme
import "primevue/resources/primevue.min.css" //core css
import "primeflex/primeflex.css"
import "primeicons/primeicons.css" //icons

const app = createApp(App)

app.use(PrimeVue).use(store).use(router).mount("#app")

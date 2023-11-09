import { createApp } from 'vue'
import { plugin, defaultConfig } from '@formkit/vue'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css";
import './assets/style.css'
import '@formkit/themes/genesis'
import App from './App.vue'
import config from '../formkit.config.js'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

const toastOptipons = {
    timeout: 2000
}
const app = createApp(App)
app.use(plugin, defaultConfig(config))
app.use(autoAnimatePlugin)
app.use(Toast, toastOptipons)
app.mount('#app')

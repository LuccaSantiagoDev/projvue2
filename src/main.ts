import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'

axios.defaults.baseURL = 'https://8080-mineda-springboot3app-yo7bz5ido0z.ws-us106.gitpod.io/'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

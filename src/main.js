import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import VueAxios from 'vue-axios'
import axios from 'axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)

axios.defaults.withCredentials = true
// axios.defaults.baseURL = '/cors'
axios.defaults.maxRedirects = 0

app.use(router)
app.use(VueCookies)
app.use(VueAxios,axios)
app.mount('#app')
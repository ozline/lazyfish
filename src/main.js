import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import VueAxios from 'vue-axios'
import axios from 'axios'
import TDesign from 'tdesign-vue-next'
import { MessagePlugin } from 'tdesign-vue-next';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)

axios.defaults.withCredentials = true
// axios.defaults.baseURL = '/cors'
axios.defaults.maxRedirects = 0

app.use(router)
app.use(store)
app.use(VueCookies)
app.use(TDesign)
app.use(VueAxios,axios)
app.use(MessagePlugin)
app.mount('#app')
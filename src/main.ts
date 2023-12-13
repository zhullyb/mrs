import { createApp } from 'vue'
import pinia from './stores/'
import router from './routers'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(Antd)

app.mount('#app')
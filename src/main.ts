import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 引入element-plus插件 
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入模板的全局样式   
import './styles/index.scss'
// 引入路由
import router from './router'
// 引入仓库
import pinia from './store'
import components from './components/index'
// 引入路由鉴权文件
import './permission'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(components)
app.use(ElementPlus)
app.mount('#app')
import { createApp } from 'vue'
import App from './App.vue'
// style
import './styles/element/index.scss'
import './styles/setting.scss'
import './styles/theme.scss'
// router
import router from '@/router'
// store
import store from '@/stores'

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app')

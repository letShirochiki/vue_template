import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// style
import './styles/element/index.scss'
import './styles/setting.scss'
import './styles/theme.scss'
// store
import store from '@/stores';

const app = createApp(App);
app.use(store);
app.mount('#app')

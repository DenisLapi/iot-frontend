import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import {
  Switch,
  Modal,
  Tooltip
} from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga.css'

createApp(App)
  .use(router)
  .use(Switch)
  .use(Modal)
  .use(Tooltip)
  .use(createPinia())
  .mount('#app')

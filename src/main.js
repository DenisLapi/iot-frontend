import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { firestorePlugin } from 'vuefire'
import App from './App.vue'
import router from './router'
import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga-full.css'

createApp(App)
  .use(router)
  .use(Oruga)
  .use(createPinia())
  .use(firestorePlugin)
  .mount('#app')

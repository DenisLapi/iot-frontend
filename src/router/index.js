import { createRouter, createWebHashHistory } from 'vue-router'

import FieldsRoutes from '@/modules/fields/routes'

const routes = [
  ...FieldsRoutes
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'

import FieldsRoutes from '@/modules/fields/routes'
import CropsRoutes from '@/modules/crops/routes'

const routes = [
  ...FieldsRoutes,
  ...CropsRoutes
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

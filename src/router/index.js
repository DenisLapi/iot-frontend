import { createRouter, createWebHashHistory } from 'vue-router'

import FieldsRoutes from '@/modules/fields/routes'
import CropsRoutes from '@/modules/crops/routes'
import SensorsRouters from '@/modules/sensors/routes'

const routes = [
  {
    name: 'Home',
    path: '/',
    redirect: '/fields'
  },
  ...FieldsRoutes,
  ...CropsRoutes,
  ...SensorsRouters
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

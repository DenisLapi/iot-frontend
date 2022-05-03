import Home from '../Home'
import SensorsPage from '../subpages/SensorsPage'
import SensorDetails from '../subpages/SensorDetails'

export default [
  {
    name: 'Sensors',
    path: '/sensors',
    component: Home,
    children: [
      {
        path: '',
        component: SensorsPage
      },
      {
        path: ':id',
        component: SensorDetails
      }
    ]
  }
]

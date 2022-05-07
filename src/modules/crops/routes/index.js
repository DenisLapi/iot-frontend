import Home from '../Home'
import CropDetails from '../subpages/CropDetails'

export default [
  {
    name: 'Crops',
    path: '/crops',
    component: Home,
    children: [
      {
        path: ':id',
        component: CropDetails
      }
    ]
  }
]

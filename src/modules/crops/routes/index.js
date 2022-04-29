import Home from '../Home'
import CropDetails from '../sub-pages/CropDetails'

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

import express from 'express'
import baiTapRoute from './bai-tap.route'

const router = express.Router()

const defaultRoutes = [
  {
    path: '/bai-tap',
    route: baiTapRoute,
  },
]
defaultRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router

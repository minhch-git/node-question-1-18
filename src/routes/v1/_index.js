import express from 'express'
import dangKyCungCapRoute from './dang-ky-cung-cap.route'
import dongXeRoute from './dong-xe.route'
import nhaCungCapRoute from './nha-cung-cap.route'
import loaiDichVuRoute from './loai-dich-vu.route'
import mucPhiRoute from './muc-phi.route'

const router = express.Router()

const defaultRoutes = [
  {
    path: '/muc-phi',
    route: mucPhiRoute,
  },
  {
    path: '/loai-dich-vu',
    route: loaiDichVuRoute,
  },
  {
    path: '/nha-cung-cap',
    route: nhaCungCapRoute,
  },
  {
    path: '/dong-xe',
    route: dongXeRoute,
  },
  {
    path: '/dang-ky-cung-cap',
    route: dangKyCungCapRoute,
  },
]

defaultRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router

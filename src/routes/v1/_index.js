import express from 'express'
import baiTapRoute from './bai-tap.route'
import deTaiRoute from './de-tai.route'
import giangVienRoute from './giang-vien.route'
import huongDanRoute from './huong-dan.route'
import khoaRoute from './khoa.route'
import sinhVienRoute from './sinh-vien.route'

const router = express.Router()

const defaultRoutes = [
  {
    path: '/bai-tap',
    route: baiTapRoute,
  },
  {
    path: '/de-tai',
    route: deTaiRoute,
  },
  {
    path: '/giang-vien',
    route: giangVienRoute,
  },
  {
    path: '/huong-dan',
    route: huongDanRoute,
  },
  {
    path: '/khoa',
    route: khoaRoute,
  },
  {
    path: '/sinh-vien',
    route: sinhVienRoute,
  },
]
defaultRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router

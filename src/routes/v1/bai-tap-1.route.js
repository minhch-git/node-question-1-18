import { Router } from 'express'
import baiTapCtrl from '../../controllers/bai-tap-1.controller'

const router = new Router()

router.get('/cau-1', baiTapCtrl.getCau1)
router.get('/cau-2', baiTapCtrl.getCau2)
router.get('/cau-3', baiTapCtrl.getCau3)
router.get('/cau-4', baiTapCtrl.getCau4)
router.get('/cau-5', baiTapCtrl.getCau5)
router.get('/cau-6', baiTapCtrl.getCau6)
router.get('/cau-7', baiTapCtrl.getCau7)
router.get('/cau-8', baiTapCtrl.getCau8)
router.get('/cau-9', baiTapCtrl.getCau9)
router.get('/cau-10', baiTapCtrl.getCau10)
router.get('/cau-11', baiTapCtrl.getCau11)
router.get('/cau-12', baiTapCtrl.getCau12)
router.get('/cau-13', baiTapCtrl.getCau13)
router.get('/cau-14', baiTapCtrl.getCau14)
router.get('/cau-15', baiTapCtrl.getCau15)
router.get('/cau-16', baiTapCtrl.getCau16)
router.get('/cau-17', baiTapCtrl.getCau17)
router.get('/cau-18', baiTapCtrl.getCau18)

export default router

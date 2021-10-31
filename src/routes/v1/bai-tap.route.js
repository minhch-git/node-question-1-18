import { Router } from 'express'
import validate from '../../middleware/validate'
import baiTapValidation from '../../validations/bai-tap.validation'
import asyncHandler from '../../utils/asyncHandler'
import BaiTapCtrl from '../../controllers/bai-tap.controller'

const router = new Router()

router.get('/cau-1', asyncHandler(BaiTapCtrl.getCau1))
router.get('/cau-2', asyncHandler(BaiTapCtrl.getCau2))
router.get('/cau-3', asyncHandler(BaiTapCtrl.getCau3))
router.get('/cau-4', asyncHandler(BaiTapCtrl.getCau4))
router.get('/cau-5', asyncHandler(BaiTapCtrl.getCau5))
router.get('/cau-6', asyncHandler(BaiTapCtrl.getCau6))
router.get('/cau-7', asyncHandler(BaiTapCtrl.getCau7))
router.get('/cau-8', asyncHandler(BaiTapCtrl.getCau8))
router.get('/cau-9', asyncHandler(BaiTapCtrl.getCau9))
router.get('/cau-10', asyncHandler(BaiTapCtrl.getCau10))
router.get('/cau-11', asyncHandler(BaiTapCtrl.getCau11))
router.get('/cau-12', asyncHandler(BaiTapCtrl.getCau12))
router.get('/cau-13', asyncHandler(BaiTapCtrl.getCau13))
router.get('/cau-14', asyncHandler(BaiTapCtrl.getCau14))
router.get('/cau-15', asyncHandler(BaiTapCtrl.getCau15))
router.get('/cau-16', asyncHandler(BaiTapCtrl.getCau16))
router.get('/cau-17', asyncHandler(BaiTapCtrl.getCau17))
router.get('/cau-18', asyncHandler(BaiTapCtrl.getCau18))

router.post('/giang-vien', asyncHandler(BaiTapCtrl.create))
router.get('/khoa', asyncHandler(BaiTapCtrl.getKhoa))

export default router

import express from 'express'
import validate from '../../middleware/validate'
import loaiDichVuValidation from '../../validations/loai-dich-vu.validation'
import LoaiDichVuCtrl from '../../controllers/loai-dich-vu.controller'
import asyncHandler from '../../utils/asyncHandler'

const router = express.Router()

router
  .route('/')
  .post(
    validate(loaiDichVuValidation.createLoaiDichVu),
    asyncHandler(LoaiDichVuCtrl.createLoaiDichVu)
  )
  .get(
    validate(loaiDichVuValidation.getLoaiDichVus),
    asyncHandler(LoaiDichVuCtrl.getLoaiDichVus)
  )

router
  .route('/:id')
  .get(
    validate(loaiDichVuValidation.getLoaiDichVu),
    asyncHandler(LoaiDichVuCtrl.getLoaiDichVu)
  )
  .patch(
    validate(loaiDichVuValidation.updateLoaiDichVu),
    asyncHandler(LoaiDichVuCtrl.updateLoaiDichVu)
  )
  .delete(
    validate(loaiDichVuValidation.deleteLoaiDichVu),
    asyncHandler(LoaiDichVuCtrl.deleteLoaiDichVu)
  )

export default router

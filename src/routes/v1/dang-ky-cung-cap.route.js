import express from 'express'
import validate from '../../middleware/validate'
import dangKyCungCapValidation from '../../validations/dang-ky-cung-cap.validation'
import DangKyCungCapCtrl from '../../controllers/dang-ky-cung-cap.controller'
import asyncHandler from '../../utils/asyncHandler'

const router = express.Router()

router
  .route('/')
  .post(
    validate(dangKyCungCapValidation.createDangKyCungCap),
    asyncHandler(DangKyCungCapCtrl.createDangKyCungCap)
  )
  .get(
    validate(dangKyCungCapValidation.getDangKyCungCaps),
    asyncHandler(DangKyCungCapCtrl.getDangKyCungCaps)
  )

router
  .route('/:id')
  .get(
    validate(dangKyCungCapValidation.getDangKyCungCap),
    asyncHandler(DangKyCungCapCtrl.getDangKyCungCap)
  )
  .patch(
    validate(dangKyCungCapValidation.updateDangKyCungCap),
    asyncHandler(DangKyCungCapCtrl.updateDangKyCungCap)
  )
  .delete(
    validate(dangKyCungCapValidation.deleteDangKyCungCap),
    asyncHandler(DangKyCungCapCtrl.deleteDangKyCungCap)
  )

export default router

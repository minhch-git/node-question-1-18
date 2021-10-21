import express from 'express'
import validate from '../../middleware/validate'
import nhaCungCapValidation from '../../validations/nha-cung-cap.validation'
import NhaCungCapCtrl from '../../controllers/nha-cung-cap.controller'
import asyncHandler from '../../utils/asyncHandler'

const router = express.Router()

router
  .route('/')
  .post(
    validate(nhaCungCapValidation.createNhaCungCap),
    asyncHandler(NhaCungCapCtrl.createNhaCungCap)
  )
  .get(
    validate(nhaCungCapValidation.getNhaCungCaps),
    asyncHandler(NhaCungCapCtrl.getNhaCungCaps)
  )

router
  .route('/:id')
  .get(
    validate(nhaCungCapValidation.getNhaCungCap),
    asyncHandler(NhaCungCapCtrl.getNhaCungCap)
  )
  .patch(
    validate(nhaCungCapValidation.updateNhaCungCap),
    asyncHandler(NhaCungCapCtrl.updateNhaCungCap)
  )
  .delete(
    validate(nhaCungCapValidation.deleteNhaCungCap),
    asyncHandler(NhaCungCapCtrl.deleteNhaCungCap)
  )

export default router

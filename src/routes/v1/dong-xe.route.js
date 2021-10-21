import express from 'express'
import validate from '../../middleware/validate'
import dongXeValidation from '../../validations/muc-phi.validation'
import DongXeCtrl from '../../controllers/dong-xe.controller'
import asyncHandler from '../../utils/asyncHandler'

const router = express.Router()

router
  .route('/')
  .post(
    validate(dongXeValidation.createDongXe),
    asyncHandler(DongXeCtrl.createDongXe)
  )
  .get(
    validate(dongXeValidation.getDongXes),
    asyncHandler(DongXeCtrl.getDongXes)
  )

router
  .route('/:id')
  .get(validate(dongXeValidation.getDongXe), asyncHandler(DongXeCtrl.getDongXe))
  .patch(
    validate(dongXeValidation.updateDongXe),
    asyncHandler(DongXeCtrl.updateDongXe)
  )
  .delete(
    validate(dongXeValidation.deleteDongXe),
    asyncHandler(DongXeCtrl.deleteDongXe)
  )

export default router

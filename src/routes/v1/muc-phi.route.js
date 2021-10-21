import express from 'express'
import validate from '../../middleware/validate'
import mucPhiValidation from '../../validations/muc-phi.validation'
import MucPhiCtrl from '../../controllers/muc-phi.controller'
import asyncHandler from '../../utils/asyncHandler'

const router = express.Router()

router
  .route('/')
  .post(
    validate(mucPhiValidation.createMucPhi),
    asyncHandler(MucPhiCtrl.createMucPhi)
  )
  .get(
    validate(mucPhiValidation.getMucPhis),
    asyncHandler(MucPhiCtrl.getMucPhis)
  )

router
  .route('/:id')
  .get(validate(mucPhiValidation.getMucPhi), asyncHandler(MucPhiCtrl.getMucPhi))
  .patch(
    validate(mucPhiValidation.updateMucPhi),
    asyncHandler(MucPhiCtrl.updateMucPhi)
  )
  .delete(
    validate(mucPhiValidation.deleteMucPhi),
    asyncHandler(MucPhiCtrl.deleteMucPhi)
  )

export default router

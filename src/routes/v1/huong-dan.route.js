import express from 'express'
import validate from '../../middleware/validate'
import huongDanValidation from '../../validations/huong-dan.validation'
import huongDanCtrl from '../../controllers/huong-dan.controller'

const router = express.Router()

router
  .route('/')
  .post(
    validate(huongDanValidation.createHuongDan),
    huongDanCtrl.createHuongDan
  )
  .get(validate(huongDanValidation.getHuongDans), huongDanCtrl.getHuongDans)

router
  .route('/:huongDanId')
  .get(validate(huongDanValidation.getHuongDan), huongDanCtrl.getHuongDan)
  .patch(
    validate(huongDanValidation.updateHuongDan),
    huongDanCtrl.updateHuongDan
  )
  .delete(
    validate(huongDanValidation.deleteHuongDan),
    huongDanCtrl.deleteHuongDan
  )

export default router

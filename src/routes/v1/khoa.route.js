import express from 'express'
import validate from '../../middleware/validate'
import khoaValidation from '../../validations/khoa.validation'
import khoaCtrl from '../../controllers/khoa.controller'

const router = express.Router()

router
  .route('/')
  .post(validate(khoaValidation.createKhoa), khoaCtrl.createKhoa)
  .get(validate(khoaValidation.getKhoas), khoaCtrl.getKhoas)

router
  .route('/:khoaId')
  .get(validate(khoaValidation.getKhoa), khoaCtrl.getKhoa)
  .patch(validate(khoaValidation.updateKhoa), khoaCtrl.updateKhoa)
  .delete(validate(khoaValidation.deleteKhoa), khoaCtrl.deleteKhoa)

export default router

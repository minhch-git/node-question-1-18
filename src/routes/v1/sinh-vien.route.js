import express from 'express'
import validate from '../../middleware/validate'
import sinhVienValidation from '../../validations/sinh-vien.validation'
import sinhVienCtrl from '../../controllers/sinh-vien.controller'

const router = express.Router()

router
  .route('/')
  .post(
    validate(sinhVienValidation.createSinhVien),
    sinhVienCtrl.createSinhVien
  )
  .get(validate(sinhVienValidation.getSinhViens), sinhVienCtrl.getSinhViens)

router
  .route('/:sinhVienId')
  .get(validate(sinhVienValidation.getSinhVien), sinhVienCtrl.getSinhVien)
  .patch(
    validate(sinhVienValidation.updateSinhVien),
    sinhVienCtrl.updateSinhVien
  )
  .delete(
    validate(sinhVienValidation.deleteSinhVien),
    sinhVienCtrl.deleteSinhVien
  )

export default router

import express from 'express'
import validate from '../../middleware/validate'
import giangVienValidation from '../../validations/giang-vien.validation'
import giangVienCtrl from '../../controllers/giang-vien.controller'

const router = express.Router()

router
  .route('/')
  .post(
    validate(giangVienValidation.createGiangVien),
    giangVienCtrl.createGiangVien
  )
  .get(validate(giangVienValidation.getGiangViens), giangVienCtrl.getGiangViens)

router
  .route('/:giangVienId')
  .get(validate(giangVienValidation.getGiangVien), giangVienCtrl.getGiangVien)
  .patch(
    validate(giangVienValidation.updateGiangVien),
    giangVienCtrl.updateGiangVien
  )
  .delete(
    validate(giangVienValidation.deleteGiangVien),
    giangVienCtrl.deleteGiangVien
  )

export default router

import { Router } from 'express'
import baiTapCtrl from '../../controllers/2-bai-tap.controller'
import ketQuaCtrl from '../../controllers/2-ket-qua.controller'
import khoaCtrl from '../../controllers/2-khoa.controller'
import lopCtrl from '../../controllers/2-lop.controller'
import sinhVienCtrl from '../../controllers/2-sinh-vien.controller'
import monHocCtrl from '../../controllers/2-mon-hoc.controller'

const router = new Router()

router.get('/cau-1', baiTapCtrl.getCau1)
router.get('/cau-2', baiTapCtrl.getCau2)
router.get('/cau-3', baiTapCtrl.getCau3)
router.get('/cau-4', baiTapCtrl.getCau4)
router.get('/cau-5', baiTapCtrl.getCau5)
router.get('/cau-6', baiTapCtrl.getCau6)
router.get('/cau-7', baiTapCtrl.getCau7)
router.get('/cau-8', baiTapCtrl.getCau8)
router.get('/cau-9', baiTapCtrl.getCau9)
router.get('/cau-10', baiTapCtrl.getCau10)
router.get('/cau-11', baiTapCtrl.getCau11)
router.get('/cau-12', baiTapCtrl.getCau12)
router.get('/cau-13', baiTapCtrl.getCau13)
router.get('/cau-14', baiTapCtrl.getCau14)
router.get('/cau-15', baiTapCtrl.getCau15)
router.get('/cau-16', baiTapCtrl.getCau16)
router.get('/cau-17', baiTapCtrl.getCau17)
router.get('/cau-18', baiTapCtrl.getCau18)
router.get('/cau-19', baiTapCtrl.getCau19)
router.get('/cau-20', baiTapCtrl.getCau20)
router.get('/cau-21', baiTapCtrl.getCau21)
router.get('/cau-22', baiTapCtrl.getCau22)
router.get('/cau-23', baiTapCtrl.getCau23)
router.get('/cau-24', baiTapCtrl.getCau24)
router.get('/cau-25', baiTapCtrl.getCau25)

// CRUD KetQua
router
  .route('/ket-qua')
  .post(ketQuaCtrl.createKetQua)
  .get(ketQuaCtrl.getKetQuas)
router
  .route('/ket-qua/:ketQuaId')
  .get(ketQuaCtrl.getKetQua)
  .patch(ketQuaCtrl.updateKetQua)
  .delete(ketQuaCtrl.deleteKetQua)

// CRUD khoa
router.route('/khoa/').post(khoaCtrl.createKhoa).get(khoaCtrl.getKhoas)
router
  .route('/khoa/:khoaId')
  .get(khoaCtrl.getKhoa)
  .patch(khoaCtrl.updateKhoa)
  .delete(khoaCtrl.deleteKhoa)

//  CRUD lop
router.route('/lop').post(lopCtrl.createLop).get(lopCtrl.getLops)
router
  .route('/lop/:lopId')
  .get(lopCtrl.getLop)
  .patch(lopCtrl.updateLop)
  .delete(lopCtrl.deleteLop)

//  CRUD sinhvien
router
  .route('/sinh-vien')
  .post(sinhVienCtrl.createSinhVien)
  .get(sinhVienCtrl.getSinhViens)
router
  .route('/sinh-vien/:sinhVienId')
  .get(sinhVienCtrl.getSinhVien)
  .patch(sinhVienCtrl.updateSinhVien)
  .delete(sinhVienCtrl.deleteSinhVien)

//  CRUD moHoc
router
  .route('/mon-hoc/')
  .post(monHocCtrl.createMonHoc)
  .get(monHocCtrl.getMonHocs)
router
  .route('/mon-hoc/:monHocId')
  .get(monHocCtrl.getMonHoc)
  .patch(monHocCtrl.updateMonHoc)
  .delete(monHocCtrl.deleteMonHoc)

export default router

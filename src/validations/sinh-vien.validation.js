import * as yup from 'yup'
import custom from './_custom.validation'

const createSinhVien = {
  hoTenSV: yup.string().required(),
  maKhoa: custom.objectId().label('maKhoa').required(),
  namSinh: yup.number().required(),
  queQuan: yup.string().required(),
}

const getSinhViens = {
  hoTenSV: yup.string(),
  maKhoa: custom.objectId().label('maKhoa'),
  namSinh: yup.number(),
  queQuan: yup.string(),

  select: yup.string(),
  role: yup.string(),
  sortBy: yup.string(),
  limit: yup.number().integer(),
  page: yup.number().integer(),
}

const getSinhVien = {
  sinhVienId: custom.objectId().label('sinhVienId'),
}

const updateSinhVien = {
  sinhVienId: custom.objectId().label('sinhVienId'),
  hoTenSV: yup.string(),
  maKhoa: custom.objectId().label('maKhoa'),
  namSinh: yup.number(),
  queQuan: yup.string(),
}

const deleteSinhVien = {
  sinhVienId: custom.objectId().label('sinhVienId'),
}

export default {
  createSinhVien,
  getSinhViens,
  getSinhVien,
  updateSinhVien,
  deleteSinhVien,
}

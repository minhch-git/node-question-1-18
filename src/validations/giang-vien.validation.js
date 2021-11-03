import * as yup from 'yup'
import custom from './_custom.validation'

const createGiangVien = {
  hoTenGV: yup.string().required(),
  luong: yup.number().required(),
  maKhoa: custom.objectId().label('maKhoa').required(),
}

const getGiangViens = {
  hoTenGV: yup.string(),
  luong: yup.number(),
  maKhoa: custom.objectId().label('maKhoa'),

  select: yup.string(),
  role: yup.string(),
  sortBy: yup.string(),
  limit: yup.number().integer(),
  page: yup.number().integer(),
}

const getGiangVien = {
  giangVienId: custom.objectId().label('giangVienId'),
}

const updateGiangVien = {
  giangVienId: custom.objectId().label('giangVienId'),
  hoTenGV: yup.string(),
  luong: yup.number(),
  maKhoa: custom.objectId().label('maKhoa'),
}

const deleteGiangVien = {
  giangVienId: custom.objectId().label('giangVienId'),
}

export default {
  createGiangVien,
  getGiangViens,
  getGiangVien,
  updateGiangVien,
  deleteGiangVien,
}

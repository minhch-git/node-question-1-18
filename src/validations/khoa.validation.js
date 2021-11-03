import * as yup from 'yup'
import custom from './_custom.validation'

const createKhoa = {
  tenKhoa: yup.string().required(),
  dienThoai: yup.string().required(),
}

const getKhoas = {
  tenKhoa: yup.string(),
  dienThoai: yup.string(),

  select: yup.string(),
  role: yup.string(),
  sortBy: yup.string(),
  limit: yup.number().integer(),
  page: yup.number().integer(),
}

const getKhoa = {
  khoaId: custom.objectId().label('khoaId'),
}

const updateKhoa = {
  khoaId: custom.objectId().label('khoaId'),
  tenKhoa: yup.string(),
  dienThoai: yup.string(),
}

const deleteKhoa = {
  khoaId: custom.objectId().label('khoaId'),
}

export default {
  createKhoa,
  getKhoas,
  getKhoa,
  updateKhoa,
  deleteKhoa,
}

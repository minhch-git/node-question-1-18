import { string, number, date } from 'yup'
import custom from './_custom.validation'

const createDangKyCungCap = {
  maNhaCungCap: custom.objectId.required().label('maNhaCungCap'),
  maLoaiDichVu: custom.objectId.required().label('maLoaiDichVu'),
  dongXe: custom.objectId.required().label('dongXe'),
  maMucPhi: custom.objectId.required().label('maMucPhi'),
  ngayBatDauCungCap: date().required().default(Date.now()),
  ngayKetThucCungCap: date().required(),
  soLuongXeMayDangKy: number().integer().required(),
}

const getDangKyCungCaps = {
  name: string(),
  role: string(),
  sortBy: string(),
  limit: number().integer(),
  page: number().integer(),
}

const getDangKyCungCap = {
  id: custom.objectId.label('id').required(),
}

const updateDangKyCungCap = {
  id: custom.objectId.label('id'),
  maNhaCungCap: custom.objectId.required().label('maNhaCungCap'),
  maLoaiDichVu: custom.objectId.required().label('maLoaiDichVu'),
  dongXe: custom.objectId.required().label('dongXe'),
  maMucPhi: custom.objectId.required().label('maMucPhi'),
  ngayBatDauCungCap: date().required().default(Date.now()),
  ngayKetThucCungCap: date().required(),
  soLuongXeMayDangKy: number().integer().required(),
}

const deleteDangKyCungCap = {
  id: custom.objectId.label('id'),
}

export default {
  createDangKyCungCap,
  getDangKyCungCaps,
  getDangKyCungCap,
  updateDangKyCungCap,
  deleteDangKyCungCap,
}

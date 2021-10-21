import { string, number } from 'yup'
import custom from './_custom.validation'

const createNhaCungCap = {
  tenNhaCungCap: string().required(),
  diaChi: string().required(),
  soDienThoai: string(),
  maSoThue: string(),
}

const getNhaCungCaps = {
  tenNhaCungCap: string(),
  role: string(),
  sortBy: string(),
  limit: number().integer(),
  page: number().integer(),
}

const getNhaCungCap = {
  id: custom.objectId.label('id').required(),
}

const updateNhaCungCap = {
  id: custom.objectId.label('id'),
  tenNhaCungCap: string(),
  diaChi: string(),
  soDienThoai: string(),
  maSoThieu: string(),
}

const deleteNhaCungCap = {
  id: custom.objectId.label('id'),
}

export default {
  createNhaCungCap,
  getNhaCungCaps,
  getNhaCungCap,
  updateNhaCungCap,
  deleteNhaCungCap,
}

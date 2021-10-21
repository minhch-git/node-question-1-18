import { string, number } from 'yup'
import custom from './_custom.validation'

const createLoaiDichVu = {
  tenLoaiDichVu: string().required(),
}

const getLoaiDichVus = {
  name: string(),
  role: string(),
  sortBy: string(),
  limit: number().integer(),
  page: number().integer(),
}

const getLoaiDichVu = {
  id: custom.objectId.label('id').required(),
}

const updateLoaiDichVu = {
  id: custom.objectId.label('id'),
  name: string().required(),
}

const deleteLoaiDichVu = {
  id: custom.objectId.label('id'),
}

export default {
  createLoaiDichVu,
  getLoaiDichVus,
  getLoaiDichVu,
  updateLoaiDichVu,
  deleteLoaiDichVu,
}

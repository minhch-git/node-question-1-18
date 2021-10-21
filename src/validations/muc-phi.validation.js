import { string, number } from 'yup'
import custom from './_custom.validation'

const createMucPhi = {
  moTa: string().required(),
  donGia: number().required(),
}

const getMucPhis = {
  name: string(),
  role: string(),
  sortBy: string(),
  limit: number().integer(),
  page: number().integer(),
}

const getMucPhi = {
  id: custom.objectId.label('id').required(),
}

const updateMucPhi = {
  id: custom.objectId.label('id'),
  moTa: string().required(),
  donGia: number().required(),
}

const deleteMucPhi = {
  id: custom.objectId.label('id'),
}

export default {
  createMucPhi,
  getMucPhis,
  getMucPhi,
  updateMucPhi,
  deleteMucPhi,
}

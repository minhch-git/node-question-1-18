import { string, number } from 'yup'
import custom from './_custom.validation'

const createDongXe = {
  hangXe: string().required(),
  soChoNgoi: number().required(),
}

const getDongXes = {
  name: string(),
  role: string(),
  sortBy: string(),
  limit: number().integer(),
  page: number().integer(),
}

const getDongXe = {
  id: custom.objectId.label('id').required(),
}

const updateDongXe = {
  id: custom.objectId.label('id'),
  hangXe: string(),
  soChoNgoi: string(),
}

const deleteDongXe = {
  id: custom.objectId.label('id'),
}

export default {
  createDongXe,
  getDongXes,
  getDongXe,
  updateDongXe,
  deleteDongXe,
}

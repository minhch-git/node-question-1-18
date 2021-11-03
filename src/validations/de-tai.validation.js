import * as yup from 'yup'
import custom from './_custom.validation'

const createDeTai = {
  tenDT: yup.string().required(),
  kinhPhi: yup.number().required(),
  noiThucTap: yup.string().required(),
}

const getDeTais = {
  tenDT: yup.string(),
  kinhPhi: yup.number(),
  noiThucTap: yup.string(),

  select: yup.string(),
  role: yup.string(),
  sortBy: yup.string(),
  limit: yup.number().integer(),
  page: yup.number().integer(),
}

const getDeTai = {
  deTaiId: custom.objectId().label('deTaiId'),
}

const updateDeTai = {
  giangVienId: custom.objectId().label('giangVienId').required(),

  tenDT: yup.string(),
  kinhPhi: yup.number(),
  noiThucTap: yup.string(),
}

const deleteDeTai = {
  deTaiId: custom.objectId().label('deTaiId'),
}

export default {
  createDeTai,
  getDeTais,
  getDeTai,
  updateDeTai,
  deleteDeTai,
}

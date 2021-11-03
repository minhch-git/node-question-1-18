import * as yup from 'yup'
import custom from './_custom.validation'

const createHuongDan = {
  ketQua: yup.number(),
  maGV: custom.objectId().label('maGV').required(),
  maSV: custom.objectId().label('maSV').required(),
  maDT: custom.objectId().label('maDT').required(),
}

const getHuongDans = {
  ketQua: yup.number(),
  maGV: custom.objectId().label('maGV'),
  maSV: custom.objectId().label('maSV'),
  maDT: custom.objectId().label('maDT'),

  select: yup.string(),
  role: yup.string(),
  sortBy: yup.string(),
  limit: yup.number().integer(),
  page: yup.number().integer(),
}

const getHuongDan = {
  huongDanId: custom.objectId().label('huongDanId'),
}

const updateHuongDan = {
  huongDanId: custom.objectId().label('huongDanId'),
  ketQua: yup.number(),
  maGV: custom.objectId().label('maGV'),
  maSV: custom.objectId().label('maSV'),
  maDT: custom.objectId().label('maDT'),
}

const deleteHuongDan = {
  huongDanId: custom.objectId().label('huongDanId'),
}

export default {
  createHuongDan,
  getHuongDans,
  getHuongDan,
  updateHuongDan,
  deleteHuongDan,
}

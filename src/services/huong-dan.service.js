import createHttpError from 'http-errors'
import HuongDan from '../models/HuongDan'

/**
 * Get sinhViens by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<sinhViens>}
 */
const queryHuongDans = async (filter, options) => {
  const sinhViens = await HuongDan.paginate(filter, options)
  return sinhViens
}

/**
 * Find sinhVien by id
 * @param {ObjectId} sinhVienId
 * @returns {Promise<sinhVien>}
 */
const getHuongDanById = async sinhVienId => {
  return HuongDan.findById(sinhVienId)
}

/**
 * Create sinhVien
 * @param {Object} body
 * @returns {Promise<sinhVien>}
 */
const createHuongDan = async sinhVienBody => {
  return HuongDan.create(sinhVienBody)
}

/**
 * Update sinhVien by id
 * @param {ObjectId} sinhVienId
 * @param {Object} body
 * @returns {Promise<sinhVien>}
 */
const updateHuongDanById = async (sinhVienId, body) => {
  const sinhVien = await getHuongDanById(sinhVienId)

  if (!sinhVien) {
    throw createHttpError.NotFound('Not found sinhVien')
  }

  Object.assign(sinhVien, body)
  await sinhVien.save()
  return sinhVien
}

/**
 * Delte sinhVien by id
 * @param {ObjectId} sinhVienId
 * @returns {Promise<sinhVien>}
 */
const deleteHuongDanById = async sinhVienId => {
  const sinhVien = await getHuongDanById(sinhVienId)
  if (!sinhVien) {
    throw createHttpError.NotFound('Not found sinhVien')
  }
  const result = await sinhVien.remove()
  return result
}

export default {
  createHuongDan,
  queryHuongDans,
  getHuongDanById,
  updateHuongDanById,
  deleteHuongDanById,
}

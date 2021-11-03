import createHttpError from 'http-errors'
import SinhVien from '../models/SinhVien'

/**
 * Get sinhViens by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<sinhViens>}
 */
const querySinhViens = async (filter, options) => {
  const sinhViens = await SinhVien.paginate(filter, options)
  return sinhViens
}

/**
 * Find sinhVien by id
 * @param {ObjectId} sinhVienId
 * @returns {Promise<sinhVien>}
 */
const getSinhVienById = async sinhVienId => {
  return SinhVien.findById(sinhVienId)
}

/**
 * Create sinhVien
 * @param {Object} body
 * @returns {Promise<sinhVien>}
 */
const createSinhVien = async sinhVienBody => {
  return SinhVien.create(sinhVienBody)
}

/**
 * Update sinhVien by id
 * @param {ObjectId} sinhVienId
 * @param {Object} body
 * @returns {Promise<sinhVien>}
 */
const updateSinhVienById = async (sinhVienId, body) => {
  const sinhVien = await getSinhVienById(sinhVienId)

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
const deleteSinhVienById = async sinhVienId => {
  const sinhVien = await getSinhVienById(sinhVienId)
  if (!sinhVien) {
    throw createHttpError.NotFound('Not found sinhVien')
  }
  const result = await sinhVien.remove()
  return result
}

export default {
  createSinhVien,
  querySinhViens,
  getSinhVienById,
  updateSinhVienById,
  deleteSinhVienById,
}

import createHttpError from 'http-errors'
import GiangVien from '../models/GiangVien'

/**
 * Get giangViens by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<giangViens>}
 */
const queryGiangViens = async (filter, options) => {
  const giangViens = await GiangVien.paginate(filter, options)
  return giangViens
}

/**
 * Find giangVien by id
 * @param {ObjectId} giangVienId
 * @returns {Promise<giangVien>}
 */
const getGiangVienById = async giangVienId => {
  return GiangVien.findById(giangVienId)
}

/**
 * Create giangVien
 * @param {Object} body
 * @returns {Promise<giangVien>}
 */
const createGiangVien = async giangVienBody => {
  return GiangVien.create(giangVienBody)
}

/**
 * Update giangVien by id
 * @param {ObjectId} giangVienId
 * @param {Object} body
 * @returns {Promise<giangVien>}
 */
const updateGiangVienById = async (giangVienId, body) => {
  const giangVien = await getGiangVienById(giangVienId)

  if (!giangVien) {
    throw createHttpError.NotFound('Not found giangVien')
  }

  Object.assign(giangVien, body)
  await giangVien.save()
  return giangVien
}

/**
 * Delte giangVien by id
 * @param {ObjectId} giangVienId
 * @returns {Promise<giangVien>}
 */
const deleteGiangVienById = async giangVienId => {
  const giangVien = await getGiangVienById(giangVienId)
  if (!giangVien) {
    throw createHttpError.NotFound('Not found giangVien')
  }
  const result = await giangVien.remove()
  return result
}

export default {
  createGiangVien,
  queryGiangViens,
  getGiangVienById,
  updateGiangVienById,
  deleteGiangVienById,
}

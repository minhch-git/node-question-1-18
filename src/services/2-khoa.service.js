import createHttpError from 'http-errors'
import Khoa from '../models/2-khoa.model'

/**
 * Get khoas by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<khoas>}
 */
const queryKhoas = async (filter, options) => {
  const khoas = await Khoa.paginate(filter, options)
  return khoas
}

/**
 * Find khoa by id
 * @param {ObjectId} khoaId
 * @returns {Promise<khoa>}
 */
const getKhoaById = async khoaId => {
  return Khoa.findById(khoaId)
}

/**
 * Create khoa
 * @param {Object} body
 * @returns {Promise<khoa>}
 */
const createKhoa = async khoaBody => {
  return Khoa.create(khoaBody)
}

/**
 * Update khoa by id
 * @param {ObjectId} khoaId
 * @param {Object} body
 * @returns {Promise<khoa>}
 */
const updateKhoaById = async (khoaId, body) => {
  const khoa = await getKhoaById(khoaId)

  if (!khoa) {
    throw createHttpError.NotFound('Not found khoa')
  }

  Object.assign(khoa, body)
  await khoa.save()
  return khoa
}

/**
 * Delte khoa by id
 * @param {ObjectId} khoaId
 * @returns {Promise<khoa>}
 */
const deleteKhoaById = async khoaId => {
  const khoa = await getKhoaById(khoaId)
  if (!khoa) {
    throw createHttpError.NotFound('Not found khoa')
  }
  const result = await khoa.remove()
  return result
}

export default {
  createKhoa,
  queryKhoas,
  getKhoaById,
  updateKhoaById,
  deleteKhoaById,
}

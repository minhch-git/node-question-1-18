import createHttpError from 'http-errors'
import Khoa from '../models/Khoa'

/**
 * Get huongDans by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<huongDans>}
 */
const queryKhoas = async (filter, options) => {
  const huongDans = await Khoa.paginate(filter, options)
  return huongDans
}

/**
 * Find huongDan by id
 * @param {ObjectId} huongDanId
 * @returns {Promise<huongDan>}
 */
const getKhoaById = async huongDanId => {
  return Khoa.findById(huongDanId)
}

/**
 * Create huongDan
 * @param {Object} body
 * @returns {Promise<huongDan>}
 */
const createKhoa = async huongDanBody => {
  return Khoa.create(huongDanBody)
}

/**
 * Update huongDan by id
 * @param {ObjectId} huongDanId
 * @param {Object} body
 * @returns {Promise<huongDan>}
 */
const updateKhoaById = async (huongDanId, body) => {
  const huongDan = await getKhoaById(huongDanId)

  if (!huongDan) {
    throw createHttpError.NotFound('Not found huongDan')
  }

  Object.assign(huongDan, body)
  await huongDan.save()
  return huongDan
}

/**
 * Delte huongDan by id
 * @param {ObjectId} huongDanId
 * @returns {Promise<huongDan>}
 */
const deleteKhoaById = async huongDanId => {
  const huongDan = await getKhoaById(huongDanId)
  if (!huongDan) {
    throw createHttpError.NotFound('Not found huongDan')
  }
  const result = await huongDan.remove()
  return result
}

export default {
  createKhoa,
  queryKhoas,
  getKhoaById,
  updateKhoaById,
  deleteKhoaById,
}

import createHttpError from 'http-errors'
import MonHoc from '../models/2-mon-hoc.model'

/**
 * Get monHocs by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<monHocs>}
 */
const queryMonHocs = async (filter, options) => {
  const monHocs = await MonHoc.paginate(filter, options)
  return monHocs
}

/**
 * Find monHoc by id
 * @param {ObjectId} monHocId
 * @returns {Promise<monHoc>}
 */
const getMonHocById = async monHocId => {
  return MonHoc.findById(monHocId)
}

/**
 * Create monHoc
 * @param {Object} body
 * @returns {Promise<monHoc>}
 */
const createMonHoc = async monHocBody => {
  return MonHoc.create(monHocBody)
}

/**
 * Update monHoc by id
 * @param {ObjectId} monHocId
 * @param {Object} body
 * @returns {Promise<monHoc>}
 */
const updateMonHocById = async (monHocId, body) => {
  const monHoc = await getMonHocById(monHocId)

  if (!monHoc) {
    throw createHttpError.NotFound('Not found monHoc')
  }

  Object.assign(monHoc, body)
  await monHoc.save()
  return monHoc
}

/**
 * Delte monHoc by id
 * @param {ObjectId} monHocId
 * @returns {Promise<monHoc>}
 */
const deleteMonHocById = async monHocId => {
  const monHoc = await getMonHocById(monHocId)
  if (!monHoc) {
    throw createHttpError.NotFound('Not found monHoc')
  }
  const result = await monHoc.remove()
  return result
}

export default {
  createMonHoc,
  queryMonHocs,
  getMonHocById,
  updateMonHocById,
  deleteMonHocById,
}

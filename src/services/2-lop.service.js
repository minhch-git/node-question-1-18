import createHttpError from 'http-errors'
import Lop from '../models/2-lop.model'

/**
 * Get lops by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<lops>}
 */
const queryLops = async (filter, options) => {
  const lops = await Lop.paginate(filter, options)
  return lops
}

/**
 * Find lop by id
 * @param {ObjectId} lopId
 * @returns {Promise<lop>}
 */
const getLopById = async lopId => {
  return Lop.findById(lopId)
}

/**
 * Create lop
 * @param {Object} body
 * @returns {Promise<lop>}
 */
const createLop = async lopBody => {
  return Lop.create(lopBody)
}

/**
 * Update lop by id
 * @param {ObjectId} lopId
 * @param {Object} body
 * @returns {Promise<lop>}
 */
const updateLopById = async (lopId, body) => {
  const lop = await getLopById(lopId)

  if (!lop) {
    throw createHttpError.NotFound('Not found lop')
  }

  Object.assign(lop, body)
  await lop.save()
  return lop
}

/**
 * Delte lop by id
 * @param {ObjectId} lopId
 * @returns {Promise<lop>}
 */
const deleteLopById = async lopId => {
  const lop = await getLopById(lopId)
  if (!lop) {
    throw createHttpError.NotFound('Not found lop')
  }
  const result = await lop.remove()
  return result
}

export default {
  createLop,
  queryLops,
  getLopById,
  updateLopById,
  deleteLopById,
}

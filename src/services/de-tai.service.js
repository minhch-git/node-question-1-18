import createHttpError from 'http-errors'
import DeTai from '../models/DeTai'

/**
 * Get deTais by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<deTais>}
 */
const queryDeTais = async (filter, options) => {
  const deTais = await DeTai.paginate(filter, options)
  return deTais
}

/**
 * Find deTai by id
 * @param {ObjectId} deTaiId
 * @returns {Promise<deTai>}
 */
const getDeTaiById = async deTaiId => {
  return DeTai.findById(deTaiId)
}

/**
 * Create deTai
 * @param {Object} body
 * @returns {Promise<deTai>}
 */
const createDeTai = async deTaiBody => {
  return DeTai.create(deTaiBody)
}

/**
 * Update deTai by id
 * @param {ObjectId} deTaiId
 * @param {Object} body
 * @returns {Promise<deTai>}
 */
const updateDeTaiById = async (deTaiId, body) => {
  const deTai = await getDeTaiById(deTaiId)

  if (!deTai) {
    throw createHttpError.NotFound('Not found deTai')
  }

  Object.assign(deTai, body)
  await deTai.save()
  return deTai
}

/**
 * Delte deTai by id
 * @param {ObjectId} deTaiId
 * @returns {Promise<deTai>}
 */
const deleteDeTaiById = async deTaiId => {
  const deTai = await getDeTaiById(deTaiId)
  if (!deTai) {
    throw createHttpError.NotFound('Not found deTai')
  }
  const result = await deTai.remove()
  return result
}

export default {
  createDeTai,
  queryDeTais,
  getDeTaiById,
  updateDeTaiById,
  deleteDeTaiById,
}

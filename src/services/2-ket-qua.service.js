import createHttpError from 'http-errors'
import KetQua from '../models/2-ket-qua.model'

/**
 * Get ketQuas by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<ketQuas>}
 */
const queryKetQuas = async (filter, options) => {
  const ketQuas = await KetQua.paginate(filter, options)
  return ketQuas
}

/**
 * Find ketQua by id
 * @param {ObjectId} ketQuaId
 * @returns {Promise<ketQua>}
 */
const getKetQuaById = async ketQuaId => {
  return KetQua.findById(ketQuaId)
}

/**
 * Create ketQua
 * @param {Object} body
 * @returns {Promise<ketQua>}
 */
const createKetQua = async ketQuaBody => {
  return KetQua.create(ketQuaBody)
}

/**
 * Update ketQua by id
 * @param {ObjectId} ketQuaId
 * @param {Object} body
 * @returns {Promise<ketQua>}
 */
const updateKetQuaById = async (ketQuaId, body) => {
  const ketQua = await getKetQuaById(ketQuaId)

  if (!ketQua) {
    throw createHttpError.NotFound('Not found ketQua')
  }

  Object.assign(ketQua, body)
  await ketQua.save()
  return ketQua
}

/**
 * Delte ketQua by id
 * @param {ObjectId} ketQuaId
 * @returns {Promise<ketQua>}
 */
const deleteKetQuaById = async ketQuaId => {
  const ketQua = await getKetQuaById(ketQuaId)
  if (!ketQua) {
    throw createHttpError.NotFound('Not found ketQua')
  }
  const result = await ketQua.remove()
  return result
}

export default {
  createKetQua,
  queryKetQuas,
  getKetQuaById,
  updateKetQuaById,
  deleteKetQuaById,
}

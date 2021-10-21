import createError from 'http-errors'
import NhaCungCap from '../models/NhaCungCap'

class NhaCungCapService {
  /**
   * Find professional by id
   * @param {ObjectId} id
   * @returns {Promise<professional>}
   */
  findById(id) {
    return NhaCungCap.findById(id)
  }

  /**
   * Get professionals by query(filter, options)
   * @param {Object} filter
   * @param {Object} options
   * @returns {Promise<professionals>}
   */
  async query(filter, options) {
    const professionals = await NhaCungCap.paginate(filter, options)
    return professionals
  }

  /**
   * Create professional
   * @param {Object} body
   * @returns {Promise<professional>}
   */
  async create(body) {
    return NhaCungCap.create(body)
  }

  /**
   * Update professional by id
   * @param {ObjectId} id
   * @param {Object} body
   * @returns {Promise<professional>}
   */
  async updateById(id, body) {
    const professional = await this.findById(id)

    if (!professional) {
      throw createError.NotFound()
    }

    Object.assign(professional, body)
    await professional.save()
    return professional
  }

  /**
   * Delte professional by id
   * @param {ObjectId} id
   * @returns {Promise<professional>}
   */
  async deleteById(id) {
    const professional = await this.findById(id)
    if (!professional) {
      throw createError.NotFound('NhaCungCaps not found')
    }
    const result = await professional.remove()
    return result
  }
}

export default new NhaCungCapService()

import createError from 'http-errors'
import LoaiDichVu from '../models/LoaiDichVu'

class LoaiDichVuService {
  /**
   * Find professional by id
   * @param {ObjectId} id
   * @returns {Promise<professional>}
   */
  findById(id) {
    return LoaiDichVu.findById(id)
  }

  /**
   * Get professionals by query(filter, options)
   * @param {Object} filter
   * @param {Object} options
   * @returns {Promise<professionals>}
   */
  async query(filter, options) {
    const professionals = await LoaiDichVu.paginate(filter, options)
    return professionals
  }

  /**
   * Create professional
   * @param {Object} body
   * @returns {Promise<professional>}
   */
  async create(body) {
    return LoaiDichVu.create(body)
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
      throw createError.NotFound('LoaiDichVus not found')
    }
    const result = await professional.remove()
    return result
  }
}

export default new LoaiDichVuService()

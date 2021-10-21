import createError from 'http-errors'
import pick from '../utils/pick'
import loaiDichVuService from '../services/loai-dich-vu.service'

class LoaiDichVuCtrl {
  /**
   * @GET api/v1/loaiDichVus
   * @access public
   */
  async getLoaiDichVus(req, res) {
    const filter = pick(req.query, ['name', 'role'])
    const options = pick(req.query, ['sortBy', 'limit', 'page'])
    const result = await loaiDichVuService.query(filter, options)
    res.send(result)
  }

  /**
   * @GET api/v1/loaiDichVus/:id
   * @access public
   */
  async getLoaiDichVu(req, res) {
    const loaiDichVu = await loaiDichVuService.findById(req.params.id)
    if (!loaiDichVu) {
      throw createError.NotFound('LoaiDichVu not found')
    }
    res.send(loaiDichVu)
  }

  /**
   * @POST api/v1/loaiDichVus/
   * @access private
   */
  async createLoaiDichVu(req, res) {
    const loaiDichVu = await loaiDichVuService.create(req.body)
    res.status(201).send(loaiDichVu)
  }

  /**
   * @PATCH api/v1/loaiDichVus/:id
   * @access private
   */
  async updateLoaiDichVu(req, res) {
    const loaiDichVu = await loaiDichVuService.updateById(
      req.params.id,
      req.body
    )
    res.send(loaiDichVu)
  }

  /**
   * @DELETE api/v1/loaiDichVus/:id
   * @access private
   */
  async deleteLoaiDichVu(req, res) {
    await loaiDichVuService.deleteById(req.params.id)
    res.status(200).json({ success: true })
  }
}

export default new LoaiDichVuCtrl()

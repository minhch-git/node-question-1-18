import createError from 'http-errors'
import pick from '../utils/pick'
import dangKyCungCapService from '../services/dang-ky-cung-cap.service'

class DangKyCungCapCtrl {
  /**
   * @GET api/v1/dangKyCungCaps
   * @access public
   */
  async getDangKyCungCaps(req, res) {
    const filter = pick(req.query, ['name', 'role'])
    const options = pick(req.query, ['sortBy', 'limit', 'page'])
    const result = await dangKyCungCapService.query(filter, options)
    res.send(result)
  }

  /**
   * @GET api/v1/dangKyCungCaps/:id
   * @access public
   */
  async getDangKyCungCap(req, res) {
    const dangKyCungCap = await dangKyCungCapService.findById(req.params.id)
    if (!dangKyCungCap) {
      throw createError.NotFound('DangKyCungCap not found')
    }
    res.send(dangKyCungCap)
  }

  /**
   * @POST api/v1/dangKyCungCaps/
   * @access private
   */
  async createDangKyCungCap(req, res) {
    const dangKyCungCap = await dangKyCungCapService.create(req.body)
    res.status(201).send(dangKyCungCap)
  }

  /**
   * @PATCH api/v1/dangKyCungCaps/:id
   * @access private
   */
  async updateDangKyCungCap(req, res) {
    const dangKyCungCap = await dangKyCungCapService.updateById(
      req.params.id,
      req.body
    )
    res.send(dangKyCungCap)
  }

  /**
   * @DELETE api/v1/dangKyCungCaps/:id
   * @access private
   */
  async deleteDangKyCungCap(req, res) {
    await dangKyCungCapService.deleteById(req.params.id)
    res.status(200).json({ success: true })
  }
}

export default new DangKyCungCapCtrl()

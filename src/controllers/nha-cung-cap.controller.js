import createError from 'http-errors'
import pick from '../utils/pick'
import nhaCungCapService from '../services/nha-cung-cap.service'

class NhaCungCapCtrl {
  /**
   * @GET api/v1/nhaCungCaps
   * @access public
   */
  async getNhaCungCaps(req, res) {
    const filter = pick(req.query, ['name', 'role'])
    const options = pick(req.query, ['sortBy', 'limit', 'page'])
    const result = await nhaCungCapService.query(filter, options)
    res.send(result)
  }

  /**
   * @GET api/v1/nhaCungCaps/:id
   * @access public
   */
  async getNhaCungCap(req, res) {
    const nhaCungCap = await nhaCungCapService.findById(req.params.id)
    if (!nhaCungCap) {
      throw createError.NotFound('NhaCungCap not found')
    }
    res.send(nhaCungCap)
  }

  /**
   * @POST api/v1/nhaCungCaps/
   * @access private
   */
  async createNhaCungCap(req, res) {
    const nhaCungCap = await nhaCungCapService.create(req.body)
    res.status(201).send(nhaCungCap)
  }

  /**
   * @PATCH api/v1/nhaCungCaps/:id
   * @access private
   */
  async updateNhaCungCap(req, res) {
    const nhaCungCap = await nhaCungCapService.updateById(
      req.params.id,
      req.body
    )
    res.send(nhaCungCap)
  }

  /**
   * @DELETE api/v1/nhaCungCaps/:id
   * @access private
   */
  async deleteNhaCungCap(req, res) {
    await nhaCungCapService.deleteById(req.params.id)
    res.status(200).json({ success: true })
  }
}

export default new NhaCungCapCtrl()

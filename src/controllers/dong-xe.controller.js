import createError from 'http-errors'
import pick from '../utils/pick'
import dongXeService from '../services/dong-xe.service'

class DongXeCtrl {
  /**
   * @GET api/v1/dongXes
   * @access public
   */
  async getDongXes(req, res) {
    const filter = pick(req.query, ['name', 'role'])
    const options = pick(req.query, ['sortBy', 'limit', 'page'])
    const result = await dongXeService.query(filter, options)
    res.send(result)
  }

  /**
   * @GET api/v1/dongXes/:id
   * @access public
   */
  async getDongXe(req, res) {
    const dongXe = await dongXeService.findById(req.params.id)
    if (!dongXe) {
      throw createError.NotFound('DongXe not found')
    }
    res.send(dongXe)
  }

  /**
   * @POST api/v1/dongXes/
   * @access private
   */
  async createDongXe(req, res) {
    const dongXe = await dongXeService.create(req.body)
    res.status(201).send(dongXe)
  }

  /**
   * @PATCH api/v1/dongXes/:id
   * @access private
   */
  async updateDongXe(req, res) {
    const dongXe = await dongXeService.updateById(req.params.id, req.body)
    res.send(dongXe)
  }

  /**
   * @DELETE api/v1/dongXes/:id
   * @access private
   */
  async deleteDongXe(req, res) {
    await dongXeService.deleteById(req.params.id)
    res.status(200).json({ success: true })
  }
}

export default new DongXeCtrl()

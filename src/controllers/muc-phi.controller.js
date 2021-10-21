import createError from 'http-errors'
import pick from '../utils/pick'
import mucPhiService from '../services/mucPhi.service'

class MucPhiCtrl {
  /**
   * @GET api/v1/mucPhis
   * @access public
   */
  async getMucPhis(req, res) {
    const filter = pick(req.query, ['name', 'role'])
    const options = pick(req.query, ['sortBy', 'limit', 'page'])
    const result = await mucPhiService.query(filter, options)
    res.send(result)
  }

  /**
   * @GET api/v1/mucPhis/:id
   * @access public
   */
  async getMucPhi(req, res) {
    const mucPhi = await mucPhiService.findById(req.params.id)
    if (!mucPhi) {
      throw createError.NotFound('MucPhi not found')
    }
    res.send(mucPhi)
  }

  /**
   * @POST api/v1/mucPhis/
   * @access private
   */
  async createMucPhi(req, res) {
    const mucPhi = await mucPhiService.create(req.body)
    res.status(201).send(mucPhi)
  }

  /**
   * @PATCH api/v1/mucPhis/:id
   * @access private
   */
  async updateMucPhi(req, res) {
    const mucPhi = await mucPhiService.updateById(req.params.id, req.body)
    res.send(mucPhi)
  }

  /**
   * @DELETE api/v1/mucPhis/:id
   * @access private
   */
  async deleteMucPhi(req, res) {
    await mucPhiService.deleteById(req.params.id)
    res.status(200).json({ success: true })
  }
}

export default new MucPhiCtrl()

import createHttpError from 'http-errors'
import pick from '../utils/pick'
import deTaiService from '../services/de-tai.service'
import catchAsync from '../utils/catchAsync'

/**
 * @POST api/v1/deTais/
 * @access private
 */
const createDeTai = catchAsync(async (req, res) => {
  const deTai = await deTaiService.createDeTai(req.body)
  res.status(201).send(deTai)
})

/**
 * @GET api/v1/deTais
 * @access public
 */
const getDeTais = catchAsync(async (req, res) => {
  const filter = pick(req.query, [])
  const options = pick(req.query, ['sort', 'select', 'sortBy', 'limit', 'page'])
  const result = await deTaiService.queryDeTais(filter, options)
  res.send(result)
})

/**
 * @GET api/v1/deTais/:deTaiId
 * @access public
 */
const getDeTai = catchAsync(async (req, res) => {
  const deTai = await deTaiService.getDeTaiById(req.params.deTaiId)
  if (!deTai) {
    throw createHttpError.NotFound()
  }
  res.send(deTai)
})

/**
 * @PATCH api/v1/deTais/:deTaiId
 * @access private
 */
const updateDeTai = catchAsync(async (req, res) => {
  const deTai = await deTaiService.updateDeTaiById(req.params.deTaiId, req.body)
  res.send(deTai)
})

/**
 * @DELETE api/v1/deTais/:deTaiId
 * @access private
 */
const deleteDeTai = catchAsync(async (req, res) => {
  await deTaiService.deleteDeTaiById(req.params.deTaiId)
  res.status(200).json({
    success: true,
    message: 'Deleted deTai successfully!!!',
  })
})
export default {
  createDeTai,
  getDeTais,
  getDeTai,
  updateDeTai,
  deleteDeTai,
}

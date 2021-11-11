import createHttpError from 'http-errors'
import pick from '../utils/pick'
import lopService from '../services/2-lop.service'
import catchAsync from '../utils/catchAsync'

/**
 * @POST api/v1/lops/
 * @access private
 */
const createLop = catchAsync(async (req, res) => {
  const lop = await lopService.createLop(req.body)
  res.status(201).send(lop)
})

/**
 * @GET api/v1/lops
 * @access public
 */
const getLops = catchAsync(async (req, res) => {
  const filter = pick(req.query, [])
  const options = pick(req.query, ['sort', 'select', 'sortBy', 'limit', 'page'])
  const result = await lopService.queryLops(filter, options)
  res.send(result)
})

/**
 * @GET api/v1/lops/:lopId
 * @access public
 */
const getLop = catchAsync(async (req, res) => {
  const lop = await lopService.getLopById(req.params.lopId)
  if (!lop) {
    throw createHttpError.NotFound()
  }
  res.send(lop)
})

/**
 * @PATCH api/v1/lops/:lopId
 * @access private
 */
const updateLop = catchAsync(async (req, res) => {
  const lop = await lopService.updateLopById(req.params.lopId, req.body)
  res.send(lop)
})

/**
 * @DELETE api/v1/lops/:lopId
 * @access private
 */
const deleteLop = catchAsync(async (req, res) => {
  await lopService.deleteLopById(req.params.lopId)
  res.status(200).json({
    success: true,
    message: 'Deleted lop successfully!!!',
  })
})
export default {
  createLop,
  getLops,
  getLop,
  updateLop,
  deleteLop,
}

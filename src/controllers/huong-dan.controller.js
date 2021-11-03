import createHttpError from 'http-errors'
import pick from '../utils/pick'
import huongDanService from '../services/huong-dan.service'
import catchAsync from '../utils/catchAsync'

/**
 * @POST api/v1/huongDans/
 * @access private
 */
const createHuongDan = catchAsync(async (req, res) => {
  const huongDan = await huongDanService.createHuongDan(req.body)
  res.status(201).send(huongDan)
})

/**
 * @GET api/v1/huongDans
 * @access public
 */
const getHuongDans = catchAsync(async (req, res) => {
  const filter = pick(req.query, [])
  const options = pick(req.query, ['sort', 'select', 'sortBy', 'limit', 'page'])
  options.populate = 'maSV,maDT,maGV'
  const result = await huongDanService.queryHuongDans(filter, options)
  res.send(result)
})

/**
 * @GET api/v1/huongDans/:huongDanId
 * @access public
 */
const getHuongDan = catchAsync(async (req, res) => {
  const huongDan = await huongDanService.getHuongDanById(req.params.huongDanId)
  if (!huongDan) {
    throw createHttpError.NotFound()
  }
  res.send(huongDan)
})

/**
 * @PATCH api/v1/huongDans/:huongDanId
 * @access private
 */
const updateHuongDan = catchAsync(async (req, res) => {
  const huongDan = await huongDanService.updateHuongDanById(
    req.params.huongDanId,
    req.body
  )
  res.send(huongDan)
})

/**
 * @DELETE api/v1/huongDans/:huongDanId
 * @access private
 */
const deleteHuongDan = catchAsync(async (req, res) => {
  await huongDanService.deleteHuongDanById(req.params.huongDanId)
  res.status(200).json({
    success: true,
    message: 'Deleted huongDan successfully!!!',
  })
})
export default {
  createHuongDan,
  getHuongDans,
  getHuongDan,
  updateHuongDan,
  deleteHuongDan,
}

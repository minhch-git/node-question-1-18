import createHttpError from 'http-errors'
import pick from '../utils/pick'
import khoaService from '../services/2-khoa.service'
import catchAsync from '../utils/catchAsync'

/**
 * @POST api/v1/khoas/
 * @access private
 */
const createKhoa = catchAsync(async (req, res) => {
  const khoa = await khoaService.createKhoa(req.body)
  res.status(201).send(khoa)
})

/**
 * @GET api/v1/khoas
 * @access public
 */
const getKhoas = catchAsync(async (req, res) => {
  const filter = pick(req.query, [])
  const options = pick(req.query, ['sort', 'select', 'sortBy', 'limit', 'page'])
  const result = await khoaService.queryKhoas(filter, options)
  res.send(result)
})

/**
 * @GET api/v1/khoas/:khoaId
 * @access public
 */
const getKhoa = catchAsync(async (req, res) => {
  const khoa = await khoaService.getKhoaById(req.params.khoaId)
  if (!khoa) {
    throw createHttpError.NotFound()
  }
  res.send(khoa)
})

/**
 * @PATCH api/v1/khoas/:khoaId
 * @access private
 */
const updateKhoa = catchAsync(async (req, res) => {
  const khoa = await khoaService.updateKhoaById(req.params.khoaId, req.body)
  res.send(khoa)
})

/**
 * @DELETE api/v1/khoas/:khoaId
 * @access private
 */
const deleteKhoa = catchAsync(async (req, res) => {
  await khoaService.deleteKhoaById(req.params.khoaId)
  res.status(200).json({
    success: true,
    message: 'Deleted khoa successfully!!!',
  })
})
export default {
  createKhoa,
  getKhoas,
  getKhoa,
  updateKhoa,
  deleteKhoa,
}

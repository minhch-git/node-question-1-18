import createHttpError from 'http-errors'
import pick from '../utils/pick'
import monHocService from '../services/2-mon-hoc.service'
import catchAsync from '../utils/catchAsync'

/**
 * @POST api/v1/monHocs/
 * @access private
 */
const createMonHoc = catchAsync(async (req, res) => {
  const monHoc = await monHocService.createMonHoc(req.body)
  res.status(201).send(monHoc)
})

/**
 * @GET api/v1/monHocs
 * @access public
 */
const getMonHocs = catchAsync(async (req, res) => {
  const filter = pick(req.query, [])
  const options = pick(req.query, ['sort', 'select', 'sortBy', 'limit', 'page'])
  const result = await monHocService.queryMonHocs(filter, options)
  res.send(result)
})

/**
 * @GET api/v1/monHocs/:monHocId
 * @access public
 */
const getMonHoc = catchAsync(async (req, res) => {
  const monHoc = await monHocService.getMonHocById(req.params.monHocId)
  if (!monHoc) {
    throw createHttpError.NotFound()
  }
  res.send(monHoc)
})

/**
 * @PATCH api/v1/monHocs/:monHocId
 * @access private
 */
const updateMonHoc = catchAsync(async (req, res) => {
  const monHoc = await monHocService.updateMonHocById(
    req.params.monHocId,
    req.body
  )
  res.send(monHoc)
})

/**
 * @DELETE api/v1/monHocs/:monHocId
 * @access private
 */
const deleteMonHoc = catchAsync(async (req, res) => {
  await monHocService.deleteMonHocById(req.params.monHocId)
  res.status(200).json({
    success: true,
    message: 'Deleted monHoc successfully!!!',
  })
})
export default {
  createMonHoc,
  getMonHocs,
  getMonHoc,
  updateMonHoc,
  deleteMonHoc,
}

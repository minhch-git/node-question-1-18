import createHttpError from 'http-errors'
import pick from '../utils/pick'
import giangVienService from '../services/giang-vien.service'
import catchAsync from '../utils/catchAsync'

/**
 * @POST api/v1/giangViens/
 * @access private
 */
const createGiangVien = catchAsync(async (req, res) => {
  const giangVien = await giangVienService.createGiangVien(req.body)
  res.status(201).send(giangVien)
})

/**
 * @GET api/v1/giangViens
 * @access public
 */
const getGiangViens = catchAsync(async (req, res) => {
  const filter = pick(req.query, [])
  const options = pick(req.query, ['sort', 'select', 'sortBy', 'limit', 'page'])
  const result = await giangVienService.queryGiangViens(filter, options)
  res.send(result)
})

/**
 * @GET api/v1/giangViens/:giangVienId
 * @access public
 */
const getGiangVien = catchAsync(async (req, res) => {
  const giangVien = await giangVienService.getGiangVienById(
    req.params.giangVienId
  )
  if (!giangVien) {
    throw createHttpError.NotFound()
  }
  res.send(giangVien)
})

/**
 * @PATCH api/v1/giangViens/:giangVienId
 * @access private
 */
const updateGiangVien = catchAsync(async (req, res) => {
  const giangVien = await giangVienService.updateGiangVienById(
    req.params.giangVienId,
    req.body
  )
  res.send(giangVien)
})

/**
 * @DELETE api/v1/giangViens/:giangVienId
 * @access private
 */
const deleteGiangVien = catchAsync(async (req, res) => {
  await giangVienService.deleteGiangVienById(req.params.giangVienId)
  res.status(200).json({
    success: true,
    message: 'Deleted giangVien successfully!!!',
  })
})
export default {
  createGiangVien,
  getGiangViens,
  getGiangVien,
  updateGiangVien,
  deleteGiangVien,
}

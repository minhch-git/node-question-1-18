import createHttpError from 'http-errors'
import pick from '../utils/pick'
import sinhVienService from '../services/2-sinh-vien.service'
import catchAsync from '../utils/catchAsync'

/**
 * @POST api/v1/sinhViens/
 * @access private
 */
const createSinhVien = catchAsync(async (req, res) => {
  const sinhVien = await sinhVienService.createSinhVien(req.body)
  res.status(201).send(sinhVien)
})

/**
 * @GET api/v1/sinhViens
 * @access public
 */
const getSinhViens = catchAsync(async (req, res) => {
  const filter = pick(req.query, [])
  const options = pick(req.query, ['sort', 'select', 'sortBy', 'limit', 'page'])
  const result = await sinhVienService.querySinhViens(filter, options)
  res.send(result)
})

/**
 * @GET api/v1/sinhViens/:sinhVienId
 * @access public
 */
const getSinhVien = catchAsync(async (req, res) => {
  const sinhVien = await sinhVienService.getSinhVienById(req.params.sinhVienId)
  if (!sinhVien) {
    throw createHttpError.NotFound()
  }
  res.send(sinhVien)
})

/**
 * @PATCH api/v1/sinhViens/:sinhVienId
 * @access private
 */
const updateSinhVien = catchAsync(async (req, res) => {
  const sinhVien = await sinhVienService.updateSinhVienById(
    req.params.sinhVienId,
    req.body
  )
  res.send(sinhVien)
})

/**
 * @DELETE api/v1/sinhViens/:sinhVienId
 * @access private
 */
const deleteSinhVien = catchAsync(async (req, res) => {
  await sinhVienService.deleteSinhVienById(req.params.sinhVienId)
  res.status(200).json({
    success: true,
    message: 'Deleted sinhVien successfully!!!',
  })
})
export default {
  createSinhVien,
  getSinhViens,
  getSinhVien,
  updateSinhVien,
  deleteSinhVien,
}

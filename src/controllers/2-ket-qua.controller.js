import createHttpError from 'http-errors'
import pick from '../utils/pick'
import ketQuaService from '../services/2-ket-qua.service'
import catchAsync from '../utils/catchAsync'

/**
 * @POST api/v1/ketQuas/
 * @access private
 */
const createKetQua = catchAsync(async (req, res) => {
  const ketQua = await ketQuaService.createKetQua(req.body)
  res.status(201).send(ketQua)
})

/**
 * @GET api/v1/ketQuas
 * @access public
 */
const getKetQuas = catchAsync(async (req, res) => {
  const filter = pick(req.query, [])
  const options = pick(req.query, ['sort', 'select', 'sortBy', 'limit', 'page'])
  const result = await ketQuaService.queryKetQuas(filter, options)
  res.send(result)
})

/**
 * @GET api/v1/ketQuas/:ketQuaId
 * @access public
 */
const getKetQua = catchAsync(async (req, res) => {
  const ketQua = await ketQuaService.getKetQuaById(req.params.ketQuaId)
  if (!ketQua) {
    throw createHttpError.NotFound()
  }
  res.send(ketQua)
})

/**
 * @PATCH api/v1/ketQuas/:ketQuaId
 * @access private
 */
const updateKetQua = catchAsync(async (req, res) => {
  const ketQua = await ketQuaService.updateKetQuaById(
    req.params.ketQuaId,
    req.body
  )
  res.send(ketQua)
})

/**
 * @DELETE api/v1/ketQuas/:ketQuaId
 * @access private
 */
const deleteKetQua = catchAsync(async (req, res) => {
  await ketQuaService.deleteKetQuaById(req.params.ketQuaId)
  res.status(200).json({
    success: true,
    message: 'Deleted ketQua successfully!!!',
  })
})
export default {
  createKetQua,
  getKetQuas,
  getKetQua,
  updateKetQua,
  deleteKetQua,
}

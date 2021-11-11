import pick from 'lodash/pick'
import catchAsync from '../utils/catchAsync'
import baiTapService from '../services/bai-tap-1.service'

// cau 1:  - Đưa ra thông tin gồm mã số, họ tên và tên khoa của tất cả các giảng viên
const getCau1 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau1()
  return res.status(200).json({ success: true, data: result })
})

// cau 2:  - Đưa ra thông tin gồm mã số, họ tên và tên khoa của các giảng viên của khoa ‘DIA LY va QLTN’
const getCau2 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau2()
  return res.status(200).json({ success: true, data: result })
})

// cau 3:  - Cho biết số sinh viên của khoa ‘CONG NGHE SINH HOC’
const getCau3 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau3()
  return res.status(200).json({ success: true, count: result })
})

// cau 4:  - Đưa ra danh sách gồm mã số, họ tênvà tuổi của các sinh viên khoa ‘TOAN’
const getCau4 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau4()
  return res.status(200).json({
    success: true,
    data: result,
  })
})

// cau 5:  - Cho biết số giảng viên của khoa ‘CONG NGHE SINH HOC’
const getCau5 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau5()
  return res.status(200).json({
    success: true,
    count: result,
  })
})

// cau 6:  - Cho biết thông tin về sinh viên không tham gia thực tập
const getCau6 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau6()
  return res.status(200).json({
    success: true,
    data: result,
  })
})

// cau 7:  - Đưa ra mã khoa, tên khoa và số giảng viên của mỗi khoa
const getCau7 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau7()
  return res.status(200).json({
    success: true,
    data: result,
  })
})

// cau 8:  - Cho biết số điện thoại của khoa mà sinh viên có tên ‘Le van son’ đang theo học
const getCau8 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau8()
  return res.status(200).json({
    success: true,
    soDTKhoa: result,
  })
})

// cau 9:  - Cho biết mã số và tên của các đề tài do giảng viên ‘Tran son’ hướng dẫn
const getCau9 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau9()
  return res.status(200).json({
    success: true,
    data: result,
  })
})

// cau 10:  - Cho biết tên đề tài không có sinh viên nào thực tập
const getCau10 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau10()
  return res.status(200).json({
    success: true,
    data: result,
  })
})

// cau 11:  - Cho biết mã số, họ tên, tên khoa của các giảng viên hướng dẫn từ 3 sinh viên trở lên.
const getCau11 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau11()
  return res.status(200).json({
    success: true,
    data: result,
  })
})

// cau 12:  - Cho biết mã số, tên đề tài của đề tài có kinh phí cao nhất
const getCau12 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau12()
  return res.status(200).json({
    success: true,
    data: result,
  })
})

// cau 13:  - Cho biết mã số và tên các đề tài có nhiều hơn 2 sinh viên tham gia thực tập
const getCau13 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau13()
  return res.status(200).json({
    success: true,
    data: result,
  })
})

// cau 14:  - Đưa ra mã số, họ tên và điểm của các sinh viên khoa ‘DIALY và QLTN’
const getCau14 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau14()
  return res.status(200).json({
    success: true,
    data: result,
  })
})

// cau 15:  - Đưa ra tên khoa, số lượng sinh viên của mỗi khoa
const getCau15 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau15()
  return res.status(200).json({
    success: true,
    data: result,
  })
})

// cau 16:  - Cho biết thông tin về các sinh viên thực tập tại quê nhà
const getCau16 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau16()
  return res.status(200).json({
    success: true,
    data: result,
  })
})

// cau 17:  - Hãy cho biết thông tin về những sinh viên chưa có điểm thực tập
const getCau17 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau17()
  return res.status(200).json({
    success: true,
    data: result,
  })
})

// cau 18:  - Đưa ra danh sách gồm mã số, họ tên các sinh viên có điểm thực tập bằng 0
const getCau18 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau18()
  return res.status(200).json({
    success: true,
    data: result,
  })
})

export default {
  getCau1,
  getCau2,
  getCau3,
  getCau4,
  getCau5,
  getCau6,
  getCau7,
  getCau8,
  getCau9,
  getCau10,
  getCau11,
  getCau12,
  getCau13,
  getCau14,
  getCau15,
  getCau16,
  getCau17,
  getCau18,
}

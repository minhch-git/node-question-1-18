import pick from 'lodash/pick'
import BaiTapService from '../services/bai-tap.service'

class BaiTapCtrl {
  // cau 1:  - Đưa ra thông tin gồm mã số, họ tên và tên khoa của tất cả các giảng viên
  async getCau1(req, res, next) {
    const result = await BaiTapService.getCau1()
    return res.status(200).json({ success: true, data: result })
  }

  // cau 2:  - Đưa ra thông tin gồm mã số, họ tên và tên khoa của các giảng viên của khoa ‘DIA LY va QLTN’
  async getCau2(req, res, next) {
    const result = await BaiTapService.getCau2()
    return res.status(200).json({ success: true, data: result })
  }

  // cau 3:  - Cho biết số sinh viên của khoa ‘CONG NGHE SINH HOC’
  async getCau3(req, res, next) {
    const result = await BaiTapService.getCau3()
    return res.status(200).json({ success: true, data: result })
  }

  // cau 4:  - Đưa ra danh sách gồm mã số, họ tênvà tuổi của các sinh viên khoa ‘TOAN’
  async getCau4(req, res, next) {
    const result = await BaiTapService.getCau4()
    return res.status(200).json({
      success: true,
      data: result,
    })
  }

  // cau 5:  - Cho biết số giảng viên của khoa ‘CONG NGHE SINH HOC’
  async getCau5(req, res, next) {
    const result = await BaiTapService.getCau5()
    return res.status(200).json({
      success: true,
      data: result,
    })
  }

  // cau 6:  - Cho biết thông tin về sinh viên không tham gia thực tập
  async getCau6(req, res, next) {
    const result = await BaiTapService.getCau6()
    return res.status(200).json({
      success: true,
      data: result,
    })
  }

  // cau 7:  - Đưa ra mã khoa, tên khoa và số giảng viên của mỗi khoa
  async getCau7(req, res, next) {
    const result = await BaiTapService.getCau7()
    return res.status(200).json({
      success: true,
      data: result,
    })
  }

  // cau 8:  - Cho biết số điện thoại của khoa mà sinh viên có tên ‘Le van son’ đang theo học
  async getCau8(req, res, next) {
    const result = await BaiTapService.getCau8()
    return res.status(200).json({
      success: true,
      soDTKhoa: result.maKhoa.dienThoai,
    })
  }

  // cau 9:  - Cho biết mã số và tên của các đề tài do giảng viên ‘Tran son’ hướng dẫn
  async getCau9(req, res, next) {
    const result = await BaiTapService.getCau9()
    return res.status(200).json({
      success: true,
      data: result,
    })
  }

  // cau 10:  - Cho biết tên đề tài không có sinh viên nào thực tập
  async getCau10(req, res, next) {
    const result = await BaiTapService.getCau10()
    return res.status(200).json({
      success: true,
      data: result,
    })
  }

  // cau 11:  - Cho biết mã số, họ tên, tên khoa của các giảng viên hướng dẫn từ 3 sinh viên trở lên.
  async getCau11(req, res, next) {
    const result = await BaiTapService.getCau11()
    return res.status(200).json({
      success: true,
      data: result,
    })
  }

  // cau 12:  - Cho biết mã số, tên đề tài của đề tài có kinh phí cao nhất
  async getCau12(req, res, next) {
    const result = await BaiTapService.getCau12()
    return res.status(200).json({
      success: true,
      data: result,
    })
  }

  // cau 13:  - Cho biết mã số và tên các đề tài có nhiều hơn 2 sinh viên tham gia thực tập
  async getCau13(req, res, next) {
    const result = await BaiTapService.getCau13()
    return res.status(200).json({
      success: true,
      data: result,
    })
  }

  // cau 14:  - Đưa ra mã số, họ tên và điểm của các sinh viên khoa ‘DIALY và QLTN’
  async getCau14(req, res, next) {
    const result = await BaiTapService.getCau14()
    return res.status(200).json({
      success: true,
      data: result,
    })
  }

  // cau 15:  - Đưa ra tên khoa, số lượng sinh viên của mỗi khoa
  async getCau15(req, res, next) {
    const result = await BaiTapService.getCau15()
    return res.status(200).json({
      success: true,
      data: result,
    })
  }

  // cau 16:  - Cho biết thông tin về các sinh viên thực tập tại quê nhà
  async getCau16(req, res, next) {
    const result = await BaiTapService.getCau16()
    return res.status(200).json({
      success: true,
      data: result,
    })
  }

  // cau 17:  - Hãy cho biết thông tin về những sinh viên chưa có điểm thực tập
  async getCau17(req, res, next) {
    const result = await BaiTapService.getCau17()
    return res.status(200).json({
      success: true,
      data: result,
    })
  }

  // cau 18:  - Đưa ra danh sách gồm mã số, họ tên các sinh viên có điểm thực tập bằng 0
  async getCau18(req, res, next) {
    const result = await BaiTapService.getCau18()
    return res.status(200).json({
      success: true,
      data: result,
    })
  }

  async queryGiangViens(req, res) {
    const filter = pick(req.query, ['name', 'luong'])
    const options = pick(req.query, ['select', 'sort', 'page', 'limit'])
    options.populate = 'maKhoa'
    const result = await BaiTapService.queryGiangViens(filter, options)
    return res.status(200).json(result)
  }

  async getKhoa(req, res) {
    const filter = pick(req.query, ['tenKhoa', 'phone'])
    const options = pick(req.query, ['select', 'sort', 'page', 'limit'])
    const result = await BaiTapService.queryKhoas(filter, options)
    return res.status(200).json(result)
  }

  async create(req, res) {
    const newItem = await BaiTapService.create(req.body)
    return res.status(201).json({ success: true, data: newItem })
  }
}

export default new BaiTapCtrl()

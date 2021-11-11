import createHttpError from 'http-errors'

import GiangVien from '../models/GiangVien'
import DeTai from '../models/DeTai'
import HuongDan from '../models/HuongDan'
import SinhVien from '../models/SinhVien'
import Khoa from '../models/Khoa'

// cau 1:  - Đưa ra thông tin gồm mã số, họ tên và tên khoa của tất cả các giảng viên
const getCau1 = async () => {
  return GiangVien.find({})
    .populate({
      path: 'maKhoa',
      select: 'tenKhoa -_id',
    })
    .select('-luong')
}

// cau 2:  - Đưa ra thông tin gồm mã số, họ tên và tên khoa của các giảng viên của khoa ‘DIA LY va QLTN’
const getCau2 = async () => {
  const keyword = 'DIA LY va QLTN'

  const idKhoaDLQLTN = await Khoa.findOne({
    tenKhoa: { $regex: keyword, $options: 'i' },
  })
  if (!idKhoaDLQLTN) throw createHttpError.NotFound(`Not found ${keyword}`)

  return GiangVien.find({
    maKhoa: idKhoaDLQLTN,
  })
    .populate({
      path: 'maKhoa',
      select: 'tenKhoa -_id ',
    })
    .select('-luong')
}

// cau 3:  - Cho biết số sinh viên của khoa ‘CONG NGHE SINH HOC’
const getCau3 = async () => {
  const keyword = 'CONG NGHE SINH HOC'
  const idKhoaCNSH = await Khoa.findOne({
    tenKhoa: { $regex: keyword, $options: 'i' },
  })

  if (!idKhoaCNSH) throw createHttpError.NotFound(`Not found ${keyword}`)

  return SinhVien.countDocuments({
    maKhoa: idKhoaCNSH,
  })
}

// cau 4:  - Đưa ra danh sách gồm mã số, họ tên và tuổi của các sinh viên khoa ‘TOAN’
const getCau4 = async () => {
  const keyword = 'Toan'
  const idKhoaToan = await Khoa.findOne({
    tenKhoa: { $regex: keyword, $options: 'i' },
  })
  if (!idKhoaToan) throw createHttpError.NotFound(`Not found ${keyword}`)
  return SinhVien.find({
    maKhoa: idKhoaToan,
  }).select('id hoTenSV namSinh')
}

// cau 5:  - Cho biết số giảng viên của khoa ‘CONG NGHE SINH HOC’
const getCau5 = async () => {
  const keyword = 'CONG NGHE SINH HOC'
  const idKhoaCNSH = await Khoa.findOne({
    tenKhoa: { $regex: keyword, $options: 'i' },
  })

  if (!idKhoaCNSH) throw createHttpError.NotFound(`Not found ${keyword}`)

  return GiangVien.countDocuments({
    maKhoa: idKhoaCNSH,
  })
}

// cau 6:  - Cho biết thông tin về sinh viên không tham gia thực tập (tìm những sinh viên không có trong model: HuongDan)
const getCau6 = async () => {
  const maSVs = await HuongDan.distinct('maSV')
  const options = {
    _id: {
      $nin: maSVs,
    },
  }

  return SinhVien.find(options)
}

// cau 7:  - Đưa ra mã khoa, tên khoa và số giảng viên của mỗi khoa
const getCau7 = async () => {
  // Reference model: "giangviens"
  const lookupOptions = {
    from: 'giangviens',
    localField: '_id',
    foreignField: 'maKhoa',
    as: 'giangViens',
  }
  // Select fields
  const projectOptions = {
    id: '$_id',
    tenKhoa: '$tenKhoa',
    soGiangVien: {
      $size: '$giangViens',
    },
  }

  const result = Khoa.aggregate([
    {
      $lookup: lookupOptions,
    },
    {
      $project: projectOptions,
    },
  ])

  return result
}

// cau 8:  - Cho biết số điện thoại của khoa mà sinh viên có tên ‘Le van son’ đang theo học
const getCau8 = async () => {
  const keyword = 'Le van son'

  const sinhViens = await SinhVien.findOne({
    hoTenSV: keyword,
  }).populate('maKhoa')

  if (!sinhViens) {
    throw createHttpError.NotFound(`Not found sinh vien ${keyword}`)
  }

  return sinhViens
}

// cau 9:  - Cho biết mã số và tên của các đề tài do giảng viên ‘Tran son’ hướng dẫn
const getCau9 = async () => {
  // GiangVien => HuongDan => DeTai
  const keyword = 'Tran Son'
  const giangVien = await GiangVien.findOne({
    hoTenGV: keyword,
  }).select('_id') // Find one

  if (!giangVien) {
    throw createHttpError.NotFound(`Not found giang vien: ${keyword}`)
  }

  const huongDan = await HuongDan.find({
    maGV: giangVien._id,
  })
    .populate({
      path: 'maDT',
      select: '_id tenDT',
    })
    .select('maDT -_id')

  if (!huongDan.length) {
    throw createHttpError.NotFound(
      `Not found De tai cua giang vien: ${keyword}`
    )
  }

  return huongDan
}

// cau 10:  - Cho biết tên đề tài không có sinh viên nào thực tập
const getCau10 = async () => {
  // HuongDan => DeTai
  const maDTs = await HuongDan.distinct('maDT')

  const options = {
    _id: {
      $nin: maDTs,
    },
  }
  return DeTai.find(options)
}

// cau 11:  - Cho biết mã số, họ tên, tên khoa của các giảng viên hướng dẫn từ 3 sinh viên trở lên.
// => Tìm:
//      +maGV và +maSV có 3 lần trong bang HuongDan

const getCau11 = async () => {
  // group
  const group = {
    _id: '$maGV',
    count: { $sum: 1 },
  }

  // match
  const match = { count: { $gt: 3 } }

  // Reference model: "giangviens"
  const lookupGiangVien = {
    from: 'giangviens',
    localField: '_id',
    foreignField: '_id',
    as: 'giangviens',
  }
  const unwindGiangVien = {
    path: '$giangviens',
    preserveNullAndEmptyArrays: true,
  }

  // Reference model: "Khoas" from 'giangviens'
  const lookupKhoa = {
    from: 'Khoas',
    localField: 'giangviens.maKhoa',
    foreignField: '_id',
    as: 'khoas',
  }
  const unwindKhoa = {
    path: '$khoas',
    preserveNullAndEmptyArrays: true,
  }

  // Select fields
  const projectOptions = {
    _id: '$_id',
    count: '$count',
    hoTenGV: '$giangviens.hoTenGV',
    tenKhoa: '$khoas.tenKhoa',
  }

  const giangViens = await HuongDan.aggregate([
    { $group: group },
    { $match: match },
    { $lookup: lookupGiangVien },
    { $unwind: unwindGiangVien },
    { $lookup: lookupKhoa },
    { $unwind: unwindKhoa },
    { $project: projectOptions },
  ]).catch(error => {
    createHttpError.NotFound('Not found')
    console.log(error)
  })

  return giangViens
}

// cau 12:  - Cho biết mã số, tên đề tài của đề tài có kinh phí cao nhất
const getCau12 = async () => {
  return DeTai.find({}).sort('-kinhPhi').limit(1).select('_id tenDT')
}

// cau 13:  - Cho biết mã số và tên các đề tài có nhiều hơn 2 sinh viên tham gia thực tập
const getCau13 = async () => {
  // Reference model: "giangviens"
  const lookupOptions = {
    from: 'detais',
    localField: '_id',
    foreignField: '_id',
    as: 'deTais',
  }

  // Select fields
  const projectOptions = {
    _id: '$_id',
    count: '$count',
    detais: '$deTais',
  }

  const deTais = await HuongDan.aggregate([
    {
      $group: {
        _id: '$maDT',
        soSinhVien: { $sum: 1 },
      },
    },
    {
      $match: { soSinhVien: { $gt: 2 } },
    },
    {
      $lookup: lookupOptions,
    },
    {
      $project: projectOptions,
    },
  ]).catch(error => {
    createHttpError.NotFound('Not found')
    console.log(error)
  })

  return deTais
}

// cau 14:  - Đưa ra mã số, họ tên và điểm của các sinh viên khoa ‘DIALY và QLTN’
const getCau14 = async () => {
  const keyword = 'DIA LY va QLTN'

  const idKhoaDLQLTN = await Khoa.findOne({
    tenKhoa: { $regex: keyword, $options: 'i' },
  })
  if (!idKhoaDLQLTN) throw createHttpError.NotFound(`Not found ${keyword}`)

  return HuongDan.find({
    maKhoa: idKhoaDLQLTN,
  })
    .populate({
      path: 'maSV',
      select: '_id hoTenSV',
    })
    .select('ketQua -_id')
}

// cau 15:  - Đưa ra tên khoa, số lượng sinh viên của mỗi khoa
const getCau15 = async () => {
  // Reference model: "sinhviens"
  const lookupOptions = {
    from: 'sinhviens',
    localField: '_id',
    foreignField: 'maKhoa',
    as: 'sinhviens',
  }
  // Select fields
  const projectOptions = {
    tenKhoa: '$tenKhoa',
    soGiangVien: {
      $size: '$sinhviens',
    },
  }

  const result = Khoa.aggregate([
    {
      $lookup: lookupOptions,
    },
    {
      $project: projectOptions,
    },
  ])
  return result
}

// cau 16:  - Cho biết thông tin về các sinh viên thực tập tại quê nhà
const getCau16 = async () => {
  // SinhVien[queQuan] = deTai[noiThucTap]
  // => HuongDan[]
  const noiThucTaps = await DeTai.distinct('noiThucTap')

  const options = {
    queQuan: {
      $in: noiThucTaps,
    },
  }

  const result = HuongDan.find()
    .populate({
      path: 'maDT',
    })
    .populate({
      path: 'maSV',
      match: options,
    })
    .select('-_id maDT maSV')
  return result
}

// cau 17:  - Hãy cho biết thông tin về những sinh viên chưa có điểm thực tập
const getCau17 = async () => {
  return HuongDan.find({
    ketQua: {
      $exists: false,
    },
  })
    .populate('maSV')
    .select('-_id maSV')
}

// cau 18:  - Đưa ra danh sách gồm mã số, họ tên các sinh viên có điểm thực tập bằng 0
const getCau18 = async () => {
  return HuongDan.find({
    ketQua: 0,
  })
    .populate('maSV')
    .select('-_id maSV')
}

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

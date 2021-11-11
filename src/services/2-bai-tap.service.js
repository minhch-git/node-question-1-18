import createHttpError from 'http-errors'
import mongoose from 'mongoose'

import Khoa from '../models/2-khoa.model'
import Lop from '../models/2-lop.model'
import MonHoc from '../models/2-mon-hoc.model'
import SinhVien from '../models/2-sinh-vien.model'
import KetQua from '../models/2-ket-qua.model'

// SinhVien(MaSV, HoTen, Nu, NgaySinh, MaLop, HocBong, Tinh)
// Lop(MaLop, TenLop, MaKhoa)
// Khoa(MaKhoa, TenKhoa, SoCBGD)
// MonHoc(MaMH, TenMH, SoTiet)
// KetQua(MaSV, MaMH, DiemThi)

// Câu 1: Liệt kê danh sách các lớp của khoa, thông tin cần Malop, TenLop, MaKhoa
const getCau1 = async () => {
  return Lop.find()
}

// Câu 2: Lập danh sách sinh viên gồm: MaSV, HoTen, HocBong
const getCau2 = async () => {
  return SinhVien.find().select('hoTen hocBong')
}

// Câu 3: Lập danh sách sinh viên có học bổng. Danh sách cần MaSV, Nu, HocBong
const getCau3 = async () => {
  return SinhVien.find({ hocBong: { $gt: 0 } }).select('gioiTinh hocBong')
}

// Câu 4: Lập danh sách sinh viên nữ. Danh sách cần các thuộc tính của quan hệ sinhvien
const getCau4 = async () => {
  return SinhVien.find({ gioiTinh: true })
}

// Câu 5: Lập danh sách sinh viên có họ ‘Trần’
// SELECT *  FROM SinhVien WHERE HoTen Like ‘Trần *’
const getCau5 = async () => {
  const keyword = '^trần '
  return SinhVien.find({
    hoTen: new RegExp(keyword, 'i'),
  })
}

// Câu 6: Lập danh sách sinh viên nữ có học bổng
// SELECT *  FROM SinhVien WHERE Nu=Yes OR HocBong>0
const getCau6 = async () => {
  return SinhVien.find({ gioiTinh: true, hocBong: { $gt: 0 } })
}

// Câu 7: Lập danh sách sinh viên nữ hoặc danh sách sinh viên có học bổng
const getCau7 = async () => {
  return SinhVien.find({
    $or: [{ gioiTinh: true }, { hocBong: { $gt: 0 } }],
  })
}

// Câu 8: Lập danh sách sinh viên có năm sinh từ 1978 đến 1985. Danh sách cần các thuộc tính của quan hệ SinhVien
const getCau8 = async () => {
  return SinhVien.find({
    ngaySinh: { $gte: new Date(1978, 1, 1), $lt: new Date(1985, 1, 1) },
  })
}

// Câu 9: Liệt kê danh sách sinh viên được sắp xếp tăng dần theo MaSV
// SELECT *  FROM SinhVien ORDER BY MaSV
const getCau9 = async () => {
  return SinhVien.find().sort('_id')
}

// Câu 10: Liệt kê danh sách sinh viên được sắp xếp giảm dần theo HocBong
// SELECT *  FROM SinhVien ORDER BY HocBong DESC
const getCau10 = async () => {
  return SinhVien.find().sort('-hocBong')
}

// Câu 11: Lập danh sách sinh viên có điểm thi môn CSDL>=8
const getCau11 = async () => {
  return KetQua.find({ diemtThi: { $gte: 8 } })
    .populate('maSV')
    .select('maSV -_id')
}

// Câu 12: Lập danh sách sinh viên có học bổng của khoa CNTT.
// Thông tin cần: MaSV, HoTen, HocBong,TenLop
const getCau12 = async () => {
  // // SinhVien(MaSV, HoTen, Nu, NgaySinh, MaLop, HocBong, Tinh)
  // // Lop(MaLop, TenLop, MaKhoa)
  // // Khoa(MaKhoa, TenKhoa, SoCBGD)
  // const idKhoaCNTT = '....'
  // // const idLopCNTT = await Lop.find({ maKhoa: idKhoaCNTT }).select('_id')
  // // if (!idLopCNTT) throw createHttpError('Not found Lop CNTT')

  // return SinhVien.find({ hocHong: { $gt: 0 } })
  //   .populate({
  //     path: 'maLop',
  //     match: {
  //       maKhoa: idKhoaCNTT,
  //     },
  //     select: '_id',
  //   })
  //   .select('_id hoTen hocBong maLop')

  const idKhoa = mongoose.Types.ObjectId('618bd19914768e8421280fc0')
  const results = await SinhVien.aggregate([
    {
      $lookup: {
        from: Lop.collection.name,
        localField: 'maLop',
        foreignField: '_id',
        as: 'lop',
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] },
      },
    },
    { $project: { lop: 0 } },
    {
      $match: {
        $and: [{ hocBong: { $gt: 0 } }, { maKhoa: idKhoa }],
      },
    },
    {
      $project: { _id: 1, hoTen: 1, hocBong: 1, tenLop: 1 },
    },
  ])
  return results
}

// Câu 13: Lập danh sách sinh viên có học bổng của khoa CNTT.
// Thông tin cần: MaSV, HoTen, HocBong,TenLop, TenKhoa
const getCau13 = async () => {
  // const idKhoaCNTT = '...'
  /**
 *   // Reference model: "giangviens"
  const lookupOptions = {
    from: 'lop2s',
    localField: '_id',
    foreignField: 'maLop',
    as: 'lops',
  }
  const matchOptions = {
    maKhoa: idKhoaCNTT,
  }
  // Select fields
  const projectOptions = {
    id: '$_id',
    hoTen: '$hoTen',
    hocBong: '$hocBong',
    tenLop: '$tenLop',
    soGiangVien: {
      $size: '$giangViens',
    },
  }

  const result = SinhVien.aggregate([
    { $lookup: lookupOptions },
    { $match: matchOptions },
    { $project: projectOptions },
  ])
 */

  // return SinhVien.find({ hocBong: { $gt: 0 } })
  //   .populate({
  //     path: 'maLop',
  //     match: {
  //       maKhoa: idKhoaCNTT,
  //     },
  //     populate: {
  //       path: 'maKhoa',
  //       match: {
  //         _id: idKhoaCNTT,
  //       },
  //       select: 'tenKhoa',
  //     },

  //     select: 'tenLop -_id',
  //   })
  //   .select('hoTen hocBong')
  const idKhoa = mongoose.Types.ObjectId('618bd19914768e8421280fc0')
  const results = await SinhVien.aggregate([
    {
      $lookup: {
        from: Lop.collection.name,
        localField: 'maLop',
        foreignField: '_id',
        as: 'lop',
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] },
      },
    },
    { $project: { lop: 0 } },
    {
      $lookup: {
        from: Khoa.collection.name,
        localField: 'maKhoa',
        foreignField: '_id',
        as: 'khoa',
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] },
      },
    },
    { $project: { khoa: 0 } },
    {
      $match: {
        $and: [{ hocBong: { $gt: 0 } }, { maKhoa: idKhoa }],
      },
    },
    {
      $project: { _id: 1, hoTen: 1, hocBong: 1, tenLop: 1, tenKhoa: 1 },
    },
  ])
  return results
}

// Câu 14: Cho biết số sinh viên của mỗi lớp
const getCau14 = async () => {
  const results = await SinhVien.aggregate([
    {
      $group: { _id: '$maLop', SLSinhVien: { $sum: 1 } },
    },
    {
      $lookup: {
        from: Lop.collection.name,
        localField: '_id',
        foreignField: '_id',
        as: 'lop',
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] },
      },
    },
    {
      $project: { _id: 1, tenLop: 1, SLSinhVien: 1 },
    },
  ])
  return results
}

// Câu 15: Cho biết số lượng sinh viên của mỗi khoa.
const getCau15 = async () => {
  const results = await SinhVien.aggregate([
    {
      $lookup: {
        from: Lop.collection.name,
        localField: 'maLop',
        foreignField: '_id',
        as: 'lop',
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] },
      },
    },
    {
      $lookup: {
        from: Khoa.collection.name,
        localField: 'maKhoa',
        foreignField: '_id',
        as: 'khoa',
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] },
      },
    },
    {
      $group: {
        _id: '$maKhoa',
        tenKhoa: { $first: '$tenKhoa' },
        SLSinhVien: { $sum: 1 },
      },
    },
  ])
  return results
}

// Câu 16: Cho biết số lượng sinh viên nữ của mỗi khoa.
const getCau16 = async () => {
  const results = await SinhVien.aggregate([
    {
      $match: { gioiTinh: true },
    },
    {
      $lookup: {
        from: Lop.collection.name,
        localField: 'maLop',
        foreignField: '_id',
        as: 'lop',
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] },
      },
    },
    {
      $lookup: {
        from: Khoa.collection.name,
        localField: 'maKhoa',
        foreignField: '_id',
        as: 'khoa',
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] },
      },
    },
    {
      $group: {
        _id: '$maKhoa',
        tenKhoa: { $first: '$tenKhoa' },
        SLSinhVien: { $sum: 1 },
      },
    },
  ])
  return results
}

// Câu 17: Cho biết tổng tiền học bổng của mỗi lớp
const getCau17 = async () => {
  const results = await SinhVien.aggregate([
    {
      $lookup: {
        from: Lop.collection.name,
        localField: 'maLop',
        foreignField: '_id',
        as: 'lop',
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] },
      },
    },
    {
      $group: {
        _id: '$maLop',
        tenLop: { $first: '$tenLop' },
        tongHB: { $sum: '$hocBong' },
      },
    },
  ])
  return results
}

// Câu 18: Cho biết tổng số tiền học bổng của mỗi khoa
const getCau18 = async () => {
  const results = await SinhVien.aggregate([
    {
      $lookup: {
        from: Lop.collection.name,
        localField: 'maLop',
        foreignField: '_id',
        as: 'lop',
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] },
      },
    },
    {
      $lookup: {
        from: Khoa.collection.name,
        localField: 'maKhoa',
        foreignField: '_id',
        as: 'khoa',
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] },
      },
    },
    {
      $group: {
        _id: '$maLop',
        tenKhoa: { $first: '$tenKhoa' },
        tongHB: { $sum: '$hocBong' },
      },
    },
  ])
  return results
}

// Câu 19: Lập danh sánh những khoa có nhiều hơn 100 sinh viên. Danh sách cần: MaKhoa, TenKhoa, Soluong
const getCau19 = async () => {
  const results = await SinhVien.aggregate([
    {
      $lookup: {
        from: Lop.collection.name,
        localField: 'maLop',
        foreignField: '_id',
        as: 'lop',
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] },
      },
    },
    {
      $lookup: {
        from: Khoa.collection.name,
        localField: 'maKhoa',
        foreignField: '_id',
        as: 'khoa',
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] },
      },
    },
    {
      $group: {
        _id: '$maLop',
        tenKhoa: { $first: '$tenKhoa' },
        SLSinhVien: { $sum: 1 },
      },
    },
    {
      $match: {
        SLSinhVien: { $gt: 100 },
      },
    },
  ])
  return results
}

// Câu 20: Lập danh sánh những khoa có nhiều hơn 50 sinh viên nữ. Danh sách cần: MaKhoa, TenKhoa, Soluong
const getCau20 = async () => {
  const results = await SinhVien.aggregate([
    {
      $match: { gioiTinh: true },
    },
    {
      $lookup: {
        from: Lop.collection.name,
        localField: 'maLop',
        foreignField: '_id',
        as: 'lop',
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] },
      },
    },
    {
      $lookup: {
        from: Khoa.collection.name,
        localField: 'maKhoa',
        foreignField: '_id',
        as: 'khoa',
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] },
      },
    },
    {
      $group: {
        _id: '$maLop',
        tenKhoa: { $first: '$tenKhoa' },
        SLSinhVien: { $sum: 1 },
      },
    },
    {
      $match: {
        SLSinhVien: { $gte: 50 },
      },
    },
  ])
  return results
}

// Câu 21: Lập danh sách những khoa có tổng tiền học bổng >=1000000.
const getCau21 = async () => {
  const results = await SinhVien.aggregate([
    {
      $lookup: {
        from: Lop.collection.name,
        localField: 'maLop',
        foreignField: '_id',
        as: 'lop',
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] },
      },
    },
    {
      $lookup: {
        from: Khoa.collection.name,
        localField: 'maKhoa',
        foreignField: '_id',
        as: 'khoa',
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] },
      },
    },
    {
      $group: {
        _id: '$maLop',
        tenKhoa: { $first: '$tenKhoa' },
        tongHB: { $sum: '$hocBong' },
      },
    },
    {
      $match: { tongHB: { $gte: 1000000 } },
    },
  ])
  return results
}

// Câu 22: Lập danh sách sinh viên có học bổng cao nhất
const getCau22 = async () => {
  const results = await SinhVien.find().sort({ hocBong: -1 }).limit(1)
  return results
}

// Câu 23: Lập danh sách sinh viên có điểm thi môn CSDL cao nhất
const getCau23 = async () => {
  const idMonHoc = mongoose.Types.ObjectId('618bd72bc29a258aea19b59e')
  const results = await SinhVien.aggregate([
    {
      $lookup: {
        from: KetQua.collection.name,
        localField: '_id',
        foreignField: 'maSV',
        as: 'ketQua',
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ['$ketQua', 0] }, '$$ROOT'],
        },
      },
    },
    {
      $project: { ketQua: 0 },
    },
    {
      $match: { maMH: idMonHoc },
    },
    {
      $sort: { diemThi: -1 },
    },
    {
      $limit: 1,
    },
  ])
  return results
}

// Câu 24: Lập danh sách những sinh viên không có điểm thi môn CSDL.
const getCau24 = async () => {
  const idMonHoc = mongoose.Types.ObjectId('618bd72bc29a258aea19b59e')
  const ketQuaResult = await KetQua.find({
    maMH: idMonHoc,
  }).distinct('maSV')

  const results = await SinhVien.find({
    _id: { $nin: ketQuaResult },
  })
  return results
}

// Câu 25: Cho biết những khoa nào có nhiều sinh viên nhất
const getCau25 = async () => {
  const results = await SinhVien.aggregate([
    {
      $lookup: {
        from: Lop.collection.name,
        localField: 'maLop',
        foreignField: '_id',
        as: 'lop',
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] },
      },
    },
    {
      $lookup: {
        from: Khoa.collection.name,
        localField: 'maKhoa',
        foreignField: '_id',
        as: 'khoa',
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] },
      },
    },
    {
      $group: {
        _id: '$maLop',
        tenKhoa: { $first: '$tenKhoa' },
        SoLuongSV: { $sum: 1 },
      },
    },
    {
      $sort: { SoLuongSV: -1 },
    },
    {
      $limit: 1,
    },
  ])
  return results
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
  getCau19,
  getCau20,
  getCau21,
  getCau22,
  getCau23,
  getCau24,
  getCau25,
}

import GiangVien from '../models/GiangVien'
import DeTai from '../models/DeTai'
import HuongDan from '../models/HuongDan'
import SinhVien from '../models/SinhVien'
import Khoa from '../models/Khoa'

class BaiTapService {
  // cau 1:  - Đưa ra thông tin gồm mã số, họ tên và tên khoa của tất cả các giảng viên
  async getCau1() {
    console.log(
      await GiangVien.findByIdAndUpdate('617abb7f90bbcb0df9d77682', {
        hoTenGV: 'minh',
      })
    )
    return GiangVien.find({})
      .populate({
        path: 'maKhoa',
        select: 'tenKhoa -_id',
      })
      .select('-luong')
  }

  // cau 2:  - Đưa ra thông tin gồm mã số, họ tên và tên khoa của các giảng viên của khoa ‘DIA LY va QLTN’
  async getCau2() {
    const idKhoaDLQLTN = await Khoa.findOne({
      tenKhoa: 'DIA LY va QLTN',
    })
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
  async getCau3() {
    const idKhoaCNSH = await Khoa.findOne({
      tenKhoa: 'CONG NGHE SINH HOC',
    })
    return SinhVien.countDocuments({
      maKhoa: idKhoaCNSH,
    })
  }

  // cau 4:  - Đưa ra danh sách gồm mã số, họ tên và tuổi của các sinh viên khoa ‘TOAN’
  async getCau4() {
    const idKhoaCNSH = await Khoa.findOne({
      tenKhoa: 'TOAN',
    })
    return SinhVien.find({
      maKhoa: idKhoaCNSH,
    }).select('id hoTenSV namSinh')
  }

  // cau 5:  - Cho biết số giảng viên của khoa ‘CONG NGHE SINH HOC’
  async getCau5() {
    const idKhoaCNSH = await Khoa.findOne({
      tenKhoa: 'CONG NGHE SINH HOC',
    })
    return GiangVien.countDocuments({
      maKhoa: idKhoaCNSH,
    })
  }

  // cau 6:  - Cho biết thông tin về sinh viên không tham gia thực tập ( tìm những sinh viên không có trong model: HuongDan)
  async getCau6() {
    const maSVs = await HuongDan.find().select('-_id maSV')

    // Get unique key and change maSV => id
    const uniqueMaSVs = maSVs.reduce((prev, curr) => {
      return prev.some(o => o._id === curr.maSV)
        ? prev
        : [
            ...prev,
            {
              i_d: curr.maSV,
            },
          ]
    }, [])

    const options = {
      _id: {
        $nin: uniqueMaSVs,
      },
    }
    return SinhVien.find(options)
  }

  // cau 7:  - Đưa ra mã khoa, tên khoa và số giảng viên của mỗi khoa
  async getCau7() {
    // Reference model: "giangviens"
    const lookupOptions = {
      from: 'giangviens',
      localField: '_id',
      foreignField: 'maKhoa',
      as: 'giangViens',
    }
    // Select fields
    const projectOptions = {
      _id: '$_id',
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
  async getCau8() {
    return SinhVien.find({
      hoTenSV: 'Le van son',
    }).populate('maKhoa')
  }

  // cau 9:  - Cho biết mã số và tên của các đề tài do giảng viên ‘Tran son’ hướng dẫn
  async getCau9() {
    // GiangVien => HuongDan => DeTai
    const giangVien = await GiangVien.findOne({
      hoTenGV: 'Tran Son',
    }).select('_id') // Find one

    const result = await HuongDan.find({
      maGV: giangVien._id,
    }).populate({
      path: 'maDT',
      select: '_id tenDT',
    })

    return result
  }

  // cau 10:  - Cho biết tên đề tài không có sinh viên nào thực tập
  async getCau10() {
    // HuongDan => DeTai
    const maDTs = await HuongDan.find().select('-_id maDT')

    // Get unique key and change maDT => id
    const uniqueMaDTs = maDTs.reduce((prev, curr) => {
      return prev.some(o => o._id === curr.maDT)
        ? prev
        : [
            ...prev,
            {
              i_d: curr.maDT,
            },
          ]
    }, [])

    const options = {
      _id: {
        $nin: uniqueMaDTs,
      },
    }
    return DeTai.find(options)
  }

  // cau 11:  - Cho biết mã số, họ tên, tên khoa của các giảng viên hướng dẫn từ 3 sinh viên trở lên.
  // => Tìm:
  //      +maGV và +maSV có 3 lần trong bang HuongDan

  async getCau11() {
    // Select fields
    const projectOptions = {
      _id: '$_id',
      count: '$count',
    }

    const options = await HuongDan.aggregate([
      {
        $group: {
          _id: '$maGV',
          count: {
            $count: {},
          },
        },
      },
      {
        $project: projectOptions,
      },
    ])

    console.log(options)
    // return result
  }

  // cau 12:  - Cho biết mã số, tên đề tài của đề tài có kinh phí cao nhất
  async getCau12() {
    return DeTai.find({}).sort('-kinhPhi').limit(1).select('_id tenDT')
  }

  // cau 13:  - Cho biết mã số và tên các đề tài có nhiều hơn 2 sinh viên tham gia thực tập
  async getCau13() {
    // let result = await BaiTapService.getCau13()
    return 'Pending...'
  }

  // cau 14:  - Đưa ra mã số, họ tên và điểm của các sinh viên khoa ‘DIALY và QLTN’
  async getCau14() {
    const idKhoa = await Khoa.findOne({
      tenKhoa: 'DIALY và QLTN',
    })

    return HuongDan.find({
      maKhoa: idKhoa,
    })
      .populate({
        path: 'maSV',
        select: '_id hoTenSV',
      })
      .select('ketQua -_id')
  }

  // cau 15:  - Đưa ra tên khoa, số lượng sinh viên của mỗi khoa
  async getCau15() {
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
  async getCau16() {
    const result = HuongDan.find()
      .populate({
        path: 'maDT',
        match: {
          noiThucTap: 'que nha',
        },
        select: '-_id noiThucTap',
      })
      .populate('maSV')
      .select('-_id maSV')
    return result
  }

  // cau 17:  - Hãy cho biết thông tin về những sinh viên chưa có điểm thực tập
  async getCau17() {
    return HuongDan.find({
      ketQua: {
        $exists: false,
      },
    })
      .populate('maSV')
      .select('-_id maSV')
  }

  // cau 18:  - Đưa ra danh sách gồm mã số, họ tên các sinh viên có điểm thực tập bằng 0
  async getCau18() {
    return HuongDan.find({
      ketQua: 0,
    })
      .populate('maSV')
      .select('-_id maSV')
  }

  async queryGiangViens(filter, options = '') {
    const result = await GiangVien.paginate(filter, options)
    return result
  }

  async queryKhoas(filter, options = '') {
    const result = await Khoa.paginate(filter, options)
    return result
  }

  async create(body) {
    const result = await GiangVien.create(body)
    return result
  }
}

export default new BaiTapService()

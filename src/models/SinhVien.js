import mongoose, { Schema } from 'mongoose'
import paginate from './plugins/paginate'

const sinhVienSchema = new Schema(
  {
    hoTenSV: {
      type: String,
      trim: true,
      required: true,
    },
    maKhoa: {
      type: Schema.Types.ObjectId,
      ref: 'Khoa',
      required: true,
    },
    namSinh: Number,
    queQuan: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtual: true,
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      },
    },
  }
)
sinhVienSchema.virtual('age').get(function () {
  return new Date().getFullYear() - this.namSinh
})
// add plugin that converts mongoose to json
// sinhVienSchema.plugin(toJSON)
sinhVienSchema.plugin(paginate)

/**
 * @typedef SinhVien
 */
const SinhVien = mongoose.model('SinhVien', sinhVienSchema)

export default SinhVien

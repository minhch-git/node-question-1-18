import mongoose, { Schema } from 'mongoose'
import paginate from './plugins/paginate'

const sinhVien2Schema = new Schema(
  {
    hoTen: {
      type: String,
      trim: true,
      required: true,
    },
    gioiTinh: {
      type: Boolean,
      trim: true,
      default: true,
    },
    hocBong: {
      type: Number,
    },
    ngaySinh: Date,
    maLop: {
      type: Schema.Types.ObjectId,
      ref: 'Lop2',
      required: true,
    },
    tinh: {
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

// add plugin that converts mongoose to json
// sinhVien2Schema.plugin(toJSON)
sinhVien2Schema.plugin(paginate)

/**
 * @typedef SinhVien2
 */
const SinhVien2 = mongoose.model('SinhVien2', sinhVien2Schema)

export default SinhVien2

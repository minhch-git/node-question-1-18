import mongoose, { Schema } from 'mongoose'
import paginate from './plugins/paginate'

const ketQua2Schema = new Schema(
  {
    maSV: {
      type: Schema.Types.ObjectId,
      ref: 'SinhVien2',
      required: true,
    },
    maMH: {
      type: Schema.Types.ObjectId,
      ref: 'MonHoc2',
      required: true,
    },
    diemThi: Number,
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        delete ret.createdAt
        delete ret.updatedAt
      },
    },
  }
)

// add plugin that converts mongoose to json
// ketQua2Schema.plugin(toJSON)
ketQua2Schema.plugin(paginate)

/**
 * @typedef KetQua2
 */
const KetQua2 = mongoose.model('KetQua2', ketQua2Schema)

export default KetQua2

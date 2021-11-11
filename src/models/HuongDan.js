import mongoose, { Schema } from 'mongoose'
import paginate from './plugins/paginate'

const huongDanSchema = new Schema(
  {
    ketQua: {
      type: Number,
    },
    maGV: {
      type: Schema.Types.ObjectId,
      ref: 'GiangVien',
      required: true,
    },
    maSV: {
      type: Schema.Types.ObjectId,
      ref: 'SinhVien',
      required: true,
    },
    maDT: {
      type: Schema.Types.ObjectId,
      ref: 'DeTai',
      required: true,
    },
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
huongDanSchema.plugin(paginate)

/**
 * @typedef HuongDan
 */
const HuongDan = mongoose.model('HuongDan', huongDanSchema)

export default HuongDan

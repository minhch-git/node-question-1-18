import mongoose, { Schema } from 'mongoose'
import paginate from './plugins/paginate'

const monHoc2Schema = new Schema(
  {
    tenMH: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    soTiet: {
      type: Number,
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
// monHoc2Schema.plugin(toJSON)
monHoc2Schema.plugin(paginate)

/**
 * @typedef MonHoc2
 */
const MonHoc2 = mongoose.model('MonHoc2', monHoc2Schema)

export default MonHoc2

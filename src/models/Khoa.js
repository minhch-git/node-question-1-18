import mongoose, { Schema } from 'mongoose'
import paginate from './plugins/paginate'

const khoaSchema = new Schema(
  {
    tenKhoa: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    dienThoai: {
      type: String,
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
// khoaSchema.plugin(toJSON)
khoaSchema.plugin(paginate)

/**
 * @typedef Khoa
 */
const Khoa = mongoose.model('Khoa', khoaSchema)

export default Khoa

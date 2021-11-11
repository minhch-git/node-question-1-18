import mongoose, { Schema } from 'mongoose'
import paginate from './plugins/paginate'

const khoa2Schema = new Schema(
  {
    tenKhoa: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    soCBGD: Number,
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
// khoa2Schema.plugin(toJSON)
khoa2Schema.plugin(paginate)

/**
 * @typedef Khoa2
 */
const Khoa2 = mongoose.model('Khoa2', khoa2Schema)

export default Khoa2

import mongoose, { Schema } from 'mongoose'
import paginate from './plugins/paginate'

const lop2Schema = new Schema(
  {
    tenLop: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    maKhoa: {
      type: Schema.Types.ObjectId,
      ref: 'Khoa2',
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
// lop2Schema.plugin(toJSON)
lop2Schema.plugin(paginate)

/**
 * @typedef Lop2
 */
const Lop2 = mongoose.model('Lop2', lop2Schema)

export default Lop2

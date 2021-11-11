import mongoose, { Schema } from 'mongoose'
import paginate from './plugins/paginate'

const giangVienSchema = new Schema(
  {
    hoTenGV: {
      type: String,
      trim: true,
      required: true,
    },
    luong: {
      type: Number,
      required: true,
    },
    maKhoa: {
      type: Schema.Types.ObjectId,
      ref: 'Khoa',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
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
// giangVienSchema.plugin(toJSON)
giangVienSchema.plugin(paginate)

/**
 * @typedef GiangVien
 */
const GiangVien = mongoose.model('GiangVien', giangVienSchema)

export default GiangVien

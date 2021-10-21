import mongoose, { Schema } from 'mongoose'
import { toJSON, paginate } from './plugins'

const peopleSchema = new Schema(
  {
    tenLoaiDichVu: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
peopleSchema.plugin(toJSON)
peopleSchema.plugin(paginate)

/**
 * @typedef LoaiDichVu
 */
const LoaiDichVu = mongoose.model('LoaiDichVu', peopleSchema)

export default LoaiDichVu

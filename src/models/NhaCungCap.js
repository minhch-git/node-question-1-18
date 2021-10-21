import mongoose, { Schema } from 'mongoose'
import { toJSON, paginate } from './plugins'

const nhaCungCapSchema = new Schema(
  {
    tenNhaCungCap: {
      type: String,
      required: true,
      trim: true,
    },
    diaChi: {
      type: String,
      required: true,
      trim: true,
    },
    soDienThoai: {
      type: String,
      trim: true,
    },
    maSoThue: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
nhaCungCapSchema.plugin(toJSON)
nhaCungCapSchema.plugin(paginate)

/**
 * @typedef People
 */
const NhaCungCap = mongoose.model('NhaCungCap', nhaCungCapSchema)

export default NhaCungCap

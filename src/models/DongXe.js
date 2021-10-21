import mongoose, { Schema } from 'mongoose'
import { toJSON, paginate } from './plugins'

const dongXeSchema = new Schema(
  {
    hangXe: {
      type: String,
      required: true,
      trim: true,
    },
    soChoNgoi: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
dongXeSchema.plugin(toJSON)
dongXeSchema.plugin(paginate)

/**
 * @typedef DongXe
 */
const DongXe = mongoose.model('DongXe', dongXeSchema)

export default DongXe

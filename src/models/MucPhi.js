import mongoose, { Schema } from 'mongoose'
import { toJSON, paginate } from './plugins'

const mucPhiSchema = new Schema(
  {
    moTa: {
      type: String,
      required: true,
      trim: true,
    },
    donGia: {
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
mucPhiSchema.plugin(toJSON)
mucPhiSchema.plugin(paginate)

/**
 * @typedef MucPhi
 */
const MucPhi = mongoose.model('MucPhi', mucPhiSchema)

export default MucPhi

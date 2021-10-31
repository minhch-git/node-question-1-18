import mongoose, { Schema } from 'mongoose'

import paginate from './plugins/paginate'

const deTaiSchema = new Schema(
  {
    tenDT: {
      type: String,
      trim: true,
      required: true,
    },
    kinhPhi: {
      type: Number,
      required: true,
    },
    noiThucTap: {
      type: String,
      trim: true,
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
// deTaiSchema.plugin(toJSON)
deTaiSchema.plugin(paginate)

/**
 * @typedef DeTai
 */
const DeTai = mongoose.model('DeTai', deTaiSchema)

export default DeTai

import mongoose, { Schema } from 'mongoose'
import { toJSON, paginate } from './plugins'

const dangKyCungCapSchema = new Schema(
  {
    maNhaCungCap: {
      type: Schema.Types.ObjectId,
      ref: 'NhaCungCap',
      required: true,
    },
    maLoaiDichVu: {
      type: Schema.Types.ObjectId,
      ref: 'LoaiDichVu',
      required: true,
    },
    dongXe: {
      type: Schema.Types.ObjectId,
      ref: 'DongXe',
      required: true,
    },
    maMucPhi: {
      type: Schema.Types.ObjectId,
      ref: 'MucPhi',
      required: true,
    },
    ngayBatDauCungCap: {
      type: Date,
      default: Date.now(),
    },
    ngayKetThucCungCap: {
      type: Date,
    },
    soLuongXeMayDangKy: {
      type: Number,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
dangKyCungCapSchema.plugin(toJSON)
dangKyCungCapSchema.plugin(paginate)

/**
 * @typedef DangKyCungCap
 */
const DangKyCungCap = mongoose.model('DangKyCungCap', dangKyCungCapSchema)

export default DangKyCungCap

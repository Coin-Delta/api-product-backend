const mongoose = require('mongoose')

const apiVendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    code: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    baseUrl: {
      type: String,
      required: true
    },
    apiKey: {
      type: String,
      required: true
    },
    supportedApis: [
      {
        type: String
      }
    ],
    isActive: {
      type: Boolean,
      default: true
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

// Add index for performance
apiVendorSchema.index({ name: 1, code: 1 })

module.exports = mongoose.model('APIVendor', apiVendorSchema)

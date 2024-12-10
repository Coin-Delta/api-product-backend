const mongoose = require('mongoose')

const apiVendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    baseUrl: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
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

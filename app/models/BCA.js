const mongoose = require('mongoose')

const BCASchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true
    }
  },
  {
    timestamps: true,
    // Disable version key since it's a minimal schema
    versionKey: false,
    // Prevent adding additional fields
    strict: true,
    // Optimize for read operations
    read: 'primary'
  }
)

module.exports = mongoose.model('BCA', BCASchema)

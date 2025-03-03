const mongoose = require('mongoose')

const InternalUserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    refreshToken: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true,
    collection: 'internalusers', // Match the collection name from the other application
    readOnly: true
  }
)

// Remove all write operations
;['save', 'remove', 'updateOne', 'deleteOne', 'findOneAndUpdate'].forEach(
  (operation) => {
    InternalUserSchema.pre(operation, function (next) {
      const err = new Error('This is a read-only model')
      next(err)
    })
  }
)

const InternalUser = mongoose.model('InternalUser', InternalUserSchema)

// Add safeguards to prevent write operations at the model level
;['save', 'remove', 'updateOne', 'deleteOne', 'findOneAndUpdate'].forEach(
  (method) => {
    InternalUser[method] = async function () {
      throw new Error(
        'This is a read-only model. Write operations are not permitted.'
      )
    }
  }
)

module.exports = InternalUser

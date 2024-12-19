const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-aggregate-paginate-v2')

const claimsSchema = new mongoose.Schema({
  users: {
    type: [
      {
        type: String,
        enum: ['READ', 'WRITE', 'DELETE']
      }
    ],
    default: []
  },
  cases: {
    type: [
      {
        type: String,
        enum: ['READ', 'WRITE', 'DELETE']
      }
    ],
    default: []
  },
  candidates: {
    type: [
      {
        type: String,
        enum: ['READ', 'WRITE']
      }
    ],
    default: []
  },
  checkData: {
    type: [
      {
        type: String,
        enum: ['READ', 'WRITE']
      }
    ],
    default: []
  },
  checks: {
    type: [
      {
        type: String,
        enum: ['READ']
      }
    ],
    default: []
  },
  caseActivity: {
    type: [
      {
        type: String,
        enum: ['READ', 'WRITE']
      }
    ],
    default: []
  },
  tasks: {
    type: [
      {
        type: String,
        enum: ['READ', 'WRITE']
      }
    ],
    default: []
  },
  companies: {
    type: [
      {
        type: String,
        enum: ['READ', 'WRITE']
      }
    ],
    default: []
  },
  verifyCaseData: {
    type: [
      {
        type: String,
        enum: ['WRITE']
      }
    ],
    default: []
  }
})

const rolesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
      required: true
    },
    entityType: {
      type: String,
      index: true,
      enum: ['BCA', 'Company']
    },
    permissions: {
      canVerifyCheckData: {
        type: Boolean,
        default: false
      },
      canManageClients: {
        type: Boolean,
        default: false
      },
      canManageParticularChecks: {
        type: Boolean,
        default: false
      },
      canAccessEntryCases: {
        type: Boolean,
        default: false
      },
      canAccessAPIProduct: {
        type: Boolean,
        default: false
      }
    },
    isSuperAdmin: {
      type: Boolean,
      default: false
    },
    claims: {
      type: claimsSchema,
      required: false
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
rolesSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Role', rolesSchema)

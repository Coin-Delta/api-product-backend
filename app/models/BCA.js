const mongoose = require('mongoose')
const validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2')

const documentSchema = new mongoose.Schema({
  documentHash: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})

const BCASchema = new mongoose.Schema(
  {
    Id: {
      type: mongoose.Schema.Types.ObjectId,
      index: true
    },
    BCAId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BCA',
      index: false
    },
    CCId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BCA',
      index: false
    },
    name: {
      type: String
      // required: true,
    },
    assignedChecks: {
      type: Array,
      default: null
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      default: null
    },
    userName: {
      type: String,
      default: null
    },
    password: {
      type: String,
      default: null
    },
    phoneNumber: {
      type: Number
    },
    line2: {
      type: String,
      default: null
    },
    line1: {
      type: String,
      default: null
    },
    zipcode: {
      type: Number,
      default: null
    },
    companyRegistrationNumber: {
      type: Number
    },
    websiteLink: {
      type: String
    },
    noOfEmployees: {
      type: Number
    },
    userWallet: {
      type: String,
      index: true
    },
    supportingDocuments: {
      type: [documentSchema]
    },
    logoURL: {
      type: String
    },
    status: {
      type: String,
      default: 'false'
    },
    role: {
      type: String,
      index: true,
      enum: [
        'BCA',
        'BCAStaff',
        'CCTAdmin',
        'Vendor',
        'Coordinator',
        'DataEntry',
        'Auditor',
        'FieldCoordinator'
      ],
      default: 'BCA'
    },

    vendorName: {
      type: String,
      default: null
    },
    clientId: {
      type: Array,
      default: null
    },
    clientName: {
      type: Array,
      default: null
    },
    managerName: {
      type: String,
      default: null
    },
    address: {
      type: String,
      default: null
    },
    city: {
      type: String,
      default: null
    },
    state: {
      type: String,
      default: null
    },

    gst: {
      type: String,
      default: null
    },
    country: {
      type: String,
      default: null
    },

    additionalRemark: {
      type: String
    },
    hasStaffAccess: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: null
    },
    verificationCode: {
      type: Number,
      // index: true,
      default: null
    },
    verificationCodeTimestamp: {
      type: Date,
      index: true,
      default: null
    },
    otpBlockEndTime: { type: Date, default: null }
  },

  {
    versionKey: false,
    timestamps: true
  }
)

BCASchema.plugin(mongoosePaginate)
module.exports = mongoose.model('BCA', BCASchema)

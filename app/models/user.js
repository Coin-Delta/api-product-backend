const mongoose = require('mongoose')
// const validator = require('validator')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')

const AadharDetailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null
    },
    dob: {
      type: Date,
      default: null
    },
    guardianName: {
      type: String,
      default: null
    },
    documentNumber: {
      type: Number,
      default: null
    },
    address: {
      type: String,
      default: null
    },
    issueDate: {
      type: Date,
      default: null
    },
    type: {
      type: String,
      index: true,
      enum: ['comprehensive', 'direct']
    }
  },
  {
    timestamps: true
  }
)

const PanCardDetailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null
    },
    dob: {
      type: Date,
      default: null
    },
    fatherName: {
      type: String,
      default: null
    },
    documentNumber: {
      type: Number,
      default: null
    },
    type: {
      type: String,
      index: true,
      enum: ['individual', 'company']
    }
  },
  {
    timestamps: true
  }
)

const drivingLicenseDetailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null
    },
    licenseNo: {
      type: String,
      default: null
    },
    atd: {
      type: String,
      index: true,
      enum: ['MCWG', 'MCWOG']
    },
    dob: {
      type: Date,
      default: null
    },
    guardianName: {
      type: String,
      default: null
    },
    firstIssueDate: {
      type: String,
      default: null
    },
    emergencyContactNumber: {
      type: Number,
      default: null
    },
    bloodGroup: {
      type: String,
      index: true,
      enum: ['O+', 'O-', 'B+', 'AB-']
    },
    expiryDate: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
)

const passportDetailSchema = new mongoose.Schema(
  {
    givenName: {
      type: String,
      default: null
    },
    surName: {
      type: String,
      default: null
    },
    type: {
      type: String,
      index: true,
      enum: ['P', 'D']
    },
    countryCode: {
      type: String,
      index: true,
      enum: ['91', '81', '340', '880', '61', '86', '55']
    },
    nationality: {
      type: String,
      index: true,
      enum: ['INDIAN', 'AMERICAN', 'AUSTRALIAN', 'BRITISH', 'GERMAN', 'RUSSIAN']
    },
    sex: {
      type: String,
      index: true,
      enum: ['male', 'female', 'Others']
    },
    dob: {
      type: Date,
      default: null
    },
    placeOfBirth: {
      type: String,
      default: null
    },
    placeOfIssue: {
      type: String,
      default: null
    },
    passportNumber: {
      type: String,
      default: null
    },
    dateOfIssue: {
      type: Date,
      default: null
    },
    dateOfExpiry: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
)

const IdentitiesSchema = new mongoose.Schema({
  aadhar: {
    type: [AadharDetailSchema],
    default: []
  },
  pan: {
    type: [PanCardDetailSchema],
    default: []
  },
  drivingLicense: {
    type: [drivingLicenseDetailSchema],
    default: []
  },
  passport: {
    type: [passportDetailSchema],
    default: []
  }
})

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: null
    },
    lastName: {
      type: String,
      default: null
    },
    fatherName: {
      type: String,
      default: null
    },
    motherName: {
      type: String,
      default: null
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
      type: Number,
      default: null
    },
    dob: {
      type: Date,
      default: null
    },
    gender: {
      type: String,
      enum: ['male', 'female']
    },
    addressLine1: {
      type: String,
      default: null
    },
    addressLine2: {
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
    zipCode: {
      type: Number,
      default: null
    },
    country: {
      type: String,
      default: null
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      default: null
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      default: null
    },
    entityType: {
      type: String,
      index: true,
      enum: ['BCA', 'Company', 'External_Vendor']
    },
    clients: {
      type: Array,
      default: []
    },
    checks: {
      type: Array,
      default: []
    },
    identities: {
      type: IdentitiesSchema,
      default: {}
    },
    refreshToken: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
UserSchema.plugin(aggregatePaginate)
module.exports = mongoose.model('User', UserSchema)

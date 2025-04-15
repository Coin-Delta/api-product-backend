const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-aggregate-paginate-v2')

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

const apiCatalogSchema = new mongoose.Schema({
  enabled: {
    type: Boolean,
    default: false
  },
  all: {
    type: Boolean,
    default: false
  },
  allowedApis: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  }
})

const ConfigurationSchema = new mongoose.Schema({
  appUrl: {
    type: String,
    required: true
  },
  clientAlias: {
    type: String,
    default: 'Company'
  },
  enablePublicUserLink: {
    type: Boolean,
    default: true
  },
  enableUserSignUp: {
    type: Boolean,
    default: true
  },
  enableVendorManagement: {
    type: Boolean,
    default: true
  },
  enableWebForms: {
    type: Boolean,
    default: true
  },
  reportPrefix: {
    type: String,
    default: 'CCT'
  },
  priorityTableColumns: {
    type: Array,
    default: [
      'ID',
      'Name',
      'Email',
      'Company',
      'Requested On',
      'Deadline Date',
      'Status'
    ]
  },
  caseTableColumns: {
    type: Array,
    default: [
      'ID',
      'Ref-No.',
      'EMP-ID',
      'Name',
      'Email',
      'Company Name',
      'Requested On',
      'Status',
      'Priority Setting',
      'Report Date',
      'Deadline Date',
      'View Report',
      'Comment'
    ]
  },
  companyTableColumns: {
    type: Array,
    default: ['Name', 'Email', 'Address', 'Phone Number']
  },
  logoUrl: {
    type: String,
    default: ''
  },
  faviconUrl: {
    type: String,
    default: null
  },
  tagLine: {
    type: String,
    default: ''
  },
  enableMFA: {
    type: Boolean,
    default: false
  },
  sendCredentialsEmail: {
    type: Boolean,
    default: false
  },
  enableConsentForm: {
    type: Boolean,
    default: false
  },
  enableMobileApp: {
    type: Boolean,
    default: true
  },
  enableInterimReport: {
    type: Boolean,
    default: false
  },
  enableApiCatalog: {
    type: Boolean,
    default: true
  },
  s3Folder: {
    type: String,
    default: null
  },
  tatRule: {
    holidays: {
      type: [Date],
      default: []
    },
    workingDays: {
      type: [Number],
      default: [1, 2, 3, 4, 5, 6]
    }
  },
  caseTabsForCompany: {
    type: [String],
    default: ['generalInfo', 'checks', 'caseStatus', 'caseActivities']
  },
  caseStatusFieldsForCompany: {
    type: [String],
    default: [
      'caseCreated',
      'detailsFilled',
      'caseAssigned',
      'insufficiencyRaised',
      'qualityCheckStatus',
      'finalCaseStatus'
    ]
  },
  emailUrl: {
    type: String,
    default: null
  },
  enableReworkFeature: {
    type: Boolean,
    default: false
  },
  caseStatusList: {
    type: [String],
    default: [
      'Pending',
      'MovedToEntry',
      'Details-Filled',
      'Rework-WIP',
      'QC-Open',
      'QCApproved',
      'QCRejected',
      'Approved',
      'Rejected',
      'InProgress',
      'Major Discrepancy',
      'Minor Discrepancy',
      'Verified Clear',
      'Insufficiency',
      'Unable to Verify',
      'Stop Check',
      'Positive',
      'Negative',
      'Recommended',
      'Not Recommended',
      'Failed',
      'Could Not Verified'
    ]
  },
  consentFormDisclaimer: {
    type: String,
    default: ''
  },
  changeCaseRequestedDate: {
    type: Boolean,
    default: false
  },
  publicLinkExpiresIn: {
    type: Number,
    default: 24
  },
  allowClientsToUpdateCandidates: {
    type: Boolean,
    default: false
  },
  apiCatalog: apiCatalogSchema
})

const BCASchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: Number,
      required: true
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
    zipCode: {
      type: Number,
      default: null
    },
    state: {
      type: String,
      default: null
    },
    country: {
      type: String,
      default: null
    },
    status: {
      type: Boolean,
      default: true
    },
    companyRegistrationNumber: {
      type: Number,
      default: null
    },
    supportingDocuments: {
      type: [documentSchema],
      default: null
    },
    websiteLink: {
      type: String,
      default: ''
    },
    employeeCount: {
      type: Number,
      default: null
    },
    configurations: {
      type: ConfigurationSchema,
      default: () =>
        new mongoose.model('Config', ConfigurationSchema)().toObject()
    }
  },

  {
    versionKey: false,
    timestamps: true
  }
)

BCASchema.plugin(mongoosePaginate)
module.exports = mongoose.model('BCA', BCASchema)

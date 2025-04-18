// controllers/api.controller.js
const API = require('../../models/api')
const BCA = require('../../models/BCA')
const ResponseHelper = require('../../utils/responseHelper')

class APIController {
  static async create(req, res) {
    try {
      const apiData = req.body
      const api = new API(apiData)
      await api.save()
      return ResponseHelper.success(res, api, 'API created successfully', 201)
    } catch (error) {
      return ResponseHelper.serverError(res, error)
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params
      const updateData = req.body
      const api = await API.findByIdAndUpdate(id, updateData, { new: true })

      if (!api) {
        return ResponseHelper.notFound(res, 'API not found')
      }

      return ResponseHelper.success(res, api, 'API updated successfully')
    } catch (error) {
      return ResponseHelper.serverError(res, error)
    }
  }

  static async getAllActiveApis(req, res) {
    try {
      const user = await BCA.findById(req.user.bcaId)
      const isUserAllowedToAccess = user?.configurations?.apiCatalog?.enabled
      const isUserHavingAccessToAllApis = user?.configurations?.apiCatalog?.all
      const allowedApis = user?.configurations?.apiCatalog?.allowedApis || []

      console.log('Allowed API IDs:', user?.configurations?.apiCatalog)

      let apis = []

      if (isUserAllowedToAccess) {
        if (isUserHavingAccessToAllApis) {
          // Get all APIs if user has access to all
          // apis = await API.find({ isActive: true }).populate('vendor')
          apis = await API.find().populate('vendor')
        } else {
          // Check if the allowedApis array is valid and not empty
          if (!Array.isArray(allowedApis) || allowedApis.length === 0) {
            return ResponseHelper.success(
              res,
              [],
              'No allowed APIs configured for this user'
            )
          }

          // Get only the allowed APIs for this user
          apis = await API.find({
            _id: { $in: allowedApis }
          }).populate('vendor')
        }
      } else {
        // If user doesn't have access, return empty array
        apis = []
      }

      return ResponseHelper.success(res, apis, 'APIs retrieved successfully')
    } catch (error) {
      return ResponseHelper.serverError(res, error)
    }
  }

  static async getAllApis(req, res) {
    try {
      const apis = await API.find().populate('vendor')
      return ResponseHelper.success(res, apis, 'APIs retrieved successfully')
    } catch (error) {
      return ResponseHelper.serverError(res, error)
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params
      const api = await API.findById(id).populate('vendor')

      if (!api) {
        return ResponseHelper.notFound(res, 'API not found')
      }

      return ResponseHelper.success(res, api, 'API retrieved successfully')
    } catch (error) {
      return ResponseHelper.serverError(res, error)
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params
      const api = await API.findByIdAndDelete(id)

      if (!api) {
        return ResponseHelper.notFound(res, 'API not found')
      }

      return ResponseHelper.success(res, null, 'API deleted successfully')
    } catch (error) {
      return ResponseHelper.serverError(res, error)
    }
  }
}

module.exports = APIController

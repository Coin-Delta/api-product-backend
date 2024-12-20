// controllers/api.controller.js
const API = require('../../models/api')
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

  static async getAll(req, res) {
    try {
      // const apis = await API.find().populate('vendor')
      // const apis = await API.find()
      const apis = await API.find().select('-vendorId')
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

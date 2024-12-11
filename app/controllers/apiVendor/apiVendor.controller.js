// controllers/apiVendor.controller.js
const APIVendor = require('../../models/apiVendor')
const ResponseHelper = require('../../utils/responseHelper')

class APIVendorController {
  static async create(req, res) {
    try {
      const vendorData = req.body
      const vendor = new APIVendor(vendorData)
      await vendor.save()
      return ResponseHelper.success(
        res,
        vendor,
        'Vendor created successfully',
        201
      )
    } catch (error) {
      return ResponseHelper.serverError(res, error)
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params
      const updateData = req.body
      const vendor = await APIVendor.findByIdAndUpdate(id, updateData, {
        new: true
      })

      if (!vendor) {
        return ResponseHelper.notFound(res, 'Vendor not found')
      }

      return ResponseHelper.success(res, vendor, 'Vendor updated successfully')
    } catch (error) {
      return ResponseHelper.serverError(res, error)
    }
  }

  static async getAll(req, res) {
    try {
      const vendors = await APIVendor.find()
      return ResponseHelper.success(
        res,
        vendors,
        'Vendors retrieved successfully'
      )
    } catch (error) {
      return ResponseHelper.serverError(res, error)
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params
      const vendor = await APIVendor.findById(id)

      if (!vendor) {
        return ResponseHelper.notFound(res, 'Vendor not found')
      }

      return ResponseHelper.success(
        res,
        vendor,
        'Vendor retrieved successfully'
      )
    } catch (error) {
      return ResponseHelper.serverError(res, error)
    }
  }
}

module.exports = APIVendorController

module.exports = APIVendorController

// controllers/apiVendor.controller.js
const APIVendor = require('../../models/apiVendor')
const ResponseUtil = require('../../utils/reponse')

class APIVendorController {
  static async create(req, res, next) {
    try {
      const vendorData = req.body
      const vendor = new APIVendor(vendorData)
      await vendor.save()
      return ResponseUtil.send(res, 201, { data: vendor })
    } catch (error) {
      return next(error)
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params
      const updateData = req.body
      const vendor = await APIVendor.findByIdAndUpdate(id, updateData, {
        new: true
      })
      if (!vendor) {
        return ResponseUtil.send(res, 404, { message: 'Vendor not found' })
      }
      return ResponseUtil.send(res, 200, { data: vendor })
    } catch (error) {
      return next(error)
    }
  }

  static async getAll(req, res, next) {
    try {
      const vendors = await APIVendor.find()
      return ResponseUtil.send(res, 200, { data: vendors })
    } catch (error) {
      return next(error)
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params
      const vendor = await APIVendor.findById(id)
      if (!vendor) {
        return ResponseUtil.send(res, 404, { message: 'Vendor not found' })
      }
      return ResponseUtil.send(res, 200, { data: vendor })
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = APIVendorController

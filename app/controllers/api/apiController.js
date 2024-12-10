// controllers/api.controller.js
const API = require('../../models/api')
const ResponseUtil = require('../../utils/reponse')

class APIController {
  static async create(req, res, next) {
    try {
      const apiData = req.body
      const api = new API(apiData)
      await api.save()
      return ResponseUtil.send(res, 201, { data: api })
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params
      const updateData = req.body
      const api = await API.findByIdAndUpdate(id, updateData, { new: true })
      if (!api) {
        return ResponseUtil.send(res, 404, { message: 'API not found' })
      }
      return ResponseUtil.send(res, 200, { data: api })
    } catch (error) {
      next(error)
    }
  }

  static async getAll(req, res, next) {
    try {
      const apis = await API.find().populate('vendor')
      return ResponseUtil.send(res, 200, { data: apis })
    } catch (error) {
      next(error)
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params
      const api = await API.findById(id).populate('vendor')
      if (!api) {
        return ResponseUtil.send(res, 404, { message: 'API not found' })
      }
      return ResponseUtil.send(res, 200, { data: api })
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params
      const api = await API.findByIdAndDelete(id)
      if (!api) {
        return ResponseUtil.send(res, 404, { message: 'API not found' })
      }
      return ResponseUtil.send(res, 200, {
        message: 'API deleted successfully'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = APIController

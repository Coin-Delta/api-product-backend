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
      console.log(user)
      const isUserAllowedToAccess = user?.configurations?.apiCatalog?.enabled
      const isUserHavingAccessToAllApis = user?.configurations?.apiCatalog?.all
      const allowedApis = user?.configurations?.apiCatalog?.allowedApis || []
      console.log(allowedApis.length)
      // Ensure limit is a number and between 1-100
      let limit = parseInt(req.query.limit) || 10
      limit = Math.min(Math.max(limit, 1), 100)

      // Ensure page is a positive number
      let page = parseInt(req.query.page) || 1
      page = Math.max(page, 1)

      // Return early if user does not have access
      if (!isUserAllowedToAccess) {
        return ResponseHelper.success(res, [], 'APIs are not allowed to access')
      }

      const options = {
        page,
        limit,
        populate: 'vendor',
        lean: true // For better performance
      }

      let result
      // If user has access to all APIs
      if (isUserHavingAccessToAllApis) {
        result = await API.paginate({}, options)
      } else {
        // If user has access to specific APIs only
        if (!allowedApis.length) {
          return ResponseHelper.success(
            res,
            [],
            'No APIs are configured for access'
          )
        }
        result = await API.paginate({ _id: { $in: allowedApis } }, options)
      }

      const paginatedResult = {
        docs: result.docs,
        totalDocs: result.totalDocs,
        page: result.page,
        limit: limit,
        totalPages: result.totalPages,
        nextPage: result.hasNextPage ? result.nextPage : null,
        prevPage: result.hasPrevPage ? result.prevPage : null,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage
      }

      return ResponseHelper.success(
        res,
        paginatedResult,
        'APIs retrieved successfully'
      )
    } catch (error) {
      return ResponseHelper.serverError(res, error)
    }
  }

  static async getAllApis(req, res) {
    try {
      // Ensure limit is a number and between 1-100
      let limit = parseInt(req.query.limit) || 10
      limit = Math.min(Math.max(limit, 1), 100)

      // Ensure page is a positive number
      let page = parseInt(req.query.page) || 1
      page = Math.max(page, 1)

      const options = {
        page: page,
        limit: limit,
        populate: 'vendor',
        lean: true // For better performance
      }

      // Log the actual values being used
      console.log('Using pagination values:', { page, limit })

      const result = await API.paginate({}, options)

      // Verify the result has expected pagination data
      console.log('Pagination result:', {
        totalDocs: result.totalDocs,
        limit: result.limit,
        page: result.page,
        totalPages: result.totalPages
      })

      const paginatedResult = {
        docs: result.docs,
        totalDocs: result.totalDocs,
        limit: limit,
        page: result.page,
        totalPages: result.totalPages,
        nextPage: result.hasNextPage ? result.nextPage : null,
        prevPage: result.hasPrevPage ? result.prevPage : null,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage
      }

      return ResponseHelper.success(
        res,
        paginatedResult,
        'APIs retrieved successfully'
      )
    } catch (error) {
      console.error('Error in getAllApis pagination:', error)
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

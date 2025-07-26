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

      // Check if 'all' query param is set to 'true'
      const fetchAll = req.query.all === 'true'

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

      // Build the query object
      let query = {}

      // Add category filter if provided in query params
      if (req.query.category) {
        query.category = req.query.category
      }

      // If user does not have access to all APIs, restrict to allowedApis
      if (!isUserHavingAccessToAllApis) {
        if (!allowedApis.length) {
          return ResponseHelper.success(
            res,
            [],
            'No APIs are configured for access'
          )
        }
        query._id = { $in: allowedApis }
      }

      if (fetchAll) {
        // Fetch all matching APIs without pagination
        const apis = await API.find(query).populate('vendor').lean()

        // Add id field to each API document
        const apisWithId = apis.map((api) => ({
          ...api,
          id: api._id
        }))

        const totalDocs = apisWithId.length
        const paginatedResult = {
          docs: apisWithId,
          totalDocs,
          page: 1,
          limit: totalDocs,
          totalPages: 1,
          nextPage: null,
          prevPage: null,
          hasNextPage: false,
          hasPrevPage: false
        }
        return ResponseHelper.success(
          res,
          paginatedResult,
          'All matching APIs retrieved successfully'
        )
      }

      const options = {
        page,
        limit,
        populate: 'vendor',
        lean: true // For better performance
      }

      const result = await API.paginate(query, options)

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

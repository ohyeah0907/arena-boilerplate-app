import getCurrentSession from '../../auth/getCurrentSession.js'
import ResponseHandler from '../helpers/responseHandler.js'
import Image from '../middlewares/image.js'

export default {
  createGraphQL: async (req, res) => {
    try {
      const { shop, accessToken } = getCurrentSession(req, res)
      const { idProduct } = req.params

      console.log('idProduct :>> ', idProduct)

      const stagedTargetes = await Image.createGraphQL({
        shop,
        accessToken,
        idProduct,
        data: req.body,
      })

      return ResponseHandler.success(res, stagedTargetes)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  uploadImageGraphQL: async (req, res) => {
    try {
      const { shop, accessToken } = getCurrentSession(req, res)

      console.log('req.body :>> ', req.body)

      const data = await Image.stagedUploadsCreate({
        shop,
        accessToken,
        data: req.body,
      })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  findById: async (req, res) => {
    try {
      const { shop, accessToken } = getCurrentSession(req, res)

      const { idProduct, id } = req.params

      const data = await Image.findById({ shop, accessToken, idProduct, id })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  create: async (req, res) => {
    try {
      const { shop, accessToken } = getCurrentSession(req, res)
      const { idProduct } = req.params
      console.log('data:>>', req.body)

      const data = await Image.create({ shop, accessToken, data: req.body, idProduct })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  delete: async (req, res) => {
    try {
      const { shop, accessToken } = getCurrentSession(req, res)

      const { idProduct, id } = req.params

      const data = await Image.delete({ shop, accessToken, idProduct, id })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}

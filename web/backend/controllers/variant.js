import getCurrentSession from '../../auth/getCurrentSession.js'
import ResponseHandler from '../helpers/responseHandler.js'
import Variant from '../middlewares/variant.js'

export default {
  findById: async (req, res) => {
    try {
      const { shop, accessToken } = getCurrentSession(req, res)

      const { id } = req.params

      const data = await Variant.findById({ shop, accessToken, id })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  create: async (req, res) => {
    try {
      const { shop, accessToken } = getCurrentSession(req, res)
      const { idProduct } = req.params

      const data = await Variant.create({ shop, accessToken, data: req.body, idProduct })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  update: async (req, res) => {
    try {
      const { shop, accessToken } = getCurrentSession(req, res)

      const { id } = req.params

      const data = await Product.update({
        shop,
        accessToken,
        id,
        data: req.body,
      })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  delete: async (req, res) => {
    try {
      const { shop, accessToken } = getCurrentSession(req, res)

      const { id } = req.params

      const data = await Product.delete({ shop, accessToken, id })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}

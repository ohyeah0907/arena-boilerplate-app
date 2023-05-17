import getCurrentSession from '../../auth/getCurrentSession.js'
import ResponseHandler from '../helpers/responseHandler.js'
import Image from '../middlewares/image.js'

export default {
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

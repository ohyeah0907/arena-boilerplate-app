import getCurrentSession from '../../auth/getCurrentSession.js'
import ResponseHandler from '../helpers/responseHandler.js'
import Image from '../middlewares/image_graphql.js'

export default {
  create: async (req, res) => {
    try {
      const { shop, accessToken } = getCurrentSession(req, res)
      const { idProduct } = req.params

      console.log('idProduct :>> ', idProduct)

      const stagedTargetes = await Image.create({
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
  delete: async (req, res) => {
    try {
      const { shop, accessToken } = getCurrentSession(req, res)
      const { idProduct, idImage } = req.params

      const data = await Image.delete({
        shop,
        accessToken,
        idProduct,
        idImage,
      })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
  uploadImage: async (req, res) => {
    try {
      const { shop, accessToken } = getCurrentSession(req, res)

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
}

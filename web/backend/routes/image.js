import Controller from './../controllers/image.js'
import MulterUpload from '../connector/multer/index.js'

export default function imageRoute(app) {
  app.get('/api/products/:idProduct/images/:id', Controller.findById)
  app.post('/api/products/:idProduct/images', Controller.createGraphQL)
  app.post('/api/images/upload', Controller.uploadImageGraphQL)
  app.delete('/api/products/:idProduct/images/:id', Controller.delete)
}

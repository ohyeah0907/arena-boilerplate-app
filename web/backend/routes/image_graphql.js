import Controller from '../controllers/image_graphql.js'

export default function imageRoute(app) {
  app.post('/api/products-graphql/:idProduct/images-graphql', Controller.create)
  app.delete('/api/products-graphql/:idProduct/images-graphql/:id', Controller.delete)
  app.post('/api/images-graphql/upload', Controller.uploadImage)
}

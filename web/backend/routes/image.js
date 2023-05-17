import Controller from './../controllers/image.js'

export default function imageRoute(app) {
  app.get('/api/products/:idProduct/images/:id', Controller.findById)
  app.post('/api/products/:idProduct/images', Controller.create)
  app.delete('/api/products/:idProduct/images/:id', Controller.delete)
}

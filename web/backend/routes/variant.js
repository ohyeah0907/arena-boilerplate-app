import Controller from './../controllers/variant.js'

export default function productRoute(app) {
  app.get('/api/variants/:id', Controller.findById)
  app.post('/api/products/:idProduct/variants', Controller.create)
  app.put('/api/variants/:id', Controller.update)
  app.delete('/api/products/:idProduct/variants/:id', Controller.delete)
}

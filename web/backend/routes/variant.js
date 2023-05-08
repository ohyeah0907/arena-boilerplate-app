import Controller from './../controllers/variant.js'

export default function productRoute(app) {
  app.get('/api/variants/:id', Controller.findById)
  app.post('/api/variants', Controller.create)
  app.put('/api/variants/:id', Controller.update)
  app.delete('/api/variants/:id', Controller.delete)
}

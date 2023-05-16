import Controller from './../controllers/product.js'

export default function productRoute(app) {
  app.get('/api/products/product-types', Controller.getProductTypes)
  app.get('/api/products/product-vendors', Controller.getProductVendors)
  app.get('/api/products', Controller.findGraphQL)
  app.get('/api/products/:id', Controller.findByIdGraphQL)
  app.put('/api/products/:id', Controller.updateGraphQL)
  app.get('/api/products/count', Controller.count)
  app.post('/api/products', Controller.createGraphQL)
  app.delete('/api/products/:id', Controller.deleteGraphQL)
}

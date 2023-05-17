import productRoute from './product.js'
import variantRoute from './variant.js'
import storeSettingRoute from './store_setting.js'
import submitionRoute from './submition.js'
import imageRoute from './image.js'
import imageRouteGraphQLRoute from './image_graphql.js'
import productGraphQLRoute from './product_graphql.js'

export default function adminRoute(app) {
  storeSettingRoute(app)
  productRoute(app)
  productGraphQLRoute(app)
  variantRoute(app)
  imageRoute(app)
  imageRouteGraphQLRoute(app)
  submitionRoute(app)
}

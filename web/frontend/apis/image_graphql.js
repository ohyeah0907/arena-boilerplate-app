import apiCaller from '../helpers/apiCaller'

const ImageGraphQLApi = {
  findById: async (idProduct, id) =>
    await apiCaller(`/api/products-graphql/${idProduct}/images-graphql/${id}`),
  create: async (idProduct, data) =>
    await apiCaller(`/api/products-graphql/${idProduct}/images-graphql`, 'POST', data),
  upload: async (data) => await apiCaller(`/api/images-graphql/upload`, 'POST', data),
  delete: async (idProduct, id) =>
    await apiCaller(`/api/products-graphql/${idProduct}/images-graphql/${id}`, 'DELETE'),
}

export default ImageGraphQLApi

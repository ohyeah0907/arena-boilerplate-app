import apiCaller from '../helpers/apiCaller'

const ImageGraphQLApi = {
  findById: async (idProduct, id) =>
    await apiCaller(`/api/products-graphql/${idProduct}/images-graphql/${id}`),
  create: async (idProduct, data) =>
    await apiCaller(`/api/products-graphql/${idProduct}/images-graphql`, 'POST', data),
  upload: async (data) => await apiCaller(`/api/images-graphql/upload`, 'POST', data),
  delete: async (idProduct, idImage) =>
    await apiCaller(`/api/products-graphql/${idProduct}/images-graphql/${idImage}`, 'DELETE'),
}

export default ImageGraphQLApi

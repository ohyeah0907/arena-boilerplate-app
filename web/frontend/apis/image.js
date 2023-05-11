import apiCaller from '../helpers/apiCaller'

const ImageApi = {
  findById: async (idProduct, id) => await apiCaller(`/api/products/${idProduct}/images/${id}`),
  create: async (idProduct, data) => {
    console.log('data', data)
    return await apiCaller(`/api/products/${idProduct}/images`, 'POST', data)
  },
  delete: async (idProduct, id) =>
    await apiCaller(`/api/products/${idProduct}/images/${id}`, 'DELETE'),
}

export default ImageApi

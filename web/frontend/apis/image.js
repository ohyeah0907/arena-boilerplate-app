import apiCaller from '../helpers/apiCaller'

const ImageApi = {
  findById: async (idProduct, id) => await apiCaller(`/api/products/${idProduct}/images/${id}`),
  create: async (idProduct, data) =>
    await apiCaller(`/api/products/${idProduct}/images`, 'POST', data),
  upload: async (data) => await apiCaller(`/api/images/upload`, 'POST', data),
  delete: async (idProduct, id) =>
    await apiCaller(`/api/products/${idProduct}/images/${id}`, 'DELETE'),
}

export default ImageApi

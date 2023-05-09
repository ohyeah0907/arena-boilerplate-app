import apiCaller from '../helpers/apiCaller'

const VariantApi = {
  findById: async (id) => await apiCaller(`/api/variants/${id}`),
  create: async (data, idProduct) =>
    await apiCaller(`/api/products/${idProduct}/variants`, 'POST', data),
  update: async (id, data) => await apiCaller(`/api/variants/${id}`, 'PUT', data),
  delete: async (idProduct, id) =>
    await apiCaller(`/api/products/${idProduct}/variants/${id}`, 'DELETE'),
}

export default VariantApi

import apiCaller from '../helpers/apiCaller.js'

const findById = async ({ shop, accessToken, id }) => {
  return await apiCaller({ shop, accessToken, endpoint: `variants/${id}.json` })
}

const create = async ({ shop, accessToken, data, idProduct }) => {
  return await apiCaller({
    shop,
    accessToken,
    endpoint: `products/${idProduct}/variants.json`,
    method: 'POST',
    data,
  })
}

const update = async ({ shop, accessToken, id, data }) => {
  return await apiCaller({
    shop,
    accessToken,
    endpoint: `variants/${id}.json`,
    method: 'PUT',
    data,
  })
}

const _delete = async ({ shop, accessToken, idProduct, id }) => {
  return await apiCaller({
    shop,
    accessToken,
    endpoint: `products/${idProduct}/variants/${id}.json`,
    method: 'DELETE',
  })
}

const Variant = {
  findById,
  create,
  update,
  delete: _delete,
}

export default Variant

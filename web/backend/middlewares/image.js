import apiCaller from '../helpers/apiCaller.js'

const findById = async ({ shop, accessToken, idProduct, id }) => {
  return await apiCaller({ shop, accessToken, endpoint: `products/${idProduct}/images/${id}.json` })
}

const create = async ({ shop, accessToken, data, idProduct }) => {
  return await apiCaller({
    shop,
    accessToken,
    endpoint: `products/${idProduct}/images.json`,
    method: 'POST',
    data,
  })
}

const _delete = async ({ shop, accessToken, idProduct, id }) => {
  return await apiCaller({
    shop,
    accessToken,
    endpoint: `products/${idProduct}/images/${id}.json`,
    method: 'DELETE',
  })
}

const Image = {
  findById,
  create,
  delete: _delete,
}

export default Image

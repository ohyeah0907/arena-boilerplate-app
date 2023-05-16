import apiCaller from '../helpers/apiCaller.js'
import graphqlCaller from '../helpers/graphqlCaller.js'

const stagedUploadsCreate = async ({ shop, accessToken, data }) => {
  const variables = {
    input: data.map((file) => ({
      fileSize: file.size + '',
      filename: file.name,
      httpMethod: 'POST',
      mimeType: file.type,
      resource: 'IMAGE',
    })),
  }

  const query = `mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
    stagedUploadsCreate(input: $input) {
      stagedTargets {
        url
        resourceUrl
        parameters {
          name
          value
        }
      }
      userErrors {
        field
        message
      }
    }
  }`
  const res = await graphqlCaller({
    shop,
    accessToken,
    query,
    variables,
  })
  return res
}

const createGraphQL = async ({ shop, accessToken, idProduct, data }) => {
  console.log('id :>> ', idProduct)
  const variables = {
    media: data.map((item) => ({
      alt: item.alt,
      mediaContentType: 'IMAGE',
      originalSource: item.resourceUrl,
    })),
    productId: `gid://shopify/Product/${idProduct}`,
  }
  const query = `mutation productCreateMedia($media: [CreateMediaInput!]!, $productId: ID!) {
    productCreateMedia(media: $media, productId: $productId) {
      mediaUserErrors {
        code
        field
        message
      }
    }
  }`
  let res = await graphqlCaller({
    shop,
    accessToken,
    query,
    variables,
  })
  return res
}
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
  createGraphQL,
  stagedUploadsCreate,
  findById,
  create,
  delete: _delete,
}

export default Image

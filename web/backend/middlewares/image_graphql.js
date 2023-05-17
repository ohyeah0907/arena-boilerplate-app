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

const create = async ({ shop, accessToken, idProduct, data }) => {
  console.log('data :>> ', data)
  const variables = {
    input: {
      id: `gid://shopify/Product/${idProduct}`,
      images: data.map((item) => ({
        altText: item.alt,
        src: item.resourceUrl,
      })),
    },
  }

  const query = `mutation productAppendImages($input: ProductAppendImagesInput!) {
    productAppendImages(input: $input) {
      userErrors {
        field
        message
      }
    }
  }
  `
  let res = await graphqlCaller({
    shop,
    accessToken,
    query,
    variables,
  })
  return res
}
const _delete = async ({ shop, accessToken, idImage, idProduct }) => {
  const variables = {
    id: `gid://shopify/Product/${idProduct}`,
    imageIds: [`gid://shopify/ProductImage/${idImage}`],
  }
  const query = `mutation productDeleteImages($id: ID!, $imageIds: [ID!]!) {
    productDeleteImages(id: $id, imageIds: $imageIds) {
      deletedImageIds
      userErrors {
        field
        message
      }
    }
  }
  `
  let res = await graphqlCaller({
    shop,
    accessToken,
    query,
    variables,
  })
  return res
}
const Image = {
  create,
  delete: _delete,
  stagedUploadsCreate,
}

export default Image

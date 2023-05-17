import graphqlCaller from '../helpers/graphqlCaller.js'

const getProductTypes = async ({ shop, accessToken }) => {
  let query = `
    query productTypes {
      shop {
        productTypes(first: 250) {
          edges {
            node
          }
        }
      }
    }
  `

  let res = await graphqlCaller({
    shop,
    accessToken,
    query,
  })

  return res.shop['productTypes'].edges.map((item) => item.node)
}

const getProductVendors = async ({ shop, accessToken }) => {
  let query = `
    query productVendors {
      shop {
        productVendors(first: 250) {
          edges {
            node
          }
          pageInfo {
            hasNextPage
            hasNextPage
            startCursor
            endCursor
          }
        }
      }
    }
  `
  let res = await graphqlCaller({
    shop,
    accessToken,
    query,
  })
  console.log('productVendors :>> ', res)
  return res.shop['productVendors'].edges.map((item) => item.node)
}

const find = async ({
  shop,
  accessToken,
  limit = 10,
  pageInfo = '',
  order = false,
  title = '',
  hasPreviousPage = false,
  hasNextPage = false,
}) => {
  const variables = {
    limit,
    order,
    pageInfo,
  }
  let page = ``
  if (pageInfo) {
    page = hasNextPage
      ? `first: $limit, after: $pageInfo`
      : hasPreviousPage
      ? `last: $limit, before: $pageInfo`
      : `first: $limit`
  } else {
    page = `first: $limit`
  }

  const query = `query products ($limit: Int!, $order: Boolean ${
    pageInfo ? ', $pageInfo: String' : ''
  }) {
    products(${page}, reverse: $order) {
      edges {
        node {
          id 
          title
          handle
          status
          description
          options {
            id
            name
            position
            values
          }
          variants(first: 10) {
            edges {
              node{
                id
                title
                price
                compareAtPrice
                selectedOptions {
                  name
                  value
                }
              }
            }
          } 
          images(first: 10) {
            edges {
              node {
                altText
                id
                url
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
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

const findById = async ({ shop, accessToken, id }) => {
  const variables = {
    id: `gid://shopify/Product/${id}`,
  }

  const query = `query product ($id: ID!){
      product(id: $id) {
        id 
        title
        handle
        status
        description
        options {
          id 
          name
          position
          values
        }
        variants(first: 10) {
          edges {
            node{
              id
              title
              price
              compareAtPrice
              selectedOptions {
                name
                value
              }
            }
          }
        } 
        images(first: 10) {
          edges {
            node {
              altText
              id
              url
            }
          }
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

const update = async ({ shop, accessToken, id, data }) => {
  const _data = {
    id: `gid://shopify/Product/${id}`,
    title: data.product['title'],
    bodyHtml: data.product['description'],
    status: data.product['status'].toUpperCase(),
    images: data.product['images'].map((item) => ({
      altText: item.altText,
      src: item.url,
    })),
    options: data.product['options'].map((value) => value.name),
    variants: data.product['variants'].map((value) => {
      let _variant = {}
      Array.from(['price', 'compareAtPrice']).forEach((key) => {
        _variant[key] = value[key]
      })
      _variant['options'] = value.selectedOptions?.map((value) => value.value)
      return _variant
    }),
  }

  const variables = {
    input: _data,
  }

  const query = `mutation productUpdate($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        id
        title
        handle
        status
        description
        options {
          id
          name
          position
          values
        }
        variants(first: 10) {
          edges {
            node{
              id
              title
              price
              compareAtPrice
              selectedOptions {
                name
                value
              }
            }
          }
        } 
        images(first: 10) {
          edges {
            node {
              id
              url
            }
          }
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

const create = async ({ shop, accessToken, data }) => {
  const _data = {
    title: data.product['title'],
    descriptionHtml: data.product['description'],
    status: data.product['status'].toUpperCase(),
    options: data.product['options']?.map((value) => value.name),
    variants: data.product['variants']?.map((value) => {
      let _variant = {}
      Array.from(['price', 'compareAtPrice']).forEach((key) => {
        _variant[key] = value[key]
      })
      _variant['options'] = value.selectedOptions?.map((value) => value.value)
      return _variant
    }),
  }

  const variables = {
    input: _data,
  }

  const query = `mutation productCreate($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
        title
        handle
        status
        description
        options {
          id
          name
          position
          values
        }
        variants(first: 10) {
          edges {
            node{
              id
              title
              price
              compareAtPrice
              selectedOptions {
                name
                value
              }
            }
          }
        } 
        images(first: 10) {
          edges {
            node {
              id
              url
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
  `
  const res = await graphqlCaller({
    shop,
    accessToken,
    query,
    variables,
  })
  return res
}

const _delete = async ({ shop, accessToken, id }) => {
  const variables = {
    input: {
      id: `gid://shopify/Product/${id}`,
    },
  }
  const query = `mutation productDelete($input: ProductDeleteInput!) {
    productDelete(input: $input) {
      deletedProductId
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

const Product = {
  getProductTypes,
  getProductVendors,
  find,
  findById,
  update,
  create,
  delete: _delete,
}

export default Product

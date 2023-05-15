import apiCaller from '../helpers/apiCaller.js'
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

const findGraphQL = async ({
  shop,
  accessToken,
  limit = 20,
  pageInfo = '',
  order = false,
  title = '',
  hasPreviousPage = false,
  hasNextPage = false,
}) => {
  let variables = {
    limit,
    order,
    title: `title: ${title}`,
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

  let query = `query products ($limit: Int!, $order: Boolean, $title: String ${
    pageInfo ? ', $pageInfo: String' : ''
  }) {
    products(${page}, reverse: $order, query: $title) {
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
  console.log('query :>> ', query)
  let res = await graphqlCaller({
    shop,
    accessToken,
    query,
    variables,
  })
  return res
}

const findByIdGraphQL = async ({ shop, accessToken, id }) => {
  let variables = {
    id: `gid://shopify/Product/${id}`,
  }
  let query = `query product ($id: ID!){
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
              id
              url
            }
          }
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

const updateGraphQL = async ({ shop, accessToken, id, data }) => {
  let _data = {
    // ...data,
    id: `gid://shopify/Product/${id}`,
    title: data.product['title'],
    bodyHtml: data.product['description'],
    status: data.product['status'].toUpperCase(),
    options: data.product['options'].map((value) => value.name),
    variants: data.product['variants'].map((value) => {
      let _variant = {}
      Array.from(['price', 'compareAtPrice']).forEach((key) => {
        _variant[key] = value[key]
      })
      _variant['options'] = value.selectedOptions.map((value) => value.value)
      return _variant
    }),
  }
  console.log('data :>> ', _data.status)
  let variables = {
    input: _data,
  }

  let query = `mutation productUpdate($input: ProductInput!) {
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

  let res = await graphqlCaller({
    shop,
    accessToken,
    query,
    variables,
  })
  return res
}
const getAll = async ({ shop, accessToken, count }) => {
  let items = []
  let res = null
  let hasNextPage = true
  let nextPageInfo = ''

  while (hasNextPage) {
    res = await apiCaller({
      shop,
      accessToken,
      endpoint: `products.json?limit=250&page_info=${nextPageInfo}`,
      pageInfo: true,
    })

    items = items.concat(res.products)

    hasNextPage = res.pageInfo.hasNext
    nextPageInfo = res.pageInfo.nextPageInfo

    if (!isNaN(count) && parseInt(count) && items.length >= parseInt(count)) {
      hasNextPage = false
      nextPageInfo = ''

      items = items.slice(0, count)
    }
  }

  return items
}

const count = async ({ shop, accessToken }) => {
  return await apiCaller({ shop, accessToken, endpoint: `products/count.json` })
}

const find = async ({ shop, accessToken, limit, pageInfo, order, filter }) => {
  let _limit = limit ? parseInt(limit) : 20

  let endpoint = `products.json?limit=${_limit}${filter || ''}`
  if (pageInfo) {
    endpoint += `&page_info=${pageInfo}`
  } else {
    if (order) {
      endpoint += `&order=${order}`
    } else {
      endpoint += `&order=updated_at+desc`
    }
  }

  return await apiCaller({
    shop,
    accessToken,
    endpoint,
    pageInfo: true,
  })
}

const findById = async ({ shop, accessToken, id }) => {
  return await apiCaller({ shop, accessToken, endpoint: `products/${id}.json` })
}

const create = async ({ shop, accessToken, data }) => {
  return await apiCaller({ shop, accessToken, endpoint: `products.json`, method: 'POST', data })
}

const update = async ({ shop, accessToken, id, data }) => {
  return await apiCaller({
    shop,
    accessToken,
    endpoint: `products/${id}.json`,
    method: 'PUT',
    data,
  })
}

const _delete = async ({ shop, accessToken, id }) => {
  return await apiCaller({
    shop,
    accessToken,
    endpoint: `products/${id}.json`,
    method: 'DELETE',
  })
}

const Product = {
  getProductTypes,
  getProductVendors,
  findGraphQL,
  updateGraphQL,
  findByIdGraphQL,
  getAll,
  count,
  find,
  findById,
  create,
  update,
  delete: _delete,
}

export default Product

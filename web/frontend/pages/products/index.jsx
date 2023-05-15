import { Card, Pagination, Stack } from '@shopify/polaris'
import { useEffect, useState } from 'react'
import ProductApi from '../../apis/product'
import AppHeader from '../../components/AppHeader'
import { ImagesMajor, EditMinor, DeleteMinor, ViewMinor } from '@shopify/polaris-icons'
import Table from './Table'
import { useSearchParams } from 'react-router-dom'
import ConfirmModal from '../../components/ConfirmModal'

function ProductsPage(props) {
  const { actions, location } = props
  const [searchParams, setSearchParams] = useSearchParams()
  const [count, setCount] = useState(null)
  const [products, setProducts] = useState(null)
  const [deleted, setDeleted] = useState(null)

  const getProductsCount = async () => {
    try {
      let res = await ProductApi.count()
      if (!res.success) throw res.error

      setCount(res.data.count)
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    }
  }
  useEffect(() => {
    console.log(products)
  }, [products])
  useEffect(() => {
    getProductsCount()
  }, [])

  const getProducts = async (query) => {
    try {
      setProducts(null)

      let res = await ProductApi.find(query)
      console.log('res:>>', res)
      const { edges, pageInfo } = res.data.products
      let _products = edges.map((value) => {
        const images = value.node.images.edges.map((value) => value.node)
        const variants = value.node.variants.edges.map((value) => value.node)
        const id = value.node.id.substring(value.node.id.lastIndexOf('/') + 1, value.node.id.length)
        const product = {
          ...value.node,
          id,
          images,
          variants,
        }
        return product
      })
      let _pageInfo = pageInfo

      res.data = { products: _products, pageInfo: _pageInfo }
      if (!res.success) throw res.error
      setProducts(res.data)
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    }
  }

  useEffect(() => {
    getProducts(location.search)
  }, [location.search])

  const handleDelete = async (selected) => {
    try {
      actions.showAppLoading()

      let res = await ProductApi.delete(selected.id)
      if (!res.success) throw res.error

      actions.showNotify({ message: 'Deleted' })

      getProducts(location.search)
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    } finally {
      actions.hideAppLoading()
    }
  }

  return (
    <Stack vertical alignment="fill">
      <AppHeader
        {...props}
        title="Products"
        primaryActions={[
          {
            label: 'Add product',
            onClick: () => props.navigate('products/new'),
            primary: true,
          },
        ]}
        onBack={() => props.navigate('')}
      />

      <div>
        Total items: <b>{count || 'loading..'}</b>
      </div>

      <Card>
        <Table
          {...props}
          items={products?.products}
          onEdit={(item) => props.navigate(`products/${item.id}`)}
          onDelete={(item) => setDeleted(item)}
        />
      </Card>

      {products?.products?.length > 0 && (
        <Stack distribution="center">
          <Pagination
            hasPrevious={products.pageInfo.hasPreviousPage}
            onPrevious={() => {
              let query = {
                pageInfo: products.pageInfo.startCursor || '',
                hasPreviousPage: true,
              }
              setSearchParams({ ...query })
            }}
            hasNext={products.pageInfo.hasNextPage}
            onNext={() => {
              let query = {
                pageInfo: products.pageInfo.endCursor || '',
                hasNextPage: true,
              }
              setSearchParams({ ...query })
            }}
          />
        </Stack>
      )}

      {deleted && (
        <ConfirmModal
          title="Delete confirmation"
          content="Are you sure want to delete? This cannot be undone."
          onClose={() => setDeleted(null)}
          secondaryActions={[
            {
              content: 'Discard',
              onAction: () => setDeleted(null),
            },
            {
              content: 'Delete now',
              onAction: () => handleDelete(deleted) & setDeleted(null),
              destructive: true,
            },
          ]}
        />
      )}
    </Stack>
  )
}

export default ProductsPage

import { Stack } from '@shopify/polaris'
import React, { useEffect, useState } from 'react'
import AppHeader from '../../components/AppHeader'
import SkeletonPage from '../../components/SkeletonPage'
import CreateForm from './CreateForm'
import { useParams } from 'react-router-dom'
import ProductGraphQLApi from '../../apis/product_graphql'

function DetailPage(props) {
  let { id } = useParams()
  const { actions } = props
  const [product, setProduct] = useState(null)

  useEffect(() => console.log('product:>>', product), [product])

  const getProduct = async (id) => {
    try {
      let res = await ProductGraphQLApi.findById(id)
      let _product = { ...res.data.product }
      Array.from(['images', 'variants']).forEach((key) => {
        _product[key] = res.data.product[key].edges.map((value) => value.node)
      })
      Array.from(['id']).forEach((key) => {
        _product[key] = res.data.product[key].substring(
          res.data.product[key].lastIndexOf('/') + 1,
          res.data.product[key].length
        )
      })
      if (!res.success) throw res.error

      setProduct(_product)
    } catch (error) {
      actions.showNotify({ message: error.message, error: true })
    }
  }

  useEffect(() => {
    getProduct(id)
  }, [])

  return (
    <Stack vertical alignment="fill">
      <AppHeader
        {...props}
        title={product?.title || 'loading..'}
        onBack={() => props.navigate(`/products-graphql`)}
      />

      {product ? (
        <CreateForm
          {...props}
          created={product}
          onDiscard={() => props.navigate(`products-graphql`)}
        />
      ) : (
        <SkeletonPage />
      )}
    </Stack>
  )
}

export default DetailPage

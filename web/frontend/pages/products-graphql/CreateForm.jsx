import PropTypes from 'prop-types'
import { Button, Card, Checkbox, DisplayText, Stack, TextField } from '@shopify/polaris'
import { useEffect, useState } from 'react'
import AppHeader from '../../components/AppHeader'
import ValidateForm from '../../helpers/validateForm'
import FormControl from '../../components/FormControl'
import Variants from './Variants'
import { filterValidOptions } from './actions'
import Images from './Images'
import ProductGraphQLApi from '../../apis/product_graphql'
import ImageGraphQLApi from '../../apis/image_graphql'

CreateForm.propTypes = {
  // ...appProps,
  created: PropTypes.object,
  onDiscard: PropTypes.func,
  onSubmited: PropTypes.func,
}

CreateForm.defaultProps = {
  created: {},
  onDiscard: () => null,
  onSubmited: () => null,
}

const InitFormData = {
  title: {
    type: 'text',
    label: 'Title',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [200, 'Too long!'],
    },
    focused: true,
  },
  description: {
    type: 'text',
    label: 'Description',
    value: '',
    error: '',
    required: true,
    validate: {},
    multiline: 6,
  },
  status: {
    type: 'select',
    label: 'Status',
    value: 'active',
    error: '',
    options: [
      { label: 'ACTIVE', value: 'active' },
      { label: 'DRAFT', value: 'draft' },
    ],
  },
  vendor: {
    type: 'autocomplete',
    label: 'Vendor',
    value: '',
    error: '',
    options: [],
  },
  product_type: {
    type: 'autocomplete',
    label: 'Product type',
    value: '',
    error: '',
    options: [],
  },
  options: {
    type: '',
    label: '',
    value: null,
    error: '',
    enabled: false,
    variants: [],
  },
  images: {
    name: 'images',
    type: 'file',
    label: '',
    value: [],
    allowMultiple: true,
    originalValue: [],
    removeValue: [],
    error: '',
    required: false,
    validate: {},
  },
}

function CreateForm(props) {
  const { actions, created, onDiscard, onSubmited, productVendors, productTypes } = props

  const [formData, setFormData] = useState(null)

  useEffect(() => {
    console.log('formData', formData)
  }, [formData])

  useEffect(() => {
    let _formData = JSON.parse(JSON.stringify(InitFormData))

    if (created.id) {
      Array.from(['title', 'description', 'status', 'vendor', 'product_type', 'status']).map(
        (key) => (_formData[key] = { ..._formData[key], value: created[key] || '' })
      )
      _formData.options = {
        ..._formData.options,
        enabled: true,
        value: created.options.map((item) => ({ name: item.name, values: item.values })),
        variants: created.variants,
      }
      if (_formData.options.value.length < 3) {
        _formData.options.value = _formData.options.value.concat(
          Array.from({ length: 3 - _formData.options.value.length }).map(() => ({
            name: '',
            values: [],
          }))
        )
      }
      _formData.images.originalValue = created.images
    } else {
      /**
       * Sample data
       */
      _formData.title.value = `Sample product - ${new Date().toString()}`
      _formData.description.value = `Sample product`
    }

    setFormData(_formData)

    if (!productVendors) {
      actions.getProductVendors()
    }
    if (!productTypes) {
      actions.getProductTypes()
    }
  }, [])

  const handleChange = (name, value) => {
    let _formData = JSON.parse(JSON.stringify(formData))
    _formData[name] = { ..._formData[name], value, error: '' }
    setFormData(_formData)
  }

  const handleSubmit = async () => {
    try {
      let _formData = { ...formData }
      const { formValid, validFormData } = ValidateForm.validateForm(formData)

      if (!formValid) {
        setFormData(validFormData)
        throw new Error('Invalid form data')
      }

      actions.showAppLoading()

      let data = {
        title: validFormData.title.value,
        description: validFormData.description.value,
        vendor: validFormData.vendor.value,
        product_type: validFormData.product_type.value,
        status: validFormData.status.value,
      }

      let options = filterValidOptions(formData.options.value)
      if (options.length > 0) {
        data.options = options
        data.variants = formData.options.variants
      }
      console.log('data:>>', data)

      let res = null
      let id = created.id
      if (created.id) {
        // update
        data.images = formData.images.originalValue.filter((item) => item.id)
        res = await ProductGraphQLApi.update(created.id, { product: data })
      } else {
        // create
        res = await ProductGraphQLApi.create({ product: data })
        const { id: _id } = res.data.productCreate.product
        id = _id.substring(_id.lastIndexOf('/', _id.length))
      }

      console.log('res :>> ', res)

      if (!res.success) throw res.error
      let _images = formData.images.originalValue.filter((item) => !item.id)
      let _res = null
      if (_images.length > 0) {
        let files = _images.filter((item) => item.name)

        if (files.length > 0) {
          let _files = [...files].map((item) => ({
            size: item.size,
            name: item.name,
            type: item.type,
          }))
          _res = await ImageGraphQLApi.upload(_files)

          // Upload image to shopify
          for (let i = 0; i < files.length; i++) {
            let formData = new FormData()
            for (const param of _res.data.stagedUploadsCreate.stagedTargets[i].parameters) {
              formData.append(param.name, param.value)
            }
            formData.append('file', files[i])
            await fetch(_res.data.stagedUploadsCreate.stagedTargets[i].url, {
              method: 'POST',
              body: formData,
            })
          }
          // Upload image to a product
          let media = _res.data.stagedUploadsCreate.stagedTargets.map((item) => ({
            alt: item.resourceUrl.substring(
              item.resourceUrl.lastIndexOf('/') + 1,
              item.resourceUrl.length
            ),
            resourceUrl: item.resourceUrl,
          }))
          let __res = await ImageGraphQLApi.create(id, media)

          console.log('__res :>> ', __res)
        }

        let urls = _images.filter((item) => item.url)
        if (urls.length > 0) {
          let media = urls.map((item) => ({
            alt: 'external image url',
            resourceUrl: item.url,
          }))
          let __res = await ImageGraphQLApi.create(id, media)
        }
      }

      let _removeImages = formData['images'].removeValue.filter((item) => item.id)
      if (_removeImages.length > 0) {
        for (let _item of _removeImages) {
          _res = await ImageGraphQLApi.delete(id, _item.id)
        }
      }
      _formData['images'].removeValue = []
      _res = await ProductGraphQLApi.findById(id)
      _formData['images'].originalValue = _res.data.product['images'].edges.map(
        (value) => value.node
      )
      console.log('_res :>> ', _res)
      setFormData(_formData)

      actions.showNotify({ message: created.id ? 'Saved' : 'Created' })

      // onSubmited(res.data.product)
    } catch (error) {
      console.log(error)
      actions.showNotify({ error: true, message: error.message })
    } finally {
      actions.hideAppLoading()
    }
  }

  if (!formData) return null

  // console.log('formData:>>', formData)

  return (
    <Stack vertical alignment="fill">
      <Card sectioned>
        <Stack vertical alignment="fill">
          <FormControl {...formData['title']} onChange={(value) => handleChange('title', value)} />
          <FormControl
            {...formData['description']}
            onChange={(value) => handleChange('description', value)}
          />
          <Stack distribution="fillEvenly">
            <Stack.Item fill>
              <FormControl
                {...formData['status']}
                onChange={(value) => handleChange('status', value)}
              />
            </Stack.Item>
            <Stack.Item fill></Stack.Item>
          </Stack>
          <Stack distribution="fillEvenly">
            <Stack.Item fill>
              <FormControl
                {...formData['vendor']}
                onChange={(value) => handleChange('vendor', value)}
                options={productVendors?.map((item) => ({ label: item, value: item })) || []}
              />
            </Stack.Item>
            <Stack.Item fill>
              <FormControl
                {...formData['product_type']}
                onChange={(value) => handleChange('product_type', value)}
                options={productTypes?.map((item) => ({ label: item, value: item })) || []}
              />
            </Stack.Item>
          </Stack>
        </Stack>
      </Card>

      <Images formData={formData} setFormData={setFormData} />

      <Variants formData={formData} setFormData={setFormData} />

      <Stack distribution="trailing">
        <Button onClick={onDiscard}>Discard</Button>
        <Button primary onClick={handleSubmit}>
          {created.id ? 'Save' : 'Add'}
        </Button>
      </Stack>
    </Stack>
  )
}

export default CreateForm

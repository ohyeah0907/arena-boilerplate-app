import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { DeleteMinor } from '@shopify/polaris-icons'
import {
  Button,
  Card,
  Checkbox,
  LegacyStack,
  ResourceItem,
  ResourceList,
  Stack,
  Text,
  TextField,
} from '@shopify/polaris'
import { generateVariantsFromOptions } from './actions'

let InitOptions = Array.from({ length: 3 }).map((item) => ({ name: '', values: [] }))
InitOptions[0].name = 'Size'
InitOptions[0].values = ['S', 'M', 'L']

function Variants(props) {
  const { formData, setFormData } = props
  // let variants = formData.options.enabled
  //   ? formData.variants.value || generateVariantsFromOptions(formData.options.value)
  //   : []

  const variants = formData.options.enabled
    ? generateVariantsFromOptions(formData.options.value)
    : []

  useEffect(() => {
    if (formData.options.value) {
      let _formData = { ...formData }
      let _editOptions = Array.from({ length: 3 }).map((item) => ({ name: '', values: [] }))
      _formData.options.value.map((item, index) => {
        _editOptions[index].name = item.name
        _editOptions[index].values = item.values
      })
      _formData.options.value = _editOptions
      setFormData(_formData)
    }
  }, [])

  // useEffect(() => {
  //   variants = generateVariantsFromOptions(formData.options.value)
  //   console.log('variants:>>', variants)
  // }, [formData])
  console.log('formaData variants:>>', formData)

  return (
    <Card title="Variants">
      <Card.Section>
        <Checkbox
          checked={formData.options.enabled}
          label="Add options like size or color"
          onChange={() => {
            let _formData = { ...formData }
            let _enabled = !_formData.options.enabled
            _formData.options.enabled = _enabled
            _formData.options.value = _enabled ? InitOptions : null
            setFormData(_formData)
          }}
        />
      </Card.Section>
      {formData.options.enabled &&
        formData.options.value.map((item, index) => (
          <Card.Section key={index} title={`Option ${index + 1}`}>
            <div style={{ marginLeft: 20 }}>
              <Stack vertical alignment="fill">
                <TextField
                  label="name"
                  value={item.name}
                  onChange={(value) => {
                    let _formData = { ...formData }
                    _formData.options.value[index].name = value
                    setFormData(_formData)
                  }}
                />
                <TextField
                  label="values"
                  value={item.values.join(',')}
                  onChange={(value) => {
                    let _formData = { ...formData }
                    _formData.options.value[index].values = value.split(',')
                    setFormData(_formData)
                  }}
                />
              </Stack>
            </div>
          </Card.Section>
        ))}

      {variants.length > 0 && (
        <Card.Section title="Variants">
          <ResourceList
            resourceName={{ singular: 'variant', plural: 'variants' }}
            items={variants}
            renderItem={(item, index) => {
              return (
                <ResourceItem id={index}>
                  <Stack>
                    <Stack.Item fill>
                      <Text>
                        {item.option1}
                        {item.option2 ? ` / ${item.option2}` : ``}
                        {item.option3 ? ` / ${item.option3}` : ``}
                      </Text>
                    </Stack.Item>

                    <Stack.Item>
                      <Button plain icon={DeleteMinor} />
                    </Stack.Item>
                  </Stack>
                </ResourceItem>
              )
            }}
          />
        </Card.Section>
      )}
    </Card>
  )
}

Variants.propTypes = {}

export default Variants

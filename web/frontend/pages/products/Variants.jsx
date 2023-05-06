import React from 'react'
import PropTypes from 'prop-types'
import { Card, Checkbox, ResourceItem, ResourceList, Stack, TextField } from '@shopify/polaris'
import { generateVariantsFromOptions } from './actions'

let InitOptions = Array.from({ length: 3 }).map((item) => ({ name: '', values: [] }))
InitOptions[0].name = 'Size'
InitOptions[0].values = ['S', 'M', 'L']
InitOptions[1].name = 'Color'
InitOptions[1].values = ['Black', 'White']

function Variants(props) {
  const { formData, setFormData } = props
  const variants = formData.options.enabled
    ? generateVariantsFromOptions(formData.options.value)
    : []
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
                  <div>
                    {item.option1}
                    {item.option2 ? ` / ${item.option2}` : ``}
                    {item.option3 ? ` / ${item.option3}` : ``}
                  </div>
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

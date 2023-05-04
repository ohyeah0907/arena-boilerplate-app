import React from 'react'
import PropTypes from 'prop-types'
import { PlusMinor } from '@shopify/polaris-icons'
import { LegacyStack, Divider, Text, Icon, Badge, Button } from '@shopify/polaris'
import Table from './Table'
import ListOption from '../../../../components/ListOption'

Variants.propTypes = {
  // data: PropTypes.object,
}

Variants.defaultProps = {
  // data: {},
}

function Variants(props) {
  const { data, handleEdit } = props

  console.log('props parent:>>', props)
  return (
    <LegacyStack vertical distribution="fillEvenly">
      <Text as="h1">Variants</Text>
      <Divider />

      <ListOption data={data} handleEdit={handleEdit} />

      {/* <Table /> */}
    </LegacyStack>
  )
}

export default Variants

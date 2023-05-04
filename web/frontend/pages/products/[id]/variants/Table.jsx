import React from 'react'
import PropTypes from 'prop-types'
import { Button, LegacyStack } from '@shopify/polaris'

function Table(props) {
  return (
    <LegacyStack vertical>
      <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: '100%' }}>
        <LegacyStack>
          <Button plain>All</Button>
          <Button plain>None</Button>
        </LegacyStack>

        <LegacyStack>
          <Button plain>Add variant</Button>
        </LegacyStack>
      </div>
    </LegacyStack>
  )
}

Table.propTypes = {
  // ...appProps,
  items: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}

Table.defaultProps = {
  items: undefined,
  onEdit: () => null,
  onDelete: () => null,
}

export default Table

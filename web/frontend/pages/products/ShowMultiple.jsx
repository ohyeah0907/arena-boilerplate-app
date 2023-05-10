import React from 'react'
import PropTypes from 'prop-types'
import { AlphaCard, Button, LegacyStack, Text, VerticalStack } from '@shopify/polaris'

function ShowMultiple(props) {
  return (
    <AlphaCard>
      <LegacyStack>
        <LegacyStack.Item fill>
          <Text variant="headingMd" as="h2">
            Images
          </Text>
        </LegacyStack.Item>
        <LegacyStack.Item>
          <Button plain destructive>
            Delete all
          </Button>
        </LegacyStack.Item>
        <LegacyStack.Item>
          <Button plain>Add Image with url</Button>
        </LegacyStack.Item>
      </LegacyStack>
      <LegacyStack></LegacyStack>
    </AlphaCard>
  )
}

ShowMultiple.propTypes = {}

export default ShowMultiple

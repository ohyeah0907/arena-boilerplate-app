import React from 'react'
import PropTypes from 'prop-types'
import { PlusMinor } from '@shopify/polaris-icons'
import { Badge, Button, Divider, LegacyStack, Text, TextField } from '@shopify/polaris'

const InitOption = {}

function ListOption(props) {
  const { data, handleEdit } = props

  return (
    <LegacyStack vertical>
      {data.value.map((option) =>
        data.editValue.includes(option.id) ? (
          <LegacyStack vertical>
            <LegacyStack>
              <LegacyStack.Item fill>
                <TextField />
              </LegacyStack.Item>
              <LegacyStack.Item>
                <Button>Delete</Button>
              </LegacyStack.Item>
            </LegacyStack>
            <Divider />
          </LegacyStack>
        ) : (
          <div key={option.id}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingBottom: '1rem',
              }}
            >
              <LegacyStack vertical>
                <Text>{option.name}</Text>
                <LegacyStack>
                  {option.values.map((item, index) => (
                    <Badge key={index}>{item}</Badge>
                  ))}
                </LegacyStack>
              </LegacyStack>
              <div>
                <Button onClick={() => handleEdit(option.id)} size="slim">
                  Edit
                </Button>
              </div>
            </div>
            <Divider />
          </div>
        )
      )}
      {data.value.length < 3 && (
        <LegacyStack vertical>
          <Button plain icon={PlusMinor}>
            Add options like size or color
          </Button>

          <Divider />
        </LegacyStack>
      )}
    </LegacyStack>
  )
}

ListOption.propTypes = {}

export default ListOption

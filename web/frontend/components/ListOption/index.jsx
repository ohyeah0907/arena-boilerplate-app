import React from 'react'
import PropTypes from 'prop-types'
import { PlusMinor, DeleteMinor } from '@shopify/polaris-icons'
import {
  Badge,
  Button,
  Divider,
  HorizontalStack,
  LegacyStack,
  Text,
  TextField,
} from '@shopify/polaris'

const InitOption = {}

function ListOption(props) {
  const { data, handleEdit } = props

  return (
    <LegacyStack vertical>
      {data.value.map((option) =>
        data.editValue.includes(option.id) ? (
          <LegacyStack vertical>
            <Text as="h2">Option name</Text>
            <LegacyStack vertical>
              <HorizontalStack blockAlign="center" gap="4">
                <LegacyStack.Item fill>
                  <TextField value={option.name} />
                </LegacyStack.Item>
                <LegacyStack.Item>
                  <Button plain icon={DeleteMinor} />
                </LegacyStack.Item>
              </HorizontalStack>
            </LegacyStack>
            <Text as="h2">Option values</Text>
            <LegacyStack vertical>
              {option.values.map((item, index) => (
                <HorizontalStack blockAlign="center" gap="4" key={index}>
                  <LegacyStack.Item fill>
                    <TextField value={item} />
                  </LegacyStack.Item>
                  <LegacyStack.Item>
                    <Button plain icon={DeleteMinor} />
                  </LegacyStack.Item>
                </HorizontalStack>
              ))}
              <HorizontalStack blockAlign="center" gap="4">
                <LegacyStack.Item fill>
                  <TextField placeholder="Add another value" />
                </LegacyStack.Item>
                <LegacyStack.Item>
                  <Button plain disabled />
                </LegacyStack.Item>
              </HorizontalStack>
            </LegacyStack>
            <Button>Done</Button>
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

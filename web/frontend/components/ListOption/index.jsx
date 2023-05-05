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

const InitFormOption = {}

function ListOption(props) {
  const { data, handleEdit, handleRemoveEdit } = props
  console.log('data:>>', data)
  return (
    <LegacyStack vertical>
      {data.value.map((option) =>
        data.editValue.includes(option.id) ? (
          <LegacyStack vertical key={option.id}>
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
            <Button onClick={() => handleRemoveEdit(option.id)}>Done</Button>
            <Divider />
          </LegacyStack>
        ) : (
          <LegacyStack vertical key={option.id}>
            <LegacyStack>
              <LegacyStack.Item fill vertical>
                <div style={{ marginBottom: '0.3rem' }}>
                  <Text>{option.name}</Text>
                </div>

                <LegacyStack>
                  {option.values.map((item, index) => (
                    <Badge key={index}>{item}</Badge>
                  ))}
                </LegacyStack>
              </LegacyStack.Item>
              <LegacyStack.Item>
                <Button onClick={() => handleEdit(option.id)} size="slim">
                  Edit
                </Button>
              </LegacyStack.Item>
            </LegacyStack>

            <Divider />
          </LegacyStack>
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

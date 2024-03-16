import { Spinner, UnorderedList } from '@inkjs/ui'
import { Box, Text } from 'ink'
import { UnorderedListItem } from 'node_modules/@inkjs/ui/build/components/unordered-list/unordered-list-item'
import type { FC } from 'react'
import { useBuildStore } from 'src/stores/build'

export const Steps: FC = () => {
  const { steps, isBuildSuccess } = useBuildStore()

  return (
    <Box
      flexDirection="column"
    >
      <Text
        bold
        color="green"
      >
        Steps:
      </Text>
      <UnorderedList>
        {steps.map((step, index) => (
          <UnorderedListItem
            key={step}
          >
            <Box
              gap={1}
            >
              <Text>{step}</Text>
              {index === steps.length - 1
              && isBuildSuccess === null
              && <Spinner />}
            </Box>
          </UnorderedListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}

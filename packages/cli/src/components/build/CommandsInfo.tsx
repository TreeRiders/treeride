import { UnorderedList } from '@inkjs/ui'
import { Box, Text } from 'ink'
import { UnorderedListItem } from 'node_modules/@inkjs/ui/build/components/unordered-list/unordered-list-item'
import type { FC } from 'react'
import { useBuildStore } from 'src/stores/build'

export const CommandsInfo: FC = () => {
  const { extension } = useBuildStore()

  if (!extension) {
    return null
  }

  return (
    <Box
      flexDirection="column"
    >
      <Text
        bold
        color="green"
      >
        Commands:
      </Text>
      <UnorderedList>
        {extension.commands.map(command => (
          <UnorderedListItem
            key={command.name}
          >
            <Text>{command.name}</Text>
          </UnorderedListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}

import { Box, Text } from 'ink'
import type { FC } from 'react'
import { useBuildStore } from 'src/stores/build'

export const ExtensionInfo: FC = () => {
  const { extension } = useBuildStore()

  if (!extension) {
    return null
  }

  return (
    <Box
      flexDirection="column"
      gap={0.1}
    >
      <Text
        color="cyan"
      >
        Name:
        {' '}
        {extension.name}
      </Text>
      <Text
        color="cyan"
      >
        Author:
        {' '}
        {extension.author}
      </Text>
      <Text
        color="cyan"
      >
        Version:
        {' '}
        {extension.version}
      </Text>
    </Box>
  )
}

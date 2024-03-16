import { Box, Text } from 'ink'
import type { FC } from 'react'
import { useBuildStore } from 'src/stores/build'

export const BuildResult: FC = () => {
  const { isBuildSuccess, buildError } = useBuildStore()

  if (isBuildSuccess === null) {
    return null
  }

  return (
    <Box
      paddingTop={1}
    >
      {
        isBuildSuccess
          ? (
            <Text
              color="green"
            >
              Build is successful 🎉
            </Text>
            )
          : (
            <Text
              color="red"
            >
              Build is failed:
              {' '}
              {buildError}
              {' '}
              🚨
            </Text>
            )
      }
    </Box>
  )
}

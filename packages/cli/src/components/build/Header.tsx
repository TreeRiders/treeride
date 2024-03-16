import figlet from 'figlet'
import { Box, Text } from 'ink'
import type { FC } from 'react'

interface HeaderProps {
  title: string
}

export const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <Box>
      <Text
        color="yellowBright"
      >
        {figlet.textSync('TreeRide', { font: 'Slant' })}
      </Text>
      <Text
        color="red"
      >
        {figlet.textSync(title, { font: 'Slant' })}
      </Text>
    </Box>
  )
}

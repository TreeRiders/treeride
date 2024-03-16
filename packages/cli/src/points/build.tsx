import { exit } from 'node:process'
import { type FC, useCallback, useEffect, useRef } from 'react'
import { Box } from 'ink'
import { BuildResult, CommandsInfo, ExtensionInfo, Header, Steps } from 'src/components/build'
import { useBuildStore } from 'src/stores/build'
import { buildCommands, getCommandsBuilders, postBuild, readExtension } from 'src/processes/build'

const Build: FC = () => {
  const {
    setBuildError,
    setBuildSuccess,
    setExtension,
    addStep,
    isBuildSuccess,
  } = useBuildStore()

  const isBuildStarted = useRef(false)

  const build = useCallback(async () => {
    if (isBuildStarted.current) {
      return
    }
    isBuildStarted.current = true
    try {
      addStep('Reading extension')
      const extension = readExtension()
      setExtension(extension)
      addStep('Get commands')
      const builders = getCommandsBuilders(extension)
      addStep('Building commands')
      await buildCommands(builders)
      addStep('Post build')
      postBuild(extension)
      setBuildSuccess(true)
    }
    catch (error) {
      setBuildSuccess(false)
      setBuildError((error as Error).message)
    }
  }, [addStep, setBuildError, setBuildSuccess, setExtension])

  useEffect(() => {
    build()
  }, [build])

  useEffect(() => {
    if (isBuildSuccess === true) {
      exit(0)
    }
    if (isBuildSuccess === false) {
      exit(1)
    }
  }, [isBuildSuccess])

  return (
    <Box
      flexDirection="column"
    >
      <Header
        title="Build"
      />
      <Box
        flexDirection="column"
        gap={1}
      >
        <ExtensionInfo />
        <CommandsInfo />
        <Steps />
        <BuildResult />
      </Box>
    </Box>
  )
}

export { Build }

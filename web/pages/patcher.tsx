import { useEffect, useState } from 'react'
import { Button, Flex, Box, ButtonGroup, Progress, Text } from '@chakra-ui/core'

export default function Patcher() {
  const [isReady, setIsReady] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isInstalling, setIsInstalling] = useState(false)

  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [downloaded, setDownloaded] = useState(0)
  const [installed, setInstalled] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    window.patchingStatusReady = () => setIsReady(true)
  }, [isReady])
  
  useEffect(() => {
    window.patchingStatusDownloading = (nbDownloaded, nbTotal) => { 
      setDownloaded(nbDownloaded)
      setTotal(nbTotal)
    }
  }, [downloaded, total])
  
  useEffect(() => {
    window.patchingStatusInstalling = (nbInstalled, nbTotal) => { 
      setInstalled(nbInstalled)
      setTotal(nbTotal)
    }
  }, [installed, total])
  
  useEffect(() => {
    window.patchingStatusError = (errorMsg) => {
      setHasError(true)
      setErrorMessage(errorMsg)
    }
  }, [])

  return (
    <Flex direction="column" sx={{ width: 780, height: 580 }}>
      <Box sx={{ flex: '1 1 auto' }}>
        Enyxsis
      </Box>
      <Progress value={80} />
      <Flex sx={{ padding: 4 }}>
        <Box sx={{ flex: '1 1 auto'}}>
          <Text>Downloaded Patches: <strong>{downloaded}/{total}</strong></Text>
          <Text>Installed Patches: <strong>{installed}/{total}</strong></Text>
        </Box>
        <ButtonGroup>
          <Button onClick={() => window.external.invoke('play')} isDisabled={!isReady}>Play</Button>
          <Button onClick={() => window.external.invoke('setup')}>Setup</Button>
          <Button onClick={() => window.external.invoke('exit')}>Exit</Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  )
}

declare global {
  interface Window {
    patchingStatusReady(): void
    patchingStatusError(errorMsg: string): void
    patchingStatusDownloading(nbDownloaded: number, nbTotal: number): void
    patchingStatusInstalling(nbInstalled: number, nbTotal: number): void
  }
  interface External {
    invoke: Function
  }
}

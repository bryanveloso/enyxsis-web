import { useEffect, useState } from 'react'
import { Button, Flex, Box, ButtonGroup, Progress, Text, IconButton, Icon } from '@chakra-ui/core'

import EnyxsisLogo from '../assets/svg/logo-enyxsis.svg'
import RagnarokLogo from '../assets/svg/logo-ragnarok.svg'
import Cog from '@/assets/svg/cog.svg'

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
    <Flex direction="column" sx={{ bg: 'gray.900', color: 'gray.50', w: 1024, h: 576 }}>
      <Box sx={{ flex: '1 1 auto', pt: 8, px: 6 }}>
        <Flex>
          <Flex>
            <EnyxsisLogo style={{ height: 36 }} />
            <RagnarokLogo style={{ paddingLeft: 10, height: 36 }} />
          </Flex>
          <Box></Box>
        </Flex>
      </Box>

      <ButtonGroup sx={{ p: 6 }}>
        <Button size="lg" colorScheme="green" isDisabled={!isReady} onClick={() => window.external.invoke('play')}>Start Game</Button>
        <IconButton aria-label="Setup" variant="link" size="lg" onClick={() => window.external.invoke('setup')} icon={<Icon as={Cog} />}/>
      </ButtonGroup>

      <Flex sx={{ bg: 'black', p: 6 }}>
        <Flex sx={{ flex: '1 1 auto'}}>
          <Text fontSize="xs" sx={{ color: 'gray.500', mr: 6 }}>Patches Downloaded: <strong>{downloaded} of {total}</strong></Text>
          <Text fontSize="xs" sx={{ color: 'gray.500' }}>Patches Installed: <strong>{installed} of {total}</strong></Text>
        </Flex>
      </Flex>
      <Progress size="xs" colorScheme="cyan" value={80} />
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

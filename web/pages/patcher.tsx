import Head from 'next/head';
import { useState } from 'react'
import { Button, Flex, Box, ButtonGroup, Progress, Text, IconButton, Icon, HStack, useToast } from '@chakra-ui/core'
import useEventListener from '@use-it/event-listener'

import { ImageOverlay, LogoStatus } from '@/components/patcher'

import Cog from '@/assets/svg/cog.svg'

export default function Patcher() {
  const [isReady, setIsReady] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [downloaded, setDownloaded] = useState(0)
  const [installed, setInstalled] = useState(0)
  const [total, setTotal] = useState(0)

  useEventListener('statusReady', () => {
    setIsReady(true)
  })

  useEventListener('statusDownloading', ({ detail }: CustomEvent) => {
    setDownloaded(detail.toDownload)
    setTotal(detail.total)
  })

  useEventListener('statusInstalling', ({ detail }: CustomEvent) => {
    setInstalled(detail.toInstall)
  })

  const toast = useToast()
  useEventListener('statusError', ({ detail }: CustomEvent) => {
    setHasError(true)
    toast({
      title: 'Error.',
      description: detail.error,
      status: 'error',
      isClosable: true,
      position: 'bottom-left'
    })
  })

  return (
    <Flex direction="column" overflow="hidden" sx={{ w: 1024, h: 576, userSelect: 'none' }}>
      <Head>
        <script type="text/javascript" src="/patcher/rpc.js"></script>
      </Head>
      <ImageOverlay />
      <Box sx={{ flex: '1 1 auto', pt: 8, px: 6 }}>
        <Flex>
          <LogoStatus />
        </Flex>
      </Box>
      <ButtonGroup sx={{ p: 6 }}>
        <Button size="lg" colorScheme="teal" isLoading={!isReady} onClick={() => window.external.invoke('play')}>Start Game</Button>
        <IconButton size="lg" aria-label="Setup" variant="ghost" onClick={() => window.external.invoke('setup')} icon={<Icon as={Cog} />} />
      </ButtonGroup>
      <Flex sx={{ borderTop: '1px solid', borderColor: 'gray.800', bg: 'black', p: 6 }}>
        <HStack spacing={6} sx={{ flex: '1 1 auto' }}>
          <Text fontSize="xs" sx={{ color: 'gray.700' }}>v0.5.20200914</Text>
          {downloaded > 0 && (<Text fontSize="xs" sx={{ color: 'gray.500' }}>Patches Downloaded: <strong>{downloaded} of {total}</strong></Text>)}
          {installed > 0 && (<Text fontSize="xs" sx={{ color: 'gray.500' }}>Patches Installed: <strong>{installed} of {total}</strong></Text>)}
        </HStack>
      </Flex>
      <Progress size="xs" colorScheme="blue" hasStripe value={0} sx={{ bg: 'black' }} />
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

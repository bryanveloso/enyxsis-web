import { useEffect } from 'react'
import { Button } from '@chakra-ui/core'

export default function Patcher() {
  useEffect(() => {
    window.patchingStatusReady = () => { }
  })

  useEffect(() => {
    window.patchingStatusError = (errorMsg) => { alert(errorMsg) }
  })

  useEffect(() => {
    window.patchingStatusDownloading = (nbDownloaded, nbTotal) => {}
  })

  useEffect(() => {
    window.patchingStatusInstalling = (nbInstalled, nbTotal) => {}
  })

  return (
    <div>
      <Button onClick={() => (window as any).external.invoke('play')} disabled>Play</Button>
      <Button onClick={() => (window as any).external.invoke('setup')}>Setup</Button>
      <Button onClick={() => (window as any).external.invoke('exit')}>Exit</Button>
    </div>
  )
}

declare global {
  interface Window {
    patchingStatusReady(): void
    patchingStatusError(errorMsg: string): void
    patchingStatusDownloading(nbDownloaded: number, nbTotal: number): void
    patchingStatusInstalling(nbInstalled: number, nbTotal: number): void
  }
}
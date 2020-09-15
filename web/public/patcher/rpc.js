function patchingStatusReady() { 
  window.dispatchEvent(
    new CustomEvent('statusReady')
  )
}

function patchingStatusDownloading(nbDownloaded, nbTotal) { 
  window.dispatchEvent(
    new CustomEvent('statusDownloading', {
      detail: { toDownload: nbDownloaded, total: nbTotal },
    })
  )
}

function patchingStatusInstalling(nbInstalled, nbTotal) {
  window.dispatchEvent(
    new CustomEvent('statusInstalling', {
      detail: { toInstall: nbInstalled, total: nbTotal },
    })
  )
}

function patchingStatusError(errorMsg) { 
  window.dispatchEvent(
    new CustomEvent('statusError', {
      detail: { error: errorMsg },
    })
  )
}

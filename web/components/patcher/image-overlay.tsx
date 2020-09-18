import { Box } from "@chakra-ui/core"

export const ImageOverlay = () => (
  <Box sx={{
    backgroundImage: 'url(/patcher/knight.png)',
    backgroundSize: 600,
    backgroundPositionX: 630,
    backgroundPositionY: -50,
    backgroundRepeat: 'no-repeat',
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    w: 1024,
    h: 576,
    zIndex: '1'
  }} />
)
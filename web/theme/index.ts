import { extendTheme } from '@chakra-ui/core'

import colors from './colors'
import styles from './styles'

const overrides = {
  styles,
  colors,
  fonts: {
    body: "'Inter var', 'Inter', sans-serif",
  },
}

export default extendTheme(overrides)

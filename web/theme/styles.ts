import { mode } from '@chakra-ui/theme-tools'

export default {
  global: (props) => ({
    body: {
      fontFamily: 'body',
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('white', 'gray.900')(props),
    }
  })
}

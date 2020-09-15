import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/core'

import { useApollo } from '@/lib/apollo'

import theme from '../theme'

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme} resetCSS>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default App

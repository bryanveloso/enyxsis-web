import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ColorModeScript } from '@chakra-ui/core'

class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <ColorModeScript defaultColorMode="dark" key="chakra-ui-no-flash" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument

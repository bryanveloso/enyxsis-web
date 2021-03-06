import { GetStaticPaths, GetStaticProps } from 'next'
import { FunctionComponent } from 'react'

import { initializeApollo } from '@/lib/apollo'
import { ItemDocument, ItemsDocument } from '@/lib/items.graphql'
import { ItemDetail } from '@/components/item'

const ItemPage: FunctionComponent = () => {
  return <ItemDetail />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const {
    data: { items },
    error,
  } = await apolloClient.query({ query: ItemsDocument })

  if (error) {
    console.error('Error in getStaticPaths: ', error)
  }

  return { paths: items.map(({ id }) => ({ params: { id } })), fallback: true }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const apolloClient = initializeApollo()
  const {
    params: { id },
  } = context

  console.log(typeof id)

  const allItemVars = { id: Number(id) }
  await apolloClient.query({ query: ItemDocument, variables: allItemVars })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default ItemPage

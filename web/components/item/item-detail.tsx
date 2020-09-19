import { FunctionComponent, Fragment } from 'react'
import { useRouter } from 'next/router'
import { useItemQuery } from '@/lib/items.graphql'
import { Box } from '@chakra-ui/core'

interface OwnProps {}

type Props = OwnProps

export const ItemDetail: FunctionComponent<Props> = () => {
  const router = useRouter()
  console.log('router', router)

  const { data, error, loading } = useItemQuery({
    variables: { id: Number(router.query.id) },
  })

  if (error) console.log(error)
  if (loading || router.isFallback) return <Box>Loading</Box>

  console.log(data)

  const { item } = data

  return <div>{JSON.stringify(item, null, 2)}</div>
}

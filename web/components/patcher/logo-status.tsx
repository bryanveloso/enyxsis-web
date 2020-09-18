import useAxios from 'axios-hooks'
import { useEffect, useState } from 'react'
import { Flex, useTheme } from '@chakra-ui/core'

import EnyxsisLogo from '@/assets/svg/logo-enyxsis.svg'
import RagnarokLogo from '@/assets/svg/logo-ragnarok.svg'

export const LogoStatus = () => {
  const [{ data, loading, error }, refetch] = useAxios('https://status.enyxsis.com')
  const [color, setColor] = useState('#fff')
  const theme = useTheme()

  useEffect(() => {
    if (!loading && !error) {
      const { status } = data
      const result = Object.values(status).every((item) => item === true)
      setColor(result ? theme.colors.green['400'] : theme.colors.red['400'])
    }
  }, [data, loading, error])

  return (
    <Flex>
      <EnyxsisLogo style={{ height: 36 }} />
      <RagnarokLogo style={{ color, paddingLeft: 10, height: 36 }} />
    </Flex>
  )
}

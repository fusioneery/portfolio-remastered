import { Global } from '@emotion/core'
import styled from '@emotion/styled'
import React, { useEffect } from 'react'

import { theme } from 'lib/theme'
import { globalStyles } from 'lib/theme/global-style'

const Root = styled.div`
  font-family: ${theme.font.family.body};
`

export const Layout = (props) => {
  return (
    <Root className="siteRoot">
      {props.children}
      <Global styles={globalStyles} />
    </Root>
  )
}

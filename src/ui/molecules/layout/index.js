import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { Global } from '@emotion/core'
import { globalStyles } from '../../../lib/theme/global-style'
import { theme } from '../../../lib/theme'

const Root = styled.div`
  font-family: ${theme.fonts.body};
`

export const Layout = props => {
  return (
    <Root className="siteRoot">
      {props.children}
      <Global styles={globalStyles} />
    </Root>
  )
}

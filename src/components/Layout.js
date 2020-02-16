import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { Global } from '@emotion/core'
import { globalStyles } from '../styles/globalStyles.js'

const Root = styled.div`
  font-family: ${props => props.theme.fonts.body};
`

const Layout = props => {
  return (
    <Root className="siteRoot">
      {props.children}
      <Global styles={globalStyles} />
    </Root>
  )
}

export default Layout

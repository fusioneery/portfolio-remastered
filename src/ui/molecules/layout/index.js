import { Global } from '@emotion/core'
import styled from '@emotion/styled'
import { useLocation } from '@reach/router'
import React from 'react'

import { theme } from 'lib/theme'
import { globalStyles } from 'lib/theme/global-style'

import 'lib/theme/fonts.css'
import { Footer } from 'ui/organisms/footer'

const Root = styled.div`
  font-family: ${theme.font.family.body};
  scroll-behavior: smooth;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  background: ${({ isBlog }) =>
    isBlog ? theme.colors.seabed : theme.colors.backround};
  flex: 1;
`

//workaround for not working styled-components for ::selection pseudo-selector
const getMainCns = (isBlog) => {
  let cns = []
  if (isBlog) {
    cns.push('blog-layout')
  } else {
    cns.push('index-layout')
  }
  return cns.join(' ')
}

export const Layout = ({ children }) => {
  const { pathname } = useLocation()
  const isBlog = pathname.includes('blog')
  return (
    <Root className="siteRoot">
      <Main {...{ isBlog }} className={getMainCns(isBlog)}>
        {children}
      </Main>
      <Footer />
      <Global styles={globalStyles} />
    </Root>
  )
}

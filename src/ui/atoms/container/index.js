import React from 'react'
import styled from '@emotion/styled'
import { theme } from 'lib/theme'

export const Container = styled.div`
  max-width: ${theme.container.medium};
  padding: 0 ${theme.padding.container.medium};
  ${theme.media.largeDesktop} {
    max-width: ${theme.container.large};
    padding: 0 ${theme.padding.container.large};
  }
`

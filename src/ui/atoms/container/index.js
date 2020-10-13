import styled from '@emotion/styled'
import React from 'react'

import { theme } from 'lib/theme'
import { css } from '@emotion/core'
import { motion } from 'framer-motion'

export const mixinPadding = css`
  padding-left: ${theme.padding.container.large};
  padding-right: ${theme.padding.container.large};
  ${theme.media.largeDesktop} {
    padding-left: ${theme.padding.container.medium};
    padding-right: ${theme.padding.container.medium};
  }
`

export const mixinMaxWidth = css`
  max-width: ${theme.container.large};
  ${theme.media.largeDesktop} {
    max-width: ${theme.container.medium};
  }
`

export const Container = styled(motion.div)`
  margin: 0 auto;
  width: 100%;
  ${mixinPadding}
  ${mixinMaxWidth}
`

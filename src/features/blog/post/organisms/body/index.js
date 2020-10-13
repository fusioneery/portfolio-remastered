import styled from '@emotion/styled'
import { hexToRGBA } from 'lib/hex-to-rgba'
import { theme } from 'lib/theme'
import React from 'react'
import { RichTextRenderer } from 'ui/molecules/rich-text-renderer'

export const PostBody = ({ json }) => {
  return (
    <StyledRenderer
      pMargin={20}
      otherMargin={30}
      linkColor={theme.colors.background}
      content={json}
    />
  )
}

const StyledRenderer = styled(RichTextRenderer)`
  color: ${hexToRGBA(theme.colors.secondary, 0.9)};
  font-size: ${theme.font.size.M + 1}px;
  margin-top: 30px;
`

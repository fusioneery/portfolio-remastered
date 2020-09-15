import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { ifProp, prop, switchProp } from 'styled-tools'
import { theme } from 'lib/theme'
import { hexToRGBA } from 'lib/hex-to-rgba'

export const RichTextRenderer = ({
  content,
  type,
  className,
  pMargin = 10,
  linkColor = theme.colors.highlight,
  linkBorderColor = hexToRGBA(theme.colors.background, 0.6),
  hSizes = {
    h4: theme.font.size.M,
    h5: theme.font.size.L,
    h6: theme.font.size.XL,
  },
  hWeights = {
    h4: 'normal',
    h5: 500,
    h6: 600,
  },
}) => {
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_, children) => (
        <Paragraph {...{ pMargin }}>{children}</Paragraph>
      ),
      [BLOCKS.HEADING_4]: (_, children) => (
        <H4 weight={hWeights.h4} size={hSizes.h4}>
          {children}
        </H4>
      ),
      [BLOCKS.HEADING_5]: (_, children) => (
        <H5 weight={hWeights.h5} size={hSizes.h5}>
          {children}
        </H5>
      ),
      [BLOCKS.HEADING_6]: (_, children) => (
        <H6 weight={hWeights.h6} size={hSizes.h6}>
          {children}
        </H6>
      ),
      [INLINES.HYPERLINK]: ({ data: { uri } }, text) => {
        return (
          <Link {...{ linkColor, linkBorderColor }} href={uri} target="_blank">
            {text}
          </Link>
        )
      },
    },
  }
  return (
    <Container {...{ className }}>
      {documentToReactComponents(content, options)}
    </Container>
  )
}

const Link = styled.a`
  color: ${prop('linkColor')};
  font-weight: 500;
  position: relative;
  &::before {
    content: ' ';
    background: ${prop('linkBorderColor')};
    bottom: -2px;
    height: 2px;
    width: 100%;
    transition: all 0.5s ease-in-out;
    position: absolute;
  }
  &:hover {
    &::before {
      width: 25%;
    }
  }
`

const Paragraph = styled.p`
  margin-top: ${prop('pMargin')}px;
  margin-bottom: ${prop('pMargin')}px;
`

const H4 = styled.h4`
  font-weight: ${prop('weight')};
  font-size: ${prop('size')}px;
`

const H5 = styled.h4`
  font-weight: ${prop('weight')};
  font-size: ${prop('size')}px;
`

const H6 = styled.h4`
  font-weight: ${prop('weight')};
  font-size: ${prop('size')}px;
`

const Container = styled.div`
  line-height: 1.3;
  font-family: ${theme.font.family.subheading};
`

const Bold = styled.b`
  font-weight: 600;
`

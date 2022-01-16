import { css } from '@emotion/core'
import styled from '@emotion/styled'
import React from 'react'
import { switchProp } from 'styled-tools'

import { hexToRGBA } from 'lib/hex-to-rgba'
import { theme } from 'lib/theme'
import { Link } from 'ui/atoms/link'

export const TagsList = ({ tags, variant = 'posts' }) => {
  return (
    <List {...{ variant }}>
      {tags.map(({ slug, title, bgColor, textColor }) => (
        <Tag
          {...{ variant, bgColor, textColor }}
          to={`/blog/tag/${slug}`}
          key={slug}
        >
          {title}
        </Tag>
      ))}
    </List>
  )
}

const Tag = styled(Link)`
  transition: all 0.2s ease-in-out;
  display: block;
  ${switchProp('variant', {
    post: css`
      padding: 8px;
      border-radius: 5px;
      font-size: ${theme.font.size.M - 2}px;
      margin: 5px;
      &:hover {
        background: ${hexToRGBA(theme.colors.text, 0.9)};
        color: ${theme.colors.background};
      }
    `,
    posts: css`
      padding: 5px;
      border-radius: 3px;
      font-size: 15px;
      margin: 3px;
      &:hover {
        background: ${hexToRGBA(theme.colors.background, 0.9)};
        color: ${theme.colors.text};
      }
    `,
  })}
  background: ${({ bgColor }) =>
    hexToRGBA(bgColor || theme.colors.background, 0.9)};
  color: ${({ textColor }) => textColor || theme.colors.text};
`

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  ${switchProp('variant', {
    post: css`
      margin: -5px;
    `,
    posts: css`
      margin: -3px;
    `,
  })}
  margin-top: 15px;
`

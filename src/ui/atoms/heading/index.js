import React, { useState } from 'react'
import styled from '@emotion/styled'
import { theme } from '../../../lib/theme'

const Text = ({ as, children, className }) => {
  const TagName = `${as}`
  return <TagName className={className}>{children}</TagName>
}

export const Heading = ({ children, as = 'h1', className }) => {
  return (
    <StyledText className={className} as={as}>
      {children}
    </StyledText>
  )
}

const StyledText = styled(Text)`
  font-size: 40px;
  ${theme.media.tablet} {
    font-size: 56px;
  }
  transition: all 0.3s ease-in-out;
  position: relative;
  display: inline-block;
  line-height: 1.1;
  font-weight: 500;
  margin: 0;
  &:after {
    animation: heading-bg 1.5s ease-in-out 2s forwards;
    display: block;
    content: '';
    height: 30px;
    width: 100%;
    background: rgba(101, 148, 240, 0.18);
    position: absolute;
    bottom: -5px;
  }
`

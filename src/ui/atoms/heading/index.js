import styled from '@emotion/styled'
import React, { useState } from 'react'
import { prop } from 'styled-tools'

import { theme } from '../../../lib/theme'

const Text = ({ as, children, className }) => {
  const TagName = `${as}`
  return <TagName className={className}>{children}</TagName>
}

export const Heading = ({
  children,
  as = 'h1',
  className,
  fontWeight = 500,
  markColor = 'rgba(101, 148, 240, 0.18)',
  multiplier = 1,
}) => {
  return (
    <StyledText {...{ fontWeight, className, as, multiplier, markColor }}>
      {children}
    </StyledText>
  )
}

const StyledText = styled(Text)`
  font-size: ${({ multiplier }) => multiplier * 56}px;
  transition: all 0.3s ease-in-out;
  position: relative;
  display: inline-block;
  line-height: 1.1;
  font-weight: ${prop('fontWeight')};
  margin: 0;
  ${theme.media.largeDesktop} {
    font-size: ${({ multiplier }) => multiplier * 48}px;
  }
  ${theme.media.smallTablet} {
    font-size: ${({ multiplier }) => multiplier * 40}px;
  }
  ${theme.media.mobile} {
    font-size: ${({ multiplier }) => multiplier * 35}px;
  }
  &:after {
    animation: heading-bg 1.5s ease-in-out 2s forwards;
    display: block;
    content: '';
    height: 40%;
    width: 100%;
    background: ${prop('markColor')};
    position: absolute;
    bottom: -5%;
    ${theme.media.smallMobile} {
      height: 25%;
    }
  }
`

import { css } from '@emotion/core'
import styled from '@emotion/styled'
import React from 'react'
import { ifProp, prop, switchProp } from 'styled-tools'

import { hexToRGBA } from 'lib/hex-to-rgba'
import { theme } from 'lib/theme'

export const Button = ({
  type,
  children,
  disabled,
  padding = theme.padding.button.medium,
  className,
  onClick,
  icon,
}) => {
  let test = 'a'
  return (
    <Container {...{ padding, disabled, type, className, onClick }}>
      {icon && <IconContainer>{icon}</IconContainer>}
      {children}
    </Container>
  )
}

const IconContainer = styled.div`
  margin-right: 11px;
`

const Container = styled.div`
  padding: ${prop('padding')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: ${theme.radius.button}px;
  &:hover {
    &:after {
      transition: all 0.7s ease;
      transform: skewX(-42deg) translateX(210px);
    }
  }
  &:after {
    position: absolute;
    content: '';
    width: 40px;
    bottom: 0;

    background: ${hexToRGBA(theme.colors.background, 0.2)};
    height: 120%;
    left: -3px;
    transform: skewX(-42deg) translateX(-50px);
    z-index: 1;
    will-change: transform;
  }
  ${switchProp(
    'type',
    {
      secondary: css`
        background: ${theme.colors.background};
        box-shadow: 0px 0px 10px ${hexToRGBA(theme.colors.background, 0.35)};
        color: ${theme.colors.primary};
        border: 2px solid ${theme.colors.primary};
        &:after {
          background: ${hexToRGBA(theme.colors.primary, 0.1)};
        }
      `,
    },
    css`
      background: ${theme.colors.primary};
      box-shadow: 0px 0px 10px ${hexToRGBA(theme.colors.primary, 0.65)};
      color: ${theme.colors.background};
    `
  )}
  ${ifProp(
    'disabled',
    css`
      cursor: not-allowed;
      background: ${theme.colors.lightgray};
      color: ${theme.colors.darkgray};
    `
  )}
`

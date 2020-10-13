import { css } from '@emotion/core'
import styled from '@emotion/styled'
import React from 'react'
import { ifProp, prop, switchProp } from 'styled-tools'

import { hexToRGBA } from 'lib/hex-to-rgba'
import { theme } from 'lib/theme'

export const Button = ({
  type,
  children,
  icon,
  disabled,
  padding = theme.padding.button.medium,
  fontWeight = 500,
  iconSize = 21,
  className,
  onClick,
}) => {
  return (
    <Container {...{ padding, disabled, type, className, onClick, fontWeight }}>
      {icon && <IconContainer size={iconSize}>{icon}</IconContainer>}
      {children}
    </Container>
  )
}

const IconContainer = styled.div`
  margin-right: 11px;
  color: inherit;
  position: relative;
  top: 1px;
  width: ${prop('size')}px;
  height: ${prop('size')}px;
  & > svg {
    color: inherit;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
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
  font-weight: ${prop('fontWeight')};
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
      primary: css`
        background: ${theme.colors.primary};
        color: ${theme.colors.background};
        border: 2px solid ${theme.colors.primary};
        &:after {
          background: ${hexToRGBA(theme.colors.background, 0.1)};
        }
      `,
      secondary: css`
        background: ${theme.colors.background};
        box-shadow: 0px 0px 10px ${hexToRGBA(theme.colors.background, 0.35)};
        color: ${theme.colors.primary};
        border: 2px solid ${theme.colors.primary};
        &:after {
          background: ${hexToRGBA(theme.colors.primary, 0.1)};
        }
      `,
      outlined: css`
        background: transparent;
        color: ${theme.colors.background};
        border: 1px solid ${theme.colors.background};
        &:after {
          background: ${hexToRGBA(theme.colors.background, 0.1)};
        }
      `,
      invertedOutlined: css`
        background: ${theme.colors.background};
        color: ${theme.colors.text};
        border: 1px solid ${theme.colors.text};
        &:after {
          background: ${hexToRGBA(theme.colors.text, 0.1)};
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

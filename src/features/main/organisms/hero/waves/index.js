import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { theme } from 'lib/theme'
import React from 'react'
import WaveSvg from 'resources/icons/hero-wave.svg'
import { prop, switchProp } from 'styled-tools'

export const HeroWaves = () =>
  new Array(3).fill(0).map((_, idx) => (
    <SvgContainer key={idx} order={idx}>
      <WaveSvg />
    </SvgContainer>
  ))

const SvgContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  /* height: 75vh; */
  z-index: ${prop('order')};
  display: flex;
  justify-content: flex-start;
  animation: reveal 2s ease-in-out;
  & > svg {
    width: 100%;
    overflow: visible;
    position: relative;
    will-change: margin-left transform;
    ${switchProp('order', {
      0: `
        color: #52BAD9;
        animation: wave 4s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite,
         swell 2s ease infinite;
        height: 600px;
        opacity: 0.87;
      `,
      1: `
        animation: wave 5s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite,
         swell 3s ease infinite;
        animation-delay: 0.7s;
        // color: ${theme.colors.primary};
        color: #1A7AD2;
        height: 500px;
        opacity: 0.7;
      `,
      2: `
        animation: wave 8s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite,
         swell 5s ease infinite;
        animation-delay: 0.3s;
        color: ${theme.colors.darkcyan};
        height: 400px;
        opacity: 0.8;
      `,
    })}
  }
`

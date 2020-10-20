import styled from '@emotion/styled'
import React from 'react'
import { prop, switchProp } from 'styled-tools'

import { theme } from 'lib/theme'
import WaveSvg from 'resources/icons/hero-wave.svg'

const HeroWaves = () =>
  new Array(3).fill(0).map((_, idx) => (
    <SvgContainer key={idx} order={idx}>
      <WaveSvg />
    </SvgContainer>
  ))

const SvgContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: ${prop('order')};
  display: flex;
  justify-content: flex-start;
  animation: reveal 1.5s ease-in-out;
  pointer-events: none;
  & > svg {
    width: 100%;
    overflow: visible;
    position: relative;
    will-change: margin-left transform;
    ${switchProp('order', {
      0: `
        color: #52BAD9;
        animation: wave 4s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
        height: 600px;
        opacity: 0.87;
      `,
      1: `
        animation: wave 5s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
        animation-delay: 0.6s;
        // color: ${theme.colors.primary};
        color: #1A7AD2;
        height: 500px;
        opacity: 0.7;
      `,
      2: `
        animation: wave 8s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
        animation-delay: 0.3s;
        color: ${theme.colors.darkcyan};
        height: 400px;
        opacity: 0.8;
      `,
    })}
  }
`
export default HeroWaves

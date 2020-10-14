import styled from '@emotion/styled'
import { hexToRGBA } from 'lib/hex-to-rgba'
import { theme } from 'lib/theme'

export const GradientHeading = styled.h5`
  font-size: ${theme.font.size.XL * 0.8}px;
  font-weight: 800;
  font-family: ${theme.font.family.subheading};
  color: ${theme.colors.background};
  background: -webkit-linear-gradient(
    ${hexToRGBA(theme.colors.background, 0.6)},
    ${({ bottomColor }) =>
      hexToRGBA(bottomColor ? bottomColor : theme.colors.blogBackground, 1)}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 10px;
  margin-bottom: 20px;
  ${theme.media.smallTablet} {
    font-size: ${theme.font.size.XL * 0.55}px;
  }
`

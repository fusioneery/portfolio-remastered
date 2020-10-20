import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { FormattedMessage } from 'gatsby-plugin-intl'
import React from 'react'
import { prop } from 'styled-tools'

import { hexToRGBA } from 'lib/hex-to-rgba'
import { theme } from 'lib/theme'
import { Container } from 'ui/atoms/container'
import { InViewAnimation } from 'ui/atoms/in-view-animation'
import { Link } from 'ui/atoms/link'
import { Section } from 'ui/atoms/section'

const largeTextVariants = {
  visible: {
    scale: 1,
    transition: {
      duration: 0.45,
      delay: 0.25,
    },
  },
  hidden: {
    scale: 0.7,
  },
}

export const BlogLead = ({ paddingTop }) => {
  return (
    <OuterContainer {...{ paddingTop }}>
      <InnerContainer>
        <InViewAnimation variants={largeTextVariants}>
          <LargeText whileHover={{ scale: 1.1 }}>
            <WideLink to="/blog">
              <FormattedMessage id="blog" />
            </WideLink>
          </LargeText>
        </InViewAnimation>
        <InViewAnimation variants={largeTextVariants}>
          <Description>
            <FormattedMessage id="blog-lead" />
          </Description>
        </InViewAnimation>
      </InnerContainer>
    </OuterContainer>
  )
}

const Description = styled.p`
  color: ${hexToRGBA(theme.colors.background, 0.7)};
  padding: 0 ${theme.padding.container.medium};
  font-size: ${theme.font.size.L}px;
  ${theme.media.tablet} {
    margin-top: 20px;
    text-align: center;
  }
  ${theme.media.mobile} {
    font-size: ${theme.font.size.M}px;
  }
`

const WideLink = styled(Link)`
  display: block;
`

const LargeText = styled(motion.div)`
  background: -webkit-linear-gradient(
    ${hexToRGBA(theme.colors.background, 0.75)},
    ${hexToRGBA(theme.colors.seabed, 1)}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 14vw;
  font-weight: 800;
  line-height: 1.3;
  text-align: center;
`

const InnerContainer = styled(Container)`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const OuterContainer = styled(Section)`
  padding-top: ${prop('paddingTop')};
  background: linear-gradient(
    ${theme.colors.darkBackground} 0%,
    ${theme.colors.seabed} 80%
  );
`

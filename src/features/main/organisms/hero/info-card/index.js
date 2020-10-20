import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl'
import React from 'react'
import Typist from 'react-typist'
import { prop } from 'styled-tools'

import { MAIN_ANCHORS } from 'features/main/constants/anchors'
import { navigate } from 'gatsby'
import { hexToRGBA } from 'lib/hex-to-rgba'
import { theme } from 'lib/theme'
import CvIcon from 'resources/icons/cv.svg'
import PortfolioIcon from 'resources/icons/portfolio.svg'
import { Button } from 'ui/atoms/button'
import { Heading } from 'ui/atoms/heading'
import { InViewAnimation } from 'ui/atoms/in-view-animation'
import { Link } from 'ui/atoms/link'

import 'react-typist/dist/Typist.css'

const infoCardVariants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: 0.3,
    },
  },
  hidden: {
    y: -100,
    opacity: 0,
  },
}

const buttonsContainerVariants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
      delay: 0.4,
    },
  },
  hidden: {
    y: -10,
    opacity: 0,
  },
}

export const InfoCard = ({ resumeUrl, name, jobTitle, personDescription }) => {
  const isRus = useIntl().locale === 'ru'
  const descriptionWithParagraphes = personDescription.replace(/\n/gi, '<br />')
  return (
    <InViewAnimation variants={infoCardVariants}>
      <Container>
        <HeadingContainer>
          <Heading multiplier={isRus ? 1 : 1.2} fontWeight={600}>
            <Typist
              avgTypingDelay={100}
              stdTypingDelay={45}
              cursor={{
                show: true,
                blink: true,
                element: '|',
                hideWhenDone: true,
                hideWhenDoneDelay: 2500,
              }}
            >
              <Typist.Delay ms={2000} />
              {jobTitle}
            </Typist>
          </Heading>
          <Carriage>{`>`}</Carriage>
        </HeadingContainer>
        <Subheading size={isRus ? 33 : 40}>{name}</Subheading>
        <Description
          size={isRus ? 16 : 18}
          dangerouslySetInnerHTML={{ __html: descriptionWithParagraphes }}
        />
        <InViewAnimation>
          <ButtonsContainer variants={buttonsContainerVariants}>
            <Button fontWeight={600} type="primary" icon={<PortfolioIcon />}>
              <Link to={'/#' + MAIN_ANCHORS.Works}>
                <FormattedMessage id="button.portfolio" />
              </Link>
            </Button>
            <Button
              fontWeight={600}
              onClick={() =>
                navigate('https:' + resumeUrl, { target: '_blank' })
              }
              type="secondary"
              icon={<CvIcon />}
            >
              <FormattedMessage id="button.cv" />
            </Button>
          </ButtonsContainer>
        </InViewAnimation>
      </Container>
    </InViewAnimation>
  )
}

const ButtonsContainer = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  & > *:not(:first-of-type) {
    margin-left: 20px;
  }
  ${theme.media.smallTablet} {
    margin-top: 20px;
  }
`

const Description = styled.h3`
  margin-top: 40px;
  font-size: ${prop('size')}px;
  line-height: 1.75;
  font-family: ${theme.font.family.subheading};
  ${theme.media.smallTablet} {
    margin-top: 20px;
    font-size: 15px;
  }
`

const Subheading = styled.h2`
  font-size: ${prop('size')}px;
  color: ${hexToRGBA(theme.colors.text, 0.8)};
  margin-top: 30px;
  ${theme.media.smallTablet} {
    margin-top: 20px;
    font-size: ${({ size }) => size * 0.75}px;
  }
`

const Carriage = styled.div`
  font-size: 64px;
  position: absolute;
  top: 0;
  left: -50px;
  animation: 1s blink ease-in 5;
  ${theme.media.smallTablet} {
    display: none;
  }
`

const HeadingContainer = styled.div`
  position: relative;
`

const Container = styled(motion.div)`
  max-width: 780px;
  z-index: 100;
  will-change: transform;
  padding: 60px 100px;
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.tertiary};
  border-radius: 8px;
  margin: 0 auto;
  box-shadow: 0px 0px 50px ${hexToRGBA(theme.colors.text, 0.05)};
  ${theme.media.largeDesktop} {
    max-width: 740px;
  }
  ${theme.media.tablet} {
    margin: 0 20px;
  }
  ${theme.media.limitedHeight} {
    padding-top: 30px;
    padding-bottom: 45px;
  }
  ${theme.media.cardLimit} {
    padding: 20px 70px 35px 70px;
  }
  ${theme.media.mobile} {
    padding: 15px 20px 20px 20px;
    margin: 0 10px;
  }
`

import styled from '@emotion/styled'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import GatsbyImage from 'gatsby-image'
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl'
import { transparentize } from 'polished'
import React, { useState } from 'react'
import { isMobile } from 'react-device-detect'
import { ifProp, prop, switchProp } from 'styled-tools'

import { MAIN_ANCHORS } from 'features/main/constants/anchors'
import { hexToRGBA } from 'lib/hex-to-rgba'
import { theme } from 'lib/theme'
import WaveImg from 'resources/icons/gray-line.svg'
import externalIcon from 'resources/images/external.svg'
import dots from 'resources/images/plus-pattern.svg'
import { Button } from 'ui/atoms/button'
import { Container as UIContainer } from 'ui/atoms/container'
import { Heading } from 'ui/atoms/heading'
import { InViewAnimation } from 'ui/atoms/in-view-animation'
import { Link } from 'ui/atoms/link'
import { RichTextRenderer } from 'ui/molecules/rich-text-renderer'

const descriptionVariants = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.1,
    },
  },
  close: { opacity: 0 },
}

const buttonsVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.4,
    },
  },
  close: { opacity: 0, y: 20 },
}

const fillerVariants = {
  open: {
    background: `linear-gradient(var(--transparentColor) 0%, var(--color) 0.0001%)`,
    transition: {
      duration: 0.3,
    },
  },
  close: {
    background: `linear-gradient(var(--transparentColor) 30%, var(--color) 100%)`,
    transition: {
      duration: 0.5,
      delay: 0.3,
    },
  },
}

const workVariants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
  hidden: {
    y: -20,
    opacity: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export const Works = ({ works }) => {
  const intl = useIntl()
  const [hoveredWorkId, setHoveredWorkId] = useState(null)
  const worksByColumns = [0, 1].map((el) =>
    works.filter((_, idx) => idx % 2 === el)
  )
  const onWorkNameClick = (link) => (ev) => {
    window.open(link, { target: '_blank' })
  }
  return (
    <Container id={MAIN_ANCHORS.Works}>
      <Wave />
      <InnerContainer>
        <GridItem position="left" textBlock>
          <Heading
            as="h2"
            markColor={hexToRGBA(theme.colors.background, 0.1)}
            markHeight={20}
          >
            <FormattedMessage id="works.heading" />
          </Heading>
          <Description>
            <FormattedMessage id="works.desc.firstline" />
            <br />
            {isMobile ? (
              <FormattedMessage id="works.desc.secondline.action.tap" />
            ) : (
              <FormattedMessage id="works.desc.secondline.action.hover" />
            )}{' '}
            <FormattedMessage id="works.desc.secondline" />
          </Description>
          <Dots alt="All of my works." src={dots} />
        </GridItem>
        <GridItem position="right" isCols>
          {worksByColumns.map((column, idx) => (
            <Column key={idx}>
              {column.map((work, workIdx) => {
                const isHovered = work.contentful_id === hoveredWorkId
                return (
                  <InViewAnimation
                    key={work.contentful_id}
                    variants={workVariants}
                  >
                    <Work
                      onHoverStart={() => setHoveredWorkId(work.contentful_id)}
                      onTouchStart={() =>
                        isMobile
                          ? setHoveredWorkId(
                              isHovered ? null : work.contentful_id
                            )
                          : null
                      }
                      onHoverEnd={() => setHoveredWorkId(null)}
                    >
                      <AnimateSharedLayout>
                        <WorkImage fluid={work.image.fluid} />
                        <WorkFiller
                          variants={fillerVariants}
                          initial="close"
                          color={hexToRGBA(work.bgColor, 0.87)}
                          animate={isHovered ? 'open' : 'close'}
                        />
                        <WorkInnerContainer>
                          <WorkName
                            whileHover={{ opacity: 0.7 }}
                            onClick={onWorkNameClick(work.workLink)}
                            layout
                          >
                            {work.name}
                          </WorkName>
                          <AnimatePresence exitBeforeEnter>
                            {isHovered && (
                              <>
                                <DetailsContainer
                                  layout
                                  variants={descriptionVariants}
                                  initial="close"
                                  animate="open"
                                  exit="close"
                                >
                                  <WorkDescription
                                    linkColor={theme.colors.background}
                                    content={work.description.json}
                                  />
                                </DetailsContainer>
                                <WorkButtons
                                  layout
                                  variants={buttonsVariants}
                                  initial="close"
                                  animate="open"
                                  exit="close"
                                >
                                  {work.detailsLink && (
                                    <Button type="invertedOutlined">
                                      <Link to={work.detailsLink}>
                                        <FormattedMessage id="button.details" />
                                      </Link>
                                    </Button>
                                  )}
                                  {work.codeLink && (
                                    <Button
                                      type="outlined"
                                      onClick={onWorkNameClick(work.codeLink)}
                                    >
                                      <FormattedMessage id="button.code" />
                                    </Button>
                                  )}
                                </WorkButtons>
                              </>
                            )}
                          </AnimatePresence>
                        </WorkInnerContainer>
                        <ExternalLink
                          visible={isHovered}
                          href={work.workLink}
                          target="_blank"
                        >
                          <img alt="external link" src={externalIcon} />
                        </ExternalLink>
                      </AnimateSharedLayout>
                    </Work>
                  </InViewAnimation>
                )
              })}
            </Column>
          ))}
        </GridItem>
      </InnerContainer>
    </Container>
  )
}

const Wave = styled(WaveImg)`
  height: auto;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  color: ${theme.colors.tertiary};
`

const ExternalLink = styled.a`
  right: 15px;
  top: 15px;
  width: 18px;
  height: 18px;
  opacity: 0;
  position: absolute;
  z-index: 3;
  transition: opacity 0.2s ease-in-out;
  will-change: opacity;
  ${ifProp('visible', 'opacity: 0.7;')}
  &:hover {
    opacity: 1;
  }
  ${theme.media.smallMobile} {
    right: 10px;
    top: 10px;
    width: 14px;
    height: 14px;
  }
`

const DetailsContainer = styled(motion.div)`
  width: 100%;
`

const WorkDescription = styled(RichTextRenderer)`
  color: ${hexToRGBA(theme.colors.background, 0.8)};
  margin-top: 0.013vw;
  ${theme.media.tablet} {
    font-size: ${theme.font.size.S * 0.9}px;
  }
  @media ${theme.media.smallMobile} {
    font-size: ${theme.font.size.S * 0.8}px;
  }
`

const WorkFiller = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
  border-radius: ${theme.radius.card}px;
  --color: ${prop('color')};
  --transparentColor: ${({ color }) => transparentize(1, color)};
`

const WorkInnerContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 2;
  padding: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  ${theme.media.smallMobile} {
    padding: 15px;
  }
`

const WorkImage = styled(GatsbyImage)`
  border-radius: ${theme.radius.card}px;
  object-fit: cover;
`

const WorkButtons = styled(motion.div)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  & > div {
    margin-top: 20px;
    ${theme.media.tablet} {
      padding: 5px 10px;
      margin-top: 9px;
      font-size: ${theme.font.size.S}px;
    }
    ${theme.media.smallMobile} {
      padding: 3px 8px;
      font-size: ${theme.font.size.S * 0.8}px;
      margin-top: 6px;
    }
  }
`

const WorkName = styled(motion.h4)`
  font-size: ${theme.font.size.L}px;
  line-height: 1.3;
  color: ${theme.colors.background};
  font-family: ${theme.font.family.heading};
  font-weight: 700;
  position: relative;
  cursor: pointer;
  ${theme.media.tablet} {
    font-size: ${theme.font.size.L - 1}px;
  }
  ${theme.media.smallMobile} {
    font-size: ${theme.font.size.M}px;
  }
`

const Column = styled.div`
  ${theme.media.smallTablet} {
    max-width: 550px;
    margin: 0 auto;
    width: 100%;
  }
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const Work = styled(motion.article)`
  /* box-shadow: 0px 0px 60px hsl(208deg 32% 44% / 42%); */
  box-shadow: 0px 0px 80px hsl(208 42% 64% / 0.4);
  border-radius: ${theme.radius.card}px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  will-change: box-shadow;
  transition: box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: 0px 20px 150px hsl(208 42% 64% / 0.4);
  }
`

const Dots = styled.img`
  position: absolute;
  left: 80px;
  top: 190px;
  width: auto;
  height: 120px;
  ${theme.media.desktop} {
    left: unset;
    right: 40px;
    top: 2vw;
  }
  ${theme.media.tablet} {
    height: 90px;
  }
  ${theme.media.mobile} {
    display: none;
  }
`

const Description = styled.h6`
  color: white;
  opacity: 0.85;
  margin-top: 20px;
  line-height: 1.6;
  font-size: 16px;
`

const GridItem = styled.div`
  ${ifProp('textBlock', 'font-family: "Montserrat";')}
  ${ifProp(
    'isCols',
    `
    flex-grow: 5;
    flex-shrink: 2;
    flex-basis: auto;
    display: grid;
    grid-column-gap: 25px;
    grid-template-columns: repeat(auto-fit, minmax(368px, auto));
    ${theme.media.desktop} {
      grid-template-columns: repeat(2, 1fr);
      min-width: 360px;
      grid-gap: 35px;
      flex-basis: 0;
    }
    ${theme.media.smallTablet} {
      grid-template-columns: 1fr;
      min-width: unset;
    }
  `
  )}
  ${switchProp('position', {
    left: `
      flex: 2 2 250px;
      padding-right: 30px;
      ${theme.media.desktop} {
        flex-basis: 0;
        margin-bottom: 40px;
        padding-right: 0;
      }
    `,
    right: `
    flex-grow: 5;
    flex-shrink: 2;
    flex-basis: 500px;
    `,
  })}
`

const InnerContainer = styled.div`
  display: flex;
  max-width: ${theme.container.large};
  width: 100%;
  margin: 0 auto;
  position: relative;
  ${theme.media.largeDesktop} {
    max-width: ${theme.container.medium};
  }
  ${theme.media.desktop} {
    flex-direction: column;
  }
`

const Container = styled.section`
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 0;
  width: 100%;
  margin: 0 auto;
  position: relative;
  padding-top: 23vw;
  background: ${theme.colors.darkBackground};
  color: ${theme.colors.background};
`

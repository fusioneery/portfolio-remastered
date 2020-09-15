import styled from '@emotion/styled'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import GatsbyImage from 'gatsby-image'
import { FormattedMessage, Link, useIntl } from 'gatsby-plugin-intl'
import { darken } from 'polished'
import React, { useState } from 'react'
import { ifProp, prop, switchProp } from 'styled-tools'

import { theme } from 'lib/theme'
import ViewIcon from 'resources/images/eye.svg'
import sineWave from 'resources/images/sine-wave.svg'
import { Button } from 'ui/atoms/button'
import { Heading } from 'ui/atoms/heading'
import { RichTextRenderer } from 'ui/molecules/rich-text-renderer'
import { hexToRGBA } from 'lib/hex-to-rgba'

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
    background: `linear-gradient(var(--transparentColor) 0%, var(--color) 70%)`,
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

const workAnimation = {
  y: 0,
  opacity: 1,
  transition: {
    duration: 0.5,
  },
}

const workInitialAnim = {
  y: -20,
  opacity: 0,
  transition: {
    duration: 0.5,
  },
}

export const Works = ({ works }) => {
  const [hoveredWorkId, setHoveredWorkId] = useState(null)
  const worksByColumns = [0, 1].map((el) =>
    works.filter((_, idx) => idx % 2 === el).map((work) => work.node)
  )
  return (
    <Container id="works">
      <GridItem position="left" textBlock>
        <Heading>
          <FormattedMessage id="works.heading" />
        </Heading>
        <Description className="works__desc desc">
          <FormattedMessage id="works.desc" />
        </Description>
        <Wave alt="All of my works." src={sineWave} />
      </GridItem>
      <GridItem position="right" cols>
        {worksByColumns.map((column, idx) => (
          <Column key={idx}>
            {column.map((work, workIdx) => (
              <Work
                key={workIdx}
                animate={workAnimation}
                initial={workInitialAnim}
                onHoverStart={() => setHoveredWorkId(work.contentful_id)}
                onHoverEnd={() => setHoveredWorkId(null)}
              >
                <AnimateSharedLayout>
                  <WorkImage fluid={work.image.fluid} />
                  <WorkFiller
                    variants={fillerVariants}
                    initial="close"
                    color={work.bgColor}
                    animate={
                      work.contentful_id === hoveredWorkId ? 'open' : 'close'
                    }
                  />
                  <WorkInnerContainer>
                    <WorkName layout>{work.name}</WorkName>
                    <AnimatePresence exitBeforeEnter>
                      {work.contentful_id === hoveredWorkId && (
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
                            <Button type="secondary">Show details</Button>
                          </WorkButtons>
                        </>
                      )}
                    </AnimatePresence>
                  </WorkInnerContainer>
                </AnimateSharedLayout>
              </Work>
            ))}
          </Column>
        ))}
      </GridItem>
    </Container>
  )
}

const DetailsContainer = styled(motion.div)`
  width: 100%;
`

const WorkDescription = styled(RichTextRenderer)`
  color: ${hexToRGBA(theme.colors.background, 0.8)};
  margin-top: 20px;
`

const WorkFiller = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
  --color: ${prop('color')};
  --transparentColor: ${({ color }) => hexToRGBA(color, 0)};
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
`

const WorkImage = styled(GatsbyImage)``

const WorkButtons = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
`

const WorkName = styled(motion.h4)`
  font-size: ${theme.font.size.L}px;
  line-height: 1.3;
  color: ${theme.colors.background};
  font-family: ${theme.font.family.heading};
  font-weight: 700;
`

const Column = styled.div``

const Work = styled(motion.article)`
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.25);
  border-radius: ${theme.radius.card}px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 300px;
  position: relative;
`

const Wave = styled.img`
  position: absolute;
  left: -70px;
  top: 300px;
  width: auto;
  //   z-index: -1;
  height: 50px;
  ${theme.media.tablet} {
    height: 90px;
  }
`

const Description = styled.h6`
  color: rgba(0, 0, 0, 0.5);
  margin-top: 20px;
  line-height: 1.6;
  font-size: 16px;
`

const GridItem = styled.div`
  ${ifProp('textBlock', 'font-family: "Montserrat";')}
  ${ifProp(
    'cols',
    `
    flex-grow: 5;
    flex-shrink: 2;
    flex-basis: auto;
    display: grid;
    grid-column-gap: 25px;
    grid-template-columns: repeat(auto-fit, minmax(300px, auto));
  `
  )}
  ${switchProp('position', {
    left: `
    flex: 2 2 250px;
    padding-right: 30px;
    `,
    right: `
    flex-grow: 5;
    flex-shrink: 2;
    flex-basis: 500px;
    `,
  })}
`

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  //   min-height: 100vh;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 100px;
  margin: 0 auto;
  max-width: ${theme.container.medium};
  position: relative;
  margin-top: 12vw;
`

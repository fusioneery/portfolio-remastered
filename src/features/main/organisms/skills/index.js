import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { FormattedMessage } from 'gatsby-plugin-intl'
import React, { useRef } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { ifProp, prop } from 'styled-tools'

import { MAIN_ANCHORS } from 'features/main/constants/anchors'
import { sizes, theme } from 'lib/theme'
import { useWindowSize } from 'lib/use-window-size'
import { Container } from 'ui/atoms/container'
import { InViewAnimation } from 'ui/atoms/in-view-animation'
import { Section as UISection } from 'ui/atoms/section'

const skillVariants = {
  hidden: {
    opacity: 0,
    y: -25,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
    },
  }),
}

export const Skills = ({ skills }) => {
  const sectionRef = useRef()
  const windowSize = useWindowSize()
  const getFirstMargin = () => {
    const { width } = windowSize
    if (width / 1.1 > sizes.largeDesktop) {
      return Math.round((width - sizes.largeDesktop) / 2)
    } else {
      return Math.round(0.05 * width)
    }
  }
  return (
    <Section id={MAIN_ANCHORS.Skills} ref={sectionRef}>
      <BGText>
        <FormattedMessage id="skills.bg-text" />
      </BGText>
      <StyledScrollContainer hideScrollbars={false}>
        <List>
          {skills.map((skill, idx) => (
            <InViewAnimation
              externalRef={sectionRef}
              variants={skillVariants}
              key={skill.id}
            >
              <Skill
                firstMargin={getFirstMargin()}
                custom={idx}
                whileHover={{ y: -15 }}
              >
                <SkillImage
                  alt={skill.icon.description}
                  src={skill.icon.file.url}
                />
                <SkillHeading isLow={skill.isLow}>{skill.name}</SkillHeading>
                <SkillDesc>{skill.description}</SkillDesc>
              </Skill>
            </InViewAnimation>
          ))}
        </List>
      </StyledScrollContainer>
    </Section>
  )
}

const StyledScrollContainer = styled(ScrollContainer)`
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`

const SkillDesc = styled.p`
  margin-top: 8px;
  color: rgba(0, 0, 0, 0.5);
  font-size: ${theme.font.size.S}px;
  word-break: break-word;
  white-space: pre-wrap;
`

const SkillHeading = styled.p`
  margin-top: 20px;
  font-size: ${theme.font.size.L}px;
  font-weight: 600;
  white-space: normal;
  ${ifProp('isLow', 'opacity: 0.6;')}
`

const SkillImage = styled.img`
  max-width: 120px;
  height: 100px;
  object-fit: contain;
  ${theme.media.mobile} {
    height: 70px;
  }
`

const Skill = styled(motion.div)`
  padding: 20px 30px;
  scroll-snap-align: start;
  background: #fff;
  min-width: 170px;
  max-width: 170px;
  z-index: 5;
  border-radius: 5px;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.06);
  &:not(:first-of-type) {
    margin-left: 50px;
  }
  &:first-of-type {
    margin-left: ${prop('firstMargin')}px;
  }
  &:last-of-type {
    margin-right: 50px;
  }
  & > * {
    pointer-events: none;
  }
  ${theme.media.tablet} {
    padding: 12px 18px;
  }
  ${theme.media.mobile} {
    min-width: 140px;
  }
`

const List = styled.ul`
  display: flex;
  white-space: nowrap;
  position: relative;
  cursor: grab;
  padding-top: 30px;
  z-index: 5;
  scrollbar-width: none;
  margin-bottom: 3vw;
  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledContainer = styled(Container)`
  position: relative;
`

const BGText = styled.h2`
  color: black;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: black;
  position: absolute;
  font-family: ${theme.font.family.heading};
  font-weight: 800;
  top: 6%;
  left: 9%;
  font-size: min(15vw, 200px);
  ${theme.media.smallTablet} {
    font-size: 25vw;
  }
`

const Section = styled(UISection)`
  z-index: 1;
  background: ${theme.colors.tertiary};
  position: relative;
  padding-top: 17vw;
  padding-bottom: 40px;
`

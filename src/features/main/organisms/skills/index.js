import React from 'react'
import { theme } from 'lib/theme'
import { Container } from 'ui/atoms/container'
import styled from '@emotion/styled'
import { Section as UISection } from 'ui/atoms/section'
import WaveImg from 'resources/icons/gray-line.svg'

export const Skills = ({ skills }) => {
  console.log(skills)
  return (
    <Section>
      <StyledContainer>
        <BGText>Skills</BGText>
        <List></List>
      </StyledContainer>
      <Wave />
    </Section>
  )
}

const List = styled.ul`
  display: flex;
  padding: 4.5vh 0;
  padding-top: 20vh;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  cursor: grab;
  scrollbar-width: none;
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
  z-index: 2;
  font-weight: 800;
  top: 10%;
  left: 6%;
  font-size: 15vw;
`

const Wave = styled(WaveImg)`
  height: auto;
  width: 100%;
  position: absolute;
  color: ${theme.colors.tertiary};
`

const Section = styled(UISection)`
  z-index: 1;
  background: ${theme.colors.tertiary};
  position: relative;
  padding-bottom: 0;
`

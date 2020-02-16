import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useIntl, Link, FormattedMessage } from 'gatsby-plugin-intl'
import { prop, ifProp, switchProp } from 'styled-tools'
import { darken } from 'polished'
import sineWave from '../../../resources/images/sine-wave.svg'
import { Heading } from '../../../ui/atoms/heading'
import { theme } from '../../../lib/theme'

export const Works = () => {
  const [isShowingAll, setIsShowingAll] = useState(false)
  return (
    <Container>
      <GridItem position="left" textBlock>
        <Heading>
          <FormattedMessage id="works.heading" />
        </Heading>
        <Description className="works__desc desc">
          {isShowingAll && <FormattedMessage id="works.desc" />}
          {!isShowingAll && <FormattedMessage id="works.desc-2" />}
        </Description>
        <Button
          onClick={() => {
            setIsShowingAll(!isShowingAll)
          }}
        >
          {!isShowingAll && <FormattedMessage id="works.show-all" />}
          {isShowingAll && <FormattedMessage id="works.hide-all" />}
        </Button>
        <Wave alt="All of my works." src={sineWave} />
      </GridItem>
      <GridItem position="right" cols>
        {/* <div className="col work__col col--left">{leftWorks}</div>
        <div className="col work__col col--right">{rightWorks}</div> */}
      </GridItem>
    </Container>
  )
}

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

const Button = styled.p`
  color: ${theme.colors.primary};
  margin-top: 30px;
  cursor: pointer;
  font-weight: 400;
  font-size: 18px;
  text-decoration: underline;
  text-decoration-color: ${darken(0.2, theme.colors.lightblue)};
  transition: all 0.2s ease-in-out;
  transform-origin: left;
  &:hover {
    color: ${darken(0.5, theme.colors.primary)};
    text-decoration-color: ${darken(0.5, theme.colors.lightblue)};
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
  position: relative;
`

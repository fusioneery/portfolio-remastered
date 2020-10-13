import styled from '@emotion/styled'
import React from 'react'

import { theme } from 'lib/theme'

import { HeroFooter } from './footer'
import { Header } from 'features/main/organisms/header'
import { InfoCard } from './info-card'
import { HeroTicker } from './ticker'
import { HeroWaves } from './waves'

export const Hero = ({ personalData, contacts }) => {
  const {
    name,
    jobTitle,
    email,
    phone,
    personDescription: { personDescription },
    resume: {
      file: { url },
    },
  } = personalData[0]
  return (
    <Container itemScope itemType="http://schema.org/Person">
      <meta itemProp="name" content={name} />
      <meta itemProp="jobTitle" content={jobTitle} />
      <img
        alt={`${name} ${jobTitle}`}
        itemProp="image"
        style={{ display: 'none' }}
        src="https://vladabramov.pro/images/share.png"
      />
      <link itemProp="url" href="https://vladabramov.pro" />
      <Header />
      <InfoCard {...{ name, jobTitle, personDescription }} resumeUrl={url} />
      <HeroTicker />
      <HeroFooter {...{ email, phone, contacts }} />
      <HeroWaves />
    </Container>
  )
}

const Container = styled.div`
  background-color: ${theme.colors.secondary};
  min-height: 100vh;
  z-index: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

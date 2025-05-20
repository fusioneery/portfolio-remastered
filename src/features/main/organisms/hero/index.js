import React, { lazy, Suspense } from 'react'
import styled from '@emotion/styled'
import Div100vh from 'react-div-100vh'

import { Header } from 'features/main/organisms/header'
import { theme } from 'lib/theme'

import { HeroFooter } from './footer'
import { InfoCard } from './info-card'

const LazyWaves = lazy(() => {
  return Promise.all([
    import('./waves'),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports)
})

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
  const isClient = typeof window !== 'undefined'
  return (
    <Div100vh>
      <Container itemScope itemType="http://schema.org/Person">
        <meta itemProp="name" content={name} />
        <meta itemProp="jobTitle" content={jobTitle} />
        <img
          alt={`${name} ${jobTitle}`}
          itemProp="image"
          style={{ display: 'none' }}
          src="https://vladabramov.me/images/share.png"
        />
        <link itemProp="url" href="https://vladabramov.me" />
        <Header />
        <InfoCard {...{ name, jobTitle, personDescription }} resumeUrl={url} />
        <HeroFooter {...{ email, phone, contacts }} />
        {isClient && (
          <Suspense fallback={<div></div>}>
            <LazyWaves />
          </Suspense>
        )}
      </Container>
    </Div100vh>
  )
}

const Container = styled.div`
  background-color: ${theme.colors.secondary};
  height: 100%;
  z-index: 1;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

import styled from '@emotion/styled'
import Img from 'gatsby-image'
import { FormattedMessage } from 'gatsby-plugin-intl'
import React from 'react'

import { graphql, useStaticQuery } from 'gatsby'
import { SEO } from 'lib/seo'
import { Link } from 'ui/atoms/link'
import { Layout } from 'ui/molecules/layout'

import { theme } from '../lib/theme'

const IMAGE_QUERY = graphql`
  query {
    file(relativePath: { eq: "images/notfound.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

const NotFoundPage = () => {
  const imgData = useStaticQuery(IMAGE_QUERY)
  return (
    <Layout>
      <SEO forcedTitle="404" forcedDescription="Page Not Found" />
      <FullContainer>
        <Image fixed={imgData.file.childImageSharp.fixed} alt="404" />
        <Text>
          <FormattedMessage id="404" />
        </Text>
        <StyledLink to="/">
          <FormattedMessage id="goBack" />
        </StyledLink>
      </FullContainer>
    </Layout>
  )
}

const FullContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.background};
`

const StyledLink = styled(Link)`
  margin-top: 30px;
  font-size: 20px;
  color: ${theme.colors.darkblue};
  padding-bottom: 2px;
  border-bottom: 2px solid ${theme.colors.darkblue};
`

const Image = styled(Img)``

const Text = styled.h1`
  font-size: 48px;
  text-align: center;
  color: ${theme.colors.primary};
`

export default NotFoundPage

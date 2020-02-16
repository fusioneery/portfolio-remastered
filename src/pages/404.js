import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { useIntl, Link, FormattedMessage } from 'gatsby-plugin-intl'
import styled from '@emotion/styled'
import PageTitle from '../components/PageTitle'
import Container from '../components/Container'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
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
  const intl = useIntl()
  const imgData = useStaticQuery(IMAGE_QUERY)
  console.log(imgData)
  return (
    <Layout>
      <SEO title="404" description="Page Not Found" />
      <FullContainer>
        <Image fixed={imgData.file.childImageSharp.fixed} alt="404" />
        <Text className="not-found__text">
          <FormattedMessage id="404" />
        </Text>
        <StyledLink to="/" className="go-back">
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

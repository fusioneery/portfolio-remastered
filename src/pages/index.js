import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Footer } from '../features/index/footer'
import { Layout } from '../ui/molecules/layout'
import { Works } from '../features/index/works'

export const query = graphql`
  query allInfo($locale: String) {
    allContentfulContacts(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          node_locale
          name
          link
          icon {
            file {
              url
            }
          }
        }
      }
    }
    allContentfulPersonalData(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          email
          node_locale
          phone
          resume {
            file {
              url
            }
          }
        }
      }
    }
    allContentfulWork(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          isMinor
          name
          workLink
          image {
            fluid {
              base64
              srcWebp
              srcSetWebp
            }
          }
          description {
            json
          }
        }
      }
    }
  }
`

export default ({
  data: { allContentfulContacts, allContentfulPersonalData, allContentfulWork },
}) => {
  console.log(allContentfulWork)
  const footerData = {
    contacts: allContentfulContacts.edges,
    email: allContentfulPersonalData.edges[0].node.email,
    phone: allContentfulPersonalData.edges[0].node.phone,
    resume: allContentfulPersonalData.edges[0].node.resume.file.url,
  }
  return (
    <Layout>
      <Works works={allContentfulWork} />
      <Footer {...footerData} />
    </Layout>
  )
}
import React from 'react'

import { BlogLead } from 'features/blog/organisms/lead'
import { BlogPosts } from 'features/blog/post/posts'
import { Hero } from 'features/main/organisms/hero'
import { Skills } from 'features/main/organisms/skills'
import { graphql } from 'gatsby'

import { Works } from 'features/main/organisms/works/index'
import { Layout } from 'ui/molecules/layout'
import { SEO } from 'lib/seo'

export const query = graphql`
  query allInfo($locale: String) {
    allContentfulPersonalData(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          contentful_id
          email
          jobTitle
          name
          personDescription {
            personDescription
          }
          resume {
            file {
              url
            }
          }
          phone
        }
      }
    }
    allContentfulContacts(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          name
          link
          order
          icon {
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
          codeLink
          detailsLink
          contentful_id
          image {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
          bgColor
          description {
            json
          }
        }
      }
    }
    allContentfulSkills(
      filter: { node_locale: { eq: $locale } }
      sort: { order: ASC, fields: [order] }
    ) {
      edges {
        node {
          isLow
          name
          node_locale
          id
          order
          description
          icon {
            description
            file {
              url
            }
          }
        }
      }
    }
    allContentfulBlogPost(
      filter: { node_locale: { eq: $locale } }
      sort: { order: DESC, fields: [updatedAt] }
    ) {
      edges {
        node {
          body {
            json
          }
          color
          contentful_id
          slug
          pubDate
          title
          shownOnIndex
          tags {
            slug
            title
            id
          }
          description {
            description
          }
        }
      }
    }
  }
`

const mapEgdesToNodes = (edge) => edge.node

export default ({
  data: {
    allContentfulContacts,
    allContentfulPersonalData,
    allContentfulWork,
    allContentfulSkills,
    allContentfulBlogPost,
  },
}) => {
  return (
    <Layout>
      <SEO />
      <Hero
        contacts={allContentfulContacts.edges.map(mapEgdesToNodes)}
        personalData={allContentfulPersonalData.edges.map(mapEgdesToNodes)}
      />
      <Skills skills={allContentfulSkills.edges.map(mapEgdesToNodes)} />
      <Works works={allContentfulWork.edges.map(mapEgdesToNodes)} />
      <BlogLead paddingTop="15vh" />
      <BlogPosts
        padding
        posts={allContentfulBlogPost.edges
          .map(mapEgdesToNodes)
          .filter((post) => post.shownOnIndex)}
      />
    </Layout>
  )
}

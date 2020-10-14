import React from 'react'

import { BlogLead } from 'features/blog/organisms/lead'
import { BlogPosts } from 'features/blog/post/posts'
import { Header } from 'features/main/organisms/header'
import { graphql } from 'gatsby'
import { Layout } from 'ui/molecules/layout'

import { SEO } from 'lib/seo'
import { useLocation } from '@reach/router'
import { useIntl } from 'gatsby-plugin-intl'

const Posts = ({ data }) => {
  const { formatMessage, locale } = useIntl()
  const { origin } = useLocation()
  const isRus = locale === 'ru'
  const posts = data.allContentfulBlogPost.edges.map((post) => post.node)
  const ogImage = origin + (isRus ? '/images/blog-ru.png' : '/images/blog.png')

  return (
    <Layout>
      <SEO forcedTitle={formatMessage({ id: 'name' })} forcedImage={ogImage} />
      <Header variant="blog" />
      <BlogLead paddingTop="0px" />
      <BlogPosts padding {...{ posts }} />
    </Layout>
  )
}

export const query = graphql`
  query($locale: String!) {
    allContentfulBlogPost(
      sort: { fields: [pubDate], order: DESC }
      filter: { node_locale: { eq: $locale } }
    ) {
      edges {
        node {
          slug
          title
          pubDate
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

export default Posts

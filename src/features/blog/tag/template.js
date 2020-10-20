import styled from '@emotion/styled'
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl'
import React from 'react'

import { Header } from 'features/main/organisms/header'
import { graphql } from 'gatsby'
import { SEO } from 'lib/seo'
import { theme } from 'lib/theme'
import { Container } from 'ui/atoms/container'
import { GradientHeading } from 'ui/atoms/heading/gradient'
import { Link } from 'ui/atoms/link'
import { Layout } from 'ui/molecules/layout'

import { BlogPosts } from '../post/posts'

const TagTemplate = ({ data, pageContext }) => {
  const { title, blog_post } = data.contentfulTag
  const { formatMessage } = useIntl()
  return (
    <Layout>
      <SEO
        titleTemplate={`${formatMessage({ id: 'tag' })}: ${title}`}
        forcedDescription={`${formatMessage({ id: 'tag.heading' })}: ${title}`}
      />
      <Header variant="blog" />
      <TagNameSection>
        <GradientHeading bottomColor={theme.colors.seabed}>
          <FormattedMessage id="tag.heading" /> {title}
        </GradientHeading>
        <BackLink to="/blog">
          <FormattedMessage id="blog.goToPosts" />
        </BackLink>
      </TagNameSection>
      {blog_post?.length > 0 && (
        <BlogPosts
          padding
          posts={blog_post.sort((a, b) => a.pubDate - b.pubDate)}
        />
      )}
    </Layout>
  )
}

const BackLink = styled(Link)`
  text-decoration: underline;
  color: ${theme.colors.background};
  font-size: ${theme.font.size.L}px;
`

const TagNameSection = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const query = graphql`
  query($slug: String!, $locale: String!) {
    contentfulTag(slug: { eq: $slug }, node_locale: { eq: $locale }) {
      title
      slug
      blog_post {
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
`

export default TagTemplate

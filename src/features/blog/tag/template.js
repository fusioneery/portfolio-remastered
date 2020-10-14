import React from 'react'
import { graphql } from 'gatsby'
import { SEO } from 'lib/seo'
import { Layout } from 'ui/molecules/layout'
import { BlogPosts } from '../post/posts'
import { Header } from 'features/main/organisms/header'
import { BlogLead } from '../organisms/lead'
import { GradientHeading } from 'ui/atoms/heading/gradient'
import { theme } from 'lib/theme'
import { Container } from 'ui/atoms/container'
import { FormattedMessage, Link, useIntl } from 'gatsby-plugin-intl'
import styled from '@emotion/styled'

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
      <BlogPosts
        padding
        posts={blog_post.sort((a, b) => a.pubDate - b.pubDate)}
      />
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

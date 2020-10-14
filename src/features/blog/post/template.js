import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { FormattedMessage, Link, useIntl } from 'gatsby-plugin-intl'
import { Disqus } from 'gatsby-plugin-disqus'
import { useLocation } from '@reach/router'

import { PostBody } from 'features/blog/post/organisms/body'
import { TagsList } from 'features/blog/tag/organisms/list'
import { Header } from 'features/main/organisms/header'
import { graphql } from 'gatsby'
import { hexToRGBA } from 'lib/hex-to-rgba'
import { theme } from 'lib/theme'
import ArrowRightIcon from 'resources/icons/arrow-right.svg'
import { Heading } from 'ui/atoms/heading'
import { Layout } from 'ui/molecules/layout'

import { SEO } from 'lib/seo'
import { BlogPosts } from 'features/blog/post/posts'
import { getDateTitle } from 'lib/get-date-title'
import { useWindowSize } from 'lib/use-window-size'
import { GradientHeading } from 'ui/atoms/heading/gradient'

const PostTemplate = ({ data, pageContext }) => {
  const {
    title,
    description: { description },
    body: { json },
    updatedAtISO,
    ogImage,
    pubDate,
    tags,
    contentful_id,
    recommendations,
  } = data.contentfulBlogPost
  const { formatMessage } = useIntl()
  const { origin } = useLocation()
  const { language } = pageContext
  const dateTitle = getDateTitle(pubDate, language)
  const { isMobile } = useWindowSize()
  const disqusConfig = {
    identifier: contentful_id,
    title,
  }
  const image = ogImage?.file?.url
    ? `https:${ogImage.file.url}`
    : `${origin}/images/blog.png`
  const jsonLDMarkup = `{
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${title}",
    "image": [
      "https://example.com/photos/1x1/photo.jpg",
      "https://example.com/photos/4x3/photo.jpg",
      "https://example.com/photos/16x9/photo.jpg"
     ],
    "datePublished": "${pubDate}",
    "dateModified": "${updatedAtISO}",
    "description": "${description}",
    "inLanguage": "${language}",
    "mainEntityOfPage": "True",
    "author": {
      "@type": "Person",
      "name": "${formatMessage({ id: 'name' })}",
      "url": "https://vladabramov.pro",
      "jobTitle": "Frontend Developer"
    },
  }`
  return (
    <Layout>
      <SEO
        forcedTitle={title}
        forcedDescription={description}
        forcedImage={image}
      />
      <script type="application/ld+json">{jsonLDMarkup}</script>
      <Header variant="blog" />
      <OuterSection>
        <Container>
          {isMobile && (
            <MobileBackLink to="/blog">
              <MobileBackLinkIcon />
              <FormattedMessage id="blog.goToPosts" />
            </MobileBackLink>
          )}
          <TitleContainer>
            <BackLink to="/blog">
              <BackIcon />
            </BackLink>
            <Title markColor={hexToRGBA(theme.colors.background, 0.3)}>
              {title}
            </Title>
          </TitleContainer>
          <Pubdate time={updatedAtISO}>{dateTitle}</Pubdate>
          {tags?.length > 0 && <TagsList variant="post" tags={tags} />}
          <PostBody {...{ json }} />
          {recommendations?.length > 0 && (
            <>
              <GradientHeading>
                <FormattedMessage id="recommendations" />
              </GradientHeading>
              <BlogPosts
                bgColor={theme.colors.blogBackground}
                posts={recommendations}
              />
            </>
          )}
          <Disqus config={disqusConfig} />
        </Container>
      </OuterSection>
    </Layout>
  )
}

const MobileBackLink = styled(Link)`
  margin-bottom: 20px;
  text-decoration: underline;
  color: ${theme.colors.background};
  display: flex;
  align-items: center;
  font-size: ${theme.font.size.M}px;
`

const OuterSection = styled.section`
  min-height: calc(100vh - 47px);
  background: ${theme.colors.blogBackground};
`

const BackIcon = styled(ArrowRightIcon)`
  width: 36px;
  height: 36px;
  object-fit: contain;
  transform: rotate(180deg);
  color: white;
`

const MobileBackLinkIcon = styled(ArrowRightIcon)`
  width: 16px;
  height: 16px;
  object-fit: contain;
  transform: rotate(180deg);
  color: white;
  margin-right: 8px;
`

const BackLink = styled(Link)`
  position: absolute;
  left: -75px;
  top: 5px;
  display: block;
  opacity: 0.3;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 1;
  }
`

const TitleContainer = styled(motion.div)`
  position: relative;
`

const Pubdate = styled.time`
  font-size: ${theme.font.size.S}px;
  display: block;
  color: ${theme.colors.background};
  font-weight: 600;
  margin-top: 20px;
`

const Title = styled(Heading)`
  color: ${theme.colors.background};
  font-weight: 700;
  font-family: ${theme.font.family.heading};
`

const Container = styled.article`
  max-width: 760px;
  width: 100%;
  margin: 0 auto;
  padding: 30px;
`

export const query = graphql`
  query($slug: String!, $locale: String!) {
    contentfulBlogPost(slug: { eq: $slug }, node_locale: { eq: $locale }) {
      title
      slug
      contentful_id
      description {
        description
      }
      recommendations {
        title
        slug
        pubDate
        description {
          description
        }
        tags {
          title
          slug
        }
      }
      pubDate
      ogImage {
        file {
          url
        }
      }
      updatedAtISO: updatedAt(formatString: "YYYY-MM-DD")
      tags {
        title
        id
        slug
      }
      body {
        json
      }
    }
  }
`

export default PostTemplate

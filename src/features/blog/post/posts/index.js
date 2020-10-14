import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { navigate, useIntl } from 'gatsby-plugin-intl'
import React from 'react'

import { TagsList } from 'features/blog/tag/organisms/list'
import { hexToRGBA } from 'lib/hex-to-rgba'
import { theme } from 'lib/theme'
import ArrowRightIcon from 'resources/icons/arrow-right.svg'
import { mixinMaxWidth, mixinPadding } from 'ui/atoms/container'
import { InViewAnimation } from 'ui/atoms/in-view-animation'
import { getDateTitle } from 'lib/get-date-title'
import { ifProp, prop } from 'styled-tools'

const postVariants = {
  hidden: {
    opacity: 0.2,
    scale: 0.6,
  },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.3,
    },
  }),
}

const TRIM_HEADING_LENGTH = 45

const trimHeading = (title) => {
  if (title.length > TRIM_HEADING_LENGTH) {
    return title.substring(0, TRIM_HEADING_LENGTH) + '...'
  } else {
    return title
  }
}

export const BlogPosts = ({
  posts,
  bgColor = theme.colors.seabed,
  padding,
}) => {
  const { locale } = useIntl()
  const goToPost = (slug) => (ev) => {
    navigate(`/blog/${slug}`)
  }
  return (
    <OuterContainer {...{ bgColor }}>
      <InnerContainer {...{ padding }}>
        {posts.map((post, idx) => {
          const dateTitle = getDateTitle(post.pubDate, locale)
          return (
            <InViewAnimation variants={postVariants} key={idx}>
              <Post>
                <WideLink onClick={goToPost(post.slug)}>
                  <PostHeader>
                    <PostTitle>{trimHeading(post.title)}</PostTitle>
                    <PostPubdate>{dateTitle}</PostPubdate>
                    <PostDesc>{post.description.description}</PostDesc>
                  </PostHeader>
                  <PostFooter>
                    {post.tags?.length > 0 && <TagsList tags={post.tags} />}
                    <Arrow />
                  </PostFooter>
                </WideLink>
              </Post>
            </InViewAnimation>
          )
        })}
      </InnerContainer>
    </OuterContainer>
  )
}

const PostHeader = styled.div``

const PostPubdate = styled.time`
  margin-top: 5px;
  font-size: ${theme.font.size.S}px;
  display: block;
  color: ${theme.colors.text};
  font-weight: 600;
`

const WideLink = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  padding-top: 20px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  justify-content: space-between;
  ${theme.media.mobile} {
    padding: 20px;
    padding-top: 15px;
  }
`

const Arrow = styled(ArrowRightIcon)`
  width: 24px;
  height: 24px;
  object-fit: contain;
  margin-left: auto;
`

const PostFooter = styled.div`
  display: flex;
  align-items: flex-end;
`

const PostDesc = styled.p`
  font-size: ${theme.font.size.L}px;
  opacity: 0.8;
  color: ${theme.colors.text};
  margin-top: 10px;
  ${theme.media.mobile} {
    font-size: ${theme.font.size.M - 1}px;
  }
`

const PostTitle = styled.h4`
  color: black;
  font-size: 28px;
  font-family: ${theme.font.family.heading};
  font-weight: 800;
  ${theme.media.mobile} {
    font-size: 22px;
  }
`

const Post = styled(motion.article)`
  background: ${hexToRGBA(theme.colors.secondary, 0.8)};
  border-radius: 10px;
  transform-origin: center bottom;
  box-shadow: 0px 2px 15px ${hexToRGBA(theme.colors.background, 0.15)};
  transition: box-shadow, background 0.2s ease-in-out;
  &:hover {
    background: ${hexToRGBA(theme.colors.secondary, 1)};
    box-shadow: 0px 14px 45px ${hexToRGBA(theme.colors.background, 0.35)};
  }
`

const InnerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 30px;
  ${ifProp('padding', mixinPadding)}
  ${ifProp('padding', mixinMaxWidth)}
  ${theme.media.mobile} {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    grid-gap: 20px;
  }
`

const OuterContainer = styled.section`
  background: ${prop('bgColor')};
  padding-bottom: 60px;
`

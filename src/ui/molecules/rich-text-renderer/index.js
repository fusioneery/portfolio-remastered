import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import styled from '@emotion/styled'
import GatsbyImage from 'gatsby-image'
import { useIntl } from 'gatsby-plugin-intl'
import React, { useEffect, useState } from 'react'
import { prop } from 'styled-tools'

import { hexToRGBA } from 'lib/hex-to-rgba'
import { getFluidGatsbyImage } from 'lib/rich-text-fluid-image'
import { theme } from 'lib/theme'
import { getLocaleProp } from 'lib/get-locale-prop'
import { CodeRenderer } from 'ui/organisms/code-renderer'
import { useWindowSize } from 'lib/use-window-size'

const IMAGE_MAX_HEIGHT_FALLBACK = 400
const IMG_MAX_HEIGHT_COEF_WINDOW = 0.5
const CODEBLOCK_ENTRY_ID = 'codeBlock'

export const RichTextRenderer = ({
  content,
  type,
  className,
  pMargin = 10,
  otherMargin = 10,
  linkColor = theme.colors.highlight,
  linkBorderColor = hexToRGBA(theme.colors.background, 0.6),
  hSizes = {
    h1: 40,
    h2: 36,
    h3: 32,
    h4: theme.font.size.M,
    h5: theme.font.size.L,
    h6: theme.font.size.XL,
  },
}) => {
  const { locale } = useIntl()
  const fallbackLocale = locale === 'ru' ? 'en' : 'ru'
  const getCmpLocaleProp = (obj) =>
    getLocaleProp({ obj, locale, fallbackLocale })
  const [imageMaxHeight, setImageMaxHeight] = useState(
    IMAGE_MAX_HEIGHT_FALLBACK
  )
  const isSSR = typeof window === 'undefined'
  const { isMobile } = useWindowSize()
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
      [MARKS.ITALIC]: (text) => <Italic>{text}</Italic>,
      [MARKS.UNDERLINE]: (text) => <Mark>{text}</Mark>,
      [MARKS.CODE]: (text) => <Code>{text}</Code>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_, children) => (
        <Paragraph {...{ pMargin }}>{children}</Paragraph>
      ),
      [BLOCKS.HEADING_1]: (_, children) => (
        <H1 {...{ otherMargin }} size={hSizes.h1}>
          {children}
        </H1>
      ),
      [BLOCKS.HR]: () => <HR {...{ otherMargin }} />,
      [BLOCKS.HEADING_2]: (_, children) => (
        <H2 {...{ otherMargin }} size={hSizes.h2}>
          {children}
        </H2>
      ),
      [BLOCKS.HEADING_3]: (_, children) => (
        <H3 {...{ otherMargin }} size={hSizes.h3}>
          {children}
        </H3>
      ),
      // [BLOCKS.HEADING_4]: (_, children) => (
      //   <H4 {...{ otherMargin }} weight={hWeights.h4} size={hSizes.h4}>
      //     {children}
      //   </H4>
      // ),
      // [BLOCKS.HEADING_5]: (_, children) => (
      //   <H5 {...{ otherMargin }} weight={hWeights.h5} size={hSizes.h5}>
      //     {children}
      //   </H5>
      // ),
      // [BLOCKS.HEADING_6]: (_, children) => (
      //   <H6 {...{ otherMargin }} weight={hWeights.h6} size={hSizes.h6}>
      //     {children}
      //   </H6>
      // ),
      [BLOCKS.QUOTE]: (node) => {
        const UnTaggedChildren = documentToReactComponents(node, {
          renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => children,
            [BLOCKS.QUOTE]: (node, children) => children,
          },
        })
        return <Quote {...{ otherMargin }}>{UnTaggedChildren}</Quote>
      },
      [BLOCKS.UL_LIST]: (_, children) => (
        <UL {...{ otherMargin, isMobile }}>{children}</UL>
      ),
      [BLOCKS.OL_LIST]: (_, children) => (
        <OL {...{ otherMargin, isMobile }}>{children}</OL>
      ),
      [BLOCKS.LIST_ITEM]: (node) => {
        const UnTaggedChildren = documentToReactComponents(node, {
          renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => children,
            [BLOCKS.LIST_ITEM]: (node, children) => children,
          },
        })
        return <LI>{UnTaggedChildren}</LI>
      },
      [BLOCKS.EMBEDDED_ASSET]: ({
        data: {
          target: {
            fields: { title, file, description },
          },
        },
      }) => {
        const imgFile = getCmpLocaleProp(file)
        const altTitle = getCmpLocaleProp(description)
        const imgTitle = getCmpLocaleProp(title)
        if (!imgFile) return null
        const fluid = getFluidGatsbyImage(
          { file: imgFile },
          { maxHeight: imageMaxHeight }
        )
        return (
          <>
            <Image
              imgStyle={{ objectFit: 'contain', objectPosition: 'left center' }}
              maxHeight={imageMaxHeight}
              alt={altTitle}
              fluid={fluid}
            />
            {imgTitle && <ImageTitle>{imgTitle}</ImageTitle>}
          </>
        )
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const nodeType = node.data.target.sys.contentType.sys.id
        const isCodeBlock = nodeType === CODEBLOCK_ENTRY_ID
        const syntax = getCmpLocaleProp(node.data.target.fields.language)
        const code = getCmpLocaleProp(node.data.target.fields.code)
        const heading = getCmpLocaleProp(node.data.target.fields.heading)
        return isCodeBlock ? (
          <CodeRenderer {...{ syntax, code, heading }} />
        ) : null
      },
      [INLINES.HYPERLINK]: ({ data: { uri } }, text) => {
        return (
          <Link {...{ linkColor, linkBorderColor }} href={uri} target="_blank">
            {text}
          </Link>
        )
      },
    },
  }
  useEffect(() => {
    if (!isSSR)
      setImageMaxHeight(
        Math.round(window.innerHeight * IMG_MAX_HEIGHT_COEF_WINDOW)
      )
  }, [])
  return (
    <Container {...{ className }}>
      {documentToReactComponents(content, options)}
    </Container>
  )
}

const HR = styled.hr`
  border: none;
  border-bottom: 1px solid ${hexToRGBA(theme.colors.background, 0.2)};
  margin: ${prop('otherMargin')}px 0;
`

const Quote = styled.blockquote`
  margin: ${prop('otherMargin')}px -25px;
  margin-left: -30px;
  padding: 15px 25px;
  border-radius: 5px;
  background: ${hexToRGBA('#9fcdff', 0.1)};
  border-left: 5px solid ${theme.colors.breeze};
  ${theme.media.tablet} {
    margin: ${prop('otherMargin')}px 0;
  }
`

const LI = styled.li`
  font-family: inherit;
  display: list-item;
  padding-left: 0;
  margin-bottom: 10px;
  position: relative;
  ${theme.media.tablet} {
    padding-left: 25px;
  }
`

const OL = styled.ol`
  margin: ${prop('otherMargin')}px 0;
  font-family: inherit;
  counter-reset: rich-text;
  & li {
    counter-increment: rich-text;
    &::before {
      content: counter(rich-text);
      position: absolute;
      font-weight: bold;
      font-family: ${theme.font.family.subheading};
      left: -25px;
      top: -5%;
      font-size: 1.5rem;
      color: ${theme.colors.background};
      opacity: 0.4;
      ${theme.media.tablet} {
        left: 0;
      }
    }
  }
`

const UL = styled.ul`
  margin: ${prop('otherMargin')}px 0;
  font-family: inherit;
  list-style-position: outside;
  list-style-image: none;
  list-style: disc;
  & li {
    &::before {
      position: absolute;
      content: ' ';
      left: -20px;
      top: 45%;
      height: 7px;
      width: 7px;
      border-radius: 50%;
      background: ${theme.colors.background};
      opacity: 0.7;
      box-shadow: 0px 0px 10px ${hexToRGBA(theme.colors.background, 0.9)};
      ${theme.media.tablet} {
        left: 5px;
      }
    }
  }
`

const Italic = styled.i`
  color: ${theme.colors.breeze};
`

const Code = styled.code`
  position: relative;
  display: inline-block;
  font-family: 'Ubuntu Mono', monospace;
  letter-spacing: -0.5px;
  padding: 0px 6px;
  margin: 0px 2px;
  &::after {
    content: '';
    position: absolute;
    z-index: 0;
    top: 1px;
    left: 0;
    right: 0;
    bottom: 0px;
    opacity: 0.15;
    background: ${theme.colors.lightgray};
    border-radius: 3px;
  }
`

const Mark = styled.mark`
  position: relative;
  background-color: transparent;
  display: inline-block;
  letter-spacing: -0.5px;
  padding: 0px 6px;
  padding-bottom: 2px;
  margin: 0px 2px;
  font-weight: 500;
  color: ${hexToRGBA(theme.colors.background, 1)};
  background: ${hexToRGBA(theme.colors.primary, 0.8)};
  border-radius: 3px;
`

const ImageTitle = styled.i`
  font-size: ${theme.font.size.S}px;
  opacity: 0.8;
`

const Image = styled(GatsbyImage)`
  max-height: ${prop('maxHeight')}px;
`

const Link = styled.a`
  color: ${prop('linkColor')};
  font-weight: 500;
  position: relative;
  &::before {
    content: ' ';
    background: ${prop('linkBorderColor')};
    bottom: -2px;
    height: 2px;
    width: 100%;
    transition: all 0.5s ease-in-out;
    position: absolute;
  }
  &:hover {
    &::before {
      width: 25%;
    }
  }
`

const Paragraph = styled.p`
  line-height: 1.4;
  margin-top: ${prop('pMargin')}px;
  margin-bottom: ${prop('pMargin')}px;
  font-size: inherit;
  font-family: ${theme.font.family.body};
`

const H1 = styled.h1`
  font-weight: 800;
  font-size: ${prop('size')}px;
  font-family: ${theme.font.family.heading};
  margin-top: 20px;
  margin-bottom: 40px;
  ${theme.media.mobile} {
    font-size: ${({ size }) => size * 0.7}px;
  }
`

const H2 = styled(H1)`
  font-weight: 700;
  font-size: ${prop('size')}px;
  margin-bottom: 30px;
`

const H3 = styled(H2)`
  font-weight: 600;
  font-size: ${prop('size')}px;
`

const H4 = styled.h4`
  font-weight: ${prop('weight')};
  font-size: ${prop('size')}px;
`

const H5 = styled.h5`
  font-weight: ${prop('weight')};
  font-size: ${prop('size')}px;
`

const H6 = styled.h6`
  font-weight: ${prop('weight')};
  font-size: ${prop('size')}px;
`

const Container = styled.div`
  line-height: 1.5;
  font-family: ${theme.font.family.body};
`

const Bold = styled.b`
  font-weight: 600;
`

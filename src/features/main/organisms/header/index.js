import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { changeLocale, FormattedMessage, useIntl } from 'gatsby-plugin-intl'
import React from 'react'
import { ifProp, prop } from 'styled-tools'

import { theme } from 'lib/theme'
import blogIcon from 'resources/images/blog.svg'
import { InViewAnimation } from 'ui/atoms/in-view-animation'
import { Link } from 'ui/atoms/link'

const headerIndexVariants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.15,
      duration: 0.5,
    },
  },
  hidden: {
    y: -20,
    opacity: 0,
  },
}

const getLocalTheme = (variant) => {
  switch (variant) {
    case 'blog':
      return {
        textColor: theme.colors.background,
        bgColor: theme.colors.darkBackground,
        langColor: theme.colors.background,
      }
    default:
      return {
        textColor: theme.colors.darkblue,
        bgColor: 'transparent',
        langColor: theme.colors.darkcyan,
      }
  }
}

export const Header = ({ variant = 'main' }) => {
  const { locale } = useIntl()
  const changeLang = (lang) => (ev) => {
    changeLocale(lang)
  }
  const isBlog = variant === 'blog'
  const localTheme = getLocalTheme(variant)
  return (
    <InViewAnimation variants={isBlog ? null : headerIndexVariants}>
      <Container bgColor={localTheme.bgColor}>
        <PrimaryLink to={isBlog ? '/' : '/blog'}>
          {!isBlog && <PrimaryLinkIcon src={blogIcon} alt="Blog" />}
          <PrimaryLinkText color={localTheme.textColor}>
            {isBlog ? (
              <FormattedMessage id="about" />
            ) : (
              <FormattedMessage id="blog" />
            )}
          </PrimaryLinkText>
        </PrimaryLink>
        {/* <Langs color={localTheme.langColor}>
          <Lang onClick={changeLang('en')} isCurrent={locale === 'en'}>
            EN
          </Lang>
          <LangDelimiter>/</LangDelimiter>
          <Lang onClick={changeLang('ru')} isCurrent={locale === 'ru'}>
            RU
          </Lang>
        </Langs> */}
      </Container>
    </InViewAnimation>
  )
}

const LangDelimiter = styled.span`
  margin: 0 7px;
  bottom: 2px;
  position: relative;
  font-weight: 600;
  color: inherit;
`

const Lang = styled.li`
  display: inline-block;
  font-weight: bold;
  position: relative;
  font-size: ${theme.font.size.M}px;
  color: inherit;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    animation: lining 0.2s ease-in-out;
    left: 0;
    height: 2px;
    width: 0%;
    background: transparent;
    transition: all 0.2s ease-in-out;
  }
  &:hover::after {
    width: 100%;
    background: currentColor;
  }
  ${ifProp(
    'isCurrent',
    css`
      transition: all 0.1s ease-in-out;
      &::after {
        content: ' ';
        position: absolute;
        bottom: -2px;
        animation: lining 0.3s ease-in-out;
        left: 0;
        height: 2px;
        width: 100%;
        background: currentColor;
        transition: all 0.1s ease-in-out;
      }
    `
  )}
`

const Langs = styled.ul`
  color: ${prop('color')};
`

const PrimaryLinkText = styled.span`
  color: ${prop('color')};
  font-size: ${theme.font.size.L * 1.1}px;
  position: relative;
  top: -6px;
  text-decoration: underline;
`

const PrimaryLinkIcon = styled.img`
  width: auto;
  height: 24px;
  display: inline-block;
`

const PrimaryLink = styled(Link)`
  z-index: 2;
  align-items: center;
  will-change: transform;
  justify-content: center;
  display: inline-block;
  transition: 0.6s ease;
  &:hover {
    transform: translateY(5px);
  }
`

const Container = styled(motion.header)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0 30px;
  padding-top: 30px;
  padding-bottom: 30px;
  background: ${prop('bgColor')};
  ${theme.media.mobile} {
    text-align: center;
  }
  ${theme.media.limitedHeight} {
    padding-top: 15px;
    padding-bottom: 10px;
  }
`

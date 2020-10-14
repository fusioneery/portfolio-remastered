import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { FormattedMessage, Link, useIntl } from 'gatsby-plugin-intl'
import React from 'react'

import { MAIN_ANCHORS } from 'features/main/constants/anchors'
import { hexToRGBA } from 'lib/hex-to-rgba'
import { sortByOrder } from 'lib/sorts'
import { theme } from 'lib/theme'
import scrollDownIcon from 'resources/images/mousedown.png'
import { isMobile } from 'react-device-detect'

export const HeroFooter = ({ email, phone, contacts }) => {
  const { locale } = useIntl()
  const isRus = locale === 'ru'
  const contactsIcons = contacts
    .sort(sortByOrder)
    .filter((contact) => (isRus ? true : contact.name.toLowerCase() !== 'hh'))
    .map(({ name, link, icon: { file: { url } } }) => (
      <IconLink key={name} href={link} target="_blank" rel="me">
        <IconLinkImage src={url} alt={name} />
      </IconLink>
    ))
  return (
    <Footer>
      <Container>
        <TextLink href={'mailto:' + email}>
          <TextContactHeading>
            <FormattedMessage id="contacts.email" />
          </TextContactHeading>
          <TextContactValue>{email}</TextContactValue>
        </TextLink>
        <TextLink href={'tel:' + phone}>
          <TextContactHeading>
            <FormattedMessage id="contacts.phone" />
          </TextContactHeading>
          <TextContactValue>{phone}</TextContactValue>
        </TextLink>
        <IconsList>{contactsIcons}</IconsList>
      </Container>
      {!isMobile && (
        <StyledScrollDownLink to={'/#' + MAIN_ANCHORS.Skills}>
          <ScrollDownIcon alt="scroll down" src={scrollDownIcon} />
        </StyledScrollDownLink>
      )}
    </Footer>
  )
}

const StyledScrollDownLink = styled(Link)`
  position: absolute;
  bottom: 30px;
  left: calc(50% - 18px);
`

const ScrollDownIcon = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
`

const IconLinkImage = styled.img`
  width: 100%;
  height: 100%;
`

const IconLink = styled.a`
  width: 30px;
  height: 30px;
  transition: opacity 0.2s ease-in-out;
  &:not(:first-of-type) {
    margin-left: 17px;
  }
  &:hover {
    opacity: 0.6;
  }
`

const IconsList = styled.ul`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ${theme.media.tablet} {
    margin-top: 15px;
  }
`

const TextContactValue = styled.p`
  font-size: ${theme.font.size.M * 0.9}px;
  font-family: ${theme.font.family.subheading};
  display: inline-block;
  margin-top: 5px;
  letter-spacing: 0.4px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    animation: lining 0.3s ease-in-out;
    left: 0;
    height: 2px;
    width: 0;
    background: transparent;
    transition: all 0.3s ease-in-out;
  }
`

const TextContactHeading = styled.p`
  font-size: ${theme.font.size.M}px;
  font-weight: bold;
`

const TextLink = styled.a`
  display: block;
  &:hover > p::after {
    width: 100%;
    background: ${hexToRGBA(theme.colors.background, 0.7)};
  }
  &:not(:nth-of-type(1)) {
    margin-top: 20px;
    ${theme.media.tablet} {
      margin-top: 10px;
    }
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 30px;
  z-index: 15;
  width: 100%;
  color: ${theme.colors.background};
  ${theme.media.limitedHeight} {
    padding-top: 7px;
    padding-bottom: 15px;
  }
`

const Container = styled(motion.address)`
  display: block;
`

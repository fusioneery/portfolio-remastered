import styled from '@emotion/styled'
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl'
import React from 'react'
import { ifProp, switchProp } from 'styled-tools'

import { MAIN_ANCHORS } from 'features/main/constants/anchors'
import { graphql, useStaticQuery } from 'gatsby'
import { sortByOrder } from 'lib/sorts'
import { theme } from 'lib/theme'
import { Link } from 'ui/atoms/link'

export const Footer = () => {
  const { locale } = useIntl()
  const isRus = locale === 'ru'
  const getNodeAndFilterByLocale = (arr) =>
    arr.map((el) => el.node).filter((el) => el.node_locale === locale)
  const { allContentfulPersonalData, allContentfulContacts } = useStaticQuery(
    graphql`
      query footerInfo {
        allContentfulPersonalData {
          edges {
            node {
              node_locale
              email
              resume {
                file {
                  url
                }
              }
              phone
            }
          }
        }
        allContentfulContacts {
          edges {
            node {
              node_locale
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
      }
    `
  )
  const contacts = getNodeAndFilterByLocale(allContentfulContacts.edges)
  const { email, phone } = getNodeAndFilterByLocale(
    allContentfulPersonalData.edges
  )[0]
  const resume = getNodeAndFilterByLocale(allContentfulPersonalData.edges)[0]
    .resume.file.url
  const contactsList = contacts
    .filter((contact) => (isRus ? true : contact.name.toLowerCase() !== 'hh'))
    .sort(sortByOrder)
    .map(({ name, link }, i) => (
      <FooterContact key={i} to={link} target="_blank" rel="me">
        {name}
      </FooterContact>
    ))
  return (
    <UIFooter>
      <Cols>
        <Col type="first">
          <div>
            <div>
              <FooterLink to={resume} isMain>
                <FormattedMessage id="footer.cv" />
              </FooterLink>
            </div>
            <FooterLink to="/blog" isMain>
              <FormattedMessage id="blog" />
            </FooterLink>
          </div>
          <div>
            <FooterLink to={'/#' + MAIN_ANCHORS.Skills}>
              <FormattedMessage id="footer.myskills" />
            </FooterLink>
            <FooterLink to={'/#' + MAIN_ANCHORS.Works}>
              <FormattedMessage id="footer.myworks" />
            </FooterLink>
          </div>
        </Col>
        <Col type="second">{contactsList}</Col>
        <Col type="third">
          <FooterExternalLink to={'mailto:' + email} isMain>
            {email}
          </FooterExternalLink>
          <FooterExternalLink to={'tel:' + phone} isMain>
            {phone}
          </FooterExternalLink>
        </Col>
      </Cols>
      <Copyright>
        <CopyrightText>
          <FormattedMessage id="copyright" />
          <Heart>❤</Heart>
        </CopyrightText>
      </Copyright>
    </UIFooter>
  )
}

const FooterContact = styled(Link)`
  font-size: 18px;
  margin-top: 20px;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    animation: lining 0.3s ease-in-out;
    left: 0;
    height: 1px;
    width: 0;
    background: transparent;
    transition: all 0.1s ease-in-out;
  }
  &:hover:after {
    width: 100%;
    background: rgba(255, 255, 255, 0.4);
  }
`

const FooterLink = styled(Link)`
  text-align: center;
  font-size: 16px;
  margin-top: 10px;
  display: block;
  ${ifProp(
    'isMain',
    `
      transition: all .15s ease-in;
      font-size: 18px;
      display: inline-block;
      padding-bottom: 2px;
      border-bottom: 2px solid rgba(255,255,255,0.5);
      &:hover {
        border-bottom-color: transparent;
      }
    `
  )}
`

const FooterExternalLink = styled(Link)`
  text-align: center;
  font-size: 16px;
  margin-top: 10px;
  display: block;
  position: relative;
  margin-top: 20px;
  transition: all 0.15s ease-in;
  font-size: 18px;
  display: inline-block;
  padding-bottom: 2px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  &:hover {
    border-bottom-color: transparent;
  }
`

const UIFooter = styled.footer`
  z-index: 5;
  font-family: 'Montserrat';
`

const Heart = styled.i`
  display: inline-block;
  color: red;
  opacity: 0.8;
  animation: heart 1.5s linear 0s infinite;
  font-style: normal;
`

const Copyright = styled.div`
  background: #1e355f;
  text-align: center;
  padding: 10px 0;
`

const CopyrightText = styled.p`
  color: white;
  font-size: 13px;
`

const Cols = styled.div`
  padding: 40px 5%;
  background: radial-gradient(
      407.63px at 50% 50%,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.1) 100%
    ),
    #202020;
  color: rgba(255, 255, 255, 0.8);
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 3fr 1fr 3fr;
  ${theme.media.tablet} {
    grid-template-columns: 1fr;
  }
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${switchProp('type', {
    first: `
    justify-content: space-between;
    text-align: center;
    `,
    second: `
    justify-content: flex-end;
    `,
    third: `
    justify-content: flex-end;
    `,
  })}
`

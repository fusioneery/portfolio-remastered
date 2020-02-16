import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useIntl, Link, FormattedMessage } from 'gatsby-plugin-intl'
import { prop, ifProp, switchProp } from 'styled-tools'
import { ymGoal } from '../../../lib/analytics'
import { smoothScroll } from '../../../lib/smooth-scroll'

export const Footer = ({ contacts, email, phone, resume }) => {
  const [skillsHeight, setSkillsHeight] = useState(0)
  const [worksHeight, setWorksHeight] = useState(0)
  const intl = useIntl()
  const contactsList = contacts.map(({ node: { name, link } }, i) => (
    <FooterContact key={i} href={link} target="_blank" rel="me">
      {name}
    </FooterContact>
  ))
  return (
    <UIFooter>
      <Cols>
        <Col type="first">
          <div>
            <FooterLink href={resume} onClick={() => ymGoal('resume')} main>
              <FormattedMessage id="footer.cv" />
            </FooterLink>
          </div>
          <div>
            <FooterLink
              onClick={e => {
                e.preventDefault()
                smoothScroll(skillsHeight)
              }}
            >
              <FormattedMessage id="footer.myskills" />
            </FooterLink>
            <FooterLink onClick={() => smoothScroll(worksHeight)}>
              <FormattedMessage id="footer.myworks" />
            </FooterLink>
          </div>
        </Col>
        <Col type="second">{contactsList}</Col>
        <Col type="third">
          <FooterLink href={'mailto:' + email} main>
            {email}
          </FooterLink>
          <FooterLink href={'tel:' + phone} main>
            {phone}
          </FooterLink>
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
    'main',
    `
      margin-top: 20px;
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

const UIFooter = styled.footer`
  z-index: 5;
  font-family: 'Montserrat';
`

const Heart = styled.i`
  display: inline-block;
  color: red;
  opacity: 0.8;
  animation: heart 1.5s linear 0s infinite;
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
  padding: 40px 12vw;
  background: radial-gradient(
      407.63px at 50% 50%,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.1) 100%
    ),
    #202020;
  color: rgba(255, 255, 255, 0.8);
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(200px, auto));
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${switchProp('type', {
    first: `
    justify-content: space-between
    `,
    second: `
    justify-content: flex-end
    `,
    third: `
    justify-content: flex-end
    `,
  })}
`

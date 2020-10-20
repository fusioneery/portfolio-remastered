import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { Link as GatsbyLink, useIntl } from 'gatsby-plugin-intl'
import React from 'react'

export const Link = ({ children, to, className, ...other }) => {
  const isInternal = /^\/(?!\/)/.test(to)
  const isAnchor = to.includes('#')
  const { locale } = useIntl()
  if (isAnchor) {
    return (
      <AnchorLink
        stripHash
        to={`/${locale}${to}`}
        {...{ children, className }}
        {...other}
      />
    )
  }
  if (isInternal) {
    return <GatsbyLink {...{ to, children, className }} />
  }
  return (
    <a
      href={to}
      rel="noreferrer"
      target="_blank"
      {...{ children, className }}
    />
  )
}

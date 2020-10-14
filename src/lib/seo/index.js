import React from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'

import { useIntl } from 'gatsby-plugin-intl'
import { useSiteMetadata } from 'hooks/use-site-metadata'

export const SEO = ({
  forcedTitle,
  forcedDescription,
  forcedImage,
  titleTemplate,
}) => {
  const { title, description, siteUrl, image } = useSiteMetadata()
  const { pathname, origin } = useLocation()
  const { locale } = useIntl()

  const metaDescription = description || forcedDescription
  const metaImage = forcedImage || siteUrl + image
  const metaTitle = forcedTitle || title

  return (
    <Helmet
      htmlAttributes={{
        lang: locale,
      }}
      title={metaTitle}
      titleTemplate={titleTemplate ? `%s | ${titleTemplate}` : null}
      defaultTitle={title}
    >
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="image" content={metaImage} />
      <meta name="description" content={metaDescription} />
      <meta name="author" content="Vlad Abramov" />

      <meta property="og:url" content={`${siteUrl}${pathname}`} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:description" content={metaDescription} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:creator" content="@fusioneery" />
    </Helmet>
  )
}

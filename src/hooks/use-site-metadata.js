import { useStaticQuery, graphql } from 'gatsby'
import { useIntl } from 'gatsby-plugin-intl'

export const useSiteMetadata = () => {
  const { formatMessage } = useIntl()
  const { site } = useStaticQuery(
    graphql`
      query siteMetaData {
        site {
          siteMetadata {
            siteUrl
            image
          }
        }
      }
    `
  )
  const title = formatMessage({ id: 'index.metaTitle' })
  const description = formatMessage({ id: 'index.metaDesc' })
  return { ...site.siteMetadata, title, description }
}

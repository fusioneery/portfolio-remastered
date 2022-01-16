export const sizes = {
  largeDesktop: 1440,
  desktop: 1240,
  tablet: 992,
  smallTablet: 768,
  mobile: 568,
  smallMobile: 375,
}
export const theme = {
  colors: {
    background: '#ffffff',
    darkBackground: '#0D121C',
    text: '#121212',
    primary: '#195B97',
    seabed: '#20464a',
    breeze: '#52BAD9',
    secondary: '#e9e9e9',
    blogBackground: '#1c2026',
    tertiary: '#f3f3f3',
    highlight: '#5b8bf7',
    darkblue: '#1A1145',
    darkcyan: '#10203C',
    lightblue: 'rgba(101, 148, 240, 0.18)',
    darkgray: '#8a8a8a',
    lightgray: '#cccccc',
  },
  sizes,
  radius: {
    card: 10,
    button: 4,
  },
  media: {
    largeDesktop: `@media (max-width: ${sizes.largeDesktop}px)`,
    desktop: `@media (max-width: ${sizes.desktop}px)`,
    tablet: `@media (max-width: ${sizes.tablet}px)`,
    smallTablet: `@media (max-width: ${sizes.smallTablet}px)`,
    mobile: `@media (max-width: ${sizes.mobile}px)`,
    smallMobile: `@media (max-width: ${sizes.smallMobile}px)`,
    limitedHeight: `@media (max-height: 770px), (max-width: ${sizes.mobile}px), (min-width: ${sizes.largeDesktop}px) and (max-height: 800px)`,
    cardLimit: `@media (max-width: 780px), (max-height: 630px)`,
  },
  container: {
    medium: '1360px',
    large: '1440px',
  },
  font: {
    family: {
      body: '"Source Sans Pro", Futura, Helvetica, Roboto, Arial, sans-serif-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      subheading: 'Montserrat',
      heading: 'Heading Pro Wide Trial',
    },
    size: {
      S: 14,
      M: 18,
      L: 20,
      XL: 56,
    },
  },
  padding: {
    button: {
      medium: '7px 13px',
      large: '14px 25px',
    },
    container: {
      medium: '30px',
      large: '5vw',
    },
  },
}

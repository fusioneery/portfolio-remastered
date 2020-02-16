require('@openfonts/source-sans-pro_cyrillic')
require('@openfonts/montserrat_cyrillic')
exports.onRouteUpdate = function({ location }) {
  if (typeof ym === `function`) {
    if (location && typeof window.ym == `undefined`) {
      return
    }

    // wrap inside a timeout to make sure react-helmet is done with it's changes (https://github.com/gatsbyjs/gatsby/issues/9139)
    // reactHelmet is using requestAnimationFrame so we should use it too: https://github.com/nfl/react-helmet/blob/5.2.0/src/HelmetUtils.js#L296-L299
    const sendPageView = () => {
      if (process.env.NODE_ENV === 'development') {
        console.log(
          process.env.GATSBY_YM_ID,
          'pageVisit',
          location
            ? location.pathname + location.search + location.hash
            : undefined
        )
      }
      window.ym(
        process.env.GATSBY_YM_ID,
        'hit',
        location
          ? location.pathname + location.search + location.hash
          : undefined
      )
    }

    if (`requestAnimationFrame` in window) {
      requestAnimationFrame(() => {
        requestAnimationFrame(sendPageView)
      })
    } else {
      // simulate 2 rAF calls
      setTimeout(sendPageView, 32)
    }
  }
}

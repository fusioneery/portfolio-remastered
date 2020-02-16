module.exports = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  console.log(page.context.intl.language)
  deletePage(page)
  createPage({
    ...page,
    context: {
      ...page.context,
      locale: page.context.intl.language,
    },
  })
}

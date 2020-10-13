const config = require('../../../gatsby-config')
const query = require('../data/query')
const path = require(`path`)

module.exports = async ({ graphql, actions }) => {
  const { createPage } = actions

  const basePath = config.siteMetadata.basePath || '/'

  const postsQuery = await graphql(query.data.posts)
  const posts = postsQuery.data.allContentfulBlogPost.edges
  posts.forEach((post, i) => {
    const next = i === posts.length - 1 ? null : posts[i + 1].node
    const prev = i === 0 ? null : posts[i - 1].node

    createPage({
      path: `${basePath === '/' ? '' : basePath}/${post.node.slug}/`,
      component: path.resolve(`./src/features/blog/post/template.js`),
      context: {
        slug: post.node.slug,
        basePath: basePath === '/' ? '' : basePath,
        prev,
        next,
      },
    })
  })

  // Create a page containing all "posts".
  createPage({
    path: `/${basePath === '/' ? '' : basePath}/`,
    component: path.resolve(`./src/features/blog/post/posts/template.js`),
    context: {
      basePath: basePath === '/' ? '' : basePath,
    },
  })

  // Create "tag" page
  const tagsQuery = await graphql(query.data.tags)
  const tags = tagsQuery.data.allContentfulTag.edges

  tags.forEach((tag) => {
    createPage({
      path: `/${basePath === '/' ? '' : basePath}/tag/${tag.node.slug}/`,
      component: path.resolve(`./src/features/blog/tag/template.js`),
      context: {
        slug: tag.node.slug,
        basePath: basePath === '/' ? '' : basePath,
      },
    })
  })
}

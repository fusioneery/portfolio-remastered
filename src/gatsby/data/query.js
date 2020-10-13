module.exports.data = {
  posts: `{
    allContentfulBlogPost(sort: { fields: [updatedAt], order: DESC }) {
      edges {
        node {
          slug
          updatedAt
          node_locale
        }
      }
    }
  }`,
  tags: `{
    allContentfulTag {
      edges {
        node {
          slug
        }
      }
    }
  }`,
}

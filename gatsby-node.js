const path = require('path');
exports.createSchemaCustomization = require('./src/gatsby/node/createSchemaCustomization')
exports.createPages = require('./src/gatsby/node/createPages')
exports.onCreatePage = require('./src/gatsby/node/onCreatePage')
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
}
const path = require('path')
exports.createSchemaCustomization = require('./src/gatsby/node/createSchemaCustomization')
exports.createPages = require('./src/gatsby/node/createPages')
exports.onCreatePage = require('./src/gatsby/node/onCreatePage')
exports.onCreateWebpackConfig = ({ stage, actions, loaders }) => {
  let webpackConfig = {
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  }
  if (stage === 'build-html') {
    webpackConfig = {
      ...webpackConfig,
      module: {
        rules: [
          {
            test: /framer[^-]/,
            use: loaders.null(),
          },
        ],
      },
    }
  }
  actions.setWebpackConfig(webpackConfig)
}




const custom = require('../config/webpack/webpack.dev')

module.exports = {
  "webpackFinal": (config) => ({...config, module: {...config.module,rules:custom.module.rule}}),
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}
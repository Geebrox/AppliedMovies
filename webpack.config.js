const { merge } = require('webpack-merge')
const baseConfig = require('./webpack/webpack.base')

const envsList = {
  development: 'dev',
  production: 'prod',
  test: 'dev'
}

const env = envsList[process.env.NODE_ENV || 'development']
const envConfig = require(`./webpack/webpack.${env}.js`)

module.exports = merge(baseConfig, envConfig)

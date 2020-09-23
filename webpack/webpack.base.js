const PATHS = require('./paths')
const webpack = require('webpack')
const dotenv = require('dotenv')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

const isProductionMode = process.env.NODE_ENV === 'production'
const isTestingMode = process.env.NODE_ENV === 'test'

const resolveEnvKeys = () => {
  if (process.env.NETLIFY) {
    console.log('Skipping dotenv configuration as webpack ran from netlify...')
    return {}
  }

  const envConfig = dotenv.config({
    path: PATHS.DOTENV_PATH
  }).parsed

  const envKeys = Object.keys(envConfig).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(envConfig[next])
    return prev
  }, {})

  return envKeys
}

const resolve = {
  alias: {
    assets: PATHS.ASSETS_PATH,
    utils: PATHS.UTILS_PATH,
    services: PATHS.SERVICES_PATH,
    componetns: PATHS.COMPONENTS_PATH,
    pages: PATHS.PAGES_PATH,
    contexts: PATHS.CONTEXTS_PATH
  },
  modules: ['src', 'node_modules'],
  extensions: ['.js', '.jsx', '.json', '.scss', '.css', '*']
}

const rules = [
  {
    enforce: 'pre',
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    options: {
      formatter: 'table',
      emitWarning: !isProductionMode,
      failOnError: isProductionMode
    }
  },
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  },
  {
    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          outputPath: PATHS.FONTS_FOLDER,
          name: isProductionMode
            ? '[sha512:hash:base64:7].[ext]'
            : '[path][name].[ext]'
        }
      }
    ]
  },
  {
    test: /\.(gif|svg)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          outputPath: PATHS.IMAGES_FOLDER,
          name: isProductionMode
            ? '[sha512:hash:base64:7].[ext]'
            : '[path][name].[ext]'
        }
      }
    ],
    exclude: /node_modules/
  }
]

const plugins = [
  !isTestingMode && new webpack.ProgressPlugin(),
  new webpack.DefinePlugin(resolveEnvKeys()),
  new HtmlWebpackPlugin({
    template: PATHS.TEMPLATE_PATH
  }),
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'async'
  })
].filter(Boolean)

const modesList = {
  development: 'development',
  test: 'development',
  production: 'production'
}

module.exports = {
  mode: modesList[process.env.NODE_ENV || 'development'],
  entry: PATHS.ENTRY_PATH,
  resolve,
  module: {
    rules
  },
  plugins,
  stats: !isTestingMode
}

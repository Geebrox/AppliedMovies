const PATHS = require('./paths')
const webpack = require('webpack')

const isDevelopmentMode = process.env.NODE_ENV === 'development'

const output = {
  filename: 'bundle.js',
  path: PATHS.OUTPUT_PATH,
  chunkFilename: '[id].js',
  chunkLoadTimeout: 30000
}

const rules = [
  {
    test: /\.s?css$/,
    exclude: /\.module\.s?css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          localsConvention: 'camelCase'
        }
      },
      'postcss-loader',
      'sass-loader'
    ]
  },
  {
    test: /\.module\.s?css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          sourceMap: false,
          localsConvention: 'camelCase',
          modules: {
            localIdentName: '[local]_[hash:base64:5]'
          }
        }
      },
      'postcss-loader',
      'sass-loader'
    ]
  },
  {
    test: /\.(png|jpe?g)$/,
    exclude: /node_modules/,
    loader: 'file-loader'
  }
]

const devServer = {
  contentBase: PATHS.OUTPUT_PATH,
  host: 'localhost',
  port: 8080,
  hot: true,
  open: isDevelopmentMode,
  compress: true,
  historyApiFallback: isDevelopmentMode,
  overlay: {
    warnings: isDevelopmentMode,
    errors: isDevelopmentMode
  }
}

module.exports = {
  output,
  module: {
    rules
  },
  devServer,
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devtool: 'inline-source-map'
}

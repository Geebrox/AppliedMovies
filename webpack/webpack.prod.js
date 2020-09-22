const PATHS = require('./paths')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const output = {
  filename: `${PATHS.JS_FOLDER}/[name].[hash].js`,
  path: PATHS.OUTPUT_PATH,
  chunkFilename: `${PATHS.JS_FOLDER}/[name].[chunkhash].js`
}

const rules = [
  {
    test: /\.s?css$/,
    exclude: /\.module\.s?css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      },
      'postcss-loader',
      'sass-loader'
    ]
  },
  {
    test: /\.module\.s?css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: false,
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
    use: [
      {
        loader: 'file-loader',
        options: {
          outputPath: PATHS.IMAGES_FOLDER,
          name: '[sha512:hash:base64:7].[ext]'
        }
      },
      {
        loader: 'tinify-loader',
        options: {
          apikey: process.env.TINIFY_API_KEY_CI || process.env.TINIFY_API_KEY
        }
      }
    ]
  }
]

const plugins = [
  new CleanWebpackPlugin({ verbose: true }),
  new MiniCssExtractPlugin({
    filename: `${PATHS.CSS_FOLDER}/[name].[hash].css`,
    chunkFilename: `${PATHS.CSS_FOLDER}/[id].[hash].css`,
    ignoreOrder: false
  })
]

const optimization = {
  minimizer: [
    new TerserPlugin({
      parallel: true,
      cache: true,
      sourceMap: false
    })
  ],
  runtimeChunk: 'single',
  splitChunks: {
    chunks: 'all',
    maxInitialRequests: Infinity,
    minSize: 0,
    name: true,
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name(module) {
          const packageName = module.context.match(
            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
          )[1]
          return `npm.${packageName.replace('@', '')}`
        }
      },
      styles: {
        name: 'styles',
        test: /\.css$/,
        chunks: 'all',
        enforce: true
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      }
    }
  }
}

module.exports = {
  output,
  module: {
    rules
  },
  plugins,
  optimization
}

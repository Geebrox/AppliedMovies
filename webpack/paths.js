const { resolve } = require('path')

const ROOT_PATH = resolve(__dirname, '../')

module.exports = {
  ROOT_PATH,
  DOTENV_PATH: resolve(ROOT_PATH, '.env'),
  ENTRY_PATH: resolve(ROOT_PATH, 'src/index.jsx'),
  TEMPLATE_PATH: resolve(ROOT_PATH, 'src/index.html'),
  ASSETS_PATH: resolve(ROOT_PATH, 'src/assets'),
  UTILS_PATH: resolve(ROOT_PATH, 'src/utils'),
  SERVICES_PATH: resolve(ROOT_PATH, 'src/services'),
  COMPONENTS_PATH: resolve(ROOT_PATH, 'src/components'),
  PAGES_PATH: resolve(ROOT_PATH, 'src/pages'),
  CONTEXTS_PATH: resolve(ROOT_PATH, 'src/contexts'),
  OUTPUT_PATH: resolve(ROOT_PATH, 'dist'),
  IMAGES_FOLDER: 'img',
  FONTS_FOLDER: 'fonts',
  CSS_FOLDER: 'css',
  JS_FOLDER: 'js'
}

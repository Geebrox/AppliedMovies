import { fonts } from '../../package'

const BASE_PATH = 'https://fonts.googleapis.com/css2'

const FONTS_LIST = fonts.reduce((prev, curr) => {
  prev = `${prev}family=${curr.name.replace(
    ' ',
    '+'
  )}:wght@${curr.variants.join(';')}&`
  return prev
}, '?')

export default () => {
  return `${BASE_PATH}${FONTS_LIST}display=swap`
}

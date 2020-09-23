import axios from 'axios'

import NProgress from 'nprogress'

console.log('Checking netlify vars')
console.log({ baseURL: process.env.TMDB_API })

export const tmdbAPI = axios.create({
  baseURL: process.env.TMDB_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

tmdbAPI.interceptors.response.use(
  (response) => {
    NProgress.done()
    return response
  },
  (error) => {
    NProgress.done()
    return Promise.reject(error)
  }
)
tmdbAPI.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: process.env.TMDB_API_KEY,
    language: 'en-US'
  }
  NProgress.start()
  return config
})

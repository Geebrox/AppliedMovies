import axios from 'axios'

import NProgress from 'nprogress'

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

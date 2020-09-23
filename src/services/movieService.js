import { tmdbAPI } from './core'

export default {
  getLatestMovies: (params) =>
    tmdbAPI.get('/movie/now_playing', {
      params
    }),
  searchMovie: (query) =>
    tmdbAPI.get('/search/movie', {
      params: {
        query
      }
    }),
  getMovieDetails: (movie_id) => tmdbAPI.get(`/movie/${movie_id}`),
  getMovieCredits: (movie_id) => tmdbAPI.get(`/movie/${movie_id}/credits`)
}

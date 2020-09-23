import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const MovieContext = createContext()

const MovieProvider = ({ children }) => {
  const [movieList, setMovieList] = useState([])
  const [movieMaxPage, setMovieMaxPage] = useState(0)

  const getMovieList = (page, limit = 12) => {
    if (movieList.length < limit * page) return []
    return [...movieList.slice(limit * page - limit, limit * page)]
  }

  return (
    <MovieContext.Provider
      value={{
        movieList,
        getMovieList,
        setMovieList,
        movieMaxPage,
        setMovieMaxPage
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export { MovieProvider, MovieContext }

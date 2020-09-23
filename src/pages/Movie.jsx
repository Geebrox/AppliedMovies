import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import moviesService from 'services/movieService'

import classes from './Movie.module.scss'

import avatarImg from 'assets/images/avatar.svg'

const Badge = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-light-badge rounded-xxl p-2 font-inter text-sm w-30 ${className}`}
    >
      {children}
    </div>
  )
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

export const Movie = (props) => {
  const {
    match: {
      params: { id: movie_id }
    }
  } = props

  const [isLoading, setIsLoading] = useState(true)
  const [movieDetails, setMovieDetails] = useState({})
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    moviesService
      .getMovieDetails(movie_id)
      .then(async (response) => {
        if (response.status !== 200) return setIsError(true)

        const {
          data: {
            overview,
            vote_average,
            poster_path,
            production_companies,
            title,
            genres,
            release_date,
            runtime
          }
        } = response

        const {
          data: { cast }
        } = await moviesService.getMovieCredits(movie_id)

        const genresList = genres.reduce((prev, curr) => {
          prev.push(curr.name)
          return prev
        }, [])

        setMovieDetails({
          genres: genresList.join(', '),
          release_date: release_date.replace(/-/gim, '/'),
          runtime: `${Math.round(runtime / 60)}h ${runtime % 60}m`,
          overview,
          vote_average,
          poster_path,
          production_companies,
          credits: [...cast.splice(0, 4)],
          title
        })

        setIsLoading(false)
      })
      .catch(() => setIsError(true))
  }, [])

  return isError ? (
    <Redirect to="/" />
  ) : isLoading ? (
    <span>Loading...</span>
  ) : (
    <div className="flex justify-center items-center py-10 flex-col xl:flex-row xl:justify-between overflow-hidden">
      <div
        className="flex flex-col flex-grow max-w-xs space-y-6 w-40 mb-20 xl:mb-0"
        style={{
          minWidth: '348px'
        }}
      >
        <div
          className={`w-full overflow-hidden rounded-xxl bg-cover ${classes.responsivePoster}`}
          style={{
            backgroundImage: `url(${process.env.TMDB_IMAGES_PATH}${movieDetails.poster_path})`
          }}
        />
        <button className="w-full bg-light-secondary text-white flex justify-center items-center py-3 rounded-xxl space-x-9 font-inter font-semibold text-xl focus:outline-none focus:border-none hover:shadow-xl">
          <svg
            width="29"
            height="35"
            viewBox="0 0 29 35"
            fill="none"
            className="fill-current"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.87097 1L28 17.5L1.87097 34L1 1H1.87097Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Watch now</span>
        </button>
      </div>

      <div className="max-w-xxl flex-grow space-y-10 xl:ml-20 px-10 xl:px-0 xl:pr-10">
        <h1 className="text-light-title font-playfairDisplay font-bold text-4xl">
          {movieDetails.title}
        </h1>
        <div className="space-y-8 flex w-full flex-col">
          <div className="flex space-x-5 items-center">
            <Badge>{movieDetails.release_date}</Badge>
            <Badge>{movieDetails.genres}</Badge>
            <Badge>{movieDetails.runtime}</Badge>
            <Badge className="flex items-center space-x-2 text-light-secondary fill-current font-bold cursor-pointer select-none hover:shadow-md">
              <svg
                width="12"
                height="16"
                viewBox="0 0 29 35"
                fill="none"
                className="fill-current"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.87097 1L28 17.5L1.87097 34L1 1H1.870  97Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Play trailer</span>
            </Badge>
          </div>
          <div className="flex space-x-5 items-center">
            <Badge className="bg-light-yellow text-black font-inter font-extrabold text-xl py-0 m-0">
              IMDb
            </Badge>
            <span className="text-light-title font-roboto text-2xl">
              {movieDetails.vote_average} <span className="text-base">/10</span>
            </span>
          </div>
          <div className="text-light-title font-inter">
            <h1 className="font-bold text-lg">Overview</h1>
            <p className="font-normal text-base text-black">
              {movieDetails.overview}
            </p>
          </div>
          <hr className="text-light-grey" />
          <div className="flex w-full space-x-10 justify-center">
            {movieDetails.credits.map((credit, idx) => (
              <div
                key={idx}
                className="flex flex-col font-inter text-sm text-center items-center"
              >
                <div className="rounded-full overflow-hidden h-12 w-12">
                  <img
                    className="w-full h-auto"
                    src={
                      credit.profile_path
                        ? `${process.env.TMDB_IMAGES_PATH}${credit.profile_path}`
                        : avatarImg
                    }
                    alt="Avatar"
                  />
                </div>

                <h1 className="font-bold">{credit.character}</h1>
                <span>{credit.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

Movie.propTypes = {
  match: PropTypes.object
}

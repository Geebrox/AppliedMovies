import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Transition from 'utils/Transition'

import starIcon from 'assets/icons/star.svg'
import cameraImg from 'assets/images/camera.png'
import filmImg from 'assets/images/film.png'
import noPosterImg from 'assets/images/no-poster.jpg'
import classes from './MovieList.module.scss'

const renderMovieSkeleton = (itemsCount = 12) => {
  const items = []
  for (let i = 0; i < itemsCount; i++)
    items.push(
      <div
        key={i}
        className="flex flex-col max-w-xs w-full mx-auto shadow-md rounded-xxl sm:rounded-xl xl:rounded-lg overflow-hidden"
      >
        <div
          className={`w-full flex-grow bg-cover bg-light-grey animate-pulse ${classes.responsiveImage}`}
        />
        <div
          className={`bg-white text-black relative ${classes.responsiveDescription}`}
        >
          <div className="absolute w-full h-full top-0 left-0 p-3 font-playfairDisplay text-black flex flex-col justify-center space-y-1">
            <span className="font-bold text-xxs bg-light-grey w-16 h-2 rounded-full animate-pulse" />
            <span className="font-normal text-xxxs bg-light-grey w-12 h-1 rounded-full animate-pulse" />
          </div>
          <div className="absolute p-1 top-0 right-0 flex items-center space-x-0">
            <span className="font-normal text-xxxs font-playfairDisplay bg-light-grey h-1 w-4 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    )

  return <>{items}</>
}

export const MovieList = ({
  movieList,
  isLoading = false,
  limit = 12,
  fallbackText = 'Movies are not available right now'
}) => {
  const [prevItemsCount, setPrevItemsCount] = useState(0)

  useEffect(() => {
    setPrevItemsCount(
      movieList.length - limit < 0 ? 0 : movieList.length - limit
    )
  }, [movieList])

  return movieList.length < 1 ? (
    <div className="px-16 text-light-grey font-roboto text-2xl flex flex-col justify-center items-center mx-auto">
      <div className="flex">
        <img src={filmImg} alt="Film" className="animate-spin" />
        <img src={filmImg} alt="Film" className="animate-spin" />
      </div>
      <img src={cameraImg} alt="Camera" className="ml-3 mb-6" />
      <span>{fallbackText}</span>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-16 px-16">
      {movieList.map(
        ({ title, release_date, vote_average, poster_path, id }, idx) => (
          <Transition
            key={id}
            show
            appear
            enter="transition ease duration-500 transform"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-350 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-50"
          >
            <Link to={`/movie/${id}`}>
              {' '}
              <div
                style={{
                  transitionDelay: `${150 * (idx - prevItemsCount)}ms`
                }}
                className="flex flex-col max-w-xs w-full mx-auto shadow-md rounded-xxl sm:rounded-xl xl:rounded-lg overflow-hidden relative select-none"
              >
                <div
                  style={{
                    backgroundImage: `url(${noPosterImg})`
                  }}
                  className={`w-full flex-grow bg-cover absolute top-0 left-0 z-0 ${classes.responsiveImage} `}
                />
                <div
                  style={{
                    backgroundImage: `url(${process.env.TMDB_IMAGES_PATH}${poster_path})`
                  }}
                  className={`w-full flex-grow bg-cover absolute top-0 left-0 z-10 ${classes.responsiveImage}`}
                />
                <div
                  className={`w-full flex-grow bg-cover ${classes.responsiveImage}`}
                />
                <div
                  className={`bg-white text-black relative ${classes.responsiveDescription}`}
                >
                  <div className="absolute w-full h-full top-0 left-0 p-3 font-playfairDisplay text-black flex flex-col justify-center">
                    <span className="font-bold text-xxs truncate">{title}</span>
                    <span className="font-normal text-xxxs">
                      {new Date(release_date).toDateString('en-US')}
                    </span>
                  </div>
                  <div className="absolute p-1 top-0 right-0 flex items-center space-x-0">
                    <span className="font-normal text-xxxs font-playfairDisplay">
                      {vote_average}
                    </span>
                    <img src={starIcon} alt="Rate" />
                  </div>
                </div>
              </div>
            </Link>
          </Transition>
        )
      )}
      {isLoading && renderMovieSkeleton()}
    </div>
  )
}

MovieList.propTypes = {
  movieList: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  limit: PropTypes.number,
  fallbackText: PropTypes.string
}

import React, { useEffect, useState, useContext } from 'react'
import { Search } from 'components/Search'
import { MovieList } from 'components/MovieList'
import { ScrollIdle } from 'components/ScrollInfo'
import { MovieContext } from 'contexts'
import moviesService from 'services/movieService'
import { Swipeable } from 'react-swipeable'

import filmImg from 'assets/images/film.png'

export const Home = () => {
  const {
    movieList,
    getMovieList,
    setMovieList,
    movieMaxPage,
    setMovieMaxPage
  } = useContext(MovieContext)

  const searchOptionsDefaults = {
    results: [],
    nextRequestId: 1,
    displayedRequestId: 0
  }

  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [localMovieList, setLocalMovieList] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [searchOptions, setSearchOptions] = useState({
    ...searchOptionsDefaults
  })

  const fetchMovies = () => {
    setIsLoading(true)
    moviesService
      .getLatestMovies({ page })
      .then(({ data: { results, total_pages } }) => {
        setMovieList([...movieList, ...results])
        setMovieMaxPage(total_pages)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchMovies()

    return () => {
      setIsLoading(true)
      setPage(1)
      setLocalMovieList([])
      setSearchValue('')
      setSearchOptions({ ...searchOptionsDefaults })
      setMovieList([])
    }
  }, [])

  useEffect(() => {
    const tempMovieList = getMovieList(page)

    if (tempMovieList.length < 1) {
      if (!isLoading && page < movieMaxPage) fetchMovies()
    } else {
      setLocalMovieList((prev) => [...prev, ...tempMovieList])
      setPage(page + 1)
    }
  }, [movieList])

  useEffect(() => {
    if (searchValue.length < 1) {
      setSearchOptions({ ...searchOptionsDefaults })
      return
    }
    setIsLoading(true)
    const requestId = searchOptions.nextRequestId
    setSearchOptions((prev) => ({ ...prev, nextRequestId: requestId + 1 }))
    moviesService
      .searchMovie(searchValue)
      .then(({ data: { results } }) => {
        if (requestId < searchOptions.displayedRequestId) return
        setSearchOptions((prev) => ({
          ...prev,
          displayedRequestId: requestId,
          results
        }))
      })
      .finally(() => setIsLoading(false))
  }, [searchValue])

  const onContentScroll = (e) => {
    if (
      isLoading ||
      movieList.length < 12 * -1 + page ||
      page >= movieMaxPage ||
      searchValue.length > 0 ||
      e.deltaY < 20
    )
      return
    const scroller = document.getElementById('scroller')
    const bottomBound = scroller.getBoundingClientRect().bottom - 5
    if (bottomBound < window.innerHeight) fetchMovies()
  }

  const onSearchValueChange = (value) => {
    setSearchValue(value)
  }

  return (
    <Swipeable onSwiped={onContentScroll}>
      <div
        onWheel={onContentScroll}
        className="py-10 flex w-full flex-col space-y-12"
      >
        <h1 className="w-full text-center font-bold font-playfairDisplay text-4xl">
          Welcome to Movies World
        </h1>
        <Search onSearchValueChange={onSearchValueChange} />
        {searchValue.length > 0 ? (
          <MovieList
            movieList={searchOptions.results}
            isLoading={isLoading}
            limit={20}
            fallbackText="No movies found"
          />
        ) : isLoading && movieList.length < 1 ? (
          <div className="px-16 text-light-grey font-roboto text-2xl flex justify-center items-center mx-auto">
            <img src={filmImg} alt="Film" className="animate-spin mr-4" />
            <span>Loading movies...</span>
          </div>
        ) : (
          <>
            <MovieList movieList={localMovieList} isLoading={isLoading} />
            {movieList.length >= 12 * -1 + page &&
              !isLoading &&
              page < movieMaxPage && <ScrollIdle id="scroller" />}
          </>
        )}
      </div>
    </Swipeable>
  )
}

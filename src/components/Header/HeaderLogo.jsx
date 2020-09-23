import React from 'react'
import appliedMoviesIcon from 'assets/icons/play.svg'

export const HeaderLogo = () => {
  return (
    <div className="flex items-center select-none">
      <span className="font-inter font-bold text-2xl">AppliedMovies</span>
      <img src={appliedMoviesIcon} alt="AM" className="h-6 w-6 mx-2" />
    </div>
  )
}

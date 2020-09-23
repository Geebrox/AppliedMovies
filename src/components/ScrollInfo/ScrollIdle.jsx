import React from 'react'

export const ScrollIdle = (props) => {
  return (
    <div
      className="flex flex-col max-w-xs mx-auto pt-20 items-center font-roboto font-bold text-light-grey uppercase"
      {...props}
    >
      <span className="text-xs">Scroll down to load more</span>
      <svg
        viewBox="0 0 24 24"
        className="animate-bounce w-6 h-6w-10 h-10 text-gray-900 mt-3 fill-current"
      >
        <defs />
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className="animate-bounce w-10 h-10 text-gray-900 -m-8 fill-current"
      >
        <defs />
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
      </svg>
    </div>
  )
}

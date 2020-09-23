import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { HeaderLogo } from './HeaderLogo'

export const Header = () => {
  const navLinksList = [
    {
      name: 'Home',
      to: '/'
    },
    {
      name: 'About',
      to: '/about'
    }
  ]

  return (
    <div className="py-6 flex w-full justify-between items-center">
      <Link to="/">
        <HeaderLogo />
      </Link>
      <div className="flex space-x-6">
        {navLinksList.map(({ name, to }, idx) => (
          <NavLink
            to={to}
            key={idx}
            exact
            activeClassName="border-b-2 border-light-primary font-bold"
            className="transition duration-500 ease-in-out font-inter font-normal text-sm px-1"
          >
            {name}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

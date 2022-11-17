import React from 'react'
import './navbar.css'


const Navbar = () => {
  return (
    <header className='navbarDiv'>
      <nav className='mainDiv'>
        <div className='logoDiv'></div>
        <div className='groupDiv'>
          <button className='navbarButton'>
            <a
              className='NavLink'
              href='#'
            >
              Log In
            </a>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
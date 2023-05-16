import React from "react"
import { Link } from "react-router-dom"
import BeerIcon from "../assets/beer-icon.png"

function Navbar() {
  return (
    <header className={`-bg-light text-right`}>
      <nav className="container container--narrow">
        <ul className={`-nav-ul nav-ul`}>
          <li>
            <Link className={`theme-nav-link`} to="/about">About</Link>
          </li>

          <li>
            <Link className={`theme-nav-link`} to="/">Home</Link>
          </li>

          <li>
            {/* <img 
              className={`nav-icon img-contain`}
              alt="BeerIcon" 
              src={BeerIcon} 
            ></img> */}
            <p>beer image placeholder</p>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
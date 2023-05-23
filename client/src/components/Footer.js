import React from "react"
import Heart from "../assets/heart.svg"

export default function Footer() {
  return (
    <>
      <hr/>
      <p>
        Created and maintained with <img src={Heart} id="heart" alt="heart-icon" /> by <a
          href="https://www.jamescaleca.com/"
          target="_blank"
          rel="noopener noreferrer"
        >James Caleca</a>.
      </p> 
      <p>
        Data gathered using <a 
          href="https://www.themealdb.com/" 
          target="_blank" 
          rel="noopener noreferrer"
        >TheMealDB
        </a>.
      </p>
    </>
  )
}
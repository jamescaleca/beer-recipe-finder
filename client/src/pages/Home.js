import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { RecipesContext } from "../context/recipesContext"

function Home() {
  const {filterRecipes, search, setSearch} = useContext(RecipesContext)

  return (
    <section className={`-bg-primary container`}>
      <div>
        <div className="split">
          <h2 className={`theme-text text-center`}>Welcome</h2>
          <h3 className={`theme-text text-center`}>Search for a beer recipe by food pairing:</h3>
          <form className={`form-search-bar text-center`}>
            <input 
              className={`search-input`}
              type="text" 
              placeholder="Beef Wellington"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            <br/>
            <button 
              className={`search-button`}
              type="submit" 
              value="Search" 
              onClick={(e) => {
                e.preventDefault()
                filterRecipes()
              }}
            ><Link to="/search">Search</Link>
            </button>
            <hr/>
            <Link 
              to="/recipes" 
              className={`all-recipes-button`}
            >See all recipes
            </Link>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Home
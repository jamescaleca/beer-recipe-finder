import React, { useEffect, useState, createContext } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const RecipesContext = createContext()

function RecipesContextProvider(props) {
  const [recipesData, setRecipesData] = useState([])
  const [search, setSearch] = useState('')
  const [searchData, setSearchData] = useState([])

  // Getting all recipes from the API

  const getAllRecipes = () => {
    axios
      .get("https://api.punkapi.com/v2/beers")
      .then(response => {
        const allRecipes = response.data
        setRecipesData(allRecipes)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
      getAllRecipes() 
  }, [])

  const allRecipes = recipesData.map(recipe => (
    <li className="tile" key={recipe.id}>
      <img 
        className="rec-thumb img-contain"
        alt={recipe.name} 
        src={recipe.image_url}
      ></img>
      <br />
      <Link to={`/recipes/${recipe.id}`} className={`to-rec-detail text-center`}>{recipe.name}</Link>
      <br />
      <p className={`tagline text-center`}>{recipe.tagline}</p>
    </li>
  ))

  // Search results

  const filterRecipes = (e) => {
    axios
      .get(`https://api.punkapi.com/v2/beers?food=${search}`)
      .then(response => {
        const searchData = response.data
        setSearchData(searchData)
      })
  }

  const searchResults = searchData.length > 0 ?
  searchData.map(recipe => (
    <li className="search-rec-li tile" key={recipe.id}>
      <img 
        className="rec-thumb img-contain" 
        alt={recipe.name} 
        src={recipe.image_url}
      ></img>
      <br />
      <Link to={`/recipes/${recipe.id}`} className={`to-rec-detail text-center`}>{recipe.name}</Link>
      <br />
      <p className={`tagline text-center`}>{recipe.tagline}</p>
    </li>
  ))
  :
    <h3 className={`theme-text text-center`}>
      Sorry, looks like we have no recipes matching that food pairing.
    </h3>

  return (
    <RecipesContext.Provider value={{
      allRecipes,
      searchResults, 
      filterRecipes, 
      search, 
      setSearch, 
      searchData, 
      setSearchData
    }}>
      { props.children }
    </RecipesContext.Provider>
  )
}

export {RecipesContextProvider, RecipesContext}